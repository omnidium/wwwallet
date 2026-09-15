export default {
  common: {
    cancel: 'Annulla',
    save: 'Salva',
    done: 'Fatto',
    goBack: 'Torna indietro',
    label: 'Etichetta',
    chain: 'Catena',
    address: 'Indirizzo',
  },
  nav: {
    settings: 'Impostazioni',
    accounts: 'Conti',
    dismiss: 'Ignora',
  },
  accounts: {
    title: 'Conti',
    addAccount: 'Aggiungi account',
    empty: 'Non ci sono ancora account. Aggiungine uno per iniziare.',
  },
  accountDetail: {
    swap: 'Scambio',
    transactions: 'Transazioni',
    receiveAria: 'Ricevi criptovalute',
    sendAria: 'Invia criptovaluta',
  },
  addAccount: {
    title: 'Aggiungi account',
    tabCreate: 'Crea nuovo',
    tabMnemonic: 'Mnemonico di importazione',
    tabPrivateKey: 'Importa chiave privata',
    tabKeystore: 'Importa il file keystore',
    mnemonicLabel: 'Frase di recupero (mnemonica)',
    privateKeyLabel: 'Chiave privata',
    keystoreFileLabel: 'File JSON dell’archivio chiavi',
    filePasswordLabel: 'La password di questo file',
    filePasswordHint:
      'La password con cui questo file keystore è stato originariamente crittografato — non una nuova password. Una volta importato, basterà sbloccare il vault.',
    noPasswordHint:
      'Non serve alcuna password: questo account è protetto dal metodo di sblocco del tuo vault (Face ID/Touch ID o frase di recupero).',
    submit: 'Aggiungi account',
  },
  send: {
    title: 'Invia',
    fromLabel: 'Da {label} ({chain})',
    recipientLabel: 'Indirizzo del destinatario',
    scanQrAria: 'Scansiona il codice QR',
    amountLabel: 'Importo',
    submit: 'Invia',
  },
  receive: {
    title: 'Ricevi',
    defaultAccountLabel: 'Account',
    tapToCopy: 'Tocca per copiare',
    copyAria: "Copia l'indirizzo",
  },
  swap: {
    title: 'Scambio',
    sellTokenLabel: 'Vendi token (indirizzo o ETH per i token nativi)',
    buyTokenLabel: 'Acquista indirizzo token',
    sellAmountLabel: 'Importo della vendita',
    getQuote: 'Richiedi un preventivo',
    estimateText: 'Importo stimato da ricevere: {amount} al prezzo di {price}',
    signingNotice: "Stai firmando una transazione per {address} (tramite l'aggregatore 0x).",
    submit: 'Scambio',
  },
  payees: {
    title: 'Beneficiari',
    add: 'Aggiungi beneficiario',
    empty: 'Non ci sono ancora beneficiari.',
    deleteAria: 'Elimina {label}',
    labelField: 'Etichetta',
    addressField: 'Indirizzo',
  },
  backup: {
    title: 'Backup e ripristino',
    intro:
      'Su questo dispositivo, i backup vengono crittografati prima ancora di essere trasferiti altrove. Il server di wwwallet non viene mai coinvolto: il ripristino su un nuovo dispositivo avviene direttamente tramite Google oppure leggendo un file locale.',
    googleDriveTitle: 'Google Drive',
    backUpNow: 'Esegui subito il backup',
    restoreLatest: "Ripristina l'ultimo backup",
    localFileTitle: 'File locale',
    downloadBackup: 'Scarica il file di backup',
    restoreFromFile: 'Ripristina da file',
    replaceTitle: 'Vuoi sostituire il tuo portafoglio attuale?',
    replaceBody:
      'Il ripristino sovrascriverà tutto il contenuto attuale di questo archivio — conti, beneficiari e impostazioni — con i dati presenti nel backup e rimuoverà qualsiasi codice di accesso impostato su questo dispositivo (potrai riattivarlo dopo lo sblocco). Questa operazione non può essere annullata.',
    replaceConfirm: 'Sostituiscilo',
  },
  vaultSetup: {
    createTitle: 'Crea il tuo portafoglio',
    recoveryExplainer:
      'Questo è il tuo {phrase}. Crittografa tutti i dati presenti su questo dispositivo ed è l’unico modo per accedervi nuovamente se dovessi perdere l’accesso alla tua passkey, anche in caso di ripristino di un backup su un nuovo dispositivo. Annotala o salvala in un luogo sicuro, offline. Non ne avrai bisogno quotidianamente una volta configurato lo sblocco rapido nella schermata successiva, e wwwallet non te la mostrerà mai più.',
    recoveryExplainerPhrase: 'frase di recupero',
    copyRecoveryPhrase: 'Copia la frase di recupero',
    savedAckLabel: 'Ho conservato la mia frase di recupero in un posto sicuro',
    createVault: 'Crea un archivio',
    haveBackup: 'Hai già un backup?',
    restoreFromDrive: 'Ripristina da Google Drive',
    restoreFromLocalFile: 'Ripristina da file locale',
    quickUnlockTitle: 'Configurare lo sblocco rapido',
    quickUnlockBody:
      'Usa Face ID o Touch ID per sbloccare il dispositivo ogni giorno, invece della tua frase di recupero.',
    enablePasskey: 'Attiva Face ID / Touch ID',
    passkeyEnabledLabel: 'Face ID / Touch ID abilitati',
    passkeyUnsupportedNote:
      'Non supportato su questo dispositivo o browser: puoi comunque sbloccare il dispositivo utilizzando la tua frase di recupero oppure riprovare più tardi dalle Impostazioni.',
    skipTitle: 'Salta lo sblocco rapido?',
    skipBody:
      'Senza una passkey, dovrai inserire la frase di recupero completa ogni volta che apri wwwallet. Puoi configurarla in un secondo momento dalle Impostazioni.',
    continueAnyway: 'Continua comunque',
  },
  vaultUnlock: {
    title: 'Sblocca wwwallet',
    unlockWithPasskey: 'Sblocca con Face ID / Touch ID',
    recoveryPhraseLabel: 'Frase di recupero (24 parole)',
    unlock: 'Sblocca',
    useRecoveryInstead: 'Utilizza invece la frase di recupero',
  },
  settings: {
    title: 'Impostazioni',
    toggleThemeAria: 'Cambia tema',
    closeAria: 'Chiudi le impostazioni',
    lockNow: 'Blocca ora',
    languageLabel: 'Lingua',
    currencyLabel: 'Valuta',
    securityTitle: 'Sicurezza',
    securityIntro:
      'La tua frase di recupero non viene mai memorizzata in alcun luogo in cui possa esserti mostrata: conservala in un luogo sicuro. Face ID / Touch ID è il metodo più veloce per sbloccare il dispositivo ogni giorno; inoltre, wwwallet si blocca automaticamente dopo pochi minuti di inattività.',
    passkeyLabel: 'Face ID / Touch ID',
    passkeyEnabled: 'Abilitato',
    passkeyNotSetUp: 'Non configurato',
    remove: 'Rimuovi',
    enable: 'Abilita',
    removePasskeyTitle: 'Disattivare lo sblocco tramite Face ID / Touch ID?',
    removePasskeyBody:
      'Ti servirà la frase di recupero completa ogni volta che sbloccherai wwwallet, finché non imposterai nuovamente una passkey.',
    removeAnyway: 'Elimina comunque',
  },
  transactions: {
    title: 'Transazioni',
    empty: 'Nessuna transazione trovata.',
    visitAccountFirst:
      'Per visualizzare la cronologia delle transazioni di un conto, accedi prima a tale conto.',
  },
  token: {
    defaultLabel: 'Token',
  },
  qrScanner: {
    title: "Scansiona il codice QR dell'indirizzo",
    cameraError: 'Impossibile accedere alla fotocamera. Verificare i permessi e riprovare.',
  },
  validation: {
    amountGreaterThanZero: 'Inserisci un importo maggiore di zero.',
    insufficientBalance:
      "L'importo da inviare è superiore al saldo del conto di origine (compresa la commissione di transazione).",
    invalidRecipientAddress: 'Inserisci un indirizzo del destinatario valido.',
    validTokenOrEth: 'Inserisci un indirizzo token valido oppure ETH per la valuta nativa.',
    validBuyToken: 'Inserisci un indirizzo valido per il token di acquisto.',
    labelRequired: "È necessario inserire l'etichetta.",
    validAddress: 'Inserisci un indirizzo valido.',
    filePasswordRequired: 'È richiesta la password di questo file.',
    mnemonicWordCount: 'Numero di parole errato ({count}). Sono richieste 12 o 24 parole.',
    privateKeyRequired: 'È necessaria una chiave privata.',
    keystoreFileRequired: 'Scegli un file keystore.',
    recoveryPhraseFormat: 'Non sembra una frase di recupero valida.',
  },
  msg: {
    account: {
      added: 'Account aggiunto.',
    },
    address: {
      copied: 'Indirizzo copiato.',
    },
    qr: {
      noAddress: 'Il codice QR non conteneva un indirizzo riconoscibile.',
    },
    send: {
      success: 'Inviato. Hash della transazione: {hash}',
    },
    swap: {
      approvalSubmitted:
        'Richiesta di approvazione inviata. Attendere la conferma, quindi effettuare nuovamente lo scambio.',
      success: 'Scambio inviato. Hash della transazione: {hash}',
    },
    backup: {
      driveSuccess: 'È stato eseguito il backup su Google Drive.',
    },
    restore: {
      driveSuccess:
        'Ripristinato da Google Drive. Sblocca con la tua frase di recupero per continuare.',
      fileSuccess: 'Ripristinato dal file. Sblocca con la tua frase di recupero per continuare.',
      driveSuccessSetup:
        'Ripristinato da Google Drive. Inserisci la tua frase di recupero per sbloccarlo.',
      fileSuccessSetup: 'Ripristinato dal file. Inserisci la tua frase di recupero per sbloccarlo.',
    },
    recoveryPhrase: {
      copied:
        'La frase di recupero è stata copiata: verrà cancellata dagli appunti tra 45 secondi.',
      copyFailed: 'Impossibile copiare automaticamente: seleziona e copia le parole manualmente.',
    },
    passkey: {
      ready: 'Lo sblocco tramite Face ID / Touch ID è pronto.',
    },
  },
  errors: {
    unknown: 'Si è verificato un errore sconosciuto',
    requestFailed: 'La richiesta a {path} non è andata a buon fine a causa di {status}',
    webauthnUnavailable: 'WebAuthn non è disponibile in questo browser',
    passkeyRegistrationCancelled: 'La registrazione della passkey è stata annullata',
    passkeyNoPrfSecret: 'passkey non ha restituito un segreto PRF',
    passkeyUnlockCancelled: 'Lo sblocco tramite passkey è stato annullato',
    prfNotSupported:
      'Questo dispositivo o browser non supporta lo sblocco tramite passkey senza password (WebAuthn PRF). Puoi comunque sbloccare il dispositivo utilizzando la tua frase di recupero oppure provare con un altro dispositivo o browser.',
    googleDriveNotConfigured:
      'Il backup su Google Drive non è configurato (manca VITE_GOOGLE_CLIENT_ID)',
    gisLoadFailed: 'Impossibile caricare Google Identity Services',
    googleSignInCancelled: "L'accesso con Google è stato annullato",
    googleDriveSearchFailed: 'Impossibile effettuare la ricerca su Google Drive',
    googleDriveUploadFailed: 'Non è stato possibile caricare il backup su Google Drive',
    googleDriveNoBackup: 'Non è stato trovato alcun backup in questo account Google',
    googleDriveDownloadFailed: 'Non è stato possibile scaricare il backup da Google Drive',
    noVaultOnDevice: 'su questo dispositivo non è presente alcun vault',
    cannotSaveNoVault: 'Impossibile salvare: il vault non esiste ancora',
    noRecoveryWrapToExport: 'vault non contiene una stringa di recupero da esportare',
    invalidBackupFile: 'Questo file non è un backup valido di wwwallet.',
    vaultUnlockFailed: 'Frase di recupero errata o archivio danneggiato.',
    unlockMethodNotEnrolled: '{method} non è configurato per questo vault.',
    passkeyNotSetUp: 'Per questo vault non è stata configurata alcuna passkey.',
    vaultLocked: 'la cassaforte è chiusa a chiave',
    chooseKeystoreFile: 'scegli un file keystore',
  },
  currency: {
    USD: 'Dollaro statunitense',
    EUR: 'Euro',
    GBP: 'Sterlina inglese',
    AUD: 'Dollaro australiano',
    CAD: 'dollaro canadese',
    JPY: 'yen giapponese',
    CHF: 'Franco svizzero',
    CNH: 'Yuan',
    SEK: 'Corona svedese',
    NZD: 'Dollaro neozelandese',
  },
}
