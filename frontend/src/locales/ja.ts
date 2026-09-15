export default {
  common: {
    cancel: 'キャンセル',
    save: '保存',
    done: '完了',
    goBack: '戻る',
    label: 'ラベル',
    chain: 'チェーン',
    address: '住所',
  },
  nav: {
    settings: '設定',
    accounts: '勘定科目',
    dismiss: '閉じる',
  },
  accounts: {
    title: '勘定科目',
    addAccount: 'アカウントを追加',
    empty: 'まだアカウントがありません。利用を開始するには、アカウントを追加してください。',
  },
  accountDetail: {
    swap: 'スワップ',
    transactions: '取引',
    receiveAria: '仮想通貨を受け取る',
    sendAria: '仮想通貨を送金する',
  },
  addAccount: {
    title: 'アカウントを追加',
    tabCreate: '新規作成',
    tabMnemonic: 'インポート・ニーモニック',
    tabPrivateKey: '秘密鍵をインポートする',
    tabKeystore: 'キーストアファイルのインポート',
    mnemonicLabel: 'リカバリーフレーズ（ニーモニック）',
    privateKeyLabel: '秘密鍵',
    keystoreFileLabel: 'キーストアのJSONファイル',
    filePasswordLabel: 'このファイルのパスワード',
    filePasswordHint:
      'このキーストアファイルが当初暗号化された際のパスワードです。新しいパスワードではありません。インポートが完了したら、ヴォールトのロックを解除するだけで済みます。',
    noPasswordHint:
      'パスワードは不要です。このアカウントは、Vault独自のロック解除方法（Face ID／Touch ID または復元フレーズ）によって保護されています。',
    submit: 'アカウントを追加',
  },
  send: {
    title: '送信',
    fromLabel: '{label} ({chain}) より',
    recipientLabel: '宛先住所',
    scanQrAria: 'QRコードをスキャンしてください',
    amountLabel: '金額',
    submit: '送信',
  },
  receive: {
    title: '受信',
    defaultAccountLabel: 'アカウント',
    tapToCopy: 'タップしてコピー',
    copyAria: '住所をコピー',
  },
  swap: {
    title: 'スワップ',
    sellTokenLabel: 'トークンの売却（アドレス、またはネイティブトークンの場合はETH）',
    buyTokenLabel: 'トークン購入用アドレス',
    sellAmountLabel: '販売数量',
    getQuote: '見積もりを依頼する',
    estimateText: '受取予定額：{amount}（価格 {price}）',
    signingNotice: '{address} との取引に署名しています（0x アグリゲーター経由）。',
    submit: 'スワップ',
  },
  payees: {
    title: '受取人',
    add: '受取人を追加する',
    empty: 'まだ受取人がいません。',
    deleteAria: '{label} を削除',
    labelField: 'ラベル',
    addressField: '住所',
  },
  backup: {
    title: 'バックアップと復元',
    intro:
      'このデバイスでは、バックアップデータはデバイスから送信される前に暗号化されます。wwwalletのサーバーは一切関与しません。新しいデバイスへの復元は、Googleと直接通信するか、ローカルファイルを読み込む形で行われます。',
    googleDriveTitle: 'Google ドライブ',
    backUpNow: '今すぐバックアップしてください',
    restoreLatest: '最新のバックアップを復元する',
    localFileTitle: 'ローカルファイル',
    downloadBackup: 'バックアップファイルをダウンロード',
    restoreFromFile: 'ファイルから復元',
    replaceTitle: '今使っている財布を買い替えますか？',
    replaceBody:
      '復元を行うと、このボールト内の現在のすべてのデータ（口座、受取人、設定など）がバックアップの内容で上書きされ、このデバイスに設定されているパスキーはすべて削除されます（ロック解除後に再度有効化できます）。この操作は元に戻せません。',
    replaceConfirm: 'それを置き換えてください',
  },
  vaultSetup: {
    createTitle: 'ウォレットを作成する',
    recoveryExplainer:
      'これがあなたの {phrase} です。これはこのデバイス上のすべてのデータを暗号化するものであり、パスキーへのアクセスを失ってしまった場合に、新しいデバイスでバックアップを復元する場合を含め、再びアクセスするための唯一の手段となります。 これを書き留めるか、オフラインの安全な場所にコピーしておいてください。次の画面でクイックアンロックを設定すれば、日常的にこれを使う必要はなくなります。また、wwwallet はこのパスキーを二度と表示することはありません。',
    recoveryExplainerPhrase: 'リカバリーフレーズ',
    copyRecoveryPhrase: 'リカバリーフレーズをコピーする',
    savedAckLabel: 'リカバリーフレーズを安全な場所に保管しておきました',
    createVault: 'ボールトを作成する',
    haveBackup: 'すでにバックアップはありますか？',
    restoreFromDrive: 'Google ドライブから復元する',
    restoreFromLocalFile: 'ローカルファイルから復元する',
    quickUnlockTitle: 'クイックアンロックの設定',
    quickUnlockBody:
      'リカバリーフレーズを使う代わりに、日常のロック解除にはFace IDまたはTouch IDを使用してください。',
    enablePasskey: 'Face ID / Touch ID を有効にする',
    passkeyEnabledLabel: 'Face ID / Touch ID 対応',
    passkeyUnsupportedNote:
      'このデバイスまたはブラウザではサポートされていません。リカバリーフレーズを使用してロックを解除するか、後で「設定」から再度お試しください。',
    skipTitle: '「クイックアンロック」をスキップしますか？',
    skipBody:
      'パスキーがない場合、wwwalletを開くたびにリカバリーフレーズをすべて入力する必要があります。この設定は、後で「設定」から行うことができます。',
    continueAnyway: 'とにかく続ける',
  },
  vaultUnlock: {
    title: 'wwwalletのロックを解除',
    unlockWithPasskey: 'Face ID / Touch ID でロックを解除',
    recoveryPhraseLabel: 'リカバリーフレーズ（24語）',
    unlock: 'ロック解除',
    useRecoveryInstead: '代わりにリカバリーフレーズを使用してください',
  },
  settings: {
    title: '設定',
    toggleThemeAria: 'テーマを切り替える',
    closeAria: '設定を閉じる',
    lockNow: '今すぐロックする',
    languageLabel: '言語',
    currencyLabel: '通貨',
    securityTitle: 'セキュリティ',
    securityIntro:
      'リカバリーフレーズは、他人に見られる可能性のある場所には決して保存されません。安全な場所に保管してください。Face ID / Touch ID を使えば、日常的なロック解除が素早く行えます。また、wwwallet は数分間操作がないと自動的にロックされます。',
    passkeyLabel: 'Face ID / Touch ID',
    passkeyEnabled: '有効',
    passkeyNotSetUp: '設定されていません',
    remove: '削除',
    enable: '有効にする',
    removePasskeyTitle: 'Face ID／Touch IDによるロック解除を無効にする？',
    removePasskeyBody:
      'パスキーを再度設定するまでは、wwwalletのロックを解除するたびに、リカバリーフレーズをすべて入力する必要があります。',
    removeAnyway: 'とにかく削除する',
  },
  transactions: {
    title: '取引',
    empty: '該当する取引は見つかりませんでした。',
    visitAccountFirst: 'まず口座にアクセスして、その取引履歴を読み込んでください。',
  },
  token: {
    defaultLabel: 'トークン',
  },
  qrScanner: {
    title: 'QRコードをスキャンしてください',
    cameraError: 'カメラへのアクセスに失敗しました。権限を確認してから、もう一度お試しください。',
  },
  validation: {
    amountGreaterThanZero: '0より大きい数値を入力してください。',
    insufficientBalance: '送金金額が、送金元口座の残高（取引手数料を含む）を上回っています。',
    invalidRecipientAddress: '有効な受信者アドレスを入力してください。',
    validTokenOrEth:
      '有効なトークンアドレスを入力するか、ネイティブの場合はETHと入力してください。',
    validBuyToken: '有効なトークン購入用アドレスを入力してください。',
    labelRequired: 'ラベルの入力は必須です。',
    validAddress: '有効な住所を入力してください。',
    filePasswordRequired: 'このファイルを開くにはパスワードが必要です。',
    mnemonicWordCount: '単語数が正しくありません（{count}）。12語または24語のいずれかが必要です。',
    privateKeyRequired: '秘密鍵が必要です。',
    keystoreFileRequired: 'キーストアファイルを選択してください。',
    recoveryPhraseFormat: 'それは有効なリカバリーフレーズには見えません。',
  },
  msg: {
    account: {
      added: 'アカウントが追加されました。',
    },
    address: {
      copied: '住所をコピーしました。',
    },
    qr: {
      noAddress: 'QRコードには、判読可能な住所が含まれていませんでした。',
    },
    send: {
      success: '送信済み。トランザクションハッシュ：{hash}',
    },
    swap: {
      approvalSubmitted:
        '承認を送信しました。確認が完了するまで待ち、その後、再度交換してください。',
      success: 'スワップが送信されました。トランザクションハッシュ：{hash}',
    },
    backup: {
      driveSuccess: 'Google ドライブにバックアップしました。',
    },
    restore: {
      driveSuccess:
        'Google ドライブから復元されました。リカバリーフレーズを入力してロックを解除し、続行してください。',
      fileSuccess:
        'ファイルから復元されました。続行するには、リカバリーフレーズを入力してロックを解除してください。',
      driveSuccessSetup:
        'Google ドライブから復元されました。ロックを解除するには、リカバリーフレーズを入力してください。',
      fileSuccessSetup:
        'ファイルから復元されました。ロックを解除するには、リカバリーフレーズを入力してください。',
    },
    recoveryPhrase: {
      copied: '復元フレーズがコピーされました。45秒後にクリップボードから削除されます。',
      copyFailed: '自動でコピーできませんでした。手動で単語を選択してコピーしてください。',
    },
    passkey: {
      ready: 'Face ID / Touch IDによるロック解除の準備が整いました。',
    },
  },
  errors: {
    unknown: '不明なエラーが発生しました',
    requestFailed: '{path} へのリクエストが {status} のエラーで失敗しました',
    webauthnUnavailable: 'このブラウザでは WebAuthn を利用できません',
    passkeyRegistrationCancelled: 'パスキーの登録が取り消されました',
    passkeyNoPrfSecret: 'passkey は PRF シークレットを返さなかった',
    passkeyUnlockCancelled: 'パスキーによるロック解除がキャンセルされました',
    prfNotSupported:
      'この端末またはブラウザでは、パスワード不要のパスキーによるロック解除（WebAuthn PRF）に対応していません。リカバリーフレーズを使用してロックを解除するか、別の端末またはブラウザをお試しください。',
    googleDriveNotConfigured:
      'Google ドライブのバックアップが設定されていません（VITE_GOOGLE_CLIENT_ID がありません）',
    gisLoadFailed: 'Google Identity Services の読み込みに失敗しました',
    googleSignInCancelled: 'Googleでのログインがキャンセルされました',
    googleDriveSearchFailed: 'Google ドライブの検索に失敗しました',
    googleDriveUploadFailed: 'Google ドライブへのバックアップのアップロードに失敗しました',
    googleDriveNoBackup: 'このGoogleアカウントにはバックアップが見つかりませんでした',
    googleDriveDownloadFailed: 'Google ドライブからのバックアップのダウンロードに失敗しました',
    noVaultOnDevice: 'このデバイスにはVaultが存在しません',
    cannotSaveNoVault: '保存できません：Vaultがまだ存在しません',
    noRecoveryWrapToExport: 'vault には、エクスポート用のリカバリーフレーズのラップがありません',
    invalidBackupFile: 'このファイルは、有効な wwwallet のバックアップではありません。',
    vaultUnlockFailed: 'リカバリーフレーズが間違っているか、Vaultが破損しています。',
    unlockMethodNotEnrolled: 'この保管庫には{method}が設定されていません。',
    passkeyNotSetUp: 'このボールトではパスキーが設定されていません。',
    vaultLocked: '金庫は施錠されています',
    chooseKeystoreFile: 'キーストアファイルを選択してください',
  },
  currency: {
    USD: '米ドル',
    EUR: 'ユーロ',
    GBP: '英ポンド',
    AUD: 'オーストラリア・ドル',
    CAD: 'カナダドル',
    JPY: '日本円',
    CHF: 'スイス・フラン',
    CNH: '元',
    SEK: 'スウェーデン・クローナ',
    NZD: 'ニュージーランド・ドル',
  },
}
