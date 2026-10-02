export default {
  nav: {
    wallet: 'Pung',
    ethereum: 'Ethereum',
    crypto: 'Krypto',
    faqs: 'Ofte stillede spørgsmål',
    launch: 'Start Wallet',
    home: 'Tilbage til toppen',
    sectionNavLabel: 'Navigation i afsnittene',
    principles: 'Principper',
  },
  settings: {
    open: 'Indstillinger',
    close: 'Luk indstillinger',
    theme: 'Tema',
    themeLight: 'Lys',
    themeDark: 'Mørkt',
    language: 'Sprog',
    search: 'Søg',
    noMatches: 'Ingen resultater',
  },
  hero: {
    eyebrow: 'En gratis Ethereum-tegnebog uden opbevaring',
    heading1: 'Dine nøgler.',
    heading2: 'Din enhed.',
    heading3: 'Gratis for alle.',
    lede: 'wwwallet kører i din browser og opbevarer dine nøgler krypteret på din egen enhed. Du behøver ikke oprette en konto, betale noget eller se reklamer — det er bare en tegnebog, der fungerer på samme måde for alle.',
    ctaPrimary: 'Start Wallet',
    ctaSecondary: 'Se, hvordan det fungerer',
    note: 'Ingen tilmelding · Ingen reklamer · Ingen sporing · 31 sprog',
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
        q: 'Er wwwallet virkelig gratis?',
        a: 'Ja. Det er gratis at bruge tjenesten, der er ingen premium-abonnementer og intet bag en betalingsmur, og wwwallet pålægger ingen gebyrer på det, du sender eller bytter. Den eneste uundgåelige omkostning er netværkets eget transaktionsgebyr (gas), som går til netværket og ikke til wwwallet. Ombytningskurser kommer fra 0x-børsaggregatoren, som kan pålægge sit eget gebyr på visse handler — eventuelle sådanne gebyrer vises på gennemgangsskærmen, inden du bekræfter.',
      },
      {
        q: 'Er der reklamer, sporingsværktøjer eller analyseværktøjer?',
        a: 'Nej. wwwallet viser ingen annoncer, kører ingen analyse- eller sporingsscripts og opretter ingen profil om dig. Der er ingen konto, så der er intet at knytte den til.',
      },
      {
        q: 'Skal jeg have en konto eller et ID for at kunne bruge det?',
        a: 'Nej. Der er ingen tilmelding, ingen e-mailadresse, intet telefonnummer og ingen identitetskontrol — du opretter en wallet på din enhed og kan straks begynde at bruge den.',
      },
      {
        q: 'Hvis det er gratis, hvordan tjener wwwallet så penge?',
        a: 'Tjenesten tjener ikke penge på sine brugere — ingen gebyrer, ingen reklamer, intet salg af data. Driftsomkostningerne holdes bevidst lave: selve tegnebogen kører i din browser, og backend-systemet videreformidler kun offentlige blockchain- og kursdata.',
      },
      {
        q: 'Er der nogen, der kan spærre min tegnebog?',
        a: 'Der findes ingen konto, så der er intet, som wwwallet — eller nogen anden — kan indefryse. Dine nøgler forlader aldrig din enhed, og transaktionerne underskrives der, før de sendes til netværket. Dine midler ligger på Ethereum, ikke i wwwallet: Du kan se enhver kontos private nøgle eller gendannelsesfrase fra dens menu og importere den til en anden Ethereum-tegnebog, når du vil.',
      },
      {
        q: 'Er min gendannelseskode nok til at få min tegnebog tilbage?',
        a: 'Ikke i sig selv. Din gendannelsesfrase låser din krypterede boks op, men selve boksen findes kun på din enhed. Hvis du mister eller sletter indholdet på den pågældende enhed uden nogensinde at have taget en sikkerhedskopi, er der intet tilbage, som frasen kan låse op. Sørg altid for at kombinere din gendannelsesfrase med en sikkerhedskopi på Google Drive eller en filbackup – se det næste spørgsmål.',
      },
      {
        q: 'Hvordan tager jeg en sikkerhedskopi af min wallet?',
        a: 'Gå til »Indstillinger« og sikkerhedskopier din krypterede pengeskab til dit eget Google Drive — gemt i en privat mappe, der kun er tilgængelig for appen, og som wwwallet ikke har adgang til — eller som en fil, du downloader og opbevarer selv. Gør dette, hver gang du opretter en tegnebog eller tilføjer nye konti.',
      },
      {
        q: 'Kan jeg bruge wwwallet på mere end én enhed?',
        a: 'Ja, men den synkroniseres ikke automatisk — hver enhed har sin egen lokale opbevaringsplads. For at bruge wwwallet på en ny enhed skal du gendanne den derfra via en sikkerhedskopi på Drive eller i en fil og derefter låse den op med din gendannelsesfrase.',
      },
      {
        q: 'Hvad sker der, hvis jeg mister min enhed og aldrig har taget en sikkerhedskopi?',
        a: 'Dine midler kan ikke gendannes. Det er helt bevidst: wwwallet har intet kontosystem og opbevarer ingen kopi af din opbevaringsplads nogen steder, så ingen – heller ikke os – kan gendanne den for dig. Det er prisen for en tegnebog, som kun du har adgang til.',
      },
      {
        q: 'Overføres adgangskoder (Face ID / Touch ID) til en ny enhed?',
        a: 'Nej. En adgangskode er knyttet til den enhed, den blev oprettet på. Når du har gendannet en sikkerhedskopi på en ny enhed, skal du låse den op med din gendannelsessætning, hvorefter du kan oprette en ny adgangskode på den.',
      },
      {
        q: 'Er wwwallet open source?',
        a: 'Nej — kildekoden er tilgængelig. Den fulde kildekode er offentligt tilgængelig på GitHub, så alle kan læse, gennemgå og kontrollere den, men den er ikke open source: koden er licenseret under PolyForm Strict License 1.0.0.',
      },
      {
        q: 'Hvad må jeg gøre med koden?',
        a: 'Du må læse og gennemgå det hele samt køre en uændret kopi til ikke-kommercielle formål, såsom personlig studier, forskning og afprøvning. Du må ikke distribuere det, ændre det eller udarbejde afledte værker (herunder forks) eller anvende det kommercielt. Hvis du har brug for noget, som licensen ikke tillader, skal du kontakte ophavsretsindehaveren for at få en separat licens.',
      },
      {
        q: 'Er wwwallet sikkert at bruge? Er der nogen garanti?',
        a: 'wwwallet er software uden opbevaring, der leveres »som den er«, uden nogen form for garanti. Du har alene kontrol over dine nøgler og midler — ingen, heller ikke vi, kan gendanne en mistet gendannelsesfrase eller sikkerhedskopi, tilbageføre en transaktion eller yde erstatning for tab. Brug kun midler, du har råd til at miste, tjek adresser og netværk grundigt, inden du sender, og intet her udgør finansiel, investeringsmæssig, juridisk eller skattemæssig rådgivning.',
      },
      {
        q: 'Hvilke netværk understøtter wwwallet?',
        a: 'Ethereums mainnet samt Layer-2-netværkene Polygon, Arbitrum, Base og Optimism — alt sammen fra den samme konto.',
      },
      {
        q: 'Hvordan sætter jeg penge ind på min tegnebog?',
        a: 'Opret en konto, vælg »Vis QR-kode« for at se adressen, og overfør midler til denne adresse fra en børs eller en anden tegnebog. Sørg for at sende pengene via det rigtige netværk (Ethereum, Polygon, Arbitrum, Base eller Optimism) — den samme adresse fungerer på dem alle, men midler, der sendes via et bestemt netværk, vises kun på det pågældende netværk. Du skal også have lidt af netværkets egen mønt (f.eks. ETH) til at betale transaktionsgebyrer.',
      },
      {
        q: 'Hvad kan jeg bruge wwwallet til?',
        a: 'Send: Overfør ETH eller et hvilket som helst token til en adresse, du indsætter, scanner fra en QR-kode eller vælger fra dine egne konti, og gennemgå oplysningerne, før du bekræfter. Byt: Byt et token til et andet på samme netværk fra fanen »Byt«, hvor du på forhånd kan se en kurs og et estimeret gebyr. Modtag: Vis din adresse som en QR-kode. Du kan også se dine saldi i USD samt din transaktionshistorik på tværs af alle understøttede netværk.',
      },
      {
        q: 'Hvad ved wwwallet om mig?',
        a: 'Intet, der kan identificere dig. Der er ingen konto, intet login og ingen database. Saldo- og prisoplysninger hentes via wwwallet’s eget backend-system i stedet for, at din browser kontakter tredjepartsudbydere direkte, og dette backend-system får aldrig adgang til dine nøgler, adgangskoder eller gendannelsesfrasen.',
      },
    ],
  },
  footer: {
    tagline: 'En gratis Ethereum-tegnebog uden opbevaring af aktiver til alle.',
    copyright: '© {year} wwwallet',
    licenseLink: 'Udgivet under PolyForm Strict 1.0.0',
    disclaimer:
      'Software uden opbevaring leveres »som den er«, uden garanti. Dette udgør ikke finansiel rådgivning. Du er alene ansvarlig for dine nøgler og midler.',
  },
  principles: {
    eyebrow: 'Principper',
    heading: 'Gratis, åben og udviklet til alle',
    lede: 'En digital tegnebog skal være et værktøj, man bruger, ikke en forretning, der bygger på sine brugere. Det er disse principper, som wwwallet bygger på.',
    items: [
      {
        title: 'Gratis, uden nogen hage',
        body: 'Ingen pris, intet premium-abonnement, ingen betalte funktioner. wwwallet pålægger ingen egne gebyrer — den eneste omkostning er netværkets eget transaktionsgebyr.',
      },
      {
        title: 'Ingen reklamer, ingen sporing',
        body: 'Ingen reklamer, ingen analyseværktøjer, ingen sporingsscripts og ingen data, der sælges til nogen. Der findes slet ingen profil om dig, der kan sælges.',
      },
      {
        title: 'Ingen tilmelding',
        body: 'Ingen e-mail, telefonnummer eller ID-kontrol. Åbn appen, opret en tegnebog, og så er du klar.',
      },
      {
        title: 'Du beholder dine nøgler',
        body: 'Nøglerne oprettes og krypteres på din enhed og forlader aldrig enheden. wwwallet kan hverken se dem, flytte dine midler eller spærre din adgang.',
      },
      {
        title: 'Fungerer overalt',
        body: 'Fungerer i alle moderne browsere på både mobiltelefoner og computere og installeres som en app — der kræves ingen konto i en app-butik.',
      },
      {
        title: 'På 31 sprog',
        body: 'Brug den på det sprog, du er mest fortrolig med, i lys eller mørk tilstand.',
      },
      {
        title: 'Kode i det åbne',
        body: 'Den fulde kildekode er offentliggjort, så alle kan læse og gennemgå den. Der er tale om »source-available« snarere end »open source« — i FAQ’en forklares det, hvad licensen tillader.',
      },
      {
        title: 'Der er ikke noget, der skal slukkes',
        body: 'Der findes ingen konto, der kan blive spærret. Dine midler opbevares direkte på Ethereum-netværket, og nøglen til enhver konto kan til enhver tid overføres til en anden tegnebog.',
      },
    ],
  },
  license: {
    title: 'Licens',
    close: 'Luk',
    summaryTitle: 'På almindeligt dansk',
    canUse: 'Du kan bruge wwwallet gratis til personlige og andre ikke-kommercielle formål.',
    canRead: 'Du kan læse og gennemgå hver eneste linje i kildekoden.',
    cannot: 'Du må ikke kopiere, ændre, videredistribuere eller sælge det.',
    englishNote:
      'Her følger den fulde licens i sin oprindelige engelske udgave — det er den juridisk bindende tekst.',
    viewSource: 'Se på GitHub',
  },
}
