export default {
  common: {
    cancel: 'Atšaukti',
    save: 'Išsaugoti',
    done: 'Baigta',
    goBack: 'Grįžti atgal',
    label: 'Etiketė',
    chain: 'Grandinė',
    address: 'Adresas',
  },
  nav: {
    settings: 'Nustatymai',
    accounts: 'Sąskaitos',
    dismiss: 'Atmesti',
  },
  accounts: {
    title: 'Sąskaitos',
    addAccount: 'Pridėti paskyrą',
    empty: 'Kol kas nėra paskyrų. Pridėkite vieną, kad galėtumėte pradėti.',
  },
  accountDetail: {
    swap: 'Pasikeisti vietomis',
    transactions: 'Sandoriai',
    receiveAria: 'Gauti kriptovaliutą',
    sendAria: 'Siųsti kriptovaliutą',
  },
  addAccount: {
    title: 'Pridėti paskyrą',
    tabCreate: 'Sukurti naują',
    tabMnemonic: 'Importuoti mnemoniką',
    tabPrivateKey: 'Importuoti privatųjį raktą',
    tabKeystore: 'Importuoti raktų saugyklos failą',
    mnemonicLabel: 'Atkūrimo frazė (mnemonika)',
    privateKeyLabel: 'Privatus raktas',
    keystoreFileLabel: '„Keystore“ JSON failas',
    filePasswordLabel: 'Šio failo slaptažodis',
    filePasswordHint:
      'Slaptažodis, kuriuo šis raktų saugyklos failas buvo iš pradžių užšifruotas – ne naujas slaptažodis. Importavus failą, tereikės atrakinti saugyklą.',
    noPasswordHint:
      'Slaptažodžio nereikia — šią paskyrą saugo jūsų seifo atrakinimo būdas („Face ID“/„Touch ID“ arba atkūrimo frazė).',
    submit: 'Pridėti paskyrą',
  },
  send: {
    title: 'Siųsti',
    fromLabel: 'Iš {label} ({chain})',
    recipientLabel: 'Gavėjo adresas',
    scanQrAria: 'Nuskaitykite QR kodą',
    amountLabel: 'Suma',
    submit: 'Siųsti',
  },
  receive: {
    title: 'Gauti',
    defaultAccountLabel: 'Sąskaita',
    tapToCopy: 'Bakstelėkite, kad nukopijuotumėte',
    copyAria: 'Kopijuoti adresą',
  },
  swap: {
    title: 'Pasikeisti',
    sellTokenLabel: 'Parduoti žetoną (adresas arba ETH, jei tai vietinis žetonas)',
    buyTokenLabel: 'Tokenų pirkimo adresas',
    sellAmountLabel: 'Parduodama suma',
    getQuote: 'Gauti pasiūlymą',
    estimateText: 'Numatoma gauti: {amount} už kainą {price}',
    signingNotice: 'Jūs pasirašote sandorį su {address} (per 0x agregatorių).',
    submit: 'Pasikeisti vietomis',
  },
  payees: {
    title: 'Gavėjai',
    add: 'Pridėti gavėją',
    empty: 'Kol kas nėra gavėjų.',
    deleteAria: 'Ištrinti {label}',
    labelField: 'Etiketė',
    addressField: 'Adresas',
  },
  backup: {
    title: 'Atsarginės kopijos ir atkūrimas',
    intro:
      'Šiame įrenginyje atsarginės kopijos yra šifruojamos dar prieš išsiunčiant jas iš įrenginio. „wwwallet“ serveris niekada nedalyvauja šiame procese – atkuriant duomenis naujame įrenginyje, ryšys užmezgamas tiesiogiai su „Google“ arba skaitomas vietinis failas.',
    googleDriveTitle: '„Google Drive“',
    backUpNow: 'Sukurkite atsarginę kopiją dabar',
    restoreLatest: 'Atkurti naujausią atsarginę kopiją',
    localFileTitle: 'Vietinis failas',
    downloadBackup: 'Atsisiųsti atsarginę kopiją',
    restoreFromFile: 'Atkurti iš failo',
    replaceTitle: 'Ar norite pakeisti savo dabartinę piniginę?',
    replaceBody:
      'Atkūrus visą šiuo metu šiame seife esantį turinį – sąskaitas, gavėjus ir nustatymus – bus pakeistas atsarginės kopijos turiniu, o šiame įrenginyje nustatytas prieigos kodas bus pašalintas (jį vėl galėsite įjungti po atrakinimo). Šio veiksmo atšaukti negalima.',
    replaceConfirm: 'Pakeiskite jį',
  },
  vaultSetup: {
    createTitle: 'Sukurkite savo piniginę',
    recoveryExplainer:
      'Tai yra jūsų {phrase}. Jis užšifruoja visą šio įrenginio turinį ir yra vienintelis būdas vėl prisijungti, jei kada nors prarastumėte prieigą prie savo slaptažodžio – įskaitant atsarginės kopijos atkūrimą naujame įrenginyje. Užsirašykite jį arba nukopijuokite į saugią vietą, neprisijungę prie interneto. Kasdien jo nebereikės, kai kitame ekrane nustatysite greitą atrakinimą, o „wwwallet“ jo jums daugiau niekada nerodys.',
    recoveryExplainerPhrase: 'atsistatymo frazė',
    copyRecoveryPhrase: 'Kopijuoti atkūrimo frazę',
    savedAckLabel: 'Savo atkūrimo frazę išsaugojau saugioje vietoje',
    createVault: 'Sukurti saugyklą',
    haveBackup: 'Ar jau turite atsarginę kopiją?',
    restoreFromDrive: 'Atkurti iš „Google Drive“',
    restoreFromLocalFile: 'Atkurti iš vietinio failo',
    quickUnlockTitle: 'Nustatyti greitą atrakinimą',
    quickUnlockBody:
      'Kasdien atrakinimui naudokite „Face ID“ arba „Touch ID“, o ne atkūrimo frazę.',
    enablePasskey: 'Įjungti „Face ID“ / „Touch ID“',
    passkeyEnabledLabel: 'Įjungta „Face ID“ / „Touch ID“ funkcija',
    passkeyUnsupportedNote:
      'Šiame įrenginyje arba naršyklėje ši funkcija nepalaikoma — vis tiek galite atrakinti paskyrą naudodami atkūrimo frazę arba pabandyti vėliau per „Nustatymai“.',
    skipTitle: 'Praleisti greitą atrakinimą?',
    skipBody:
      'Jei neturėsite prieigos rakto, kiekvieną kartą atidarydami „wwwallet“ turėsite įvesti visą atkūrimo frazę. Tai galite nustatyti vėliau meniu „Nustatymai“.',
    continueAnyway: 'Vis tiek tęsti',
  },
  vaultUnlock: {
    title: 'Atrakinti „wwwallet“',
    unlockWithPasskey: 'Atrakinti naudojant „Face ID“ / „Touch ID“',
    recoveryPhraseLabel: 'Atsistatymo frazė (24 žodžiai)',
    unlock: 'Atrakinti',
    useRecoveryInstead: 'Vietoj to naudokite atkūrimo frazę',
  },
  settings: {
    title: 'Nustatymai',
    toggleThemeAria: 'Perjungti temą',
    closeAria: 'Uždaryti nustatymus',
    lockNow: 'Užrakinkite dabar',
    languageLabel: 'Kalba',
    currencyLabel: 'Valiuta',
    securityTitle: 'Saugumas',
    securityIntro:
      'Jūsų atkūrimo frazė niekada nesaugoma ten, kur ją būtų galima jums parodyti – laikykite ją saugioje vietoje. „Face ID“ / „Touch ID“ – tai greitas būdas kasdien atrakinti įrenginį; „wwwallet“ taip pat automatiškai užsiblokuoja po kelių minučių neveikimo.',
    passkeyLabel: '„Face ID“ / „Touch ID“',
    passkeyEnabled: 'Įjungta',
    passkeyNotSetUp: 'Nenustatyta',
    remove: 'Pašalinti',
    enable: 'Įjungti',
    removePasskeyTitle: 'Pašalinti „Face ID“ / „Touch ID“ atrakinimą?',
    removePasskeyBody:
      'Kol vėl nenustatysite prieigos rakto, kiekvieną kartą, kai atrakinsite „wwwallet“, jums reikės įvesti visą atkūrimo frazę.',
    removeAnyway: 'Vis tiek pašalinti',
  },
  transactions: {
    title: 'Sandoriai',
    empty: 'Sandorių nerasta.',
    visitAccountFirst:
      'Pirmiausia apsilankykite paskyroje, kad būtų įkeltas jos sandorių istorijos sąrašas.',
  },
  token: {
    defaultLabel: 'Žetonas',
  },
  qrScanner: {
    title: 'Nuskaitykite adreso QR kodą',
    cameraError: 'Nepavyko prisijungti prie kameros. Patikrinkite teises ir pabandykite dar kartą.',
  },
  validation: {
    amountGreaterThanZero: 'Įveskite skaičių, didesnį už nulį.',
    insufficientBalance:
      'Siunčiama suma viršija „FROM“ sąskaitos likutį (įskaitant operacijos mokestį).',
    invalidRecipientAddress: 'Įveskite galiojantį gavėjo adresą.',
    validTokenOrEth: 'Įveskite galiojantį žetono adresą arba „ETH“, jei naudojate vietinę valiutą.',
    validBuyToken: 'Įveskite galiojantį žetono pirkimo adresą.',
    labelRequired: 'Reikia įrašyti pavadinimą.',
    validAddress: 'Įveskite galiojantį adresą.',
    filePasswordRequired: 'Reikia įvesti šio failo slaptažodį.',
    mnemonicWordCount: 'Neteisingas žodžių skaičius ({count}). Reikia įvesti 12 arba 24 žodžius.',
    privateKeyRequired: 'Reikalingas privatus raktas.',
    keystoreFileRequired: 'Pasirinkite raktų saugyklos failą.',
    recoveryPhraseFormat: 'Tai neatrodo kaip teisinga atkūrimo frazė.',
  },
  msg: {
    account: {
      added: 'Sąskaita pridėta.',
    },
    address: {
      copied: 'Adresas nukopijuotas.',
    },
    qr: {
      noAddress: 'QR kodas neturėjo atpažįstamo adreso.',
    },
    send: {
      success: 'Siųsta. Sandorio hash: {hash}',
    },
    swap: {
      approvalSubmitted:
        'Patvirtinimas pateiktas. Palaukite, kol jis bus patvirtintas, tada vėl pakeiskite.',
      success: 'Keitimas pateiktas. Sandorio hešas: {hash}',
    },
    backup: {
      driveSuccess: 'Sukurta atsarginė kopija „Google Drive“.',
    },
    restore: {
      driveSuccess:
        'Atkurta iš „Google Drive“. Norėdami tęsti, atrakinkite naudodami atkūrimo frazę.',
      fileSuccess: 'Atkurta iš failo. Norėdami tęsti, atrakinkite naudodami atkūrimo frazę.',
      driveSuccessSetup: 'Atkurta iš „Google Drive“. Įveskite atkūrimo frazę, kad atrakintumėte.',
      fileSuccessSetup: 'Atkurta iš failo. Įveskite atkūrimo frazę, kad atrakintumėte.',
    },
    recoveryPhrase: {
      copied: 'Atsarginė frazė nukopijuota — po 45 sekundžių ji bus ištrinta iš jūsų iškarpinės.',
      copyFailed:
        'Nepavyko nukopijuoti automatiškai — pažymėkite žodžius ir nukopijuokite juos rankiniu būdu.',
    },
    passkey: {
      ready: '„Face ID“ / „Touch ID“ atrakinimas paruoštas.',
    },
  },
  errors: {
    unknown: 'Įvyko nežinoma klaida',
    requestFailed: 'prašymas {path} nepavyko dėl {status}',
    webauthnUnavailable: 'Šioje naršyklėje „WebAuthn“ funkcija neveikia',
    passkeyRegistrationCancelled: 'slaptažodžio registracija buvo atšaukta',
    passkeyNoPrfSecret: '„passkey“ negrąžino PRF slaptojo rakto',
    passkeyUnlockCancelled: 'Atsirakinimas naudojant slaptažodį buvo atšauktas',
    prfNotSupported:
      'Šis įrenginys arba naršyklė nepalaiko atrakinimo be slaptažodžio naudojant raktą (WebAuthn PRF). Vis tiek galite atrakinėti naudodami atkūrimo frazę arba pabandyti naudoti kitą įrenginį ar naršyklę.',
    googleDriveNotConfigured:
      '„Google Drive“ atsarginė kopija nėra sukonfigūruota (trūksta VITE_GOOGLE_CLIENT_ID)',
    gisLoadFailed: 'nepavyko įkelti „Google Identity Services“',
    googleSignInCancelled: '„Google“ prisijungimas buvo atšauktas',
    googleDriveSearchFailed: 'nepavyko atlikti paieškos „Google Drive“',
    googleDriveUploadFailed: 'nepavyko įkelti atsarginės kopijos į „Google Drive“',
    googleDriveNoBackup: 'šioje „Google“ paskyroje nerasta jokių atsarginių kopijų',
    googleDriveDownloadFailed: 'nepavyko atsisiųsti atsarginės kopijos iš „Google Drive“',
    noVaultOnDevice: 'šioje įrangoje nėra saugyklos',
    cannotSaveNoVault: 'neįmanoma išsaugoti: saugykla dar nesukurta',
    noRecoveryWrapToExport: 'saugykloje nėra atkūrimo frazės, kurią būtų galima eksportuoti',
    invalidBackupFile: 'Šis failas nėra tinkama „wwwallet“ atsarginė kopija.',
    vaultUnlockFailed: 'Neteisinga atkūrimo frazė arba sugadintas saugyklos failas.',
    unlockMethodNotEnrolled: '{method} nėra nustatytas šiam saugyklai.',
    passkeyNotSetUp: 'Šiam seifui nėra nustatytas prieigos raktas.',
    vaultLocked: 'seifas užrakintas',
    chooseKeystoreFile: 'pasirinkite raktų saugyklos failą',
  },
  currency: {
    USD: 'JAV doleris',
    EUR: 'Euras',
    GBP: 'Sterlingas',
    AUD: 'Australijos doleris',
    CAD: 'Kanados doleris',
    JPY: 'Japonijos jena',
    CHF: 'Šveicarijos frankas',
    CNH: 'juani',
    SEK: 'Švedijos krona',
    NZD: 'Naujosios Zelandijos doleris',
  },
}
