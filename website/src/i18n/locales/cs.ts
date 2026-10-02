export default {
  nav: {
    wallet: 'Peněženka',
    ethereum: 'Ethereum',
    crypto: 'Kryptoměny',
    faqs: 'Často kladené otázky',
    launch: 'Spustit peněženku',
    home: 'Zpět nahoru',
    sectionNavLabel: 'Navigace v sekcích',
    principles: 'Zásady',
  },
  settings: {
    open: 'Nastavení',
    close: 'Zavřít nastavení',
    theme: 'Téma',
    themeLight: 'Světlo',
    themeDark: 'Tmavý',
    language: 'Jazyk',
    search: 'Hledat',
    noMatches: 'Žádné výsledky',
  },
  hero: {
    eyebrow: 'Bezplatná peněženka pro Ethereum bez úschovy',
    heading1: 'Tvoje klíče.',
    heading2: 'Vaše zařízení.',
    heading3: 'Zdarma pro všechny.',
    lede: 'wwwallet běží ve vašem prohlížeči a vaše klíče uchovává v zašifrované podobě na vašem vlastním zařízení. Není třeba si zakládat žádný účet, nic platit a nejsou zde žádné reklamy – je to prostě peněženka, která funguje pro všechny stejně.',
    ctaPrimary: 'Spustit peněženku',
    ctaSecondary: 'Podívejte se, jak to funguje',
    note: 'Žádná registrace · Žádné reklamy · Žádné sledování · 31 jazyků',
  },
  wallet: {
    eyebrow: 'Peněženka',
    heading: 'Je to vyrobeno tak, aby to mohl otevřít jen ty',
    lede: 'wwwallet vaše prostředky nespravuje – pomáhá vám je spravovat sami. Takto to v praxi funguje.',
    points: [
      {
        title: 'Bez úschovy, vždy',
        body: 'Vaše soukromé klíče se generují a šifrují přímo na vašem zařízení. Servery wwwallet k nim nikdy nemají přístup – neexistuje žádná databáze peněženek, do které by mohlo dojít k narušení, protože žádná databáze vůbec neexistuje.',
      },
      {
        title: 'Šifrováno pomocí AES-256, odemknutí podle vašich představ',
        body: 'Váš trezor je chráněn šifrováním AES-256-GCM. Odemkněte jej pomocí své obnovovací fráze nebo si nastavte přístupový klíč – Face ID, Touch ID nebo Windows Hello – pro rychlý přístup výhradně v lokálním režimu.',
      },
      {
        title: 'Zamkne se automaticky',
        body: 'wwwallet se po krátké době nečinnosti uzamkne a nikdy neukládá údaje o vaší odemčené relaci na disk – stačí zavřít kartu a aplikace na to záměrně zapomene.',
      },
      {
        title: 'Jedna peněženka, pět sítí Ethereum',
        body: 'Uchovávejte a odesílejte prostředky v hlavní síti Ethereum, na sítích Polygon, Arbitrum, Base a Optimism ze stejné sady účtů.',
      },
    ],
    caveatTitle:
      'Vaše obnovovací fráze odemyká váš trezor – nejedná se o žádnou „kouzelnou“ zálohu',
    caveatBody:
      'Uložte si obnovovací frázi na bezpečném místě, ale vytvořte si také zálohu na Disku Google nebo v jiném souboru. Zálohu budete potřebovat k obnovení peněženky na novém zařízení a frázi k jejímu odemčení, jakmile ji obnovíte.',
    caveatLink: 'Více informací najdete v sekci Často kladené otázky',
  },
  ethereum: {
    eyebrow: 'Ethereum',
    heading: 'Proč Ethereum?',
    lede: 'wwwallet je vyvinut speciálně pro Ethereum. Zde jsou důvody, proč tomu tak je, vysvětlené srozumitelně.',
    points: [
      {
        title: 'Světový počítač, ne jen účetní kniha',
        body: 'Ethereum převzalo bitcoinový koncept sdílené, proti manipulaci zabezpečené účetní knihy a dále jej rozvinulo: globální, programovatelný počítač, na kterém může kdokoli stavět a který žádná jednotlivá strana nemůže vypnout.',
      },
      {
        title: 'Zabezpečeno stakingem, nikoli těžbou',
        body: 'Od „The Merge“ v roce 2022 je síť Ethereum zabezpečována mechanismem Proof-of-Stake namísto energeticky náročného těžby – validátoři vkládají ETH jako kolaterál, místo aby spotřebovávali elektřinu a soutěžili o bloky.',
      },
      {
        title: 'Otevřený a bez nutnosti povolení',
        body: 'Nikdo váš účet neschvaluje. Kdokoli a kdekoli může držet ETH nebo vyvíjet aplikace na platformě Ethereum – pro všechny platí stejná pravidla, včetně těch největších institucí.',
      },
      {
        title: 'Standard, na kterém staví ostatní sítě',
        body: 'Sítě vrstvy 2, jako jsou Arbitrum, Base a Optimism – které jsou všechny podporovány v aplikaci wwwallet – rozšiřují bezpečnost sítě Ethereum tak, aby umožňovaly rychlejší a levnější transakce, aniž by bylo nutné začínat úplně od nuly.',
      },
    ],
    linkLabel: 'Více informací najdete na stránkách Ethereum Foundation',
    linkUrl: 'https://ethereum.org/en/foundation/',
  },
  crypto: {
    eyebrow: 'Kryptoměny',
    heading: 'Kryptoměny, jednoduše řečeno',
    lede: 'Několik pojmů, které je dobré pochopit, než si sami pořídíte nějaké kryptoměny – a to nejen prostřednictvím wwwallet.',
    points: [
      {
        title: 'S správou majetku vs. bez správy majetku',
        body: 'Kustodní peněženka nebo burza spravuje vaše klíče za vás – je to sice pohodlné, ale spoléháte se na to, že někdo jiný vaše prostředky nezmrazí, neztratí ani nezneužije. U nekustodní peněženky, jako je wwwallet, máte klíče i odpovědnost výhradně ve svých rukou.',
      },
      {
        title: 'Staking versus těžba',
        body: 'Těžba metodou Proof-of-Work zajišťuje bezpečnost blockchainu pomocí hrubého výpočetního výkonu a elektřiny. Metoda Proof-of-Stake jej naopak zajišťuje pomocí kapitálu vystaveného riziku. Přechod Etherea na staking snížil jeho spotřebu energie o více než 99,9 % — což zhruba odpovídá rozdílu mezi zásobováním elektřinou malé země a malého města.',
      },
      {
        title: 'Za hranicemi Etherea',
        body: 'Bitcoin upřednostňuje jednoduchost a předvídatelnost před programovatelností. Řetězce jako Solana se zaměřují na maximální propustnost, přičemž k dosažení tohoto cíle často obětují decentralizaci. Ethereum klade na první místo decentralizaci a bezpečnost a otázky rychlosti a nákladů přenechává sítím druhé vrstvy (Layer-2), které jsou na něm postaveny.',
      },
      {
        title: 'Nikdo seriózní po vás nebude chtít vaši frázi',
        body: 'Ať už používáte jakoukoli peněženku: ani burza, ani pracovník podpory, ani žádný zaměstnanec společnosti wwwallet vás nikdy nebude žádat o vaši obnovovací frázi. Kdokoli, kdo to udělá, se vás snaží okrást.',
      },
    ],
    linkLabel: 'Ponořte se hlouběji do tématu s podcastem Bankless',
    linkUrl: 'https://www.bankless.com/',
  },
  faqs: {
    eyebrow: 'Často kladené otázky',
    heading: 'Často kladené otázky',
    items: [
      {
        q: 'Je wwwallet opravdu zdarma?',
        a: 'Ano. Jeho používání je zdarma, neexistuje žádná prémiová úroveň ani obsah dostupný pouze za poplatek a wwwallet si k ničemu, co posíláte nebo směňujete, nepřipočítává žádné poplatky. Jediným nevyhnutelným nákladem je vlastní transakční poplatek (gas) sítě, který putuje do sítě, nikoli do wwwallet. Nabídky na výměnu pocházejí z agregátoru burz 0x, který může u některých obchodů účtovat vlastní poplatek – jakýkoli takový poplatek je uveden na obrazovce s přehledem před potvrzením transakce.',
      },
      {
        q: 'Jsou tam reklamy, sledovací nástroje nebo analytické nástroje?',
        a: 'Ne. Web wwwallet nezobrazuje žádné reklamy, nepoužívá žádné analytické ani sledovací skripty a nevytváří o vás žádný profil. Neexistuje zde žádný účet, takže není k čemu by se dalo něco přiřadit.',
      },
      {
        q: 'Potřebuji k jeho používání účet nebo identifikační údaje?',
        a: 'Ne. Není třeba se registrovat, zadávat e-mailovou adresu ani telefonní číslo, ani se neověřuje totožnost – stačí si na svém zařízení vytvořit peněženku a můžete ji hned začít používat.',
      },
      {
        q: 'Když je to zdarma, jak se wwwallet financuje?',
        a: 'Na svých uživatelích nevydělává – žádné poplatky, žádné reklamy, žádný prodej dat. Provozní náklady jsou záměrně udržovány na nízké úrovni: samotná peněženka běží ve vašem prohlížeči a backend pouze přenáší veřejná data z blockchainu a cenové údaje.',
      },
      {
        q: 'Může mi někdo zmrazit peněženku?',
        a: 'Neexistuje žádný účet, takže wwwallet – ani nikdo jiný – nemá co zmrazit. Vaše klíče nikdy neopouštějí vaše zařízení a transakce se tam podepisují ještě před odesláním do sítě. Vaše prostředky jsou uloženy na síti Ethereum, nikoli v wwwallet: soukromý klíč nebo obnovovací frázi jakéhokoli účtu si můžete zobrazit v jeho nabídce a kdykoli je importovat do jiné peněženky pro Ethereum.',
      },
      {
        q: 'Stačí moje obnovovací fráze k tomu, abych dostal svou peněženku zpět?',
        a: 'Sama o sobě ne. Vaše obnovovací fráze odemkne váš zašifrovaný trezor, ale samotný trezor se nachází pouze na vašem zařízení. Pokud toto zařízení ztratíte nebo vymažete, aniž byste si kdy vytvořili zálohu, nebude už co tou frází odemknout. Obnovovací frázi vždy kombinujte se zálohou na Disku Google nebo se zálohou souborů – viz následující otázka.',
      },
      {
        q: 'Jak mám zálohovat svou peněženku?',
        a: 'V nastaveních si zálohujte šifrovaný trezor na svůj vlastní Google Drive – kde bude uložen v soukromé složce přístupné pouze pro tuto aplikaci, do které wwwallet nemá přístup – nebo jako soubor, který si stáhnete a uložíte sami. Tuto zálohu provádějte vždy, když si nastavujete peněženku nebo přidáváte nové účty.',
      },
      {
        q: 'Mohu používat wwwallet na více než jednom zařízení?',
        a: 'Ano, ale synchronizace neprobíhá automaticky – každé zařízení má svůj vlastní lokální trezor. Chcete-li používat wwwallet na novém zařízení, obnovte jej tam ze zálohy na Disku nebo ze souboru a poté jej odemkněte pomocí své obnovovací fráze.',
      },
      {
        q: 'Co se stane, když ztratím zařízení a nikdy jsem si neudělal zálohu?',
        a: 'Vaše prostředky nelze obnovit. Je to záměrné: wwwallet nemá žádný systém účtů a nikde neuchovává kopii vašeho trezoru, takže nikdo – ani my – vám jej nemůže obnovit. Je to kompromis za to, že k peněžence máte přístup pouze vy.',
      },
      {
        q: 'Přenesou se přístupové klíče (Face ID / Touch ID) do nového zařízení?',
        a: 'Ne. Přístupový kód je vázán na zařízení, na kterém byl vytvořen. Po obnovení zálohy na novém zařízení jej odemkněte pomocí své obnovovací fráze a poté si na něm můžete nastavit nový přístupový kód.',
      },
      {
        q: 'Je wwwallet open source?',
        a: 'Ne — je k dispozici zdrojový kód. Kompletní zdrojový kód je zveřejněn na GitHubu, takže si ho může kdokoli přečíst, zkontrolovat a provést audit, ale nejde o open source: kód je licencován pod licencí PolyForm Strict License 1.0.0.',
      },
      {
        q: 'Co smím s tímto kódem dělat?',
        a: 'Můžete si vše přečíst a zkontrolovat a pro nekomerční účely, jako je osobní studium, výzkum a testování, používat neupravenou kopii. Nesmíte jej šířit, upravovat ani vytvářet odvozená díla (včetně forků) ani jej používat ke komerčním účelům. Pokud potřebujete něco, co licence nepovoluje, obraťte se na držitele autorských práv a požádejte o samostatnou licenci.',
      },
      {
        q: 'Je používání služby wwwallet bezpečné? Poskytuje se na ni nějaká záruka?',
        a: 'wwwallet je software bez úschovy poskytovaný „tak, jak je“, bez jakékoli záruky. O své klíče a prostředky máte kontrolu výhradně vy – nikdo, včetně nás, nemůže obnovit ztracenou obnovovací frázi nebo zálohu, zvrátit transakci ani vám nahradit ztráty. Používejte pouze prostředky, o které si můžete dovolit přijít, před odesláním pečlivě zkontrolujte adresy a sítě a nic zde není finančním, investičním, právním ani daňovým poradenstvím.',
      },
      {
        q: 'Jaké sítě podporuje wwwallet?',
        a: 'Hlavní síť Ethereum a sítě druhé vrstvy Polygon, Arbitrum, Base a Optimism – to vše z jedné sady účtů.',
      },
      {
        q: 'Jak mohu vložit prostředky do své peněženky?',
        a: 'Otevřete si účet, vyberte možnost „Zobrazit QR kód“, abyste si zobrazili jeho adresu, a odešlete prostředky na tuto adresu z burzy nebo jiné peněženky. Ujistěte se, že posíláte prostředky na správné síti (Ethereum, Polygon, Arbitrum, Base nebo Optimism) – stejná adresa funguje na všech z nich, ale prostředky poslané na jedné síti se zobrazí pouze na té síti. Budete také potřebovat malé množství nativní měny dané sítě (například ETH) k úhradě transakčních poplatků.',
      },
      {
        q: 'Co všechno mohu dělat s wwwallet?',
        a: 'Odeslat: převedete ETH nebo jakýkoli token na adresu, kterou vložíte, naskenujete z QR kódu nebo vyberete ze svých vlastních účtů, a před potvrzením zkontrolujete podrobnosti. Výměna: na záložce „Výměna“ vyměníte jeden token za jiný v rámci stejné sítě, přičemž se vám předem zobrazí kurz a odhad poplatku. Přijmout: zobrazíte svou adresu jako QR kód. Můžete si také prohlédnout své zůstatky v USD a historii transakcí ve všech podporovaných sítích.',
      },
      {
        q: 'Co o mně ví wwwallet?',
        a: 'Žádné údaje, které by vás identifikovaly. Neexistuje žádný účet, přihlášení ani databáze. Údaje o zůstatku a cenách se načítá prostřednictvím vlastního backendu služby wwwallet, nikoli tak, že by váš prohlížeč přímo kontaktoval externí poskytovatele, a tento backend nikdy nemá přístup k vašim klíčům, heslům ani obnovovací frázi.',
      },
    ],
  },
  footer: {
    tagline: 'Bezplatná peněženka pro Ethereum bez úschovy pro každého.',
    copyright: '© {year} wwwallet',
    licenseLink: 'Licencováno pod licencí PolyForm Strict 1.0.0',
    disclaimer:
      'Software bez úschovy je poskytován „tak, jak je“, bez záruky. Nejedná se o finanční poradenství. Za své klíče a prostředky nesete výhradní odpovědnost.',
  },
  principles: {
    eyebrow: 'Zásady',
    heading: 'Zdarma, otevřené a vytvořené pro každého',
    lede: 'Peněženka by měla být nástrojem, který používáte, a ne byznysem, jenž se živí na úkor svých uživatelů. Právě na těchto zásadách je založena služba wwwallet.',
    items: [
      {
        title: 'Zdarma, bez háčku',
        body: 'Žádné ceny, žádné prémiové členství, žádné placené funkce. wwwallet si neúčtuje žádné vlastní poplatky – jediným nákladem je transakční poplatek dané sítě.',
      },
      {
        title: 'Žádné reklamy, žádné sledování',
        body: 'Žádné reklamy, žádné analytické nástroje, žádné sledovací skripty a žádná data prodávaná komukoli. V první řadě o vás ani neexistuje žádný profil, který by se dal prodat.',
      },
      {
        title: 'Bez registrace',
        body: 'Žádná kontrola e-mailu, telefonního čísla ani dokladu totožnosti. Stačí aplikaci otevřít, vytvořit peněženku a můžete začít.',
      },
      {
        title: 'Klíče si necháte u sebe',
        body: 'Klíče se vytvářejí a šifrují přímo ve vašem zařízení a nikdy z něj neopouštějí. Aplikace wwwallet k nim nemá přístup, nemůže s vašimi prostředky disponovat ani vám zablokovat přístup.',
      },
      {
        title: 'Funguje kdekoli',
        body: 'Funguje v jakémkoli moderním prohlížeči na mobilu i na počítači a instaluje se jako aplikace – není třeba mít účet v obchodě s aplikacemi.',
      },
      {
        title: 'Ve 31 jazycích',
        body: 'Používejte jej v jazyce, který vám nejvíce vyhovuje, a to v světlém nebo tmavém režimu.',
      },
      {
        title: 'Kód na veřejnosti',
        body: 'Kompletní zdrojový kód je zveřejněn, aby si jej mohl kdokoli přečíst a prověřit. Jedná se spíše o „source-available“ než o „open source“ – v sekci Často kladené otázky je vysvětleno, co licence povoluje.',
      },
      {
        title: 'Není co vypínat',
        body: 'Neexistuje žádný účet, který by mohl být zmrazen. Vaše prostředky jsou uloženy přímo na síti Ethereum a klíč k jakémukoli účtu lze kdykoli převést do jiné peněženky.',
      },
    ],
  },
  license: {
    title: 'Licence',
    close: 'Zavřít',
    summaryTitle: 'Zjednodušeně řečeno',
    canUse: 'Aplikaci wwwallet můžete používat zdarma pro osobní i jiné nekomerční účely.',
    canRead: 'Můžete si přečíst a zkontrolovat každý řádek jeho zdrojového kódu.',
    cannot: 'Nesmíte jej kopírovat, upravovat, šířit ani prodávat.',
    englishNote:
      'Následuje úplné znění licence v původním anglickém znění – jedná se o právní text.',
    viewSource: 'Zobrazit na GitHubu',
  },
}
