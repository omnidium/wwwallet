export default {
  common: {
    cancel: 'Avbryt',
    save: 'Lagre',
    done: 'Ferdig',
    goBack: 'Gå tilbake',
    label: 'Etikett',
    chain: 'Kjede',
    address: 'Adresse',
  },
  nav: {
    settings: 'Innstillinger',
    accounts: 'Kontoer',
    dismiss: 'Avvis',
  },
  accounts: {
    title: 'Kontoer',
    addAccount: 'Legg til konto',
    empty: 'Ingen kontoer ennå. Opprett en for å komme i gang.',
  },
  accountDetail: {
    swap: 'Bytt',
    transactions: 'Transaksjoner',
    receiveAria: 'Motta kryptovaluta',
    sendAria: 'Send kryptovaluta',
  },
  addAccount: {
    title: 'Legg til konto',
    tabCreate: 'Opprett nytt',
    tabMnemonic: 'Import-mnemonikk',
    tabPrivateKey: 'Importer privatnøkkel',
    tabKeystore: 'Importer nøkkelarkivfil',
    mnemonicLabel: 'Gjenopprettingssetning (minnehjelp)',
    privateKeyLabel: 'Privatnøkkel',
    keystoreFileLabel: 'JSON-fil for nøkkelbeholder',
    filePasswordLabel: 'Passordet til denne filen',
    filePasswordHint:
      'Passordet som denne nøkkelarkivfilen opprinnelig ble kryptert med – ikke et nytt passord. Når den er importert, trenger du bare å låse opp hvelvet ditt.',
    noPasswordHint:
      'Du trenger ikke passord — denne kontoen er beskyttet av din egen opplåsingsmetode for hvelvet (Face ID/Touch ID eller gjenopprettingsfrase).',
    submit: 'Legg til konto',
  },
  send: {
    title: 'Send',
    fromLabel: 'Fra {label} ({chain})',
    recipientLabel: 'Mottakeradresse',
    scanQrAria: 'Skann QR-koden',
    amountLabel: 'Beløp',
    submit: 'Send',
  },
  receive: {
    title: 'Motta',
    defaultAccountLabel: 'Konto',
    tapToCopy: 'Trykk for å kopiere',
    copyAria: 'Kopier adresse',
  },
  swap: {
    title: 'Bytt',
    sellTokenLabel: 'Selg token (adresse eller ETH for egen valuta)',
    buyTokenLabel: 'Kjøp token-adresse',
    sellAmountLabel: 'Salgsbeløp',
    getQuote: 'Få tilbud',
    estimateText: 'Anslått mottak: {amount} til pris {price}',
    signingNotice:
      'Du signerer en transaksjon for å inngå en avtale med {address} (via 0x-aggregatoren).',
    submit: 'Bytte',
  },
  payees: {
    title: 'Mottakere',
    add: 'Legg til betalingsmottaker',
    empty: 'Ingen betalingsmottakere ennå.',
    deleteAria: 'Slett {label}',
    labelField: 'Etikett',
    addressField: 'Adresse',
  },
  backup: {
    title: 'Sikkerhetskopiering og gjenoppretting',
    intro:
      'Sikkerhetskopiene krypteres på denne enheten før de forlater den. wwwallet-serveren er aldri involvert — når man gjenoppretter data på en ny enhet, kommuniserer enheten direkte med Google eller leser en lokal fil.',
    googleDriveTitle: 'Google Drive',
    backUpNow: 'Ta sikkerhetskopi nå',
    restoreLatest: 'Gjenopprett siste sikkerhetskopi',
    localFileTitle: 'Lokal fil',
    downloadBackup: 'Last ned sikkerhetskopifilen',
    restoreFromFile: 'Gjenopprett fra fil',
    replaceTitle: 'Vil du bytte ut den nåværende lommeboken din?',
    replaceBody:
      'Når du gjenoppretter, overskrives alt som for øyeblikket finnes i dette hvelvet – kontoer, betalingsmottakere og innstillinger – med innholdet i sikkerhetskopien, og eventuelle passord som er angitt på denne enheten, blir slettet (du må aktivere det på nytt etter at du har låst opp enheten). Dette kan ikke gjøres om.',
    replaceConfirm: 'Bytt den ut',
  },
  vaultSetup: {
    createTitle: 'Opprett lommeboken din',
    recoveryExplainer:
      'Dette er din {phrase}. Den krypterer alt på denne enheten og er den eneste måten å få tilgang igjen på hvis du noen gang mister tilgangen til passordnøkkelen din — også når du gjenoppretter en sikkerhetskopi på en ny enhet. Skriv den ned eller kopier den til et sikkert sted, uten nettilgang. Du vil ikke trenge den i hverdagen når hurtigopplåsing er konfigurert på neste skjermbilde, og wwwallet vil aldri vise den til deg igjen.',
    recoveryExplainerPhrase: 'gjenopprettingsfrase',
    copyRecoveryPhrase: 'Kopier gjenopprettingsfrasen',
    savedAckLabel: 'Jeg har lagret gjenopprettingsfrasen min på et trygt sted',
    createVault: 'Opprett hvelv',
    haveBackup: 'Har du allerede en sikkerhetskopi?',
    restoreFromDrive: 'Gjenopprett fra Google Drive',
    restoreFromLocalFile: 'Gjenopprett fra lokal fil',
    quickUnlockTitle: 'Konfigurer hurtigopplåsing',
    quickUnlockBody:
      'Bruk Face ID eller Touch ID til å låse opp enheten i hverdagen, i stedet for gjenopprettingsfrasen din.',
    enablePasskey: 'Aktiver Face ID / Touch ID',
    passkeyEnabledLabel: 'Face ID / Touch ID er aktivert',
    passkeyUnsupportedNote:
      'Dette støttes ikke på denne enheten eller i denne nettleseren — du kan likevel låse opp med gjenopprettingsfrasen din, eller prøve igjen senere via Innstillinger.',
    skipTitle: 'Hopp over hurtigopplåsing?',
    skipBody:
      'Uten en passnøkkel må du oppgi hele gjenopprettingsfrasen hver gang du åpner wwwallet. Du kan konfigurere dette senere under Innstillinger.',
    continueAnyway: 'Fortsett likevel',
  },
  vaultUnlock: {
    title: 'Lås opp wwwallet',
    unlockWithPasskey: 'Lås opp med Face ID / Touch ID',
    recoveryPhraseLabel: 'Gjenopprettingssetning (24 ord)',
    unlock: 'Lås opp',
    useRecoveryInstead: 'Bruk gjenopprettingsfrasen i stedet',
  },
  settings: {
    title: 'Innstillinger',
    toggleThemeAria: 'Bytt tema',
    closeAria: 'Lukk innstillinger',
    lockNow: 'Lås nå',
    languageLabel: 'Språk',
    currencyLabel: 'Valuta',
    securityTitle: 'Sikkerhet',
    securityIntro:
      'Gjenopprettingsfrasen din lagres aldri på et sted der den kan vises for deg – oppbevar den på et sikkert sted. Face ID / Touch ID er den raskeste måten å låse opp enheten på i hverdagen; wwwallet låser seg også automatisk etter noen minutter uten aktivitet.',
    passkeyLabel: 'Face ID / Touch ID',
    passkeyEnabled: 'Aktivert',
    passkeyNotSetUp: 'Ikke konfigurert',
    remove: 'Fjern',
    enable: 'Aktiver',
    removePasskeyTitle: 'Fjerne opplåsing med Face ID / Touch ID?',
    removePasskeyBody:
      'Du må oppgi hele gjenopprettingsfrasen hver gang du låser opp wwwallet, helt til du har konfigurert en passnøkkel på nytt.',
    removeAnyway: 'Fjern likevel',
  },
  transactions: {
    title: 'Transaksjoner',
    empty: 'Det ble ikke funnet noen transaksjoner.',
    visitAccountFirst: 'Gå først inn på en konto for å laste inn transaksjonshistorikken.',
  },
  token: {
    defaultLabel: 'Token',
  },
  qrScanner: {
    title: 'Skann QR-koden med adressen',
    cameraError:
      'Det gikk ikke å få tilgang til kameraet. Sjekk tilgangstillatelsene og prøv på nytt.',
  },
  validation: {
    amountGreaterThanZero: 'Skriv inn et tall større enn null.',
    insufficientBalance:
      'Beløpet som skal overføres, er større enn saldoen på avsenderkontoen (inkludert transaksjonsgebyr).',
    invalidRecipientAddress: 'Skriv inn en gyldig mottakeradresse.',
    validTokenOrEth: 'Skriv inn en gyldig tokenadresse, eller ETH for den innebygde.',
    validBuyToken: 'Skriv inn en gyldig adresse for kjøpstoken.',
    labelRequired: 'Etikett er påkrevd.',
    validAddress: 'Skriv inn en gyldig adresse.',
    filePasswordRequired: 'Det kreves passord for denne filen.',
    mnemonicWordCount: 'Feil antall ord ({count}). Det må være enten 12 eller 24 ord.',
    privateKeyRequired: 'Det kreves en privat nøkkel.',
    keystoreFileRequired: 'Velg en nøkkelarkivfil.',
    recoveryPhraseFormat: 'Det ser ikke ut som en gyldig gjenopprettingsfrase.',
  },
  msg: {
    account: {
      added: 'Kontoen er lagt til.',
    },
    address: {
      copied: 'Adressen er kopiert.',
    },
    qr: {
      noAddress: 'QR-koden inneholdt ingen gjenkjennelig adresse.',
    },
    send: {
      success: 'Sendt. Transaksjons-hash: {hash}',
    },
    swap: {
      approvalSubmitted:
        'Godkjenningen er sendt inn. Vent til den er bekreftet, og bytt deretter igjen.',
      success: 'Bytte er sendt inn. Transaksjons-hash: {hash}',
    },
    backup: {
      driveSuccess: 'Sikkerhetskopiert til Google Drive.',
    },
    restore: {
      driveSuccess:
        'Gjenopprettet fra Google Drive. Lås opp med gjenopprettingsfrasen din for å fortsette.',
      fileSuccess: 'Gjenopprettet fra fil. Lås opp med gjenopprettingsfrasen din for å fortsette.',
      driveSuccessSetup:
        'Gjenopprettet fra Google Drive. Skriv inn gjenopprettingsfrasen din for å låse opp.',
      fileSuccessSetup: 'Gjenopprettet fra fil. Skriv inn gjenopprettingsfrasen for å låse opp.',
    },
    recoveryPhrase: {
      copied:
        'Gjenopprettingsfrasen er kopiert — den blir slettet fra utklippstavlen om 45 sekunder.',
      copyFailed: 'Det gikk ikke å kopiere automatisk — velg og kopier ordene manuelt.',
    },
    passkey: {
      ready: 'Opplåsing med Face ID/Touch ID er klar.',
    },
  },
  errors: {
    unknown: 'Det oppstod en ukjent feil',
    requestFailed: 'Forespørselen til {path} mislyktes med {status}',
    webauthnUnavailable: 'WebAuthn er ikke tilgjengelig i denne nettleseren',
    passkeyRegistrationCancelled: 'Registreringen av passordet ble kansellert',
    passkeyNoPrfSecret: 'Passkey returnerte ikke en PRF-hemmelighet',
    passkeyUnlockCancelled: 'Opplåsingen med passord ble avbrutt',
    prfNotSupported:
      'Denne enheten eller nettleseren støtter ikke passordfri opplåsing med passnøkkel (WebAuthn PRF). Du kan fortsatt låse opp med gjenopprettingsfrasen din, eller prøve en annen enhet/nettleser.',
    googleDriveNotConfigured:
      'Sikkerhetskopiering til Google Drive er ikke konfigurert (VITE_GOOGLE_CLIENT_ID mangler)',
    gisLoadFailed: 'Det gikk ikke an å laste inn Google Identity Services',
    googleSignInCancelled: 'Google-påloggingen ble avbrutt',
    googleDriveSearchFailed: 'Det lyktes ikke å søke i Google Drive',
    googleDriveUploadFailed: 'Det gikk ikke å laste opp sikkerhetskopien til Google Drive',
    googleDriveNoBackup: 'Det ble ikke funnet noen sikkerhetskopi i denne Google-kontoen',
    googleDriveDownloadFailed: 'Det lyktes ikke å laste ned sikkerhetskopien fra Google Drive',
    noVaultOnDevice: 'Det finnes ingen hvelv på denne enheten',
    cannotSaveNoVault: 'Kan ikke lagre: Det finnes ikke noe hvelv ennå',
    noRecoveryWrapToExport: 'vault har ingen gjenopprettingsfrase som kan eksporteres',
    invalidBackupFile: 'Denne filen er ikke en gyldig wwwallet-sikkerhetskopi.',
    vaultUnlockFailed: 'Feil gjenopprettingsfrase eller ødelagt hvelv.',
    unlockMethodNotEnrolled: '{method} er ikke konfigurert for dette hvelvet.',
    passkeyNotSetUp: 'Passordnøkkelen er ikke konfigurert for dette hvelvet.',
    vaultLocked: 'hvelvet er låst',
    chooseKeystoreFile: 'Velg en nøkkelarkivfil',
  },
  currency: {
    USD: 'amerikansk dollar',
    EUR: 'Euro',
    GBP: 'Britisk pund',
    AUD: 'australske dollar',
    CAD: 'kanadisk dollar',
    JPY: 'Japansk yen',
    CHF: 'sveitsisk franc',
    CNH: 'Yuan',
    SEK: 'Svensk krone',
    NZD: 'New Zealand-dollar',
  },
}
