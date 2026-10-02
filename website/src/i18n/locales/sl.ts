export default {
  nav: {
    wallet: 'Denarnica',
    ethereum: 'Ethereum',
    crypto: 'Kripto',
    faqs: 'Pogosta vprašanja',
    launch: 'Zaženi denarnico',
    home: 'Nazaj na vrh',
    sectionNavLabel: 'Navigacija po razdelkih',
    principles: 'Načela',
  },
  settings: {
    open: 'Nastavitve',
    close: 'Zapri nastavitve',
    theme: 'Tema',
    themeLight: 'Svetloba',
    themeDark: 'Temno',
    language: 'Jezik',
    search: 'Iskanje',
    noMatches: 'Ni zadetkov',
  },
  hero: {
    eyebrow: 'Brezplačna denarnica za Ethereum brez hrambe sredstev',
    heading1: 'Tvoji ključi.',
    heading2: 'Vaša naprava.',
    heading3: 'Brezplačno za vse.',
    lede: 'wwwallet deluje v vašem brskalniku, ključe pa so šifrirani na vaši napravi. Ni treba ustvarjati računa, ničesar plačati in ni oglasov – preprosto denarnica, ki deluje enako za vse.',
    ctaPrimary: 'Zaženi denarnico',
    ctaSecondary: 'Oglejte si, kako deluje',
    note: 'Brez registracije · Brez oglasov · Brez sledenja · 31 jezikov',
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
        q: 'Ali je wwwallet res brezplačen?',
        a: 'Da. Uporaba je brezplačna, ni nobene premium stopnje in ničesar ni za plačilnim zidom, wwwallet pa ne zaračunava nobenih provizij za pošiljanje ali menjavo. Edini neizogibni strošek je lastna transakcijska (gas) provizija omrežja, ki gre omrežju in ne wwwalletu. Ponudbe za zamenjavo prihajajo iz agregatorja borz 0x, ki lahko pri nekaterih transakcijah zaračuna lastno provizijo – vsaka taka provizija je navedena na preglednem zaslonu, preden potrdite transakcijo.',
      },
      {
        q: 'Ali so na spletni strani oglasi, sledilniki ali analitični orodji?',
        a: 'Ne. Spletna stran wwwallet ne prikazuje oglasov, ne izvaja analitičnih ali sledilnih skriptov in ne ustvarja vašega profila. Ker ni računa, ni ničesar, s čimer bi ga lahko povezali.',
      },
      {
        q: 'Ali potrebujem račun ali identifikacijsko številko, da ga lahko uporabljam?',
        a: 'Ne. Ni potrebna nobena registracija, e-poštni naslov, telefonska številka ali preverjanje identitete – denarnico ustvarite na svoji napravi in jo takoj začnete uporabljati.',
      },
      {
        q: 'Če je storitev brezplačna, kako se wwwallet financira?',
        a: 'S svojimi uporabniki ne ustvarja dobička – brez provizij, brez oglasov, brez prodaje podatkov. Stroški delovanja so namerno omejeni: denarnica deluje v vašem brskalniku, strežniški del pa zgolj posreduje javne podatke iz verige blokov in podatke o cenah.',
      },
      {
        q: 'Ali mi lahko kdo zamrzne denarnico?',
        a: 'Ker ni računa, wwwallet – niti kdor koli drug – ne more ničesar zamrzniti. Vaši ključi nikoli ne zapustijo vaše naprave, transakcije pa se tam tudi podpišejo, preden se pošljejo v omrežje. Vaša sredstva so shranjena v omrežju Ethereum, ne v wwwallet: v meniju katerega koli računa si lahko ogledate zasebni ključ ali frazo za obnovo ter ju kadarkoli uvozite v drugo denarnico Ethereum.',
      },
      {
        q: 'Ali je moja obnovitvena fraza dovolj, da dobim nazaj svoj denarnik?',
        a: 'Sama po sebi ne. Vaša obnovitvena fraza odklene vaš šifrirani trezor, vendar se sam trezor nahaja izključno na vaši napravi. Če to napravo izgubite ali jo izbrišete, ne da bi kdajkoli naredili varnostno kopijo, fraza ne bo imela več česa odkleniti. Obnovitveno frazo vedno dopolnite z varnostno kopijo na Google Drive ali v datotekah – glejte naslednje vprašanje.',
      },
      {
        q: 'Kako naredim varnostno kopijo svojega denarnika?',
        a: 'V nastavitvah naredite varnostno kopijo svojega šifriranega trezorja na svoj Google Drive – shranjeno v zasebni mapi, dostopni le aplikaciji, katere preostalega dela wwwallet ne more videti – ali pa kot datoteko, ki jo prenesete in shranite sami. To storite vsakič, ko nastavite denarnico ali dodate nove račune.',
      },
      {
        q: 'Ali lahko uporabljam wwwallet na več napravah?',
        a: 'Da, vendar se ne sinhronizira samodejno – vsaka naprava ima svoj lokalni trezor. Če želite uporabljati wwwallet na novi napravi, ga tam obnovite iz varnostne kopije na Driveu ali iz datoteke, nato pa ga odklenite s svojo obnovitveno frazo.',
      },
      {
        q: 'Kaj se zgodi, če izgubim napravo in nisem nikoli naredil varnostne kopije?',
        a: 'Vaša sredstva so nepovratna. To je namerno: wwwallet nima sistema računov in nikjer ne hrani kopije vašega trezorja, zato ga nihče – niti mi – ne more obnoviti za vas. To je cena, ki jo morate plačati za denarnico, do katere nima dostopa nihče razen vas.',
      },
      {
        q: 'Ali se gesla (Face ID / Touch ID) prenesejo na novo napravo?',
        a: 'Ne. Geslo je vezano na napravo, na kateri je bilo ustvarjeno. Po obnovitvi varnostne kopije na novi napravi jo odkleni s svojo obnovitveno frazo, nato pa lahko na njej nastaviš novo geslo.',
      },
      {
        q: 'Ali je wwwallet odprtokodna rešitev?',
        a: 'Ne — gre za programsko opremo z dostopno izvorno kodo. Celotna izvorna koda je javno objavljena na GitHubu, tako da jo lahko kdorkoli prebere, pregleda in preveri, vendar ne gre za odprtokodno programsko opremo: koda je licencirana pod licenco PolyForm Strict License 1.0.0.',
      },
      {
        q: 'Kaj smem početi s kodo?',
        a: 'Vse to lahko preberete in pregledate ter uporabljate nespremenjeno kopijo za nekomercialne namene, kot so osebno učenje, raziskovanje in testiranje. Ne smete ga razširjati, spreminjati ali ustvarjati izpeljank (vključno z različicami), niti ga uporabljati v komercialne namene. Če potrebujete nekaj, kar licenca ne dovoljuje, se obrnite na imetnika avtorskih pravic za pridobitev ločene licence.',
      },
      {
        q: 'Ali je uporaba wwwallet varna? Ali obstaja kakšna garancija?',
        a: 'wwwallet je programsko oprema brez skrbništva, ki se ponuja »tako, kot je«, brez kakršnega koli jamstva. Samo vi imate nadzor nad svojimi ključi in sredstvi – nihče, niti mi, ne more obnoviti izgubljene obnovitvene fraze ali varnostne kopije, razveljaviti transakcije ali vam nadomestiti izgube. Uporabljajte le sredstva, ki si jih lahko privoščite izgubiti, pred pošiljanjem še enkrat preverite naslove in omrežja, pri čemer nič od navedenega ne predstavlja finančnega, naložbenega, pravnega ali davčnega nasveta.',
      },
      {
        q: 'Katera omrežja podpira wwwallet?',
        a: 'Glavno omrežje Ethereum ter omrežja Layer-2 Polygon, Arbitrum, Base in Optimism – vse iz istega sklopa računov.',
      },
      {
        q: 'Kako lahko napolnim svoj denarnik?',
        a: 'Odprite račun, izberite »Poglej QR-kodo«, da si ogledate naslov, in na ta naslov pošljite sredstva z borze ali iz drugega denarnika. Prepričajte se, da sredstva pošiljate prek pravega omrežja (Ethereum, Polygon, Arbitrum, Base ali Optimism) — isti naslov deluje na vseh omrežjih, vendar se sredstva, poslana prek enega omrežja, prikažejo le na tem omrežju. Potrebovali boste tudi nekaj domače kriptovalute omrežja (na primer ETH) za plačilo transakcijskih stroškov.',
      },
      {
        q: 'Kaj lahko počnem z wwwallet?',
        a: 'Pošlji: prenesi ETH ali kateri koli token na naslov, ki ga vneseš, skeniraš iz QR-kode ali izbereš iz svojih računov, ter pred potrditvijo preglej podrobnosti. Zamenjaj: v zavihku »Zamenjaj« zamenjaj en token za drugega v istem omrežju, pri čemer sta ponudba in ocena provizije prikazani vnaprej. Prejmi: prikaži svoj naslov kot QR-kodo. Prav tako lahko pregledate stanja v USD in zgodovino transakcij v vseh podprtih omrežjih.',
      },
      {
        q: 'Kaj ve wwwallet o meni?',
        a: 'Ničesar, kar bi vas identificiralo. Ni računa, prijave ali baze podatkov. Podatki o stanju in cenah se pridobivajo prek lastnega strežniškega sistema wwwallet, namesto da bi vaš brskalnik neposredno poklical zunanje ponudnike, pri čemer ta strežniški sistem nikoli ne vidi vaših ključev, gesel ali obnovitvene fraze.',
      },
    ],
  },
  footer: {
    tagline: 'Brezplačna denarnica za Ethereum brez hrambe za vse.',
    copyright: '© {year} wwwallet',
    licenseLink: 'Pod licenco PolyForm Strict 1.0.0',
    disclaimer:
      'Programska oprema, ki ne omogoča hrambe, se zagotavlja »takšna, kakršna je«, brez jamstva. To ni finančno svetovanje. Za svoje ključe in sredstva ste odgovorni izključno vi.',
  },
  license: {
    title: 'Licenca',
    close: 'Zapri',
    summaryTitle: 'V preprostem jeziku',
    canUse: 'wwwallet lahko uporabljate brezplačno za osebne in druge nekomercialne namene.',
    canRead: 'Lahko preberete in pregledate vsako vrstico njegove izvorne kode.',
    cannot: 'Ne smete ga kopirati, spreminjati, ponovno razširjati ali prodajati.',
    englishNote:
      'V nadaljevanju je navedena celotna licenca v izvirnem angleškem jeziku – to je pravno besedilo.',
    viewSource: 'Oglej si na GitHubu',
  },
  principles: {
    eyebrow: 'Načela',
    heading: 'Brezplačno, odprto in ustvarjeno za vsakogar',
    lede: 'Denarnica bi morala biti orodje, ki ga uporabljate, ne pa posel, ki temelji na svojih uporabnikih. To so načela, na katerih temelji wwwallet.',
    items: [
      {
        title: 'Brezplačno, brez kakršnih koli pogojev',
        body: 'Brez cene, brez premium paketa, brez plačljivih funkcij. wwwallet ne zaračunava lastnih provizij – edini strošek je provizija omrežja za transakcijo.',
      },
      {
        title: 'Brez oglasov, brez sledenja',
        body: 'Brez oglasov, brez analitičnih orodij, brez skriptov za sledenje in brez prodaje podatkov komur koli. Vašega profila sploh ni, da bi ga lahko prodali.',
      },
      {
        title: 'Brez registracije',
        body: 'Ni potrebe po e-pošti, telefonski številki ali preverjanju identitete. Odpri aplikacijo, ustvari denarnico in že si pripravljen.',
      },
      {
        title: 'Ključi ostanejo pri vas',
        body: 'Ključi se ustvarijo in šifrirajo na vaši napravi ter je nikoli ne zapustijo. wwwallet jih ne more videti, ne more premikati vaših sredstev niti vam onemogočiti dostopa.',
      },
      {
        title: 'Deluje povsod',
        body: 'Deluje v vsakem sodobnem brskalniku na telefonu ali namiznem računalniku, namesti pa se kot aplikacija – račun v trgovini z aplikacijami ni potreben.',
      },
      {
        title: 'V 31 jezikih',
        body: 'Uporabljajte ga v jeziku, ki vam najbolj ustreza, v svetlem ali temnem načinu.',
      },
      {
        title: 'Odprta koda',
        body: 'Celotna izvorna koda je objavljena, da jo lahko vsakdo prebere in preveri. Gre za »source-available« (izvorna koda na voljo) in ne za »open source« (odprta koda) – v pogostih vprašanjih je pojasnjeno, kaj licenca dovoljuje.',
      },
      {
        title: 'Ni treba nič izklopiti',
        body: 'Ni nobenega računa, ki bi ga lahko zamrznili. Vaša sredstva so shranjena neposredno na omrežju Ethereum, ključ katerega koli računa pa lahko kadarkoli prenesete v drugo denarnico.',
      },
    ],
  },
}
