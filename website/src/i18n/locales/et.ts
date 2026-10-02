export default {
  nav: {
    wallet: 'Rahakott',
    ethereum: 'Ethereum',
    crypto: 'Krüptovaluuta',
    faqs: 'Korduma kippuvad küsimused',
    launch: 'Käivita rahakott',
    home: 'Tagasi üles',
    sectionNavLabel: 'Jaotiste navigeerimine',
    principles: 'Põhimõtted',
  },
  settings: {
    open: 'Seaded',
    close: 'Sulge seaded',
    theme: 'Teema',
    themeLight: 'Valgus',
    themeDark: 'Tume',
    language: 'Keel',
    search: 'Otsing',
    noMatches: 'Tulemusi ei leitud',
  },
  hero: {
    eyebrow: 'Tasuta Ethereumi rahakott, mis ei ole hoiustamisega seotud',
    heading1: 'Sinu võtmed.',
    heading2: 'Teie seade.',
    heading3: 'Kõigile tasuta.',
    lede: 'wwwallet töötab teie brauseris ja hoiab teie võtmeid krüpteerituna teie enda seadmes. Kontot pole vaja luua, midagi pole vaja maksta ja reklaame pole – lihtsalt rahakott, mis toimib kõigi jaoks ühtmoodi.',
    ctaPrimary: 'Käivita rahakott',
    ctaSecondary: 'Vaata, kuidas see toimib',
    note: 'Registreerumist pole vaja · Reklaame pole · Jälgimist pole · 31 keelt',
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
        q: 'Kas wwwallet on tõesti tasuta?',
        a: 'Jah. Selle kasutamine on tasuta, puudub premium-tasand ja miski pole tasulise juurdepääsu taga, ning wwwallet ei lisa mingit teenustasu saadetavatele ega vahetatavatele summadele. Ainus vältimatu kulu on võrgu enda tehingutasu (gas), mis läheb võrgule, mitte wwwalletile. Vahetuskursid pärinevad 0x-vahetusagregaatorilt, mis võib mõnede tehingute puhul lisada oma teenustasu – sellised tasud on enne kinnitamist näidatud ülevaateekraanil.',
      },
      {
        q: 'Kas seal on reklaame, jälgimisseadmeid või analüütikat?',
        a: 'Ei. wwwallet ei näita reklaame, ei kasuta analüütika- ega jälgimisskripte ega koosta teie kohta profiili. Kontot pole, seega pole ka midagi, millega seda seostada.',
      },
      {
        q: 'Kas selle kasutamiseks on vaja kontot või isikut tõendavat dokumenti?',
        a: 'Ei. Registreerumist, e-posti aadressi, telefoninumbrit ega isikuandmete kontrolli ei ole vaja – loote oma seadmes rahakoti ja hakkate seda kohe kasutama.',
      },
      {
        q: 'Kui see on tasuta, kuidas wwwallet end ära tasub?',
        a: 'See ei teeni raha kasutajate arvelt – ei tasusid, ei reklaame, ei andmete müüki. Tegevuskulud on kavandatud madalaks: rahakott töötab otse veebibrauseris ning server edastab vaid avalikku plokiahela- ja hinnateavet.',
      },
      {
        q: 'Kas keegi saab mu rahakoti külmutada?',
        a: 'Kontot pole, seega pole wwwalletil – ega kellelgi teisel – midagi külmutada. Teie võtmed ei lahku kunagi teie seadmest ning tehingud allkirjastatakse seal enne, kui need võrku saadetakse. Sinu rahalised vahendid asuvad Ethereumis, mitte wwwalletis: saad vaadata iga konto privaatvõtit või taastamislause selle menüüst ning importida need teise Ethereumi rahakotti, millal iganes soovid.',
      },
      {
        q: 'Kas minu taastamislause on piisav, et oma rahakott tagasi saada?',
        a: 'Mitte iseenesest. Taastamislause avab küll teie krüpteeritud hoiukoha, kuid hoiukoht ise asub ainult teie seadmes. Kui te kaotate selle seadme või kustutate selle sisu, ilma et oleksite varundust teinud, ei jää taastamislausega enam midagi avada. Hoidke taastamislause alati koos Google Drive’i või failivarundusega – vaadake järgmist küsimust.',
      },
      {
        q: 'Kuidas ma saan oma rahakoti varundada?',
        a: 'Tee seadete kaudu oma krüpteeritud hoiukambrist varukoopia oma Google Drive’i – see salvestatakse privaatsesse, ainult rakendusele mõeldud kausta, mille ülejäänud sisu wwwallet ei näe – või failina, mille sa alla laadid ja ise alles hoiad. Tee seda iga kord, kui seadistad rahakotti või lisad uusi kontosid.',
      },
      {
        q: 'Kas ma saan wwwalletit kasutada rohkem kui ühel seadmel?',
        a: 'Jah, kuid see ei sünkroniseeru automaatselt – igal seadmel on oma kohalik hoiulaegas. Et kasutada wwwalletit uuel seadmel, taasta see seal Drive’ist või failivaruandmest ning ava see seejärel taastamislausega.',
      },
      {
        q: 'Mis juhtub, kui ma kaotan oma seadme ja pole kunagi varukoopiaid teinud?',
        a: 'Teie rahalisi vahendeid ei ole võimalik taastada. See on nii kavandatud: wwwalletil puudub kontosüsteem ja see ei säilita teie hoiukambri koopiat kuskil, seega ei saa keegi – kaasa arvatud meie – seda teie jaoks taastada. See on kompromiss, mis kaasneb rahakotiga, millele peale teie ei ole kellelgi juurdepääsu.',
      },
      {
        q: 'Kas juurdepääsukoodid (Face ID / Touch ID) kantakse üle uuele seadmele?',
        a: 'Ei. Parool on seotud seadmega, millel see loodi. Pärast varukoopia taastamist uuel seadmel avage seade oma taastamisfraasiga ning saate seal määrata uue parooli.',
      },
      {
        q: 'Kas wwwallet on avatud lähtekoodiga?',
        a: 'Ei — selle lähtekood on kättesaadav. Kogu lähtekood on avalikult kättesaadav GitHubis, nii et igaüks saab seda lugeda, läbi vaadata ja kontrollida, kuid tegemist ei ole avatud lähtekoodiga: kood on litsentseeritud PolyForm Strict License 1.0.0 alusel.',
      },
      {
        q: 'Mida mul on lubatud selle koodiga teha?',
        a: 'Võite seda kõike lugeda ja kontrollida ning kasutada muutmata koopiat mittekaubanduslikel eesmärkidel, nagu isiklik õppimine, uurimistöö ja testimine. Te ei tohi seda levitada, muuta ega luua sellest tuletatud teoseid (sh harukoode) ega kasutada seda ärilistel eesmärkidel. Kui vajate midagi, mida litsents ei luba, võtke ühendust autoriõiguste omanikuga eraldi litsentsi saamiseks.',
      },
      {
        q: 'Kas wwwallet on kasutamiseks turvaline? Kas sellel on mingi garantii?',
        a: 'wwwallet on hoiustamata tarkvara, mida pakutakse „nagu on“, ilma mingisuguse garantiita. Ainult teie ise kontrollite oma võtmeid ja rahalisi vahendeid – keegi, kaasa arvatud meie, ei saa taastada kadunud taastamislauset ega varukoopiat, tühistada tehingut ega hüvitada teile kahjusid. Kasutage ainult raha, mille kaotamist saate endale lubada, kontrollige enne saatmist hoolikalt aadresse ja võrke ning pidage meeles, et siin esitatud teave ei kujuta endast finants-, investeerimis-, õigus- ega maksualast nõu.',
      },
      {
        q: 'Milliseid võrke toetab wwwallet?',
        a: 'Ethereumi põhivõrk ning 2. kihi võrgustikud Polygon, Arbitrum, Base ja Optimism – kõik samast kontode kogumist.',
      },
      {
        q: 'Kuidas saan oma rahakotti raha lisada?',
        a: 'Avage konto, valige „Vaata QR-koodi”, et näha selle aadressi, ning saatke raha sellele aadressile vahetusplatvormilt või teisest rahakotist. Veendu, et saadad raha õiges võrgustikus (Ethereum, Polygon, Arbitrum, Base või Optimism) – sama aadress toimib neis kõigis, kuid ühes võrgustikus saadetud raha kuvatakse ainult selles võrgustikus. Samuti on vaja veidi võrgu oma münti (nt ETH), et maksta tehingutasusid.',
      },
      {
        q: 'Mida ma saan wwwalletiga teha?',
        a: 'Saada: kanna ETH või mis tahes tokenit aadressile, mille kleebid sisse, skaneerid QR-koodist või valid oma kontode hulgast, ning vaata andmed üle enne kinnitamist. Vahetus: vaheta „Swap“ vahekaardil üht tokenit teise vastu samas võrgustikus, kusjuures hinnapakkumine ja teenustasu hinnang kuvatakse kohe alguses. Vastu võtmine: näita oma aadressi QR-koodina. Samuti saad vaadata oma saldod USD-väärtustes ja tehingute ajalugu kõigis toetatud võrkudes.',
      },
      {
        q: 'Mida teab wwwallet minu kohta?',
        a: 'Mitte midagi, mis võimaldaks sind tuvastada. Kontot, sisselogimist ega andmebaasi pole. Saldo- ja hinnateave laaditakse wwwallet’i enda serverist, mitte nii, et su brauser pöörduks otse kolmandate osapoolte teenusepakkujate poole, ning see server ei näe kunagi su võtmeid, paroole ega taastamislauset.',
      },
    ],
  },
  footer: {
    tagline: 'Tasuta, hoiustamata Ethereumi rahakott kõigile.',
    copyright: '© {year} wwwallet',
    licenseLink: 'Litsentsitud vastavalt PolyForm Strict 1.0.0-le',
    disclaimer:
      'Hoiustamata tarkvara pakutakse „nagu on“, ilma garantiita. See ei ole finantsnõustamine. Teie võtmed ja rahalised vahendid on ainult teie enda vastutusel.',
  },
  principles: {
    eyebrow: 'Põhimõtted',
    heading: 'Tasuta, avatud ja loodud kõigile',
    lede: 'Rahakott peaks olema vahend, mida kasutad, mitte äri, mis tugineb oma kasutajatele. Need on põhimõtted, millele wwwallet tugineb.',
    items: [
      {
        title: 'Tasuta, ilma mingi konksuta',
        body: 'Ei hinda, ei premium-taset, ei tasulisi funktsioone. wwwallet ei lisa mingeid oma tasusid – ainus kulu on võrgu enda tehingutasu.',
      },
      {
        title: 'Ei reklaame, ei jälgimist',
        body: 'Ei mingeid reklaame, analüütikat ega jälgimisskripte, samuti ei müüda andmeid kellelegi. Sinust pole ju üldse mingit profiili, mida müüa.',
      },
      {
        title: 'Registreerumist ei ole vaja',
        body: 'Ei ole vaja e-posti aadressi, telefoninumbrit ega isikut tõendavat dokumenti. Ava rakendus, loo rahakott ja oledki valmis.',
      },
      {
        title: 'Teie võtmed jäävad teile endale',
        body: 'Võtmed luuakse ja krüpteeritakse sinu seadmes ning need ei lahku sealt kunagi. wwwallet ei näe neid, ei saa sinu raha liigutada ega sul juurdepääsu blokeerida.',
      },
      {
        title: 'Töötab kõikjal',
        body: 'Töötab igas kaasaegses brauseris nii nutitelefonis kui ka arvutis ning installitakse nagu rakendus – rakendustepoe kontot ei ole vaja.',
      },
      {
        title: '31 keeles',
        body: 'Kasuta seda keeles, mis sulle kõige rohkem sobib, kas heledas või tumedas režiimis.',
      },
      {
        title: 'Avatud lähtekood',
        body: 'Täielik lähtekood on avaldatud, et igaüks saaks seda lugeda ja kontrollida. Tegemist on pigem lähtekoodiga kui avatud lähtekoodiga – KKK-s selgitatakse, mida litsents lubab.',
      },
      {
        title: 'Ei ole midagi välja lülitada',
        body: 'Kellelgi ei ole kontot, mida saaks külmutada. Teie rahalised vahendid asuvad otse Ethereumi võrgustikus ning iga konto võtme saab igal ajal üle kanda teise rahakotti.',
      },
    ],
  },
  license: {
    title: 'Litsents',
    close: 'Sulge',
    summaryTitle: 'Lihtsas keeles',
    canUse: 'Võite kasutada wwwalletit tasuta isiklikel ja muudel mittekaubanduslikel eesmärkidel.',
    canRead: 'Võite lugeda ja kontrollida selle lähtekoodi iga rida.',
    cannot: 'Seda ei tohi kopeerida, muuta, edasi levitada ega müüa.',
    englishNote:
      'Järgneb täielik litsents originaalkeeles (inglise keeles) — see on juriidiline tekst.',
    viewSource: 'Vaata GitHubis',
  },
}
