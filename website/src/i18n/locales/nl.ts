export default {
  nav: {
    wallet: 'wwwallet',
    ethereum: 'Ethereum',
    crypto: 'Crypto',
    faqs: 'Veelgestelde vragen',
    launch: 'Lanceer wwwallet',
    home: 'Terug naar boven',
    sectionNavLabel: 'Navigatie door de secties',
    principles: 'Uitgangspunten',
  },
  settings: {
    open: 'Instellingen',
    close: 'Sluit instellingen',
    theme: 'Thema',
    themeLight: 'Kort',
    themeDark: 'Donker',
    language: 'Taal',
    search: 'Zoeken',
    noMatches: 'Geen resultaten',
    version: 'Versie {version}',
  },
  hero: {
    eyebrow: 'Een gratis, non-custodial Ethereum-wallet',
    heading1: 'Jouw sleutels.',
    heading2: 'Je apparaat.',
    heading3: 'Gratis voor iedereen.',
    lede: 'wwwallet draait in je browser en bewaart je sleutels versleuteld op je eigen apparaat. Je hoeft geen account aan te maken, niets te betalen en er zijn geen advertenties; het werkt voor iedereen op dezelfde manier.',
    ctaPrimary: 'Lanceer wwwallet',
    ctaSecondary: 'Kijk hoe het werkt',
    note: 'Geen registratie · Geen advertenties · Geen tracking · 31 talen',
  },
  wallet: {
    eyebrow: 'wwwallet',
    heading: 'Zo ontworpen dat alleen jij hem kunt openen',
    lede: 'wwwallet bewaart je geld niet — het helpt je om het zelf te bewaren. Dit is wat dat in de praktijk betekent.',
    points: [
      {
        title: 'Non-custodial, altijd',
        body: 'Je privésleutels worden op je eigen apparaat gegenereerd en versleuteld. De servers van wwwallet krijgen ze nooit te zien — er is geen database met sleutels die gehackt kan worden, want er is helemaal geen database.',
      },
      {
        title: 'Versleuteld met AES-256, ontgrendelen op jouw manier',
        body: 'Je kluis is beveiligd met AES-256-GCM-versleuteling. Ontgrendel hem met je herstelzin, of schakel een toegangscode in — Face ID, Touch ID of Windows Hello — voor snelle, uitsluitend lokale toegang.',
      },
      {
        title: 'Vergrendelt zichzelf automatisch',
        body: 'wwwallet vergrendelt na een korte periode van inactiviteit en slaat je ontgrendelde sessie nooit op schijf op — sluit je het tabblad, dan vergeet het dit bewust.',
      },
      {
        title: 'Vijf Ethereum-netwerken, één set accounts',
        body: 'Bewaar en verstuur via het Ethereum-mainnet, Polygon, Arbitrum, Base en Optimism met dezelfde accounts en adressen.',
      },
    ],
    caveatTitle: 'Je herstelzin ontgrendelt je kluis — het is geen magische back-up',
    caveatBody:
      'Bewaar je herstelzin op een veilige plek, maar maak ook een back-up op Google Drive of in een bestand. Je hebt de back-up nodig om je wallet op een nieuw apparaat te herstellen, en de zin om hem te ontgrendelen zodra je dat hebt gedaan.',
    caveatLink: 'Lees meer in de veelgestelde vragen',
  },
  ethereum: {
    eyebrow: 'Ethereum',
    heading: 'Waarom Ethereum',
    lede: 'wwwallet is speciaal rond Ethereum gebouwd. Hier is de reden ervoor, in eenvoudige bewoordingen.',
    points: [
      {
        title: 'Een wereldcomputer, niet zomaar een grootboek',
        body: 'Ethereum nam het idee van Bitcoin over van een gedeeld, fraudebestendig grootboek en breidde dit uit: een wereldwijde, programmeerbare computer waarop iedereen kan bouwen en die door geen enkele partij kan worden uitgeschakeld.',
      },
      {
        title: 'Beveiligd door staking, niet door mining',
        body: 'Sinds ‘the Merge’ in 2022 wordt Ethereum beveiligd door Proof-of-Stake in plaats van energieverslindende mining — validators zetten ETH in als onderpand in plaats van elektriciteit te verspillen om te strijden om blokken.',
      },
      {
        title: 'Open en zonder toestemming',
        body: 'Niemand keurt je account goed. Iedereen, waar dan ook, kan ETH bezitten of een applicatie bouwen op Ethereum — dezelfde regels gelden voor iedereen, ook voor de grootste instellingen.',
      },
      {
        title: 'De standaard waarop andere netwerken voortbouwen',
        body: 'Layer-2-netwerken zoals Arbitrum, Base en Optimism — die allemaal door wwwallet worden ondersteund — breiden de beveiliging van Ethereum uit naar snellere, goedkopere transacties, in plaats van helemaal opnieuw te beginnen.',
      },
    ],
    linkLabel: 'Lees meer op de website van de Ethereum Foundation',
    linkUrl: 'https://ethereum.org/en/foundation/',
  },
  crypto: {
    eyebrow: 'Crypto',
    heading: 'Crypto, in eenvoudige bewoordingen',
    lede: 'Een paar begrippen die je goed moet begrijpen voordat je zelf crypto gaat bezitten — niet alleen met wwwallet.',
    points: [
      {
        title: 'Met beheer versus zonder beheer',
        body: 'Een bewaarpot of beurs bewaart je sleutels voor je — handig, maar je vertrouwt erop dat iemand anders je geld niet blokkeert, kwijtraakt of misbruikt. Bij een non-custodial wallet zoals wwwallet blijven de sleutels, en de verantwoordelijkheid, volledig in jouw handen.',
      },
      {
        title: 'Staking versus mining',
        body: 'Proof-of-Work-mining beveiligt een blockchain met ruwe rekenkracht en elektriciteit. Proof-of-Stake beveiligt deze in plaats daarvan met kapitaal dat op het spel staat. Door de overstap naar staking heeft Ethereum zijn energieverbruik met meer dan 99,9% teruggedrongen — dat is ongeveer het verschil tussen de energiebehoefte van een klein land en die van een klein stadje.',
      },
      {
        title: 'Verder dan Ethereum',
        body: 'Bitcoin geeft voorrang aan eenvoud en voorspelbaarheid boven programmeerbaarheid. Ketens zoals Solana richten zich op pure doorvoercapaciteit, waarbij ze vaak decentralisatie opofferen om dat te bereiken. Ethereum legt de nadruk op decentralisatie en veiligheid, en laat snelheid en kosten over aan Layer-2-netwerken die erop zijn gebouwd.',
      },
      {
        title: 'Niemand die het serieus meent, vraagt om je zin',
        body: 'Geen enkele beurs, geen supportmedewerker en niemand van wwwallet zal ooit om je herstelzin vragen — welke app je ook gebruikt. Iedereen die dat wel doet, probeert je te bestelen.',
      },
    ],
    linkLabel: 'Duik er dieper in met de Bankless-podcast',
    linkUrl: 'https://www.bankless.com/',
  },
  faqs: {
    eyebrow: 'Veelgestelde vragen',
    heading: 'Veelgestelde vragen',
    items: [
      {
        q: 'Is wwwallet echt gratis?',
        a: 'Ja. Het gebruik is gratis, er is geen premium-abonnement en er zit niets achter een betaalmuur, en wwwallet rekent geen extra kosten aan voor wat je verstuurt of ruilt. De enige onvermijdelijke kosten zijn de transactiekosten (gas) van het netwerk zelf, die naar het netwerk gaan en niet naar wwwallet. De ruilkoersen komen van de 0x-beursaggregator, die bij sommige transacties een eigen vergoeding kan rekenen — zo’n vergoeding wordt op het bevestigingsscherm weergegeven voordat je de transactie bevestigt.',
      },
      {
        q: 'Zijn er advertenties, trackers of analytics?',
        a: 'Nee. wwwallet toont geen advertenties, draait geen analyse- of trackingscripts en stelt geen profiel van je samen. Er is geen account, dus er is niets om aan te koppelen.',
      },
      {
        q: 'Heb ik een account of ID nodig om het te gebruiken?',
        a: 'Nee. Je hoeft je niet aan te melden, je e-mailadres of telefoonnummer op te geven en er is geen identiteitscontrole — je maakt gewoon een wallet aan op je toestel en kunt er meteen mee aan de slag.',
      },
      {
        q: 'Als het gratis is, hoe verdient wwwallet dan geld?',
        a: 'De app verdient geen geld aan zijn gebruikers — geen kosten, geen advertenties, geen verkoop van gegevens. De exploitatiekosten worden bewust laag gehouden: de app zelf draait in je browser en de backend geeft alleen openbare blockchain- en prijsgegevens door.',
      },
      {
        q: 'Kan iemand mijn wallet blokkeren?',
        a: 'Er is geen account, dus er is niets dat wwwallet – of wie dan ook – kan bevriezen. Je sleutels verlaten je apparaat nooit, en transacties worden daar ondertekend voordat ze naar het netwerk worden verzonden. Je geld staat op Ethereum, niet in wwwallet: je kunt de privésleutel of herstelzin van elke account bekijken via het menu en deze op elk moment importeren in een andere Ethereum-wallet-app.',
      },
      {
        q: 'Is mijn herstelzin genoeg om mijn wallet terug te krijgen?',
        a: 'Niet op zichzelf. Je herstelzin ontgrendelt je versleutelde kluis, maar de kluis zelf staat alleen op je apparaat. Als je dat apparaat kwijtraakt of wist zonder ooit een back-up te hebben gemaakt, is er niets meer over dat de zin kan ontgrendelen. Combineer je herstelzin altijd met een back-up op Google Drive of in een bestand — zie de volgende vraag.',
      },
      {
        q: 'Hoe maak ik een back-up van mijn wallet?',
        a: 'Maak vanuit Instellingen een back-up van je versleutelde kluis naar je eigen Google Drive of als een bestand dat je downloadt en zelf bewaart. Een Drive-back-up komt in een privé-app-map terecht, en wwwallet kan niets anders op je Drive zien. Maak een back-up bij de eerste installatie, en nogmaals telkens wanneer je accounts toevoegt.',
      },
      {
        q: 'Kan ik wwwallet op meer dan één apparaat gebruiken?',
        a: 'Ja, maar het synchroniseert niet automatisch — elk apparaat heeft zijn eigen lokale kluis. Om wwwallet op een nieuw apparaat te gebruiken, zet je het daar terug vanaf een Drive- of bestandsback-up en ontgrendel je het vervolgens met je herstelzin.',
      },
      {
        q: 'Wat gebeurt er als ik mijn apparaat kwijtraak en nooit een back-up heb gemaakt?',
        a: 'Je geld is onherstelbaar. Dat is zo bedoeld: wwwallet heeft geen accountsysteem en bewaart nergens een kopie van je kluis, dus niemand – ook wij niet – kan die voor je herstellen. Dat is de afweging voor sleutels waar alleen jij toegang toe hebt.',
      },
      {
        q: 'Gaan toegangscodes (Face ID / Touch ID) mee naar een nieuw apparaat?',
        a: 'Nee. Een toegangscode is gekoppeld aan het apparaat waarop deze is aangemaakt. Nadat je een back-up op een nieuw apparaat hebt hersteld, ontgrendel je de app met je herstelzin en kun je daar een nieuwe toegangscode instellen.',
      },
      {
        q: 'Is wwwallet open source?',
        a: 'Nee — de broncode is beschikbaar. De volledige broncode staat openbaar op GitHub, zodat iedereen deze kan lezen, beoordelen en controleren, maar het is geen open source: de code valt onder de PolyForm Strict License 1.0.0.',
      },
      {
        q: 'Wat mag ik met de code doen?',
        a: 'Je mag alles lezen en controleren, en een ongewijzigde kopie gebruiken voor niet-commerciële doeleinden, zoals persoonlijke studie, onderzoek en testen. Je mag het niet verspreiden, aanpassen of er afgeleide werken van maken (inclusief forks), of het commercieel gebruiken. Als je iets nodig hebt wat de licentie niet toestaat, neem dan contact op met de auteursrechthebbende voor een aparte licentie.',
      },
      {
        q: 'Is wwwallet veilig om te gebruiken? Is er enige garantie?',
        a: 'wwwallet is non-custodial software die wordt aangeboden ‘zoals hij is’, zonder enige vorm van garantie. Jij alleen hebt de controle over je sleutels en je geld — niemand, ook wij niet, kan een verloren herstelzin of back-up terugvinden, een transactie ongedaan maken of je schadeloos stellen voor verliezen. Gebruik alleen geld dat je kunt missen, controleer adressen en netwerken nog eens goed voordat je iets verstuurt, en niets hier is financieel, beleggings-, juridisch of fiscaal advies.',
      },
      {
        q: 'Welke netwerken ondersteunt wwwallet?',
        a: 'Het Ethereum-mainnet, plus de Layer-2-netwerken Polygon, Arbitrum, Base en Optimism — allemaal vanuit dezelfde set accounts.',
      },
      {
        q: 'Hoe zet ik geld op mijn wallet?',
        a: 'Maak een account aan, kies ‘QR-code bekijken’ om het adres te zien en stuur geld naar dat adres vanaf een exchange of een andere wallet. Zorg ervoor dat je via het juiste netwerk stuurt (Ethereum, Polygon, Arbitrum, Base of Optimism) — hetzelfde adres werkt op al deze netwerken, maar geld dat via één netwerk wordt gestuurd, verschijnt alleen op dat netwerk. Je hebt ook een klein beetje van de eigen munt van het netwerk (zoals ETH) nodig om de transactiekosten te betalen.',
      },
      {
        q: 'Wat kan ik doen met wwwallet?',
        a: 'Verzenden: maak ETH of een willekeurig token over naar een adres dat je plakt, scant via een QR-code of kiest uit je eigen accounts, en controleer de details voordat je bevestigt. Ruilen: ruil het ene token in voor het andere op hetzelfde netwerk via het tabblad ‘Swap’, waarbij de koers en de geschatte kosten vooraf worden weergegeven. Ontvangen: toon je adres als een QR-code. Je kunt ook je saldi in USD en je transactiegeschiedenis voor alle ondersteunde netwerken bekijken.',
      },
      {
        q: 'Wat weet wwwallet over mij?',
        a: 'Niets waarmee je geïdentificeerd kunt worden. Er is geen account, geen login en geen database. Saldo- en prijsgegevens worden opgehaald via de eigen backend van wwwallet, in plaats van dat je browser rechtstreeks bij externe providers inlogt, en die backend krijgt nooit je sleutels, wachtwoorden of herstelzin te zien.',
      },
    ],
  },
  footer: {
    tagline: 'Een gratis, non-custodial Ethereum-wallet voor iedereen.',
    copyright: '© {year} wwwallet',
    licenseLink: 'Licentie onder PolyForm Strict 1.0.0',
    disclaimer:
      'Non-custodial software wordt geleverd ‘zoals het is’, zonder garantie. Dit is geen financieel advies. Je bent zelf volledig verantwoordelijk voor je sleutels en je geld.',
  },
  principles: {
    eyebrow: 'Uitgangspunten',
    heading: 'Gratis, open en gemaakt voor iedereen',
    lede: 'Software die je geld bewaart, moet een hulpmiddel zijn dat je gebruikt, geen bedrijf dat op zijn gebruikers is gebouwd. Dit zijn de principes waarop wwwallet is gebaseerd.',
    items: [
      {
        title: 'Gratis, zonder addertjes onder het gras',
        body: 'Geen prijzen, geen premium-abonnement, geen betaalde functies. wwwallet rekent zelf geen kosten – de enige kosten zijn de transactiekosten van het netwerk zelf.',
      },
      {
        title: 'Geen advertenties, geen tracking',
        body: 'Geen advertenties, geen analytics, geen trackingscripts en er worden geen gegevens aan iemand verkocht. Er is sowieso geen profiel van jou om te verkopen.',
      },
      {
        title: 'Geen aanmelding',
        body: 'Geen e-mail, telefoonnummer of identiteitscontrole. Open de app, maak een wallet aan en je bent klaar.',
      },
      {
        title: 'Je sleutels blijven bij jou',
        body: 'Sleutels worden op je toestel aangemaakt en versleuteld en verlaten het nooit. wwwallet kan ze niet zien, je geld verplaatsen of je buitensluiten.',
      },
      {
        title: 'Werkt overal',
        body: 'Werkt in elke moderne browser op je telefoon of desktop, en je installeert het net als een app — je hebt geen app store-account nodig.',
      },
      {
        title: 'In 31 talen',
        body: 'Gebruik het in de taal waarin je je het meest op je gemak voelt, in de lichte of donkere modus.',
      },
      {
        title: 'Code in het openbaar',
        body: 'De volledige broncode is gepubliceerd zodat iedereen deze kan lezen en controleren. Het is ‘source-available’ in plaats van ‘open source’ — in de veelgestelde vragen wordt uitgelegd wat de licentie toestaat.',
      },
      {
        title: 'Niets om uit te schakelen',
        body: 'Er is geen account dat iemand kan blokkeren. Je geld staat op Ethereum zelf, en de sleutel van elk account kan op elk moment naar een andere wallet worden overgezet.',
      },
    ],
  },
  license: {
    title: 'Licentie',
    close: 'Sluiten',
    summaryTitle: 'In gewoon Engels',
    canUse:
      'Je kunt wwwallet gratis gebruiken, voor persoonlijke en andere niet-commerciële doeleinden.',
    canRead: 'Je kunt elke regel van de broncode lezen en controleren.',
    cannot: 'Je mag het niet kopiëren, wijzigen, doorgeven of verkopen.',
    englishNote:
      'Hieronder volgt de volledige licentie in het originele Engels — dit is de juridische tekst.',
    viewSource: 'Bekijk de broncode op GitHub',
  },
  meta: {
    title: 'wwwallet — Gratis, non-custodial Ethereum-wallet',
    description:
      'Gratis Ethereum-wallet in je browser. Geen aanmelding, geen advertenties, geen tracking — je sleutels blijven versleuteld op je apparaat. Ethereum, Arbitrum, Base, Optimism en Polygon.',
  },
}
