export default {
  nav: {
    wallet: 'wwwallet',
    ethereum: 'Ethereum',
    crypto: 'Krypto',
    faqs: 'Ofte stillede spørgsmål',
    launch: 'Lancering af wwwallet',
    home: 'Tilbage til toppen',
    sectionNavLabel: 'Navigation i afsnit',
    principles: 'Principper',
  },
  settings: {
    open: 'Indstillinger',
    close: 'Luk indstillinger',
    theme: 'Tema',
    themeLight: 'Let',
    themeDark: 'Mørk',
    language: 'Sprog',
    search: 'Søg',
    noMatches: 'Ingen resultater',
    version: 'Version {version}',
  },
  hero: {
    eyebrow: 'En gratis, ikke-depotbaseret Ethereum-wallet',
    heading1: 'Dine nøgler.',
    heading2: 'Din enhed.',
    heading3: 'Gratis for alle.',
    lede: 'wwwallet kører i din browser og opbevarer dine nøgler krypteret på din egen enhed. Der er ingen konto, der skal oprettes, intet at betale og ingen reklamer, og det fungerer på samme måde for alle.',
    ctaPrimary: 'Lancering af wwwallet',
    ctaSecondary: 'Se, hvordan det fungerer',
    note: 'Ingen tilmelding · Ingen annoncer · Ingen sporing · 31 sprog',
  },
  wallet: {
    eyebrow: 'wwwallet',
    heading: 'Udviklet, så kun du kan åbne den',
    lede: 'wwwallet opbevarer ikke dine midler – den hjælper dig med at opbevare dem selv. Her er, hvad det betyder i praksis.',
    points: [
      {
        title: 'Uden opbevaring, altid',
        body: "Dine private nøgler genereres og krypteres på din egen enhed. wwwallet's servere ser dem aldrig — der er ingen database med nøgler, der kan hackes, fordi der slet ikke findes en database.",
      },
      {
        title: 'Krypteret med AES-256, låses op på din måde',
        body: 'Din wallet er beskyttet med AES-256-GCM-kryptering. Lås den op med din gendannelsesfrase, eller aktiver en adgangsnøgle – Face ID, Touch ID eller Windows Hello – for hurtig, lokal adgang.',
      },
      {
        title: 'Låser sig selv automatisk',
        body: 'wwwallet låses efter en kort periode uden aktivitet og gemmer aldrig din ulåste session på disken – luk fanen, og den glemmer det med vilje.',
      },
      {
        title: 'Femten Ethereum-netværk, ét sæt konti',
        body: 'Opbevar og send på Ethereums mainnet og 14 andre netværk — herunder Arbitrum, Base, Optimism, Polygon, Linea og ZKsync — med de samme konti og adresser.',
      },
    ],
    caveatTitle:
      'Din gendannelsesfrase låser din kryptotegnebog op – det er ikke en magisk sikkerhedskopi',
    caveatBody:
      'Gem din gendannelsesfrase et sikkert sted, men lav også en sikkerhedskopi på Google Drive eller i en fil. Du får brug for sikkerhedskopien til at gendanne din tegnebog på en ny enhed, og frasen til at låse den op, når du har gjort det.',
    caveatLink: "Læs mere i FAQ'en",
  },
  ethereum: {
    eyebrow: 'Ethereum',
    heading: 'Hvorfor Ethereum',
    lede: 'wwwallet er specifikt udviklet til Ethereum. Her er argumenterne for det, forklaret i et letforståeligt sprog.',
    points: [
      {
        title: 'En verdenscomputer, ikke blot en hovedbog',
        body: 'Ethereum tog Bitcoins idé om en fælles, manipulationssikker hovedbog og udvidede den: en global, programmerbar computer, som alle kan bygge videre på, og som ingen enkelt part kan slukke for.',
      },
      {
        title: 'Sikret ved staking, ikke mining',
        body: 'Siden »The Merge« i 2022 er Ethereum blevet sikret ved hjælp af Proof-of-Stake i stedet for energikrævende mining — validatorer sætter ETH på spil som sikkerhed i stedet for at forbruge elektricitet for at konkurrere om blokke.',
      },
      {
        title: 'Åben og uden tilladelseskrav',
        body: 'Ingen godkender din konto. Enhver, hvor som helst, kan besidde ETH eller udvikle en applikation på Ethereum — de samme regler gælder for alle, inklusive de største institutioner.',
      },
      {
        title: 'Den standard, som andre netværk bygger på',
        body: 'Layer-2-netværk som Arbitrum, Base og Optimism – som alle understøttes i wwwallet – udvider Ethereums sikkerhed til hurtigere og billigere transaktioner i stedet for at starte fra bunden.',
      },
    ],
    linkLabel: 'Læs mere på Ethereum Foundation',
    linkUrl: 'https://ethereum.org/en/foundation/',
  },
  crypto: {
    eyebrow: 'Krypto',
    heading: 'Kryptovaluta, forklaret på en enkel måde',
    lede: 'Et par begreber, der er værd at forstå, før du selv ejer kryptovaluta — ikke kun med wwwallet.',
    points: [
      {
        title: 'Depotbaseret vs. ikke-depotbaseret',
        body: 'En custodial-wallet eller en børs opbevarer dine nøgler for dig – det er praktisk, men du stoler på, at en anden ikke fryser, mister eller misbruger dine midler. En non-custodial-wallet som wwwallet lader nøglerne – og ansvaret – ligge udelukkende i dine hænder.',
      },
      {
        title: 'Staking vs. mining',
        body: 'Proof-of-Work-mining sikrer en blockchain med rå regnekraft og elektricitet. Proof-of-Stake sikrer den i stedet med kapital, der er sat på spil. Ethereums overgang til staking reducerede energiforbruget med mere end 99,9 % — omtrent forskellen mellem at forsyne et lille land og en lille by med strøm.',
      },
      {
        title: 'Ud over Ethereum',
        body: 'Bitcoin prioriterer enkelhed og forudsigelighed frem for programmerbarhed. Kæder som Solana satser på rå gennemstrømning og går ofte på kompromis med decentraliseringen for at nå dertil. Ethereum lægger først og fremmest vægt på decentralisering og sikkerhed og overlader hastighed og omkostninger til Layer-2-netværk, der er bygget oven på det.',
      },
      {
        title: 'Ingen seriøs aktør beder om din sætning',
        body: 'Ingen børs, ingen supportmedarbejder og ingen fra wwwallet vil nogensinde bede om din gendannelsesfrase – uanset hvilken app du bruger. Enhver, der gør det, forsøger at bestjæle dig.',
      },
    ],
    linkLabel: 'Få mere at vide med Bankless-podcasten',
    linkUrl: 'https://www.bankless.com/',
  },
  faqs: {
    eyebrow: 'Ofte stillede spørgsmål',
    heading: 'Ofte stillede spørgsmål',
    items: [
      {
        q: 'Er wwwallet virkelig gratis?',
        a: 'Ja. Det er gratis at bruge den, der er ingen premium-niveau og intet bag en betalingsmur, og wwwallet pålægger ingen gebyrer på noget, du sender eller bytter. Den eneste uundgåelige omkostning er netværkets eget transaktionsgebyr (gas), som går til netværket og ikke til wwwallet. Byttepriserne kommer fra 0x-børsaggregatoren (eller LI.FI på netværk, som 0x ikke dækker), som kan pålægge sit eget gebyr på visse handler — et sådant gebyr vises på gennemgangsskærmen, før du bekræfter.',
      },
      {
        q: 'Er der annoncer, trackere eller analyseværktøjer?',
        a: 'Nej. wwwallet viser ingen annoncer, kører ingen analyse- eller sporingsscripts og opretter ikke en profil på dig. Der er ingen konto, så der er intet at knytte en til.',
      },
      {
        q: 'Skal jeg have en konto eller et ID for at bruge den?',
        a: 'Nej. Der er ingen tilmelding, e-mailadresse, telefonnummer eller identitetskontrol – du opretter en tegnebog på din enhed og begynder at bruge den.',
      },
      {
        q: 'Hvis den er gratis, hvordan tjener wwwallet så penge?',
        a: 'Den tjener ikke penge på sine brugere – ingen gebyrer, ingen annoncer, intet salg af data. Driftsomkostningerne holdes lave ved design: selve appen kører i din browser, og backend-systemet videresender kun offentlige blockchain- og prisdata.',
      },
      {
        q: 'Kan nogen fryse min tegnebog?',
        a: 'Der er ingen konto, så der er intet, som wwwallet – eller nogen anden – kan fryse. Dine nøgler forlader aldrig din enhed, og transaktioner underskrives der, før de sendes til netværket. Dine midler findes på Ethereum, ikke i wwwallet: Du kan se enhver kontos private nøgle eller gendannelsesfrase fra dens menu og importere den til enhver anden Ethereum-wallet-app, når du vil.',
      },
      {
        q: 'Er min gendannelsesfrase nok til at få min tegnebog tilbage?',
        a: 'Ikke alene. Din gendannelsesfrase låser din krypterede boks op, men selve boksen findes kun på din enhed. Hvis du mister eller sletter den enhed uden nogensinde at have taget en sikkerhedskopi, er der intet tilbage, som frasen kan låse op. Kombiner altid din gendannelsesfrase med en sikkerhedskopi på Google Drive eller en fil – se det næste spørgsmål.',
      },
      {
        q: 'Hvordan tager jeg en sikkerhedskopi af min tegnebog?',
        a: 'Fra Indstillinger skal du sikkerhedskopiere dit krypterede skab til dit eget Google Drive eller som en fil, du downloader og opbevarer selv. En Drive-sikkerhedskopi gemmes i en privat app-mappe, og wwwallet kan ikke se noget andet på dit Drive. Lav en sikkerhedskopi, når du først opsætter appen, og igen hver gang du tilføjer konti.',
      },
      {
        q: 'Kan jeg bruge wwwallet på mere end én enhed?',
        a: 'Ja, men den synkroniseres ikke automatisk – hver enhed har sin egen lokale opbevaringsplads. For at bruge wwwallet på en ny enhed skal du gendanne den derfra via en Drive- eller filbackup og derefter låse den op med din gendannelsesfrase.',
      },
      {
        q: 'Hvad sker der, hvis jeg mister min enhed og aldrig har taget en sikkerhedskopi?',
        a: 'Dine midler kan ikke gendannes. Det er med vilje: wwwallet har intet kontosystem og opbevarer ingen kopi af din opbevaringsplads nogen steder, så ingen – heller ikke os – kan gendanne den for dig. Det er kompromiset for, at ingen andre end dig har adgang til nøglerne.',
      },
      {
        q: 'Overføres adgangskoder (Face ID / Touch ID) til en ny enhed?',
        a: 'Nej. En adgangsnøgle er bundet til den enhed, den blev oprettet på. Når du har gendannet en sikkerhedskopi på en ny enhed, skal du låse den op med din gendannelsesfrase, hvorefter du kan oprette en ny adgangsnøgle der.',
      },
      {
        q: 'Er wwwallet open source?',
        a: 'Nej — kildekoden er tilgængelig. Den fulde kildekode er offentlig på GitHub, så alle kan læse, gennemgå og kontrollere den, men den er ikke open source: koden er licenseret under PolyForm Strict License 1.0.0.',
      },
      {
        q: 'Hvad må jeg gøre med koden?',
        a: 'Du må læse og gennemgå det hele samt køre en uændret kopi til ikke-kommercielle formål, såsom personlig studier, forskning og test. Du må ikke distribuere det, ændre det eller skabe afledte værker (herunder forks) eller bruge det kommercielt. Hvis du har brug for noget, som licensen ikke tillader, skal du kontakte indehaveren af ophavsretten for at få en separat licens.',
      },
      {
        q: 'Er wwwallet sikkert at bruge? Er der nogen garanti?',
        a: 'wwwallet er software uden opbevaring, der leveres »som den er«, uden nogen form for garanti. Du har alene kontrol over dine nøgler og midler — ingen, heller ikke os, kan gendanne en mistet gendannelsesfrase eller sikkerhedskopi, tilbageføre en transaktion eller yde erstatning for tab. Brug kun midler, du har råd til at miste, dobbelttjek adresser og netværk, før du sender, og intet her udgør finansiel, investerings-, juridisk eller skattemæssig rådgivning.',
      },
      {
        q: 'Hvilke netværk understøtter wwwallet?',
        a: 'Ethereum-mainnet samt Arbitrum, Base, Optimism, Polygon, Robinhood Chain, World Chain, Ink, Linea, Gnosis, Celo, ZKsync Era, Ronin, Unichain og Scroll — alt sammen fra det samme sæt konti.',
      },
      {
        q: 'Hvordan sætter jeg penge ind på min tegnebog?',
        a: 'Opret en konto, vælg »Vis QR-kode« for at se adressen, og send midler til den adresse fra en børs eller en anden tegnebog. Sørg for at sende på det rigtige netværk (f.eks. Ethereum, Base eller Arbitrum) — den samme adresse fungerer på alle understøttede netværk, men midler, der sendes på et netværk, vises kun på det pågældende netværk. Du skal også have lidt af netværkets egen mønt (f.eks. ETH) til at betale transaktionsgebyrer.',
      },
      {
        q: 'Hvad kan jeg bruge wwwallet til?',
        a: 'Send: Overfør ETH eller et hvilket som helst token til en adresse, du indsætter, scanner fra en QR-kode eller vælger fra dine egne konti, og gennemgå detaljerne, før du bekræfter. Byt: Byt et token til et andet på det samme netværk fra fanen »Byt«, hvor en kurs og et estimeret gebyr vises på forhånd. Modtag: Vis din adresse som en QR-kode. Du kan også se dine saldi i USD samt din transaktionshistorik på tværs af alle understøttede netværk.',
      },
      {
        q: 'Hvad ved wwwallet om mig?',
        a: 'Intet, der identificerer dig. Der er ingen konto, login eller database. Saldo- og kursdata hentes via wwwallet’s eget backend i stedet for, at din browser kontakter tredjepartsudbydere direkte, og dette backend ser aldrig dine nøgler, adgangskoder eller gendannelsesfrasen.',
      },
    ],
  },
  footer: {
    tagline: 'En gratis, ikke-depotbaseret Ethereum-wallet til alle.',
    copyright: '© {year} wwwallet',
    licenseLink: 'Licenseret under PolyForm Strict 1.0.0',
    disclaimer:
      'Software uden opbevaring leveres »som den er«, uden garanti. Dette er ikke finansiel rådgivning. Du er alene ansvarlig for dine nøgler og midler.',
  },
  principles: {
    eyebrow: 'Principper',
    heading: 'Gratis, åben og udviklet til alle',
    lede: 'Software, der opbevarer dine penge, bør være et værktøj, du bruger, ikke en forretning, der er bygget op omkring sine brugere. Det er disse forpligtelser, som wwwallet er bygget op omkring.',
    items: [
      {
        title: 'Gratis, uden nogen hage',
        body: 'Ingen priser, ingen premium-abonnementer, ingen betalte funktioner. wwwallet pålægger ingen egne gebyrer – den eneste omkostning er netværkets eget transaktionsgebyr.',
      },
      {
        title: 'Ingen reklamer, ingen sporing',
        body: 'Ingen reklamer, ingen analyser, ingen sporingsscripts og ingen data, der sælges til nogen. Der findes slet ingen profil om dig, der kan sælges.',
      },
      {
        title: 'Ingen tilmelding',
        body: 'Ingen e-mail, telefonnummer eller ID-kontrol. Åbn appen, opret en tegnebog, og så er du klar.',
      },
      {
        title: 'Dine nøgler forbliver hos dig',
        body: 'Nøglerne oprettes og krypteres på din enhed og forlader aldrig enheden. wwwallet kan ikke se dem, flytte dine midler eller spærre dig ude.',
      },
      {
        title: 'Fungerer overalt',
        body: 'Kører i enhver moderne browser på telefon eller desktop og installeres som en app – ingen app store-konto er nødvendig.',
      },
      {
        title: 'På 31 sprog',
        body: 'Brug den på det sprog, du er mest fortrolig med, i lys eller mørk tilstand.',
      },
      {
        title: 'Kode i det åbne',
        body: 'Den fulde kildekode er offentliggjort, så alle kan læse og gennemgå den. Den er »source-available« snarere end »open source« — FAQ’en forklarer, hvad licensen tillader.',
      },
      {
        title: 'Intet at slå fra',
        body: 'Der er ingen konto, som nogen kan fryse. Dine midler findes på selve Ethereum, og nøglen til enhver konto kan til enhver tid overføres til en anden tegnebog.',
      },
    ],
  },
  license: {
    title: 'Licens',
    close: 'Luk',
    summaryTitle: 'På almindeligt engelsk',
    canUse: 'Du kan bruge wwwallet gratis til personlige og andre ikke-kommercielle formål.',
    canRead: 'Du kan læse og gennemgå hver eneste linje i kildekoden.',
    cannot: 'Du må ikke kopiere, ændre, videredistribuere eller sælge den.',
    englishNote:
      'Den fulde licens følger her, på originalsproget engelsk — det er den juridiske tekst.',
    viewSource: 'Se kildekoden på GitHub',
  },
  meta: {
    title: 'wwwallet — Gratis, ikke-depotbaseret Ethereum-wallet',
    description:
      'Gratis Ethereum-wallet i din browser. Ingen tilmelding, ingen annoncer, ingen sporing — dine nøgler forbliver krypteret på din enhed. Ethereum, Base, Arbitrum, Optimism, Polygon og 10 yderligere netværk.',
  },
}
