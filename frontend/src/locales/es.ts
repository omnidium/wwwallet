export default {
  common: {
    cancel: 'Cancelar',
    save: 'Guardar',
    done: 'Hecho',
    goBack: 'Volver',
    label: 'Etiqueta',
    chain: 'Cadena',
    address: 'Dirección',
  },
  nav: {
    settings: 'Configuración',
    accounts: 'Cuentas',
    dismiss: 'Descartar',
  },
  accounts: {
    title: 'Cuentas',
    addAccount: 'Añadir cuenta',
    empty: 'Aún no hay cuentas. Añade una para empezar.',
  },
  accountDetail: {
    swap: 'Intercambio',
    transactions: 'Transacciones',
    receiveAria: 'Recibir criptomonedas',
    sendAria: 'Enviar criptomonedas',
  },
  addAccount: {
    title: 'Añadir cuenta',
    tabCreate: 'Crear nuevo',
    tabMnemonic: 'Mnemónico de importación',
    tabPrivateKey: 'Importar clave privada',
    tabKeystore: 'Importar el archivo de almacenamiento de claves',
    mnemonicLabel: 'Frase de recuperación (mnemotécnica)',
    privateKeyLabel: 'Clave privada',
    keystoreFileLabel: 'Archivo JSON del almacén de claves',
    filePasswordLabel: 'Contraseña de este archivo',
    filePasswordHint:
      'La contraseña con la que se cifró originalmente este archivo de almacén de claves —no una contraseña nueva—. Una vez importado, solo tendrás que desbloquear tu almacén.',
    noPasswordHint:
      'No hace falta contraseña: esta cuenta está protegida por el propio método de desbloqueo de tu caja fuerte (Face ID/Touch ID o frase de recuperación).',
    submit: 'Añadir cuenta',
  },
  send: {
    title: 'Enviar',
    fromLabel: 'De {label} ({chain})',
    recipientLabel: 'Dirección del destinatario',
    scanQrAria: 'Escanea el código QR',
    amountLabel: 'Importe',
    submit: 'Enviar',
  },
  receive: {
    title: 'Recibir',
    defaultAccountLabel: 'Cuenta',
    tapToCopy: 'Toca para copiar',
    copyAria: 'Copiar dirección',
  },
  swap: {
    title: 'Intercambio',
    sellTokenLabel: 'Vender token (dirección o ETH para el token nativo)',
    buyTokenLabel: 'Dirección para comprar tokens',
    sellAmountLabel: 'Importe de la venta',
    getQuote: 'Solicitar presupuesto',
    estimateText: 'Se estima que se recibirá: {amount} a un precio de {price}',
    signingNotice:
      'Estás firmando una transacción para contratar {address} (a través del agregador 0x).',
    submit: 'Intercambio',
  },
  payees: {
    title: 'Beneficiarios',
    add: 'Añadir beneficiario',
    empty: 'Aún no hay beneficiarios.',
    deleteAria: 'Eliminar {label}',
    labelField: 'Etiqueta',
    addressField: 'Dirección',
  },
  backup: {
    title: 'Copias de seguridad y restauración',
    intro:
      'Las copias de seguridad se cifran en este dispositivo antes de salir de él. El servidor de wwwallet nunca interviene: la restauración en un nuevo dispositivo se realiza directamente con Google o mediante la lectura de un archivo local.',
    googleDriveTitle: 'Google Drive',
    backUpNow: 'Haz una copia de seguridad ahora',
    restoreLatest: 'Restaurar la última copia de seguridad',
    localFileTitle: 'Archivo local',
    downloadBackup: 'Descargar el archivo de copia de seguridad',
    restoreFromFile: 'Restaurar desde un archivo',
    replaceTitle: '¿Quieres cambiar tu monedero actual?',
    replaceBody:
      'Al restaurar, se sobrescribirá todo el contenido actual de esta caja fuerte —cuentas, beneficiarios y ajustes— con el contenido de la copia de seguridad, y se eliminará cualquier clave de acceso configurada en este dispositivo (podrás volver a activarla tras desbloquearlo). Esta acción no se puede deshacer.',
    replaceConfirm: 'Sustitúyelo',
  },
  vaultSetup: {
    createTitle: 'Crea tu monedero',
    recoveryExplainer:
      'Este es tu {phrase}. Cifra todo el contenido de este dispositivo y es la única forma de volver a acceder a él si alguna vez pierdes el acceso a tu clave de acceso, incluso al restaurar una copia de seguridad en un nuevo dispositivo. Anótala o cópiala en algún lugar seguro, sin conexión a Internet. No la necesitarás en el día a día una vez que hayas configurado el desbloqueo rápido en la siguiente pantalla, y wwwallet nunca te la volverá a mostrar.',
    recoveryExplainerPhrase: 'frase de recuperación',
    copyRecoveryPhrase: 'Copiar la frase de recuperación',
    savedAckLabel: 'He guardado mi frase de recuperación en un lugar seguro',
    createVault: 'Crear caja fuerte',
    haveBackup: '¿Ya tienes una copia de seguridad?',
    restoreFromDrive: 'Restaurar desde Google Drive',
    restoreFromLocalFile: 'Restaurar desde un archivo local',
    quickUnlockTitle: 'Configurar el desbloqueo rápido',
    quickUnlockBody:
      'Utiliza Face ID o Touch ID para desbloquear el dispositivo en el día a día, en lugar de tu frase de recuperación.',
    enablePasskey: 'Activar Face ID / Touch ID',
    passkeyEnabledLabel: 'Compatible con Face ID / Touch ID',
    passkeyUnsupportedNote:
      'No es compatible con este dispositivo o navegador; no obstante, puedes desbloquearlo con tu frase de recuperación o volver a intentarlo más tarde desde «Ajustes».',
    skipTitle: '¿Omitir el desbloqueo rápido?',
    skipBody:
      'Si no tienes una clave de acceso, tendrás que introducir tu frase de recuperación completa cada vez que abras wwwallet. Puedes configurarla más tarde en «Ajustes».',
    continueAnyway: 'Continuar de todos modos',
  },
  vaultUnlock: {
    title: 'Desbloquear wwwallet',
    unlockWithPasskey: 'Desbloquear con Face ID / Touch ID',
    recoveryPhraseLabel: 'Frase de recuperación (24 palabras)',
    unlock: 'Desbloquear',
    useRecoveryInstead: 'Utiliza la frase de recuperación en su lugar',
  },
  settings: {
    title: 'Configuración',
    toggleThemeAria: 'Cambiar tema',
    closeAria: 'Cerrar configuración',
    lockNow: 'Bloquear ahora',
    languageLabel: 'Idioma',
    currencyLabel: 'Moneda',
    securityTitle: 'Seguridad',
    securityIntro:
      'Tu frase de recuperación nunca se almacena en ningún lugar donde pueda mostrarse ante ti; guárdala en un lugar seguro. Face ID / Touch ID es la forma más rápida de desbloquear el dispositivo a diario; además, wwwallet se bloquea automáticamente tras unos minutos de inactividad.',
    passkeyLabel: 'Face ID / Touch ID',
    passkeyEnabled: 'Activado',
    passkeyNotSetUp: 'No está configurado',
    remove: 'Eliminar',
    enable: 'Activar',
    removePasskeyTitle: '¿Deshacer el desbloqueo con Face ID / Touch ID?',
    removePasskeyBody:
      'Necesitarás tu frase de recuperación completa cada vez que desbloquees wwwallet hasta que vuelvas a configurar una clave de acceso.',
    removeAnyway: 'Eliminar de todos modos',
  },
  transactions: {
    title: 'Transacciones',
    empty: 'No se han encontrado transacciones.',
    visitAccountFirst: 'Accede primero a una cuenta para cargar su historial de transacciones.',
  },
  token: {
    defaultLabel: 'Token',
  },
  qrScanner: {
    title: 'Escanear el código QR de la dirección',
    cameraError:
      'No se ha podido acceder a la cámara. Comprueba los permisos e inténtalo de nuevo.',
  },
  validation: {
    amountGreaterThanZero: 'Introduce una cantidad mayor que cero.',
    insufficientBalance:
      'El importe a enviar supera el saldo de la cuenta de origen (incluida la comisión por transacción).',
    invalidRecipientAddress: 'Introduce una dirección de destinatario válida.',
    validTokenOrEth:
      'Introduce una dirección de token válida o ETH si se trata de la moneda nativa.',
    validBuyToken: 'Introduce una dirección válida para el token de compra.',
    labelRequired: 'Es obligatorio rellenar el campo «Etiqueta».',
    validAddress: 'Introduce una dirección válida.',
    filePasswordRequired: 'Es necesario introducir la contraseña de este archivo.',
    mnemonicWordCount: 'Número de palabras incorrecto ({count}). Se requieren 12 o 24 palabras.',
    privateKeyRequired: 'Se requiere una clave privada.',
    keystoreFileRequired: 'Elige un archivo de almacén de claves.',
    recoveryPhraseFormat: 'No parece que esa sea una frase de recuperación válida.',
  },
  msg: {
    account: {
      added: 'Cuenta añadida.',
    },
    address: {
      copied: 'Dirección copiada.',
    },
    qr: {
      noAddress: 'El código QR no contenía ninguna dirección reconocible.',
    },
    send: {
      success: 'Enviado. Hash de la transacción: {hash}',
    },
    swap: {
      approvalSubmitted:
        'Se ha enviado la solicitud de aprobación. Espera a que se confirme y, a continuación, vuelve a cambiarlo.',
      success: 'Intercambio enviado. Hash de la transacción: {hash}',
    },
    backup: {
      driveSuccess: 'Se ha hecho una copia de seguridad en Google Drive.',
    },
    restore: {
      driveSuccess:
        'Se ha restaurado desde Google Drive. Desbloquéalo con tu frase de recuperación para continuar.',
      fileSuccess:
        'Se ha restaurado a partir del archivo. Introduce tu frase de recuperación para continuar.',
      driveSuccessSetup:
        'Se ha restaurado desde Google Drive. Introduce tu frase de recuperación para desbloquearlo.',
      fileSuccessSetup:
        'Se ha restaurado a partir del archivo. Introduce tu frase de recuperación para desbloquearlo.',
    },
    recoveryPhrase: {
      copied: 'Se ha copiado la frase de recuperación; se borrará del portapapeles en 45 segundos.',
      copyFailed:
        'No se ha podido copiar automáticamente; selecciona y copia las palabras manualmente.',
    },
    passkey: {
      ready: 'El desbloqueo mediante Face ID / Touch ID ya está listo.',
    },
  },
  errors: {
    unknown: 'Se ha producido un error desconocido',
    requestFailed: 'La solicitud a {path} ha fallado con el error {status}',
    webauthnUnavailable: 'WebAuthn no está disponible en este navegador',
    passkeyRegistrationCancelled: 'Se ha cancelado el registro de la clave de acceso',
    passkeyNoPrfSecret: 'La clave de acceso no ha devuelto un secreto PRF',
    passkeyUnlockCancelled: 'Se ha cancelado el desbloqueo con clave de acceso',
    prfNotSupported:
      'Este dispositivo o navegador no admite el desbloqueo mediante clave de acceso sin contraseña (WebAuthn PRF). No obstante, puedes desbloquearlo con tu frase de recuperación o probar con otro dispositivo o navegador.',
    googleDriveNotConfigured:
      'La copia de seguridad en Google Drive no está configurada (falta VITE_GOOGLE_CLIENT_ID)',
    gisLoadFailed: 'No se han podido cargar los servicios de identidad de Google',
    googleSignInCancelled: 'Se ha cancelado el inicio de sesión con Google',
    googleDriveSearchFailed: 'No se ha podido realizar la búsqueda en Google Drive',
    googleDriveUploadFailed: 'No se ha podido subir la copia de seguridad a Google Drive',
    googleDriveNoBackup: 'No se ha encontrado ninguna copia de seguridad en esta cuenta de Google',
    googleDriveDownloadFailed: 'No se ha podido descargar la copia de seguridad de Google Drive',
    noVaultOnDevice: 'No hay ningún almacén de datos en este dispositivo.',
    cannotSaveNoVault: 'No se puede guardar: aún no existe ninguna caja fuerte',
    noRecoveryWrapToExport:
      'El almacén no tiene ninguna frase de recuperación que se pueda exportar',
    invalidBackupFile: 'Este archivo no es una copia de seguridad válida de wwwallet.',
    vaultUnlockFailed: 'Frase de recuperación incorrecta o almacén dañado.',
    unlockMethodNotEnrolled: '{method} no está configurado para esta caja fuerte.',
    passkeyNotSetUp: 'No se ha configurado ninguna clave de acceso para esta caja fuerte.',
    vaultLocked: 'La cámara acorazada está cerrada con llave',
    chooseKeystoreFile: 'Selecciona un archivo de almacén de claves',
  },
  currency: {
    USD: 'dólar estadounidense',
    EUR: 'Euro',
    GBP: 'Libra esterlina',
    AUD: 'Dólar australiano',
    CAD: 'dólar canadiense',
    JPY: 'yen japonés',
    CHF: 'Franco suizo',
    CNH: 'Yuan',
    SEK: 'Corona sueca',
    NZD: 'Dólar neozelandés',
  },
}
