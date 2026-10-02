export default {
  nav: {
    wallet: 'Maks',
    ethereum: 'Ethereum',
    crypto: 'Kriptovalūta',
    faqs: 'Bieži uzdotie jautājumi',
    launch: 'Atvērt maku',
    home: 'Atgriezties uz sākumu',
    sectionNavLabel: 'Sadaļu navigācija',
    principles: 'Principi',
  },
  settings: {
    open: 'Iestatījumi',
    close: 'Aizvērt iestatījumus',
    theme: 'Tēma',
    themeLight: 'Gaisma',
    themeDark: 'Tumšs',
    language: 'Valoda',
    search: 'Meklēt',
    noMatches: 'Nav atbilžu',
  },
  hero: {
    eyebrow: 'Bezmaksas Ethereum maku bez glabāšanas funkcijas',
    heading1: 'Tavas atslēgas.',
    heading2: 'Jūsu ierīce.',
    heading3: 'Bez maksas visiem.',
    lede: 'wwwallet darbojas jūsu pārlūkprogrammā, un jūsu atslēgas tiek glabātas šifrētā veidā jūsu ierīcē. Nav jāizveido konts, nav jāmaksā un nav reklāmu — vienkārši elektroniskā maksa, kas visiem darbojas vienādi.',
    ctaPrimary: 'Atvērt maku',
    ctaSecondary: 'Uzziniet, kā tas darbojas',
    note: 'Nav jāreģistrējas · Nav reklāmu · Nav izsekošanas · 31 valoda',
  },
  wallet: {
    eyebrow: 'Maks',
    heading: 'Izgatavots tā, lai to varētu atvērt tikai tu',
    lede: 'wwwallet neuzglabā jūsu līdzekļus — tas palīdz jums tos uzglabāt pašiem. Lūk, ko tas nozīmē praksē.',
    points: [
      {
        title: 'Bez apcietināšanas, vienmēr',
        body: 'Jūsu privātie atslēgas tiek ģenerēti un šifrēti jūsu paša ierīcē. wwwallet serveri tos nekad neredz — nav nekādas maku datu bāzes, ko varētu uzlauzt, jo tādas vispār nav.',
      },
      {
        title: 'Šifrēts ar AES-256, atbloķējams pēc jūsu izvēles',
        body: 'Jūsu seifs ir aizsargāts ar AES-256-GCM šifrēšanu. Atbloķējiet to, izmantojot atjaunošanas frāzi, vai aktivizējiet piekļuves atslēgu — „Face ID“, „Touch ID“ vai „Windows Hello“ —, lai nodrošinātu ātru piekļuvi, kas darbojas tikai lokāli.',
      },
      {
        title: 'Automātiski aizslēdzas',
        body: 'wwwallet bloķējas pēc īsa bezdarbības perioda un nekad neieraksta atbloķēto sesiju diskā — aizveriet cilni, un programma to apzināti aizmirst.',
      },
      {
        title: 'Viena elektroniskā maksa, pieci Ethereum tīkli',
        body: 'Glabājiet un nosūtiet caur Ethereum galveno tīklu, Polygon, Arbitrum, Base un Optimism, izmantojot to pašu kontu kopumu.',
      },
    ],
    caveatTitle: 'Jūsu atjaunošanas frāze atver jūsu seifu — tā nav kāda maģiska rezerves kopija',
    caveatBody:
      'Saglabājiet savu atjaunošanas frāzi drošā vietā, bet izveidojiet arī dublējumu „Google Drive“ vai failā. Dublējums jums būs nepieciešams, lai atjaunotu savu elektronisko maku jaunā ierīcē, bet frāze — lai to atbloķētu, kad tas būs izdarīts.',
    caveatLink: 'Lasiet vairāk sadaļā „Bieži uzdotie jautājumi”',
  },
  ethereum: {
    eyebrow: 'Ethereum',
    heading: 'Kāpēc Ethereum?',
    lede: '„wwwallet“ ir izstrādāts tieši „Ethereum“ platformai. Šeit ir tā priekšrocības, izklāstītas vienkāršā valodā.',
    points: [
      {
        title: 'Pasaules dators, nevis tikai grāmatvedības reģistrs',
        body: '„Ethereum“ pārņēma „Bitcoin“ ideju par kopīgu, pret viltojumiem aizsargātu grāmatvedības reģistru un to paplašināja: globāls, programmējams dators, uz kura pamata ikviens var veidot savus risinājumus un kuru neviena atsevišķa puse nevar atslēgt.',
      },
      {
        title: 'Nodrošināts ar stakingu, nevis ar ieguvi',
        body: 'Kopš 2022. gada „apvienošanās“ (The Merge) Ethereum drošību nodrošina „Proof-of-Stake“ mehānisms, nevis energoietilpīga ieguve — validatori kā ķīlu izmanto ETH, nevis patērē elektrību, lai sacenstos par blokiem.',
      },
      {
        title: 'Atvērta un bez atļaujām',
        body: 'Neviens neapstiprina jūsu kontu. Jebkurš cilvēks jebkurā vietā var turēt ETH vai izstrādāt lietojumprogrammu uz Ethereum — visiem tiek piemēroti vienādi noteikumi, ieskaitot lielākās iestādes.',
      },
      {
        title: 'Standarts, uz kura balstās citi tīkli',
        body: '2. slāņa tīkli, piemēram, Arbitrum, Base un Optimism — kurus visus atbalsta wwwallet — paplašina Ethereum drošību, nodrošinot ātrākus un lētākus darījumus, nevis sākot no nulles.',
      },
    ],
    linkLabel: 'Lasiet vairāk Ethereum fonda mājaslapā',
    linkUrl: 'https://ethereum.org/en/foundation/',
  },
  crypto: {
    eyebrow: 'Kriptovalūta',
    heading: 'Kriptovalūtas vienkāršā valodā',
    lede: 'Daži jēdzieni, kurus ir vērts izprast, pirms sākat glabāt kriptovalūtu — ne tikai ar wwwallet.',
    points: [
      {
        title: 'Ar aizbildniecību pret bez aizbildniecības',
        body: 'Uzraudzības makā vai biržā jūsu atslēgas glabā citi — tas ir ērti, taču jums jāpaļaujas uz to, ka citi neiesaldēs, nezaudēs vai nepareizi neizmantos jūsu līdzekļus. Makā bez uzraudzības, piemēram, wwwallet, atslēgas un atbildība ir tikai jūsu rokās.',
      },
      {
        title: 'Staking pret kalšanu',
        body: '„Proof-of-Work“ ieguves metode nodrošina blokķēdes drošību, izmantojot neapstrādātu skaitļošanas jaudu un elektroenerģiju. Savukārt „Proof-of-Stake“ metode to nodrošina, izmantojot riska kapitālu. Pāreja uz stakingu „Ethereum“ sistēmā samazināja enerģijas patēriņu par vairāk nekā 99,9 % — aptuveni tikpat daudz, cik atšķiras enerģijas patēriņš, kas nepieciešams, lai nodrošinātu ar elektroenerģiju nelielu valsti un nelielu pilsētu.',
      },
      {
        title: 'Aiz Ethereum robežām',
        body: 'Bitcoin priekšroku dod vienkāršībai un paredzamībai, nevis programmējamībai. Tādas blokķēdes kā Solana cenšas palielināt neapstrādāto caurlaidspēju, bieži vien upurējot decentralizāciju, lai to sasniegtu. Ethereum vispirms pievērš uzmanību decentralizācijai un drošībai, bet ātrumu un izmaksas atstāj uz tā bāzes izveidotajiem 2. slāņa tīkliem.',
      },
      {
        title: 'Neviens uzticams cilvēks nelūdz jūsu paroli',
        body: 'Neatkarīgi no tā, kādu elektronisko maku jūs izmantojat: ne birža, ne atbalsta dienesta darbinieks, ne arī kāds „wwwallet“ darbinieks nekad nelūgs jums atklāt atjaunošanas frāzi. Ikviens, kurš to dara, mēģina jūs apzagt.',
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
        q: 'Vai wwwallet tiešām ir bezmaksas?',
        a: 'Jā. Tās izmantošana ir bez maksas, nav nekāda premium līmeņa un nekāda satura, kas būtu pieejams tikai par maksu, un wwwallet nepiemēro nekādas komisijas maksas par jebkādiem nosūtījumiem vai apmaiņām. Vienīgās neizbēgamās izmaksas ir tīkla paša darījuma (gas) maksa, kas tiek samaksāta tīklam, nevis wwwallet. Apmaiņas kotācijas nāk no 0x biržu agregatora, kas dažos darījumos var piemērot savu maksu — jebkura šāda maksa tiek norādīta pārskata ekrānā, pirms jūs apstiprināt darījumu.',
      },
      {
        q: 'Vai tur ir reklāmas, izsekošanas rīki vai analītikas rīki?',
        a: 'Nē. Vietnē wwwallet netiek rādītas reklāmas, netiek izmantoti analītikas vai izsekošanas skripti, kā arī netiek veidots jūsu profils. Tur nav konta, tāpēc nav arī nekā, ar ko to saistīt.',
      },
      {
        q: 'Vai, lai to izmantotu, man ir nepieciešams konts vai personas apliecība?',
        a: 'Nē. Nav ne reģistrācijas, ne e-pasta adreses, ne tālruņa numura, ne identitātes pārbaudes — jūs izveidojat elektronisko maku savā ierīcē un sākat to lietot.',
      },
      {
        q: 'Ja tas ir bez maksas, kā tad wwwallet sedz savas izmaksas?',
        a: 'Tā negūst peļņu no saviem lietotājiem — nav komisijas maksas, nav reklāmu, nav datu pārdošanas. Ekspluatācijas izmaksas ir apzināti saglabātas zemas: pati elektroniskā maksa darbojas jūsu pārlūkprogrammā, bet serveru sistēma tikai pārsūta publiskā blokķēdes un cenu datus.',
      },
      {
        q: 'Vai kāds var bloķēt manu elektronisko maku?',
        a: 'Nav nekāda konta, tāpēc wwwallet — vai jebkuram citam — nav ko iesaldēt. Jūsu atslēgas nekad neiziet ārpus jūsu ierīces, un darījumi tiek parakstīti tajā, pirms tie tiek nosūtīti tīklā. Jūsu līdzekļi atrodas Ethereum tīklā, nevis wwwallet: jūs varat apskatīt jebkura konta privāto atslēgu vai atjaunošanas frāzi no tā izvēlnes un importēt to citā Ethereum makā, kad vien vēlaties.',
      },
      {
        q: 'Vai mana atjaunošanas frāze ir pietiekama, lai atgūtu savu elektronisko maku?',
        a: 'Nē, ne vien pati par sevi. Jūsu atjaunošanas frāze atbloķē jūsu šifrēto seifu, taču pats seifs atrodas tikai jūsu ierīcē. Ja jūs pazaudējat vai izdzēšat šo ierīci, neizveidojot nekādu dublējumu, frāzei vairs nebūs ko atbloķēt. Vienmēr papildiniet savu atjaunošanas frāzi ar dublējumu „Google Drive“ vai failu dublējumu — skatiet nākamo jautājumu.',
      },
      {
        q: 'Kā veikt savas elektroniskās naudas makas dublējumu?',
        a: 'Sadaļā „Iestatījumi” izveidojiet savas šifrētās seifu rezerves kopiju savā „Google Drive“ kontā — tā tiks saglabāta privātā, tikai lietotnei paredzētā mapē, kuras pārējo saturu „wwwallet“ nevar redzēt — vai arī kā failu, ko varat lejupielādēt un glabāt pats. To dariet ik reizi, kad izveidojat elektronisko maku vai pievienojat jaunus kontus.',
      },
      {
        q: 'Vai es varu izmantot wwwallet vairākās ierīcēs?',
        a: 'Jā, taču sinhronizācija nenotiek automātiski — katrai ierīcei ir sava vietējā seifa kopija. Lai lietotu wwwallet jaunā ierīcē, atjaunojiet to no „Drive“ vai faila dublējuma, pēc tam atbloķējiet ar atjaunošanas frāzi.',
      },
      {
        q: 'Kas notiks, ja es pazaudēšu savu ierīci un nekad neesmu veicis dublējumu?',
        a: 'Jūsu līdzekļus nav iespējams atgūt. Tas ir paredzēts: wwwallet neizmanto kontu sistēmu un nekur nesaglabā jūsu seifa kopiju, tāpēc neviens — arī mēs ne — nevar to jums atjaunot. Tas ir kompromiss, lai nodrošinātu, ka piekļuvi šai makai varat tikai jūs.',
      },
      {
        q: 'Vai piekļuves atslēgas (Face ID / Touch ID) tiek pārnestas uz jauno ierīci?',
        a: 'Nē. Piekļuves atslēga ir piesaistīta ierīcei, uz kuras tā tika izveidota. Pēc dublējuma atjaunošanas jaunā ierīcē atbloķējiet to, izmantojot atjaunošanas frāzi, un tur varēsiet iestatīt jaunu piekļuves atslēgu.',
      },
      {
        q: 'Vai wwwallet ir atvērtā koda programma?',
        a: 'Nē — tā avots ir pieejams. Pilnais avota kods ir publiski pieejams GitHub vietnē, tādējādi ikviens to var lasīt, pārskatīt un pārbaudīt, taču tas nav atvērtā koda projekts: kods ir licencēts saskaņā ar „PolyForm Strict License 1.0.0“.',
      },
      {
        q: 'Ko man ir atļauts darīt ar šo kodu?',
        a: 'Jūs varat to visu lasīt un pārbaudīt, kā arī izmantot nemodificētu kopiju nekomerciāliem mērķiem, piemēram, personīgai apguvei, pētniecībai un testēšanai. Jūs nedrīkstat to izplatīt, modificēt vai izveidot atvasinātos darbus (ieskaitot atzarojumus), kā arī izmantot to komerciāli. Ja jums ir nepieciešams kaut kas, ko licence neļauj, sazinieties ar autortiesību īpašnieku, lai saņemtu atsevišķu licenci.',
      },
      {
        q: 'Vai wwwallet ir droši lietot? Vai ir kāda garantija?',
        a: 'wwwallet ir programmatūra bez glabāšanas funkcijas, kas tiek piedāvāta „tādā stāvoklī, kādā tā ir”, bez jebkāda veida garantijas. Tikai jūs pats kontrolējat savas atslēgas un līdzekļus — neviens, ieskaitot mūs, nevar atgūt zaudētu atjaunošanas frāzi vai dublējumu, atcelt darījumu vai kompensēt jums zaudējumus. Izmantojiet tikai tos līdzekļus, kuru zaudēšanu varat atļauties, pirms nosūtīšanas rūpīgi pārbaudiet adreses un tīklus, un nekas šeit nav uzskatāms par finanšu, ieguldījumu, juridisku vai nodokļu konsultāciju.',
      },
      {
        q: 'Kādus tīklus atbalsta wwwallet?',
        a: 'Ethereum galvenais tīkls, kā arī 2. slāņa tīkli Polygon, Arbitrum, Base un Optimism — visi no viena un tā paša kontu kopuma.',
      },
      {
        q: 'Kā es varu papildināt savu elektronisko maku?',
        a: 'Atveriet kontu, izvēlieties „Skatīt QR kodu”, lai redzētu tā adresi, un nosūtiet līdzekļus uz šo adresi no biržas vai citas elektroniskās naudas makas. Pārliecinieties, ka nosūtāt pareizajā tīklā (Ethereum, Polygon, Arbitrum, Base vai Optimism) — viena un tā pati adrese darbojas visos šajos tīklos, taču līdzekļi, kas nosūtīti vienā tīklā, parādās tikai tajā tīklā. Jums būs nepieciešams arī neliels daudzums tīkla vietējās monētas (piemēram, ETH), lai segtu transakcijas komisijas maksu.',
      },
      {
        q: 'Ko es varu darīt ar wwwallet?',
        a: 'Sūtīt: pārskaitiet ETH vai jebkuru citu žetonu uz adresi, kuru ievietojat, ieskenējat no QR koda vai izvēlaties no saviem kontiem, un pirms apstiprināšanas pārbaudiet informāciju. Apmainīt: apmainiet vienu žetonu pret citu tajā pašā tīklā, izmantojot cilni „Swap”, kurā jau sākumā tiek parādīts piedāvājums un provizoriskā komisijas maksa. Saņemt: parādiet savu adresi kā QR kodu. Jūs varat arī apskatīt savus atlikumus USD vērtībā un darījumu vēsturi visos atbalstītajos tīklos.',
      },
      {
        q: 'Ko wwwallet zina par mani?',
        a: 'Nekas, kas varētu identificēt jūs. Nav ne konta, ne lietotājvārda, ne datu bāzes. Dati par atlikumu un cenām tiek iegūti, izmantojot wwwallet paša iekšējo sistēmu, nevis jūsu pārlūkprogrammai tieši sazinoties ar trešo pušu pakalpojumu sniedzējiem, un šī iekšējā sistēma nekad neredz jūsu atslēgas, paroles vai atjaunošanas frāzi.',
      },
    ],
  },
  footer: {
    tagline: 'Bezmaksas Ethereum maku bez aktīvu glabāšanas, kas pieejams ikvienam.',
    copyright: '© {year} wwwallet',
    licenseLink: 'Licencēts saskaņā ar PolyForm Strict 1.0.0',
    disclaimer:
      'Programmatūra, kas nav saistīta ar glabāšanu, tiek piedāvāta „tādā stāvoklī, kādā tā ir“, bez garantijas. Tas nav finanšu padoms. Jūs esat vienīgais, kas atbild par savām atslēgām un līdzekļiem.',
  },
  principles: {
    eyebrow: 'Principi',
    heading: 'Bezmaksas, atvērts un radīts ikvienam',
    lede: 'Maksai jābūt rīkam, ko tu izmanto, nevis uzņēmumam, kas balstās uz saviem lietotājiem. Tieši uz šīm saistībām balstās wwwallet.',
    items: [
      {
        title: 'Bez maksas, bez slēptām nosacījumiem',
        body: 'Nav cenas, nav premium līmeņa, nav maksas funkciju. wwwallet nepiemēro nekādas savas komisijas — vienīgās izmaksas ir tīkla paša darījuma komisija.',
      },
      {
        title: 'Bez reklāmām, bez izsekošanas',
        body: 'Nekādu reklāmu, nekādu analītiku, nekādu izsekošanas skriptu un nekādu datu pārdošanu trešajām personām. Jūsu profils vispār nav pieejams pārdošanai.',
      },
      {
        title: 'Nav jāreģistrējas',
        body: 'Nav nepieciešams norādīt e-pasta adresi, tālruņa numuru vai uzrādīt personu apliecinošu dokumentu. Atveriet lietotni, izveidojiet elektronisko maku, un viss ir gatavs.',
      },
      {
        title: 'Jūsu atslēgas paliek pie jums',
        body: 'Atslēgas tiek izveidotas un šifrētas jūsu ierīcē un nekad to neiziet. wwwallet nevar tās redzēt, pārvietot jūsu līdzekļus vai bloķēt jūsu piekļuvi.',
      },
      {
        title: 'Darbojas jebkurā vietā',
        body: 'Darbojas jebkurā mūsdienīgā pārlūkprogrammā gan viedtālrunī, gan datorā, un to var instalēt tāpat kā lietotni — nav nepieciešams konts lietotņu veikalā.',
      },
      {
        title: '31 valodā',
        body: 'Izmantojiet to valodā, kas jums ir visērtākā, gan gaišajā, gan tumšajā režīmā.',
      },
      {
        title: 'Atklāts kods',
        body: 'Pilnais avota kods ir publicēts, lai ikviens to varētu izlasīt un pārbaudīt. Tas ir „source-available”, nevis „open source” — bieži uzdotajos jautājumos ir izskaidrots, ko atļauj licence.',
      },
      {
        title: 'Nav ko izslēgt',
        body: 'Nav nekāda konta, ko varētu iesaldēt. Jūsu līdzekļi atrodas pašā „Ethereum” tīklā, un jebkura konta atslēgu jebkurā brīdī var pārnest uz citu elektronisko maku.',
      },
    ],
  },
  license: {
    title: 'Licence',
    close: 'Aizvērt',
    summaryTitle: 'Vienkāršā valodā',
    canUse: 'Jūs varat bez maksas izmantot wwwallet personīgām un citām nekomerciālām vajadzībām.',
    canRead: 'Jūs varat izlasīt un pārbaudīt katru tā avota koda rindu.',
    cannot: 'Jūs nedrīkstat to kopēt, mainīt, izplatīt vai pārdot.',
    englishNote:
      'Tālāk ir sniegta pilnā licences versija oriģinālvalodā — angļu valodā; tas ir juridiskais teksts.',
    viewSource: 'Apskatīt GitHub vietnē',
  },
}
