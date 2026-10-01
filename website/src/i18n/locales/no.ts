export default {
  nav: {
    wallet: 'Lommebok',
    ethereum: 'Ethereum',
    crypto: 'Krypto',
    faqs: 'Ofte stilte spørsmål',
    launch: 'Start Wallet',
    home: 'Tilbake til toppen',
    sectionNavLabel: 'Navigasjon i seksjonene',
  },
  settings: {
    open: 'Innstillinger',
    close: 'Lukk innstillingene',
    theme: 'Tema',
    themeLight: 'Lys',
    themeDark: 'Mørkt',
    language: 'Språk',
  },
  hero: {
    eyebrow: 'En personlig Ethereum-lommebok uten forvaring',
    heading1: 'Nøklene dine.',
    heading2: 'Enheten din.',
    heading3: 'Lommeboken din.',
    lede: 'wwwallet krypterer lommeboken din på din egen enhet og sender aldri nøklene, passordene eller gjenopprettingsfrasen din til noen andre. Du trenger ikke opprette noen konto. Det er ingen server som kan hackes. Bare du og kryptovalutaen din.',
    ctaPrimary: 'Start Wallet',
    ctaSecondary: 'Se hvordan det fungerer',
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
        q: 'Er gjenopprettingsfrasen min nok til å få tilbake lommeboken min?',
        a: 'Ikke i seg selv. Gjenopprettingsfrasen din låser opp det krypterte hvelvet ditt, men selve hvelvet finnes kun på enheten din. Hvis du mister eller sletter innholdet på enheten uten å ha tatt en sikkerhetskopi, er det ingenting igjen som frasen kan låse opp. Sørg alltid for å kombinere gjenopprettingsfrasen med en sikkerhetskopi på Google Drive eller en filkopi – se neste spørsmål.',
      },
      {
        q: 'Hvordan tar jeg sikkerhetskopi av lommeboken min?',
        a: 'Gå til «Innstillinger» og ta sikkerhetskopi av det krypterte hvelvet ditt til din egen Google Drive – lagret i en privat mappe som kun er tilgjengelig for appen, og som wwwallet ikke har tilgang til – eller som en fil du laster ned og oppbevarer selv. Gjør dette hver gang du oppretter en lommebok eller legger til nye kontoer.',
      },
      {
        q: 'Kan jeg bruke wwwallet på flere enheter?',
        a: 'Ja, men den synkroniseres ikke automatisk — hver enhet har sitt eget lokale hvelv. For å bruke wwwallet på en ny enhet må du gjenopprette den der fra en sikkerhetskopi på Drive eller i en fil, og deretter låse den opp med gjenopprettingsfrasen din.',
      },
      {
        q: 'Hva skjer hvis jeg mister enheten min og aldri har tatt sikkerhetskopi?',
        a: 'Pengene dine kan ikke gjenopprettes. Dette er med vilje: wwwallet har ikke noe kontosystem og oppbevarer ingen kopi av hvelvet ditt noe sted, så ingen – heller ikke vi – kan gjenopprette det for deg. Det er prisen du må betale for å ha en lommebok som ingen andre enn du selv har tilgang til.',
      },
      {
        q: 'Overføres passordnøkler (Face ID / Touch ID) til en ny enhet?',
        a: 'Nei. En passnøkkel er knyttet til enheten den ble opprettet på. Etter at du har gjenopprettet en sikkerhetskopi på en ny enhet, må du låse den opp med gjenopprettingsfrasen din, og deretter kan du opprette en ny passnøkkel på den.',
      },
      {
        q: 'Er wwwallet åpen kildekode?',
        a: 'Kildekoden er offentlig tilgjengelig på GitHub, så alle kan lese den. Den er foreløpig ikke utgitt under en åpen kildekode-lisens, så betrakt den foreløpig som offentlig til gjennomgang snarere enn som åpen kildekode.',
      },
      {
        q: 'Hvilke nettverk støtter wwwallet?',
        a: 'Ethereums hovednettverk, samt Layer-2-nettverkene Polygon, Arbitrum, Base og Optimism – alt fra det samme settet med kontoer.',
      },
      {
        q: 'Hva vet wwwallet om meg?',
        a: 'Ingenting som kan identifisere deg. Det finnes ingen konto, ingen pålogging og ingen database. Saldo- og kursdata hentes via wwwallet sin egen backend, i stedet for at nettleseren din kontakter tredjepartsleverandører direkte, og denne backenden får aldri tilgang til nøklene dine, passordene dine eller gjenopprettingsfrasen din.',
      },
    ],
  },
  footer: {
    tagline: 'En personlig Ethereum-lommebok uten forvaring.',
    sourceLink: 'Se kildekoden på GitHub',
    copyright: '© {year} wwwallet',
  },
}
