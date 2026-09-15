export default {
  common: {
    cancel: 'Anuluj',
    save: 'Zapisz',
    done: 'Gotowe',
    goBack: 'Wróć',
    label: 'Etykieta',
    chain: 'Łańcuch',
    address: 'Adres',
  },
  nav: {
    settings: 'Ustawienia',
    accounts: 'Konta',
    dismiss: 'Odrzuć',
  },
  accounts: {
    title: 'Konta',
    addAccount: 'Dodaj konto',
    empty: 'Nie masz jeszcze żadnego konta. Dodaj konto, aby rozpocząć.',
  },
  accountDetail: {
    swap: 'Zamień',
    transactions: 'Transakcje',
    receiveAria: 'Odbierz kryptowaluty',
    sendAria: 'Wyślij kryptowalutę',
  },
  addAccount: {
    title: 'Dodaj konto',
    tabCreate: 'Utwórz nowy',
    tabMnemonic: 'Mnemonik importu',
    tabPrivateKey: 'Zaimportuj klucz prywatny',
    tabKeystore: 'Zaimportuj plik magazynu kluczy',
    mnemonicLabel: 'Fraza odzyskiwania (mnemoniczna)',
    privateKeyLabel: 'Klucz prywatny',
    keystoreFileLabel: 'Plik JSON z magazynem kluczy',
    filePasswordLabel: 'Hasło do tego pliku',
    filePasswordHint:
      'Hasło, którym ten plik magazynu kluczy został pierwotnie zaszyfrowany — nie nowe hasło. Po zaimportowaniu wystarczy tylko odblokować skarbnicę.',
    noPasswordHint:
      'Nie jest wymagane hasło — to konto jest chronione metodą odblokowania Twojego sejfu (Face ID/Touch ID lub fraza odzyskiwania).',
    submit: 'Dodaj konto',
  },
  send: {
    title: 'Wyślij',
    fromLabel: 'Od {label} ({chain})',
    recipientLabel: 'Adres odbiorcy',
    scanQrAria: 'Zeskanuj kod QR',
    amountLabel: 'Kwota',
    submit: 'Wyślij',
  },
  receive: {
    title: 'Otrzymaj',
    defaultAccountLabel: 'Konto',
    tapToCopy: 'Dotknij, aby skopiować',
    copyAria: 'Skopiuj adres',
  },
  swap: {
    title: 'Zamień',
    sellTokenLabel: 'Sprzedaj token (adres lub ETH w przypadku tokenów natywnych)',
    buyTokenLabel: 'Adres do zakupu tokenów',
    sellAmountLabel: 'Kwota sprzedaży',
    getQuote: 'Poproś o wycenę',
    estimateText: 'Szacowana kwota do otrzymania: {amount} po cenie {price}',
    signingNotice:
      'Podpisujesz transakcję w celu zawarcia umowy z {address} (za pośrednictwem agregatora 0x).',
    submit: 'Zamień',
  },
  payees: {
    title: 'Odbiorcy płatności',
    add: 'Dodaj odbiorcę płatności',
    empty: 'Nie ma jeszcze żadnych odbiorców płatności.',
    deleteAria: 'Usuń {label}',
    labelField: 'Etykieta',
    addressField: 'Adres',
  },
  backup: {
    title: 'Tworzenie kopii zapasowych i przywracanie danych',
    intro:
      'Kopie zapasowe są szyfrowane na tym urządzeniu, zanim w ogóle z niego opuszczą. Serwer wwwallet nigdy nie bierze w tym udziału — przy przywracaniu danych na nowym urządzeniu następuje bezpośrednia komunikacja z Google lub odczyt pliku lokalnego.',
    googleDriveTitle: 'Dysk Google',
    backUpNow: 'Zrób kopię zapasową teraz',
    restoreLatest: 'Przywróć najnowszą kopię zapasową',
    localFileTitle: 'Plik lokalny',
    downloadBackup: 'Pobierz plik kopii zapasowej',
    restoreFromFile: 'Przywróć z pliku',
    replaceTitle: 'Chcesz wymienić swój obecny portfel?',
    replaceBody:
      'Przywrócenie danych spowoduje nadpisanie wszystkich elementów znajdujących się obecnie w tym sejfie — kont, odbiorców płatności i ustawień — danymi zawartymi w kopii zapasowej oraz usunięcie wszelkich haseł ustawionych na tym urządzeniu (będziesz mógł je ponownie włączyć po odblokowaniu). Czynności tych nie można cofnąć.',
    replaceConfirm: 'Wymień to',
  },
  vaultSetup: {
    createTitle: 'Utwórz swój portfel',
    recoveryExplainer:
      'To jest Twój {phrase}. Służy on do szyfrowania wszystkich danych na tym urządzeniu i stanowi jedyną możliwość odzyskania dostępu w przypadku utraty klucza dostępu — w tym przy przywracaniu kopii zapasowej na nowym urządzeniu. Zapisz go lub skopiuj w bezpiecznym miejscu, w trybie offline. Nie będziesz go potrzebować na co dzień po skonfigurowaniu szybkiego odblokowywania na następnym ekranie, a aplikacja wwwallet nigdy więcej go nie wyświetli.',
    recoveryExplainerPhrase: 'frazę odzyskiwania',
    copyRecoveryPhrase: 'Skopiuj frazę odzyskiwania',
    savedAckLabel: 'Zapisałem swoją frazę odzyskiwania w bezpiecznym miejscu',
    createVault: 'Utwórz skarbiec',
    haveBackup: 'Masz już kopię zapasową?',
    restoreFromDrive: 'Przywróć z Dysku Google',
    restoreFromLocalFile: 'Przywróć z pliku lokalnego',
    quickUnlockTitle: 'Skonfiguruj szybkie odblokowywanie',
    quickUnlockBody:
      'Na co dzień odblokowuj urządzenie za pomocą funkcji Face ID lub Touch ID zamiast frazy odzyskiwania.',
    enablePasskey: 'Włącz Face ID / Touch ID',
    passkeyEnabledLabel: 'Obsługa funkcji Face ID / Touch ID',
    passkeyUnsupportedNote:
      'Ta funkcja nie jest obsługiwana na tym urządzeniu lub w tej przeglądarce — nadal możesz odblokować konto za pomocą frazy odzyskiwania lub spróbować ponownie później w sekcji „Ustawienia”.',
    skipTitle: 'Pominąć szybkie odblokowanie?',
    skipBody:
      'Bez hasła dostępu będziesz musiał wprowadzać pełną frazę odzyskiwania przy każdym uruchomieniu aplikacji wwwallet. Możesz to skonfigurować później w sekcji Ustawienia.',
    continueAnyway: 'Kontynuuj mimo wszystko',
  },
  vaultUnlock: {
    title: 'Odblokuj wwwallet',
    unlockWithPasskey: 'Odblokuj za pomocą Face ID / Touch ID',
    recoveryPhraseLabel: 'Fraza odzyskiwania (24 słowa)',
    unlock: 'Odblokuj',
    useRecoveryInstead: 'Zamiast tego użyj frazy odzyskiwania',
  },
  settings: {
    title: 'Ustawienia',
    toggleThemeAria: 'Przełącz motyw',
    closeAria: 'Zamknij ustawienia',
    lockNow: 'Zablokuj teraz',
    languageLabel: 'Język',
    currencyLabel: 'Waluta',
    securityTitle: 'Bezpieczeństwo',
    securityIntro:
      'Twoje hasło odzyskiwania nigdy nie jest przechowywane w miejscu, w którym mogłoby zostać Ci ujawnione — przechowuj je w bezpiecznym miejscu. Funkcja Face ID / Touch ID to najszybszy sposób na codzienne odblokowywanie urządzenia; aplikacja wwwallet blokuje się również automatycznie po kilku minutach bezczynności.',
    passkeyLabel: 'Face ID / Touch ID',
    passkeyEnabled: 'Włączone',
    passkeyNotSetUp: 'Nie skonfigurowano',
    remove: 'Usuń',
    enable: 'Włącz',
    removePasskeyTitle: 'Czy usunąć odblokowywanie za pomocą Face ID / Touch ID?',
    removePasskeyBody:
      'Za każdym razem, gdy będziesz odblokowywać aplikację wwwallet, będziesz potrzebować pełnej frazy odzyskiwania, dopóki nie skonfigurujesz ponownie hasła dostępu.',
    removeAnyway: 'Usuń mimo to',
  },
  transactions: {
    title: 'Transakcje',
    empty: 'Nie znaleziono żadnych transakcji.',
    visitAccountFirst: 'Najpierw przejdź do konta, aby wyświetlić historię transakcji.',
  },
  token: {
    defaultLabel: 'Token',
  },
  qrScanner: {
    title: 'Zeskanuj kod QR adresu',
    cameraError:
      'Nie udało się uzyskać dostępu do aparatu. Sprawdź uprawnienia i spróbuj ponownie.',
  },
  validation: {
    amountGreaterThanZero: 'Wprowadź wartość większą od zera.',
    insufficientBalance:
      'Kwota do przelania przekracza saldo konta nadawcy (wraz z opłatą transakcyjną).',
    invalidRecipientAddress: 'Wprowadź prawidłowy adres odbiorcy.',
    validTokenOrEth: 'Wprowadź prawidłowy adres tokenu lub „ETH”, jeśli chodzi o token natywny.',
    validBuyToken: 'Wprowadź prawidłowy adres tokena zakupowego.',
    labelRequired: 'Pole „Etykieta” jest obowiązkowe.',
    validAddress: 'Wprowadź prawidłowy adres.',
    filePasswordRequired: 'Wymagane jest podanie hasła do tego pliku.',
    mnemonicWordCount: 'Nieprawidłowa liczba słów ({count}). Wymagana jest liczba 12 lub 24 słów.',
    privateKeyRequired: 'Wymagany jest klucz prywatny.',
    keystoreFileRequired: 'Wybierz plik magazynu kluczy.',
    recoveryPhraseFormat: 'To nie wygląda na prawidłową frazę odzyskiwania.',
  },
  msg: {
    account: {
      added: 'Konto zostało dodane.',
    },
    address: {
      copied: 'Adres został skopiowany.',
    },
    qr: {
      noAddress: 'Kod QR nie zawierał rozpoznawalnego adresu.',
    },
    send: {
      success: 'Wysłano. Hash transakcji: {hash}',
    },
    swap: {
      approvalSubmitted:
        'Wniosek o zatwierdzenie został złożony. Poczekaj na potwierdzenie, a potem ponownie dokonaj zamiany.',
      success: 'Wymiana została przesłana. Hash transakcji: {hash}',
    },
    backup: {
      driveSuccess: 'Zarchiwizowano na Dysku Google.',
    },
    restore: {
      driveSuccess:
        'Przywrócono z Dysku Google. Aby kontynuować, odblokuj konto za pomocą frazy odzyskiwania.',
      fileSuccess:
        'Przywrócono z pliku. Aby kontynuować, odblokuj urządzenie za pomocą frazy odzyskiwania.',
      driveSuccessSetup: 'Przywrócono z Dysku Google. Wprowadź frazę odzyskiwania, aby odblokować.',
      fileSuccessSetup: 'Przywrócono z pliku. Wprowadź frazę odzyskiwania, aby odblokować.',
    },
    recoveryPhrase: {
      copied: 'Fraza odzyskiwania została skopiowana — zostanie usunięta ze schowka za 45 sekund.',
      copyFailed: 'Nie udało się skopiować automatycznie — zaznacz i skopiuj słowa ręcznie.',
    },
    passkey: {
      ready: 'Odblokowanie za pomocą Face ID / Touch ID jest gotowe.',
    },
  },
  errors: {
    unknown: 'Wystąpił nieznany błąd',
    requestFailed: 'Wystąpił błąd podczas wysyłania żądania do {path}: {status}',
    webauthnUnavailable: 'W tej przeglądarce nie jest dostępna funkcja WebAuthn',
    passkeyRegistrationCancelled: 'Rejestracja hasła dostępu została anulowana',
    passkeyNoPrfSecret: 'klucz dostępowy nie zwrócił tajnego klucza PRF',
    passkeyUnlockCancelled: 'Odblokowanie za pomocą hasła zostało anulowane',
    prfNotSupported:
      'To urządzenie lub przeglądarka nie obsługuje odblokowywania za pomocą klucza dostępu bez hasła (WebAuthn PRF). Nadal możesz odblokować konto za pomocą frazy odzyskiwania lub spróbować użyć innego urządzenia/przeglądarki.',
    googleDriveNotConfigured:
      'Kopia zapasowa w Google Drive nie została skonfigurowana (brak identyfikatora VITE_GOOGLE_CLIENT_ID)',
    gisLoadFailed: 'nie udało się załadować usług tożsamości Google',
    googleSignInCancelled: 'Logowanie przez Google zostało anulowane',
    googleDriveSearchFailed: 'nie udało się przeprowadzić wyszukiwania w Google Drive',
    googleDriveUploadFailed: 'nie udało się przesłać kopii zapasowej na Dysk Google',
    googleDriveNoBackup: 'na tym koncie Google nie znaleziono kopii zapasowej',
    googleDriveDownloadFailed: 'nie udało się pobrać kopii zapasowej z Dysku Google',
    noVaultOnDevice: 'na tym urządzeniu nie ma żadnego sejfu',
    cannotSaveNoVault: 'nie można zapisać: skarbiec jeszcze nie istnieje',
    noRecoveryWrapToExport: 'W skarbcu nie ma frazy odzyskiwania do wyeksportowania',
    invalidBackupFile: 'Ten plik nie jest prawidłową kopią zapasową serwisu wwwallet.',
    vaultUnlockFailed: 'Nieprawidłowa fraza odzyskiwania lub uszkodzony sejf.',
    unlockMethodNotEnrolled: '{method} nie zostało skonfigurowane dla tego sejfu.',
    passkeyNotSetUp: 'Dla tego sejfu nie skonfigurowano klucza dostępu.',
    vaultLocked: 'skarbiec jest zamknięty',
    chooseKeystoreFile: 'wybierz plik magazynu kluczy',
  },
  currency: {
    USD: 'dolar amerykański',
    EUR: 'Euro',
    GBP: 'Funt szterling',
    AUD: 'dolar australijski',
    CAD: 'dolar kanadyjski',
    JPY: 'jen japoński',
    CHF: 'frank szwajcarski',
    CNH: 'juan',
    SEK: 'korona szwedzka',
    NZD: 'Dolar nowozelandzki',
  },
}
