export default {
  common: {
    cancel: 'Annuler',
    save: 'Enregistrer',
    done: 'Terminé',
    goBack: 'Retour',
    label: 'Étiquette',
    chain: 'Chaîne',
    address: 'Adresse',
  },
  nav: {
    settings: 'Paramètres',
    accounts: 'Comptes',
    dismiss: 'Ignorer',
  },
  accounts: {
    title: 'Comptes',
    addAccount: 'Ajouter un compte',
    empty: "Aucun compte pour l'instant. Créez-en un pour commencer.",
  },
  accountDetail: {
    swap: 'Échange',
    transactions: 'Transactions',
    receiveAria: 'Recevoir des cryptomonnaies',
    sendAria: 'Envoyer des cryptomonnaies',
  },
  addAccount: {
    title: 'Ajouter un compte',
    tabCreate: 'Créer un nouveau',
    tabMnemonic: "Mnémonique d'importation",
    tabPrivateKey: 'Importer une clé privée',
    tabKeystore: 'Importer un fichier de clés',
    mnemonicLabel: 'Phrase de récupération (mnémonique)',
    privateKeyLabel: 'Clé privée',
    keystoreFileLabel: 'Fichier JSON du keystore',
    filePasswordLabel: 'Mot de passe de ce fichier',
    filePasswordHint:
      "Le mot de passe utilisé à l'origine pour chiffrer ce fichier de stockage de clés — et non un nouveau mot de passe. Une fois le fichier importé, il vous suffira de déverrouiller votre coffre-fort.",
    noPasswordHint:
      "Aucun mot de passe n'est nécessaire : ce compte est protégé par le mode de déverrouillage de votre coffre-fort (Face ID/Touch ID ou phrase de récupération).",
    submit: 'Ajouter un compte',
  },
  send: {
    title: 'Envoyer',
    fromLabel: 'De {label} ({chain})',
    recipientLabel: 'Adresse du destinataire',
    scanQrAria: 'Scanner le code QR',
    amountLabel: 'Montant',
    submit: 'Envoyer',
  },
  receive: {
    title: 'Recevoir',
    defaultAccountLabel: 'Compte',
    tapToCopy: 'Appuyez pour copier',
    copyAria: "Copier l'adresse",
  },
  swap: {
    title: 'Échange',
    sellTokenLabel: 'Vendre un token (adresse ou ETH pour les tokens natifs)',
    buyTokenLabel: 'Acheter une adresse de jeton',
    sellAmountLabel: 'Montant de la vente',
    getQuote: 'Obtenir un devis',
    estimateText: 'Montant estimé à percevoir : {amount} au prix de {price}',
    signingNotice:
      "Vous êtes en train de signer une transaction destinée à {address} (via l'agrégateur 0x).",
    submit: 'Échange',
  },
  payees: {
    title: 'Bénéficiaires',
    add: 'Ajouter un bénéficiaire',
    empty: "Aucun bénéficiaire pour l'instant.",
    deleteAria: 'Supprimer {label}',
    labelField: 'Étiquette',
    addressField: 'Adresse',
  },
  backup: {
    title: 'Sauvegarde et restauration',
    intro:
      "Sur cet appareil, les sauvegardes sont chiffrées avant même de quitter l'appareil. Le serveur de wwwallet n'intervient jamais : la restauration sur un nouvel appareil s'effectue directement avec Google ou à partir d'un fichier local.",
    googleDriveTitle: 'Google Drive',
    backUpNow: 'Faites une sauvegarde dès maintenant',
    restoreLatest: 'Restaurer la dernière sauvegarde',
    localFileTitle: 'Fichier local',
    downloadBackup: 'Télécharger le fichier de sauvegarde',
    restoreFromFile: "Restaurer à partir d'un fichier",
    replaceTitle: 'Remplacer votre portefeuille actuel ?',
    replaceBody:
      "La restauration remplace tout le contenu actuel de ce coffre-fort (comptes, bénéficiaires et paramètres) par le contenu de la sauvegarde, et supprime tout code d'accès configuré sur cet appareil (vous pourrez le réactiver après avoir déverrouillé l'appareil). Cette opération est irréversible.",
    replaceConfirm: 'Remplace-le',
  },
  vaultSetup: {
    createTitle: 'Créez votre portefeuille',
    recoveryExplainer:
      "Voici votre {phrase}. Il crypte toutes les données de cet appareil et constitue le seul moyen de récupérer l'accès si jamais vous perdiez votre clé d'accès — y compris pour restaurer une sauvegarde sur un nouvel appareil. Notez-la ou copiez-la dans un endroit sûr, hors ligne. Vous n'en aurez plus besoin au quotidien une fois que le déverrouillage rapide sera configuré sur l'écran suivant, et wwwallet ne vous la montrera plus jamais.",
    recoveryExplainerPhrase: 'phrase de récupération',
    copyRecoveryPhrase: 'Copier la phrase de récupération',
    savedAckLabel: "J'ai conservé ma phrase de récupération dans un endroit sûr",
    createVault: 'Créer un coffre-fort',
    haveBackup: "Vous disposez déjà d'une sauvegarde ?",
    restoreFromDrive: 'Restaurer à partir de Google Drive',
    restoreFromLocalFile: "Restaurer à partir d'un fichier local",
    quickUnlockTitle: 'Configurer le déverrouillage rapide',
    quickUnlockBody:
      'Utilisez Face ID ou Touch ID pour déverrouiller votre appareil au quotidien, plutôt que votre phrase de récupération.',
    enablePasskey: 'Activer Face ID / Touch ID',
    passkeyEnabledLabel: 'Compatible avec Face ID / Touch ID',
    passkeyUnsupportedNote:
      "Cette fonctionnalité n'est pas prise en charge sur cet appareil ou ce navigateur. Vous pouvez toutefois déverrouiller votre appareil à l'aide de votre phrase de récupération, ou réessayer plus tard depuis les Paramètres.",
    skipTitle: 'Ignorer le déverrouillage rapide ?',
    skipBody:
      'Sans mot de passe, vous devrez saisir votre phrase de récupération complète à chaque fois que vous ouvrirez wwwallet. Vous pourrez configurer cette option ultérieurement dans les paramètres.',
    continueAnyway: 'Continuer quand même',
  },
  vaultUnlock: {
    title: 'Déverrouiller wwwallet',
    unlockWithPasskey: 'Déverrouiller avec Face ID / Touch ID',
    recoveryPhraseLabel: 'Phrase de récupération (24 mots)',
    unlock: 'Déverrouiller',
    useRecoveryInstead: 'Utilisez plutôt la phrase de récupération',
  },
  settings: {
    title: 'Paramètres',
    toggleThemeAria: 'Changer de thème',
    closeAria: 'Fermer les paramètres',
    lockNow: 'Verrouiller maintenant',
    languageLabel: 'Langue',
    currencyLabel: 'Devise',
    securityTitle: 'Sécurité',
    securityIntro:
      "Votre phrase de récupération n'est jamais enregistrée à un endroit où elle pourrait vous être révélée — conservez-la en lieu sûr. Face ID / Touch ID constitue le moyen le plus rapide pour déverrouiller l'application au quotidien ; wwwallet se verrouille également automatiquement après quelques minutes d'inactivité.",
    passkeyLabel: 'Face ID / Touch ID',
    passkeyEnabled: 'Activé',
    passkeyNotSetUp: 'Non configuré',
    remove: 'Supprimer',
    enable: 'Activer',
    removePasskeyTitle: 'Supprimer le déverrouillage par Face ID / Touch ID ?',
    removePasskeyBody:
      "Vous devrez saisir l'intégralité de votre phrase de récupération à chaque fois que vous déverrouillerez wwwallet, jusqu'à ce que vous configuriez à nouveau un mot de passe.",
    removeAnyway: 'Supprimer quand même',
  },
  transactions: {
    title: 'Transactions',
    empty: 'Aucune transaction trouvée.',
    visitAccountFirst: "Accédez d'abord à un compte pour charger l'historique de ses transactions.",
  },
  token: {
    defaultLabel: 'Jeton',
  },
  qrScanner: {
    title: "Scanner le code QR de l'adresse",
    cameraError: "Échec de l'accès à la caméra. Vérifiez les autorisations et réessayez.",
  },
  validation: {
    amountGreaterThanZero: 'Saisissez un montant supérieur à zéro.',
    insufficientBalance:
      'Le montant à envoyer est supérieur au solde du compte « FROM » (frais de transaction compris).',
    invalidRecipientAddress: 'Saisissez une adresse de destinataire valide.',
    validTokenOrEth: 'Saisissez une adresse de jeton valide, ou « ETH » pour le jeton natif.',
    validBuyToken: "Saisissez une adresse de jeton d'achat valide.",
    labelRequired: 'Le champ « Étiquette » est obligatoire.',
    validAddress: 'Saisissez une adresse valide.',
    filePasswordRequired: 'Le mot de passe de ce fichier est obligatoire.',
    mnemonicWordCount: 'Nombre de mots incorrect ({count}). Il faut saisir soit 12, soit 24 mots.',
    privateKeyRequired: 'Une clé privée est requise.',
    keystoreFileRequired: 'Sélectionnez un fichier de clés.',
    recoveryPhraseFormat: 'Cela ne semble pas être une phrase de récupération valide.',
  },
  msg: {
    account: {
      added: 'Compte ajouté.',
    },
    address: {
      copied: 'Adresse copiée.',
    },
    qr: {
      noAddress: "Le code QR ne contenait pas d'adresse identifiable.",
    },
    send: {
      success: 'Envoyé. Hachage de la transaction : {hash}',
    },
    swap: {
      approvalSubmitted:
        "Demande d'approbation envoyée. Attendez la confirmation, puis procédez à un nouvel échange.",
      success: 'Échange envoyé. Hachage de la transaction : {hash}',
    },
    backup: {
      driveSuccess: 'Sauvegardé sur Google Drive.',
    },
    restore: {
      driveSuccess:
        "Restauré à partir de Google Drive. Déverrouillez-le à l'aide de votre phrase de récupération pour continuer.",
      fileSuccess:
        "Restauré à partir d'un fichier. Saisissez votre phrase de récupération pour déverrouiller et continuer.",
      driveSuccessSetup:
        'Restauré à partir de Google Drive. Saisissez votre phrase de récupération pour déverrouiller.',
      fileSuccessSetup:
        "Restauré à partir d'un fichier. Saisissez votre phrase de récupération pour déverrouiller.",
    },
    recoveryPhrase: {
      copied:
        'La phrase de récupération a été copiée — elle sera effacée de votre presse-papiers dans 45 secondes.',
      copyFailed: 'La copie automatique a échoué — sélectionnez et copiez les mots manuellement.',
    },
    passkey: {
      ready: 'Le déverrouillage par Face ID / Touch ID est prêt.',
    },
  },
  errors: {
    unknown: "Une erreur inconnue s'est produite",
    requestFailed: 'La requête vers {path} a échoué avec {status}',
    webauthnUnavailable: "WebAuthn n'est pas disponible dans ce navigateur",
    passkeyRegistrationCancelled: "L'enregistrement du mot de passe a été annulé.",
    passkeyNoPrfSecret: "La clé d'accès n'a pas renvoyé de secret PRF",
    passkeyUnlockCancelled: 'Le déverrouillage par mot de passe a été annulé',
    prfNotSupported:
      "Cet appareil ou ce navigateur ne prend pas en charge le déverrouillage sans mot de passe à l'aide d'une clé d'accès (WebAuthn PRF). Vous pouvez tout de même vous déverrouiller à l'aide de votre phrase de récupération, ou essayer un autre appareil ou navigateur.",
    googleDriveNotConfigured:
      "La sauvegarde sur Google Drive n'est pas configurée (VITE_GOOGLE_CLIENT_ID manquant)",
    gisLoadFailed: "Échec du chargement des services d'identité Google",
    googleSignInCancelled: 'La connexion via Google a été annulée',
    googleDriveSearchFailed: "Impossible d'effectuer une recherche sur Google Drive",
    googleDriveUploadFailed: 'Échec du téléchargement de la sauvegarde sur Google Drive',
    googleDriveNoBackup: "Aucune sauvegarde n'a été trouvée dans ce compte Google.",
    googleDriveDownloadFailed: 'Échec du téléchargement de la sauvegarde depuis Google Drive',
    noVaultOnDevice: "Il n'y a pas de coffre-fort sur cet appareil.",
    cannotSaveNoVault: "Impossible d'enregistrer : aucun coffre-fort n'existe encore",
    noRecoveryWrapToExport: 'Le coffre-fort ne contient aucune phrase de récupération à exporter',
    invalidBackupFile: "Ce fichier n'est pas une sauvegarde wwwallet valide.",
    vaultUnlockFailed: 'Phrase de récupération incorrecte ou coffre-fort endommagé.',
    unlockMethodNotEnrolled: "{method} n'est pas configuré pour ce coffre-fort.",
    passkeyNotSetUp: "La clé d'accès n'est pas configurée pour ce coffre-fort.",
    vaultLocked: 'le coffre-fort est fermé à clé',
    chooseKeystoreFile: 'Sélectionnez un fichier de stockage de clés',
  },
  currency: {
    USD: 'dollar américain',
    EUR: 'euro',
    GBP: 'Livre sterling',
    AUD: 'dollar australien',
    CAD: 'dollar canadien',
    JPY: 'yen japonais',
    CHF: 'franc suisse',
    CNH: 'Yuan',
    SEK: 'couronne suédoise',
    NZD: 'dollar néo-zélandais',
  },
}
