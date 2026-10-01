export default {
  nav: {
    wallet: 'Peněženka',
    ethereum: 'Ethereum',
    crypto: 'Kryptoměny',
    faqs: 'Často kladené otázky',
    launch: 'Spustit peněženku',
    home: 'Zpět nahoru',
    sectionNavLabel: 'Navigace v sekcích',
  },
  settings: {
    open: 'Nastavení',
    close: 'Zavřít nastavení',
    theme: 'Téma',
    themeLight: 'Světlo',
    themeDark: 'Tmavý',
    language: 'Jazyk',
  },
  hero: {
    eyebrow: 'Osobní peněženka pro Ethereum bez úschovy',
    heading1: 'Vaše klíče.',
    heading2: 'Vaše zařízení.',
    heading3: 'Vaše peněženka.',
    lede: 'wwwallet šifruje vaši peněženku přímo na vašem zařízení a nikdy nikam neodesílá vaše klíče, hesla ani obnovovací frázi. Není třeba zakládat žádný účet. Nehrozí žádné narušení bezpečnosti serveru. Jen vy a vaše kryptoměny.',
    ctaPrimary: 'Spustit peněženku',
    ctaSecondary: 'Podívejte se, jak to funguje',
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
        q: 'Stačí moje obnovovací fráze k tomu, abych dostal svou peněženku zpět?',
        a: 'Sama o sobě ne. Vaše obnovovací fráze odemkne váš zašifrovaný trezor, ale samotný trezor se nachází pouze na vašem zařízení. Pokud toto zařízení ztratíte nebo vymažete, aniž byste si kdykoli vytvořili zálohu, nebude už co tou frází odemknout. Obnovovací frázi vždy kombinujte se zálohou na Disku Google nebo se zálohou souborů – viz další otázka.',
      },
      {
        q: 'Jak mám zálohovat svou peněženku?',
        a: 'V nastaveních si zálohujte šifrovaný trezor na svůj vlastní Google Drive – kde bude uložen v soukromé složce přístupné pouze pro tuto aplikaci, do které wwwallet nemá přístup – nebo jako soubor, který si stáhnete a uložíte si ho sami. Tuto zálohu proveďte vždy, když si nastavujete peněženku nebo přidáváte nové účty.',
      },
      {
        q: 'Mohu používat wwwallet na více než jednom zařízení?',
        a: 'Ano, ale synchronizace neprobíhá automaticky – každé zařízení má svůj vlastní lokální trezor. Chcete-li používat wwwallet na novém zařízení, obnovte jej tam ze zálohy na Disku nebo ze souboru a poté jej odemkněte pomocí své obnovovací fráze.',
      },
      {
        q: 'Co se stane, když ztratím zařízení a nikdy jsem si neudělal zálohu?',
        a: 'Vaše prostředky nelze obnovit. Je to záměrné: wwwallet nemá žádný systém účtů a nikde neuchovává žádnou kopii vašeho trezoru, takže nikdo – ani my – vám jej nemůže obnovit. To je kompromis za to, že k peněžence máte přístup pouze vy.',
      },
      {
        q: 'Přenesou se přístupové klíče (Face ID / Touch ID) do nového zařízení?',
        a: 'Ne. Přístupový klíč je vázán na zařízení, na kterém byl vytvořen. Po obnovení zálohy na novém zařízení jej odemkněte pomocí své obnovovací fráze a poté si na něm můžete nastavit nový přístupový klíč.',
      },
      {
        q: 'Je wwwallet open source?',
        a: 'Ne — zdrojový kód je k dispozici. Kompletní zdrojový kód je zveřejněn na GitHubu, takže si jej může kdokoli přečíst, zkontrolovat a prověřit, nejedná se však o open source: kód je licencován pod licencí PolyForm Strict License 1.0.0.',
      },
      {
        q: 'Co smím s tím kódem dělat?',
        a: 'Můžete si vše přečíst a zkontrolovat a spustit neupravenou kopii pro nekomerční účely, jako je osobní studium, výzkum a testování. Nesmíte jej šířit, upravovat ani vytvářet odvozená díla (včetně forků) ani jej používat ke komerčním účelům. Pokud potřebujete něco, co licence nepovoluje, obraťte se na držitele autorských práv a požádejte o samostatnou licenci.',
      },
      {
        q: 'Je používání služby wwwallet bezpečné? Poskytuje se na ni nějaká záruka?',
        a: 'wwwallet je software bez úschovy poskytovaný „tak, jak je“, bez jakékoli záruky. O své klíče a prostředky se staráte výhradně vy sami — nikdo, včetně nás, nemůže obnovit ztracenou obnovovací frázi nebo zálohu, zvrátit transakci ani vám nahradit ztráty. Používejte pouze prostředky, o které si můžete dovolit přijít, před odesláním pečlivě zkontrolujte adresy a sítě a nic zde není finančním, investičním, právním ani daňovým poradenstvím.',
      },
      {
        q: 'Jaké sítě podporuje wwwallet?',
        a: 'Hlavní síť Ethereum a sítě druhé vrstvy Polygon, Arbitrum, Base a Optimism – to vše z jedné sady účtů.',
      },
      {
        q: 'Jak mohu vložit prostředky do své peněženky?',
        a: 'Otevřete si účet, vyberte možnost „Zobrazit QR kód“, abyste si zobrazili jeho adresu, a odešlete prostředky na tuto adresu z burzy nebo jiné peněženky. Ujistěte se, že posíláte prostředky na správné síti (Ethereum, Polygon, Arbitrum, Base nebo Optimism) – stejná adresa funguje na všech z nich, ale prostředky odeslané v jedné síti se zobrazí pouze v té síti. Budete také potřebovat malé množství nativní měny dané sítě (například ETH) na úhradu transakčních poplatků.',
      },
      {
        q: 'Co všechno mohu dělat s wwwallet?',
        a: 'Odeslat: převedete ETH nebo jakýkoli token na adresu, kterou vložíte, naskenujete z QR kódu nebo vyberete ze svých vlastních účtů, a před potvrzením zkontrolujete podrobnosti. Výměna: na záložce „Výměna“ vyměníte jeden token za jiný v rámci stejné sítě, přičemž se předem zobrazí kurz a odhad poplatku. Příjem: zobrazíte svou adresu jako QR kód. Můžete si také prohlédnout své zůstatky v USD a historii transakcí napříč všemi podporovanými sítěmi.',
      },
      {
        q: 'Co o mně ví wwwallet?',
        a: 'Žádné údaje, které by vás identifikovaly. Neexistuje žádný účet, přihlašovací údaje ani databáze. Údaje o zůstatku a cenách se načítávají prostřednictvím vlastního backendu služby wwwallet, nikoli tak, že by váš prohlížeč přímo kontaktoval externí poskytovatele, a tento backend nikdy nemá přístup k vašim klíčům, heslům ani obnovovací frázi.',
      },
    ],
  },
  footer: {
    tagline: 'Osobní peněženka pro Ethereum bez úschovy.',
    sourceLink: 'Zobrazit zdrojový kód na GitHubu',
    copyright: '© {year} wwwallet',
    licenseLink: 'Licencováno pod licencí PolyForm Strict 1.0.0',
    disclaimer:
      'Software bez úschovy je poskytován „tak, jak je“, bez záruky. Nejedná se o finanční poradenství. Za své klíče a prostředky nesete výhradní odpovědnost.',
  },
}
