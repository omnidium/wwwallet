export default {
  nav: {
    wallet: 'wwwallet',
    ethereum: 'Ethereum',
    crypto: 'Krypto',
    faqs: 'Ofte stilte spørsmål',
    launch: 'Lansering av wwwallet',
    home: 'Tilbake til toppen',
    sectionNavLabel: 'Navigasjon i seksjonene',
    principles: 'Prinsipper',
  },
  settings: {
    open: 'Innstillinger',
    close: 'Lukk innstillinger',
    theme: 'Tema',
    themeLight: 'Lett',
    themeDark: 'Mørk',
    language: 'Språk',
    search: 'Søk',
    noMatches: 'Ingen treff',
    version: 'Versjon {version}',
  },
  hero: {
    eyebrow: 'En gratis, ikke-depotbasert Ethereum-lommebok',
    heading1: 'Dine nøkler.',
    heading2: 'Enheten din.',
    heading3: 'Gratis for alle.',
    lede: 'wwwallet kjører i nettleseren din og oppbevarer nøklene dine kryptert på din egen enhet. Du trenger ikke opprette noen konto, det koster ingenting og det er ingen annonser, og det fungerer på samme måte for alle.',
    ctaPrimary: 'Lansering av wwwallet',
    ctaSecondary: 'Se hvordan det fungerer',
    note: 'Ingen registrering · Ingen annonser · Ingen sporing · 31 språk',
  },
  wallet: {
    eyebrow: 'wwwallet',
    heading: 'Laget slik at bare du kan åpne den',
    lede: 'wwwallet oppbevarer ikke midlene dine – den hjelper deg med å oppbevare dem selv. Her er hva det betyr i praksis.',
    points: [
      {
        title: 'Uten forvaring, alltid',
        body: 'Dine private nøkler genereres og krypteres på din egen enhet. wwwallet-serverne får aldri tilgang til dem – det finnes ingen database med nøkler som kan bli hacket, fordi det ikke finnes noen database i det hele tatt.',
      },
      {
        title: 'Kryptert med AES-256, låses opp på din måte',
        body: 'Hvelvet ditt er beskyttet med AES-256-GCM-kryptering. Lås det opp med gjenopprettingsfrasen din, eller aktiver en passnøkkel – Face ID, Touch ID eller Windows Hello – for rask, lokal tilgang.',
      },
      {
        title: 'Låser seg automatisk',
        body: 'wwwallet låses etter en kort periode uten aktivitet, og lagrer aldri din ulåste økt på disken – lukker du fanen, glemmer den det, med vilje.',
      },
      {
        title: 'Femten Ethereum-nettverk, ett sett med kontoer',
        body: 'Oppbevar og send på Ethereums hovednettverk og 14 andre nettverk – inkludert Arbitrum, Base, Optimism, Polygon, Linea og ZKsync – med de samme kontoene og adressene.',
      },
    ],
    caveatTitle:
      'Gjenopprettingsfrasen din låser opp hvelvet ditt – det er ikke en magisk sikkerhetskopi',
    caveatBody:
      'Lagre gjenopprettingsfrasen et trygt sted, men ta også en sikkerhetskopi på Google Drive eller i en fil. Du trenger sikkerhetskopien for å gjenopprette lommeboken på en ny enhet, og frasen for å låse den opp når du har gjort det.',
    caveatLink: 'Les mer i FAQ-ene',
  },
  ethereum: {
    eyebrow: 'Ethereum',
    heading: 'Hvorfor Ethereum',
    lede: 'wwwallet er spesielt utviklet for Ethereum. Her er begrunnelsen for det, i enkle ord.',
    points: [
      {
        title: 'En verdensdatamaskin, ikke bare en hovedbok',
        body: 'Ethereum tok Bitcoins idé om en delt, manipulasjonssikker hovedbok og utvidet den: en global, programmerbar datamaskin som alle kan bygge videre på, og som ingen enkeltpart kan slå av.',
      },
      {
        title: 'Sikret gjennom staking, ikke mining',
        body: 'Siden «The Merge» i 2022 har Ethereum vært sikret ved hjelp av Proof-of-Stake i stedet for energikrevende mining – validatorer setter ETH på spill som sikkerhet i stedet for å bruke strøm for å konkurrere om blokker.',
      },
      {
        title: 'Åpen og uten tillatelseskrav',
        body: 'Ingen godkjenner kontoen din. Hvem som helst, hvor som helst, kan eie ETH eller utvikle en applikasjon på Ethereum – de samme reglene gjelder for alle, inkludert de største institusjonene.',
      },
      {
        title: 'Standarden som andre nettverk bygger på',
        body: 'Layer-2-nettverk som Arbitrum, Base og Optimism – som alle støttes i wwwallet – utvider Ethereums sikkerhet til raskere og billigere transaksjoner i stedet for å starte helt fra bunnen av.',
      },
    ],
    linkLabel: 'Les mer på Ethereum Foundation',
    linkUrl: 'https://ethereum.org/en/foundation/',
  },
  crypto: {
    eyebrow: 'Krypto',
    heading: 'Kryptovaluta, forklart på en enkel måte',
    lede: 'Noen begreper det er verdt å forstå før du selv eier kryptovaluta – ikke bare med wwwallet.',
    points: [
      {
        title: 'Med forvaring vs. uten forvaring',
        body: 'En lommebok med forvaring eller en børs oppbevarer nøklene dine for deg – det er praktisk, men du må stole på at noen andre ikke fryser, mister eller misbruker midlene dine. En lommebok uten forvaring, som wwwallet, overlater nøklene – og ansvaret – utelukkende til deg.',
      },
      {
        title: 'Staking vs. mining',
        body: 'Proof-of-Work-mining sikrer en blokkjede med rå datakraft og strøm. Proof-of-Stake sikrer den i stedet med kapital som står på spill. Ethereums overgang til staking reduserte energiforbruket med mer enn 99,9 % — omtrent forskjellen mellom å forsyne et lite land og en liten by med strøm.',
      },
      {
        title: 'Utover Ethereum',
        body: 'Bitcoin prioriterer enkelhet og forutsigbarhet fremfor programmerbarhet. Kjeder som Solana satser på rå gjennomstrømning, og ofrer ofte desentralisering for å oppnå dette. Ethereum prioriterer desentralisering og sikkerhet først, og overlater hastighet og kostnader til Layer-2-nettverk bygget på toppen av det.',
      },
      {
        title: 'Ingen seriøse aktører ber om frasen din',
        body: 'Ingen børs, ingen kundestøtteagent og ingen fra wwwallet vil noensinne be om gjenopprettingsfrasen din – uansett hvilken app du bruker. Alle som gjør det, prøver å stjele fra deg.',
      },
    ],
    linkLabel: 'Gå dypere inn i temaet med Bankless-podcasten',
    linkUrl: 'https://www.bankless.com/',
  },
  faqs: {
    eyebrow: 'Ofte stilte spørsmål',
    heading: 'Vanlige spørsmål',
    items: [
      {
        q: 'Er wwwallet virkelig gratis?',
        a: 'Ja. Det koster ingenting å bruke den, det finnes ingen premium-nivå og ingenting bak en betalingsmur, og wwwallet legger ikke til noen avgift på noe du sender eller bytter. Den eneste uunngåelige kostnaden er nettverkets egen transaksjonsavgift (gas), som går til nettverket og ikke til wwwallet. Byttepriser kommer fra 0x-børsaggregatoren (eller LI.FI, på nettverk som 0x ikke dekker), som kan inkludere sitt eget gebyr på enkelte handler – slike gebyrer vises på bekreftelsesskjermen før du bekrefter.',
      },
      {
        q: 'Er det annonser, sporingsverktøy eller analyseverktøy?',
        a: 'Nei. wwwallet viser ingen annonser, kjører ingen analyse- eller sporingsskript og lager ingen profil av deg. Det finnes ingen konto, så det er ingenting å knytte den til.',
      },
      {
        q: 'Trenger jeg en konto eller ID for å bruke den?',
        a: 'Nei. Det er ingen registrering, e-postadresse, telefonnummer eller identitetskontroll – du oppretter en lommebok på enheten din og begynner å bruke den.',
      },
      {
        q: 'Hvis den er gratis, hvordan finansierer wwwallet seg selv?',
        a: 'Den tjener ikke penger på brukerne – ingen gebyrer, ingen annonser, ingen salg av data. Driftskostnadene holdes lave ved design: selve appen kjører i nettleseren din, og backenden videreformidler kun offentlige blockchain- og prisdata.',
      },
      {
        q: 'Kan noen fryse lommeboken min?',
        a: 'Det finnes ingen konto, så det er ingenting wwwallet – eller noen andre – kan fryse. Nøklene dine forlater aldri enheten din, og transaksjonene signeres der før de sendes til nettverket. Midlene dine ligger på Ethereum, ikke i wwwallet: du kan se den private nøkkelen eller gjenopprettingsfrasen til hvilken som helst konto fra menyen og importere den til hvilken som helst annen Ethereum-lommebokapp når du vil.',
      },
      {
        q: 'Er gjenopprettingsfrasen min nok til å få tilbake lommeboken min?',
        a: 'Ikke alene. Gjenopprettingsfrasen din låser opp det krypterte hvelvet ditt, men selve hvelvet finnes kun på enheten din. Hvis du mister eller sletter innholdet på den enheten uten å ha tatt en sikkerhetskopi, er det ingenting igjen som frasen kan låse opp. Kombiner alltid gjenopprettingsfrasen din med en sikkerhetskopi på Google Drive eller i en fil – se neste spørsmål.',
      },
      {
        q: 'Hvordan tar jeg sikkerhetskopi av lommeboken min?',
        a: 'Fra Innstillinger kan du sikkerhetskopiere det krypterte hvelvet ditt til din egen Google Drive eller som en fil du laster ned og oppbevarer selv. En Drive-sikkerhetskopi lagres i en privat app-mappe, og wwwallet har ikke tilgang til noe annet på Drive-kontoen din. Ta sikkerhetskopi når du konfigurerer appen for første gang, og igjen hver gang du legger til kontoer.',
      },
      {
        q: 'Kan jeg bruke wwwallet på mer enn én enhet?',
        a: 'Ja, men den synkroniseres ikke automatisk – hver enhet har sitt eget lokale hvelv. For å bruke wwwallet på en ny enhet, må du gjenopprette den der fra en Drive- eller filsikkerhetskopi, og deretter låse den opp med gjenopprettingsfrasen din.',
      },
      {
        q: 'Hva skjer hvis jeg mister enheten min og aldri har tatt sikkerhetskopi?',
        a: 'Midlene dine kan ikke gjenopprettes. Det er med vilje: wwwallet har ikke noe kontosystem og oppbevarer ingen kopi av hvelvet ditt noe sted, så ingen – inkludert oss – kan gjenopprette det for deg. Det er avveiningen for at ingen andre enn du har tilgang til nøklene.',
      },
      {
        q: 'Overføres passordnøkler (Face ID / Touch ID) til en ny enhet?',
        a: 'Nei. En passordnøkkel er knyttet til enheten den ble opprettet på. Etter å ha gjenopprettet en sikkerhetskopi på en ny enhet, låser du opp med gjenopprettingsfrasen din, og deretter kan du opprette en ny passordnøkkel der.',
      },
      {
        q: 'Er wwwallet åpen kildekode?',
        a: 'Nei – kildekoden er tilgjengelig. Den fullstendige kildekoden er offentlig på GitHub, slik at hvem som helst kan lese, gjennomgå og kontrollere den, men den er ikke åpen kildekode: koden er lisensiert under PolyForm Strict License 1.0.0.',
      },
      {
        q: 'Hva har jeg lov til å gjøre med koden?',
        a: 'Du kan lese og granske alt dette, og kjøre en uendret kopi til ikke-kommersielle formål, for eksempel personlig studium, forskning og testing. Du kan ikke distribuere den, endre den eller lage avledede verk (inkludert forks), eller bruke den kommersielt. Hvis du trenger noe som lisensen ikke tillater, må du kontakte opphavsrettsinnehaveren for å få en egen lisens.',
      },
      {
        q: 'Er wwwallet trygt å bruke? Er det noen garanti?',
        a: 'wwwallet er programvare uten forvaring som leveres «som den er», uten noen form for garanti. Du har alene kontroll over nøklene og midlene dine – ingen, inkludert oss, kan gjenopprette en tapt gjenopprettingsfrase eller sikkerhetskopi, reversere en transaksjon eller kompensere deg for tap. Bruk kun midler du har råd til å tape, dobbeltsjekk adresser og nettverk før du sender, og ingenting her utgjør finansiell, investerings-, juridisk eller skatterådgivning.',
      },
      {
        q: 'Hvilke nettverk støtter wwwallet?',
        a: 'Ethereum-mainnet, pluss Arbitrum, Base, Optimism, Polygon, Robinhood Chain, World Chain, Ink, Linea, Gnosis, Celo, ZKsync Era, Ronin, Unichain og Scroll – alt fra det samme settet med kontoer.',
      },
      {
        q: 'Hvordan setter jeg inn penger på lommeboken min?',
        a: 'Opprett en konto, velg «Vis QR-kode» for å se adressen, og send midler til den adressen fra en børs eller en annen lommebok. Sørg for at du sender på riktig nettverk (for eksempel Ethereum, Base eller Arbitrum) – den samme adressen fungerer på alle støttede nettverk, men midler som sendes på ett nettverk vises kun på det nettverket. Du bør også ha litt av nettverkets egen valuta (for eksempel ETH) for å betale transaksjonsgebyrer.',
      },
      {
        q: 'Hva kan jeg gjøre med wwwallet?',
        a: 'Send: overfør ETH eller et hvilket som helst token til en adresse du limer inn, skanner fra en QR-kode eller velger fra dine egne kontoer, og sjekk detaljene før du bekrefter. Bytte: bytt ett token mot et annet på samme nettverk fra «Swap»-fanen, med en pris og et gebyrestimat som vises på forhånd. Motta: vis adressen din som en QR-kode. Du kan også se saldoene dine i USD og transaksjonshistorikken din på tvers av alle støttede nettverk.',
      },
      {
        q: 'Hva vet wwwallet om meg?',
        a: 'Ingenting som identifiserer deg. Det finnes ingen konto, pålogging eller database. Saldo- og prisdata hentes via wwwallets egen backend i stedet for at nettleseren din kontakter tredjepartsleverandører direkte, og denne backenden ser aldri nøklene, passordene eller gjenopprettingsfrasen din.',
      },
    ],
  },
  footer: {
    tagline: 'En gratis, ikke-depotbasert Ethereum-lommebok for alle.',
    copyright: '© {year} wwwallet',
    licenseLink: 'Lisensiert under PolyForm Strict 1.0.0',
    disclaimer:
      'Ikke-depotbasert programvare leveres «som den er», uten garanti. Dette er ikke finansiell rådgivning. Du er alene ansvarlig for dine nøkler og midler.',
  },
  principles: {
    eyebrow: 'Prinsipper',
    heading: 'Gratis, åpen og laget for alle',
    lede: 'Programvare som oppbevarer pengene dine, bør være et verktøy du bruker, ikke en virksomhet som er bygget på brukerne sine. Dette er forpliktelsene som wwwallet er bygget rundt.',
    items: [
      {
        title: 'Gratis, uten noen hake',
        body: 'Ingen priser, ingen premium-nivåer, ingen betalte funksjoner. wwwallet legger ikke til egne gebyrer – den eneste kostnaden er nettverkets egne transaksjonsgebyrer.',
      },
      {
        title: 'Ingen annonser, ingen sporing',
        body: 'Ingen annonser, ingen analyseverktøy, ingen sporingsskript og ingen data som selges til noen. Det finnes jo ikke noe profil om deg å selge i utgangspunktet.',
      },
      {
        title: 'Ingen registrering',
        body: 'Ingen e-post, telefonnummer eller ID-sjekk. Åpne appen, opprett en lommebok, og du er klar.',
      },
      {
        title: 'Nøklene dine forblir hos deg',
        body: 'Nøklene opprettes og krypteres på enheten din og forlater aldri enheten. wwwallet kan ikke se dem, flytte midlene dine eller låse deg ute.',
      },
      {
        title: 'Fungerer overalt',
        body: 'Fungerer i alle moderne nettlesere på mobil eller PC, og installeres som en app – ingen appbutikk-konto er nødvendig.',
      },
      {
        title: 'På 31 språk',
        body: 'Bruk den på det språket du er mest komfortabel med, i lys eller mørk modus.',
      },
      {
        title: 'Kode i det åpne',
        body: 'Hele kildekoden er publisert slik at alle kan lese og granske den. Den er «source-available» snarere enn «open source» – FAQ-ene forklarer hva lisensen tillater.',
      },
      {
        title: 'Ingenting å slå av',
        body: 'Det finnes ingen konto som noen kan fryse. Midlene dine ligger på Ethereum selv, og nøkkelen til enhver konto kan når som helst flyttes til en annen lommebok.',
      },
    ],
  },
  license: {
    title: 'Lisens',
    close: 'Lukk',
    summaryTitle: 'På enkelt engelsk',
    canUse: 'Du kan bruke wwwallet gratis, til personlige og andre ikke-kommersielle formål.',
    canRead: 'Du kan lese og granske hver eneste linje i kildekoden.',
    cannot: 'Du kan ikke kopiere, endre, videreformidle eller selge den.',
    englishNote:
      'Den fullstendige lisensen følger nedenfor, på originalspråket engelsk – dette er den juridiske teksten.',
    viewSource: 'Vis kildekoden på GitHub',
  },
  meta: {
    title: 'wwwallet — Gratis, ikke-depotbasert Ethereum-lommebok',
    description:
      'Gratis Ethereum-lommebok i nettleseren din. Ingen registrering, ingen annonser, ingen sporing – nøklene dine forblir kryptert på enheten din. Ethereum, Base, Arbitrum, Optimism, Polygon og 10 andre nettverk.',
  },
}
