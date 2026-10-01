export default {
  nav: {
    wallet: 'Rahakott',
    ethereum: 'Ethereum',
    crypto: 'Krüptovaluuta',
    faqs: 'Korduma kippuvad küsimused',
    launch: 'Käivita rahakott',
    home: 'Tagasi üles',
    sectionNavLabel: 'Jaotiste navigeerimine',
  },
  settings: {
    open: 'Seaded',
    close: 'Sulge seaded',
    theme: 'Teema',
    themeLight: 'Valgus',
    themeDark: 'Tume',
    language: 'Keel',
  },
  hero: {
    eyebrow: 'Isiklik, hoiustamata Ethereumi rahakott',
    heading1: 'Teie võtmed.',
    heading2: 'Teie seade.',
    heading3: 'Sinu rahakott.',
    lede: 'wwwallet krüpteerib teie rahakoti teie enda seadmes ega saada teie võtmeid, paroole ega taastamislauseid kunagi kuhugi mujale. Kontot pole vaja luua. Serverit pole võimalik häkkida. Ainult teie ja teie krüptovaluuta.',
    ctaPrimary: 'Käivita rahakott',
    ctaSecondary: 'Vaata, kuidas see toimib',
  },
  wallet: {
    eyebrow: 'Rahakott',
    heading: 'Valmistatud nii, et ainult sina saad selle avada',
    lede: 'wwwallet ei hoia teie raha – see aitab teil seda ise hoida. Siin on selgitus, mida see praktikas tähendab.',
    points: [
      {
        title: 'Ilma hoiuleandmiseta, alati',
        body: 'Teie privaatvõtmed luuakse ja krüpteeritakse teie enda seadmes. wwwallet’i serverid ei näe neid kunagi – pole mingit rahakottide andmebaasi, mida häkkida, sest sellist andmebaasi pole üldse olemas.',
      },
      {
        title: 'Krüpteeritud AES-256-ga, avatav just nii, nagu soovid',
        body: 'Teie hoiulaegas on kaitstud AES-256-GCM-krüpteeringuga. Avage see taastamislause abil või aktiveerige juurdepääsukood – Face ID, Touch ID või Windows Hello –, et saada kiire juurdepääs ainult kohalikult.',
      },
      {
        title: 'Lukustub automaatselt',
        body: 'wwwallet lukustub pärast lühikest tegevusetuse perioodi ega salvesta teie avatud sessiooni kunagi kettale — kui sulgete vahekaardi, unustab ta selle tahtlikult.',
      },
      {
        title: 'Üks rahakott, viis Ethereumi võrku',
        body: 'Hoida ja saata Ethereumi põhivõrgus, Polygonis, Arbitrumis, Base’is ja Optimismis samade kontode kaudu.',
      },
    ],
    caveatTitle: 'Teie taastamislause avab teie hoiukoha – see ei ole mingi maagiline varukoopia',
    caveatBody:
      'Salvesta taastamislause turvalisse kohta, kuid tee sellest ka varukoopia Google Drive’is või muus failis. Varukoopiat on vaja rahakoti taastamiseks uuel seadmel ning taastamislauset selle avamiseks pärast taastamist.',
    caveatLink: 'Lisateavet leiate KKK-st',
  },
  ethereum: {
    eyebrow: 'Ethereum',
    heading: 'Miks just Ethereum?',
    lede: 'wwwallet on loodud spetsiaalselt Ethereumi jaoks. Siin on selle põhjendused lihtsas keeles.',
    points: [
      {
        title: 'Maailmaarvuti, mitte lihtsalt raamatupidamisregister',
        body: 'Ethereum võttis üle Bitcoini idee jagatud ja võltsimiskindlast raamatupidamisregistrist ning arendas seda edasi: globaalne, programmeeritav arvuti, mille baasil igaüks saab midagi luua ja mida ükski osapool ei saa välja lülitada.',
      },
      {
        title: 'Tagatud stakingu, mitte kaevandamise kaudu',
        body: 'Alates 2022. aasta „Merge’ist” on Ethereumi turvalisust taganud pigem Proof-of-Stake-mehhanism kui energiamahukas kaevandamine — validaatorid seavad ETH-d tagatisena ohtu, selle asemel et kulutada elektrit plokkide pärast võistlemiseks.',
      },
      {
        title: 'Avatud ja lubadeta',
        body: 'Keegi ei kinnita sinu kontot. Igaüks, ükskõik kus ta ka ei asuks, võib hoida ETH-d või luua Ethereumil rakendust – kõigile kehtivad samad reeglid, sealhulgas ka suurimatele institutsioonidele.',
      },
      {
        title: 'Standard, millele teised võrgud tuginevad',
        body: '2. tasandi võrgustikud, nagu Arbitrum, Base ja Optimism – mida kõiki toetab wwwallet – laiendavad Ethereumi turvalisust kiirematele ja odavamatele tehingutele, selle asemel et alustada nullist.',
      },
    ],
    linkLabel: 'Lisateavet leiate Ethereumi Sihtasutuse veebilehelt',
    linkUrl: 'https://ethereum.org/en/foundation/',
  },
  crypto: {
    eyebrow: 'Krüptovaluuta',
    heading: 'Krüptovaluuta lihtsas keeles',
    lede: 'Mõned põhimõtted, mida tasub mõista enne, kui hakkad ise krüptovaluutat hoidma – mitte ainult wwwallet’i kaudu.',
    points: [
      {
        title: 'Haldusõiguslik vs. haldusõiguseta',
        body: 'Haldusrahakott või vahetusplatvorm hoiab teie võtmeid teie eest – see on mugav, kuid te peate lootma, et keegi teine teie rahalisi vahendeid ei külmuta, ei kaota ega kuritarvita. Mittehaldusrahakott, nagu näiteks wwwallet, annab võtmed ja vastutuse ainult teie kätesse.',
      },
      {
        title: 'Staking vs. kaevandamine',
        body: 'Proof-of-Work-tüüpi kaevandamine tagab plokiahela turvalisuse toores arvutusvõimsuse ja elektrienergia abil. Proof-of-Stake-tüüpi kaevandamine tagab selle turvalisuse aga riskikapitali abil. Ethereumi üleminek stakingule vähendas selle energiatarbimist rohkem kui 99,9% võrra – see on umbes sama suur vahe, kui on väikese riigi ja väikese linna varustamisel elektrienergiaga.',
      },
      {
        title: 'Ethereumist kaugemale',
        body: 'Bitcoin seab lihtsuse ja prognoositavuse tähtsamale kohale kui programmeeritavuse. Sellised plokiahelad nagu Solana keskenduvad toorele läbilaskevõimele, ohverdades selle saavutamiseks sageli detsentraliseeritust. Ethereum seab esikohale detsentraliseerituse ja turvalisuse ning jätab kiiruse ja kulude küsimused selle peale ehitatud 2. kihi võrkude hooleks.',
      },
      {
        title: 'Keegi usaldusväärne ei küsi sinult salasõna',
        body: 'Ükskõik millist rahakotti te kasutate: ükski börs, klienditeenindaja ega wwwallet’i töötaja ei küsi teilt kunagi taastamislauseid. Igaüks, kes seda teeb, üritab teid röövida.',
      },
    ],
    linkLabel: 'Sukeldu sügavamale „Bankless“i podcastiga',
    linkUrl: 'https://www.bankless.com/',
  },
  faqs: {
    eyebrow: 'Korduma kippuvad küsimused',
    heading: 'Korduma kippuvad küsimused',
    items: [
      {
        q: 'Kas minu taastamislause on piisav, et oma rahakott tagasi saada?',
        a: 'Mitte iseenesest. Taastamislause avab küll teie krüpteeritud hoiukoha, kuid hoiukoht ise asub ainult teie seadmes. Kui te kaotate selle seadme või kustutate selle sisu, ilma et oleksite varukoopiat teinud, ei jää taastamislausele enam midagi avada. Kasutage taastamislauset alati koos Google Drive’i või failide varukoopiaga – vaadake järgmist küsimust.',
      },
      {
        q: 'Kuidas teha oma rahakotist varukoopia?',
        a: 'Tee seadete kaudu oma krüpteeritud hoiukambrist varukoopia oma Google Drive’i – see salvestatakse privaatsesse, ainult rakendusele mõeldud kausta, mille ülejäänud sisu wwwallet ei näe – või failina, mille sa alla laadid ja ise alles hoiad. Tee seda iga kord, kui seadistad rahakotti või lisad uusi kontosid.',
      },
      {
        q: 'Kas ma saan wwwalletit kasutada rohkem kui ühel seadmel?',
        a: 'Jah, kuid see ei sünkroniseeru automaatselt – igal seadmel on oma kohalik hoiulaegas. Et kasutada wwwalletit uuel seadmel, taasta see seal Drive’ist või failivaruandmest ning ava see seejärel taastamislausega.',
      },
      {
        q: 'Mis juhtub, kui ma kaotan oma seadme ja pole kunagi varukoopiaid teinud?',
        a: 'Teie rahalisi vahendeid ei ole võimalik taastada. See on nii kavandatud: wwwalletil puudub kontosüsteem ja see ei säilita kuskil teie hoiukambri koopiat, mistõttu keegi – kaasa arvatud meie – ei saa seda teie jaoks taastada. See on kompromiss, mis kaasneb rahakotiga, millele peale teie ei pääse keegi ligi.',
      },
      {
        q: 'Kas juurdepääsukoodid (Face ID / Touch ID) kantakse üle uuele seadmele?',
        a: 'Ei. Parool on seotud seadmega, millel see loodi. Pärast varukoopia taastamist uuel seadmel avage seade oma taastamislause abil ja saate seal seadistada uue parooli.',
      },
      {
        q: 'Kas wwwallet on avatud lähtekoodiga?',
        a: 'Ei — selle lähtekood on kättesaadav. Kogu lähtekood on avalikult kättesaadav GitHubis, nii et igaüks saab seda lugeda, läbi vaadata ja kontrollida, kuid tegemist ei ole avatud lähtekoodiga: kood on litsentseeritud PolyForm Strict License 1.0.0 alusel.',
      },
      {
        q: 'Mida mul on lubatud selle koodiga teha?',
        a: 'Võite seda kõike lugeda ja kontrollida ning kasutada muutmata koopiat mittekaubanduslikel eesmärkidel, nagu isiklik õppimine, uurimistöö ja katsetamine. Te ei tohi seda levitada, muuta ega luua sellest tuletatud teoseid (sealhulgas harukoode) ega kasutada seda ärilistel eesmärkidel. Kui vajate midagi, mida litsents ei luba, võtke ühendust autoriõiguse omanikuga eraldi litsentsi saamiseks.',
      },
      {
        q: 'Kas wwwallet on kasutamiseks turvaline? Kas sellel on mingi garantii?',
        a: 'wwwallet on hoiustamata tarkvara, mida pakutakse „nagu on“, ilma mingisuguse garantiita. Ainult teie ise kontrollite oma võtmeid ja rahalisi vahendeid – keegi, kaasa arvatud meie, ei saa taastada kadunud taastusfraasi ega varukoopiat, tühistada tehingut ega hüvitada teile kahjusid. Kasutage ainult raha, mille kaotamist saate endale lubada, kontrollige enne saatmist hoolikalt aadresse ja võrke ning pidage meeles, et siin esitatud teave ei kujuta endast finants-, investeerimis-, õigus- ega maksualast nõuannet.',
      },
      {
        q: 'Milliseid võrke toetab wwwallet?',
        a: 'Ethereumi põhivõrk ning 2. kihi võrgustikud Polygon, Arbitrum, Base ja Optimism – kõik samast kontode kogumist.',
      },
      {
        q: 'Kuidas saan oma rahakotti raha lisada?',
        a: 'Avage konto, valige „Vaata QR-koodi”, et näha selle aadressi, ning saatke raha sellele aadressile vahetusplatvormilt või teisest rahakotist. Veendu, et saadad raha õigel võrgustikul (Ethereum, Polygon, Arbitrum, Base või Optimism) – sama aadress töötab neil kõigil, kuid ühel võrgustikul saadetud raha kuvatakse ainult selles võrgustikus. Samuti on vaja veidi võrgu omavääringut (nt ETH), et maksta tehingutasusid.',
      },
      {
        q: 'Mida ma saan wwwalletiga teha?',
        a: 'Saada: kanna ETH või mis tahes tokenit aadressile, mille kleebid, skannid QR-koodist või valid oma kontode hulgast, ning vaata andmed üle enne kinnitamist. Vahetus: vaheta vahekaardil „Swap“ üht tokenit teise vastu samas võrgustikus, kusjuures hinnapakkumine ja teenustasu hinnang kuvatakse kohe alguses. Vastuvõtt: näita oma aadressi QR-koodina. Samuti saad vaadata oma saldod USD väärtustes ja tehingute ajalugu kõigis toetatud võrkudes.',
      },
      {
        q: 'Mida teab wwwallet minust?',
        a: 'Mitte midagi, mis võimaldaks sind identifitseerida. Kontot, sisselogimist ega andmebaasi pole. Saldo- ja hinnaandmed laaditakse wwwallet’i enda serverist, mitte nii, et su brauser pöörduks otse kolmandate osapoolte teenusepakkujate poole, ning see server ei näe kunagi su võtmeid, paroole ega taastamislauset.',
      },
    ],
  },
  footer: {
    tagline: 'Isiklik, hoiustamata Ethereumi rahakott.',
    sourceLink: 'Vaata lähtekoodi GitHubis',
    copyright: '© {year} wwwallet',
    licenseLink: 'Litsentsitud vastavalt PolyForm Strict 1.0.0-le',
    disclaimer:
      'Hoiustamata tarkvara pakutakse „nagu on“, ilma garantiita. See ei ole finantsnõustamine. Teie võtmed ja rahalised vahendid on ainult teie enda vastutusel.',
  },
}
