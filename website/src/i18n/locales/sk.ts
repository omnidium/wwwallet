export default {
  nav: {
    wallet: 'Peňaženka',
    ethereum: 'Ethereum',
    crypto: 'Kryptomeny',
    faqs: 'Často kladené otázky',
    launch: 'Spustiť peňaženku',
    home: 'Späť na začiatok stránky',
    sectionNavLabel: 'Navigácia v sekcii',
    principles: 'Zásady',
  },
  settings: {
    open: 'Nastavenia',
    close: 'Zatvoriť nastavenia',
    theme: 'Téma',
    themeLight: 'Svetlo',
    themeDark: 'Tma',
    language: 'Jazyk',
    search: 'Vyhľadávanie',
    noMatches: 'Žiadne výsledky',
  },
  hero: {
    eyebrow: 'Bezplatná peňaženka pre Ethereum bez úschovy',
    heading1: 'Tvoje kľúče.',
    heading2: 'Vaše zariadenie.',
    heading3: 'Bezplatné pre všetkých.',
    lede: 'wwwallet beží vo vašom prehliadači a vaše kľúče uchováva v zašifrovanej podobe na vašom vlastnom zariadení. Nie je potrebné vytvárať žiadny účet, nič neplatíte a nie sú tu žiadne reklamy – je to jednoducho peňaženka, ktorá funguje rovnako pre každého.',
    ctaPrimary: 'Spustiť peňaženku',
    ctaSecondary: 'Pozrite sa, ako to funguje',
    note: 'Bez registrácie · Bez reklám · Bez sledovania · 31 jazykov',
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
        q: 'Je wwwallet naozaj zadarmo?',
        a: 'Áno. Používanie je bezplatné, neexistuje žiadna prémiová úroveň ani obsah dostupný len za poplatok a wwwallet nepridáva žiadny poplatok k ničomu, čo posielate alebo vymieňate. Jediným nevyhnutným nákladom je vlastný transakčný poplatok (gas) siete, ktorý ide do siete, nie do wwwallet. Cenové ponuky na výmenu pochádzajú z agregátora búrz 0x, ktorý môže pri niektorých transakciách účtovať vlastný poplatok – akýkoľvek takýto poplatok je uvedený na obrazovke s prehľadom pred potvrdením transakcie.',
      },
      {
        q: 'Sú tam reklamy, sledovacie nástroje alebo analytické nástroje?',
        a: 'Nie. Stránka wwwallet nezobrazuje žiadne reklamy, nepoužíva žiadne analytické ani sledovacie skripty a nevytvára o vás žiadny profil. Neexistuje tu žiadny účet, takže nie je k čomu ho priradiť.',
      },
      {
        q: 'Potrebujem na to účet alebo preukaz totožnosti?',
        a: 'Nie. Nie je potrebná žiadna registrácia, e-mailová adresa, telefónne číslo ani overenie totožnosti – peňaženku si vytvoríte priamo vo svojom zariadení a môžete ju hneď používať.',
      },
      {
        q: 'Ak je to zadarmo, ako sa wwwallet financuje?',
        a: 'Na svojich používateľoch nezarába – žiadne poplatky, žiadne reklamy, žiadny predaj údajov. Prevádzkové náklady sú zámerne udržované na nízkej úrovni: samotná peňaženka beží vo vašom prehliadači a backend iba prenáša verejné údaje z blockchainu a cenové údaje.',
      },
      {
        q: 'Môže mi niekto zmraziť peňaženku?',
        a: 'Neexistuje žiadny účet, takže wwwallet – ani nikto iný – nemá čo zmraziť. Vaše kľúče nikdy neopustia vaše zariadenie a transakcie sa tam podpíšu ešte pred odoslaním do siete. Vaše prostriedky sú uložené na Ethereu, nie v wwwallet: súkromný kľúč alebo obnovovaciu frázu akéhokoľvek účtu si môžete zobraziť v jeho ponuke a kedykoľvek ich importovať do inej peňaženky Ethereum.',
      },
      {
        q: 'Stačí moja obnovovacia fráza na to, aby som dostal späť svoju peňaženku?',
        a: 'Nie sama o sebe. Vaša obnovovacia fráza odomkne váš šifrovaný trezor, ale samotný trezor sa nachádza iba na vašom zariadení. Ak toto zariadenie stratíte alebo vymažete bez toho, aby ste si predtým vytvorili zálohu, táto fráza už nebude mať čo odomknúť. Obnovovaciu frázu vždy kombinujte so zálohou na Google Drive alebo so zálohou súborov – pozrite si nasledujúcu otázku.',
      },
      {
        q: 'Ako môžem zálohovať svoju peňaženku?',
        a: 'V nastaveniach si zálohujte šifrovanú peňaženku na svoj Google Drive – kde bude uložená v súkromnej zložke prístupnej len pre aplikáciu, do ktorej aplikácia wwwallet nemá prístup – alebo ako súbor, ktorý si stiahnete a uchováte sami. Urobte to vždy, keď si nastavujete peňaženku alebo pridávate nové účty.',
      },
      {
        q: 'Môžem používať wwwallet na viacerých zariadeniach?',
        a: 'Áno, ale synchronizácia neprebieha automaticky – každé zariadenie má svoj vlastný lokálny trezor. Ak chcete používať wwwallet na novom zariadení, obnovte ho tam zo zálohy na Drive alebo zo súboru a potom ho odomknite pomocou obnovovacej frázy.',
      },
      {
        q: 'Čo sa stane, ak stratím svoje zariadenie a nikdy som si nevytvoril zálohu?',
        a: 'Vaše prostriedky nie je možné obnoviť. Je to zámerné: wwwallet nemá žiadny systém účtov a nikde neuchováva žiadnu kópiu vášho trezoru, takže nikto – ani my – vám ho nemôže obnoviť. Je to kompromis za peňaženku, ku ktorej máte prístup len vy.',
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
        a: 'wwwallet je softvér bez úschovy poskytovaný „tak, ako je“, bez akejkoľvek záruky. Vaše kľúče a finančné prostriedky máte pod kontrolou výlučne vy – nikto, vrátane nás, nemôže obnoviť stratenú obnovovaciu frázu alebo zálohu, zrušiť transakciu ani vám nahradiť straty. Používajte iba finančné prostriedky, ktorých stratu si môžete dovoliť, pred odoslaním si dôkladne skontrolujte adresy a siete a nič z uvedeného nepredstavuje finančné, investičné, právne ani daňové poradenstvo.',
      },
      {
        q: 'Ktoré siete podporuje wwwallet?',
        a: 'Hlavná sieť Ethereum a siete Layer-2 Polygon, Arbitrum, Base a Optimism – všetko z rovnakého súboru účtov.',
      },
      {
        q: 'Ako môžem vložiť prostriedky do svojej peňaženky?',
        a: 'Otvorte si účet, vyberte možnosť „Zobraziť QR kód“, aby ste videli jeho adresu, a pošlite prostriedky na túto adresu z burzy alebo inej peňaženky. Uistite sa, že posielate prostriedky cez správnu sieť (Ethereum, Polygon, Arbitrum, Base alebo Optimism) – tá istá adresa funguje vo všetkých týchto sieťach, ale prostriedky poslané cez jednu sieť sa zobrazia len v tej danej sieti. Budete tiež potrebovať malé množstvo natívnej meny danej siete (napríklad ETH) na úhradu transakčných poplatkov.',
      },
      {
        q: 'Čo všetko môžem robiť s wwwallet?',
        a: 'Odoslať: prevedte ETH alebo akýkoľvek token na adresu, ktorú vložíte, naskenujete z QR kódu alebo vyberiete zo svojich vlastných účtov, a pred potvrdením skontrolujte podrobnosti. Výmena: vymeňte jeden token za iný v rámci tej istej siete na karte „Výmena“, pričom sa vám hneď na začiatku zobrazí kurz a odhad poplatku. Prijímať: zobrazte svoju adresu vo forme QR kódu. Môžete si tiež zobraziť svoje zostatky v USD a históriu transakcií vo všetkých podporovaných sieťach.',
      },
      {
        q: 'Čo vie wwwallet o mne?',
        a: 'Žiadne údaje, ktoré by vás identifikovali. Neexistuje žiadny účet, prihlásenie ani databáza. Údaje o zostatku a cenách sa načítajú prostredníctvom vlastného backendu služby wwwallet, namiesto toho, aby váš prehliadač priamo oslovoval poskytovateľov tretích strán, a tento backend nikdy nemá prístup k vašim kľúčom, heslám ani obnovovacej fráze.',
      },
    ],
  },
  footer: {
    tagline: 'Bezplatná peňaženka na Ethereum bez úschovy pre každého.',
    copyright: '© {year} wwwallet',
    licenseLink: 'Licencované podľa licencie PolyForm Strict 1.0.0',
    disclaimer:
      'Softvér bez úschovy sa poskytuje „tak, ako je“, bez záruky. Nejedná sa o finančné poradenstvo. Za svoje kľúče a finančné prostriedky nesiete výhradnú zodpovednosť.',
  },
  principles: {
    eyebrow: 'Zásady',
    heading: 'Bezplatné, otvorené a určené pre každého',
    lede: 'Peňaženka by mala byť nástrojom, ktorý používate, a nie podnikom založeným na svojich používateľoch. Práve na týchto zásadách je postavená služba wwwallet.',
    items: [
      {
        title: 'Zadarmo, bez žiadneho háčika',
        body: 'Žiadna cena, žiadna prémiová úroveň, žiadne platené funkcie. wwwallet neúčtuje žiadne vlastné poplatky – jediným nákladom je transakčný poplatok siete.',
      },
      {
        title: 'Žiadne reklamy, žiadne sledovanie',
        body: 'Žiadne reklamy, žiadne analytické nástroje, žiadne sledovacie skripty a žiadne údaje, ktoré by sa komukoľvek predávali. V prvom rade totiž neexistuje žiadny váš profil, ktorý by sa dal predať.',
      },
      {
        title: 'Bez registrácie',
        body: 'Žiadna kontrola e-mailovej adresy, telefónneho čísla ani dokladu totožnosti. Stačí aplikáciu otvoriť, vytvoriť peňaženku a je to.',
      },
      {
        title: 'Kľúče zostanú u vás',
        body: 'Kľúče sa vytvárajú a šifrujú priamo vo vašom zariadení a nikdy z neho neopúšťajú. wwwallet k nim nemá prístup, nemôže s vašimi prostriedkami disponovať ani vám zablokovať prístup.',
      },
      {
        title: 'Funguje kdekoľvek',
        body: 'Funguje v akomkoľvek modernom prehliadači na mobile alebo počítači a inštaluje sa ako aplikácia – nie je potrebný účet v obchode s aplikáciami.',
      },
      {
        title: 'V 31 jazykoch',
        body: 'Používajte ho v jazyku, ktorý vám najviac vyhovuje, v svetlom alebo tmavom režime.',
      },
      {
        title: 'Kód vo verejnej doméne',
        body: 'Úplný zdrojový kód je zverejnený, aby si ho mohol prečítať a skontrolovať ktokoľvek. Ide skôr o zdrojovo dostupný kód než o open source – v častých otázkach je vysvetlené, čo licencia povoľuje.',
      },
      {
        title: 'Nie je čo vypnúť',
        body: 'Neexistuje žiadny účet, ktorý by mohol byť zmrazený. Vaše prostriedky sú uložené priamo v sieti Ethereum a kľúč k akémukoľvek účtu je možné kedykoľvek preniesť do inej peňaženky.',
      },
    ],
  },
  license: {
    title: 'Licencia',
    close: 'Zatvoriť',
    summaryTitle: 'Jednoducho povedané',
    canUse: 'Aplikáciu wwwallet môžete používať zadarmo na osobné a iné nekomerčné účely.',
    canRead: 'Môžete si prečítať a skontrolovať každý riadok jeho zdrojového kódu.',
    cannot: 'Nesmiete ho kopírovať, upravovať, ďalej šíriť ani predávať.',
    englishNote: 'Nasleduje úplné znenie licencie v pôvodnej angličtine – ide o právny text.',
    viewSource: 'Zobraziť na GitHub',
  },
}
