export default {
  common: {
    cancel: 'Annuller',
    save: 'Gem',
    done: 'Færdig',
    goBack: 'Gå tilbage',
    label: 'Etiket',
    chain: 'Kæde',
    address: 'Adresse',
  },
  nav: {
    settings: 'Indstillinger',
    accounts: 'Konti',
    dismiss: 'Afvis',
  },
  accounts: {
    title: 'Konti',
    addAccount: 'Tilføj konto',
    empty: 'Der er endnu ingen konti. Opret en for at komme i gang.',
  },
  accountDetail: {
    swap: 'Byt',
    transactions: 'Transaktioner',
    receiveAria: 'Modtag kryptovaluta',
    sendAria: 'Send kryptovaluta',
  },
  addAccount: {
    title: 'Tilføj konto',
    tabCreate: 'Opret ny',
    tabMnemonic: 'Import-mnemonik',
    tabPrivateKey: 'Importer privat nøgle',
    tabKeystore: 'Importer keystore-fil',
    mnemonicLabel: 'Gendannelsesfrase (hukommelseshjælp)',
    privateKeyLabel: 'Privatnøgle',
    keystoreFileLabel: 'JSON-fil med nøgleopbevaring',
    filePasswordLabel: 'Adgangskoden til denne fil',
    filePasswordHint:
      'Den adgangskode, som denne nøglefil oprindeligt blev krypteret med — ikke en ny adgangskode. Når den er importeret, behøver du blot at låse din nøglebeholder op.',
    noPasswordHint:
      'Der kræves ingen adgangskode — denne konto er beskyttet af din egen oplåsningsmetode til din sikkerhedsboks (Face ID/Touch ID eller gendannelsessætning).',
    submit: 'Tilføj konto',
  },
  send: {
    title: 'Send',
    fromLabel: 'Fra {label} ({chain})',
    recipientLabel: 'Modtageradresse',
    scanQrAria: 'Scan QR-koden',
    amountLabel: 'Beløb',
    submit: 'Send',
  },
  receive: {
    title: 'Modtag',
    defaultAccountLabel: 'Konto',
    tapToCopy: 'Tryk for at kopiere',
    copyAria: 'Kopier adresse',
  },
  swap: {
    title: 'Byt',
    sellTokenLabel: 'Sælg token (adresse eller ETH for native)',
    buyTokenLabel: 'Køb token-adresse',
    sellAmountLabel: 'Salgsbeløb',
    getQuote: 'Få et tilbud',
    estimateText: 'Anslået modtagelse: {amount} til en pris på {price}',
    signingNotice: 'Du underskriver en transaktion til {address} (via 0x-aggregatoren).',
    submit: 'Byt',
  },
  payees: {
    title: 'Modtagere',
    add: 'Tilføj modtager',
    empty: 'Der er endnu ingen modtagere.',
    deleteAria: 'Slet {label}',
    labelField: 'Etiket',
    addressField: 'Adresse',
  },
  backup: {
    title: 'Sikkerhedskopiering og gendannelse',
    intro:
      "Sikkerhedskopier krypteres på denne enhed, inden de forlader den. wwwallet's server er aldrig involveret — ved gendannelse på en ny enhed kommunikerer den direkte med Google eller læser en lokal fil.",
    googleDriveTitle: 'Google Drive',
    backUpNow: 'Lav en sikkerhedskopi nu',
    restoreLatest: 'Gendan den seneste sikkerhedskopi',
    localFileTitle: 'Lokal fil',
    downloadBackup: 'Download sikkerhedskopifilen',
    restoreFromFile: 'Gendan fra fil',
    replaceTitle: 'Vil du skifte din nuværende tegnebog ud?',
    replaceBody:
      'Ved gendannelse overskrives alt, hvad der i øjeblikket findes i denne sikkerhedsboks — konti, betalingsmodtagere og indstillinger — med indholdet fra sikkerhedskopien, og eventuelle adgangskoder, der er oprettet på denne enhed, slettes (du skal genaktivere dem, når du har låst enheden op). Dette kan ikke fortrydes.',
    replaceConfirm: 'Udskift den',
  },
  vaultSetup: {
    createTitle: 'Opret din tegnebog',
    recoveryExplainer:
      'Dette er din {phrase}. Den krypterer alt på denne enhed og er den eneste måde at få adgang igen på, hvis du nogensinde mister adgangen til din adgangsnøgle — herunder når du gendanner en sikkerhedskopi på en ny enhed. Skriv den ned eller kopier den et sikkert sted, hvor der ikke er internetforbindelse. Du får ikke brug for den i hverdagen, når hurtigoplukning er konfigureret på den næste skærm, og wwwallet vil aldrig vise den til dig igen.',
    recoveryExplainerPhrase: 'gendannelsesfrasen',
    copyRecoveryPhrase: 'Kopier gendannelsesfrasen',
    savedAckLabel: 'Jeg har gemt min gendannelsesfrase et sikkert sted',
    createVault: 'Opret en boks',
    haveBackup: 'Har du allerede en sikkerhedskopi?',
    restoreFromDrive: 'Gendan fra Google Drive',
    restoreFromLocalFile: 'Gendan fra lokal fil',
    quickUnlockTitle: 'Indstil hurtig oplåsning',
    quickUnlockBody:
      'Brug Face ID eller Touch ID til at låse telefonen op i hverdagen i stedet for din gendannelsesfrase.',
    enablePasskey: 'Aktivér Face ID / Touch ID',
    passkeyEnabledLabel: 'Face ID / Touch ID aktiveret',
    passkeyUnsupportedNote:
      'Understøttes ikke på denne enhed eller i denne browser — du kan stadig låse op med din gendannelsesfrase eller prøve igen senere via Indstillinger.',
    skipTitle: 'Vil du springe hurtig oplåsning over?',
    skipBody:
      'Uden en adgangskode skal du indtaste hele din gendannelsessætning, hver gang du åbner wwwallet. Du kan konfigurere dette senere under Indstillinger.',
    continueAnyway: 'Fortsæt alligevel',
  },
  vaultUnlock: {
    title: 'Lås wwwallet op',
    unlockWithPasskey: 'Lås op med Face ID / Touch ID',
    recoveryPhraseLabel: 'Gendannelsesfrase (24 ord)',
    unlock: 'Lås op',
    useRecoveryInstead: 'Brug i stedet gendannelsesfrasen',
  },
  settings: {
    title: 'Indstillinger',
    toggleThemeAria: 'Skift tema',
    closeAria: 'Luk indstillinger',
    lockNow: 'Lås nu',
    languageLabel: 'Sprog',
    currencyLabel: 'Valuta',
    securityTitle: 'Sikkerhed',
    securityIntro:
      'Din gendannelsesfrase gemmes aldrig et sted, hvor den kan vises for dig — opbevar den et sikkert sted. Face ID/Touch ID er den hurtigste måde at låse telefonen op på i hverdagen; wwwallet låser sig også automatisk efter et par minutters inaktivitet.',
    passkeyLabel: 'Face ID / Touch ID',
    passkeyEnabled: 'Aktiveret',
    passkeyNotSetUp: 'Ikke konfigureret',
    remove: 'Fjern',
    enable: 'Aktivér',
    removePasskeyTitle: 'Fjerne Face ID-/Touch ID-låsefunktion?',
    removePasskeyBody:
      'Du skal bruge hele din gendannelsessætning, hver gang du låser wwwallet op, indtil du har oprettet en adgangskode igen.',
    removeAnyway: 'Fjern alligevel',
  },
  transactions: {
    title: 'Transaktioner',
    empty: 'Der blev ikke fundet nogen transaktioner.',
    visitAccountFirst: 'Gå først ind på en konto for at hente dens transaktionshistorik.',
  },
  token: {
    defaultLabel: 'Token',
  },
  qrScanner: {
    title: 'Scan QR-koden med adressen',
    cameraError:
      'Der opstod en fejl ved adgang til kameraet. Kontroller brugerrettighederne, og prøv igen.',
  },
  validation: {
    amountGreaterThanZero: 'Indtast et tal, der er større end nul.',
    insufficientBalance:
      'Det beløb, der skal overføres, er større end saldoen på afsenderkontoen (inklusive transaktionsgebyr).',
    invalidRecipientAddress: 'Indtast en gyldig modtageradresse.',
    validTokenOrEth: 'Indtast en gyldig token-adresse eller ETH for den indbyggede token.',
    validBuyToken: 'Indtast en gyldig adresse til køb af token.',
    labelRequired: 'Der skal angives en etiket.',
    validAddress: 'Indtast en gyldig adresse.',
    filePasswordRequired: 'Der kræves en adgangskode til denne fil.',
    mnemonicWordCount: 'Forkert antal ord ({count}). Der skal enten være 12 eller 24 ord.',
    privateKeyRequired: 'Der kræves en privat nøgle.',
    keystoreFileRequired: 'Vælg en nøglefil.',
    recoveryPhraseFormat: 'Det ser ikke ud til at være en gyldig gendannelsesfrase.',
  },
  msg: {
    account: {
      added: 'Kontoen er tilføjet.',
    },
    address: {
      copied: 'Adressen er kopieret.',
    },
    qr: {
      noAddress: 'QR-koden indeholdt ingen genkendelig adresse.',
    },
    send: {
      success: 'Sendt. Transaktions-hash: {hash}',
    },
    swap: {
      approvalSubmitted:
        'Godkendelsen er indsendt. Vent på, at den bliver bekræftet, og skift derefter igen.',
      success: 'Bytning indsendt. Transaktionshash: {hash}',
    },
    backup: {
      driveSuccess: 'Sikkerhedskopieret til Google Drive.',
    },
    restore: {
      driveSuccess:
        'Gendannet fra Google Drive. Lås op med din gendannelsesfrase for at fortsætte.',
      fileSuccess: 'Gendannet fra filen. Lås op med din gendannelsesfrase for at fortsætte.',
      driveSuccessSetup:
        'Gendannet fra Google Drive. Indtast din gendannelsesfrase for at låse op.',
      fileSuccessSetup: 'Gendannet fra filen. Indtast din gendannelsesfrase for at låse op.',
    },
    recoveryPhrase: {
      copied: 'Gendannelsesfrasen er kopieret — den slettes fra udklipsholderen om 45 sekunder.',
      copyFailed: 'Det var ikke muligt at kopiere automatisk — vælg og kopier ordene manuelt.',
    },
    passkey: {
      ready: 'Face ID/Touch ID-oplåsning er klar.',
    },
  },
  errors: {
    unknown: 'Der opstod en ukendt fejl',
    requestFailed: 'Anmodningen til {path} mislykkedes med {status}',
    webauthnUnavailable: 'WebAuthn er ikke tilgængeligt i denne browser',
    passkeyRegistrationCancelled: 'Registreringen af adgangskoden blev annulleret',
    passkeyNoPrfSecret: 'Passkey returnerede ikke en PRF-hemmelighed',
    passkeyUnlockCancelled: 'Låseopkaldet blev afbrudt',
    prfNotSupported:
      'Denne enhed eller browser understøtter ikke adgang uden adgangskode ved hjælp af en adgangsnøgle (WebAuthn PRF). Du kan stadig låse op med din gendannelsesfrase eller prøve en anden enhed/browser.',
    googleDriveNotConfigured:
      'Google Drive-sikkerhedskopiering er ikke konfigureret (VITE_GOOGLE_CLIENT_ID mangler)',
    gisLoadFailed: 'Det lykkedes ikke at indlæse Google Identity Services',
    googleSignInCancelled: 'Google-login blev afbrudt',
    googleDriveSearchFailed: 'Det lykkedes ikke at søge på Google Drive',
    googleDriveUploadFailed: 'Det lykkedes ikke at uploade sikkerhedskopien til Google Drive',
    googleDriveNoBackup: 'Der blev ikke fundet nogen sikkerhedskopi på denne Google-konto',
    googleDriveDownloadFailed: 'Det lykkedes ikke at hente sikkerhedskopien fra Google Drive',
    noVaultOnDevice: 'Der findes ingen boks på denne enhed',
    cannotSaveNoVault: 'Kan ikke gemme: Der findes endnu ikke noget arkiv',
    noRecoveryWrapToExport: 'vault har ingen genoprettelsessætning, der skal eksporteres',
    invalidBackupFile: 'Denne fil er ikke en gyldig wwwallet-sikkerhedskopi.',
    vaultUnlockFailed: 'Forkert gendannelsesfrase eller beskadiget boks.',
    unlockMethodNotEnrolled: '{method} er ikke konfigureret til denne boks.',
    passkeyNotSetUp: 'Der er ikke oprettet en adgangskode til denne boks.',
    vaultLocked: 'Boks er låst',
    chooseKeystoreFile: 'Vælg en keystore-fil',
  },
  currency: {
    USD: 'amerikansk dollar',
    EUR: 'Euro',
    GBP: 'Britisk pund',
    AUD: 'australsk dollar',
    CAD: 'Canadisk dollar',
    JPY: 'Japansk yen',
    CHF: 'Schweizisk franc',
    CNH: 'Yuan',
    SEK: 'Svensk krone',
    NZD: 'New Zealand-dollar',
  },
}
