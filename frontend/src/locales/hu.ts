export default {
  common: {
    cancel: 'Mégse',
    save: 'Mentés',
    done: 'Kész',
    goBack: 'Vissza',
    label: 'Címke',
    chain: 'Lánc',
    address: 'Cím',
  },
  nav: {
    settings: 'Beállítások',
    accounts: 'Számlák',
    dismiss: 'Elutasítás',
  },
  accounts: {
    title: 'Számlák',
    addAccount: 'Fiók hozzáadása',
    empty: 'Még nincs fiókja. Hozzon létre egyet, hogy elindulhasson.',
  },
  accountDetail: {
    swap: 'Csere',
    transactions: 'Tranzakciók',
    receiveAria: 'Kriptovaluta fogadása',
    sendAria: 'Kriptovaluta küldése',
  },
  addAccount: {
    title: 'Fiók hozzáadása',
    tabCreate: 'Új létrehozása',
    tabMnemonic: 'Import mnemonika',
    tabPrivateKey: 'Magánkulcs importálása',
    tabKeystore: 'Kulcstárfájl importálása',
    mnemonicLabel: 'Helyreállítási kifejezés (emlékeztető)',
    privateKeyLabel: 'Titkos kulcs',
    keystoreFileLabel: 'Keystore JSON-fájl',
    filePasswordLabel: 'A fájl jelszava',
    filePasswordHint:
      'Az a jelszó, amellyel ezt a kulcstárat eredetileg titkosították – nem pedig egy új jelszó. Az importálás után már csak a tár feloldására lesz szükséged.',
    noPasswordHint:
      'Jelszó nem szükséges — ezt a fiókot a tárhely saját feloldási módja (Face ID/Touch ID vagy helyreállítási kifejezés) védi.',
    submit: 'Fiók hozzáadása',
  },
  send: {
    title: 'Küldés',
    fromLabel: '{label}-tól ({chain})',
    recipientLabel: 'A címzett címe',
    scanQrAria: 'Olvassa be a QR-kódot',
    amountLabel: 'Összeg',
    submit: 'Küldés',
  },
  receive: {
    title: 'Fogadás',
    defaultAccountLabel: 'Fiók',
    tapToCopy: 'Érintse meg a másoláshoz',
    copyAria: 'Cím másolása',
  },
  swap: {
    title: 'Csere',
    sellTokenLabel: 'Token eladása (cím, vagy ETH a natív token esetében)',
    buyTokenLabel: 'Token-cím vásárlása',
    sellAmountLabel: 'Eladási összeg',
    getQuote: 'Árajánlat kérése',
    estimateText: 'Becsült bevétel: {amount} {price} áron',
    signingNotice:
      'Egy tranzakciót írsz alá az {address} szerződéshez (a 0x aggregátoron keresztül).',
    submit: 'Csere',
  },
  payees: {
    title: 'Kifizetési címzettek',
    add: 'Kezdőlap',
    empty: 'Még nincsenek kedvezményezettek.',
    deleteAria: '{label} törlése',
    labelField: 'Címke',
    addressField: 'Cím',
  },
  backup: {
    title: 'Biztonsági mentés és visszaállítás',
    intro:
      'A biztonsági másolatokat ezen az eszközön titkosítják, mielőtt elhagynák azt. A wwwallet szerverét soha nem vonják be a folyamatba — az új eszközre történő visszaállítás során az alkalmazás közvetlenül a Google-lal kommunikál, vagy egy helyi fájlt olvas be.',
    googleDriveTitle: 'Google Drive',
    backUpNow: 'Készítsen biztonsági másolatot most',
    restoreLatest: 'A legutóbbi biztonsági másolat visszaállítása',
    localFileTitle: 'Helyi fájl',
    downloadBackup: 'Biztonsági másolat letöltése',
    restoreFromFile: 'Visszaállítás fájlból',
    replaceTitle: 'Cserélje le a jelenlegi pénztárcáját?',
    replaceBody:
      'A visszaállítás során a biztonsági mentés tartalma felülírja a trezorban jelenleg található összes elemet – számlákat, kedvezményezetteket és beállításokat –, és eltávolítja az eszközön beállított jelszót (a feloldás után újra be kell állítania). Ez a művelet visszafordíthatatlan.',
    replaceConfirm: 'Cseréld ki!',
  },
  vaultSetup: {
    createTitle: 'Hozd létre a pénztárcádat',
    recoveryExplainer:
      'Ez az Ön {phrase} kódja. Ez titkosítja az eszközön található összes adatot, és ez az egyetlen módja annak, hogy visszajusson a rendszerbe, ha valaha is elveszítené a hozzáférési kulcsát – ideértve a biztonsági másolat új eszközre történő visszaállítását is. Írd le vagy másold le valahova biztonságos helyre, offline állapotban. A következő képernyőn beállított gyors feloldás után a mindennapi használat során már nem lesz rá szükséged, és a wwwallet soha többé nem fogja megjeleníteni neked.',
    recoveryExplainerPhrase: 'helyreállítási kifejezés',
    copyRecoveryPhrase: 'A helyreállítási kód másolása',
    savedAckLabel: 'A helyreállítási kódot biztonságos helyen tároltam el',
    createVault: 'Tárhely létrehozása',
    haveBackup: 'Van már biztonsági másolatod?',
    restoreFromDrive: 'Visszaállítás a Google Drive-ról',
    restoreFromLocalFile: 'Helyreállítás helyi fájlból',
    quickUnlockTitle: 'Gyors feloldás beállítása',
    quickUnlockBody:
      'A mindennapi feloldáshoz használja a Face ID-t vagy a Touch ID-t a helyreállítási kód helyett.',
    enablePasskey: 'Face ID / Touch ID engedélyezése',
    passkeyEnabledLabel: 'Face ID / Touch ID támogatott',
    passkeyUnsupportedNote:
      'Ez az eszköz vagy böngésző nem támogatja ezt a funkciót — a helyreállítási kóddal még mindig feloldhatod a zárat, vagy később próbáld meg újra a Beállítások menüpontból.',
    skipTitle: 'Kihagyja a gyors feloldást?',
    skipBody:
      'Jelszó nélkül minden alkalommal be kell írnod a teljes helyreállítási kifejezést, amikor megnyitod a wwwallet alkalmazást. Ezt később a Beállítások menüpontban állíthatod be.',
    continueAnyway: 'Mindenképpen folytasd',
  },
  vaultUnlock: {
    title: 'A wwwallet feloldása',
    unlockWithPasskey: 'Feloldás Face ID-vel / Touch ID-vel',
    recoveryPhraseLabel: 'Helyreállítási kifejezés (24 szó)',
    unlock: 'Feloldás',
    useRecoveryInstead: 'Ehelyett használja a helyreállítási kódot',
  },
  settings: {
    title: 'Beállítások',
    toggleThemeAria: 'Téma váltása',
    closeAria: 'Beállítások bezárása',
    lockNow: 'Zárd le most!',
    languageLabel: 'Nyelv',
    currencyLabel: 'Pénznem',
    securityTitle: 'Biztonság',
    securityIntro:
      'A helyreállítási kódodat soha nem tároljuk olyan helyen, ahol mások láthatnák – ezért tartsd biztonságos helyen. A Face ID / Touch ID a mindennapi feloldás leggyorsabb módja; az wwwallet pedig néhány perc inaktivitás után automatikusan lezárul.',
    passkeyLabel: 'Face ID / Touch ID',
    passkeyEnabled: 'Engedélyezve',
    passkeyNotSetUp: 'Nincs beállítva',
    remove: 'Eltávolítás',
    enable: 'Engedélyezés',
    removePasskeyTitle: 'A Face ID / Touch ID feloldás eltávolítása?',
    removePasskeyBody:
      'Amíg újra nem állítasz be jelszót, a wwwallet feloldásához minden alkalommal szükséged lesz a teljes helyreállítási kódra.',
    removeAnyway: 'Mindenképpen törölni',
  },
  transactions: {
    title: 'Tranzakciók',
    empty: 'Nem találtak tranzakciókat.',
    visitAccountFirst: 'Először nyissa meg a számlát, hogy betöltse a tranzakciós előzményeket.',
  },
  token: {
    defaultLabel: 'Token',
  },
  qrScanner: {
    title: 'Olvassa be a cím QR-kódját',
    cameraError:
      'A kamera elérésére nem sikerült. Ellenőrizze a jogosultságokat, majd próbálja meg újra.',
  },
  validation: {
    amountGreaterThanZero: 'Adjon meg nullánál nagyobb értéket.',
    insufficientBalance:
      'Az átutalandó összeg meghaladja a KÜLDŐ számla egyenlegét (a tranzakciós díjat is beleértve).',
    invalidRecipientAddress: 'Írjon be egy érvényes címzett-címet.',
    validTokenOrEth:
      'Adjon meg egy érvényes token-címet, vagy az ETH-t, ha natív tokenről van szó.',
    validBuyToken: 'Adjon meg egy érvényes token-vásárlási címet.',
    labelRequired: 'A címke megadása kötelező.',
    validAddress: 'Adjon meg egy érvényes címet.',
    filePasswordRequired: 'Ehhez a fájlhoz jelszó szükséges.',
    mnemonicWordCount: 'Helytelen a szavak száma ({count}). 12 vagy 24 szó szükséges.',
    privateKeyRequired: 'A titkos kulcs megadása szükséges.',
    keystoreFileRequired: 'Válasszon ki egy kulcstárat.',
    recoveryPhraseFormat: 'Ez nem tűnik érvényes helyreállítási kódnak.',
  },
  msg: {
    account: {
      added: 'A fiók hozzáadva.',
    },
    address: {
      copied: 'A címet másoltam.',
    },
    qr: {
      noAddress: 'A QR-kód nem tartalmazott felismerhető címet.',
    },
    send: {
      success: 'Elküldve. Tranzakciós hash: {hash}',
    },
    swap: {
      approvalSubmitted: 'A jóváhagyás elküldve. Várd meg a visszaigazolást, majd cserélj újra.',
      success: 'A csere benyújtva. Tranzakciós hash: {hash}',
    },
    backup: {
      driveSuccess: 'Biztonsági másolatot készítettem a Google Drive-ra.',
    },
    restore: {
      driveSuccess:
        'A Google Drive-ból állítottuk vissza. A folytatáshoz a helyreállítási kóddal kell feloldani a zárat.',
      fileSuccess: 'A fájlból helyreállítva. A folytatáshoz adja meg a helyreállítási kódot.',
      driveSuccessSetup:
        'A Google Drive-ról állítottuk vissza. A feloldáshoz írja be a helyreállítási kódot.',
      fileSuccessSetup: 'A fájlból helyreállítva. A feloldáshoz írja be a helyreállítási kódot.',
    },
    recoveryPhrase: {
      copied: 'A helyreállítási kifejezés másolva — 45 másodperc múlva törlődik a vágólapról.',
      copyFailed:
        'Az automatikus másolás nem sikerült — válaszd ki és másold át a szavakat kézzel.',
    },
    passkey: {
      ready: 'A Face ID / Touch ID segítségével történő feloldás készen áll.',
    },
  },
  errors: {
    unknown: 'Ismeretlen hiba történt',
    requestFailed: 'A {path}-hez intézett kérés {status} hiba miatt sikertelen volt',
    webauthnUnavailable: 'A WebAuthn ebben a böngészőben nem érhető el',
    passkeyRegistrationCancelled: 'A jelszó regisztrációját törölték',
    passkeyNoPrfSecret: 'A passkey nem adott vissza PRF-titkot',
    passkeyUnlockCancelled: 'A jelszóval történő feloldás törlésre került',
    prfNotSupported:
      'Ez az eszköz vagy böngésző nem támogatja a jelszó nélküli kulcsos feloldást (WebAuthn PRF). A feloldást továbbra is elvégezheti a helyreállítási kifejezéssel, vagy próbálkozzon egy másik eszközzel/böngészővel.',
    googleDriveNotConfigured:
      'A Google Drive biztonsági mentése nincs beállítva (hiányzik a VITE_GOOGLE_CLIENT_ID)',
    gisLoadFailed: 'A Google Identity Services betöltése nem sikerült',
    googleSignInCancelled: 'A Google-bejelentkezés törlésre került',
    googleDriveSearchFailed: 'nem sikerült keresni a Google Drive-on',
    googleDriveUploadFailed: 'nem sikerült feltölteni a biztonsági másolatot a Google Drive-ra',
    googleDriveNoBackup: 'Ebben a Google-fiókban nem található biztonsági másolat',
    googleDriveDownloadFailed: 'nem sikerült letölteni a biztonsági másolatot a Google Drive-ról',
    noVaultOnDevice: 'Ezen az eszközön nincs titkos tárhely',
    cannotSaveNoVault: 'Nem lehet menteni: még nincs trezor',
    noRecoveryWrapToExport: 'A tárhelyben nincs exportálható helyreállítási kifejezés',
    invalidBackupFile: 'Ez a fájl nem érvényes wwwallet biztonsági másolat.',
    vaultUnlockFailed: 'Helytelen helyreállítási kifejezés vagy sérült tároló.',
    unlockMethodNotEnrolled: 'A {method} nincs beállítva ehhez a tárhelyhez.',
    passkeyNotSetUp: 'Ehhez a tárolóhoz nincs beállítva jelszó.',
    vaultLocked: 'a széf zárva van',
    chooseKeystoreFile: 'Válasszon ki egy kulcstárat!',
  },
  currency: {
    USD: 'amerikai dollár',
    EUR: 'euró',
    GBP: 'angol font',
    AUD: 'ausztrál dollár',
    CAD: 'kanadai dollár',
    JPY: 'japán jen',
    CHF: 'svájci frank',
    CNH: 'jüan',
    SEK: 'svéd korona',
    NZD: 'Új-zélandi dollár',
  },
}
