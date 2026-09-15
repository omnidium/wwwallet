export default {
  common: {
    cancel: 'Zrušit',
    save: 'Uložit',
    done: 'Hotovo',
    goBack: 'Zpět',
    label: 'Štítek',
    chain: 'Řetěz',
    address: 'Adresa',
  },
  nav: {
    settings: 'Nastavení',
    accounts: 'Účty',
    dismiss: 'Zavřít',
  },
  accounts: {
    title: 'Účty',
    addAccount: 'Přidat účet',
    empty: 'Zatím nemáte žádný účet. Přidejte si ho a začněte.',
  },
  accountDetail: {
    swap: 'Vyměnit',
    transactions: 'Transakce',
    receiveAria: 'Přijímat kryptoměny',
    sendAria: 'Odeslat kryptoměnu',
  },
  addAccount: {
    title: 'Přidat účet',
    tabCreate: 'Vytvořit nový',
    tabMnemonic: 'Mnemotechnický výraz pro import',
    tabPrivateKey: 'Načíst soukromý klíč',
    tabKeystore: 'Načíst soubor úložiště klíčů',
    mnemonicLabel: 'Obnovovací fráze (mnemotechnická pomůcka)',
    privateKeyLabel: 'Soukromý klíč',
    keystoreFileLabel: 'Soubor JSON s úložištěm klíčů',
    filePasswordLabel: 'Heslo k tomuto souboru',
    filePasswordHint:
      'Heslo, kterým byl tento soubor úložiště klíčů původně zašifrován – nikoli nové heslo. Po importu stačí pouze odemknout trezor.',
    noPasswordHint:
      'Heslo není potřeba – tento účet je chráněn vlastním způsobem odemykání vašeho trezoru (Face ID/Touch ID nebo obnovovací fráze).',
    submit: 'Přidat účet',
  },
  send: {
    title: 'Odeslat',
    fromLabel: 'Od {label} ({chain})',
    recipientLabel: 'Adresa příjemce',
    scanQrAria: 'Naskenujte QR kód',
    amountLabel: 'Částka',
    submit: 'Odeslat',
  },
  receive: {
    title: 'Přijmout',
    defaultAccountLabel: 'Účet',
    tapToCopy: 'Klepnutím zkopírujete',
    copyAria: 'Zkopírovat adresu',
  },
  swap: {
    title: 'Vyměnit',
    sellTokenLabel: 'Prodat token (na adresu nebo za ETH v případě nativního tokenu)',
    buyTokenLabel: 'Adresa pro nákup tokenu',
    sellAmountLabel: 'Prodané množství',
    getQuote: 'Získat cenovou nabídku',
    estimateText: 'Odhadovaná částka k obdržení: {amount} za cenu {price}',
    signingNotice: 'Podepisujete transakci určenou pro {address} (prostřednictvím agregátoru 0x).',
    submit: 'Vyměnit',
  },
  payees: {
    title: 'Příjemci plateb',
    add: 'Přidat příjemce platby',
    empty: 'Zatím nejsou žádní příjemci plateb.',
    deleteAria: 'Odstranit {label}',
    labelField: 'Štítek',
    addressField: 'Adresa',
  },
  backup: {
    title: 'Zálohování a obnovení',
    intro:
      'Zálohy jsou na tomto zařízení zašifrovány ještě předtím, než z něj odejdou. Server wwwallet se do tohoto procesu vůbec nezapojuje – při obnově na novém zařízení se zařízení spojí přímo se službou Google nebo načte místní soubor.',
    googleDriveTitle: 'Google Drive',
    backUpNow: 'Zálohujte hned teď',
    restoreLatest: 'Obnovit poslední zálohu',
    localFileTitle: 'Místní soubor',
    downloadBackup: 'Stáhnout záložní soubor',
    restoreFromFile: 'Obnovit ze souboru',
    replaceTitle: 'Chcete vyměnit svou současnou peněženku?',
    replaceBody:
      'Obnovením dojde k přepsání veškerého aktuálního obsahu tohoto trezoru – účtů, příjemců plateb a nastavení – daty ze zálohy a k odstranění veškerých přístupových klíčů nastavených na tomto zařízení (po odemknutí je budete moci znovu aktivovat). Tuto akci nelze vrátit zpět.',
    replaceConfirm: 'Vyměňte to',
  },
  vaultSetup: {
    createTitle: 'Vytvořte si peněženku',
    recoveryExplainer:
      'Toto je váš {phrase}. Šifruje veškerý obsah tohoto zařízení a představuje jediný způsob, jak se k němu znovu dostat, pokud někdy ztratíte přístup ke svému přístupovému klíči – včetně obnovení zálohy na novém zařízení. Zapište si ho nebo si ho zkopírujte na bezpečné místo offline. Jakmile na další obrazovce nastavíte rychlé odemykání, nebudete ho v běžném používání potřebovat a wwwallet vám ho už nikdy nezobrazí.',
    recoveryExplainerPhrase: 'obnovovací fráze',
    copyRecoveryPhrase: 'Zkopírovat obnovovací frázi',
    savedAckLabel: 'Svou obnovovací frázi jsem si uložil na bezpečném místě',
    createVault: 'Vytvořit trezor',
    haveBackup: 'Máte již zálohu?',
    restoreFromDrive: 'Obnovit z Google Drive',
    restoreFromLocalFile: 'Obnovit z lokálního souboru',
    quickUnlockTitle: 'Nastavit rychlé odemykání',
    quickUnlockBody:
      'K odemykání zařízení v běžném provozu používejte Face ID nebo Touch ID namísto obnovovací fráze.',
    enablePasskey: 'Zapnout Face ID / Touch ID',
    passkeyEnabledLabel: 'Podpora Face ID / Touch ID',
    passkeyUnsupportedNote:
      'Na tomto zařízení nebo v tomto prohlížeči není tato funkce podporována — stále se však můžete odemknout pomocí své obnovovací fráze, nebo to zkusit znovu později v Nastavení.',
    skipTitle: 'Přeskočit rychlé odemknutí?',
    skipBody:
      'Bez přístupového klíče budete při každém spuštění aplikace wwwallet zadávat celou obnovovací frázi. Tuto možnost můžete nastavit později v nastavení.',
    continueAnyway: 'Pokračovat i tak',
  },
  vaultUnlock: {
    title: 'Odemknout wwwallet',
    unlockWithPasskey: 'Odemknout pomocí Face ID / Touch ID',
    recoveryPhraseLabel: 'Obnovovací fráze (24 slov)',
    unlock: 'Odemknout',
    useRecoveryInstead: 'Místo toho použijte obnovovací frázi',
  },
  settings: {
    title: 'Nastavení',
    toggleThemeAria: 'Přepnout motiv',
    closeAria: 'Zavřít nastavení',
    lockNow: 'Zamknout nyní',
    languageLabel: 'Jazyk',
    currencyLabel: 'Měna',
    securityTitle: 'Bezpečnost',
    securityIntro:
      'Vaše obnovovací fráze není nikdy uložena na místě, kde by vám mohla být zobrazena – uložte si ji na bezpečném místě. Funkce Face ID / Touch ID představuje rychlý způsob každodenního odemykání; wwwallet se navíc po několika minutách nečinnosti automaticky uzamkne.',
    passkeyLabel: 'Face ID / Touch ID',
    passkeyEnabled: 'Zapnuto',
    passkeyNotSetUp: 'Není nastaveno',
    remove: 'Odstranit',
    enable: 'Povolit',
    removePasskeyTitle: 'Odstranit odemykání pomocí Face ID / Touch ID?',
    removePasskeyBody:
      'Dokud si znovu nenastavíte přístupový kód, budete při každém odemykání aplikace wwwallet potřebovat celou obnovovací frázi.',
    removeAnyway: 'Odstranit i tak',
  },
  transactions: {
    title: 'Transakce',
    empty: 'Nebyly nalezeny žádné transakce.',
    visitAccountFirst: 'Nejprve přejděte na daný účet, abyste načtli jeho historii transakcí.',
  },
  token: {
    defaultLabel: 'Token',
  },
  qrScanner: {
    title: 'Naskenujte QR kód adresy',
    cameraError: 'Přístup k fotoaparátu se nezdařil. Zkontrolujte oprávnění a zkuste to znovu.',
  },
  validation: {
    amountGreaterThanZero: 'Zadejte částku větší než nula.',
    insufficientBalance:
      'Částka k odeslání přesahuje zůstatek na odesílajícím účtu (včetně transakčního poplatku).',
    invalidRecipientAddress: 'Zadejte platnou adresu příjemce.',
    validTokenOrEth: 'Zadejte platnou adresu tokenu nebo ETH pro nativní platbu.',
    validBuyToken: 'Zadejte platnou adresu pro nákup tokenů.',
    labelRequired: 'Popisek je povinný.',
    validAddress: 'Zadejte platnou adresu.',
    filePasswordRequired: 'Pro otevření tohoto souboru je nutné zadat heslo.',
    mnemonicWordCount: 'Nesprávný počet slov ({count}). Je třeba zadat buď 12, nebo 24 slov.',
    privateKeyRequired: 'Je vyžadován soukromý klíč.',
    keystoreFileRequired: 'Vyberte soubor úložiště klíčů.',
    recoveryPhraseFormat: 'To nevypadá jako platná obnovovací fráze.',
  },
  msg: {
    account: {
      added: 'Účet byl přidán.',
    },
    address: {
      copied: 'Adresa byla zkopírována.',
    },
    qr: {
      noAddress: 'QR kód neobsahoval rozpoznatelnou adresu.',
    },
    send: {
      success: 'Odesláno. Hash transakce: {hash}',
    },
    swap: {
      approvalSubmitted:
        'Žádost o schválení byla odeslána. Počkejte na potvrzení a poté proveďte další výměnu.',
      success: 'Výměna byla odeslána. Hash transakce: {hash}',
    },
    backup: {
      driveSuccess: 'Zálohováno na Google Drive.',
    },
    restore: {
      driveSuccess:
        'Obnoveno z Google Drive. Chcete-li pokračovat, odemkněte pomocí své obnovovací fráze.',
      fileSuccess:
        'Obnoveno ze souboru. Chcete-li pokračovat, odemkněte zařízení pomocí své obnovovací fráze.',
      driveSuccessSetup: 'Obnoveno z Google Drive. Zadejte svou obnovovací frázi k odemčení.',
      fileSuccessSetup: 'Obnoveno ze souboru. Zadejte svou obnovovací frázi k odemčení.',
    },
    recoveryPhrase: {
      copied: 'Obnovovací fráze byla zkopírována – za 45 sekund bude ze schránky odstraněna.',
      copyFailed:
        'Nepodařilo se provést automatické zkopírování — vyberte slova a zkopírujte je ručně.',
    },
    passkey: {
      ready: 'Odemknutí pomocí Face ID / Touch ID je připraveno.',
    },
  },
  errors: {
    unknown: 'Došlo k neznámé chybě',
    requestFailed: 'Žádost o {path} selhala s chybou {status}',
    webauthnUnavailable: 'WebAuthn není v tomto prohlížeči k dispozici',
    passkeyRegistrationCancelled: 'Registrace přístupového kódu byla zrušena',
    passkeyNoPrfSecret: 'passkey nevrátil tajný klíč PRF',
    passkeyUnlockCancelled: 'Odemknutí pomocí přístupového kódu bylo zrušeno',
    prfNotSupported:
      'Toto zařízení nebo prohlížeč nepodporuje odemykání pomocí bezheslového přístupového klíče (WebAuthn PRF). Stále můžete odemknout pomocí své obnovovací fráze nebo zkusit jiné zařízení či prohlížeč.',
    googleDriveNotConfigured:
      'Zálohování na Google Drive není nakonfigurováno (chybí VITE_GOOGLE_CLIENT_ID)',
    gisLoadFailed: 'Nepodařilo se načíst služby Google Identity Services',
    googleSignInCancelled: 'Přihlášení přes Google bylo zrušeno',
    googleDriveSearchFailed: 'vyhledávání na Disku Google se nezdařilo',
    googleDriveUploadFailed: 'Nepodařilo se nahrát zálohu na Google Drive',
    googleDriveNoBackup: 'V tomto účtu Google nebyla nalezena žádná záloha',
    googleDriveDownloadFailed: 'Nepodařilo se stáhnout zálohu z Disku Google',
    noVaultOnDevice: 'Na tomto zařízení není žádný trezor',
    cannotSaveNoVault: 'nelze uložit: trezor zatím neexistuje',
    noRecoveryWrapToExport:
      'trezor neobsahuje žádný zátah s obnovovací frází, který by bylo možné exportovat',
    invalidBackupFile: 'Tento soubor není platnou zálohou wwwallet.',
    vaultUnlockFailed: 'Nesprávná obnovovací fráze nebo poškozený trezor.',
    unlockMethodNotEnrolled: '{method} není pro tento trezor nastaveno.',
    passkeyNotSetUp: 'Pro tento trezor není nastaven přístupový kód.',
    vaultLocked: 'trezor je zamčený',
    chooseKeystoreFile: 'vyberte soubor úložiště klíčů',
  },
  currency: {
    USD: 'americký dolar',
    EUR: 'Euro',
    GBP: 'libra šterlinků',
    AUD: 'australský dolar',
    CAD: 'kanadský dolar',
    JPY: 'japonský jen',
    CHF: 'švýcarský frank',
    CNH: 'juan',
    SEK: 'švédská koruna',
    NZD: 'novozélandský dolar',
  },
}
