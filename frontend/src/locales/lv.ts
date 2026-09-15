export default {
  common: {
    cancel: 'Atcelt',
    save: 'Saglabāt',
    done: 'Pabeigts',
    goBack: 'Atgriezties',
    label: 'Etiķete',
    chain: 'Ķēde',
    address: 'Adrese',
  },
  nav: {
    settings: 'Iestatījumi',
    accounts: 'Konti',
    dismiss: 'Atraidīt',
  },
  accounts: {
    title: 'Konti',
    addAccount: 'Pievienot kontu',
    empty: 'Vēl nav neviena konta. Pievienojiet vienu, lai sāktu.',
  },
  accountDetail: {
    swap: 'Apmaiņa',
    transactions: 'Darījumi',
    receiveAria: 'Saņemt kriptovalūtu',
    sendAria: 'Nosūtīt kriptovalūtu',
  },
  addAccount: {
    title: 'Pievienot kontu',
    tabCreate: 'Izveidot jaunu',
    tabMnemonic: 'Importa mnemonika',
    tabPrivateKey: 'Importēt privāto atslēgu',
    tabKeystore: 'Importēt atslēgu krātuves failu',
    mnemonicLabel: 'Atjaunošanas frāze (atmiņas palīgs)',
    privateKeyLabel: 'Privātais atslēgas kods',
    keystoreFileLabel: 'JSON fails ar atslēgu krātuvi',
    filePasswordLabel: 'Šī faila parole',
    filePasswordHint:
      'Parole, ar kuru šis atslēgu krātuves fails sākotnēji tika šifrēts — nevis jauna parole. Pēc importēšanas jums vienkārši būs jāatbloķē seifs.',
    noPasswordHint:
      'Parole nav nepieciešama — šo kontu aizsargā jūsu seifa atbloķēšanas metode (Face ID/Touch ID vai atjaunošanas frāze).',
    submit: 'Pievienot kontu',
  },
  send: {
    title: 'Nosūtīt',
    fromLabel: 'No {label} ({chain})',
    recipientLabel: 'Saņēmēja adrese',
    scanQrAria: 'Noskenējiet QR kodu',
    amountLabel: 'Summa',
    submit: 'Nosūtīt',
  },
  receive: {
    title: 'Saņemt',
    defaultAccountLabel: 'Konta',
    tapToCopy: 'Pieskarieties, lai kopētu',
    copyAria: 'Kopēt adresi',
  },
  swap: {
    title: 'Apmaiņa',
    sellTokenLabel: 'Pārdot žetonu (uz adresi vai par ETH, ja tas ir vietējais žetons)',
    buyTokenLabel: 'Tokenu iegādes adrese',
    sellAmountLabel: 'Pārdošanas summa',
    getQuote: 'Saņemt piedāvājumu',
    estimateText: 'Paredzamā saņemtā summa: {amount} par cenu {price}',
    signingNotice:
      'Jūs parakstāt darījumu, lai noslēgtu līgumu ar {address} (izmantojot 0x agregatoru).',
    submit: 'Apmaiņa',
  },
  payees: {
    title: 'Saņēmēji',
    add: 'Pievienot maksājuma saņēmēju',
    empty: 'Vēl nav saņēmēju.',
    deleteAria: 'Dzēst {label}',
    labelField: 'Etiķete',
    addressField: 'Adrese',
  },
  backup: {
    title: 'Datu dublēšana un atjaunošana',
    intro:
      'Datu dublējumi šajā ierīcē tiek šifrēti, pirms tie tiek nosūtīti ārpus tās. wwwallet serveris šajā procesā netiek iesaistīts — atjaunošana jaunā ierīcē notiek, tieši sazinoties ar Google vai nolasot vietējo failu.',
    googleDriveTitle: 'Google Drive',
    backUpNow: 'Veiciet dublējumu tagad',
    restoreLatest: 'Atjaunot pēdējo dublējumu',
    localFileTitle: 'Vietējais fails',
    downloadBackup: 'Lejupielādēt rezerves kopijas failu',
    restoreFromFile: 'Atjaunot no faila',
    replaceTitle: 'Vai vēlaties nomainīt savu pašreizējo elektronisko maku?',
    replaceBody:
      'Atjaunošana aizstās visu, kas pašlaik atrodas šajā seifā — kontus, maksājumu saņēmējus un iestatījumus — ar dublējumā esošo informāciju, kā arī dzēsīs jebkuru šajā ierīcē iestatīto piekļuves kodu (jūs to atkal aktivizēsiet pēc atbloķēšanas). Šo darbību nevar atcelt.',
    replaceConfirm: 'Nomainiet to',
  },
  vaultSetup: {
    createTitle: 'Izveidojiet savu elektronisko maku',
    recoveryExplainer:
      'Šis ir jūsu {phrase}. Tas šifrē visu šajā ierīcē un ir vienīgais veids, kā atgūt piekļuvi, ja kādreiz zaudēsiet piekļuvi savai atslēgai — tostarp, atjaunojot dublējumu jaunā ierīcē. Uzrakstiet to vai nokopējiet kādā drošā vietā bez interneta savienojuma. Jums tas nebūs nepieciešams ikdienā, tiklīdz nākamajā ekrānā būs iestatīta ātrā atbloķēšana, un wwwallet to vairs nekad neparādīs.',
    recoveryExplainerPhrase: 'atjaunošanas frāze',
    copyRecoveryPhrase: 'Kopēt atjaunošanas frāzi',
    savedAckLabel: 'Esmu savu atjaunošanas frāzi saglabājis drošā vietā',
    createVault: 'Izveidot seifu',
    haveBackup: 'Vai jums jau ir dublējums?',
    restoreFromDrive: 'Atjaunot no „Google Drive“',
    restoreFromLocalFile: 'Atjaunot no vietējā faila',
    quickUnlockTitle: 'Iestatīt ātru atbloķēšanu',
    quickUnlockBody:
      'Ikdienā izmantojiet „Face ID“ vai „Touch ID“, lai atbloķētu ierīci, nevis atjaunošanas frāzi.',
    enablePasskey: 'Ieslēgt Face ID / Touch ID',
    passkeyEnabledLabel: 'Atbalsta Face ID / Touch ID',
    passkeyUnsupportedNote:
      'Šajā ierīcē vai pārlūkprogrammā nav atbalstīts — jūs joprojām varat atbloķēt, izmantojot atjaunošanas frāzi, vai mēģināt vēlāk no iestatījumiem.',
    skipTitle: 'Atcelt ātro atbloķēšanu?',
    skipBody:
      'Ja nav piekļuves atslēgas, katru reizi, kad atvērsiet wwwallet, būs jāievada pilnā atjaunošanas frāze. To varat iestatīt vēlāk sadaļā „Iestatījumi”.',
    continueAnyway: 'Turpināt tik un tā',
  },
  vaultUnlock: {
    title: 'Atbloķēt wwwallet',
    unlockWithPasskey: 'Atbloķēt ar Face ID / Touch ID',
    recoveryPhraseLabel: 'Atjaunošanas frāze (24 vārdi)',
    unlock: 'Atbloķēt',
    useRecoveryInstead: 'Tā vietā izmantojiet atjaunošanas frāzi',
  },
  settings: {
    title: 'Iestatījumi',
    toggleThemeAria: 'Pārslēgt tēmu',
    closeAria: 'Aizvērt iestatījumus',
    lockNow: 'Aizslēgt tagad',
    languageLabel: 'Valoda',
    currencyLabel: 'Valūta',
    securityTitle: 'Drošība',
    securityIntro:
      'Jūsu atjaunošanas frāze nekad netiek saglabāta vietā, kur tā varētu tikt jums parādīta — glabājiet to drošā vietā. „Face ID” / „Touch ID” ir ātrākais veids, kā ikdienā atbloķēt ierīci; „wwwallet” arī automātiski bloķējas pēc dažām minūtēm bezdarbības.',
    passkeyLabel: 'Face ID / Touch ID',
    passkeyEnabled: 'Ieslēgts',
    passkeyNotSetUp: 'Nav iestatīts',
    remove: 'Dzēst',
    enable: 'Ieslēgt',
    removePasskeyTitle: 'Atcelt atbloķēšanu ar Face ID / Touch ID?',
    removePasskeyBody:
      'Līdz brīdim, kad atkal iestatīsi paroli, katru reizi, kad atbloķēsi wwwallet, tev būs nepieciešama pilnā atjaunošanas frāze.',
    removeAnyway: 'Tāpat noņemt',
  },
  transactions: {
    title: 'Darījumi',
    empty: 'Darījumi netika atrasti.',
    visitAccountFirst: 'Vispirms atveriet kontu, lai ielādētu tā darījumu vēsturi.',
  },
  token: {
    defaultLabel: 'Žetons',
  },
  qrScanner: {
    title: 'Noskenējiet adreses QR kodu',
    cameraError: 'Neizdevās piekļūt kamerai. Pārbaudiet atļaujas un mēģiniet vēlreiz.',
  },
  validation: {
    amountGreaterThanZero: 'Ievadiet summu, kas ir lielāka par nulli.',
    insufficientBalance:
      'Nosūtāmā summa pārsniedz „FROM” konta atlikumu (ieskaitot darījuma komisiju).',
    invalidRecipientAddress: 'Ievadiet derīgu saņēmēja adresi.',
    validTokenOrEth:
      'Ievadiet derīgu žetona adresi vai „ETH”, ja izmantojat sistēmas iekšējo žetonu.',
    validBuyToken: 'Ievadiet derīgu pirkšanas žetona adresi.',
    labelRequired: 'Ir jānorāda nosaukums.',
    validAddress: 'Ievadiet derīgu adresi.',
    filePasswordRequired: 'Šim failam ir nepieciešama parole.',
    mnemonicWordCount: 'Nepareizs vārdu skaits ({count}). Ir jābūt vai nu 12, vai 24 vārdiem.',
    privateKeyRequired: 'Ir nepieciešams privātais atslēgas kods.',
    keystoreFileRequired: 'Izvēlieties atslēgu krātuves failu.',
    recoveryPhraseFormat: 'Šķiet, ka tā nav derīga atjaunošanas frāze.',
  },
  msg: {
    account: {
      added: 'Konta pievienošana pabeigta.',
    },
    address: {
      copied: 'Adrese ir nokopēta.',
    },
    qr: {
      noAddress: 'QR kodā nebija atpazīstamas adreses.',
    },
    send: {
      success: 'Nosūtīts. Darījuma hash: {hash}',
    },
    swap: {
      approvalSubmitted:
        'Apstiprinājums ir iesniegts. Gaidiet, kamēr tas tiks apstiprināts, un pēc tam veiciet apmaiņu atkārtoti.',
      success: 'Apmaiņa iesniegta. Darījuma hash: {hash}',
    },
    backup: {
      driveSuccess: 'Dati ir dublēti uz Google Drive.',
    },
    restore: {
      driveSuccess:
        'Atjaunots no „Google Drive“. Lai turpinātu, atbloķējiet ar savu atjaunošanas frāzi.',
      fileSuccess:
        'Atjaunots no faila. Lai turpinātu, atbloķējiet to, izmantojot atjaunošanas frāzi.',
      driveSuccessSetup:
        'Atjaunots no „Google Drive“. Lai atbloķētu, ievadiet savu atjaunošanas frāzi.',
      fileSuccessSetup: 'Atjaunots no faila. Lai atbloķētu, ievadiet savu atjaunošanas frāzi.',
    },
    recoveryPhrase: {
      copied:
        'Atjaunošanas frāze ir nokopēta — tā tiks dzēsta no jūsu starpliktuves pēc 45 sekundēm.',
      copyFailed: 'Nepavyka kopēt automātiski — atlasiet vārdus un kopējiet tos manuāli.',
    },
    passkey: {
      ready: 'Atslēgšana ar Face ID / Touch ID ir gatava.',
    },
  },
  errors: {
    unknown: 'Ir notikusi nezināma kļūda',
    requestFailed: 'pieprasījums {path} neizdevās, jo {status}',
    webauthnUnavailable: 'Šajā pārlūkprogrammā WebAuthn nav pieejams',
    passkeyRegistrationCancelled: 'paroles reģistrācija tika atcelta',
    passkeyNoPrfSecret: 'piekļuves atslēga neatklāja PRF slepeno kodu',
    passkeyUnlockCancelled: 'Atslēgšanas ar paroli tika atcelta',
    prfNotSupported:
      'Šī ierīce vai pārlūks neatbalsta atbloķēšanu bez paroles, izmantojot piekļuves atslēgu (WebAuthn PRF). Jūs joprojām varat atbloķēt kontu, izmantojot atjaunošanas frāzi, vai arī izmēģināt citu ierīci/pārlūku.',
    googleDriveNotConfigured:
      '„Google Drive“ dublējums nav konfigurēts (trūkst VITE_GOOGLE_CLIENT_ID)',
    gisLoadFailed: 'neizdevās ielādēt „Google Identity Services“',
    googleSignInCancelled: 'Google pieteikšanās tika atcelta',
    googleDriveSearchFailed: 'neizdevās veikt meklēšanu „Google Drive“',
    googleDriveUploadFailed: 'neizdevās augšupielādēt dublējumu uz „Google Drive“',
    googleDriveNoBackup: 'šajā Google kontā nav atrastas rezerves kopijas',
    googleDriveDownloadFailed: 'neizdevās lejupielādēt dublējumu no „Google Drive“',
    noVaultOnDevice: 'šajā ierīcē nav nekādas glabātavas',
    cannotSaveNoVault: 'nevar saglabāt: seifs vēl nepastāv',
    noRecoveryWrapToExport: 'seifam nav atjaunošanas frāzes, ko eksportēt',
    invalidBackupFile: 'Šis fails nav derīga „wwwallet“ rezerves kopija.',
    vaultUnlockFailed: 'Nepareiza atjaunošanas frāze vai bojāts krātuves fails.',
    unlockMethodNotEnrolled: '{method} šim seifam nav iestatīts.',
    passkeyNotSetUp: 'Šim seifam nav iestatīta piekļuves atslēga.',
    vaultLocked: 'seifs ir aizslēgts',
    chooseKeystoreFile: 'izvēlieties atslēgu krātuves failu',
  },
  currency: {
    USD: 'ASV dolārs',
    EUR: 'Eiro',
    GBP: 'Sterlinga mārciņa',
    AUD: 'Austrālijas dolārs',
    CAD: 'Kanādas dolārs',
    JPY: 'Japānas jena',
    CHF: 'Šveices franks',
    CNH: 'juāns',
    SEK: 'Zviedrijas krona',
    NZD: 'Jaunzēlandes dolārs',
  },
}
