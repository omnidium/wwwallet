export default {
  common: {
    cancel: 'Avbryt',
    save: 'Spara',
    done: 'Klart',
    goBack: 'Gå tillbaka',
    label: 'Etikett',
    chain: 'Kedja',
    address: 'Adress',
  },
  nav: {
    settings: 'Inställningar',
    accounts: 'Konton',
    dismiss: 'Stäng',
  },
  accounts: {
    title: 'Konton',
    addAccount: 'Lägg till konto',
    empty: 'Inga konton ännu. Lägg till ett för att komma igång.',
  },
  accountDetail: {
    swap: 'Byt',
    transactions: 'Transaktioner',
    receiveAria: 'Ta emot kryptovaluta',
    sendAria: 'Skicka kryptovaluta',
  },
  addAccount: {
    title: 'Lägg till konto',
    tabCreate: 'Skapa nytt',
    tabMnemonic: 'Importera minnesregel',
    tabPrivateKey: 'Importera privat nyckel',
    tabKeystore: 'Importera nyckelarkivfil',
    mnemonicLabel: 'Återställningsfras (minnesregel)',
    privateKeyLabel: 'Privat nyckel',
    keystoreFileLabel: 'JSON-fil för nyckelarkivet',
    filePasswordLabel: 'Lösenordet till den här filen',
    filePasswordHint:
      'Det lösenord som denna nyckelarkivfil ursprungligen krypterades med – inte ett nytt lösenord. När den väl har importerats behöver du bara låsa upp ditt valv.',
    noPasswordHint:
      'Inget lösenord behövs – det här kontot skyddas av ditt valvs egen upplåsningsmetod (Face ID/Touch ID eller återställningsfras).',
    submit: 'Lägg till konto',
  },
  send: {
    title: 'Skicka',
    fromLabel: 'Från {label} ({chain})',
    recipientLabel: 'Mottagarens adress',
    scanQrAria: 'Skanna QR-koden',
    amountLabel: 'Belopp',
    submit: 'Skicka',
  },
  receive: {
    title: 'Ta emot',
    defaultAccountLabel: 'Konto',
    tapToCopy: 'Tryck för att kopiera',
    copyAria: 'Kopiera adressen',
  },
  swap: {
    title: 'Byt',
    sellTokenLabel: 'Sälj token (adress eller ETH för den inhemska valutan)',
    buyTokenLabel: 'Adress för att köpa token',
    sellAmountLabel: 'Försäljningsbelopp',
    getQuote: 'Begär offert',
    estimateText: 'Beräknat belopp: {amount} till priset {price}',
    signingNotice: 'Du signerar en transaktion till {address} (via 0x-aggregatorn).',
    submit: 'Byt',
  },
  payees: {
    title: 'Mottagare',
    add: 'Lägg till betalningsmottagare',
    empty: 'Inga betalningsmottagare ännu.',
    deleteAria: 'Ta bort {label}',
    labelField: 'Etikett',
    addressField: 'Adress',
  },
  backup: {
    title: 'Säkerhetskopiering och återställning',
    intro:
      'Säkerhetskopior krypteras på den här enheten innan de överförs. wwwallet:s server är aldrig inblandad – vid återställning på en ny enhet sker kommunikationen direkt med Google eller genom att en lokal fil läses in.',
    googleDriveTitle: 'Google Drive',
    backUpNow: 'Säkerhetskopiera nu',
    restoreLatest: 'Återställ den senaste säkerhetskopian',
    localFileTitle: 'Lokal fil',
    downloadBackup: 'Ladda ner säkerhetskopian',
    restoreFromFile: 'Återställ från fil',
    replaceTitle: 'Vill du byta ut din nuvarande plånbok?',
    replaceBody:
      'När du återställer raderas allt som för närvarande finns i detta valv – konton, betalningsmottagare och inställningar – och ersätts med innehållet i säkerhetskopian. Dessutom tas alla lösenord som har ställts in på den här enheten bort (du kan aktivera dem igen efter att du har låst upp enheten). Detta går inte att ångra.',
    replaceConfirm: 'Byt ut den',
  },
  vaultSetup: {
    createTitle: 'Skapa din plånbok',
    recoveryExplainer:
      'Detta är din {phrase}. Den krypterar allt på den här enheten och är det enda sättet att återfå åtkomst om du någonsin skulle förlora din åtkomstnyckel – även om du återställer en säkerhetskopia på en ny enhet. Skriv ner det eller spara det på ett säkert ställe, offline. Du kommer inte att behöva det i vardagen när snabbupplåsning har konfigurerats på nästa skärm, och wwwallet kommer aldrig att visa det för dig igen.',
    recoveryExplainerPhrase: 'återställningsfrasen',
    copyRecoveryPhrase: 'Kopiera återställningsfrasen',
    savedAckLabel: 'Jag har sparat min återställningsfras på en säker plats',
    createVault: 'Skapa valv',
    haveBackup: 'Har du redan en säkerhetskopia?',
    restoreFromDrive: 'Återställ från Google Drive',
    restoreFromLocalFile: 'Återställ från lokal fil',
    quickUnlockTitle: 'Ställ in snabbupplåsning',
    quickUnlockBody:
      'Använd Face ID eller Touch ID för att låsa upp enheten i vardagen, istället för din återställningsfras.',
    enablePasskey: 'Aktivera Face ID / Touch ID',
    passkeyEnabledLabel: 'Face ID/Touch ID aktiverat',
    passkeyUnsupportedNote:
      'Fungerar inte på den här enheten eller i den här webbläsaren – du kan fortfarande låsa upp med din återställningsfras, eller försöka igen senare via Inställningar.',
    skipTitle: 'Hoppa över snabbupplåsning?',
    skipBody:
      'Utan en lösenkod måste du ange hela återställningsfrasen varje gång du öppnar wwwallet. Du kan ställa in detta senare under Inställningar.',
    continueAnyway: 'Fortsätt ändå',
  },
  vaultUnlock: {
    title: 'Lås upp wwwallet',
    unlockWithPasskey: 'Lås upp med Face ID/Touch ID',
    recoveryPhraseLabel: 'Återställningsfras (24 ord)',
    unlock: 'Lås upp',
    useRecoveryInstead: 'Använd istället återställningsfrasen',
  },
  settings: {
    title: 'Inställningar',
    toggleThemeAria: 'Växla tema',
    closeAria: 'Stäng inställningarna',
    lockNow: 'Lås nu',
    languageLabel: 'Språk',
    currencyLabel: 'Valuta',
    securityTitle: 'Säkerhet',
    securityIntro:
      'Din återställningsfras lagras aldrig någonstans där den kan visas för dig – förvara den på ett säkert ställe. Face ID/Touch ID är det snabbaste sättet att låsa upp enheten i vardagen; wwwallet låser sig dessutom automatiskt efter några minuters inaktivitet.',
    passkeyLabel: 'Face ID / Touch ID',
    passkeyEnabled: 'Aktiverad',
    passkeyNotSetUp: 'Inte konfigurerat',
    remove: 'Ta bort',
    enable: 'Aktivera',
    removePasskeyTitle: 'Ta bort upplåsning med Face ID/Touch ID?',
    removePasskeyBody:
      'Du behöver din fullständiga återställningsfras varje gång du låser upp wwwallet tills du har ställt in en ny lösenkod.',
    removeAnyway: 'Ta bort ändå',
  },
  transactions: {
    title: 'Transaktioner',
    empty: 'Inga transaktioner hittades.',
    visitAccountFirst: 'Gå först till ett konto för att hämta dess transaktionshistorik.',
  },
  token: {
    defaultLabel: 'Token',
  },
  qrScanner: {
    title: 'Skanna QR-koden med adressen',
    cameraError:
      'Det gick inte att få åtkomst till kameran. Kontrollera behörigheterna och försök igen.',
  },
  validation: {
    amountGreaterThanZero: 'Ange ett belopp som är större än noll.',
    insufficientBalance:
      'Det belopp som ska överföras överstiger saldot på avsändarkontot (inklusive transaktionsavgift).',
    invalidRecipientAddress: 'Ange en giltig mottagaradress.',
    validTokenOrEth: 'Ange en giltig tokenadress eller ETH för den inbyggda tokenen.',
    validBuyToken: 'Ange en giltig adress för köptoken.',
    labelRequired: 'Etikett är obligatorisk.',
    validAddress: 'Ange en giltig adress.',
    filePasswordRequired: 'Lösenordet till den här filen krävs.',
    mnemonicWordCount: 'Felaktigt antal ord ({count}). Det krävs antingen 12 eller 24 ord.',
    privateKeyRequired: 'En privat nyckel krävs.',
    keystoreFileRequired: 'Välj en nyckelarkivfil.',
    recoveryPhraseFormat: 'Det ser inte ut som en giltig återställningsfras.',
  },
  msg: {
    account: {
      added: 'Kontot har lagts till.',
    },
    address: {
      copied: 'Adressen har kopierats.',
    },
    qr: {
      noAddress: 'QR-koden innehöll ingen identifierbar adress.',
    },
    send: {
      success: 'Skickat. Transaktions-hash: {hash}',
    },
    swap: {
      approvalSubmitted:
        'Godkännandet har skickats in. Vänta tills det bekräftas, och byt sedan igen.',
      success: 'Bytet har skickats in. Transaktions-hash: {hash}',
    },
    backup: {
      driveSuccess: 'Säkerhetskopierat till Google Drive.',
    },
    restore: {
      driveSuccess:
        'Återställt från Google Drive. Lås upp med din återställningsfras för att fortsätta.',
      fileSuccess: 'Återställt från filen. Lås upp med din återställningsfras för att fortsätta.',
      driveSuccessSetup:
        'Återställt från Google Drive. Ange din återställningsfras för att låsa upp.',
      fileSuccessSetup: 'Återställt från filen. Ange din återställningsfras för att låsa upp.',
    },
    recoveryPhrase: {
      copied: 'Återställningsfrasen har kopierats – den raderas från urklipp om 45 sekunder.',
      copyFailed: 'Det gick inte att kopiera automatiskt – markera och kopiera orden manuellt.',
    },
    passkey: {
      ready: 'Upplåsning med Face ID/Touch ID är klar.',
    },
  },
  errors: {
    unknown: 'Ett okänt fel har inträffat',
    requestFailed: 'Försöket att begära {path} misslyckades med {status}',
    webauthnUnavailable: 'WebAuthn är inte tillgängligt i den här webbläsaren',
    passkeyRegistrationCancelled: 'Registreringen av åtkomstkoden har avbrutits',
    passkeyNoPrfSecret: 'passkey returnerade inte någon PRF-hemlighet',
    passkeyUnlockCancelled: 'Låsupplåsningen med lösenord avbröts',
    prfNotSupported:
      'Den här enheten eller webbläsaren stöder inte upplåsning med lösenordsfri passnyckel (WebAuthn PRF). Du kan fortfarande låsa upp med din återställningsfras, eller prova en annan enhet eller webbläsare.',
    googleDriveNotConfigured:
      'Säkerhetskopieringen till Google Drive är inte konfigurerad (VITE_GOOGLE_CLIENT_ID saknas)',
    gisLoadFailed: 'Det gick inte att ladda Google Identity Services',
    googleSignInCancelled: 'Inloggningen via Google avbröts',
    googleDriveSearchFailed: 'Det gick inte att söka på Google Drive',
    googleDriveUploadFailed: 'Det gick inte att ladda upp säkerhetskopian till Google Drive',
    googleDriveNoBackup: 'Ingen säkerhetskopia hittades i det här Google-kontot',
    googleDriveDownloadFailed: 'Det gick inte att ladda ner säkerhetskopian från Google Drive',
    noVaultOnDevice: 'Det finns inget valv på den här enheten',
    cannotSaveNoVault: 'Det går inte att spara: det finns inget valv ännu',
    noRecoveryWrapToExport: 'vault har ingen återhämtningsfras att exportera',
    invalidBackupFile: 'Den här filen är inte en giltig säkerhetskopia av wwwallet.',
    vaultUnlockFailed: 'Felaktig återställningsfras eller skadat valv.',
    unlockMethodNotEnrolled: '{method} är inte konfigurerat för detta valv.',
    passkeyNotSetUp: 'Passordnyckeln är inte konfigurerad för detta valv.',
    vaultLocked: 'valvet är låst',
    chooseKeystoreFile: 'välj en nyckelarkivfil',
  },
  currency: {
    USD: 'amerikansk dollar',
    EUR: 'Euro',
    GBP: 'Brittiska pundet',
    AUD: 'australisk dollar',
    CAD: 'kanadensisk dollar',
    JPY: 'Japansk yen',
    CHF: 'Schweizisk franc',
    CNH: 'Yuan',
    SEK: 'svensk krona',
    NZD: 'Nya Zeeland-dollar',
  },
}
