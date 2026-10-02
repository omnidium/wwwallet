export default {
  nav: {
    wallet: 'Lommebok',
    ethereum: 'Ethereum',
    crypto: 'Krypto',
    faqs: 'Ofte stilte spørsmål',
    launch: 'Start Wallet',
    home: 'Tilbake til toppen',
    sectionNavLabel: 'Navigasjon i seksjonene',
    principles: 'Prinsipper',
  },
  settings: {
    open: 'Innstillinger',
    close: 'Lukk innstillingene',
    theme: 'Tema',
    themeLight: 'Lys',
    themeDark: 'Mørkt',
    language: 'Språk',
    search: 'Søk',
    noMatches: 'Ingen treff',
  },
  hero: {
    eyebrow: 'En gratis Ethereum-lommebok uten forvaring',
    heading1: 'Nøklene dine.',
    heading2: 'Enheten din.',
    heading3: 'Gratis for alle.',
    lede: 'wwwallet kjører i nettleseren din og lagrer nøklene dine kryptert på din egen enhet. Du trenger ikke opprette noen konto, det koster ingenting og det er ingen annonser – bare en lommebok som fungerer på samme måte for alle.',
    ctaPrimary: 'Start Wallet',
    ctaSecondary: 'Se hvordan det fungerer',
    note: 'Ingen registrering · Ingen annonser · Ingen sporing · 31 språk',
  },
  wallet: {
    eyebrow: 'Lommebok',
    heading: 'Laget slik at bare du kan åpne den',
    lede: 'wwwallet oppbevarer ikke pengene dine – det hjelper deg med å oppbevare dem selv. Her er hva det betyr i praksis.',
    points: [
      {
        title: 'Uten forvaring, alltid',
        body: 'Dine private nøkler genereres og krypteres på din egen enhet. wwwallet-serverne får aldri tilgang til dem – det finnes ingen database med lommebøker som kan bli hacket, fordi det ikke finnes noen database i det hele tatt.',
      },
      {
        title: 'Kryptert med AES-256, låses opp slik du ønsker',
        body: 'Hvelvet ditt er beskyttet med AES-256-GCM-kryptering. Lås det opp med gjenopprettingsfrasen din, eller aktiver en passnøkkel – Face ID, Touch ID eller Windows Hello – for rask tilgang som kun skjer lokalt.',
      },
      {
        title: 'Låses automatisk',
        body: 'wwwallet låses etter en kort periode uten aktivitet, og lagrer aldri din ulåste økt på disken — lukker du fanen, glemmer den det med vilje.',
      },
      {
        title: 'Én lommebok, fem Ethereum-nettverk',
        body: 'Oppbevar og send via Ethereums hovednett, Polygon, Arbitrum, Base og Optimism fra det samme settet med kontoer.',
      },
    ],
    caveatTitle:
      'Gjenopprettingsfrasen din låser opp hvelvet ditt — det er ikke en magisk sikkerhetskopi',
    caveatBody:
      'Oppbevar gjenopprettingsfrasen på et trygt sted, men ta også en sikkerhetskopi på Google Drive eller i en fil. Du trenger sikkerhetskopien for å gjenopprette lommeboken din på en ny enhet, og frasen for å låse den opp når du har gjort det.',
    caveatLink: 'Les mer i FAQ-delen',
  },
  ethereum: {
    eyebrow: 'Ethereum',
    heading: 'Hvorfor Ethereum?',
    lede: 'wwwallet er spesielt utviklet for Ethereum. Her er begrunnelsen for dette, forklart på en enkel måte.',
    points: [
      {
        title: 'En verdensomspennende datamaskin, ikke bare en hovedbok',
        body: 'Ethereum tok utgangspunkt i Bitcoins idé om en felles, forfalskningssikker hovedbok og utvidet den: en global, programmerbar datamaskin som alle kan bygge videre på, og som ingen enkelt aktør kan slå av.',
      },
      {
        title: 'Sikret gjennom staking, ikke mining',
        body: 'Siden «The Merge» i 2022 har Ethereum vært sikret ved hjelp av Proof-of-Stake i stedet for energikrevende mining – validatorene stiller ETH som sikkerhet i stedet for å bruke strøm på å konkurrere om blokker.',
      },
      {
        title: 'Åpent og uten tillatelseskrav',
        body: 'Ingen godkjenner kontoen din. Hvem som helst, uansett hvor man befinner seg, kan eie ETH eller utvikle en applikasjon på Ethereum – de samme reglene gjelder for alle, også de største institusjonene.',
      },
      {
        title: 'Standarden som andre nettverk bygger på',
        body: 'Layer-2-nettverk som Arbitrum, Base og Optimism – som alle støttes av wwwallet – utvider Ethereums sikkerhet til raskere og billigere transaksjoner, i stedet for å starte helt fra bunnen av.',
      },
    ],
    linkLabel: 'Les mer på Ethereum Foundation',
    linkUrl: 'https://ethereum.org/en/foundation/',
  },
  crypto: {
    eyebrow: 'Krypto',
    heading: 'Kryptovaluta, forklart på en enkel måte',
    lede: 'Noen begreper det er lurt å sette seg inn i før du selv begynner å eie kryptovaluta — ikke bare med wwwallet.',
    points: [
      {
        title: 'Med foreldreomsorg vs. uten foreldreomsorg',
        body: 'En lommebok med depot eller en børs oppbevarer nøklene dine for deg — det er praktisk, men du må stole på at noen andre ikke fryser, mister eller misbruker midlene dine. En lommebok uten depot, som wwwallet, gir deg alene kontrollen over nøklene og ansvaret.',
      },
      {
        title: 'Staking kontra mining',
        body: 'Proof-of-Work-mining sikrer en blokkjede ved hjelp av rå datakraft og strøm. Proof-of-Stake sikrer den derimot ved hjelp av kapital som står på spill. Ethereums overgang til staking reduserte energiforbruket med over 99,9 % — omtrent forskjellen mellom å forsyne et lite land og en liten by med strøm.',
      },
      {
        title: 'Utover Ethereum',
        body: 'Bitcoin prioriterer enkelhet og forutsigbarhet fremfor programmerbarhet. Kjedene som Solana satser på høy gjennomstrømning, og ofrer ofte desentralisering for å oppnå dette. Ethereum legger først og fremst vekt på desentralisering og sikkerhet, og overlater hastighet og kostnader til Layer-2-nettverk som er bygget på toppen av det.',
      },
      {
        title: 'Ingen som er seriøs, vil be om passordet ditt',
        body: 'Uansett hvilken lommebok du bruker: verken børsen, kundestøtten eller noen ansatt hos wwwallet vil noensinne be om gjenopprettingsfrasen din. Den som gjør det, prøver å stjele fra deg.',
      },
    ],
    linkLabel: 'Få mer innsikt med Bankless-podcasten',
    linkUrl: 'https://www.bankless.com/',
  },
  faqs: {
    eyebrow: 'Ofte stilte spørsmål',
    heading: 'Vanlige spørsmål',
    items: [
      {
        q: 'Er wwwallet virkelig gratis?',
        a: 'Ja. Det koster ingenting å bruke tjenesten, det finnes ingen premium-nivåer og ingenting er skjult bak en betalingsmur, og wwwallet legger ikke til noen gebyrer på det du sender eller bytter. Den eneste uunngåelige kostnaden er nettverkets egne transaksjonsgebyrer (gas), som går til nettverket og ikke til wwwallet. Byttepriser kommer fra 0x-børsaggregatoren, som kan legge til sitt eget gebyr på enkelte handler – slike gebyrer vises på bekreftelsesskjermen før du bekrefter.',
      },
      {
        q: 'Er det annonser, sporingsverktøy eller analyseverktøy?',
        a: 'Nei. wwwallet viser ingen annonser, kjører ingen analyse- eller sporingsskript og lager ingen profil av deg. Det finnes ingen konto, så det er ingenting å knytte den til.',
      },
      {
        q: 'Trenger jeg en konto eller ID for å bruke den?',
        a: 'Nei. Det kreves verken registrering, e-postadresse, telefonnummer eller identitetskontroll – du oppretter en lommebok på enheten din og begynner å bruke den.',
      },
      {
        q: 'Hvis det er gratis, hvordan finansierer wwwallet seg da?',
        a: 'Den tjener ikke penger på brukerne – ingen avgifter, ingen annonser, ingen salg av data. Driftskostnadene holdes lave ved at lommeboken kjører direkte i nettleseren din, og backend-systemet bare videreformidler offentlige blockchain- og kursdata.',
      },
      {
        q: 'Kan noen fryse lommeboken min?',
        a: 'Det finnes ingen konto, så det er ingenting som wwwallet – eller noen andre – kan fryse. Nøklene dine forlater aldri enheten din, og transaksjonene signeres der før de sendes til nettverket. Midlene dine ligger på Ethereum, ikke i wwwallet: du kan se den private nøkkelen eller gjenopprettingsfrasen til hvilken som helst konto fra menyen og importere den til en annen Ethereum-lommebok når du vil.',
      },
      {
        q: 'Er gjenopprettingsfrasen min nok til å få tilbake lommeboken min?',
        a: 'Ikke i seg selv. Gjenopprettingsfrasen din låser opp det krypterte hvelvet ditt, men selve hvelvet finnes kun på enheten din. Hvis du mister eller sletter innholdet på enheten uten å ha tatt en sikkerhetskopi, er det ingenting igjen som frasen kan låse opp. Sørg alltid for å kombinere gjenopprettingsfrasen med en sikkerhetskopi på Google Drive eller en filkopi – se neste spørsmål.',
      },
      {
        q: 'Hvordan tar jeg sikkerhetskopi av lommeboken min?',
        a: 'Gå til «Innstillinger» og ta sikkerhetskopi av det krypterte hvelvet ditt til din egen Google Drive – lagret i en privat mappe som kun er tilgjengelig for appen, og som wwwallet ikke har tilgang til – eller som en fil du laster ned og oppbevarer selv. Gjør dette hver gang du oppretter en lommebok eller legger til nye kontoer.',
      },
      {
        q: 'Kan jeg bruke wwwallet på flere enheter?',
        a: 'Ja, men den synkroniseres ikke automatisk — hver enhet har sitt eget lokale hvelv. For å bruke wwwallet på en ny enhet må du gjenopprette den der fra en sikkerhetskopi på Drive eller fra en fil, og deretter låse den opp med gjenopprettingsfrasen din.',
      },
      {
        q: 'Hva skjer hvis jeg mister enheten min og aldri har tatt sikkerhetskopi?',
        a: 'Pengene dine kan ikke gjenopprettes. Dette er helt bevisst: wwwallet har ikke noe kontosystem og lagrer ingen kopi av hvelvet ditt noe sted, så ingen – ikke engang vi – kan gjenopprette det for deg. Det er prisen du må betale for å ha en lommebok som ingen andre enn deg har tilgang til.',
      },
      {
        q: 'Overføres passordnøkler (Face ID / Touch ID) til en ny enhet?',
        a: 'Nei. En passnøkkel er knyttet til enheten den ble opprettet på. Etter at du har gjenopprettet en sikkerhetskopi på en ny enhet, må du låse den opp med gjenopprettingsfrasen din, og deretter kan du opprette en ny passnøkkel på den.',
      },
      {
        q: 'Er wwwallet åpen kildekode?',
        a: 'Nei — kildekoden er tilgjengelig. Hele kildekoden er offentliggjort på GitHub, slik at alle kan lese, gjennomgå og kontrollere den, men den er ikke åpen kildekode: koden er lisensiert under PolyForm Strict License 1.0.0.',
      },
      {
        q: 'Hva har jeg lov til å gjøre med koden?',
        a: 'Du kan lese og gjennomgå alt innholdet, og bruke en uendret kopi til ikke-kommersielle formål, for eksempel personlig studium, forskning og testing. Du kan ikke distribuere det, endre det eller lage avledede verk (inkludert forker), eller bruke det kommersielt. Hvis du trenger noe som lisensen ikke tillater, må du kontakte opphavsrettsinnehaveren for å få en egen lisens.',
      },
      {
        q: 'Er wwwallet trygt å bruke? Er det noen garanti?',
        a: 'wwwallet er programvare uten forvaring som leveres «som den er», uten noen form for garanti. Du har selv full kontroll over nøklene og midlene dine – ingen, inkludert oss, kan gjenopprette en tapt gjenopprettingsfrase eller sikkerhetskopi, reversere en transaksjon eller kompensere deg for tap. Bruk kun midler du har råd til å tape, dobbeltsjekk adresser og nettverk før du sender, og ingenting her utgjør finansiell, investeringsmessig, juridisk eller skattemessig rådgivning.',
      },
      {
        q: 'Hvilke nettverk støtter wwwallet?',
        a: 'Ethereums hovednettverk, samt Layer-2-nettverkene Polygon, Arbitrum, Base og Optimism – alt fra det samme settet med kontoer.',
      },
      {
        q: 'Hvordan setter jeg inn penger på lommeboken min?',
        a: 'Opprett en konto, velg «Vis QR-kode» for å se adressen, og send midler til denne adressen fra en børs eller en annen lommebok. Sørg for at du sender på riktig nettverk (Ethereum, Polygon, Arbitrum, Base eller Optimism) – den samme adressen fungerer på alle, men midler som sendes på ett nettverk vises kun på det nettverket. Du vil også trenge litt av nettverkets egen valuta (for eksempel ETH) for å betale transaksjonsgebyrene.',
      },
      {
        q: 'Hva kan jeg gjøre med wwwallet?',
        a: 'Send: Overfør ETH eller et hvilket som helst token til en adresse du limer inn, skanner fra en QR-kode eller velger fra dine egne kontoer, og sjekk detaljene før du bekrefter. Bytte: Bytt ett token mot et annet på samme nettverk fra «Bytte»-fanen, der kurs og estimerte gebyrer vises på forhånd. Motta: Vis adressen din som en QR-kode. Du kan også se saldoene dine i USD og transaksjonshistorikken din på tvers av alle støttede nettverk.',
      },
      {
        q: 'Hva vet wwwallet om meg?',
        a: 'Ingenting som kan identifisere deg. Det finnes ingen konto, ingen pålogging og ingen database. Saldo- og prisdata hentes via wwwallet sin egen backend, i stedet for at nettleseren din kontakter tredjepartsleverandører direkte, og denne backenden får aldri tilgang til nøklene dine, passordene dine eller gjenopprettingsfrasen din.',
      },
    ],
  },
  footer: {
    tagline: 'En gratis Ethereum-lommebok uten forvaring for alle.',
    copyright: '© {year} wwwallet',
    licenseLink: 'Lisensiert under PolyForm Strict 1.0.0',
    disclaimer:
      'Programvare uten oppbevaringstilbud leveres «som den er», uten garanti. Dette er ikke økonomisk rådgivning. Du har selv det fulle ansvaret for nøklene og midlene dine.',
  },
  principles: {
    eyebrow: 'Prinsipper',
    heading: 'Gratis, åpent og laget for alle',
    lede: 'En lommebok skal være et verktøy du bruker, ikke en virksomhet som bygger på brukerne sine. Dette er de prinsippene wwwallet bygger på.',
    items: [
      {
        title: 'Gratis, uten noen hake',
        body: 'Ingen pris, ingen premium-nivå, ingen betalte funksjoner. wwwallet legger ikke til egne gebyrer – den eneste kostnaden er nettverkets eget transaksjonsgebyr.',
      },
      {
        title: 'Ingen annonser, ingen sporing',
        body: 'Ingen annonser, ingen analyseverktøy, ingen sporingsskript og ingen data som selges til noen. Det finnes jo ikke engang noen profil av deg å selge.',
      },
      {
        title: 'Ingen registrering',
        body: 'Ingen e-postadresse, telefonnummer eller ID-sjekk. Bare åpne appen, opprett en lommebok, så er du klar.',
      },
      {
        title: 'Nøklene dine forblir hos deg',
        body: 'Nøklene opprettes og krypteres på enheten din og forlater aldri enheten. wwwallet har ikke tilgang til dem, kan ikke flytte midlene dine eller sperre deg ute.',
      },
      {
        title: 'Fungerer overalt',
        body: 'Fungerer i alle moderne nettlesere på mobil eller PC, og installeres som en app – uten at du trenger en konto i en appbutikk.',
      },
      {
        title: 'På 31 språk',
        body: 'Bruk den på det språket du føler deg mest komfortabel med, i lys eller mørk modus.',
      },
      {
        title: 'Åpen kildekode',
        body: 'Hele kildekoden er publisert slik at alle kan lese og kontrollere den. Den er «source-available» snarere enn «open source» – i FAQ-delen forklares det hva lisensen tillater.',
      },
      {
        title: 'Ingenting å slå av',
        body: 'Det finnes ingen konto som kan bli fryst. Midlene dine ligger på selve Ethereum, og nøkkelen til enhver konto kan når som helst overføres til en annen lommebok.',
      },
    ],
  },
  license: {
    title: 'Lisens',
    close: 'Lukk',
    summaryTitle: 'På vanlig engelsk',
    canUse: 'Du kan bruke wwwallet gratis, til personlige og andre ikke-kommersielle formål.',
    canRead: 'Du kan lese og gjennomgå hver eneste linje i kildekoden.',
    cannot: 'Du må ikke kopiere, endre, videreformidle eller selge det.',
    englishNote:
      'Her følger den fullstendige lisensen på originalspråket engelsk – dette er den juridiske teksten.',
    viewSource: 'Se på GitHub',
  },
}
