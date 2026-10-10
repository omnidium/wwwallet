//! NFTs through Alchemy: what an address holds (the NFT API, REST v3) and how
//! one token moved (the Transfers API, the same JSON-RPC as activity).
//!
//! Everything an NFT's metadata says is attacker-controlled — anyone can
//! airdrop a token whose name, description and image URL say whatever they
//! like. So text is length-capped here, and pictures only ever come from the
//! copies Alchemy itself caches and serves (never the metadata's own URL,
//! which could be anywhere, track whoever loads it, or not be an image).

use async_trait::async_trait;
use serde_json::{json, Value};

use super::{not_enabled, AlchemyProvider};
use crate::chain::ChainId;
use crate::error::ProviderResult;
use crate::http;
use crate::traits::NftProvider;
use crate::types::{
    Nft, NftAttribute, NftCollection, NftCollectionPage, NftImage, NftPage, NftTransfer,
};

/// Alchemy's own image caches: its CDN, and its Cloudinary account (which
/// serves the thumbnails and the PNG renderings of SVGs). A path prefix as
/// well as a host for Cloudinary, which serves every one of its customers
/// from the same host.
const IMAGE_SOURCES: [&str; 3] = [
    "https://nft-cdn.alchemy.com/",
    "https://nft2-cdn.alchemy.com/",
    "https://res.cloudinary.com/alchemyapi/",
];

/// The NFT API's largest page.
const PAGE_SIZE: &str = "100";
/// How many of one token's transfers to read per direction: far more than
/// any real token moves to or from one address.
const TRANSFER_LIMIT: &str = "0x64";

const MAX_TEXT: usize = 200;
const MAX_DESCRIPTION: usize = 1000;
const MAX_ATTRIBUTES: usize = 50;

impl AlchemyProvider {
    /// Query values (owner, contract, page key) come from the client, so
    /// they're encoded as query pairs, never spliced into the URL.
    fn nft_url(&self, chain: ChainId, method: &str, query: &[(&str, &str)]) -> String {
        let mut url = url::Url::parse(&format!(
            "https://{}.g.alchemy.com/nft/v3/{}/{method}",
            chain.alchemy_slug(),
            self.api_key
        ))
        .expect("the NFT API's URL is well-formed");
        url.query_pairs_mut().extend_pairs(query);
        url.into()
    }

    async fn nft_get(&self, chain: ChainId, method: &str, query: &[(&str, &str)]) -> ProviderResult<Value> {
        http::get_json(&self.nft_url(chain, method, query)).await.map_err(not_enabled)
    }
}

#[async_trait(?Send)]
impl NftProvider for AlchemyProvider {
    fn name(&self) -> &'static str {
        "alchemy"
    }

    /// Alchemy's NFT API covers every chain here but Ink.
    fn supports(&self, chain: ChainId) -> bool {
        chain != ChainId::Ink
    }

    async fn collections(
        &self,
        chain: ChainId,
        owner: &str,
        page_key: Option<&str>,
    ) -> ProviderResult<NftCollectionPage> {
        let mut query = vec![("owner", owner), ("withMetadata", "true"), ("pageSize", PAGE_SIZE)];
        query.extend(page_key.map(|key| ("pageKey", key)));
        let resp = self.nft_get(chain, "getContractsForOwner", &query).await?;
        Ok(NftCollectionPage {
            collections: list(&resp, "contracts").filter_map(parse_collection).collect(),
            next_page_key: next_page_key(&resp),
        })
    }

    async fn nfts(
        &self,
        chain: ChainId,
        owner: &str,
        contract_address: &str,
        page_key: Option<&str>,
    ) -> ProviderResult<NftPage> {
        let mut query = vec![
            ("owner", owner),
            ("contractAddresses[]", contract_address),
            ("withMetadata", "true"),
            ("pageSize", PAGE_SIZE),
        ];
        query.extend(page_key.map(|key| ("pageKey", key)));
        let resp = self.nft_get(chain, "getNFTsForOwner", &query).await?;
        Ok(NftPage {
            nfts: list(&resp, "ownedNfts").filter_map(parse_nft).collect(),
            next_page_key: next_page_key(&resp),
        })
    }

    async fn transfers(
        &self,
        chain: ChainId,
        owner: &str,
        contract_address: &str,
        token_id_hex: &str,
    ) -> ProviderResult<Vec<NftTransfer>> {
        let wanted = normalize_token_id(token_id_hex);
        let mut transfers: Vec<NftTransfer> = Vec::new();
        // One direction per call, as for activity: the Transfers API ANDs
        // fromAddress and toAddress rather than ORing them.
        for direction in ["fromAddress", "toAddress"] {
            let params = json!({
                "fromBlock": "0x0",
                direction: owner,
                "contractAddresses": [contract_address],
                "category": ["erc721", "erc1155"],
                "withMetadata": true,
                // Its default skips zero-value transfers, which for NFTs
                // (whose value field is always empty) would be all of them.
                "excludeZeroValue": false,
                "order": "desc",
                "maxCount": TRANSFER_LIMIT,
            });
            let resp = self.rpc_call(chain, "alchemy_getAssetTransfers", json!([params])).await?;
            for t in list(&resp, "transfers") {
                if let Some(transfer) = parse_transfer(t, &wanted) {
                    // A transfer to itself comes back in both directions.
                    if !transfers.contains(&transfer) {
                        transfers.push(transfer);
                    }
                }
            }
        }
        transfers.sort_by_key(|t| std::cmp::Reverse(t.block_number));
        Ok(transfers)
    }
}

fn list<'a>(resp: &'a Value, field: &str) -> impl Iterator<Item = &'a Value> {
    resp.get(field).and_then(Value::as_array).into_iter().flatten()
}

fn next_page_key(resp: &Value) -> Option<String> {
    resp.get("pageKey").and_then(Value::as_str).filter(|k| !k.is_empty()).map(str::to_string)
}

/// The URL only if it's one of Alchemy's own image caches.
fn safe_image_url(url: &str) -> Option<String> {
    let trusted = url.len() <= 2048 && IMAGE_SOURCES.iter().any(|source| url.starts_with(source));
    trusted.then(|| url.to_string())
}

/// An SVG's PNG rendering rather than the SVG itself, so nothing but plain
/// pixels is ever drawn.
fn parse_image(image: Option<&Value>) -> NftImage {
    let Some(image) = image else { return NftImage::default() };
    let field = |name: &str| image.get(name).and_then(Value::as_str).and_then(safe_image_url);
    let is_svg = image
        .get("contentType")
        .and_then(Value::as_str)
        .is_some_and(|t| t.contains("svg"));
    let full = if is_svg { field("pngUrl") } else { field("cachedUrl").or_else(|| field("pngUrl")) };
    NftImage { thumbnail: field("thumbnailUrl").or_else(|| full.clone()), full }
}

/// Trimmed, non-empty, and at most `max` characters.
fn text(value: Option<&Value>, max: usize) -> Option<String> {
    let s = value?.as_str()?.trim();
    (!s.is_empty()).then(|| s.chars().take(max).collect())
}

/// Counts arrive as decimal strings.
fn count(value: Option<&Value>) -> Option<u64> {
    let value = value?;
    value.as_u64().or_else(|| value.as_str()?.parse().ok())
}

fn is_decimal(s: &str) -> bool {
    !s.is_empty() && s.len() <= 80 && s.bytes().all(|b| b.is_ascii_digit())
}

fn token_type(value: Option<&Value>) -> String {
    value.and_then(Value::as_str).unwrap_or("UNKNOWN").to_string()
}

fn parse_collection(c: &Value) -> Option<NftCollection> {
    let contract_address = c.get("address")?.as_str()?.to_lowercase();
    let opensea = c.get("openSeaMetadata");
    let opensea_field = |name: &str| opensea.and_then(|o| o.get(name));
    Some(NftCollection {
        contract_address,
        name: text(c.get("name"), MAX_TEXT).or_else(|| text(opensea_field("collectionName"), MAX_TEXT)),
        symbol: text(c.get("symbol"), MAX_TEXT),
        token_type: token_type(c.get("tokenType")),
        owned_count: count(c.get("numDistinctTokensOwned")).unwrap_or(0),
        is_spam: c.get("isSpam").and_then(Value::as_bool),
        verified: opensea_field("safelistRequestStatus").and_then(Value::as_str) == Some("verified"),
        floor_price: opensea_field("floorPrice")
            .and_then(Value::as_f64)
            .filter(|p| p.is_finite() && *p > 0.0),
        image: parse_image(c.get("image")),
    })
}

fn parse_nft(n: &Value) -> Option<Nft> {
    let contract = n.get("contract")?;
    let token_id = n.get("tokenId")?.as_str()?;
    if !is_decimal(token_id) {
        return None;
    }
    let balance = n.get("balance").and_then(Value::as_str).filter(|b| is_decimal(b)).unwrap_or("1");
    Some(Nft {
        contract_address: contract.get("address")?.as_str()?.to_lowercase(),
        token_id: token_id.to_string(),
        token_type: token_type(n.get("tokenType").or_else(|| contract.get("tokenType"))),
        name: text(n.get("name"), MAX_TEXT),
        description: text(n.get("description"), MAX_DESCRIPTION),
        balance: balance.to_string(),
        image: parse_image(n.get("image")),
        attributes: parse_attributes(n.get("raw").and_then(|r| r.get("metadata")).and_then(|m| m.get("attributes"))),
    })
}

/// Metadata attributes are usually a list of `{ trait_type, value }`; some
/// contracts write a plain map instead. Values can be any JSON scalar.
fn parse_attributes(attributes: Option<&Value>) -> Vec<NftAttribute> {
    let scalar = |v: &Value| match v {
        Value::String(_) => text(Some(v), MAX_TEXT),
        Value::Number(n) => Some(n.to_string()),
        Value::Bool(b) => Some(b.to_string()),
        _ => None,
    };
    let pairs: Vec<NftAttribute> = match attributes {
        Some(Value::Array(items)) => items
            .iter()
            .filter_map(|a| {
                Some(NftAttribute {
                    trait_type: text(a.get("trait_type"), MAX_TEXT),
                    value: scalar(a.get("value")?)?,
                })
            })
            .collect(),
        Some(Value::Object(map)) => map
            .iter()
            .filter_map(|(k, v)| {
                Some(NftAttribute { trait_type: text(Some(&json!(k)), MAX_TEXT), value: scalar(v)? })
            })
            .collect(),
        _ => Vec::new(),
    };
    pairs.into_iter().take(MAX_ATTRIBUTES).collect()
}

/// Hex token ids compared as numbers: no prefix, no leading zeros, one case.
/// ERC-721 ids arrive padded to 64 digits, ERC-1155 ones unpadded.
fn normalize_token_id(hex: &str) -> String {
    let digits = hex.trim_start_matches("0x").trim_start_matches("0X").trim_start_matches('0');
    if digits.is_empty() {
        "0".to_string()
    } else {
        digits.to_ascii_lowercase()
    }
}

/// One Transfers API entry, if it moved the wanted token. An ERC-1155
/// batch transfer lists every token it moved, each with its own amount.
fn parse_transfer(t: &Value, wanted: &str) -> Option<NftTransfer> {
    let amount = match t.get("category")?.as_str()? {
        "erc721" => {
            let id = t.get("erc721TokenId").or_else(|| t.get("tokenId"))?.as_str()?;
            (normalize_token_id(id) == wanted).then(|| "1".to_string())?
        }
        "erc1155" => {
            let entry = t
                .get("erc1155Metadata")?
                .as_array()?
                .iter()
                .find(|m| m.get("tokenId").and_then(Value::as_str).map(normalize_token_id).as_deref() == Some(wanted))?;
            entry
                .get("value")
                .and_then(Value::as_str)
                .map(AlchemyProvider::hex_to_decimal_string)
                .unwrap_or_else(|| "1".to_string())
        }
        _ => return None,
    };
    Some(NftTransfer {
        hash: t.get("hash")?.as_str()?.to_string(),
        from: t.get("from")?.as_str()?.to_string(),
        to: t.get("to")?.as_str()?.to_string(),
        block_number: t
            .get("blockNum")
            .and_then(Value::as_str)
            .and_then(|h| u64::from_str_radix(h.trim_start_matches("0x"), 16).ok()),
        timestamp: t
            .get("metadata")
            .and_then(|m| m.get("blockTimestamp"))
            .and_then(Value::as_str)
            .map(str::to_string),
        amount,
    })
}

#[cfg(test)]
mod tests {
    use super::*;

    fn provider() -> AlchemyProvider {
        AlchemyProvider::new("KEY".into())
    }

    #[test]
    fn query_values_are_encoded_not_spliced_into_the_url() {
        let url = provider().nft_url(
            ChainId::Base,
            "getContractsForOwner",
            &[("owner", "0xabc"), ("pageKey", "x&owner=0xevil#frag")],
        );
        let parsed = url::Url::parse(&url).unwrap();
        assert_eq!(parsed.host_str(), Some("base-mainnet.g.alchemy.com"));
        assert_eq!(parsed.path(), "/nft/v3/KEY/getContractsForOwner");
        let pairs: Vec<(String, String)> = parsed.query_pairs().into_owned().collect();
        assert_eq!(
            pairs,
            vec![
                ("owner".to_string(), "0xabc".to_string()),
                ("pageKey".to_string(), "x&owner=0xevil#frag".to_string()),
            ]
        );
        assert_eq!(parsed.fragment(), None);
    }

    #[test]
    fn only_alchemys_own_image_caches_are_passed_on() {
        assert!(safe_image_url("https://nft2-cdn.alchemy.com/eth-mainnet/abc").is_some());
        assert!(safe_image_url("https://nft-cdn.alchemy.com/base-mainnet/abc").is_some());
        assert!(safe_image_url("https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/x").is_some());
        assert!(safe_image_url("https://res.cloudinary.com/someone-else/image/upload/x").is_none());
        assert!(safe_image_url("https://nft2-cdn.alchemy.com.evil.example/x").is_none());
        assert!(safe_image_url("http://nft2-cdn.alchemy.com/x").is_none());
        assert!(safe_image_url("data:image/svg+xml;base64,PHN2Zz4=").is_none());
        assert!(safe_image_url("ipfs://bafy").is_none());
    }

    #[test]
    fn an_svg_is_shown_as_its_png_rendering() {
        let image = parse_image(Some(&json!({
            "cachedUrl": "https://nft2-cdn.alchemy.com/eth-mainnet/abc",
            "thumbnailUrl": "https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/eth-mainnet/abc",
            "pngUrl": "https://res.cloudinary.com/alchemyapi/image/upload/convert-png/eth-mainnet/abc",
            "contentType": "image/svg+xml",
            "originalUrl": "data:image/svg+xml;base64,PHN2Zz4=",
        })));
        assert_eq!(
            image.full.as_deref(),
            Some("https://res.cloudinary.com/alchemyapi/image/upload/convert-png/eth-mainnet/abc")
        );
        assert_eq!(
            image.thumbnail.as_deref(),
            Some("https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/eth-mainnet/abc")
        );
    }

    #[test]
    fn a_picture_only_at_its_original_url_is_not_shown() {
        let image = parse_image(Some(&json!({
            "cachedUrl": null,
            "contentType": "image/gif",
            "originalUrl": "https://tracker.example/pixel.gif",
        })));
        assert_eq!(image, NftImage::default());
    }

    #[test]
    fn a_collection_is_read_from_get_contracts_for_owner() {
        let c = parse_collection(&json!({
            "address": "0x0000000000696760E15f265e828DB644A0c242EB",
            "name": "Wei Name Service",
            "symbol": "WEI",
            "tokenType": "ERC721",
            "numDistinctTokensOwned": "3",
            "isSpam": false,
            "image": { "cachedUrl": "https://nft2-cdn.alchemy.com/eth-mainnet/c7", "contentType": "image/png" },
            "openSeaMetadata": { "floorPrice": 0.02, "safelistRequestStatus": "verified", "imageUrl": "https://i.seadn.io/x" },
        }))
        .unwrap();
        assert_eq!(c.contract_address, "0x0000000000696760e15f265e828db644a0c242eb");
        assert_eq!(c.name.as_deref(), Some("Wei Name Service"));
        assert_eq!(c.owned_count, 3);
        assert_eq!(c.is_spam, Some(false));
        assert!(c.verified);
        assert_eq!(c.floor_price, Some(0.02));
        assert_eq!(c.image.full.as_deref(), Some("https://nft2-cdn.alchemy.com/eth-mainnet/c7"));
    }

    #[test]
    fn a_chain_alchemy_doesnt_classify_has_no_spam_verdict() {
        let c = parse_collection(&json!({
            "address": "0xabc",
            "tokenType": "ERC1155",
            "isSpam": null,
            "openSeaMetadata": { "collectionName": "Fallback name", "safelistRequestStatus": "not_requested" },
        }))
        .unwrap();
        assert_eq!(c.is_spam, None);
        assert!(!c.verified);
        assert_eq!(c.name.as_deref(), Some("Fallback name"));
        assert_eq!(c.floor_price, None);
    }

    #[test]
    fn an_nfts_untrusted_text_is_capped() {
        let n = parse_nft(&json!({
            "contract": { "address": "0xABC", "tokenType": "ERC721" },
            "tokenId": "115792089237316195423570985008687907853269984665640564039457584007913129639935",
            "name": "  Claim your reward at evil.example  ",
            "description": "x".repeat(5000),
            "balance": "1",
            "raw": { "metadata": { "attributes": [
                { "trait_type": "Eyes", "value": "Laser" },
                { "trait_type": "Level", "value": 7 },
                { "trait_type": "Nested", "value": { "a": 1 } },
                { "value": "" },
            ] } },
        }))
        .unwrap();
        assert_eq!(n.contract_address, "0xabc");
        assert_eq!(n.name.as_deref(), Some("Claim your reward at evil.example"));
        assert_eq!(n.description.as_ref().unwrap().chars().count(), MAX_DESCRIPTION);
        assert_eq!(
            n.attributes,
            vec![
                NftAttribute { trait_type: Some("Eyes".into()), value: "Laser".into() },
                NftAttribute { trait_type: Some("Level".into()), value: "7".into() },
            ]
        );
    }

    #[test]
    fn an_nft_with_a_malformed_token_id_is_skipped() {
        assert!(parse_nft(&json!({ "contract": { "address": "0xabc" }, "tokenId": "0x1f" })).is_none());
        assert!(parse_nft(&json!({ "contract": { "address": "0xabc" }, "tokenId": "" })).is_none());
    }

    #[test]
    fn token_ids_compare_as_numbers_whatever_their_padding() {
        assert_eq!(
            normalize_token_id("0x00000000000000000000000000000000000000000000000000000000000024FE"),
            "24fe"
        );
        assert_eq!(normalize_token_id("0x24fe"), "24fe");
        assert_eq!(normalize_token_id("0x0"), "0");
        // Larger than any machine integer — e.g. an ENS name's id.
        assert_eq!(
            normalize_token_id("0x4c2d2a4f4c86e1a4a07f2b77ed3ef5e17b39d2e4d0a5f3e2d1c0b9a8f7e6d5c4"),
            "4c2d2a4f4c86e1a4a07f2b77ed3ef5e17b39d2e4d0a5f3e2d1c0b9a8f7e6d5c4"
        );
    }

    #[test]
    fn only_the_wanted_tokens_transfers_are_kept() {
        let erc721 = |id: &str| {
            json!({
                "category": "erc721", "hash": "0x1", "from": "0xa", "to": "0xb", "blockNum": "0x10",
                "erc721TokenId": id, "erc1155Metadata": [], "value": null,
                "metadata": { "blockTimestamp": "2026-09-25T14:51:11.000Z" },
            })
        };
        let wanted = normalize_token_id("0x24fe");
        let kept = parse_transfer(&erc721("0x00000000000000000000000000000000000000000000000000000000000024fe"), &wanted)
            .unwrap();
        assert_eq!(kept.amount, "1");
        assert_eq!(kept.block_number, Some(16));
        assert_eq!(kept.timestamp.as_deref(), Some("2026-09-25T14:51:11.000Z"));
        assert!(parse_transfer(&erc721("0x24ff"), &wanted).is_none());

        let batch = json!({
            "category": "erc1155", "hash": "0x2", "from": "0xa", "to": "0xb", "blockNum": "0x11",
            "erc1155Metadata": [{ "tokenId": "0x05", "value": "0x01" }, { "tokenId": "0x06", "value": "0x03" }],
        });
        assert_eq!(parse_transfer(&batch, &normalize_token_id("0x6")).unwrap().amount, "3");
        assert!(parse_transfer(&batch, &normalize_token_id("0x7")).is_none());

        let fungible = json!({ "category": "erc20", "hash": "0x3", "from": "0xa", "to": "0xb" });
        assert!(parse_transfer(&fungible, &wanted).is_none());
    }

    #[test]
    fn ink_has_no_nft_data() {
        let p = provider();
        assert!(!p.supports(ChainId::Ink));
        assert!(ChainId::ALL.iter().filter(|c| p.supports(**c)).count() == 14);
    }
}
