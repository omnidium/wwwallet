export default {
  nav: {
    wallet: 'Plånbok',
    ethereum: 'Ethereum',
    crypto: 'Krypto',
    faqs: 'Vanliga frågor',
    launch: 'Starta plånboken',
    home: 'Tillbaka till toppen',
    sectionNavLabel: 'Avsnittsnavigering',
    principles: 'Principer',
  },
  settings: {
    open: 'Inställningar',
    close: 'Stäng inställningarna',
    theme: 'Tema',
    themeLight: 'Ljus',
    themeDark: 'Mörkt',
    language: 'Språk',
    search: 'Sök',
    noMatches: 'Inga träffar',
  },
  hero: {
    eyebrow: 'En kostnadsfri Ethereum-plånbok utan förvaring',
    heading1: 'Dina nycklar.',
    heading2: 'Din enhet.',
    heading3: 'Gratis för alla.',
    lede: 'wwwallet körs i din webbläsare och lagrar dina nycklar krypterade på din egen enhet. Du behöver inte skapa något konto, det kostar ingenting och det finns inga annonser – bara en plånbok som fungerar på samma sätt för alla.',
    ctaPrimary: 'Starta plånboken',
    ctaSecondary: 'Se hur det fungerar',
    note: 'Ingen registrering · Inga annonser · Ingen spårning · 31 språk',
  },
  wallet: {
    eyebrow: 'Plånbok',
    heading: 'Konstruerad så att bara du kan öppna den',
    lede: 'wwwallet förvarar inte dina pengar – tjänsten hjälper dig att förvalta dem själv. Så här fungerar det i praktiken.',
    points: [
      {
        title: 'Utan förvaring, alltid',
        body: 'Dina privata nycklar genereras och krypteras på din egen enhet. wwwallet:s servrar får aldrig tillgång till dem – det finns ingen databas med plånböcker som kan hackas, eftersom det inte finns någon databas alls.',
      },
      {
        title: 'Krypterad med AES-256, lås upp på ditt sätt',
        body: 'Ditt valv skyddas med AES-256-GCM-kryptering. Lås upp det med din återställningsfras eller aktivera en inloggningsmetod – Face ID, Touch ID eller Windows Hello – för snabb åtkomst som endast sker lokalt.',
      },
      {
        title: 'Låser sig automatiskt',
        body: 'wwwallet låses efter en kort stunds inaktivitet och sparar aldrig din upplåsta session på hårddisken – stänger du fliken glömmer programmet den, helt medvetet.',
      },
      {
        title: 'En plånbok, fem Ethereum-nätverk',
        body: 'Förvara och skicka via Ethereums huvudnätverk, Polygon, Arbitrum, Base och Optimism från samma uppsättning konton.',
      },
    ],
    caveatTitle: 'Din återställningsfras låser upp ditt valv – det är ingen magisk säkerhetskopia',
    caveatBody:
      'Spara din återställningsfras på ett säkert ställe, men se också till att göra en säkerhetskopia på Google Drive eller i en fil. Du behöver säkerhetskopian för att återställa din plånbok på en ny enhet, och frasen för att låsa upp den när du väl har gjort det.',
    caveatLink: 'Läs mer i avsnittet med vanliga frågor',
  },
  ethereum: {
    eyebrow: 'Ethereum',
    heading: 'Varför Ethereum?',
    lede: 'wwwallet är specifikt utvecklat för Ethereum. Här är argumenten för det, i enkla ordalag.',
    points: [
      {
        title: 'En världsdator, inte bara en huvudbok',
        body: 'Ethereum tog Bitcoins idé om en gemensam, manipuleringssäker huvudbok och vidareutvecklade den: en global, programmerbar dator som vem som helst kan bygga vidare på och som ingen enskild aktör kan stänga av.',
      },
      {
        title: 'Säkerhet genom staking, inte mining',
        body: 'Sedan ”The Merge” år 2022 har Ethereum säkerställts genom Proof-of-Stake istället för energikrävande mining – validerare ställer ETH som säkerhet istället för att förbruka el för att tävla om block.',
      },
      {
        title: 'Öppet och utan behörighetskrav',
        body: 'Ingen godkänner ditt konto. Vem som helst, var som helst, kan inneha ETH eller utveckla en applikation på Ethereum – samma regler gäller för alla, även de största institutionerna.',
      },
      {
        title: 'Den standard som andra nätverk bygger på',
        body: 'Layer-2-nätverk som Arbitrum, Base och Optimism – som alla stöds av wwwallet – utökar Ethereums säkerhet till snabbare och billigare transaktioner istället för att börja från scratch.',
      },
    ],
    linkLabel: 'Läs mer på Ethereum Foundation',
    linkUrl: 'https://ethereum.org/en/foundation/',
  },
  crypto: {
    eyebrow: 'Krypto',
    heading: 'Kryptovalutor, enkelt förklarat',
    lede: 'Några begrepp som är bra att förstå innan du själv börjar äga kryptovaluta – inte bara med wwwallet.',
    points: [
      {
        title: 'Med förvaring kontra utan förvaring',
        body: 'En förvaringsplånbok eller en börs förvarar dina nycklar åt dig – det är bekvämt, men du måste lita på att någon annan inte spärrar, tappar bort eller missbrukar dina medel. En icke-förvaringsplånbok som wwwallet lägger nycklarna – och ansvaret – helt och hållet i dina händer.',
      },
      {
        title: 'Staking kontra mining',
        body: 'Proof-of-Work-mining säkerställer en blockkedja med ren datorkraft och el. Proof-of-Stake säkerställer den istället med kapital som står på spel. Ethereums övergång till staking minskade energiförbrukningen med mer än 99,9 % – ungefär skillnaden mellan att försörja ett litet land och en liten stad med el.',
      },
      {
        title: 'Bortom Ethereum',
        body: 'Bitcoin prioriterar enkelhet och förutsägbarhet framför programmerbarhet. Blockkedjor som Solana satsar på hög genomströmning, vilket ofta sker på bekostnad av decentraliseringen. Ethereum lägger störst vikt vid decentralisering och säkerhet, och överlåter hastighet och kostnad till Layer-2-nätverk som byggts ovanpå plattformen.',
      },
      {
        title: 'Ingen seriös aktör ber om din lösenfras',
        body: 'Oavsett vilken plånbok du använder: varken börsen, supporten eller någon anställd hos wwwallet kommer någonsin att be om din återställningsfras. Den som gör det försöker lura dig på dina pengar.',
      },
    ],
    linkLabel: 'Få mer insikt med Bankless-podcasten',
    linkUrl: 'https://www.bankless.com/',
  },
  faqs: {
    eyebrow: 'Vanliga frågor',
    heading: 'Vanliga frågor',
    items: [
      {
        q: 'Är wwwallet verkligen gratis?',
        a: 'Ja. Det kostar ingenting att använda tjänsten, det finns ingen premiumnivå och inget som kräver betalning, och wwwallet lägger inte på någon avgift på det du skickar eller byter. Den enda oundvikliga kostnaden är nätverkets egen transaktionsavgift (gasavgift), som går till nätverket och inte till wwwallet. Byteskurserna kommer från 0x-börsaggregatorn, som kan lägga på en egen avgift på vissa transaktioner – sådana avgifter visas på översiktsskärmen innan du bekräftar.',
      },
      {
        q: 'Finns det annonser, spårningsverktyg eller analysverktyg?',
        a: 'Nej. wwwallet visar inga annonser, använder inga analys- eller spårningsskript och skapar ingen profil av dig. Det finns inget konto, så det finns inget att koppla det till.',
      },
      {
        q: 'Behöver jag ett konto eller ett ID för att kunna använda det?',
        a: 'Nej. Det krävs ingen registrering, e-postadress, telefonnummer eller identitetskontroll – du skapar helt enkelt en plånbok på din enhet och börjar använda den.',
      },
      {
        q: 'Om det är gratis, hur finansierar sig då wwwallet?',
        a: 'Tjänsten tjänar inga pengar på sina användare – inga avgifter, inga annonser, ingen försäljning av data. Driftskostnaderna hålls låga genom själva utformningen: plånboken körs direkt i din webbläsare, och backend-systemet vidarebefordrar endast offentliga blockkedjedata och prisuppgifter.',
      },
      {
        q: 'Kan någon spärra mitt konto?',
        a: 'Det finns inget konto, så det finns inget som wwwallet – eller någon annan – kan spärra. Dina nycklar lämnar aldrig din enhet, och transaktionerna signeras där innan de skickas ut till nätverket. Dina medel finns på Ethereum, inte i wwwallet: du kan visa vilket kontos privata nyckel eller återställningsfras som helst från dess meny och importera den till en annan Ethereum-plånbok när du vill.',
      },
      {
        q: 'Räcker det med min återställningsfras för att få tillbaka min plånbok?',
        a: 'Inte på egen hand. Din återställningsfras låser upp ditt krypterade valv, men själva valvet finns endast på din enhet. Om du tappar bort eller raderar enheten utan att någonsin ha gjort en säkerhetskopia finns det inget kvar som frasen kan låsa upp. Se alltid till att komplettera din återställningsfras med en säkerhetskopia på Google Drive eller i en fil – se nästa fråga.',
      },
      {
        q: 'Hur säkerhetskopierar jag min plånbok?',
        a: 'Gå till Inställningar och säkerhetskopiera ditt krypterade valv till ditt eget Google Drive – där det sparas i en privat mapp som endast är tillgänglig för appen och som wwwallet inte har åtkomst till – eller som en fil som du laddar ner och sparar själv. Gör detta varje gång du konfigurerar en plånbok eller lägger till nya konton.',
      },
      {
        q: 'Kan jag använda wwwallet på fler än en enhet?',
        a: 'Ja, men det synkroniseras inte automatiskt – varje enhet har sitt eget lokala valv. För att använda wwwallet på en ny enhet måste du återställa det där från en säkerhetskopia på Drive eller i en fil, och sedan låsa upp det med din återställningsfras.',
      },
      {
        q: 'Vad händer om jag tappar bort min enhet och aldrig har gjort någon säkerhetskopia?',
        a: 'Dina medel går inte att återställa. Det är avsiktligt: wwwallet har inget kontosystem och sparar ingen kopia av ditt valv någonstans, så ingen – inte ens vi – kan återställa det åt dig. Det är priset man får betala för en plånbok som ingen annan än du själv har tillgång till.',
      },
      {
        q: 'Överförs passordnycklar (Face ID/Touch ID) till en ny enhet?',
        a: 'Nej. En lösenkod är knuten till den enhet där den skapades. När du har återställt en säkerhetskopia på en ny enhet låser du upp den med din återställningsfras och kan sedan ställa in en ny lösenkod där.',
      },
      {
        q: 'Är wwwallet öppen källkod?',
        a: 'Nej – källkoden är tillgänglig. Hela källkoden är offentlig på GitHub, så vem som helst kan läsa, granska och kontrollera den, men den är inte öppen källkod: koden är licensierad under PolyForm Strict License 1.0.0.',
      },
      {
        q: 'Vad får jag göra med koden?',
        a: 'Du får läsa och granska allt material samt använda en oförändrad kopia för icke-kommersiella ändamål, såsom personliga studier, forskning och testning. Du får inte distribuera det, ändra det eller skapa härledda verk (inklusive förgreningar), eller använda det kommersiellt. Om du behöver göra något som licensen inte tillåter, kontakta upphovsrättsinnehavaren för att få en separat licens.',
      },
      {
        q: 'Är det säkert att använda wwwallet? Finns det någon garanti?',
        a: 'wwwallet är en icke-förvaringsbaserad programvara som tillhandahålls ”i befintligt skick”, utan någon form av garanti. Det är endast du som har kontroll över dina nycklar och dina medel – ingen, inte ens vi, kan återställa en förlorad återställningsfras eller säkerhetskopia, återkalla en transaktion eller ersätta dig för förluster. Använd endast medel som du har råd att förlora, dubbelkolla adresser och nätverk innan du skickar, och ingenting här utgör finansiell, investerings-, juridisk eller skatterådgivning.',
      },
      {
        q: 'Vilka nätverk stöder wwwallet?',
        a: 'Ethereums huvudnätverk samt Layer-2-nätverken Polygon, Arbitrum, Base och Optimism – alla från samma uppsättning konton.',
      },
      {
        q: 'Hur sätter jag in pengar på min plånbok?',
        a: 'Öppna ett konto, välj ”Visa QR-kod” för att se adressen och skicka medel till den adressen från en börs eller en annan plånbok. Se till att du skickar via rätt nätverk (Ethereum, Polygon, Arbitrum, Base eller Optimism) – samma adress fungerar på alla nätverk, men medel som skickas via ett nätverk visas endast på det nätverket. Du behöver också en liten mängd av nätverkets egna mynt (t.ex. ETH) för att betala transaktionsavgifterna.',
      },
      {
        q: 'Vad kan jag göra med wwwallet?',
        a: 'Skicka: överför ETH eller valfri token till en adress som du klistrar in, skannar från en QR-kod eller väljer från dina egna konton, och granska uppgifterna innan du bekräftar. Byt: byt en token mot en annan på samma nätverk från fliken ”Swap”, där pris och avgiftsuppskattning visas i förväg. Ta emot: visa din adress som en QR-kod. Du kan också se dina saldon i USD och din transaktionshistorik för alla nätverk som stöds.',
      },
      {
        q: 'Vad vet wwwallet om mig?',
        a: 'Inget som kan identifiera dig. Det finns varken något konto, någon inloggning eller någon databas. Uppgifter om saldo och pris hämtas via wwwallet:s egen backend, istället för att din webbläsare ska kontakta tredjepartsleverantörer direkt, och den backenden får aldrig tillgång till dina nycklar, lösenord eller återställningsfras.',
      },
    ],
  },
  footer: {
    tagline: 'En kostnadsfri Ethereum-plånbok utan förvaring för alla.',
    copyright: '© {year} wwwallet',
    licenseLink: 'Licensierad enligt PolyForm Strict 1.0.0',
    disclaimer:
      'Programvara utan förvaring tillhandahålls ”i befintligt skick”, utan garanti. Detta utgör inte finansiell rådgivning. Du är ensam ansvarig för dina nycklar och dina medel.',
  },
  license: {
    title: 'Licens',
    close: 'Stäng',
    summaryTitle: 'På klarspråk',
    canUse:
      'Du kan använda wwwallet gratis, för personligt bruk och andra icke-kommersiella ändamål.',
    canRead: 'Du kan läsa och granska varje rad i källkoden.',
    cannot: 'Du får inte kopiera, ändra, sprida vidare eller sälja det.',
    englishNote:
      'Här följer licensavtalet i sin helhet, på originalspråket engelska – detta är den juridiskt bindande texten.',
    viewSource: 'Visa på GitHub',
  },
  principles: {
    eyebrow: 'Principer',
    heading: 'Gratis, öppet och utvecklat för alla',
    lede: 'En plånbok ska vara ett verktyg som du använder, inte en affärsmodell som bygger på sina användare. Det är dessa principer som wwwallet bygger på.',
    items: [
      {
        title: 'Gratis, utan några dolda villkor',
        body: 'Inget pris, ingen premiumnivå, inga betalfunktioner. wwwallet tar inte ut några egna avgifter – den enda kostnaden är nätverkets egen transaktionsavgift.',
      },
      {
        title: 'Inga annonser, ingen spårning',
        body: 'Inga annonser, inga analysverktyg, inga spårningsskript och inga uppgifter som säljs vidare till någon. Det finns ju ingen profil på dig att sälja från början.',
      },
      {
        title: 'Ingen registrering krävs',
        body: 'Ingen e-postadress, inget telefonnummer och ingen identitetskontroll. Öppna appen, skapa en plånbok – och du är redo.',
      },
      {
        title: 'Du behåller dina nycklar',
        body: 'Nycklarna skapas och krypteras på din enhet och lämnar aldrig den. wwwallet kan varken se dem, flytta dina medel eller spärra ditt konto.',
      },
      {
        title: 'Fungerar överallt',
        body: 'Fungerar i alla moderna webbläsare på både mobil och dator, och installeras precis som en app – inget konto i en appbutik krävs.',
      },
      {
        title: 'På 31 språk',
        body: 'Använd den på det språk du känner dig mest bekväm med, i ljust eller mörkt läge.',
      },
      {
        title: 'Öppen källkod',
        body: 'Hela källkoden är publicerad så att vem som helst kan läsa och granska den. Det är ”source-available” snarare än ”open source” – i FAQ:en förklaras vad licensen tillåter.',
      },
      {
        title: 'Inget att stänga av',
        body: 'Det finns inga konton som kan frysas. Dina medel förvaras direkt på Ethereum-nätverket, och nyckeln till vilket konto som helst kan när som helst överföras till en annan plånbok.',
      },
    ],
  },
}
