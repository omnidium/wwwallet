export default {
  common: {
    cancel: 'Anulează',
    save: 'Salvare',
    done: 'Gata',
    goBack: 'Înapoi',
    label: 'Etichetă',
    chain: 'Lanț',
    address: 'Adresă',
  },
  nav: {
    settings: 'Setări',
    accounts: 'Conturi',
    dismiss: 'Ignoră',
  },
  accounts: {
    title: 'Conturi',
    addAccount: 'Adaugă un cont',
    empty: 'Nu există încă conturi. Adaugă unul pentru a începe.',
  },
  accountDetail: {
    swap: 'Schimb',
    transactions: 'Tranzacții',
    receiveAria: 'Primiți criptomonede',
    sendAria: 'Trimite criptomonede',
  },
  addAccount: {
    title: 'Adaugă cont',
    tabCreate: 'Creează unul nou',
    tabMnemonic: 'Mnemonică de import',
    tabPrivateKey: 'Importă cheia privată',
    tabKeystore: 'Importați fișierul keystore',
    mnemonicLabel: 'Fraza de recuperare (mnemonică)',
    privateKeyLabel: 'Cheie privată',
    keystoreFileLabel: 'Fișier JSON cu setul de chei',
    filePasswordLabel: 'Parola acestui fișier',
    filePasswordHint:
      'Parola cu care a fost criptat inițial acest fișier de stocare a cheilor — nu o parolă nouă. Odată importat, nu va mai trebui decât să deblocați seiful.',
    noPasswordHint:
      'Nu este necesară nicio parolă — acest cont este protejat prin metoda de deblocare specifică seifului tău (Face ID/Touch ID sau fraza de recuperare).',
    submit: 'Adaugă cont',
  },
  send: {
    title: 'Trimite',
    fromLabel: 'De la {label} ({chain})',
    recipientLabel: 'Adresa destinatarului',
    scanQrAria: 'Scanează codul QR',
    amountLabel: 'Suma',
    submit: 'Trimite',
  },
  receive: {
    title: 'Primiți',
    defaultAccountLabel: 'Cont',
    tapToCopy: 'Atinge pentru a copia',
    copyAria: 'Copiază adresa',
  },
  swap: {
    title: 'Schimb',
    sellTokenLabel: 'Vinde token (adresă sau ETH pentru tokenul nativ)',
    buyTokenLabel: 'Adresă pentru cumpărarea de tokenuri',
    sellAmountLabel: 'Suma de vânzare',
    getQuote: 'Solicită o ofertă',
    estimateText: 'Suma estimată de încasat: {amount} la prețul de {price}',
    signingNotice:
      'Semnezi o tranzacție pentru a încheia un contract cu {address} (prin intermediul agregatorului 0x).',
    submit: 'Schimb',
  },
  payees: {
    title: 'Beneficiari',
    add: 'Adăugare beneficiar de plată',
    empty: 'Nu există încă beneficiari.',
    deleteAria: 'Șterge {label}',
    labelField: 'Etichetă',
    addressField: 'Adresă',
  },
  backup: {
    title: 'Copiere de rezervă și restaurare',
    intro:
      'Copiile de rezervă sunt criptate pe acest dispozitiv înainte de a părăsi dispozitivul. Serverul wwwallet nu este niciodată implicat — restaurarea pe un dispozitiv nou se face direct prin Google sau prin citirea unui fișier local.',
    googleDriveTitle: 'Google Drive',
    backUpNow: 'Fă o copie de rezervă acum',
    restoreLatest: 'Restaurează cea mai recentă copie de rezervă',
    localFileTitle: 'Fișier local',
    downloadBackup: 'Descărcați fișierul de rezervă',
    restoreFromFile: 'Restaurare din fișier',
    replaceTitle: 'Vrei să-ți schimbi portofelul actual?',
    replaceBody:
      'Restaurarea va suprascrie tot ce se află în prezent în acest seif — conturi, beneficiari și setări — cu conținutul copiei de rezervă și va șterge orice parolă configurată pe acest dispozitiv (o veți reactiva după deblocare). Această acțiune nu poate fi anulată.',
    replaceConfirm: 'Înlocuiește-l',
  },
  vaultSetup: {
    createTitle: 'Creează-ți portofelul',
    recoveryExplainer:
      'Acesta este codul tău {phrase}. Acesta criptează tot conținutul de pe acest dispozitiv și reprezintă singura modalitate de a-ți recăpăta accesul în cazul în care îți pierzi cheia de acces — inclusiv atunci când restaurezi o copie de rezervă pe un dispozitiv nou. Notează-l sau copiază-l într-un loc sigur, offline. Nu vei mai avea nevoie de el în activitatea de zi cu zi odată ce ai configurat deblocarea rapidă pe ecranul următor, iar wwwallet nu ți-l va mai afișa niciodată.',
    recoveryExplainerPhrase: 'fraza de recuperare',
    copyRecoveryPhrase: 'Copiază fraza de recuperare',
    savedAckLabel: 'Am păstrat fraza de recuperare într-un loc sigur',
    createVault: 'Creează un seif',
    haveBackup: 'Ai deja o copie de rezervă?',
    restoreFromDrive: 'Restaurare din Google Drive',
    restoreFromLocalFile: 'Restaurare dintr-un fișier local',
    quickUnlockTitle: 'Configurarea deblocării rapide',
    quickUnlockBody:
      'Folosește Face ID sau Touch ID pentru a debloca dispozitivul în fiecare zi, în loc de fraza de recuperare.',
    enablePasskey: 'Activează Face ID / Touch ID',
    passkeyEnabledLabel: 'Face ID / Touch ID activat(ă)',
    passkeyUnsupportedNote:
      'Nu este acceptat pe acest dispozitiv sau browser — poți totuși să deblochezi contul folosind fraza de recuperare sau să încerci din nou mai târziu din Setări.',
    skipTitle: 'Să sari peste deblocarea rapidă?',
    skipBody:
      'Fără o parolă de acces, va trebui să introduci fraza completă de recuperare de fiecare dată când deschizi wwwallet. Poți configura această opțiune mai târziu din Setări.',
    continueAnyway: 'Continuă oricum',
  },
  vaultUnlock: {
    title: 'Deblochează wwwallet',
    unlockWithPasskey: 'Deblochează cu Face ID / Touch ID',
    recoveryPhraseLabel: 'Fraza de recuperare (24 de cuvinte)',
    unlock: 'Deblochează',
    useRecoveryInstead: 'Folosește în schimb fraza de recuperare',
  },
  settings: {
    title: 'Setări',
    toggleThemeAria: 'Comută tema',
    closeAria: 'Închide setările',
    lockNow: 'Blochează acum',
    languageLabel: 'Limba',
    currencyLabel: 'Monedă',
    securityTitle: 'Securitate',
    securityIntro:
      'Fraza ta de recuperare nu este niciodată stocată într-un loc în care ți-ar putea fi afișată — păstreaz-o într-un loc sigur. Face ID / Touch ID reprezintă cea mai rapidă metodă de deblocare în fiecare zi; wwwallet se blochează, de asemenea, automat după câteva minute de inactivitate.',
    passkeyLabel: 'Face ID / Touch ID',
    passkeyEnabled: 'Activat',
    passkeyNotSetUp: 'Nu este configurat',
    remove: 'Eliminare',
    enable: 'Activați',
    removePasskeyTitle: 'Să dezactivez deblocarea prin Face ID / Touch ID?',
    removePasskeyBody:
      'Vei avea nevoie de fraza completă de recuperare de fiecare dată când deblochezi wwwallet, până când vei configura din nou o parolă.',
    removeAnyway: 'Elimină oricum',
  },
  transactions: {
    title: 'Tranzacții',
    empty: 'Nu s-au găsit tranzacții.',
    visitAccountFirst:
      'Accesați mai întâi un cont pentru a încărca istoricul tranzacțiilor acestuia.',
  },
  token: {
    defaultLabel: 'Token',
  },
  qrScanner: {
    title: 'Scanează codul QR al adresei',
    cameraError: 'Accesul la cameră a eșuat. Verificați permisiunile și încercați din nou.',
  },
  validation: {
    amountGreaterThanZero: 'Introduceți o valoare mai mare decât zero.',
    insufficientBalance:
      'Suma de transferat este mai mare decât soldul contului de origine (inclusiv comisionul de tranzacție).',
    invalidRecipientAddress: 'Introduceți o adresă validă a destinatarului.',
    validTokenOrEth: 'Introduceți o adresă de token validă sau ETH pentru tokenul nativ.',
    validBuyToken: 'Introduceți o adresă validă pentru tokenul de cumpărare.',
    labelRequired: 'Eticheta este obligatorie.',
    validAddress: 'Introduceți o adresă validă.',
    filePasswordRequired: 'Este necesară introducerea parolei pentru acest fișier.',
    mnemonicWordCount:
      'Număr incorect de cuvinte ({count}). Sunt necesare fie 12, fie 24 de cuvinte.',
    privateKeyRequired: 'Este necesară o cheie privată.',
    keystoreFileRequired: 'Alegeți un fișier de stocare a cheilor.',
    recoveryPhraseFormat: 'Nu pare a fi o frază de recuperare validă.',
  },
  msg: {
    account: {
      added: 'Contul a fost adăugat.',
    },
    address: {
      copied: 'Adresa a fost copiată.',
    },
    qr: {
      noAddress: 'Codul QR nu conținea o adresă recunoscută.',
    },
    send: {
      success: 'Trimis. Hash-ul tranzacției: {hash}',
    },
    swap: {
      approvalSubmitted:
        'S-a trimis cererea de aprobare. Așteaptă confirmarea, apoi schimbă din nou.',
      success: 'Schimbul a fost trimis. Hash-ul tranzacției: {hash}',
    },
    backup: {
      driveSuccess: 'S-a făcut o copie de rezervă pe Google Drive.',
    },
    restore: {
      driveSuccess:
        'Restaurat din Google Drive. Deblochează-l folosind fraza de recuperare pentru a continua.',
      fileSuccess:
        'A fost restaurat din fișier. Deblocați-l folosind fraza de recuperare pentru a continua.',
      driveSuccessSetup:
        'A fost restaurat din Google Drive. Introdu fraza de recuperare pentru a-l debloca.',
      fileSuccessSetup:
        'A fost restaurat din fișier. Introduceți fraza de recuperare pentru a debloca.',
    },
    recoveryPhrase: {
      copied: 'Fraza de recuperare a fost copiată — va fi ștearsă din clipboard în 45 de secunde.',
      copyFailed: 'Nu s-a putut copia automat — selectați și copiați cuvintele manual.',
    },
    passkey: {
      ready: 'Deblocarea prin Face ID / Touch ID este gata.',
    },
  },
  errors: {
    unknown: 'A apărut o eroare necunoscută',
    requestFailed: 'Solicitarea către {path} a eșuat din cauza {status}',
    webauthnUnavailable: 'WebAuthn nu este disponibil în acest browser',
    passkeyRegistrationCancelled: 'înregistrarea parolei a fost anulată',
    passkeyNoPrfSecret: 'passkey nu a returnat un secret PRF',
    passkeyUnlockCancelled: 'Deblocarea cu parolă a fost anulată',
    prfNotSupported:
      'Acest dispozitiv sau browser nu acceptă deblocarea fără parolă, folosind o cheie de acces (WebAuthn PRF). Puteți totuși să deblocați contul folosind fraza de recuperare sau să încercați un alt dispozitiv/browser.',
    googleDriveNotConfigured:
      'Copia de rezervă pe Google Drive nu este configurată (lipsește VITE_GOOGLE_CLIENT_ID)',
    gisLoadFailed: 'Nu s-au putut încărca serviciile de identitate Google',
    googleSignInCancelled: 'Autentificarea prin Google a fost anulată',
    googleDriveSearchFailed: 'nu s-a putut efectua căutarea în Google Drive',
    googleDriveUploadFailed: 'Nu s-a reușit încărcarea copiei de rezervă pe Google Drive',
    googleDriveNoBackup: 'nu s-a găsit nicio copie de rezervă în acest cont Google',
    googleDriveDownloadFailed: 'Nu s-a reușit descărcarea copiei de rezervă de pe Google Drive',
    noVaultOnDevice: 'pe acest dispozitiv nu există niciun seif',
    cannotSaveNoVault: 'Nu se poate salva: nu există încă un seif',
    noRecoveryWrapToExport:
      'seiful nu conține nicio frază de recuperare care să poată fi exportată',
    invalidBackupFile: 'Acest fișier nu este o copie de rezervă validă a wwwallet.',
    vaultUnlockFailed: 'Fraza de recuperare este incorectă sau seiful este corupt.',
    unlockMethodNotEnrolled: '{method} nu este configurat pentru acest seif.',
    passkeyNotSetUp: 'Cheia de acces nu este configurată pentru acest seif.',
    vaultLocked: 'seiful este încuiat',
    chooseKeystoreFile: 'alegeți un fișier de stocare a cheilor',
  },
  currency: {
    USD: 'dolarul american',
    EUR: 'Euro',
    GBP: 'Lira sterlină',
    AUD: 'dolarul australian',
    CAD: 'dolarul canadian',
    JPY: 'yenul japonez',
    CHF: 'Franc elvețian',
    CNH: 'Yuan',
    SEK: 'Coroana suedeză',
    NZD: 'Dolarul neozeelandez',
  },
}
