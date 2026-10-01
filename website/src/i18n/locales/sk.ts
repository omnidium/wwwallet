export default {
  nav: {
    wallet: 'Peňaženka',
    ethereum: 'Ethereum',
    crypto: 'Kryptomeny',
    faqs: 'Často kladené otázky',
    launch: 'Spustiť peňaženku',
    home: 'Späť na začiatok stránky',
    sectionNavLabel: 'Navigácia v sekcii',
  },
  settings: {
    open: 'Nastavenia',
    close: 'Zatvoriť nastavenia',
    theme: 'Téma',
    themeLight: 'Svetlo',
    themeDark: 'Tma',
    language: 'Jazyk',
  },
  hero: {
    eyebrow: 'Osobná peňaženka pre Ethereum bez úschovy',
    heading1: 'Vaše kľúče.',
    heading2: 'Vaše zariadenie.',
    heading3: 'Vaša peňaženka.',
    lede: 'wwwallet šifruje vašu peňaženku priamo na vašom zariadení a vaše kľúče, heslá ani obnovovaciu frázu nikdy neposiela nikam inam. Nie je potrebné vytvárať žiadny účet. Neexistuje žiadny server, ktorý by mohol byť napadnutý. Len vy a vaše kryptomeny.',
    ctaPrimary: 'Spustiť peňaženku',
    ctaSecondary: 'Pozrite sa, ako to funguje',
  },
  wallet: {
    eyebrow: 'Peňaženka',
    heading: 'Je navrhnutý tak, aby ho mohol otvoriť len vy',
    lede: 'wwwallet nespravuje vaše finančné prostriedky — pomáha vám spravovať si ich sami. Tu je vysvetlenie, čo to v praxi znamená.',
    points: [
      {
        title: 'Bez úschovy, vždy',
        body: 'Vaše súkromné kľúče sa generujú a šifrujú priamo na vašom zariadení. Servery wwwallet k nim nikdy nemajú prístup – neexistuje žiadna databáza peňaženiek, do ktorej by sa dalo vniknúť, pretože žiadna databáza vôbec neexistuje.',
      },
      {
        title: 'Šifrované pomocou AES-256, odomknutie podľa vašich predstáv',
        body: 'Váš trezor je chránený šifrovaním AES-256-GCM. Odomknite ho pomocou obnovovacej frázy alebo aktivujte prístupový kľúč – Face ID, Touch ID alebo Windows Hello – pre rýchly prístup výlučne v lokálnom režime.',
      },
      {
        title: 'Automaticky sa zamkne',
        body: 'wwwallet sa po krátkej dobe nečinnosti uzamkne a nikdy neuloží vaše odomknuté relácie na disk – ak zavriete kartu, záznamy sa zámerne vymažú.',
      },
      {
        title: 'Jedna peňaženka, päť sietí Ethereum',
        body: 'Uchovávajte a posielajte prostredníctvom hlavnej siete Ethereum, Polygon, Arbitrum, Base a Optimism z tej istej skupiny účtov.',
      },
    ],
    caveatTitle: 'Vaša obnovovacia fráza odomkne váš trezor — nejde o žiadnu „magickú“ zálohu',
    caveatBody:
      'Uložte si obnovovaciu frázu na bezpečné miesto, ale zároveň si vytvorte zálohu na Google Drive alebo v súbore. Zálohu budete potrebovať na obnovenie peňaženky na novom zariadení a frázu na jej odomknutie, keď ju obnovíte.',
    caveatLink: 'Viac informácií nájdete v častých otázkach',
  },
  ethereum: {
    eyebrow: 'Ethereum',
    heading: 'Prečo práve Ethereum?',
    lede: 'wwwallet je vyvinutý špeciálne pre sieť Ethereum. Tu sú dôvody, prečo tomu tak je, vysvetlené jednoducho.',
    points: [
      {
        title: 'Svetový počítač, nie len účtovná kniha',
        body: 'Ethereum prevzalo myšlienku Bitcoinu o zdieľanej, proti manipulácii zabezpečenej účtovnej knihe a ďalej ju rozvinulo: globálny, programovateľný počítač, na ktorom môže stavať ktokoľvek a ktorý nemôže vypnúť žiadna jednotlivá strana.',
      },
      {
        title: 'Zabezpečené prostredníctvom stakingu, nie ťažbou',
        body: 'Od „The Merge“ v roku 2022 je sieť Ethereum zabezpečovaná mechanizmom Proof-of-Stake namiesto energeticky náročného ťaženia – validátori vkladajú ETH ako kolaterál namiesto toho, aby spotrebúvali elektrickú energiu v súťaži o bloky.',
      },
      {
        title: 'Otvorený a bez nutnosti povolení',
        body: 'Nikto neschvaľuje váš účet. Ktokoľvek a kdekoľvek môže držať ETH alebo vytvoriť aplikáciu na Ethereu – pre všetkých platia rovnaké pravidlá, vrátane tých najväčších inštitúcií.',
      },
      {
        title: 'Štandard, na ktorom sú založené ostatné siete',
        body: 'Siete vrstvy 2, ako sú Arbitrum, Base a Optimism – ktoré sú všetky podporované v aplikácii wwwallet – rozširujú bezpečnosť siete Ethereum na rýchlejšie a lacnejšie transakcie, namiesto toho, aby začínali od nuly.',
      },
    ],
    linkLabel: 'Viac informácií nájdete na stránkach nadácie Ethereum',
    linkUrl: 'https://ethereum.org/en/foundation/',
  },
  crypto: {
    eyebrow: 'Kryptomeny',
    heading: 'Kryptomeny, jednoducho povedané',
    lede: 'Niekoľko pojmov, ktoré stojí za to pochopiť, než si kryptomenu začnete držať sami – a to nielen prostredníctvom wwwallet.',
    points: [
      {
        title: 'S úschovou vs. bez úschovy',
        body: 'Peňaženka s úschovou alebo burza uchováva vaše kľúče za vás — je to pohodlné, ale spoliehate sa na to, že niekto iný vaše prostriedky nezmrazí, nestratí ani nezneužije. Peňaženka bez úschovy, ako je wwwallet, zveruje kľúče aj zodpovednosť výlučne do vašich rúk.',
      },
      {
        title: 'Staking verzus ťažba',
        body: 'Ťažba typu „Proof-of-Work“ zabezpečuje blockchain pomocou surového výpočtového výkonu a elektrickej energie. Systém „Proof-of-Stake“ ho naopak zabezpečuje prostredníctvom kapitálu vystaveného riziku. Prechod Etherea na staking znížil jeho spotrebu energie o viac ako 99,9 % — čo je približne rozdiel medzi dodávkou elektrickej energie pre malú krajinu a malé mesto.',
      },
      {
        title: 'Za hranicami Etherea',
        body: 'Bitcoin uprednostňuje jednoduchosť a predvídateľnosť pred programovateľnosťou. Reťazce ako Solana sa zameriavajú na maximálnu priepustnosť, pričom na dosiahnutie tohto cieľa často obetujú decentralizáciu. Ethereum kladie na prvé miesto decentralizáciu a bezpečnosť, pričom rýchlosť a náklady prenecháva sieťam Layer-2, ktoré sú nad ním vybudované.',
      },
      {
        title: 'Nikto dôveryhodný sa vás na vaše heslo nepýta',
        body: 'Nech už používate akúkoľvek peňaženku: žiadna burza, žiadny pracovník zákazníckej podpory ani žiadny zamestnanec spoločnosti wwwallet vás nikdy nebude žiadať o vašu obnovovaciu frázu. Ak to niekto urobí, snaží sa vás okradnúť.',
      },
    ],
    linkLabel: 'Získajte hlbší pohľad vďaka podcastu Bankless',
    linkUrl: 'https://www.bankless.com/',
  },
  faqs: {
    eyebrow: 'Často kladené otázky',
    heading: 'Často kladené otázky',
    items: [
      {
        q: 'Stačí moja obnovovacia fráza na to, aby som dostal späť svoju peňaženku?',
        a: 'Nie sama o sebe. Vaša obnovovacia fráza odomkne váš šifrovaný trezor, ale samotný trezor sa nachádza iba na vašom zariadení. Ak toto zariadenie stratíte alebo vymažete bez toho, aby ste si predtým vytvorili zálohu, fráza už nebude mať čo odomknúť. Obnovovaciu frázu vždy kombinujte so zálohou na Google Drive alebo so zálohou súborov – pozrite si nasledujúcu otázku.',
      },
      {
        q: 'Ako môžem zálohovať svoju peňaženku?',
        a: 'V nastaveniach si zálohujte šifrovaný trezor na svoj Google Drive – kde bude uložený v súkromnej zložke prístupnej len pre aplikáciu, do ktorej aplikácia wwwallet nemá prístup – alebo ako súbor, ktorý si stiahnete a uchováte sami. Urobte to vždy, keď si nastavujete peňaženku alebo pridávate nové účty.',
      },
      {
        q: 'Môžem používať wwwallet na viacerých zariadeniach?',
        a: 'Áno, ale synchronizácia neprebieha automaticky – každé zariadenie má svoj vlastný lokálny trezor. Ak chcete používať wwwallet na novom zariadení, obnovte ho tam zo zálohy na Drive alebo zo súboru a potom ho odomknite pomocou obnovovacej frázy.',
      },
      {
        q: 'Čo sa stane, ak stratím svoje zariadenie a nikdy som si nevytvoril zálohu?',
        a: 'Vaše prostriedky nie je možné obnoviť. Je to zámerné: wwwallet nemá žiadny systém účtov a nikde neuchováva žiadnu kópiu vášho trezoru, takže nikto – ani my – vám ho nemôže obnoviť. Je to kompromis za peňaženku, ku ktorej nemá prístup nikto okrem vás.',
      },
      {
        q: 'Prenesú sa prístupové kľúče (Face ID / Touch ID) do nového zariadenia?',
        a: 'Nie. Prístupový kľúč je viazaný na zariadenie, na ktorom bol vytvorený. Po obnovení zálohy na novom zariadení ho odomknite pomocou obnovovacej frázy a potom si na ňom môžete nastaviť nový prístupový kľúč.',
      },
      {
        q: 'Je wwwallet open source?',
        a: 'Nie — zdrojový kód je dostupný. Úplný zdrojový kód je zverejnený na GitHub-e, takže si ho môže ktokoľvek prečítať, skontrolovať a preveriť, nie je však open source: kód je licencovaný pod licenciou PolyForm Strict License 1.0.0.',
      },
      {
        q: 'Čo môžem s týmto kódom robiť?',
        a: 'Môžete si to všetko prečítať a skontrolovať a spustiť nezmenenú kópiu na nekomerčné účely, ako je osobné štúdium, výskum a testovanie. Nesmiete ho šíriť, upravovať ani vytvárať odvodené diela (vrátane forkov), ani ho používať na komerčné účely. Ak potrebujete niečo, čo licencia neumožňuje, kontaktujte držiteľa autorských práv a požiadajte o samostatnú licenciu.',
      },
      {
        q: 'Je používanie služby wwwallet bezpečné? Poskytuje sa na ňu nejaká záruka?',
        a: 'wwwallet je softvér bez úschovy poskytovaný „tak, ako je“, bez akejkoľvek záruky. Vaše kľúče a prostriedky máte pod kontrolou výlučne vy – nikto, ani my, nemôže obnoviť stratenú obnovovaciu frázu alebo zálohu, zrušiť transakciu ani vám nahradiť straty. Používajte len prostriedky, ktorých stratu si môžete dovoliť, pred odoslaním si dôkladne skontrolujte adresy a siete a nič z uvedeného nepredstavuje finančné, investičné, právne ani daňové poradenstvo.',
      },
      {
        q: 'Ktoré siete podporuje wwwallet?',
        a: 'Hlavná sieť Ethereum a siete Layer-2 Polygon, Arbitrum, Base a Optimism – všetko z rovnakého súboru účtov.',
      },
      {
        q: 'Ako môžem vložiť prostriedky do svojej peňaženky?',
        a: 'Otvorte si účet, vyberte možnosť „Zobraziť QR kód“, aby ste videli jeho adresu, a pošlite prostriedky na túto adresu z burzy alebo inej peňaženky. Uistite sa, že posielate prostriedky cez správnu sieť (Ethereum, Polygon, Arbitrum, Base alebo Optimism) – tá istá adresa funguje vo všetkých týchto sieťach, ale prostriedky poslané cez jednu sieť sa zobrazia len v tejto sieti. Budete tiež potrebovať malé množstvo natívnej meny danej siete (napríklad ETH) na úhradu transakčných poplatkov.',
      },
      {
        q: 'Čo môžem robiť s wwwallet?',
        a: 'Odoslať: pošlite ETH alebo akýkoľvek token na adresu, ktorú vložíte, naskenujete z QR kódu alebo vyberiete zo svojich vlastných účtov, a pred potvrdením skontrolujte podrobnosti. Výmena: vymeňte jeden token za iný v rámci tej istej siete na karte „Výmena“, pričom sa vám hneď na začiatku zobrazí kurz a odhad poplatku. Prijímať: zobrazte svoju adresu vo forme QR kódu. Môžete si tiež prezrieť svoje zostatky v USD a históriu transakcií vo všetkých podporovaných sieťach.',
      },
      {
        q: 'Čo o mne vie wwwallet?',
        a: 'Žiadne údaje, ktoré by vás identifikovali. Neexistuje žiadny účet, prihlásenie ani databáza. Údaje o zostatku a cenách sa načítajú prostredníctvom vlastného backendu služby wwwallet, namiesto toho, aby váš prehliadač priamo kontaktoval poskytovateľov tretích strán, a tento backend nikdy nemá prístup k vašim kľúčom, heslám ani obnovovacej fráze.',
      },
    ],
  },
  footer: {
    tagline: 'Osobná peňaženka pre Ethereum bez úschovy.',
    sourceLink: 'Zobraziť zdrojový kód na GitHub-e',
    copyright: '© {year} wwwallet',
    licenseLink: 'Licencované podľa licencie PolyForm Strict 1.0.0',
    disclaimer:
      'Softvér bez úschovy sa poskytuje „tak, ako je“, bez záruky. Nejedná sa o finančné poradenstvo. Za svoje kľúče a finančné prostriedky nesiete výhradnú zodpovednosť.',
  },
}
