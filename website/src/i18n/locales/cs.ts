export default {
  nav: {
    wallet: 'wwwallet',
    ethereum: 'Ethereum',
    crypto: 'Kryptoměny',
    faqs: 'Často kladené otázky',
    launch: 'Spuštění wwwallet',
    home: 'Zpět nahoru',
    sectionNavLabel: 'Navigace v sekcích',
    principles: 'Zásady',
  },
  settings: {
    open: 'Nastavení',
    close: 'Zavřít nastavení',
    theme: 'Téma',
    themeLight: 'Stručně',
    themeDark: 'Tmavý',
    language: 'Jazyk',
    search: 'Hledat',
    noMatches: 'Žádné shody',
    version: 'Verze {version}',
  },
  hero: {
    eyebrow: 'Bezplatná nekustodialní peněženka pro Ethereum',
    heading1: 'Vaše klíče.',
    heading2: 'Vaše zařízení.',
    heading3: 'Zdarma pro všechny.',
    lede: 'wwwallet běží ve vašem prohlížeči a vaše klíče uchovává zašifrované na vašem vlastním zařízení. Není třeba si zakládat žádný účet, nic platit a nejsou zde žádné reklamy; aplikace funguje pro všechny stejně.',
    ctaPrimary: 'Spuštění wwwallet',
    ctaSecondary: 'Podívejte se, jak to funguje',
    note: 'Žádná registrace · Žádné reklamy · Žádné sledování · 31 jazyků',
  },
  wallet: {
    eyebrow: 'wwwallet',
    heading: 'Navrženo tak, aby ji mohl otevřít pouze vy',
    lede: 'Aplikace wwwallet neuchovává vaše prostředky – pomáhá vám je uchovávat sami. Zde je vysvětlení, co to v praxi znamená.',
    points: [
      {
        title: 'Vždy zdůrazňujte „bez úschovy“',
        body: 'Vaše soukromé klíče jsou generovány a šifrovány na vašem vlastním zařízení. Servery wwwallet je nikdy nevidí – neexistuje žádná databáze klíčů, do které by mohlo dojít k narušení, protože žádná databáze vůbec neexistuje.',
      },
      {
        title: 'Šifrováno pomocí AES-256, odemykání podle vašich představ',
        body: 'Váš trezor je chráněn šifrováním AES-256-GCM. Odemkněte jej pomocí své obnovovací fráze nebo si nastavte přístupový klíč – Face ID, Touch ID nebo Windows Hello – pro rychlý přístup pouze v lokálním režimu.',
      },
      {
        title: 'Automaticky se uzamkne',
        body: 'Aplikace wwwallet se po krátké době nečinnosti uzamkne a nikdy neukládá vaši odemčenou relaci na disk – zavřete-li kartu, záměrně na ni zapomene.',
      },
      {
        title: 'Patnáct sítí Ethereum, jedna sada účtů',
        body: 'Uchovávejte a odesílejte prostředky v hlavní síti Ethereum a dalších 14 sítích – včetně Arbitrum, Base, Optimism, Polygon, Linea a ZKsync – pomocí stejných účtů a adres.',
      },
    ],
    caveatTitle: 'Vaše obnovovací fráze odemyká váš trezor – nejedná se o žádnou magickou zálohu',
    caveatBody:
      'Uložte si svou obnovovací frázi na bezpečné místo, ale vytvořte si také zálohu na Google Drive nebo v souboru. Zálohu budete potřebovat k obnovení peněženky na novém zařízení a frázi k jejímu odemčení, jakmile tak učiníte.',
    caveatLink: 'Více informací najdete v sekci Často kladené otázky (FAQ)',
  },
  ethereum: {
    eyebrow: 'Ethereum',
    heading: 'Proč Ethereum',
    lede: 'Aplikace wwwallet je vyvinuta speciálně pro síť Ethereum. Zde je její přínos, vysvětlený srozumitelným způsobem.',
    points: [
      {
        title: 'Světový počítač, ne jen účetní kniha',
        body: 'Ethereum převzalo myšlenku Bitcoinu o sdílené, proti manipulaci zabezpečené účetní knize a rozšířilo ji: globální, programovatelný počítač, na kterém může kdokoli stavět a který žádná jednotlivá strana nemůže vypnout.',
      },
      {
        title: 'Zabezpečeno stakingem, nikoli těžbou',
        body: 'Od „The Merge“ v roce 2022 je Ethereum zabezpečeno mechanismem Proof-of-Stake namísto energeticky náročného těžby – validátoři vkládají ETH jako kolaterál, místo aby spotřebovávali elektřinu v soutěži o bloky.',
      },
      {
        title: 'Otevřená a bez povolení',
        body: 'Váš účet nikdo neschvaluje. Kdokoli a kdekoli může držet ETH nebo vyvíjet aplikace na platformě Ethereum – pro všechny platí stejná pravidla, včetně těch největších institucí.',
      },
      {
        title: 'Standard, na kterém staví ostatní sítě',
        body: 'Sítě vrstvy 2, jako jsou Arbitrum, Base a Optimism – všechny podporované v wwwallet – rozšiřují bezpečnost sítě Ethereum na rychlejší a levnější transakce, aniž by bylo nutné začínat od nuly.',
      },
    ],
    linkLabel: 'Více informací najdete na stránkách Ethereum Foundation',
    linkUrl: 'https://ethereum.org/en/foundation/',
  },
  crypto: {
    eyebrow: 'Kryptoměny',
    heading: 'Kryptoměny, srozumitelně vysvětlené',
    lede: 'Několik pojmů, které stojí za to pochopit, než si sami pořídíte jakoukoli kryptoměnu – nejen s wwwallet.',
    points: [
      {
        title: 'S úschovou vs. bez úschovy',
        body: 'Kustodní peněženka nebo burza spravuje vaše klíče za vás – je to pohodlné, ale spoléháte se na to, že někdo jiný vaše prostředky nezmrazí, neztratí ani nezneužije. Nekustodní peněženka, jako je wwwallet, ponechává klíče i odpovědnost výhradně ve vašich rukou.',
      },
      {
        title: 'Staking vs. těžba',
        body: 'Těžba typu Proof-of-Work zabezpečuje blockchain pomocí hrubého výpočetního výkonu a elektřiny. Proof-of-Stake jej naopak zabezpečuje pomocí kapitálu vystaveného riziku. Přechod Etherea na staking snížil jeho spotřebu energie o více než 99,9 % — což je zhruba rozdíl mezi napájením malé země a malého města.',
      },
      {
        title: 'Mimo Ethereum',
        body: 'Bitcoin upřednostňuje jednoduchost a předvídatelnost před programovatelností. Řetězce jako Solana kladou důraz na hrubou propustnost, často za cenu snížení decentralizace. Ethereum se zaměřuje především na decentralizaci a bezpečnost a rychlost a náklady přenechává sítím vrstvy 2, které jsou na něm postaveny.',
      },
      {
        title: 'Žádná seriózní osoba vás o tuto frázi nepožádá',
        body: 'Žádná burza, žádný pracovník podpory ani nikdo z wwwallet vás nikdy nebude žádat o vaši obnovovací frázi – bez ohledu na to, jakou aplikaci používáte. Kdokoli, kdo to udělá, se vás snaží okrást.',
      },
    ],
    linkLabel: 'Více informací najdete v podcastu Bankless',
    linkUrl: 'https://www.bankless.com/',
  },
  faqs: {
    eyebrow: 'Často kladené otázky',
    heading: 'Časté dotazy',
    items: [
      {
        q: 'Je wwwallet opravdu bezplatná?',
        a: 'Ano. Používání je zdarma, neexistuje žádná prémiová úroveň ani nic za placenou bránou a wwwallet nepřidává žádné poplatky k ničemu, co posíláte nebo vyměňujete. Jediným nevyhnutelným nákladem je vlastní transakční poplatek (gas) sítě, který jde síti, nikoli wwwallet. Nabídky na výměnu pocházejí z agregátoru burz 0x (nebo LI.FI v sítích, které 0x nepokrývá), který může u některých obchodů účtovat vlastní poplatek – jakýkoli takový poplatek je uveden na obrazovce s přehledem před potvrzením.',
      },
      {
        q: 'Obsahuje aplikace reklamy, sledovací nástroje nebo analytické prvky?',
        a: 'Ne. wwwallet nezobrazuje žádné reklamy, nespouští žádné analytické ani sledovací skripty a nevytváří o vás žádný profil. Neexistuje žádný účet, takže není k čemu se připojit.',
      },
      {
        q: 'Potřebuji k používání účet nebo identifikační údaje?',
        a: 'Ne. Není třeba se registrovat, uvádět e-mailovou adresu, telefonní číslo ani procházet ověřením totožnosti – peněženku si vytvoříte přímo ve svém zařízení a můžete ji hned začít používat.',
      },
      {
        q: 'Pokud je wwwallet bezplatná, jak se financuje?',
        a: 'Aplikace nevydělává peníze na svých uživatelích – žádné poplatky, žádné reklamy, žádný prodej dat. Provozní náklady jsou záměrně udržovány na nízké úrovni: samotná aplikace běží ve vašem prohlížeči a backend pouze přenáší veřejná data z blockchainu a cenová data.',
      },
      {
        q: 'Může mi někdo zmrazit peněženku?',
        a: 'Neexistuje žádný účet, takže wwwallet – ani nikdo jiný – nemůže nic zmrazit. Vaše klíče nikdy neopustí vaše zařízení a transakce se podepisují přímo tam, než jsou odeslány do sítě. Vaše prostředky jsou uloženy na Ethereu, nikoli ve wwwallet: soukromý klíč nebo obnovovací frázi jakéhokoli účtu si můžete zobrazit v jeho nabídce a kdykoli je importovat do jakékoli jiné aplikace peněženky pro Ethereum.',
      },
      {
        q: 'Stačí mi moje obnovovací fráze k tomu, abych získal svou peněženku zpět?',
        a: 'Ne sama o sobě. Vaše obnovovací fráze odemyká váš zašifrovaný trezor, ale samotný trezor existuje pouze na vašem zařízení. Pokud toto zařízení ztratíte nebo vymažete, aniž byste si kdykoli vytvořili zálohu, nezůstane nic, co by fráze mohla odemknout. Obnovovací frázi vždy kombinujte se zálohou na Google Drive nebo v souboru – viz další otázka.',
      },
      {
        q: 'Jak si zálohuji peněženku?',
        a: 'V nastavení si zálohujte šifrovaný trezor na svůj vlastní Google Drive nebo jako soubor, který si stáhnete a uložíte sami. Záloha na Drive se ukládá do soukromé složky aplikace a wwwallet nevidí nic jiného ve vašem Drive. Zálohujte při prvním nastavení a znovu pokaždé, když přidáte účty.',
      },
      {
        q: 'Mohu používat wwwallet na více než jednom zařízení?',
        a: 'Ano, ale nedochází k automatické synchronizaci – každé zařízení má svůj vlastní lokální trezor. Chcete-li používat wwwallet na novém zařízení, obnovte jej tam ze zálohy na Disku nebo ze souboru a poté jej odemkněte pomocí své obnovovací fráze.',
      },
      {
        q: 'Co se stane, když ztratím zařízení a nikdy jsem si neudělal zálohu?',
        a: 'Vaše prostředky nelze obnovit. Je to záměrné: wwwallet nemá žádný systém účtů a nikde neuchovává kopii vašeho trezoru, takže nikdo – včetně nás – vám jej nemůže obnovit. Je to kompromis za to, že k klíčům máte přístup pouze vy.',
      },
      {
        q: 'Přenesou se přístupové klíče (Face ID / Touch ID) na nové zařízení?',
        a: 'Ne. Přístupový klíč je vázán na zařízení, na kterém byl vytvořen. Po obnovení zálohy na novém zařízení jej odemkněte pomocí své obnovovací fráze a tam si můžete nastavit nový přístupový klíč.',
      },
      {
        q: 'Je wwwallet open source?',
        a: 'Ne — je to zdrojově dostupné. Kompletní zdrojový kód je veřejně dostupný na GitHubu, takže si jej může kdokoli přečíst, zkontrolovat a provést audit, ale nejedná se o open source: kód je licencován pod licencí PolyForm Strict License 1.0.0.',
      },
      {
        q: 'Co smím s tímto kódem dělat?',
        a: 'Můžete si vše přečíst a zkontrolovat a spustit neupravenou kopii pro nekomerční účely, jako je osobní studium, výzkum a testování. Nesmíte jej šířit, upravovat ani vytvářet odvozená díla (včetně forků) ani jej používat ke komerčním účelům. Pokud potřebujete něco, co licence nepovoluje, obraťte se na držitele autorských práv a požádejte o samostatnou licenci.',
      },
      {
        q: 'Je používání wwwallet bezpečné? Poskytuje se na něj nějaká záruka?',
        a: 'wwwallet je nekustodialní software poskytovaný „tak, jak je“, bez jakékoli záruky. O své klíče a prostředky se staráte výhradně vy sami – nikdo, včetně nás, nemůže obnovit ztracenou obnovovací frázi nebo zálohu, zvrátit transakci ani vám nahradit ztráty. Používejte pouze prostředky, o které si můžete dovolit přijít, před odesláním si pečlivě zkontrolujte adresy a sítě a nic zde není finančním, investičním, právním ani daňovým poradenstvím.',
      },
      {
        q: 'Jaké sítě wwwallet podporuje?',
        a: 'Hlavní síť Ethereum, plus Arbitrum, Base, Optimism, Polygon, Robinhood Chain, World Chain, Ink, Linea, Gnosis, Celo, ZKsync Era, Ronin, Unichain a Scroll – vše ze stejné sady účtů.',
      },
      {
        q: 'Jak mohu vložit prostředky do své peněženky?',
        a: 'Otevřete účet, vyberte možnost „Zobrazit QR kód“, abyste viděli jeho adresu, a odešlete prostředky na tuto adresu z burzy nebo jiné peněženky. Ujistěte se, že posíláte prostředky na správnou síť (například Ethereum, Base nebo Arbitrum) – stejná adresa funguje na všech podporovaných sítích, ale prostředky odeslané v jedné síti se zobrazí pouze v té síti. Budete také potřebovat malé množství nativní měny dané sítě (například ETH) na úhradu transakčních poplatků.',
      },
      {
        q: 'Co mohu s wwwallet dělat?',
        a: 'Odeslat: převést ETH nebo jakýkoli token na adresu, kterou vložíte, naskenujete z QR kódu nebo vyberete ze svých vlastních účtů, a před potvrzením zkontrolovat podrobnosti. Vyměnit: vyměnit jeden token za jiný ve stejné síti na záložce „Vyměnit“, přičemž se předem zobrazí kurz a odhad poplatku. Přijmout: zobrazit svou adresu jako QR kód. Můžete si také prohlédnout své zůstatky v USD a historii transakcí ve všech podporovaných sítích.',
      },
      {
        q: 'Co o mně wwwallet ví?',
        a: 'Nic, co by vás identifikovalo. Neexistuje žádný účet, přihlašovací údaje ani databáze. Údaje o zůstatku a cenách se načítá prostřednictvím vlastního backendu aplikace wwwallet, nikoli prostřednictvím vašeho prohlížeče, který by přímo volal poskytovatele třetích stran, a tento backend nikdy nevidí vaše klíče, hesla ani obnovovací frázi.',
      },
    ],
  },
  footer: {
    tagline: 'Bezplatná nekustodialní peněženka pro Ethereum pro každého.',
    copyright: '© {year} wwwallet',
    licenseLink: 'Licencováno pod PolyForm Strict 1.0.0',
    disclaimer:
      'Nekustodialní software je poskytován „tak, jak je“, bez záruky. Nejedná se o finanční poradenství. Za své klíče a prostředky nesete výhradní odpovědnost.',
  },
  principles: {
    eyebrow: 'Zásady',
    heading: 'Bezplatná, otevřená a vytvořená pro každého',
    lede: 'Software, který spravuje vaše peníze, by měl být nástrojem, který používáte, a ne podnikem založeným na svých uživatelích. To jsou zásady, na nichž je wwwallet postaven.',
    items: [
      {
        title: 'Zdarma, bez háčků',
        body: 'Žádné ceny, žádné prémiové úrovně, žádné placené funkce. wwwallet si neúčtuje žádné vlastní poplatky – jediným nákladem je transakční poplatek dané sítě.',
      },
      {
        title: 'Žádné reklamy, žádné sledování',
        body: 'Žádné reklamy, žádné analytické nástroje, žádné sledovací skripty a žádná data prodávaná komukoli. V první řadě o vás neexistuje žádný profil, který by se dal prodat.',
      },
      {
        title: 'Žádná registrace',
        body: 'Žádná ověření e-mailu, telefonního čísla ani totožnosti. Stačí aplikaci otevřít, vytvořit peněženku a je to.',
      },
      {
        title: 'Vaše klíče zůstávají u vás',
        body: 'Klíče se vytvářejí a šifrují na vašem zařízení a nikdy z něj neopouštějí. Aplikace wwwallet je nemůže vidět, nemůže přesouvat vaše prostředky ani vám zablokovat přístup.',
      },
      {
        title: 'Funguje kdekoli',
        body: 'Funguje v jakémkoli moderním prohlížeči na telefonu nebo počítači a instaluje se jako aplikace – není potřeba účet v obchodě s aplikacemi.',
      },
      {
        title: 'Ve 31 jazycích',
        body: 'Používejte ji v jazyce, který vám nejvíce vyhovuje, v světlém nebo tmavém režimu.',
      },
      {
        title: 'Kód je veřejně dostupný',
        body: 'Kompletní zdrojový kód je zveřejněn, aby si jej mohl kdokoli přečíst a prověřit. Jedná se o kód s dostupným zdrojovým kódem, nikoli o open source – v sekci Často kladené otázky je vysvětleno, co licence umožňuje.',
      },
      {
        title: 'Není třeba nic vypínat',
        body: 'Neexistuje žádný účet, který by někdo mohl zmrazit. Vaše prostředky jsou uloženy přímo na síti Ethereum a klíč k jakémukoli účtu lze kdykoli převést do jiné peněženky.',
      },
    ],
  },
  license: {
    title: 'Licence',
    close: 'Zavřít',
    summaryTitle: 'Srozumitelnou angličtinou',
    canUse: 'Aplikaci wwwallet můžete používat zdarma pro osobní a jiné nekomerční účely.',
    canRead: 'Můžete si přečíst a zkontrolovat každý řádek jejího zdrojového kódu.',
    cannot: 'Tento text nesmíte kopírovat, měnit, dále šířit ani prodávat.',
    englishNote:
      'Následuje úplné znění licence v původním anglickém znění – jedná se o právní text.',
    viewSource: 'Zobrazit zdroj na GitHubu',
  },
  meta: {
    title: 'wwwallet — Bezplatná nekustodialní peněženka pro Ethereum',
    description:
      'Bezplatná peněženka pro Ethereum ve vašem prohlížeči. Žádná registrace, žádné reklamy, žádné sledování – vaše klíče zůstávají zašifrované na vašem zařízení. Ethereum, Base, Arbitrum, Optimism, Polygon a dalších 10 sítí.',
  },
}
