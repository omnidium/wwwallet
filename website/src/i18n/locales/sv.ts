export default {
  nav: {
    wallet: 'wwwallet',
    ethereum: 'Ethereum',
    crypto: 'Krypto',
    faqs: 'Vanliga frågor',
    launch: 'Lansera wwwallet',
    home: 'Tillbaka till toppen',
    sectionNavLabel: 'Navigering i avsnitten',
    principles: 'Principer',
  },
  settings: {
    open: 'Inställningar',
    close: 'Stäng inställningarna',
    theme: 'Tema',
    themeLight: 'Lätt',
    themeDark: 'Mörk',
    language: 'Språk',
    search: 'Sök',
    noMatches: 'Inga träffar',
    version: 'Version {version}',
  },
  hero: {
    eyebrow: 'En gratis, icke-förvarande Ethereum-plånbok',
    heading1: 'Dina nycklar.',
    heading2: 'Din enhet.',
    heading3: 'Gratis för alla.',
    lede: 'wwwallet körs i din webbläsare och förvarar dina nycklar krypterade på din egen enhet. Du behöver inte skapa något konto, det kostar ingenting och det finns inga annonser – och det fungerar på samma sätt för alla.',
    ctaPrimary: 'Lansera wwwallet',
    ctaSecondary: 'Se hur det fungerar',
    note: 'Ingen registrering · Inga annonser · Ingen spårning · 31 språk',
  },
  wallet: {
    eyebrow: 'wwwallet',
    heading: 'Utvecklad så att endast du kan öppna den',
    lede: 'wwwallet förvarar inte dina medel – den hjälper dig att förvara dem själv. Så här fungerar det i praktiken.',
    points: [
      {
        title: 'Icke-förvarande, alltid',
        body: 'Dina privata nycklar genereras och krypteras på din egen enhet. wwwallet:s servrar ser dem aldrig – det finns ingen databas med nycklar som kan hackas, eftersom det inte finns någon databas alls.',
      },
      {
        title: 'Krypterad med AES-256, lås upp på ditt sätt',
        body: 'Ditt valv skyddas med AES-256-GCM-kryptering. Lås upp det med din återställningsfras eller aktivera en lösenkod – Face ID, Touch ID eller Windows Hello – för snabb åtkomst endast lokalt.',
      },
      {
        title: 'Låser sig automatiskt',
        body: 'wwwallet låses efter en kort period av inaktivitet och sparar aldrig din upplåsta session på hårddisken – stänger du fliken glömmer den det, med avsikt.',
      },
      {
        title: 'Fem Ethereum-nätverk, en uppsättning konton',
        body: 'Förvara och skicka över Ethereums mainnet, Polygon, Arbitrum, Base och Optimism med samma konton och adresser.',
      },
    ],
    caveatTitle: 'Din återställningsfras låser upp ditt valv – det är ingen magisk säkerhetskopia',
    caveatBody:
      'Spara din återställningsfras på en säker plats, men gör även en säkerhetskopia på Google Drive eller i en fil. Du behöver säkerhetskopian för att återställa din plånbok på en ny enhet, och frasen för att låsa upp den när du väl har gjort det.',
    caveatLink: 'Läs mer i FAQ:en',
  },
  ethereum: {
    eyebrow: 'Ethereum',
    heading: 'Varför Ethereum',
    lede: 'wwwallet är specifikt utvecklat för Ethereum. Här är argumenten för det, i enkla ordalag.',
    points: [
      {
        title: 'En världsdator, inte bara en huvudbok',
        body: 'Ethereum tog Bitcoins idé om en delad, manipuleringssäker huvudbok och utvidgade den: en global, programmerbar dator som vem som helst kan bygga vidare på, och som ingen enskild part kan stänga av.',
      },
      {
        title: 'Säkerhet genom staking, inte mining',
        body: 'Sedan ”The Merge” 2022 har Ethereum säkrats genom Proof-of-Stake istället för energikrävande mining – validerare sätter ETH på spel som säkerhet istället för att förbruka el för att tävla om block.',
      },
      {
        title: 'Öppen och tillståndsfri',
        body: 'Ingen godkänner ditt konto. Vem som helst, var som helst, kan inneha ETH eller bygga en applikation på Ethereum – samma regler gäller för alla, inklusive de största institutionerna.',
      },
      {
        title: 'Den standard som andra nätverk bygger på',
        body: 'Layer-2-nätverk som Arbitrum, Base och Optimism – som alla stöds i wwwallet – utökar Ethereums säkerhet till snabbare och billigare transaktioner istället för att börja från scratch.',
      },
    ],
    linkLabel: 'Läs mer på Ethereum Foundation',
    linkUrl: 'https://ethereum.org/en/foundation/',
  },
  crypto: {
    eyebrow: 'Krypto',
    heading: 'Kryptovaluta, i enkla termer',
    lede: 'Några begrepp som är värda att förstå innan du själv börjar äga kryptovaluta – inte bara med wwwallet.',
    points: [
      {
        title: 'Förvaringsbaserad kontra icke-förvaringsbaserad',
        body: 'En förvaringsplånbok eller en börs förvarar dina nycklar åt dig – det är bekvämt, men du litar på att någon annan inte fryser, tappar bort eller missbrukar dina medel. En icke-förvaringsplånbok som wwwallet lämnar nycklarna, och ansvaret, helt och hållet i dina händer.',
      },
      {
        title: 'Staking kontra mining',
        body: 'Proof-of-Work-mining säkrar en blockkedja med ren datorkraft och el. Proof-of-Stake säkrar den istället med kapital som står på spel. Ethereums övergång till staking minskade energiförbrukningen med mer än 99,9 % – ungefär skillnaden mellan att försörja ett litet land och en liten stad med el.',
      },
      {
        title: 'Utöver Ethereum',
        body: 'Bitcoin prioriterar enkelhet och förutsägbarhet framför programmerbarhet. Kedjor som Solana satsar på hög genomströmning, ofta på bekostnad av decentralisering för att uppnå detta. Ethereum prioriterar decentralisering och säkerhet i första hand, och överlåter hastighet och kostnad till Layer-2-nätverk som byggts ovanpå det.',
      },
      {
        title: 'Ingen seriös aktör ber om din fras',
        body: 'Ingen börs, ingen supportmedarbetare och ingen från wwwallet kommer någonsin att be om din återställningsfras – oavsett vilken app du använder. Den som gör det försöker lura dig på dina tillgångar.',
      },
    ],
    linkLabel: 'Fördjupa dig med Bankless-podcasten',
    linkUrl: 'https://www.bankless.com/',
  },
  faqs: {
    eyebrow: 'Vanliga frågor',
    heading: 'Vanliga frågor',
    items: [
      {
        q: 'Är wwwallet verkligen gratis?',
        a: 'Ja. Det kostar ingenting att använda den, det finns ingen premiumnivå och inget bakom en betalvägg, och wwwallet lägger inte på någon avgift på något du skickar eller byter. Den enda oundvikliga kostnaden är nätverkets egen transaktionsavgift (gasavgift), som går till nätverket snarare än till wwwallet. Byteskurser kommer från 0x-börsaggregatorn, som kan lägga på en egen avgift på vissa transaktioner – eventuella sådana avgifter visas på bekräftelseskärmen innan du bekräftar.',
      },
      {
        q: 'Finns det annonser, spårare eller analysverktyg?',
        a: 'Nej. wwwallet visar inga annonser, kör inga analys- eller spårningsskript och skapar ingen profil på dig. Det finns inget konto, så det finns inget att koppla det till.',
      },
      {
        q: 'Behöver jag ett konto eller ID för att använda den?',
        a: 'Nej. Det krävs ingen registrering, e-postadress, telefonnummer eller identitetskontroll – du skapar en plånbok på din enhet och börjar använda den direkt.',
      },
      {
        q: 'Om den är gratis, hur finansierar sig wwwallet?',
        a: 'Appen tjänar inga pengar på sina användare – inga avgifter, inga annonser, ingen försäljning av data. Driftskostnaderna hålls låga genom appens utformning: själva appen körs i din webbläsare, och backend-systemet vidarebefordrar endast offentlig blockkedjedata och prisdata.',
      },
      {
        q: 'Kan någon frysa min plånbok?',
        a: 'Det finns inget konto, så det finns inget som wwwallet – eller någon annan – kan frysa. Dina nycklar lämnar aldrig din enhet, och transaktionerna signeras där innan de skickas till nätverket. Dina medel finns på Ethereum, inte i wwwallet: du kan visa vilket kontos privata nyckel eller återställningsfras som helst från dess meny och importera den till vilken annan Ethereum-plånboksapp som helst när du vill.',
      },
      {
        q: 'Räcker min återställningsfras för att få tillbaka min plånbok?',
        a: 'Inte på egen hand. Din återställningsfras låser upp ditt krypterade valv, men själva valvet finns endast på din enhet. Om du tappar bort eller rensar den enheten utan att någonsin ha gjort en säkerhetskopia finns det inget kvar som frasen kan låsa upp. Kombinera alltid din återställningsfras med en säkerhetskopia på Google Drive eller i en fil – se nästa fråga.',
      },
      {
        q: 'Hur säkerhetskopierar jag min plånbok?',
        a: 'Från Inställningar säkerhetskopierar du ditt krypterade valv till ditt eget Google Drive eller som en fil som du laddar ner och förvarar själv. En Drive-säkerhetskopia placeras i en privat appmapp, och wwwallet kan inte se något annat på ditt Drive. Säkerhetskopiera när du först konfigurerar appen, och igen varje gång du lägger till konton.',
      },
      {
        q: 'Kan jag använda wwwallet på fler än en enhet?',
        a: 'Ja, men den synkroniseras inte automatiskt – varje enhet har sitt eget lokala valv. För att använda wwwallet på en ny enhet återställer du den därifrån via Drive eller en filbackup och låser sedan upp den med din återställningsfras.',
      },
      {
        q: 'Vad händer om jag tappar bort min enhet och aldrig har gjort en säkerhetskopia?',
        a: 'Dina medel går inte att återställa. Det är avsiktligt: wwwallet har inget kontosystem och sparar ingen kopia av ditt valv någonstans, så ingen – inte ens vi – kan återställa det åt dig. Det är kompromissen för att nycklarna endast du har tillgång till.',
      },
      {
        q: 'Överförs passnycklar (Face ID/Touch ID) till en ny enhet?',
        a: 'Nej. En lösennyckel är knuten till den enhet där den skapades. Efter att du har återställt en säkerhetskopia på en ny enhet låser du upp den med din återställningsfras och kan sedan ställa in en ny lösennyckel där.',
      },
      {
        q: 'Är wwwallet öppen källkod?',
        a: 'Nej – källkoden är tillgänglig. Hela källkoden är offentlig på GitHub så att vem som helst kan läsa, granska och kontrollera den, men den är inte öppen källkod: koden är licensierad under PolyForm Strict License 1.0.0.',
      },
      {
        q: 'Vad får jag göra med koden?',
        a: 'Du får läsa och granska allt detta samt köra en oförändrad kopia för icke-kommersiella ändamål, såsom personliga studier, forskning och testning. Du får inte distribuera den, ändra den eller skapa härledda verk (inklusive förgreningar), eller använda den kommersiellt. Om du behöver göra något som licensen inte tillåter, kontakta upphovsrättsinnehavaren för en separat licens.',
      },
      {
        q: 'Är wwwallet säkert att använda? Finns det någon garanti?',
        a: 'wwwallet är icke-förvarande programvara som tillhandahålls ”i befintligt skick”, utan någon form av garanti. Det är endast du som kontrollerar dina nycklar och medel – ingen, inte ens vi, kan återställa en förlorad återställningsfras eller säkerhetskopia, återkalla en transaktion eller ersätta dig för förluster. Använd endast medel som du har råd att förlora, dubbelkolla adresser och nätverk innan du skickar, och ingenting här utgör finansiell, investerings-, juridisk eller skatterådgivning.',
      },
      {
        q: 'Vilka nätverk stöder wwwallet?',
        a: 'Ethereums mainnet samt Layer-2-nätverken Polygon, Arbitrum, Base och Optimism – alla från samma uppsättning konton.',
      },
      {
        q: 'Hur sätter jag in pengar på min plånbok?',
        a: 'Öppna ett konto, välj ”Visa QR-kod” för att se adressen och skicka medel till den adressen från en börs eller en annan plånbok. Se till att du skickar via rätt nätverk (Ethereum, Polygon, Arbitrum, Base eller Optimism) – samma adress fungerar på alla, men medel som skickas via ett nätverk visas endast på det nätverket. Du behöver också en liten mängd av nätverkets egna mynt (t.ex. ETH) för att betala transaktionsavgifterna.',
      },
      {
        q: 'Vad kan jag göra med wwwallet?',
        a: 'Skicka: överför ETH eller valfri token till en adress som du klistrar in, skannar från en QR-kod eller väljer från dina egna konton, och granska uppgifterna innan du bekräftar. Byt: byt en token mot en annan på samma nätverk från fliken ”Swap”, där pris och avgiftsuppskattning visas i förväg. Ta emot: visa din adress som en QR-kod. Du kan också se dina saldon i USD och din transaktionshistorik för alla nätverk som stöds.',
      },
      {
        q: 'Vad vet wwwallet om mig?',
        a: 'Inget som identifierar dig. Det finns inget konto, ingen inloggning och ingen databas. Saldo- och prisdata hämtas via wwwallet:s egen backend istället för att din webbläsare kontaktar tredjepartsleverantörer direkt, och den backenden ser aldrig dina nycklar, lösenord eller återställningsfras.',
      },
    ],
  },
  footer: {
    tagline: 'En kostnadsfri, icke-förvarande Ethereum-plånbok för alla.',
    copyright: '© {year} wwwallet',
    licenseLink: 'Licensierad under PolyForm Strict 1.0.0',
    disclaimer:
      'Programvara utan förvaring tillhandahålls ”i befintligt skick”, utan garanti. Detta är inte finansiell rådgivning. Du är ensam ansvarig för dina nycklar och dina medel.',
  },
  license: {
    title: 'Licens',
    close: 'Stäng',
    summaryTitle: 'På lättförståeligt engelska',
    canUse: 'Du kan använda wwwallet gratis, för personliga och andra icke-kommersiella ändamål.',
    canRead: 'Du kan läsa och granska varje rad i källkoden.',
    cannot: 'Du får inte kopiera, ändra, vidarebefordra eller sälja den.',
    englishNote:
      'Här följer den fullständiga licensen på originalspråket engelska – det är den juridiska texten.',
    viewSource: 'Visa källkod på GitHub',
  },
  principles: {
    eyebrow: 'Principer',
    heading: 'Gratis, öppen och utvecklad för alla',
    lede: 'Programvara som förvarar dina pengar bör vara ett verktyg som du använder, inte en verksamhet som bygger på sina användare. Dessa är de principer som wwwallet bygger på.',
    items: [
      {
        title: 'Gratis, utan några dolda villkor',
        body: 'Inga priser, inga premiumnivåer, inga betalfunktioner. wwwallet lägger inte på några egna avgifter – den enda kostnaden är nätverkets egen transaktionsavgift.',
      },
      {
        title: 'Inga annonser, ingen spårning',
        body: 'Inga annonser, ingen analys, inga spårningsskript och inga data säljs till någon. Det finns ingen profil på dig att sälja från början.',
      },
      {
        title: 'Ingen registrering',
        body: 'Ingen e-post, inget telefonnummer och ingen ID-kontroll. Öppna appen, skapa en plånbok – och du är redo.',
      },
      {
        title: 'Dina nycklar förblir hos dig',
        body: 'Nycklarna skapas och krypteras på din enhet och lämnar aldrig den. wwwallet kan inte se dem, flytta dina medel eller låsa ut dig.',
      },
      {
        title: 'Fungerar överallt',
        body: 'Fungerar i alla moderna webbläsare på mobil eller dator och installeras som en app – inget konto i någon appbutik behövs.',
      },
      {
        title: 'På 31 språk',
        body: 'Använd den på det språk du känner dig mest bekväm med, i ljust eller mörkt läge.',
      },
      {
        title: 'Öppen källkod',
        body: 'Hela källkoden är publicerad så att vem som helst kan läsa och granska den. Den är ”source-available” snarare än ”open source” – i FAQ:en förklaras vad licensen tillåter.',
      },
      {
        title: 'Inget att stänga av',
        body: 'Det finns inget konto som någon kan spärra. Dina medel finns på Ethereum självt, och nyckeln till vilket konto som helst kan när som helst flyttas till en annan plånbok.',
      },
    ],
  },
  meta: {
    title: 'wwwallet — Gratis, icke-förvarande Ethereum-plånbok',
    description:
      'Gratis Ethereum-plånbok i din webbläsare. Ingen registrering, inga annonser, ingen spårning – dina nycklar förblir krypterade på din enhet. Ethereum, Arbitrum, Base, Optimism och Polygon.',
  },
}
