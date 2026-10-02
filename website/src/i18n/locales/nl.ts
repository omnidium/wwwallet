export default {
  nav: {
    wallet: 'Portemonnee',
    ethereum: 'Ethereum',
    crypto: 'Crypto',
    faqs: 'Veelgestelde vragen',
    launch: 'Portemonnee starten',
    home: 'Terug naar boven',
    sectionNavLabel: 'Navigatie door de rubrieken',
    principles: 'Beginselen',
  },
  settings: {
    open: 'Instellingen',
    close: 'Instellingen sluiten',
    theme: 'Thema',
    themeLight: 'Licht',
    themeDark: 'Donker',
    language: 'Taal',
    search: 'Zoeken',
    noMatches: 'Geen resultaten',
  },
  hero: {
    eyebrow: 'Een gratis Ethereum-wallet zonder bewaring',
    heading1: 'Je sleutels.',
    heading2: 'Je apparaat.',
    heading3: 'Gratis voor iedereen.',
    lede: 'wwwallet draait in je browser en bewaart je sleutels versleuteld op je eigen apparaat. Je hoeft geen account aan te maken, niets te betalen en er zijn geen advertenties — gewoon een portemonnee die voor iedereen op dezelfde manier werkt.',
    ctaPrimary: 'Portemonnee openen',
    ctaSecondary: 'Bekijk hoe het werkt',
    note: 'Geen registratie · Geen advertenties · Geen tracking · 31 talen',
  },
  wallet: {
    eyebrow: 'Portemonnee',
    heading: 'Zo ontworpen dat alleen jij hem kunt openen',
    lede: 'wwwallet bewaart je geld niet — het helpt je om het zelf te beheren. Dit is wat dat in de praktijk inhoudt.',
    points: [
      {
        title: 'Zonder bewaring, altijd',
        body: 'Je privésleutels worden op je eigen apparaat gegenereerd en versleuteld. De servers van wwwallet krijgen ze nooit te zien — er is geen database met wallets die gehackt kan worden, omdat er helemaal geen database is.',
      },
      {
        title: 'Versleuteld met AES-256, ontgrendelen op jouw manier',
        body: 'Je kluis is beveiligd met AES-256-GCM-versleuteling. Ontgrendel de kluis met je herstelzin of schakel een toegangscode in — Face ID, Touch ID of Windows Hello — voor snelle toegang, uitsluitend lokaal.',
      },
      {
        title: 'Vergrendelt zichzelf automatisch',
        body: 'wwwallet vergrendelt na een korte periode van inactiviteit en slaat je ontgrendelde sessie nooit op schijf op — sluit je het tabblad, dan vergeet het dit bewust.',
      },
      {
        title: 'Eén wallet, vijf Ethereum-netwerken',
        body: 'Bewaar en verstuur via het Ethereum-mainnet, Polygon, Arbitrum, Base en Optimism vanuit dezelfde reeks accounts.',
      },
    ],
    caveatTitle: 'Je herstelzin geeft je kluis toegang — het is geen magische back-up',
    caveatBody:
      'Bewaar je herstelzin op een veilige plek, maar maak ook een back-up op Google Drive of in een bestand. Je hebt de back-up nodig om je portemonnee op een nieuw apparaat te herstellen, en de herstelzin om deze vervolgens te ontgrendelen.',
    caveatLink: 'Lees meer in de veelgestelde vragen',
  },
  ethereum: {
    eyebrow: 'Ethereum',
    heading: 'Waarom Ethereum?',
    lede: 'wwwallet is specifiek rond Ethereum opgezet. Hier volgt een eenvoudige uitleg waarom dat zo is.',
    points: [
      {
        title: 'Een wereldcomputer, niet zomaar een grootboek',
        body: 'Ethereum nam het idee van Bitcoin van een gedeeld, fraudebestendig grootboek over en breidde dit uit: een wereldwijde, programmeerbare computer waarop iedereen kan voortbouwen en die door geen enkele partij kan worden uitgeschakeld.',
      },
      {
        title: 'Beveiligd door staking, niet door mining',
        body: 'Sinds „de Merge“ in 2022 wordt Ethereum beveiligd door middel van Proof-of-Stake in plaats van energie-intensieve mining — validators zetten ETH in als onderpand in plaats van elektriciteit te verbruiken om te strijden om blokken.',
      },
      {
        title: 'Open en zonder toestemming',
        body: 'Niemand keurt je account goed. Iedereen, waar dan ook, kan ETH bezitten of een applicatie op Ethereum bouwen — voor iedereen gelden dezelfde regels, ook voor de grootste instellingen.',
      },
      {
        title: 'De standaard waarop andere netwerken voortbouwen',
        body: 'Layer-2-netwerken zoals Arbitrum, Base en Optimism — die allemaal worden ondersteund in wwwallet — breiden de beveiliging van Ethereum uit naar snellere en goedkopere transacties, in plaats van helemaal opnieuw te beginnen.',
      },
    ],
    linkLabel: 'Lees meer op de website van de Ethereum Foundation',
    linkUrl: 'https://ethereum.org/en/foundation/',
  },
  crypto: {
    eyebrow: 'Crypto',
    heading: 'Cryptovaluta, in eenvoudige bewoordingen',
    lede: 'Een paar zaken die je goed moet begrijpen voordat je zelf cryptovaluta gaat bezitten — niet alleen via wwwallet.',
    points: [
      {
        title: 'Met voogdij versus zonder voogdij',
        body: 'Een custodial wallet of exchange bewaart je sleutels voor je — handig, maar je vertrouwt erop dat iemand anders je geld niet blokkeert, kwijtraakt of misbruikt. Bij een non-custodial wallet zoals wwwallet liggen de sleutels, en de verantwoordelijkheid, volledig in jouw handen.',
      },
      {
        title: 'Staking versus mining',
        body: 'Bij Proof-of-Work-mining wordt een blockchain beveiligd met ruwe rekenkracht en elektriciteit. Bij Proof-of-Stake gebeurt dit in plaats daarvan met kapitaal dat op het spel staat. Door de overstap naar staking heeft Ethereum zijn energieverbruik met meer dan 99,9% teruggedrongen — ongeveer het verschil tussen de energiebehoefte van een klein land en die van een klein stadje.',
      },
      {
        title: 'Verder dan Ethereum',
        body: 'Bitcoin geeft voorrang aan eenvoud en voorspelbaarheid boven programmeerbaarheid. Blockchains zoals Solana richten zich op maximale doorvoercapaciteit, waarbij vaak decentralisatie wordt opgeofferd om dat doel te bereiken. Ethereum legt de nadruk op decentralisatie en veiligheid, en laat snelheid en kosten over aan Layer-2-netwerken die daarop zijn gebouwd.',
      },
      {
        title: 'Niemand die het serieus meent, vraagt om je wachtwoord',
        body: 'Welke portemonnee je ook gebruikt: geen enkele beurs, geen enkele klantenservicemedewerker en geen enkele medewerker van wwwallet zal ooit naar je herstelzin vragen. Iedereen die dat wel doet, probeert je te beroven.',
      },
    ],
    linkLabel: 'Duik dieper in de materie met de Bankless-podcast',
    linkUrl: 'https://www.bankless.com/',
  },
  faqs: {
    eyebrow: 'Veelgestelde vragen',
    heading: 'Veelgestelde vragen',
    items: [
      {
        q: 'Is wwwallet echt gratis?',
        a: 'Ja. Het gebruik is gratis, er is geen premium-abonnement en er is niets achter een betaalmuur, en wwwallet rekent geen extra kosten aan voor wat je ook verstuurt of ruilt. De enige onvermijdelijke kosten zijn de transactiekosten (gas) van het netwerk zelf, die naar het netwerk gaan en niet naar wwwallet. Ruilkoersen zijn afkomstig van de 0x-beursaggregator, die bij sommige transacties een eigen vergoeding in rekening kan brengen — een dergelijke vergoeding wordt weergegeven op het bevestigingsscherm voordat je de transactie bevestigt.',
      },
      {
        q: 'Zijn er advertenties, trackers of analyse-instrumenten?',
        a: 'Nee. wwwallet toont geen advertenties, gebruikt geen analyse- of trackingscripts en stelt geen profiel van je samen. Er is geen account, dus er is niets waaraan je iets kunt koppelen.',
      },
      {
        q: 'Heb ik een account of een identiteitsbewijs nodig om er gebruik van te maken?',
        a: 'Nee. Je hoeft je niet te registreren en er is geen e-mailadres, telefoonnummer of identiteitscontrole nodig — je maakt gewoon een wallet aan op je apparaat en kunt deze meteen gebruiken.',
      },
      {
        q: 'Als het gratis is, hoe verdient wwwallet dan geld?',
        a: 'Het verdient geen geld aan zijn gebruikers — geen kosten, geen advertenties, geen verkoop van gegevens. De exploitatiekosten worden bewust laag gehouden: de wallet zelf draait in je browser en de backend geeft alleen openbare blockchain- en prijsgegevens door.',
      },
      {
        q: 'Kan iemand mijn portemonnee blokkeren?',
        a: 'Er is geen account, dus er valt niets te bevriezen voor wwwallet — of wie dan ook. Je sleutels verlaten je apparaat nooit, en transacties worden daar ondertekend voordat ze naar het netwerk worden verzonden. Je saldo staat op Ethereum, niet in wwwallet: je kunt de privésleutel of herstelzin van elke account bekijken via het menu en deze op elk gewenst moment importeren in een andere Ethereum-portemonnee.',
      },
      {
        q: 'Is mijn herstelzin voldoende om mijn portemonnee terug te krijgen?',
        a: 'Op zichzelf niet. Je herstelzin ontgrendelt je versleutelde kluis, maar de kluis zelf staat alleen op je apparaat. Als je dat apparaat kwijtraakt of wist zonder ooit een back-up te hebben gemaakt, is er niets meer over dat met de herstelzin kan worden ontgrendeld. Zorg er altijd voor dat je je herstelzin combineert met een back-up op Google Drive of in een bestand — zie de volgende vraag.',
      },
      {
        q: 'Hoe maak ik een back-up van mijn wallet?',
        a: 'Maak via ‘Instellingen’ een back-up van je versleutelde kluis naar je eigen Google Drive — opgeslagen in een privé-map die alleen voor de app toegankelijk is en waarvan wwwallet de rest niet kan zien — of als een bestand dat je downloadt en zelf bewaart. Doe dit telkens wanneer je een portemonnee instelt of nieuwe rekeningen toevoegt.',
      },
      {
        q: 'Kan ik wwwallet op meer dan één apparaat gebruiken?',
        a: 'Ja, maar het wordt niet automatisch gesynchroniseerd — elk apparaat heeft zijn eigen lokale kluis. Om wwwallet op een nieuw apparaat te gebruiken, moet je het daar herstellen vanuit een back-up op Drive of in een bestand, en vervolgens ontgrendelen met je herstelzin.',
      },
      {
        q: 'Wat gebeurt er als ik mijn apparaat kwijtraak en er nooit een back-up van heb gemaakt?',
        a: 'Uw geld is onherstelbaar. Dat is zo bedoeld: wwwallet heeft geen accountsysteem en bewaart nergens een kopie van uw kluis, dus niemand — ook wij niet — kan deze voor u herstellen. Dat is de afweging die hoort bij een portemonnee waar alleen u toegang toe hebt.',
      },
      {
        q: 'Worden de toegangscodes (Face ID / Touch ID) overgezet naar een nieuw apparaat?',
        a: 'Nee. Een toegangscode is gekoppeld aan het apparaat waarop deze is aangemaakt. Nadat je een back-up op een nieuw apparaat hebt hersteld, ontgrendel je het apparaat met je herstelzin en kun je daar een nieuwe toegangscode instellen.',
      },
      {
        q: 'Is wwwallet open source?',
        a: 'Nee — de broncode is beschikbaar. De volledige broncode staat openbaar op GitHub, zodat iedereen deze kan lezen, beoordelen en controleren, maar het is geen open source: de code valt onder de PolyForm Strict License 1.0.0.',
      },
      {
        q: 'Wat mag ik met de code doen?',
        a: 'U mag het geheel lezen en controleren, en een ongewijzigde kopie gebruiken voor niet-commerciële doeleinden, zoals persoonlijke studie, onderzoek en het uitvoeren van tests. U mag het niet verspreiden, wijzigen of er afgeleide werken van maken (inclusief forks), noch het commercieel gebruiken. Als u iets nodig hebt wat de licentie niet toestaat, neem dan contact op met de auteursrechthebbende voor een afzonderlijke licentie.',
      },
      {
        q: 'Is wwwallet veilig in gebruik? Is er garantie?',
        a: 'wwwallet is non-custodial software die wordt aangeboden “zoals ze is”, zonder enige vorm van garantie. U bent de enige die de controle heeft over uw sleutels en uw geld — niemand, ook wij niet, kan een verloren herstelzin of back-up terugvinden, een transactie ongedaan maken of u schadeloos stellen voor verliezen. Gebruik alleen geld dat u zich kunt veroorloven te verliezen, controleer adressen en netwerken zorgvuldig voordat u geld verstuurt, en niets in deze tekst is bedoeld als financieel, beleggings-, juridisch of fiscaal advies.',
      },
      {
        q: 'Welke netwerken ondersteunt wwwallet?',
        a: 'Het Ethereum-mainnet, plus de Layer-2-netwerken Polygon, Arbitrum, Base en Optimism — allemaal vanuit dezelfde reeks accounts.',
      },
      {
        q: 'Hoe zet ik geld op mijn wallet?',
        a: 'Open een account, kies ‘QR-code weergeven’ om het adres te zien en stuur geld naar dat adres vanuit een beurs of een andere wallet. Zorg ervoor dat je via het juiste netwerk verstuurt (Ethereum, Polygon, Arbitrum, Base of Optimism) — hetzelfde adres werkt op al deze netwerken, maar geld dat via het ene netwerk wordt verstuurd, verschijnt alleen op dat netwerk. Je hebt ook een klein beetje van de eigen munt van het netwerk (zoals ETH) nodig om transactiekosten te betalen.',
      },
      {
        q: 'Wat kan ik doen met wwwallet?',
        a: 'Verzenden: maak ETH of een willekeurig token over naar een adres dat je plakt, scant via een QR-code of selecteert uit je eigen accounts, en controleer de gegevens voordat je de transactie bevestigt. Ruilen: ruil het ene token in voor het andere binnen hetzelfde netwerk via het tabblad ‘Ruilen’, waarbij de koers en de geschatte kosten vooraf worden weergegeven. Ontvangen: toon je adres als een QR-code. Je kunt ook je saldi in USD bekijken en je transactiegeschiedenis over alle ondersteunde netwerken heen.',
      },
      {
        q: 'Wat weet wwwallet over mij?',
        a: 'Niets waarmee je geïdentificeerd kunt worden. Er is geen account, geen aanmelding en geen database. Saldo- en prijsgegevens worden opgehaald via de eigen backend van wwwallet, in plaats van dat je browser rechtstreeks een beroep doet op externe aanbieders, en die backend krijgt nooit je sleutels, wachtwoorden of herstelzin te zien.',
      },
    ],
  },
  footer: {
    tagline: 'Een gratis Ethereum-portemonnee zonder bewaring voor iedereen.',
    copyright: '© {year} wwwallet',
    licenseLink: 'Vrijgegeven onder de PolyForm Strict 1.0.0-licentie',
    disclaimer:
      'Software zonder bewaarplicht wordt geleverd “zoals ze is”, zonder garantie. Dit is geen financieel advies. U bent zelf volledig verantwoordelijk voor uw sleutels en uw geld.',
  },
  principles: {
    eyebrow: 'Beginselen',
    heading: 'Gratis, open en gemaakt voor iedereen',
    lede: 'Een portemonnee moet een hulpmiddel zijn dat je gebruikt, geen bedrijf dat zijn winst haalt uit zijn gebruikers. Dit zijn de uitgangspunten waarop wwwallet is gebaseerd.',
    items: [
      {
        title: 'Gratis, zonder addertjes onder het gras',
        body: 'Geen prijs, geen premium-abonnement, geen betaalde functies. wwwallet brengt zelf geen kosten in rekening — de enige kosten zijn de transactiekosten van het netwerk zelf.',
      },
      {
        title: 'Geen advertenties, geen tracking',
        body: 'Geen advertenties, geen analysegegevens, geen trackingscripts en er worden geen gegevens aan wie dan ook verkocht. Er is immers helemaal geen profiel van jou om te verkopen.',
      },
      {
        title: 'Geen registratie',
        body: 'Geen e-mailadres, telefoonnummer of identiteitscontrole. Open de app, maak een portemonnee aan en je bent klaar.',
      },
      {
        title: 'Je houdt je sleutels bij je',
        body: 'Sleutels worden op je apparaat aangemaakt en versleuteld en verlaten het apparaat nooit. wwwallet kan ze niet inzien, je geld niet verplaatsen en je ook niet de toegang ontzeggen.',
      },
      {
        title: 'Werkt overal',
        body: 'Werkt in elke moderne browser op je telefoon of computer en kan net als een app worden geïnstalleerd — je hebt geen account bij een app store nodig.',
      },
      {
        title: 'In 31 talen',
        body: 'Gebruik het in de taal waarin je je het meest op je gemak voelt, in de lichte of donkere modus.',
      },
      {
        title: 'Code in de openbaarheid',
        body: 'De volledige broncode is gepubliceerd, zodat iedereen deze kan lezen en controleren. Het gaat hier om ‘source-available’ in plaats van ‘open source’ — in de veelgestelde vragen wordt uitgelegd wat de licentie toestaat.',
      },
      {
        title: 'Niets om uit te schakelen',
        body: 'Er is geen account dat kan worden geblokkeerd. Je geld staat op het Ethereum-netwerk zelf, en de sleutel van elk account kan op elk moment naar een andere wallet worden overgezet.',
      },
    ],
  },
  license: {
    title: 'Licentie',
    close: 'Sluiten',
    summaryTitle: 'In gewone taal',
    canUse:
      'Je kunt wwwallet gratis gebruiken voor persoonlijke en andere niet-commerciële doeleinden.',
    canRead: 'Je kunt elke regel van de broncode lezen en controleren.',
    cannot: 'Je mag het niet kopiëren, wijzigen, doorgeven of verkopen.',
    englishNote:
      'Hieronder volgt de volledige vergunning in het oorspronkelijke Engels — dit is de juridische tekst.',
    viewSource: 'Bekijk op GitHub',
  },
}
