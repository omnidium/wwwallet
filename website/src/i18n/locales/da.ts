export default {
  nav: {
    wallet: 'Pung',
    ethereum: 'Ethereum',
    crypto: 'Krypto',
    faqs: 'Ofte stillede spørgsmål',
    launch: 'Start Wallet',
    home: 'Tilbage til toppen',
    sectionNavLabel: 'Navigation i afsnittene',
  },
  settings: {
    open: 'Indstillinger',
    close: 'Luk indstillinger',
    theme: 'Tema',
    themeLight: 'Lys',
    themeDark: 'Mørkt',
    language: 'Sprog',
  },
  hero: {
    eyebrow: 'En personlig Ethereum-tegnebog uden opbevaring',
    heading1: 'Dine nøgler.',
    heading2: 'Din enhed.',
    heading3: 'Din tegnebog.',
    lede: 'wwwallet krypterer din wallet på din egen enhed og sender aldrig dine nøgler, adgangskoder eller gendannelsesfrasen til andre steder. Du behøver ikke oprette en konto. Der er ingen server, der kan hackes. Det er bare dig og dine kryptovalutaer.',
    ctaPrimary: 'Start Wallet',
    ctaSecondary: 'Se, hvordan det fungerer',
  },
  wallet: {
    eyebrow: 'Pung',
    heading: 'Konstrueret, så kun du kan åbne den',
    lede: 'wwwallet opbevarer ikke dine penge — det hjælper dig med selv at opbevare dem. Her er, hvad det betyder i praksis.',
    points: [
      {
        title: 'Uden opbevaring, altid',
        body: 'Dine private nøgler genereres og krypteres på din egen enhed. wwwallet’s servere får aldrig adgang til dem — der er ingen database med tegnebøger, der kan hackes, fordi der slet ikke findes nogen database.',
      },
      {
        title: 'Krypteret med AES-256 – låses op på din måde',
        body: 'Din boks er beskyttet med AES-256-GCM-kryptering. Lås den op med din gendannelsesfrase, eller aktiver en adgangsnøgle – Face ID, Touch ID eller Windows Hello – for at få hurtig adgang, der kun fungerer lokalt.',
      },
      {
        title: 'Låser sig selv automatisk',
        body: 'wwwallet låser sig efter en kort periode uden aktivitet og gemmer aldrig din ulåste session på disken — lukker du fanen, glemmer den det helt bevidst.',
      },
      {
        title: 'Én tegnebog, fem Ethereum-netværk',
        body: 'Opbevar og send via Ethereums mainnet, Polygon, Arbitrum, Base og Optimism fra det samme sæt konti.',
      },
    ],
    caveatTitle: 'Din gendannelsesfrase låser din boks op — det er ikke en magisk sikkerhedskopi',
    caveatBody:
      'Gem din gendannelsesfrase et sikkert sted, men sørg også for at lave en sikkerhedskopi på Google Drive eller i en fil. Du får brug for sikkerhedskopien til at gendanne din tegnebog på en ny enhed, og frasen til at låse den op, når du har gjort det.',
    caveatLink: 'Læs mere i FAQ’en',
  },
  ethereum: {
    eyebrow: 'Ethereum',
    heading: 'Hvorfor Ethereum?',
    lede: 'wwwallet er specifikt udviklet med udgangspunkt i Ethereum. Her er begrundelsen for det, forklaret på en enkel måde.',
    points: [
      {
        title: 'En verdensomspændende computer, ikke blot et regnskab',
        body: 'Ethereum tog Bitcoins idé om en fælles, manipulationssikker hovedbog og udvidede den: en global, programmerbar computer, som alle kan bygge videre på, og som ingen enkelt part kan slukke for.',
      },
      {
        title: 'Sikret gennem staking, ikke mining',
        body: 'Siden »The Merge« i 2022 er Ethereum blevet sikret ved hjælp af Proof-of-Stake i stedet for energikrævende minedrift — validatorerne stiller ETH som sikkerhed i stedet for at forbruge elektricitet for at konkurrere om blokke.',
      },
      {
        title: 'Åben og uden tilladelseskrav',
        body: 'Der er ingen, der godkender din konto. Hvem som helst, hvor som helst, kan eje ETH eller udvikle en applikation på Ethereum — de samme regler gælder for alle, også de største institutioner.',
      },
      {
        title: 'Den standard, som andre netværk bygger på',
        body: 'Layer-2-netværk som Arbitrum, Base og Optimism — som alle understøttes i wwwallet — udvider Ethereums sikkerhed til hurtigere og billigere transaktioner, i stedet for at man skal starte helt forfra.',
      },
    ],
    linkLabel: 'Læs mere på Ethereum Foundation',
    linkUrl: 'https://ethereum.org/en/foundation/',
  },
  crypto: {
    eyebrow: 'Krypto',
    heading: 'Krypto, forklaret på en enkel måde',
    lede: 'Et par begreber, det er værd at forstå, før du selv begynder at eje kryptovaluta — ikke kun med wwwallet.',
    points: [
      {
        title: 'Med forældremyndighed kontra uden forældremyndighed',
        body: 'En wallet med opbevaring eller en børs opbevarer dine nøgler for dig — det er praktisk, men du stoler på, at en anden ikke fryser dine midler inde, mister dem eller misbruger dem. En wallet uden opbevaring som wwwallet lægger nøglerne – og ansvaret – udelukkende i dine hænder.',
      },
      {
        title: 'Staking kontra mining',
        body: 'Proof-of-Work-mining sikrer en blockchain ved hjælp af rå regnekraft og elektricitet. Proof-of-Stake sikrer den i stedet ved hjælp af kapital, der er sat på spil. Ethereums overgang til staking har reduceret energiforbruget med mere end 99,9 % — hvilket svarer til forskellen mellem at forsyne et lille land og en lille by med strøm.',
      },
      {
        title: 'Ud over Ethereum',
        body: 'Bitcoin prioriterer enkelhed og forudsigelighed frem for programmerbarhed. Blockchains som Solana satser på høj gennemstrømning og går ofte på kompromis med decentraliseringen for at nå dette mål. Ethereum lægger først og fremmest vægt på decentralisering og sikkerhed og overlader hastighed og omkostninger til Layer-2-netværk, der er bygget oven på platformen.',
      },
      {
        title: 'Ingen seriøs person beder om din adgangskode',
        body: 'Uanset hvilken tegnebog du bruger: Hverken en børs, en kundeservicemedarbejder eller en medarbejder hos wwwallet vil nogensinde bede om din gendannelsesfrase. Enhver, der gør det, forsøger at stjæle fra dig.',
      },
    ],
    linkLabel: 'Få mere indsigt med Bankless-podcasten',
    linkUrl: 'https://www.bankless.com/',
  },
  faqs: {
    eyebrow: 'Ofte stillede spørgsmål',
    heading: 'Ofte stillede spørgsmål',
    items: [
      {
        q: 'Er min gendannelseskode nok til, at jeg kan få min tegnebog tilbage?',
        a: 'Ikke i sig selv. Din gendannelsesfrase låser din krypterede boks op, men selve boksen findes kun på din enhed. Hvis du mister eller sletter indholdet på den pågældende enhed uden nogensinde at have taget en sikkerhedskopi, er der intet tilbage, som frasen kan låse op. Sørg altid for at kombinere din gendannelsesfrase med en sikkerhedskopi på Google Drive eller en filbackup – se det næste spørgsmål.',
      },
      {
        q: 'Hvordan tager jeg en sikkerhedskopi af min tegnebog?',
        a: 'Gå til »Indstillinger« og tag en sikkerhedskopi af din krypterede pengeskab til dit eget Google Drive — hvor den gemmes i en privat mappe, der kun er tilgængelig via appen, og som wwwallet ikke har adgang til — eller som en fil, du downloader og opbevarer selv. Gør dette, hver gang du opretter en tegnebog eller tilføjer nye konti.',
      },
      {
        q: 'Kan jeg bruge wwwallet på mere end én enhed?',
        a: 'Ja, men den synkroniseres ikke automatisk — hver enhed har sin egen lokale boks. For at bruge wwwallet på en ny enhed skal du gendanne den derfra via en sikkerhedskopi på Drive eller en fil, og derefter låse den op med din gendannelsesfrase.',
      },
      {
        q: 'Hvad sker der, hvis jeg mister min enhed og aldrig har taget en sikkerhedskopi?',
        a: 'Dine midler kan ikke gendannes. Det er helt bevidst: wwwallet har intet kontosystem og opbevarer ingen kopi af din opbevaringsplads nogen steder, så ingen – heller ikke os – kan gendanne den for dig. Det er den pris, man må betale for en tegnebog, som kun du har adgang til.',
      },
      {
        q: 'Overføres adgangskoder (Face ID / Touch ID) til en ny enhed?',
        a: 'Nej. En adgangskode er knyttet til den enhed, den blev oprettet på. Når du har gendannet en sikkerhedskopi på en ny enhed, skal du låse den op med din gendannelsesfrase, hvorefter du kan oprette en ny adgangskode på den.',
      },
      {
        q: 'Er wwwallet open source?',
        a: 'Kildekoden er offentlig på GitHub, så alle kan læse den. Den er endnu ikke udgivet under en open source-licens, så betragt den foreløbig som offentlig til gennemgang snarere end som open source.',
      },
      {
        q: 'Hvilke netværk understøtter wwwallet?',
        a: 'Ethereums mainnet samt Layer-2-netværkene Polygon, Arbitrum, Base og Optimism — alt sammen fra den samme konto.',
      },
      {
        q: 'Hvad ved wwwallet om mig?',
        a: 'Intet, der kan identificere dig. Der er ingen konto, intet login og ingen database. Saldo- og prisoplysninger hentes via wwwallet’s eget backend-system i stedet for, at din browser kontakter tredjepartsudbydere direkte, og dette backend-system får aldrig adgang til dine nøgler, adgangskoder eller gendannelsesfrasen.',
      },
    ],
  },
  footer: {
    tagline: 'En personlig Ethereum-tegnebog uden opbevaring.',
    sourceLink: 'Se kildekoden på GitHub',
    copyright: '© {year} wwwallet',
  },
}
