export default {
  nav: {
    wallet: 'wwwallet',
    ethereum: 'Ethereum',
    crypto: 'Krüptovaluuta',
    faqs: 'KKK',
    launch: 'Käivita wwwallet',
    home: 'Tagasi üles',
    sectionNavLabel: 'Jaotiste navigeerimine',
    principles: 'Põhimõtted',
  },
  settings: {
    open: 'Seaded',
    close: 'Sulge seaded',
    theme: 'Teema',
    themeLight: 'Kerge',
    themeDark: 'Tume',
    language: 'Keel',
    search: 'Otsing',
    noMatches: 'Ei leitud vasteid',
    version: 'Versioon {version}',
  },
  hero: {
    eyebrow: 'Tasuta, mittehoolduslik Ethereumi rahakott',
    heading1: 'Teie võtmed.',
    heading2: 'Teie seade.',
    heading3: 'Tasuta kõigile.',
    lede: 'wwwallet töötab teie brauseris ja hoiab teie võtmeid krüpteerituna teie enda seadmes. Kontot pole vaja luua, midagi pole vaja maksta ja reklaame pole, ning see töötab kõigi jaoks ühtmoodi.',
    ctaPrimary: 'Käivita wwwallet',
    ctaSecondary: 'Vaata, kuidas see toimib',
    note: 'Ei registreerimist · Ei reklaame · Ei jälgimist · 31 keelt',
  },
  wallet: {
    eyebrow: 'wwwallet',
    heading: 'Loodud nii, et ainult sina saad selle avada',
    lede: 'wwwallet ei hoia teie vahendeid – see aitab teil neid ise hoida. Siin on selgitus, mida see praktikas tähendab.',
    points: [
      {
        title: 'Ilma hooldusõiguseta, alati',
        body: 'Teie privaatvõtmed genereeritakse ja krüpteeritakse teie enda seadmes. wwwallet’i serverid ei näe neid kunagi – pole mingit võtmete andmebaasi, mida rikkuda, sest andmebaasi pole üldse olemas.',
      },
      {
        title: 'Krüpteeritud AES-256-ga, avatav sinu valitud viisil',
        body: 'Teie hoiulaegas on kaitstud AES-256-GCM-krüpteeringuga. Avage see oma taastamislausega või aktiveerige parool – Face ID, Touch ID või Windows Hello –, et saada kiire ja ainult kohalik juurdepääs.',
      },
      {
        title: 'Lukustub automaatselt',
        body: 'wwwallet lukustub pärast lühikest tegevusetust ja ei salvesta teie avatud sessiooni kunagi kettale – sulgege vahekaart ja rakendus unustab selle tahtlikult.',
      },
      {
        title: 'Viisteist Ethereumi võrku, üks kontode komplekt',
        body: 'Hoidke ja saatke Ethereumi põhivõrgus ja veel 14 võrgus – sealhulgas Arbitrum, Base, Optimism, Polygon, Linea ja ZKsync – samade kontode ja aadressidega.',
      },
    ],
    caveatTitle: 'Teie taastamislause avab teie hoiukambri – see ei ole mingi maagiline varukoopia',
    caveatBody:
      'Salvestage oma taastamislause kuhugi turvalisse kohta, kuid tehke ka varukoopia Google Drive’i või failina. Varukoopiat on vaja rahakoti taastamiseks uuel seadmel ja lause on vaja selle avamiseks, kui olete seda teinud.',
    caveatLink: 'Loe lisaks KKK-st',
  },
  ethereum: {
    eyebrow: 'Ethereum',
    heading: 'Miks just Ethereum?',
    lede: 'wwwallet on loodud spetsiaalselt Ethereumi jaoks. Siin on selle eelised lihtsas keeles.',
    points: [
      {
        title: 'Maailmaarvuti, mitte lihtsalt raamatupidamisregister',
        body: 'Ethereum võttis üle Bitcoini idee jagatud, võltsimiskindlast raamatupidamisest ja laiendas seda: globaalne, programmeeritav arvuti, millele igaüks saab ehitada ja mida ükski osapool ei saa välja lülitada.',
      },
      {
        title: 'Turvatud stakingu, mitte kaevandamise abil',
        body: 'Alates 2022. aasta „Merge’ist“ on Ethereumi turvalisust taganud Proof-of-Stake, mitte energiamahukas kaevandamine – validaatorid panevad ETH-d tagatiseks, selle asemel et kulutada elektrit plokkide eest võistlemiseks.',
      },
      {
        title: 'Avatud ja lubadeta',
        body: 'Keegi ei kinnita teie kontot. Igaüks, ükskõik kus, võib hoida ETH-d või luua Ethereumi baasil rakendust – samad reeglid kehtivad kõigile, sealhulgas suurimatele institutsioonidele.',
      },
      {
        title: 'Standard, millele teised võrgustikud tuginevad',
        body: '2. kihi võrgustikud nagu Arbitrum, Base ja Optimism – mida kõiki toetab wwwallet – laiendavad Ethereumi turvalisust kiirematele ja odavamatele tehingutele, selle asemel et alustada nullist.',
      },
    ],
    linkLabel: 'Loe lähemalt Ethereumi Sihtasutuse veebilehelt',
    linkUrl: 'https://ethereum.org/en/foundation/',
  },
  crypto: {
    eyebrow: 'Krüptovaluuta',
    heading: 'Krüptovaluuta lihtsates sõnades',
    lede: 'Mõned mõisted, mida tasub mõista enne, kui hakkate ise krüptovaluutat hoidma – mitte ainult wwwalletiga.',
    points: [
      {
        title: 'Halduslik vs. mittehalduslik',
        body: 'Haldusrahakott või vahetusplatvorm hoiab teie võtmeid teie eest – see on mugav, kuid te usaldate, et keegi teine ei külmuta, kaota ega kuritarvita teie vahendeid. Mittehalduslik rahakott, nagu wwwallet, jätab võtmed ja vastutuse ainult teie kätesse.',
      },
      {
        title: 'Staking vs. kaevandamine',
        body: 'Proof-of-Work-kaevandamine tagab plokiahela turvalisuse toores arvutusvõimsuse ja elektrienergia abil. Proof-of-Stake tagab selle turvalisuse hoopis riskikapitali abil. Ethereumi üleminek stakingule vähendas selle energiatarbimist rohkem kui 99,9% võrra – see on umbes sama suur vahe, kui on väikese riigi ja väikese linna varustamine elektrienergiaga.',
      },
      {
        title: 'Enam kui Ethereum',
        body: 'Bitcoin seab lihtsuse ja ennustatavuse tähtsamaks kui programmeeritavuse. Sellised ahelad nagu Solana rõhutavad toorläbilaskevõimet, ohverdades selle saavutamiseks sageli detsentraliseeritust. Ethereum seab esikohale detsentraliseerituse ja turvalisuse ning jätab kiiruse ja kulud selle peale ehitatud 2. kihi võrkude hooleks.',
      },
      {
        title: 'Keegi usaldusväärne ei küsi sinult seda fraasi',
        body: 'Ükski börs, ükski klienditoe töötaja ega keegi wwwalletist ei küsi kunagi sinult taastamislauseid – olenemata sellest, millist rakendust sa kasutad. Igaüks, kes seda teeb, üritab sind röövida.',
      },
    ],
    linkLabel: 'Sügavuti teemasse Banklessi podcastis',
    linkUrl: 'https://www.bankless.com/',
  },
  faqs: {
    eyebrow: 'Korduma kippuvad küsimused',
    heading: 'Korduma kippuvad küsimused',
    items: [
      {
        q: 'Kas wwwallet on tõesti tasuta?',
        a: 'Jah. Rakenduse kasutamine on tasuta, puudub premium-tasand ja midagi pole tasulise sisu taga, ning wwwallet ei lisa mingit teenustasu sinu saadetud või vahetatud summadele. Ainus vältimatu kulu on võrgu enda tehingutasu (gas), mis läheb võrgule, mitte wwwalletile. Vahetuskursid pärinevad 0x-i vahetusagregaatorilt (või LI.FI-lt võrkudes, mida 0x ei hõlma), mis võib mõnede tehingute puhul lisada oma teenustasu – sellised teenustasud on loetletud ülevaateekraanil enne kinnitamist.',
      },
      {
        q: 'Kas seal on reklaame, jälgimisseadmeid või analüütikat?',
        a: 'Ei. wwwallet ei näita reklaame, ei kasuta analüütika- ega jälgimisskripte ega koosta teie profiili. Kontot pole, seega pole ka midagi, millega seda seostada.',
      },
      {
        q: 'Kas selle kasutamiseks on vaja kontot või isikutunnistust?',
        a: 'Ei. Registreerimist, e-posti aadressi, telefoninumbrit ega isikuandmete kontrolli ei ole – loote rahakoti oma seadmes ja hakkate seda kohe kasutama.',
      },
      {
        q: 'Kui see on tasuta, kuidas wwwallet end ära tasub?',
        a: 'Rakendus ei teeni raha kasutajate arvelt – ei tasusid, ei reklaame, ei andmete müüki. Tegevuskulud on disainilt hoitud madalad: rakendus ise töötab teie brauseris ja server edastab ainult avalikku plokiahela- ja hinnateavet.',
      },
      {
        q: 'Kas keegi saab minu rahakoti külmutada?',
        a: 'Kontot ei ole, seega pole wwwalletil – ega kellelgi teisel – midagi külmutada. Teie võtmed ei lahku kunagi teie seadmest ning tehingud allkirjastatakse seal enne, kui need võrku saadetakse. Teie rahalised vahendid asuvad Ethereumis, mitte wwwalletis: saate vaadata iga konto privaatvõtit või taastamislauset selle menüüst ning importida need mis tahes teise Ethereumi rahakoti rakendusse, millal iganes soovite.',
      },
      {
        q: 'Kas minu taastamislause on piisav, et oma rahakott tagasi saada?',
        a: 'Mitte eraldi. Teie taastamislause avab teie krüpteeritud hoiukambri, kuid hoiukamber ise asub ainult teie seadmes. Kui te kaotate selle seadme või kustutate selle sisu, ilma et oleksite kunagi varukoopiat teinud, ei jää midagi, mida lause saaks avada. Hoidke oma taastamislause alati koos Google Drive’i või failide varukoopiaga – vaadake järgmist küsimust.',
      },
      {
        q: 'Kuidas ma saan oma rahakotist varukoopia teha?',
        a: 'Tee seadete alt oma krüpteeritud hoiukambrist varukoopia oma Google Drive’i või failina, mille sa alla laadid ja ise hoiad. Drive’i varukoopia salvestatakse privaatsesse rakenduse kausta ning wwwallet ei näe midagi muud sinu Drive’is. Tee varukoopia esmakordsel seadistamisel ja uuesti iga kord, kui lisad kontosid.',
      },
      {
        q: 'Kas ma saan wwwalletit kasutada rohkem kui ühel seadmel?',
        a: 'Jah, kuid see ei sünkroniseeru automaatselt – igal seadmel on oma kohalik hoiulaegas. Et kasutada wwwalletit uuel seadmel, taasta see seal Drive’ist või failivaruandmest ning ava see seejärel taastamislausega.',
      },
      {
        q: 'Mis juhtub, kui ma kaotan oma seadme ja pole kunagi varukoopiat teinud?',
        a: 'Teie vahendeid ei ole võimalik taastada. See on nii kavandatud: wwwalletil puudub kontosüsteem ja see ei säilita kuskil teie hoiukambri koopiat, seega ei saa keegi – kaasa arvatud meie – seda teie eest taastada. See on kompromiss võtmete eest, millele keegi peale teie juurdepääsu ei oma.',
      },
      {
        q: 'Kas juurdepääsukoodid (Face ID / Touch ID) kantakse üle uuele seadmele?',
        a: 'Ei. Parool on seotud seadmega, millel see loodi. Pärast varukoopia taastamist uuel seadmel avage see oma taastamislausega ja saate seal seadistada uue parooli.',
      },
      {
        q: 'Kas wwwallet on avatud lähtekoodiga?',
        a: 'Ei – see on allikakoodiga kättesaadav. Täielik allikakood on avalikult kättesaadav GitHubis, nii et igaüks saab seda lugeda, läbi vaadata ja auditeerida, kuid see ei ole avatud lähtekoodiga: kood on litsentseeritud PolyForm Strict License 1.0.0 alusel.',
      },
      {
        q: 'Mida ma tohin selle koodiga teha?',
        a: 'Võite kogu teksti läbi lugeda ja kontrollida ning kasutada muutmata koopiat mittekaubanduslikel eesmärkidel, nagu isiklik õppimine, uurimistöö ja testimine. Te ei tohi seda levitada, muuta ega luua sellest tuletatud teoseid (sealhulgas harukoode) ega kasutada seda ärilistel eesmärkidel. Kui vajate midagi, mida litsents ei luba, võtke ühendust autoriõiguste omanikuga eraldi litsentsi saamiseks.',
      },
      {
        q: 'Kas wwwallet on kasutamiseks turvaline? Kas on mingit garantiid?',
        a: 'wwwallet on hoiustamata tarkvara, mida pakutakse „nagu on“, ilma mingisuguse garantiita. Ainult teie kontrollite oma võtmeid ja rahalisi vahendeid – keegi, kaasa arvatud meie, ei saa taastada kadunud taastamislauset ega varukoopiat, tühistada tehingut ega hüvitada teile kahjusid. Kasutage ainult raha, mille kaotamist saate endale lubada, kontrollige enne saatmist hoolikalt aadresse ja võrke ning pidage meeles, et siin esitatud teave ei kujuta endast finants-, investeerimis-, õigus- ega maksualast nõuannet.',
      },
      {
        q: 'Milliseid võrke wwwallet toetab?',
        a: 'Ethereumi põhivõrk, lisaks Arbitrum, Base, Optimism, Polygon, Robinhood Chain, World Chain, Ink, Linea, Gnosis, Celo, ZKsync Era, Ronin, Unichain ja Scroll – kõik samast kontode kogumist.',
      },
      {
        q: 'Kuidas ma oma rahakotti raha lisan?',
        a: 'Avage konto, valige „Vaata QR-koodi”, et näha selle aadressi, ja saatke raha sellele aadressile vahetusplatvormilt või teisest rahakotist. Veenduge, et saadate raha õigel võrgustikul (nt Ethereum, Base või Arbitrum) – sama aadress toimib igas toetatud võrgustikus, kuid ühel võrgustikul saadetud raha ilmub ainult selles võrgustikus. Samuti on vaja veidi võrgu oma münti (nt ETH), et maksta tehingutasusid.',
      },
      {
        q: 'Mida ma saan wwwalletiga teha?',
        a: 'Saada: kanna ETH või mis tahes tokenit aadressile, mille kleebid sisse, skannid QR-koodist või valid oma kontode hulgast, ning vaata andmed üle enne kinnitamist. Vaheta: vaheta üks token teise vastu samas võrgus vahekaardil „Swap“, kus hinnapakkumine ja teenustasu hinnang kuvatakse kohe alguses. Vastu võta: näita oma aadressi QR-koodina. Samuti saad vaadata oma saldod USD-väärtustes ja tehingute ajalugu kõigis toetatud võrkudes.',
      },
      {
        q: 'Mida wwwallet minust teab?',
        a: 'Mitte midagi, mis võimaldaks sind identifitseerida. Kontot, sisselogimist ega andmebaasi ei ole. Saldo- ja hinnateave laaditakse wwwallet’i enda tagapõhja kaudu, mitte nii, et su brauser pöörduks otse kolmandate osapoolte teenusepakkujate poole, ning see tagapõhi ei näe kunagi su võtmeid, paroole ega taastamislauset.',
      },
    ],
  },
  footer: {
    tagline: 'Tasuta, mittehoolduslik Ethereumi rahakott kõigile.',
    copyright: '© {year} wwwallet',
    licenseLink: 'Litsentsitud PolyForm Strict 1.0.0 alusel',
    disclaimer:
      'Mittehoolduslik tarkvara pakutakse „nagu on“, ilma garantiita. See ei ole finantsnõustamine. Teie võtmed ja rahalised vahendid on ainult teie enda vastutusel.',
  },
  principles: {
    eyebrow: 'Põhimõtted',
    heading: 'Tasuta, avatud ja loodud kõigile',
    lede: 'Tarkvara, mis hoiab teie raha, peaks olema teie poolt kasutatav tööriist, mitte kasutajate arvelt üles ehitatud äri. Need on põhimõtted, millele wwwallet on rajatud.',
    items: [
      {
        title: 'Tasuta, ilma konksudeta',
        body: 'Ei mingeid hindu, ei mingeid premium-tasemeid, ei mingeid tasulisi funktsioone. wwwallet ei lisa mingeid oma tasusid – ainus kulu on võrgu enda tehingutasu.',
      },
      {
        title: 'Ei mingeid reklaame ega jälgimist',
        body: 'Ei mingeid reklaame, analüütikat, jälgimisskripte ega andmete müüki kellelegi. Esiteks pole sinu profiili, mida müüa.',
      },
      {
        title: 'Registreerumist ei ole vaja',
        body: 'Ei ole vaja e-posti aadressi, telefoninumbrit ega isikut tõendavat dokumenti. Avage rakendus, looge rahakott ja olete valmis.',
      },
      {
        title: 'Teie võtmed jäävad teie kätte',
        body: 'Võtmed luuakse ja krüpteeritakse teie seadmes ning ei lahku sealt kunagi. wwwallet ei näe neid, ei saa teie vahendeid liigutada ega teid välja lukustada.',
      },
      {
        title: 'Töötab kõikjal',
        body: 'Töötab igas kaasaegses brauseris nii telefonis kui ka arvutis ning installitakse nagu rakendus – rakenduste poe kontot ei ole vaja.',
      },
      {
        title: '31 keeles',
        body: 'Kasutage seda keeles, mis teile kõige paremini sobib, heledas või tumedas režiimis.',
      },
      {
        title: 'Avatud kood',
        body: 'Täielik lähtekood on avaldatud, et igaüks saaks seda lugeda ja kontrollida. Tegemist on pigem lähtekoodiga kui avatud lähtekoodiga – KKK-s selgitatakse, mida litsents lubab.',
      },
      {
        title: 'Midagi välja lülitada pole',
        body: 'Siin pole ühtegi kontot, mida keegi saaks külmutada. Teie rahalised vahendid asuvad Ethereumis endas ning iga konto võtme saab igal ajal üle viia teise rahakotti.',
      },
    ],
  },
  license: {
    title: 'Litsents',
    close: 'Sulge',
    summaryTitle: 'Lihtsas inglise keeles',
    canUse: 'Võite kasutada wwwalletit tasuta isiklikel ja muudel mittekaubanduslikel eesmärkidel.',
    canRead: 'Võite lugeda ja kontrollida iga rida selle lähtekoodist.',
    cannot: 'Seda ei tohi kopeerida, muuta, levitada ega müüa.',
    englishNote:
      'Järgneb täielik litsents originaalkeeles inglise keeles – see on juriidiline tekst.',
    viewSource: 'Vaata allikat GitHubis',
  },
  meta: {
    title: 'wwwallet — tasuta, mittehoolduslik Ethereumi rahakott',
    description:
      'Tasuta Ethereumi rahakott teie brauseris. Ei registreerimist, ei reklaame, ei jälgimist – teie võtmed jäävad teie seadmes krüpteeritud kujul. Ethereum, Base, Arbitrum, Optimism, Polygon ja veel 10 võrku.',
  },
}
