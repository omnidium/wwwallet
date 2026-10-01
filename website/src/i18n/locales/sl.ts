export default {
  nav: {
    wallet: 'Denarnica',
    ethereum: 'Ethereum',
    crypto: 'Kripto',
    faqs: 'Pogosta vprašanja',
    launch: 'Zaženi denarnico',
    home: 'Nazaj na vrh',
    sectionNavLabel: 'Navigacija po razdelkih',
  },
  settings: {
    open: 'Nastavitve',
    close: 'Zapri nastavitve',
    theme: 'Tema',
    themeLight: 'Svetloba',
    themeDark: 'Temno',
    language: 'Jezik',
  },
  hero: {
    eyebrow: 'Osebna denarnica za Ethereum brez hrambe sredstev',
    heading1: 'Vaši ključi.',
    heading2: 'Vaša naprava.',
    heading3: 'Vaš denarnik.',
    lede: 'wwwallet šifrira vašo denarnico na vaši lastni napravi in nikoli ne pošilja vaših ključev, gesel ali obnovitvene fraze nikamor drugam. Ni treba ustvarjati računa. Ni strežnika, ki bi ga lahko nekdo vdrl. Samo vi in vaše kriptovalute.',
    ctaPrimary: 'Zaženi denarnico',
    ctaSecondary: 'Oglejte si, kako deluje',
  },
  wallet: {
    eyebrow: 'Denarnica',
    heading: 'Narejen tako, da ga lahko odpreš samo ti',
    lede: 'wwwallet ne hrani vaših sredstev — pomaga vam, da jih hranite sami. To v praksi pomeni naslednje.',
    points: [
      {
        title: 'Brez hrambe, vedno',
        body: 'Vaši zasebni ključi se ustvarijo in šifrirajo na vaši lastni napravi. Strežniki wwwallet jih nikoli ne vidijo – ni nobene zbirke podatkov o denarnicah, v katero bi se lahko vdrlo, saj te zbirke sploh ni.',
      },
      {
        title: 'Šifrirano z AES-256, odklepanje po vaši meri',
        body: 'Vaš trezor je zaščiten s šifriranjem AES-256-GCM. Odklenite ga s svojo obnovitveno frazo ali omogočite uporabo gesla – Face ID, Touch ID ali Windows Hello – za hiter dostop, ki je omejen izključno na lokalno rabo.',
      },
      {
        title: 'Samodejno se zaklene',
        body: 'wwwallet se po kratkem obdobju neaktivnosti zaklene in vaše odklejene seje nikoli ne shrani na disk – če zaprete zavihek, se tega namerno ne spomni več.',
      },
      {
        title: 'En denarnik, pet omrežij Ethereum',
        body: 'Hranite in pošiljajte prek glavnega omrežja Ethereuma, Polygona, Arbitruma, Base in Optimisma z istega sklopa računov.',
      },
    ],
    caveatTitle: 'Vaša obnovitvena fraza odklene vaš trezor — to ni čarobna varnostna kopija',
    caveatBody:
      'Svojo obnovitveno frazo shranite na varno mesto, hkrati pa poskrbite tudi za varnostno kopijo v Google Drive ali v datoteki. Varnostna kopija vam bo potrebna za obnovitev denarnice na novi napravi, fraza pa za njeno odklepanje, ko jo boste obnovili.',
    caveatLink: 'Več o tem si preberite v pogostih vprašanjih',
  },
  ethereum: {
    eyebrow: 'Ethereum',
    heading: 'Zakaj Ethereum?',
    lede: 'wwwallet je zasnovan posebej za Ethereum. Tukaj je razlaga, zakaj je tako, v preprostih besedah.',
    points: [
      {
        title: 'Svetovni računalnik, ne le knjiga transakcij',
        body: 'Ethereum je prevzel Bitcoinovo idejo o skupni, zaščitni knjigi, ki je zaščitena pred ponarejanjem, in jo razširil: globalni, programirljiv računalnik, na katerem lahko vsakdo gradi, in ki ga nobena posamezna stranka ne more izklopiti.',
      },
      {
        title: 'Zavarovano s stakingom, ne z rudarjenjem',
        body: 'Od »združitve« leta 2022 je varnost omrežja Ethereum zagotovljena s sistemom »Proof-of-Stake« namesto z energetsko intenzivnim rudarjenjem – validatorji kot zavarovanje tvegajo svoje ETH, namesto da bi porabljali električno energijo za tekmovanje za bloke.',
      },
      {
        title: 'Odprt in brez omejitev',
        body: 'Nihče ne odobri vašega računa. Kdor koli in kjer koli lahko poseduje ETH ali razvija aplikacijo na Ethereumu – za vse veljajo enaka pravila, tudi za največje institucije.',
      },
      {
        title: 'Standard, na katerem temeljijo druga omrežja',
        body: 'Omrežja drugega sloja, kot so Arbitrum, Base in Optimism – ki jih vsi podpira wwwallet – razširjajo varnost omrežja Ethereum na hitrejše in cenejše transakcije, namesto da bi začeli z nič.',
      },
    ],
    linkLabel: 'Več o tem si preberite na spletni strani Fundacije Ethereum',
    linkUrl: 'https://ethereum.org/en/foundation/',
  },
  crypto: {
    eyebrow: 'Kripto',
    heading: 'Kriptovalute, poenostavljeno povedano',
    lede: 'Nekaj pojmov, ki jih je vredno razumeti, preden začnete sami posedovati kriptovalute – ne le prek wwwallet.',
    points: [
      {
        title: 'S skrbništvom proti brez skrbništva',
        body: 'Denarnica s skrbništvom ali borza hrani vaše ključe za vas – to je sicer priročno, vendar morate zaupati, da nekdo drug ne bo zamrznil, izgubil ali zlorabil vaših sredstev. Denarnica brez skrbništva, kot je wwwallet, ključe in odgovornost prepušča izključno vam.',
      },
      {
        title: 'Staking v primerjavi z rudarjenjem',
        body: 'Rudarjenje po načelu »Proof-of-Work« zagotavlja varnost verige blokov z surovo računalniško močjo in električno energijo. Načelo »Proof-of-Stake« pa jo namesto tega varuje s tveganim kapitalom. Prehod Ethereuma na staking je zmanjšal porabo energije za več kot 99,9 % — kar je približno razlika med oskrbo z električno energijo majhne države in majhnega mesta.',
      },
      {
        title: 'Onkraj Ethereuma',
        body: 'Bitcoin daje prednost preprostosti in predvidljivosti pred programirljivostjo. Verige, kot je Solana, si prizadevajo za čim večjo prepustnost, pri čemer pogosto žrtvujejo decentralizacijo, da bi to dosegle. Ethereum daje prednost decentralizaciji in varnosti, hitrost in stroške pa prepušča omrežjem Layer-2, zgrajenim na njegovi podlagi.',
      },
      {
        title: 'Nihče, ki je verodostojen, ne bo zahteval vaše geslo',
        body: 'Ne glede na to, katero denarnico uporabljate: niti borza, niti predstavnik podpore niti noben zaposleni pri wwwallet vas nikoli ne bo prosil za vašo obnovitveno frazo. Kdor koli to stori, vas poskuša oropati.',
      },
    ],
    linkLabel: 'Poglobite se v temo s podcastom »Bankless«',
    linkUrl: 'https://www.bankless.com/',
  },
  faqs: {
    eyebrow: 'Pogosta vprašanja',
    heading: 'Pogosta vprašanja',
    items: [
      {
        q: 'Ali je moja obnovitvena fraza dovolj, da dobim nazaj svojo denarnico?',
        a: 'Sama po sebi ne. Vaša obnovitvena fraza odklene vaš šifrirani trezor, vendar se sam trezor nahaja izključno na vaši napravi. Če to napravo izgubite ali jo izbrišete, ne da bi kdajkoli naredili varnostno kopijo, fraza ne bo imela več kaj odkleniti. Obnovitveno frazo vedno dopolnite z varnostno kopijo na Google Drive ali v datotekah – glejte naslednje vprašanje.',
      },
      {
        q: 'Kako naredim varnostno kopijo denarnice?',
        a: 'V nastavitvah naredite varnostno kopijo svojega šifriranega trezorja na svoj Google Drive – shranjeno v zasebni mapi, dostopni le aplikaciji, katere preostalega dela wwwallet ne more videti – ali pa kot datoteko, ki jo prenesete in shranite sami. To storite vsakič, ko nastavite denarnico ali dodate nove račune.',
      },
      {
        q: 'Ali lahko uporabljam wwwallet na več napravah?',
        a: 'Da, vendar se ne sinhronizira samodejno – vsaka naprava ima svoj lokalni trezor. Če želite uporabljati wwwallet na novi napravi, ga tam obnovite iz varnostne kopije na Drive ali iz datoteke, nato pa ga odklenite s svojo obnovitveno frazo.',
      },
      {
        q: 'Kaj se zgodi, če izgubim svojo napravo in nisem nikoli naredil varnostne kopije?',
        a: 'Vaša sredstva so nepovratna. Tako je namerno zasnovano: wwwallet nima sistema računov in nikjer ne hrani kopije vašega trezorja, zato ga nihče – niti mi – ne more obnoviti za vas. To je cena, ki jo plačate za denarnico, do katere nima dostopa nihče razen vas.',
      },
      {
        q: 'Ali se gesla (Face ID / Touch ID) prenesejo na novo napravo?',
        a: 'Ne. Geslo je vezano na napravo, na kateri je bilo ustvarjeno. Po obnovitvi varnostne kopije na novi napravi jo odkleni s svojo obnovitveno frazo, nato pa lahko na njej nastaviš novo geslo.',
      },
      {
        q: 'Ali je wwwallet odprtokodna rešitev?',
        a: 'Izvorna koda je objavljena na GitHubu, zato jo lahko prebere kdorkoli. Zaenkrat še ni objavljena pod odprtokodno licenco, zato jo zaenkrat obravnavajte kot javno objavljeno za pregled in ne kot odprtokodno.',
      },
      {
        q: 'Katera omrežja podpira wwwallet?',
        a: 'Glavna mreža Ethereum ter omrežja Layer-2 Polygon, Arbitrum, Base in Optimism – vse iz istega sklopa računov.',
      },
      {
        q: 'Kaj ve wwwallet o meni?',
        a: 'Ničesar, kar bi vas identificiralo. Ni računa, prijave ali baze podatkov. Podatki o stanju in cenah se pridobivajo prek lastnega strežniškega sistema wwwallet, namesto da bi vaš brskalnik neposredno poklical zunanje ponudnike, pri čemer ta strežniški sistem nikoli ne vidi vaših ključev, gesel ali obnovitvene fraze.',
      },
    ],
  },
  footer: {
    tagline: 'Osebna denarnica za Ethereum brez hrambe sredstev.',
    sourceLink: 'Oglejte si izvorno kodo na GitHubu',
    copyright: '© {year} wwwallet',
  },
}
