export default {
  nav: {
    wallet: 'wwwallet',
    ethereum: 'Ethereum',
    crypto: 'Kriptovalute',
    faqs: 'Pogosta vprašanja',
    launch: 'Začetek wwwallet',
    home: 'Nazaj na vrh',
    sectionNavLabel: 'Navigacija po poglavjih',
    principles: 'Načela',
  },
  settings: {
    open: 'Nastavitve',
    close: 'Zapri nastavitve',
    theme: 'Tema',
    themeLight: 'Svetlo',
    themeDark: 'Temno',
    language: 'Jezik',
    search: 'Iskanje',
    noMatches: 'Ni ujemanj',
    version: 'Različica {version}',
  },
  hero: {
    eyebrow: 'Brezplačna denarnica za Ethereum brez skrbništva',
    heading1: 'Vaši ključi.',
    heading2: 'Vaša naprava.',
    heading3: 'Brezplačno za vse.',
    lede: 'wwwallet deluje v vašem brskalniku in vaše ključe hrani šifrirane na vaši lastni napravi. Ni treba ustvarjati računa, ničesar plačati in ni oglasov, deluje pa enako za vse.',
    ctaPrimary: 'Zaženite wwwallet',
    ctaSecondary: 'Oglejte si, kako deluje',
    note: 'Brez registracije · Brez oglasov · Brez sledenja · 31 jezikov',
  },
  wallet: {
    eyebrow: 'wwwallet',
    heading: 'Zgrajen tako, da ga lahko odprete samo vi',
    lede: 'wwwallet ne hrani vaših sredstev – pomaga vam, da jih hranite sami. Tukaj je, kaj to pomeni v praksi.',
    points: [
      {
        title: 'Brez skrbništva, vedno',
        body: 'Vaši zasebni ključi se ustvarijo in šifrirajo na vaši lastni napravi. Strežniki wwwallet jih nikoli ne vidijo – ni baze podatkov s ključi, ki bi jo bilo mogoče vdreti, saj te baze sploh ni.',
      },
      {
        title: 'Šifrirano z AES-256, odklene se po vaši želji',
        body: 'Vaš trezor je zaščiten s šifriranjem AES-256-GCM. Odklenite ga s svojo obnovitveno frazo ali omogočite geslo – Face ID, Touch ID ali Windows Hello – za hiter dostop, ki je omejen le na lokalno rabo.',
      },
      {
        title: 'Samodejno se zaklene',
        body: 'wwwallet se po kratkem obdobju nedejavnosti zaklene in vaše odklejene seje nikoli ne shrani na disk – zaprite zavihek in aplikacija to namerno pozabi.',
      },
      {
        title: 'Pet omrežij Ethereuma, en sklop računov',
        body: 'Shranjujte in pošiljajte prek glavnega omrežja Ethereum, Polygon, Arbitrum, Base in Optimism z istimi računi in naslovi.',
      },
    ],
    caveatTitle: 'Vaša obnovitvena fraza odklene vaš trezor – to ni čarobna varnostna kopija',
    caveatBody:
      'Svojo obnovitveno frazo shranite na varno mesto, hkrati pa naredite varnostno kopijo v Google Drive ali v datoteko. Varnostno kopijo boste potrebovali za obnovitev denarnice na novi napravi, frazo pa za njeno odklepanje, ko jo boste obnovili.',
    caveatLink: 'Več si preberite v pogostih vprašanjih',
  },
  ethereum: {
    eyebrow: 'Ethereum',
    heading: 'Zakaj Ethereum',
    lede: 'wwwallet je zasnovan posebej za Ethereum. Tukaj je razlaga v preprostih besedah.',
    points: [
      {
        title: 'Svetovni računalnik, ne le glavna knjiga',
        body: 'Ethereum je prevzel Bitcoinovo idejo o skupni, zaščiteni pred ponarejanjem knjigi transakcij in jo razširil: globalni, programabilni računalnik, na katerem lahko vsakdo gradi, in ki ga nobena posamezna stranka ne more izklopiti.',
      },
      {
        title: 'Zaščiteno s stakingom, ne z rudarjenjem',
        body: 'Od »združitve« (The Merge) leta 2022 je Ethereum zavarovan s sistemom Proof-of-Stake namesto z energetsko intenzivnim rudarjenjem – validatorji tvegajo ETH kot zavarovanje namesto da bi porabljali električno energijo za tekmovanje za bloke.',
      },
      {
        title: 'Odprto in brez omejitev',
        body: 'Nihče ne odobri vašega računa. Kdorkoli, kjerkoli, lahko poseduje ETH ali razvije aplikacijo na Ethereumu – za vse veljajo enaka pravila, vključno z največjimi institucijami.',
      },
      {
        title: 'Standard, na katerem temeljijo druga omrežja',
        body: 'Omrežja Layer-2, kot so Arbitrum, Base in Optimism – ki jih wwwallet v celoti podpira – razširjajo varnost Ethereuma na hitrejše in cenejše transakcije, namesto da bi začeli z nič.',
      },
    ],
    linkLabel: 'Več si preberite na spletni strani Fundacije Ethereum',
    linkUrl: 'https://ethereum.org/en/foundation/',
  },
  crypto: {
    eyebrow: 'Kriptovalute',
    heading: 'Kriptovalute v preprostih besedah',
    lede: 'Nekaj pojmov, ki jih je vredno razumeti, preden sami začnete imeti kriptovalute – ne le z wwwallet.',
    points: [
      {
        title: 'Skrbniško upravljanje proti neskrbniškemu upravljanju',
        body: 'Denarnica s skrbništvom ali borza hrani vaše ključe za vas – to je priročno, vendar morate zaupati, da nekdo drug ne bo zamrznil, izgubil ali zlorabil vaših sredstev. Denarnica brez skrbništva, kot je wwwallet, pušča ključe in odgovornost izključno v vaših rokah.',
      },
      {
        title: 'Staking v primerjavi z rudarjenjem',
        body: 'Rudarjenje po načelu »Proof-of-Work« (dokaz dela) varuje verigo blokov z surovo računalniško močjo in električno energijo. »Proof-of-Stake« (dokaz deleža) jo namesto tega varuje s tveganim kapitalom. Prehod Ethereuma na staking je zmanjšal porabo energije za več kot 99,9 % – to je približno razlika med oskrbo z električno energijo majhne države in majhnega mesta.',
      },
      {
        title: 'Onkraj Ethereuma',
        body: 'Bitcoin daje prednost preprostosti in predvidljivosti pred programirljivostjo. Verige, kot je Solana, poudarjajo surovo prepustnost, pri čemer pogosto žrtvujejo decentralizacijo, da bi to dosegle. Ethereum daje prednost decentralizaciji in varnosti, hitrost in stroške pa prepušča omrežjem Layer-2, zgrajenim na njegovi podlagi.',
      },
      {
        title: 'Nihče, ki je legitimen, ne bo zahteval vaše fraze',
        body: 'Nobena borza, noben predstavnik podpore in nihče iz wwwallet vas nikoli ne bo prosil za vašo obnovitveno frazo – ne glede na to, katero aplikacijo uporabljate. Kdor koli to stori, poskuša vas oropati.',
      },
    ],
    linkLabel: 'Poglobite se s podcastom Bankless',
    linkUrl: 'https://www.bankless.com/',
  },
  faqs: {
    eyebrow: 'Pogosta vprašanja',
    heading: 'Pogosta vprašanja',
    items: [
      {
        q: 'Ali je wwwallet res brezplačen?',
        a: 'Da. Uporaba je brezplačna, ni premium ravni in ničesar za plačilnim zidom, wwwallet pa ne dodaja provizije k ničemer, kar pošljete ali zamenjate. Edini neizogibni strošek je lastna transakcijska (gas) provizija omrežja, ki gre omrežju in ne wwwalletu. Ponudbe za zamenjavo prihajajo iz agregatorja borz 0x, ki lahko pri nekaterih transakcijah vključi lastno provizijo – vsaka taka provizija je navedena na preglednem zaslonu, preden potrdite transakcijo.',
      },
      {
        q: 'Ali so v aplikaciji oglasi, sledilci ali analitični podatki?',
        a: 'Ne. wwwallet ne prikazuje oglasov, ne izvaja analitičnih ali sledilnih skriptov in ne ustvarja vašega profila. Ni računa, zato ni ničesar, s čimer bi ga lahko povezali.',
      },
      {
        q: 'Ali potrebujem račun ali identifikacijsko številko za uporabo?',
        a: 'Ne. Ni registracije, e-poštnega naslova, telefonske številke ali preverjanja identitete – denarnico ustvarite na svoji napravi in jo začnete uporabljati.',
      },
      {
        q: 'Če je brezplačna, kako se wwwallet financira?',
        a: 'Aplikacija ne zasluži denarja na račun svojih uporabnikov – brez provizij, brez oglasov, brez prodaje podatkov. Stroški delovanja so namerno nizki: sama aplikacija deluje v vašem brskalniku, strežniški del pa le posreduje javne podatke iz verige blokov in podatke o cenah.',
      },
      {
        q: 'Ali lahko kdorkoli zamrzne mojo denarnico?',
        a: 'Ni računa, zato wwwallet – ali kdor koli drug – ne more ničesar zamrzniti. Vaši ključi nikoli ne zapustijo vaše naprave, transakcije pa se tam podpišejo, preden se pošljejo v omrežje. Vaša sredstva so na Ethereumu, ne v wwwallet: zasebni ključ ali obnovitveno frazo katerega koli računa lahko ogledate v njegovem meniju in jo kadarkoli uvozite v katero koli drugo aplikacijo denarnice za Ethereum.',
      },
      {
        q: 'Ali je moja obnovitvena fraza dovolj, da ponovno pridobim dostop do denarnice?',
        a: 'Ne sama po sebi. Vaša obnovitvena fraza odklene vaš šifriran trezor, vendar sam trezor obstaja le na vaši napravi. Če izgubite ali izbrišete to napravo, ne da bi kdajkoli naredili varnostno kopijo, fraza ne bo imela več kaj odkleniti. Obnovitveno frazo vedno združite z varnostno kopijo na Google Drive ali v datoteki – glejte naslednje vprašanje.',
      },
      {
        q: 'Kako naredim varnostno kopijo svojega denarnika?',
        a: 'V nastavitvah naredite varnostno kopijo svojega šifriranega trezorja na svoj Google Drive ali kot datoteko, ki jo prenesete in shranite sami. Varnostna kopija na Drive se shrani v zasebno mapo aplikacije, wwwallet pa ne more videti ničesar drugega na vašem Drive. Naredite varnostno kopijo ob prvi nastavitvi in nato vsakič, ko dodate račune.',
      },
      {
        q: 'Ali lahko uporabljam wwwallet na več kot eni napravi?',
        a: 'Da, vendar se ne sinhronizira samodejno – vsaka naprava hrani svoj lokalni trezor. Če želite uporabljati wwwallet na novi napravi, ga tam obnovite iz Drivea ali varnostne kopije datoteke, nato pa ga odklenite s svojo obnovitveno frazo.',
      },
      {
        q: 'Kaj se zgodi, če izgubim svojo napravo in nisem nikoli naredil varnostne kopije?',
        a: 'Vaša sredstva so nepovratna. Tako je namreč zasnovano: wwwallet nima sistema računov in nikjer ne hrani kopije vašega trezorja, zato ga nihče – vključno z nami – ne more obnoviti za vas. To je kompromis za ključe, do katerih nima dostopa nihče razen vas.',
      },
      {
        q: 'Ali se gesla za odklepanje (Face ID / Touch ID) prenesejo na novo napravo?',
        a: 'Ne. Geslo je vezano na napravo, na kateri je bilo ustvarjeno. Po obnovitvi varnostne kopije na novi napravi jo odkleni s svojo obnovitveno frazo in tam lahko nastaviš novo geslo.',
      },
      {
        q: 'Ali je wwwallet odprtokodna aplikacija?',
        a: 'Ne – izvorna koda je na voljo. Celotna izvorna koda je javno objavljena na GitHubu, tako da jo lahko kdorkoli prebere, pregleda in preveri, vendar ni odprtokodna: koda je licencirana pod licenco PolyForm Strict License 1.0.0.',
      },
      {
        q: 'Kaj smem početi s kodo?',
        a: 'Vse to lahko preberete in pregledate ter za nekomercialne namene, kot so osebno učenje, raziskovanje in testiranje, uporabljate nespremenjeno kopijo. Ne smete ga razširjati, spreminjati ali ustvarjati izpeljank (vključno z razcepi) niti ga uporabljati v komercialne namene. Če potrebujete kaj, česar licenca ne dovoljuje, se obrnite na imetnika avtorskih pravic za ločeno licenco.',
      },
      {
        q: 'Ali je uporaba wwwallet varna? Ali obstaja kakšna garancija?',
        a: 'wwwallet je program brez skrbništva, ki se zagotavlja »tak, kot je«, brez kakršnih koli garancij. Samo vi imate nadzor nad svojimi ključi in sredstvi – nihče, vključno z nami, ne more obnoviti izgubljene obnovitvene fraze ali varnostne kopije, razveljaviti transakcije ali vam nadomestiti izgube. Uporabljajte le sredstva, ki si jih lahko privoščite izgubiti, pred pošiljanjem dvakrat preverite naslove in omrežja, pri čemer nič od tega ne predstavlja finančnega, naložbenega, pravnega ali davčnega nasveta.',
      },
      {
        q: 'Katera omrežja podpira wwwallet?',
        a: 'Glavno omrežje Ethereuma ter omrežja Layer-2 Polygon, Arbitrum, Base in Optimism – vse iz istega niza računov.',
      },
      {
        q: 'Kako napolnim svoj denarnik?',
        a: 'Odprite račun, izberite »Poglej QR-kodo«, da si ogledate naslov, in na ta naslov pošljite sredstva z borze ali iz druge denarnice. Prepričajte se, da pošiljate prek pravega omrežja (Ethereum, Polygon, Arbitrum, Base ali Optimism) – isti naslov deluje na vseh omrežjih, vendar se sredstva, poslana prek enega omrežja, prikažejo le na tem omrežju. Prav tako boste potrebovali nekaj domače kriptovalute omrežja (kot je ETH) za plačilo transakcijskih stroškov.',
      },
      {
        q: 'Kaj lahko počnem z wwwallet?',
        a: 'Pošlji: prenesi ETH ali kateri koli token na naslov, ki ga prilepiš, skeniraš iz QR-kode ali izbereš iz svojih računov, ter preglej podrobnosti, preden potrdiš. Zamenjaj: zamenjaj en token za drugega v istem omrežju na zavihku »Zamenjaj«, pri čemer sta ponudba in ocena provizije prikazani vnaprej. Prejmi: prikaži svoj naslov kot QR-kodo. Prav tako lahko pregledate stanja v USD in zgodovino transakcij v vseh podprtih omrežjih.',
      },
      {
        q: 'Kaj wwwallet ve o meni?',
        a: 'Ničesar, kar bi vas identificiralo. Ni računa, prijave ali baze podatkov. Podatki o stanju in cenah se pridobivajo prek lastnega strežnika aplikacije wwwallet, namesto da bi vaš brskalnik neposredno poklical zunanje ponudnike, pri čemer ta strežnik nikoli ne vidi vaših ključev, gesel ali obnovitvene fraze.',
      },
    ],
  },
  footer: {
    tagline: 'Brezplačna denarnica za Ethereum brez skrbništva za vse.',
    copyright: '© {year} wwwallet',
    licenseLink: 'Licencirano pod PolyForm Strict 1.0.0',
    disclaimer:
      'Programska oprema brez skrbništva se zagotavlja »tako, kot je«, brez garancije. To ni finančno svetovanje. Za svoje ključe in sredstva ste odgovorni izključno vi.',
  },
  license: {
    title: 'Licenca',
    close: 'Zapri',
    summaryTitle: 'V preprostem angleškem jeziku',
    canUse:
      'Aplikacijo wwwallet lahko uporabljate brezplačno za osebne in druge nekomercialne namene.',
    canRead: 'Lahko preberete in pregledate vsako vrstico izvorne kode.',
    cannot: 'Besedila ne smete kopirati, spreminjati, ponovno distribuirati ali prodajati.',
    englishNote: 'Sledi celotna licenca v izvirnem angleškem besedilu – to je pravno besedilo.',
    viewSource: 'Oglejte si izvorno kodo na GitHubu',
  },
  principles: {
    eyebrow: 'Načela',
    heading: 'Brezplačna, odprta in ustvarjena za vsakogar',
    lede: 'Programska oprema, ki hrani vaše denarno sredstva, bi morala biti orodje, ki ga uporabljate, ne pa podjetje, zgrajeno na račun svojih uporabnikov. To so zaveze, na katerih temelji wwwallet.',
    items: [
      {
        title: 'Brezplačno, brez zadržkov',
        body: 'Brez cen, brez premium ravni, brez plačljivih funkcij. wwwallet ne zaračunava lastnih provizij – edini strošek je transakcijska provizija omrežja.',
      },
      {
        title: 'Brez oglasov, brez sledenja',
        body: 'Brez oglasov, brez analitike, brez skriptov za sledenje in brez prodaje podatkov komur koli. Vašega profila sploh ni, da bi ga lahko prodali.',
      },
      {
        title: 'Brez registracije',
        body: 'Brez preverjanja e-pošte, telefonske številke ali osebne izkaznice. Odprite aplikacijo, ustvarite denarnico in ste pripravljeni.',
      },
      {
        title: 'Vaši ključi ostanejo pri vas',
        body: 'Ključi se ustvarijo in šifrirajo na vaši napravi ter je nikoli ne zapustijo. wwwallet jih ne more videti, ne more premikati vaših sredstev niti vam onemogočiti dostopa.',
      },
      {
        title: 'Deluje povsod',
        body: 'Deluje v vsakem sodobnem brskalniku na telefonu ali namiznem računalniku, namesti pa se kot aplikacija – račun v trgovini z aplikacijami ni potreben.',
      },
      {
        title: 'V 31 jezikih',
        body: 'Uporabljajte ga v jeziku, v katerem se najbolje počutite, v svetlem ali temnem načinu.',
      },
      {
        title: 'Odprta koda',
        body: 'Celotna izvorna koda je objavljena, da jo lahko kdorkoli prebere in pregleda. Gre za »source-available« in ne za »open source« – v pogostih vprašanjih je pojasnjeno, kaj dovoljuje licenca.',
      },
      {
        title: 'Ničesar ni treba izklopiti',
        body: 'Ni nobenega računa, ki bi ga lahko kdo zamrznil. Vaša sredstva so shranjena neposredno v omrežju Ethereum, ključ katerega koli računa pa lahko kadarkoli prenesete v drugo denarnico.',
      },
    ],
  },
  meta: {
    title: 'wwwallet — Brezplačna denarnica za Ethereum brez skrbništva',
    description:
      'Brezplačna denarnica za Ethereum v vašem brskalniku. Brez registracije, brez oglasov, brez sledenja – vaši ključi ostanejo šifrirani na vaši napravi. Ethereum, Arbitrum, Base, Optimism in Polygon.',
  },
}
