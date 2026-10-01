export default {
  nav: {
    wallet: 'Pénztárca',
    ethereum: 'Ethereum',
    crypto: 'Kriptovaluta',
    faqs: 'GYIK',
    launch: 'Pénztárca elindítása',
    home: 'Vissza az oldal tetejére',
    sectionNavLabel: 'Szekciók közötti navigáció',
  },
  settings: {
    open: 'Beállítások',
    close: 'Beállítások bezárása',
    theme: 'Téma',
    themeLight: 'Fény',
    themeDark: 'Sötét',
    language: 'Nyelv',
  },
  hero: {
    eyebrow: 'Személyes, nem letéti Ethereum-pénztárca',
    heading1: 'A kulcsai.',
    heading2: 'A készüléked.',
    heading3: 'A pénztárcád.',
    lede: 'A wwwallet a saját eszközödön titkosítja a pénztárcádat, és soha nem továbbítja máshová a kulcsaidat, jelszavaidat vagy a helyreállítási kódodat. Nem kell fiókot létrehozni. Nincs szerver, amit feltörhetnének. Csak te és a kriptovalutád.',
    ctaPrimary: 'Pénztárca elindítása',
    ctaSecondary: 'Nézze meg, hogyan működik!',
  },
  wallet: {
    eyebrow: 'Pénztárca',
    heading: 'Úgy készült, hogy csak te tudd kinyitni',
    lede: 'A wwwallet nem kezeli a pénzedet — hanem segít abban, hogy te magad kezelhesd. Íme, mit jelent ez a gyakorlatban.',
    points: [
      {
        title: 'Nem letéti, mindig',
        body: 'A privát kulcsok a saját eszközödön kerülnek generálásra és titkosításra. A wwwallet szerverei soha nem látják őket — nincs olyan pénztárca-adatbázis, amelyet feltörhetnének, mert egyáltalán nincs ilyen adatbázis.',
      },
      {
        title: 'AES-256-tal titkosítva, a saját módszered szerint feloldható',
        body: 'A tárhelyét AES-256-GCM titkosítás védi. Nyissa meg a helyreállítási kóddal, vagy állítson be egy belépési kulcsot – Face ID, Touch ID vagy Windows Hello – a gyors, kizárólag helyi hozzáférés érdekében.',
      },
      {
        title: 'Automatikusan bezáródik',
        body: 'A wwwallet rövid inaktivitás után lezárul, és soha nem menti a feloldott munkamenetet a lemezre — ha bezárja a lapot, a program szándékosan elfelejti az adatokat.',
      },
      {
        title: 'Egy pénztárca, öt Ethereum-hálózat',
        body: 'Ugyanazon fiókokból tárolhat és küldhet az Ethereum főhálózaton, a Polygonon, az Arbitrumon, a Base-en és az Optimismon keresztül.',
      },
    ],
    caveatTitle:
      'A helyreállítási kódod segítségével nyithatod meg a tárhelyedet — ez nem valami varázslatos biztonsági másolat',
    caveatBody:
      'Tartsd a helyreállítási kódot biztonságos helyen, de készíts róla biztonsági másolatot a Google Drive-on vagy egy fájlban is. A biztonsági másolatra azért lesz szükséged, hogy a pénztárcádat egy új eszközön visszaállíthasd, a kódra pedig azért, hogy azt követően feloldhasd a pénztárcát.',
    caveatLink: 'További információk a GYIK-ben',
  },
  ethereum: {
    eyebrow: 'Ethereum',
    heading: 'Miért az Ethereum?',
    lede: 'A wwwallet kifejezetten az Ethereumra épül. Íme az érvek ennek mellett, egyszerű szavakkal.',
    points: [
      {
        title: 'Egy világszintű számítógép, nem csupán egy főkönyv',
        body: 'Az Ethereum átvette a Bitcoin közös, hamisíthatatlan főkönyv koncepcióját, és továbbfejlesztette: egy globális, programozható számítógép lett belőle, amelyre bárki építhet, és amelyet egyetlen fél sem tud kikapcsolni.',
      },
      {
        title: 'Staking révén biztosított, nem bányászat révén',
        body: 'A 2022-es „Merge” óta az Ethereum biztonságát már nem az energiaigényes bányászat, hanem a Proof-of-Stake biztosítja — a validátorok az ETH-t kockáztatják biztosítékként, ahelyett, hogy áramot fogyasztanának a blokkokért folyó versenyben.',
      },
      {
        title: 'Nyílt és engedélyezés nélküli',
        body: 'Senki sem hagyja jóvá a fiókodat. Bárki, bárhol tarthat ETH-t vagy fejleszthet alkalmazást az Ethereumon — ugyanazok a szabályok vonatkoznak mindenkire, beleértve a legnagyobb intézményeket is.',
      },
      {
        title: 'Az a szabvány, amelyre a többi hálózat épül',
        body: 'Az olyan 2. rétegű hálózatok, mint az Arbitrum, a Base és az Optimism – amelyek mindegyikét támogatja a wwwallet – az Ethereum biztonságát kiterjesztik a gyorsabb és olcsóbb tranzakciókra, ahelyett, hogy a nulláról kezdenék.',
      },
    ],
    linkLabel: 'További információk az Ethereum Alapítvány honlapján',
    linkUrl: 'https://ethereum.org/en/foundation/',
  },
  crypto: {
    eyebrow: 'Kriptovaluta',
    heading: 'A kriptovaluta, egyszerűen elmagyarázva',
    lede: 'Néhány fogalom, amit érdemes megérteni, mielőtt magad is kriptovalutát tartanál — nem csak a wwwallet segítségével.',
    points: [
      {
        title: 'Gyámsági és nem gyámsági',
        body: 'Egy letéti pénztárca vagy tőzsde őrzi a kulcsokat az Ön számára – ez kényelmes, de ezzel arra bízza magát, hogy mások nem foglalják be, nem veszítik el és nem használják fel visszaélésszerűen a pénzeszközeit. Egy nem letéti pénztárca, mint például az wwwallet, a kulcsokat és a felelősséget kizárólag az Ön kezébe adja.',
      },
      {
        title: 'Staking kontra bányászat',
        body: 'A Proof-of-Work bányászat a blokkláncot nyers számítási teljesítménnyel és villamos energiával biztosítja. A Proof-of-Stake viszont kockázati tőkével biztosítja azt. Az Ethereum áttérése a stakingre több mint 99,9%-kal csökkentette az energiafogyasztását — ez nagyjából egy kis ország és egy kisváros energiaellátása közötti különbségnek felel meg.',
      },
      {
        title: 'Az Ethereumon túl',
        body: 'A Bitcoin az egyszerűséget és a kiszámíthatóságot részesíti előnyben a programozhatósággal szemben. Az olyan blokkláncok, mint a Solana, a nyers átviteli sebességet helyezik előtérbe, és ennek elérése érdekében gyakran a decentralizáció rovására mennek. Az Ethereum elsősorban a decentralizációra és a biztonságra helyezi a hangsúlyt, a sebességet és a költségeket pedig a rá épülő 2. rétegű hálózatokra bízza.',
      },
      {
        title: 'Egyetlen hiteles személy sem kéri a jelszavadat',
        body: 'Bármilyen pénztárcát is használsz: sem a tőzsde, sem az ügyfélszolgálat, sem a wwwallet alkalmazottai soha nem fogják megkérdezni a helyreállítási kódodat. Aki ezt megkérdezi, az megpróbál kirabolni téged.',
      },
    ],
    linkLabel: 'Merülj el még mélyebben a Bankless podcast segítségével',
    linkUrl: 'https://www.bankless.com/',
  },
  faqs: {
    eyebrow: 'GYIK',
    heading: 'Gyakori kérdések',
    items: [
      {
        q: 'Elég a helyreállítási kódom ahhoz, hogy visszakapjam a pénztárcámat?',
        a: 'Önmagában nem. A helyreállítási kódod kinyitja a titkosított tárhelyedet, de maga a tárhely kizárólag a készülékeden található. Ha elveszted vagy törlöd a készüléket anélkül, hogy valaha is készítettél volna róla biztonsági másolatot, akkor a kódnak már nem lesz mit kinyitnia. A helyreállítási kódodat mindig párosítsd egy Google Drive-on vagy fájlban tárolt biztonsági másolattal – lásd a következő kérdést.',
      },
      {
        q: 'Hogyan készíthetek biztonsági másolatot a pénztárcámról?',
        a: 'A Beállítások menüpontban készíts biztonsági másolatot a titkosított tárhelyedről a saját Google Drive-odra – ahol egy privát, kizárólag az alkalmazás számára elérhető mappában lesz tárolva, amelynek többi részét a wwwallet nem láthatja –, vagy töltsd le fájlként, és tárold el magadnál. Ezt minden alkalommal végezd el, amikor pénztárcát állítasz be vagy új fiókokat adsz hozzá.',
      },
      {
        q: 'Használhatom a wwwallet szolgáltatást egynél több eszközön?',
        a: 'Igen, de nem történik meg az automatikus szinkronizálás – minden eszközön saját helyi tárhely található. Ha az wwwallet alkalmazást egy új eszközön szeretnéd használni, állítsd vissza azt a Drive-ról vagy egy fájlmentésből, majd oldd fel a védelmet a helyreállítási kóddal.',
      },
      {
        q: 'Mi történik, ha elveszítem a készülékemet, és soha nem készítettem róla biztonsági másolatot?',
        a: 'A pénzeszközeit nem lehet helyreállítani. Ez szándékos: a wwwallet nem rendelkezik fiókrendszerrel, és sehol sem tárol másolatot a tárcájáról, így senki – beleértve minket is – nem tudja azt Önnek helyreállítani. Ez az ára annak, hogy a tárcájához rajtad kívül senki sem férhet hozzá.',
      },
      {
        q: 'Átvihetők-e a belépési kulcsok (Face ID / Touch ID) egy új eszközre?',
        a: 'Nem. A jelszó ahhoz az eszközhöz van kötve, amelyen létrehozták. Miután egy új eszközön visszaállította a biztonsági másolatot, a helyreállítási kifejezéssel oldja fel a zárat, és ott beállíthat egy új jelszót.',
      },
      {
        q: 'A wwwallet nyílt forráskódú?',
        a: 'A forráskód nyilvánosan elérhető a GitHubon, így bárki elolvashatja. Mivel egyelőre nem nyílt forráskódú licenc alatt tették közzé, egyelőre inkább nyilvános, áttekintésre szánt anyagként tekints rá, nem pedig nyílt forráskódúként.',
      },
      {
        q: 'Mely hálózatokat támogatja a wwwallet?',
        a: 'Az Ethereum főhálózata, valamint a Layer-2 hálózatok – a Polygon, az Arbitrum, a Base és az Optimism – mind ugyanabból a fiókcsoportból.',
      },
      {
        q: 'Mit tud rólam a wwwallet?',
        a: 'Semmi, ami azonosíthatna téged. Nincs fiók, bejelentkezés vagy adatbázis. Az egyenleg- és áradatokat a wwwallet saját háttérrendszere szolgáltatja, nem pedig úgy, hogy a böngésződ közvetlenül harmadik fél szolgáltatókat hívna meg, és ez a háttérrendszer soha nem látja a kulcsaidat, jelszavaidat vagy a helyreállítási kódodat.',
      },
    ],
  },
  footer: {
    tagline: 'Egy személyes, nem letéti Ethereum-pénztárca.',
    sourceLink: 'A forráskód megtekintése a GitHubon',
    copyright: '© {year} wwwallet',
  },
}
