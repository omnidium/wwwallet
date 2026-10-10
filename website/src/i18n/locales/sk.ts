export default {
  nav: {
    wallet: 'wwwallet',
    ethereum: 'Ethereum',
    crypto: 'Kryptomeny',
    faqs: 'Často kladené otázky',
    launch: 'Spustite wwwallet',
    home: 'Späť na začiatok',
    sectionNavLabel: 'Navigácia v sekcii',
    principles: 'Zásady',
  },
  settings: {
    open: 'Nastavenia',
    close: 'Zatvoriť nastavenia',
    theme: 'Téma',
    themeLight: 'Ľahký',
    themeDark: 'Tmavý',
    language: 'Jazyk',
    search: 'Vyhľadávanie',
    noMatches: 'Žiadne zhody',
    version: 'Verzia {version}',
  },
  hero: {
    eyebrow: 'Bezplatná peňaženka pre Ethereum bez úschovy',
    heading1: 'Vaše kľúče.',
    heading2: 'Vaše zariadenie.',
    heading3: 'Bezplatné pre všetkých.',
    lede: 'wwwallet beží vo vašom prehliadači a vaše kľúče uchováva zašifrované na vašom vlastnom zariadení. Nie je potrebné vytvárať účet, nič neplatíte a nie sú tu žiadne reklamy, pričom aplikácia funguje pre všetkých rovnako.',
    ctaPrimary: 'Spustite wwwallet',
    ctaSecondary: 'Pozrite si, ako to funguje',
    note: 'Žiadna registrácia · Žiadne reklamy · Žiadne sledovanie · 31 jazykov',
  },
  wallet: {
    eyebrow: 'wwwallet',
    heading: 'Vytvorené tak, aby ste ju mohli otvoriť len vy',
    lede: 'wwwallet neuchováva vaše prostriedky – pomáha vám uchovávať si ich sami. Tu je vysvetlenie, čo to v praxi znamená.',
    points: [
      {
        title: 'Bez úschovy, vždy',
        body: 'Vaše súkromné kľúče sa generujú a šifrujú na vašom vlastnom zariadení. Servery wwwallet ich nikdy nevidia – neexistuje žiadna databáza kľúčov, ktorú by bolo možné napadnúť, pretože žiadna databáza vôbec neexistuje.',
      },
      {
        title: 'Šifrované pomocou AES-256, odomknuté podľa vašich predstáv',
        body: 'Vaša peňaženka je chránená šifrovaním AES-256-GCM. Odomknite ju pomocou obnovovacej frázy alebo aktivujte prístupový kľúč – Face ID, Touch ID alebo Windows Hello – pre rýchly prístup výlučne na lokálnom zariadení.',
      },
      {
        title: 'Automaticky sa uzamkne',
        body: 'Aplikácia wwwallet sa po krátkej dobe nečinnosti uzamkne a nikdy nezapíše vašu odomknutú reláciu na disk – ak zatvoríte kartu, záležitosť sa zámerne zabudne.',
      },
      {
        title: 'Pätnásť sietí Ethereum, jedna sada účtov',
        body: 'Uchovávajte a posielajte prostredníctvom hlavnej siete Ethereum a ďalších 14 sietí – vrátane Arbitrum, Base, Optimism, Polygon, Linea a ZKsync – s rovnakými účtami a adresami.',
      },
    ],
    caveatTitle: 'Vaša obnovovacia fráza odomyká váš trezor – nie je to žiadna magická záloha',
    caveatBody:
      'Uložte si obnovovaciu frázu na bezpečné miesto, ale vytvorte si aj zálohu na Google Drive alebo v súbore. Zálohu budete potrebovať na obnovenie peňaženky na novom zariadení a frázu na jej odomknutie, keď tak urobíte.',
    caveatLink: 'Viac informácií nájdete v častiach s často kladenými otázkami (FAQ).',
  },
  ethereum: {
    eyebrow: 'Ethereum',
    heading: 'Prečo práve Ethereum',
    lede: 'Aplikácia wwwallet je špeciálne navrhnutá pre sieť Ethereum. Tu je jej odôvodnenie, vyjadrené jednoduchými slovami.',
    points: [
      {
        title: 'Svetový počítač, nie len účtovná kniha',
        body: 'Ethereum prevzalo myšlienku Bitcoinu o zdieľanej, proti manipulácii zabezpečenej účtovnej knihe a rozšírilo ju: globálny, programovateľný počítač, na ktorom môže stavať ktokoľvek a ktorý nemôže vypnúť žiadna jednotlivá strana.',
      },
      {
        title: 'Zabezpečené stakingom, nie ťažbou',
        body: 'Od „The Merge“ v roku 2022 je Ethereum zabezpečené mechanizmom Proof-of-Stake namiesto energeticky náročného ťaženia – validátori vystavujú ETH riziku ako záruku namiesto toho, aby spotrebúvali elektrickú energiu v súťaži o bloky.',
      },
      {
        title: 'Otvorený a bez povolení',
        body: 'Nikto neschvaľuje váš účet. Ktokoľvek a kdekoľvek môže držať ETH alebo vytvoriť aplikáciu na Ethereu – pre všetkých platia rovnaké pravidlá, vrátane najväčších inštitúcií.',
      },
      {
        title: 'Štandard, na ktorom stavajú ostatné siete',
        body: 'Siete Layer-2, ako sú Arbitrum, Base a Optimism – všetky podporované v wwwallet – rozširujú bezpečnosť Etherea na rýchlejšie a lacnejšie transakcie namiesto toho, aby začínali od nuly.',
      },
    ],
    linkLabel: 'Viac informácií nájdete na stránkach Nadácie Ethereum',
    linkUrl: 'https://ethereum.org/en/foundation/',
  },
  crypto: {
    eyebrow: 'Kryptomeny',
    heading: 'Kryptomeny, jednoducho povedané',
    lede: 'Niekoľko pojmov, ktoré stojí za to pochopiť, než začnete sami držať akúkoľvek kryptomenu – nielen s wwwallet.',
    points: [
      {
        title: 'S úschovou vs. bez úschovy',
        body: 'Peňaženka s úschovou alebo burza uchováva vaše kľúče za vás – je to pohodlné, ale spoliehate sa na to, že niekto iný vaše prostriedky nezmrazí, nestratí ani nezneužije. Peňaženka bez úschovy, ako je wwwallet, ponecháva kľúče a zodpovednosť výlučne vo vašich rukách.',
      },
      {
        title: 'Staking vs. ťažba',
        body: 'Ťažba typu Proof-of-Work zabezpečuje blockchain pomocou surového výpočtového výkonu a elektrickej energie. Proof-of-Stake ho naopak zabezpečuje pomocou rizikového kapitálu. Prechod Etherea na staking znížil jeho spotrebu energie o viac ako 99,9 % — čo je približne rozdiel medzi napájaním malej krajiny a malého mesta.',
      },
      {
        title: 'Okrem Etherea',
        body: 'Bitcoin uprednostňuje jednoduchosť a predvídateľnosť pred programovateľnosťou. Reťazce ako Solana kladú dôraz na surovú priepustnosť, pričom na dosiahnutie tohto cieľa často obetujú decentralizáciu. Ethereum uprednostňuje v prvom rade decentralizáciu a bezpečnosť a rýchlosť a náklady ponecháva na sieťach Layer-2, ktoré sú nad ním postavené.',
      },
      {
        title: 'Žiadna seriózna osoba vás nepožiada o vašu frázu',
        body: 'Žiadna burza, žiadny pracovník podpory ani nikto z wwwallet vás nikdy nebude žiadať o vašu obnovovaciu frázu – bez ohľadu na to, akú aplikáciu používate. Ktokoľvek, kto to urobí, sa vás snaží okradnúť.',
      },
    ],
    linkLabel: 'Získajte viac informácií v podcaste Bankless',
    linkUrl: 'https://www.bankless.com/',
  },
  faqs: {
    eyebrow: 'Často kladené otázky',
    heading: 'Časté otázky',
    items: [
      {
        q: 'Je wwwallet naozaj bezplatná?',
        a: 'Áno. Používanie je bezplatné, neexistuje žiadna prémiová úroveň ani obsah za platobnou bránou a wwwallet nepridáva žiadne poplatky k ničomu, čo posielate alebo vymieňate. Jediným nevyhnutným nákladom je vlastný transakčný (gas) poplatok siete, ktorý ide do siete, nie do wwwallet. Kótácie výmen pochádzajú z agregátora búrz 0x (alebo LI.FI v sieťach, ktoré 0x nepokrýva), ktorý môže pri niektorých obchodoch účtovať vlastný poplatok – akýkoľvek takýto poplatok je uvedený na obrazovke s prehľadom pred potvrdením.',
      },
      {
        q: 'Sú v aplikácii reklamy, sledovacie nástroje alebo analytické nástroje?',
        a: 'Nie. wwwallet nezobrazuje žiadne reklamy, nespúšťa žiadne analytické ani sledovacie skripty a nevytvára o vás profil. Neexistuje žiadny účet, takže nie je k čomu ho priradiť.',
      },
      {
        q: 'Potrebujem na jej používanie účet alebo identifikačné údaje?',
        a: 'Nie. Nie je potrebná žiadna registrácia, e-mailová adresa, telefónne číslo ani overenie totožnosti – peňaženku si vytvoríte priamo vo svojom zariadení a môžete ju hneď používať.',
      },
      {
        q: 'Ak je aplikácia bezplatná, ako sa wwwallet financuje?',
        a: 'Aplikácia nezarába na svojich používateľoch – žiadne poplatky, žiadne reklamy, žiadny predaj údajov. Prevádzkové náklady sú zámerne udržované na nízkej úrovni: samotná aplikácia beží vo vašom prehliadači a backend iba prenáša verejné údaje z blockchainu a cenové údaje.',
      },
      {
        q: 'Môže mi niekto zmraziť peňaženku?',
        a: 'Neexistuje žiadny účet, takže wwwallet – ani nikto iný – nemá čo zmraziť. Vaše kľúče nikdy neopustia vaše zariadenie a transakcie sa tam podpíšu ešte pred odoslaním do siete. Vaše prostriedky sa nachádzajú na sieti Ethereum, nie v aplikácii wwwallet: súkromný kľúč alebo obnovovaciu frázu akéhokoľvek účtu si môžete zobraziť v jeho ponuke a kedykoľvek ich importovať do akejkoľvek inej aplikácie peňaženky pre Ethereum.',
      },
      {
        q: 'Stačí mi moja obnovovacia fráza na to, aby som získal svoju peňaženku späť?',
        a: 'Nie sama o sebe. Vaša obnovovacia fráza odomkne váš šifrovaný trezor, ale samotný trezor existuje iba na vašom zariadení. Ak toto zariadenie stratíte alebo vymažete bez toho, aby ste si vytvorili zálohu, fráza nebude mať čo odomknúť. Vždy spárujte svoju obnovovaciu frázu so zálohou na Google Drive alebo v súboroch – pozrite si nasledujúcu otázku.',
      },
      {
        q: 'Ako si môžem zálohovať peňaženku?',
        a: 'V nastaveniach si zálohujte šifrovaný trezor na svoj Google Drive alebo ako súbor, ktorý si stiahnete a uchováte sami. Záloha na Drive sa ukladá do súkromnej zložky aplikácie a wwwallet nemá prístup k žiadnym ďalším súborom na vašom Drive. Zálohujte pri prvom nastavení a znova vždy, keď pridáte nové účty.',
      },
      {
        q: 'Môžem používať wwwallet na viacerých zariadeniach?',
        a: 'Áno, ale nesynchronizuje sa automaticky – každé zariadenie má svoj vlastný lokálny trezor. Ak chcete používať wwwallet na novom zariadení, obnovte ho tam zo zálohy na Drive alebo zo súboru a potom ho odomknite pomocou obnovovacej frázy.',
      },
      {
        q: 'Čo sa stane, ak stratím svoje zariadenie a nikdy som si nevytvoril zálohu?',
        a: 'Vaše prostriedky nie je možné obnoviť. Je to zámerné: wwwallet nemá žiadny systém účtov a nikde neuchováva kópiu vášho trezoru, takže nikto – vrátane nás – vám ho nemôže obnoviť. Je to kompromis za to, že k vašim kľúčom nemá prístup nikto okrem vás.',
      },
      {
        q: 'Prenášajú sa prístupové kľúče (Face ID / Touch ID) na nové zariadenie?',
        a: 'Nie. Prístupový kľúč je viazaný na zariadenie, na ktorom bol vytvorený. Po obnovení zálohy na novom zariadení ho odomknite pomocou obnovovacej frázy a tam si môžete nastaviť nový prístupový kľúč.',
      },
      {
        q: 'Je wwwallet open source?',
        a: 'Nie – zdrojový kód je dostupný. Úplný zdrojový kód je zverejnený na GitHub, takže ho môže ktokoľvek prečítať, skontrolovať a audítovať, ale nejde o open source: kód je licencovaný pod licenciou PolyForm Strict License 1.0.0.',
      },
      {
        q: 'Čo môžem s týmto kódom robiť?',
        a: 'Môžete si to všetko prečítať a skontrolovať a spustiť nemodifikovanú kópiu na nekomerčné účely, ako je osobné štúdium, výskum a testovanie. Nesmiete to distribuovať, upravovať ani vytvárať odvodené diela (vrátane forkov), ani to používať na komerčné účely. Ak potrebujete niečo, čo licencia neumožňuje, kontaktujte držiteľa autorských práv a požiadajte o samostatnú licenciu.',
      },
      {
        q: 'Je používanie wwwallet bezpečné? Existuje nejaká záruka?',
        a: 'wwwallet je nekustodialný softvér poskytovaný „tak, ako je“, bez akejkoľvek záruky. Iba vy máte kontrolu nad svojimi kľúčmi a prostriedkami – nikto, vrátane nás, nemôže obnoviť stratenú obnovovaciu frázu alebo zálohu, zrušiť transakciu ani vám nahradiť straty. Používajte iba prostriedky, ktorých stratu si môžete dovoliť, pred odoslaním si dôkladne skontrolujte adresy a siete a nič z toho, čo je tu uvedené, nepredstavuje finančné, investičné, právne ani daňové poradenstvo.',
      },
      {
        q: 'Aké siete podporuje wwwallet?',
        a: 'Hlavná sieť Ethereum, plus Arbitrum, Base, Optimism, Polygon, Robinhood Chain, World Chain, Ink, Linea, Gnosis, Celo, ZKsync Era, Ronin, Unichain a Scroll – všetko z jednej sady účtov.',
      },
      {
        q: 'Ako môžem vložiť prostriedky do svojej peňaženky?',
        a: 'Otvorte si účet, vyberte možnosť „Zobraziť QR kód“, aby ste videli jeho adresu, a pošlite prostriedky na túto adresu z burzy alebo inej peňaženky. Uistite sa, že posielate na správnu sieť (napríklad Ethereum, Base alebo Arbitrum) – tá istá adresa funguje na každej podporovanej sieti, ale prostriedky poslané na jednej sieti sa zobrazia len na tej sieti. Budete tiež potrebovať malé množstvo natívnej meny siete (napríklad ETH) na úhradu transakčných poplatkov.',
      },
      {
        q: 'Čo môžem robiť s wwwallet?',
        a: 'Odoslať: previesť ETH alebo akýkoľvek token na adresu, ktorú vložíte, naskenujete z QR kódu alebo vyberiete zo svojich vlastných účtov, a skontrolovať podrobnosti pred potvrdením. Vymeniť: vymeniť jeden token za iný v tej istej sieti na karte „Swap“, pričom sa vopred zobrazí kurz a odhad poplatku. Prijímať: zobraziť svoju adresu ako QR kód. Môžete si tiež prezrieť svoje zostatky v USD a históriu transakcií vo všetkých podporovaných sieťach.',
      },
      {
        q: 'Čo o mne vie wwwallet?',
        a: 'Nič, čo by vás identifikovalo. Neexistuje žiadny účet, prihlásenie ani databáza. Údaje o zostatku a cenách sa načítajú prostredníctvom vlastného backendu aplikácie wwwallet, a nie tak, že by váš prehliadač priamo volal poskytovateľov tretích strán, a tento backend nikdy nevidí vaše kľúče, heslá ani obnovovaciu frázu.',
      },
    ],
  },
  footer: {
    tagline: 'Bezplatná peňaženka pre Ethereum bez úschovy pre každého.',
    copyright: '© {year} wwwallet',
    licenseLink: 'Licencované pod licenciou PolyForm Strict 1.0.0',
    disclaimer:
      'Nekustodialný softvér sa poskytuje „tak, ako je“, bez záruky. Nejedná sa o finančné poradenstvo. Za svoje kľúče a finančné prostriedky nesiete výhradnú zodpovednosť vy.',
  },
  principles: {
    eyebrow: 'Zásady',
    heading: 'Bezplatná, otvorená a vytvorená pre každého',
    lede: 'Softvér, v ktorom sú uložené vaše peniaze, by mal byť nástrojom, ktorý používate, a nie podnikom postaveným na svojich používateľoch. Na týchto zásadách je postavená aplikácia wwwallet.',
    items: [
      {
        title: 'Bezplatná, bez háčikov',
        body: 'Žiadne ceny, žiadne prémiové úrovne, žiadne platené funkcie. wwwallet neúčtuje žiadne vlastné poplatky – jediným nákladom je transakčný poplatok siete.',
      },
      {
        title: 'Žiadne reklamy, žiadne sledovanie',
        body: 'Žiadne reklamy, žiadne analytické nástroje, žiadne sledovacie skripty a žiadne údaje predávané komukoľvek. V prvom rade neexistuje žiadny váš profil, ktorý by sa dal predať.',
      },
      {
        title: 'Žiadna registrácia',
        body: 'Žiadna kontrola e-mailu, telefónneho čísla ani totožnosti. Stačí aplikáciu otvoriť, vytvoriť peňaženku a ste pripravení.',
      },
      {
        title: 'Vaše kľúče zostávajú u vás',
        body: 'Kľúče sa vytvárajú a šifrujú na vašom zariadení a nikdy z neho neopúšťajú. wwwallet ich nemôže vidieť, nemôže presúvať vaše prostriedky ani vám zablokovať prístup.',
      },
      {
        title: 'Funguje kdekoľvek',
        body: 'Funguje v akomkoľvek modernom prehliadači na telefóne alebo počítači a inštaluje sa ako aplikácia – nie je potrebný účet v obchode s aplikáciami.',
      },
      {
        title: 'V 31 jazykoch',
        body: 'Používajte ho v jazyku, ktorý vám najviac vyhovuje, v svetlom alebo tmavom režime.',
      },
      {
        title: 'Kód vo verejnej doméne',
        body: 'Úplný zdrojový kód je zverejnený, aby si ho mohol prečítať a skontrolovať ktokoľvek. Ide o zdrojovo dostupný kód, nie o open source – v častých otázkach je vysvetlené, čo licencia povoľuje.',
      },
      {
        title: 'Nič nevypínajte',
        body: 'Neexistuje žiadny účet, ktorý by mohol niekto zmraziť. Vaše prostriedky sa nachádzajú priamo v sieti Ethereum a kľúč akéhokoľvek účtu je možné kedykoľvek preniesť do inej peňaženky.',
      },
    ],
  },
  license: {
    title: 'Licencia',
    close: 'Zatvoriť',
    summaryTitle: 'V jednoduchom jazyku',
    canUse: 'Aplikáciu wwwallet môžete používať zadarmo na osobné a iné nekomerčné účely.',
    canRead: 'Môžete si prečítať a skontrolovať každý riadok jej zdrojového kódu.',
    cannot: 'Tento text nesmieš kopírovať, meniť, ďalej šíriť ani predávať.',
    englishNote: 'Nasleduje úplné znenie licencie v pôvodnej angličtine – ide o právny text.',
    viewSource: 'Zobraziť zdroj na GitHub',
  },
  meta: {
    title: 'wwwallet — Bezplatná peňaženka pre Ethereum bez úschovy',
    description:
      'Bezplatná peňaženka pre Ethereum vo vašom prehliadači. Bez registrácie, bez reklám, bez sledovania – vaše kľúče zostávajú zašifrované vo vašom zariadení. Ethereum, Base, Arbitrum, Optimism, Polygon a ďalších 10 sietí.',
  },
}
