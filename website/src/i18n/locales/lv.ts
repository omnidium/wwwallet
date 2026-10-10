export default {
  nav: {
    wallet: 'wwwallet',
    ethereum: 'Ethereum',
    crypto: 'Kriptovalūta',
    faqs: 'Bieži uzdotie jautājumi',
    launch: 'Palaižiet wwwallet',
    home: 'Atgriezties uz sākumu',
    sectionNavLabel: 'Sadaļu navigācija',
    principles: 'Principi',
  },
  settings: {
    open: 'Iestatījumi',
    close: 'Aizvērt iestatījumus',
    theme: 'Tēma',
    themeLight: 'Viegli',
    themeDark: 'Tumšs',
    language: 'Valoda',
    search: 'Meklēt',
    noMatches: 'Nav atbilžu',
    version: 'Versija {version}',
  },
  hero: {
    eyebrow: 'Bezmaksas, bez starpnieka Ethereum maku',
    heading1: 'Jūsu atslēgas.',
    heading2: 'Jūsu ierīce.',
    heading3: 'Bezmaksas visiem.',
    lede: 'wwwallet darbojas jūsu pārlūkprogrammā un glabā jūsu atslēgas šifrētā veidā jūsu paša ierīcē. Nav jāizveido konts, nav jāmaksā un nav reklāmu, un tas darbojas vienādi visiem.',
    ctaPrimary: 'Palaižiet wwwallet',
    ctaSecondary: 'Uzziniet, kā tas darbojas',
    note: 'Nav reģistrācijas · Nav reklāmu · Nav izsekošanas · 31 valoda',
  },
  wallet: {
    eyebrow: 'wwwallet',
    heading: 'Izstrādāta tā, lai to varētu atvērt tikai jūs',
    lede: 'wwwallet neuzglabā jūsu līdzekļus — tā palīdz jums tos glabāt pašiem. Šeit ir izskaidrots, ko tas nozīmē praksē.',
    points: [
      {
        title: 'Bez glabāšanas, vienmēr',
        body: 'Jūsu privātās atslēgas tiek ģenerētas un šifrētas jūsu paša ierīcē. wwwallet serveri tās nekad neredz — nav nekādas atslēgu datu bāzes, ko varētu uzlauzt, jo tādas vispār nav.',
      },
      {
        title: 'Šifrēts ar AES-256, atbloķējams pēc jūsu izvēles',
        body: 'Jūsu seifs ir aizsargāts ar AES-256-GCM šifrēšanu. Atbloķējiet to ar savu atjaunošanas frāzi vai aktivizējiet piekļuves atslēgu — Face ID, Touch ID vai Windows Hello —, lai nodrošinātu ātru piekļuvi tikai lokāli.',
      },
      {
        title: 'Automātiski bloķējas',
        body: '„wwwallet“ bloķējas pēc īsa bezdarbības perioda un nekad neieraksta jūsu atbloķēto sesiju diskā — aizveriet cilni, un tā to apzināti aizmirst.',
      },
      {
        title: 'Piecpadsmit Ethereum tīkli, viens kontu kopums',
        body: 'Glabājiet un sūtiet caur Ethereum galveno tīklu un vēl 14 tīkliem — tostarp Arbitrum, Base, Optimism, Polygon, Linea un ZKsync — izmantojot tos pašus kontus un adreses.',
      },
    ],
    caveatTitle: 'Jūsu atjaunošanas frāze atslēdz jūsu seifu — tā nav maģiska rezerves kopija',
    caveatBody:
      'Saglabājiet savu atjaunošanas frāzi drošā vietā, bet izveidojiet arī dublējumu Google Drive vai failā. Dublējums būs nepieciešams, lai atjaunotu savu maku jaunā ierīcē, un frāze – lai to atbloķētu, kad tas būs izdarīts.',
    caveatLink: 'Lasiet vairāk bieži uzdotajos jautājumos',
  },
  ethereum: {
    eyebrow: 'Ethereum',
    heading: 'Kāpēc Ethereum',
    lede: '„wwwallet“ ir izstrādāta tieši Ethereum vajadzībām. Šeit ir tās priekšrocības, izklāstītas vienkāršā valodā.',
    points: [
      {
        title: 'Pasaules dators, nevis tikai grāmata',
        body: 'Ethereum pārņēma Bitcoin ideju par kopīgu, pret viltojumiem aizsargātu reģistru un to paplašināja: globāls, programmējams dators, uz kura pamata ikviens var veidot, un neviena atsevišķa puse to nevar izslēgt.',
      },
      {
        title: 'Aizsargāts ar stakingu, nevis ar ieguvi',
        body: 'Kopš „The Merge“ 2022. gadā Ethereum drošību nodrošina Proof-of-Stake, nevis energoietilpīga ieguve — validatori kā ķīlu izmanto ETH, nevis patērē elektrību, lai sacenstos par blokiem.',
      },
      {
        title: 'Atvērta un bez atļaujām',
        body: 'Neviens neapstiprina jūsu kontu. Jebkurš cilvēks jebkurā vietā var turēt ETH vai izstrādāt lietotni uz Ethereum — vienādi noteikumi attiecas uz visiem, ieskaitot lielākās iestādes.',
      },
      {
        title: 'Standarts, uz kura balstās citi tīkli',
        body: '2. slāņa tīkli, piemēram, „Arbitrum”, „Base” un „Optimism” — visi atbalstīti „wwwallet” — paplašina „Ethereum” drošību, nodrošinot ātrākus un lētākus darījumus, nevis sākot no nulles.',
      },
    ],
    linkLabel: 'Lasiet vairāk Ethereum Foundation mājaslapā',
    linkUrl: 'https://ethereum.org/en/foundation/',
  },
  crypto: {
    eyebrow: 'Kriptovalūta',
    heading: 'Kriptovalūtas vienkāršā valodā',
    lede: 'Daži jēdzieni, kurus ir vērts izprast, pirms sākat turēt kriptovalūtu — ne tikai ar wwwallet.',
    points: [
      {
        title: 'Aizbildnieciskais vs. neaizbildnieciskais',
        body: 'Aizbildniecības maku vai birža glabā jūsu atslēgas jūsu vietā — tas ir ērti, taču jūs uzticaties kādam citam, ka viņš neiesaldēs, nezaudēs vai nepareizi neizmantos jūsu līdzekļus. Bez aizbildniecības maku, piemēram, wwwallet, atslēgas un atbildība paliek tikai jūsu rokās.',
      },
      {
        title: 'Staking pret kalnrūpniecību',
        body: '„Proof-of-Work“ (darba pierādījums) ieguve nodrošina blokķēdes drošību, izmantojot neapstrādātu skaitļošanas jaudu un elektrību. „Proof-of-Stake“ (likmes pierādījums) to nodrošina, izmantojot riska kapitālu. Pāreja uz stakingu samazināja Ethereum enerģijas patēriņu par vairāk nekā 99,9 % — aptuveni tik, cik ir starpība starp mazas valsts un mazas pilsētas enerģijas patēriņu.',
      },
      {
        title: 'Pār Ethereum',
        body: 'Bitcoin priekšroku dod vienkāršībai un paredzamībai, nevis programmējamībai. Tādi tīkli kā Solana cenšas panākt maksimālu caurlaidspēju, bieži vien upurējot decentralizāciju, lai to sasniegtu. Ethereum vispirms orientējas uz decentralizāciju un drošību, bet ātrumu un izmaksas atstāj Layer-2 tīkliem, kas ir uzbūvēti uz tā bāzes.',
      },
      {
        title: 'Neviens uzticams cilvēks nelūdz jūsu frāzi',
        body: 'Ne birža, ne atbalsta darbinieks, ne arī kāds no „wwwallet“ darbiniekiem nekad nelūgs jūsu atjaunošanas frāzi — neatkarīgi no tā, kuru lietotni izmantojat. Ikviens, kurš to dara, mēģina jūs aplaupīt.',
      },
    ],
    linkLabel: 'Uzziniet vairāk, klausoties „Bankless“ podkāstu',
    linkUrl: 'https://www.bankless.com/',
  },
  faqs: {
    eyebrow: 'Bieži uzdotie jautājumi',
    heading: 'Bieži uzdotie jautājumi',
    items: [
      {
        q: 'Vai wwwallet patiešām ir bezmaksas?',
        a: 'Jā. Tās izmantošana ir bez maksas, nav premium līmeņa un nekādu maksas barjeru, un wwwallet nepiemēro komisijas maksu par jebkuru jūsu nosūtīto vai apmainīto summu. Vienīgās neizbēgamās izmaksas ir tīkla paša transakciju (gāzes) maksa, kas nonāk tīklam, nevis wwwallet. Apmaiņas kotācijas nāk no 0x biržu agregatora (vai LI.FI, tīklos, kurus 0x neaptver), kas dažos darījumos var iekļaut savu komisiju — jebkura šāda komisija tiek norādīta pārskata ekrānā, pirms jūs apstiprināt darījumu.',
      },
      {
        q: 'Vai ir reklāmas, izsekošanas rīki vai analītika?',
        a: 'Nē. wwwallet neparāda reklāmas, neizmanto analītikas vai izsekošanas skriptus un neveido jūsu profilu. Nav konta, tāpēc nav arī nekā, ar ko to saistīt.',
      },
      {
        q: 'Vai, lai to izmantotu, man ir nepieciešams konts vai personas apliecība?',
        a: 'Nē. Nav ne reģistrācijas, ne e-pasta adreses, ne tālruņa numura, ne identitātes pārbaudes — jūs izveidojat maku savā ierīcē un sākat to lietot.',
      },
      {
        q: 'Ja tā ir bezmaksas, kā tad wwwallet sedz savas izmaksas?',
        a: 'Tā negūst peļņu no saviem lietotājiem — nav komisijas maksas, nav reklāmu, nav datu pārdošanas. Ekspluatācijas izmaksas ir apzināti saglabātas zemas: pati lietotne darbojas jūsu pārlūkprogrammā, un serveris tikai pārsūta publiskos blokķēdes un cenu datus.',
      },
      {
        q: 'Vai kāds var iesaldēt manu maku?',
        a: 'Nav nekāda konta, tāpēc wwwallet — vai jebkuram citam — nav ko iesaldēt. Jūsu atslēgas nekad neiziet ārpus jūsu ierīces, un darījumi tiek parakstīti tajā, pirms tie tiek nosūtīti tīklam. Jūsu līdzekļi atrodas „Ethereum”, nevis „wwwallet”: jūs varat apskatīt jebkura konta privāto atslēgu vai atjaunošanas frāzi no tā izvēlnes un importēt to jebkurā citā „Ethereum” maku lietotnē, kad vien vēlaties.',
      },
      {
        q: 'Vai mana atjaunošanas frāze ir pietiekama, lai atgūtu savu maku?',
        a: 'Neatkarīgi no tā. Jūsu atjaunošanas frāze atbloķē jūsu šifrēto seifu, bet pats seifs atrodas tikai jūsu ierīcē. Ja jūs pazaudējat vai izdzēšat šo ierīci, neizveidojot dublējumu, frāzei vairs nebūs ko atbloķēt. Vienmēr saglabājiet savu atjaunošanas frāzi kopā ar dublējumu Google Drive vai failā — skatiet nākamo jautājumu.',
      },
      {
        q: 'Kā veikt savas makas dublējumu?',
        a: 'Iestatījumos izveidojiet savas šifrētās glabātavas dublējumu savā „Google Drive“ vai kā failu, ko lejupielādējat un glabājat paši. „Drive“ dublējums tiek saglabāts privātā lietotnes mapē, un „wwwallet“ nevar redzēt neko citu jūsu „Drive“. Izveidojiet dublējumu, kad pirmo reizi veicat iestatīšanu, un atkārtoti ikreiz, kad pievienojat kontus.',
      },
      {
        q: 'Vai es varu izmantot wwwallet vairākās ierīcēs?',
        a: 'Jā, taču tā nesinhronizējas automātiski — katrai ierīcei ir sava lokālā glabātava. Lai izmantotu wwwallet jaunā ierīcē, atjaunojiet to no „Drive“ vai faila dublējuma, pēc tam atbloķējiet ar savu atjaunošanas frāzi.',
      },
      {
        q: 'Kas notiks, ja es pazaudēšu savu ierīci un nekad neesmu veicis dublējumu?',
        a: 'Jūsu līdzekļus nav iespējams atgūt. Tas ir paredzēts: wwwallet nav kontu sistēmas un nekur nesaglabā jūsu seifa kopiju, tāpēc neviens — ieskaitot mūs — nevar to atjaunot jūsu vietā. Tas ir kompromiss par atslēgām, kurām piekļūt var tikai jūs.',
      },
      {
        q: 'Vai piekļuves atslēgas (Face ID / Touch ID) tiek pārnestas uz jaunu ierīci?',
        a: 'Nē. Piekļuves atslēga ir piesaistīta ierīcei, uz kuras tā tika izveidota. Pēc dublējuma atjaunošanas jaunā ierīcē atbloķējiet to ar savu atjaunošanas frāzi, un tur varēsiet iestatīt jaunu piekļuves atslēgu.',
      },
      {
        q: 'Vai wwwallet ir atvērtā koda?',
        a: 'Nē — tā ir pieejama avota kodā. Pilnais avota kods ir publiski pieejams GitHub, tādējādi ikviens to var lasīt, pārskatīt un pārbaudīt, taču tas nav atvērtā koda projekts: kods ir licencēts saskaņā ar PolyForm Strict License 1.0.0.',
      },
      {
        q: 'Ko man ir atļauts darīt ar kodu?',
        a: 'Jūs varat to visu lasīt un pārbaudīt, kā arī izmantot nemodificētu kopiju nekomerciāliem mērķiem, piemēram, personīgai apguvei, pētniecībai un testēšanai. Jūs nedrīkstat to izplatīt, modificēt vai veidot atvasinātos darbus (ieskaitot atzarojumus), kā arī izmantot to komerciāli. Ja jums ir nepieciešams kaut kas, ko licence neļauj, sazinieties ar autortiesību īpašnieku, lai saņemtu atsevišķu licenci.',
      },
      {
        q: 'Vai wwwallet ir droši lietot? Vai ir kāda garantija?',
        a: 'wwwallet ir bezuzraudzības programmatūra, kas tiek piedāvāta „tādā stāvoklī, kādā tā ir”, bez jebkāda veida garantijas. Tikai jūs pats kontrolējat savas atslēgas un līdzekļus — neviens, ieskaitot mūs, nevar atgūt zaudētu atjaunošanas frāzi vai dublējumu, atcelt darījumu vai kompensēt jums zaudējumus. Izmantojiet tikai tos līdzekļus, kuru zaudēšanu varat atļauties, pirms nosūtīšanas rūpīgi pārbaudiet adreses un tīklus, un nekas šeit nav uzskatāms par finanšu, ieguldījumu, juridisku vai nodokļu konsultāciju.',
      },
      {
        q: 'Kādus tīklus atbalsta wwwallet?',
        a: 'Ethereum galvenais tīkls, kā arī Arbitrum, Base, Optimism, Polygon, Robinhood Chain, World Chain, Ink, Linea, Gnosis, Celo, ZKsync Era, Ronin, Unichain un Scroll — visi no viena un tā paša kontu kopuma.',
      },
      {
        q: 'Kā es varu papildināt savu maku?',
        a: 'Atveriet kontu, izvēlieties „Skatīt QR kodu”, lai redzētu tā adresi, un nosūtiet līdzekļus uz šo adresi no biržas vai citas makas. Pārliecinieties, ka nosūtāt pareizajā tīklā (piemēram, Ethereum, Base vai Arbitrum) — viena un tā pati adrese darbojas visos atbalstītajos tīklos, bet līdzekļi, kas nosūtīti vienā tīklā, parādās tikai šajā tīklā. Jums būs nepieciešams arī neliels daudzums tīkla vietējās monētas (piemēram, ETH), lai segtu transakciju komisijas maksas.',
      },
      {
        q: 'Ko es varu darīt ar wwwallet?',
        a: 'Sūtīt: pārskaitiet ETH vai jebkuru žetonu uz adresi, kuru ielīmējat, ieskenējat no QR koda vai izvēlaties no saviem kontiem, un pārskatiet informāciju, pirms apstiprināt. Apmainīt: apmainiet vienu žetonu pret citu tajā pašā tīklā, izmantojot cilni „Swap”, kurā jau sākumā tiek parādīts kotējums un provizoriskā komisijas maksa. Saņemt: parādiet savu adresi kā QR kodu. Jūs varat arī apskatīt savus atlikumus USD vērtībā un darījumu vēsturi visos atbalstītajos tīklos.',
      },
      {
        q: 'Ko wwwallet zina par mani?',
        a: 'Nekas, kas varētu identificēt jūs. Nav nekāda konta, pieteikšanās vai datu bāzes. Dati par atlikumu un cenām tiek iegūti caur wwwallet paša backend, nevis caur jūsu pārlūku, kas tieši sazinās ar trešo pušu pakalpojumu sniedzējiem, un šis backend nekad neredz jūsu atslēgas, paroles vai atjaunošanas frāzi.',
      },
    ],
  },
  footer: {
    tagline: 'Bezmaksas, neuzraudzīta Ethereum maku lietotne ikvienam.',
    copyright: '© {year} wwwallet',
    licenseLink: 'Licencēts saskaņā ar PolyForm Strict 1.0.0',
    disclaimer:
      'Programmatūra bez glabāšanas tiek nodrošināta „tādā stāvoklī, kādā tā ir”, bez garantijas. Tas nav finanšu padoms. Jūs esat vienīgais atbildīgais par savām atslēgām un līdzekļiem.',
  },
  principles: {
    eyebrow: 'Principi',
    heading: 'Bezmaksas, atvērta un radīta ikvienam',
    lede: 'Programmatūrai, kas glabā jūsu naudu, jābūt rīkam, ko jūs izmantojat, nevis uzņēmumam, kas balstās uz saviem lietotājiem. Tie ir principi, uz kuriem balstās wwwallet.',
    items: [
      {
        title: 'Bezmaksas, bez slēptām nosacījumiem',
        body: 'Nekādas cenas, nekādi premium līmeņi, nekādas maksas funkcijas. „wwwallet“ nepiemēro nekādas savas komisijas — vienīgās izmaksas ir tīkla darījumu komisijas maksa.',
      },
      {
        title: 'Bez reklāmām, bez izsekošanas',
        body: 'Nekādas reklāmas, nekāda analītika, nekādi izsekošanas skripti un nekādi dati netiek pārdoti nevienam. Pirmkārt, nav nekāda jūsu profila, ko pārdot.',
      },
      {
        title: 'Nav nepieciešama reģistrācija',
        body: 'Nav nepieciešama e-pasta, tālruņa numura vai personas identifikācijas pārbaude. Atveriet lietotni, izveidojiet maku, un jūs esat gatavs.',
      },
      {
        title: 'Jūsu atslēgas paliek pie jums',
        body: 'Atslēgas tiek izveidotas un šifrētas jūsu ierīcē un nekad to neiziet. wwwallet nevar tās redzēt, pārvietot jūsu līdzekļus vai bloķēt jūsu piekļuvi.',
      },
      {
        title: 'Darbojas jebkur',
        body: 'Darbojas jebkurā modernā pārlūkprogrammā viedtālrunī vai datorā un instalējas kā lietotne — nav nepieciešams konts lietotņu veikalā.',
      },
      {
        title: '31 valodā',
        body: 'Lietojiet to valodā, kurā jums ir visērtāk, gan gaišajā, gan tumšajā režīmā.',
      },
      {
        title: 'Atklāts kods',
        body: 'Pilnais avota kods ir publicēts, lai ikviens to varētu izlasīt un pārbaudīt. Tas ir „source-available”, nevis „open source” — bieži uzdotajos jautājumos ir izskaidrots, ko atļauj licence.',
      },
      {
        title: 'Nekas nav jāizslēdz',
        body: 'Nav nekāda konta, ko kāds varētu iesaldēt. Jūsu līdzekļi atrodas pašā Ethereum tīklā, un jebkura konta atslēgu jebkurā brīdī var pārnest uz citu maku.',
      },
    ],
  },
  license: {
    title: 'Licence',
    close: 'Aizvērt',
    summaryTitle: 'Vienkāršā valodā',
    canUse: 'Jūs varat izmantot wwwallet bez maksas personīgiem un citiem nekomerciāliem mērķiem.',
    canRead: 'Jūs varat izlasīt un pārbaudīt katru tās avota koda rindu.',
    cannot: 'Jūs nedrīkstat to kopēt, mainīt, izplatīt vai pārdot.',
    englishNote:
      'Pilnā licences versija ir pievienota tās oriģinālajā angļu valodā — tas ir juridisks teksts.',
    viewSource: 'Skatīt avotu GitHub',
  },
  meta: {
    title: 'wwwallet — bezmaksas, neuzraudzīta Ethereum maku lietotne',
    description:
      'Bezmaksas Ethereum maku jūsu pārlūkprogrammā. Nav reģistrācijas, nav reklāmu, nav izsekošanas — jūsu atslēgas paliek šifrētas jūsu ierīcē. Ethereum, Base, Arbitrum, Optimism, Polygon un vēl 10 tīkli.',
  },
}
