export default {
  nav: {
    wallet: 'Maks',
    ethereum: 'Ethereum',
    crypto: 'Kriptovalūta',
    faqs: 'Bieži uzdotie jautājumi',
    launch: 'Atvērt maku',
    home: 'Atgriezties uz sākumu',
    sectionNavLabel: 'Sadaļu navigācija',
  },
  settings: {
    open: 'Iestatījumi',
    close: 'Aizvērt iestatījumus',
    theme: 'Tēma',
    themeLight: 'Gaisma',
    themeDark: 'Tumšs',
    language: 'Valoda',
  },
  hero: {
    eyebrow: 'Personīga Ethereum maku, kas nav saistīta ar glabāšanu',
    heading1: 'Jūsu atslēgas.',
    heading2: 'Jūsu ierīce.',
    heading3: 'Tava maku.',
    lede: 'wwwallet šifrē jūsu elektronisko maku jūsu ierīcē un nekad nekur citur neaizsūta jūsu atslēgas, paroles vai atjaunošanas frāzi. Nav jāizveido konts. Nav servera, ko varētu uzlauzt. Tikai jūs un jūsu kriptovalūta.',
    ctaPrimary: 'Atvērt maku',
    ctaSecondary: 'Uzziniet, kā tas darbojas',
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
        q: 'Vai mana atjaunošanas frāze ir pietiekama, lai atgūtu savu elektronisko maku?',
        a: 'Nē, ne vien pati par sevi. Jūsu atjaunošanas frāze atbloķē jūsu šifrēto seifu, taču pats seifs atrodas tikai jūsu ierīcē. Ja jūs pazaudējat vai izdzēšat šo ierīci, neizveidojot nekādu dublējumu, frāzei vairs nebūs ko atbloķēt. Vienmēr papildiniet savu atjaunošanas frāzi ar dublējumu „Google Drive“ vai failu dublējumu — skatiet nākamo jautājumu.',
      },
      {
        q: 'Kā veikt savas elektroniskās naudas makas dublējumu?',
        a: 'Sadaļā „Iestatījumi” izveidojiet šifrētās seifa dublikātu savā „Google Drive” — tas tiks saglabāts privātā mapē, kas pieejama tikai lietotnei un kuras pārējo saturu „wwwallet” neredz — vai arī kā failu, ko lejupielādējat un glabājat paši. To dariet ikreiz, kad konfigurējat elektronisko maku vai pievienojat jaunus kontus.',
      },
      {
        q: 'Vai es varu izmantot „wwwallet“ vairākās ierīcēs?',
        a: 'Jā, taču sinhronizācija nenotiek automātiski — katrai ierīcei ir sava vietējā seifa kopija. Lai izmantotu wwwallet jaunā ierīcē, atjaunojiet to no „Drive“ vai faila dublējuma, pēc tam atbloķējiet ar atjaunošanas frāzi.',
      },
      {
        q: 'Kas notiks, ja pazaudēšu savu ierīci un nekad neesmu veicis dublējumu?',
        a: 'Jūsu līdzekļi ir neatgūstami. Tas ir paredzēts: wwwallet neizmanto kontu sistēmu un nekur nesaglabā jūsu seifa kopiju, tāpēc neviens — arī mēs — to nevar atjaunot jūsu vietā. Tas ir kompromiss, lai radītu maku, kuram piekļūt var tikai jūs.',
      },
      {
        q: 'Vai piekļuves atslēgas (Face ID / Touch ID) tiek pārnestas uz jauno ierīci?',
        a: 'Nē. Parole ir piesaistīta ierīcei, uz kuras tā tika izveidota. Pēc dublējuma atjaunošanas jaunā ierīcē atbloķējiet to, izmantojot atjaunošanas frāzi, un tur varēsiet iestatīt jaunu paroli.',
      },
      {
        q: 'Vai wwwallet ir atvērtā koda programma?',
        a: 'Avots ir publiski pieejams GitHub vietnē, tāpēc ikviens to var izlasīt. Tas vēl nav publicēts saskaņā ar atvērtā koda licenci, tāpēc pagaidām to uzskatiet par publiski pieejamu pārskatīšanai, nevis par atvērtā koda projektu.',
      },
      {
        q: 'Kādus tīklus atbalsta wwwallet?',
        a: 'Ethereum galvenais tīkls, kā arī 2. slāņa tīkli „Polygon”, „Arbitrum”, „Base” un „Optimism” — visi no viena un tā paša kontu kopuma.',
      },
      {
        q: 'Ko wwwallet zina par mani?',
        a: 'Nekas, kas varētu identificēt jūs. Nav ne konta, ne lietotājvārda, ne datu bāzes. Dati par atlikumu un cenām tiek iegūti, izmantojot wwwallet paša iekšējo sistēmu, nevis jūsu pārlūkprogrammai tieši sazinoties ar trešo pušu pakalpojumu sniedzējiem, un šī iekšējā sistēma nekad neredz jūsu atslēgas, paroles vai atjaunošanas frāzi.',
      },
    ],
  },
  footer: {
    tagline: 'Personīga Ethereum maku, kas nav saistīta ar glabāšanu.',
    sourceLink: 'Apskatīt avota kodu GitHub vietnē',
    copyright: '© {year} wwwallet',
  },
}
