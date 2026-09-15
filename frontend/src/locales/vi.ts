export default {
  common: {
    cancel: 'Hủy',
    save: 'Lưu',
    done: 'Xong',
    goBack: 'Quay lại',
    label: 'Nhãn',
    chain: 'Chuỗi',
    address: 'Địa chỉ',
  },
  nav: {
    settings: 'Cài đặt',
    accounts: 'Tài khoản',
    dismiss: 'Bỏ qua',
  },
  accounts: {
    title: 'Tài khoản',
    addAccount: 'Thêm tài khoản',
    empty: 'Chưa có tài khoản nào. Hãy thêm một tài khoản để bắt đầu.',
  },
  accountDetail: {
    swap: 'Hoán đổi',
    transactions: 'Giao dịch',
    receiveAria: 'Nhận tiền điện tử',
    sendAria: 'Gửi tiền điện tử',
  },
  addAccount: {
    title: 'Thêm tài khoản',
    tabCreate: 'Tạo mới',
    tabMnemonic: 'Nhập mã ghi nhớ',
    tabPrivateKey: 'Nhập khóa riêng',
    tabKeystore: 'Nhập tệp keystore',
    mnemonicLabel: 'Cụm từ khôi phục (cụm từ gợi nhớ)',
    privateKeyLabel: 'Khóa riêng',
    keystoreFileLabel: 'Tệp JSON lưu trữ khóa',
    filePasswordLabel: 'Mật khẩu của tệp này',
    filePasswordHint:
      'Mật khẩu mà tệp kho khóa này ban đầu được mã hóa bằng — chứ không phải mật khẩu mới. Sau khi nhập tệp này vào, bạn chỉ cần mở khóa kho lưu trữ là được.',
    noPasswordHint:
      'Không cần mật khẩu — tài khoản này được bảo vệ bằng phương thức mở khóa riêng của kho lưu trữ (Face ID/Touch ID hoặc cụm từ khôi phục).',
    submit: 'Thêm tài khoản',
  },
  send: {
    title: 'Gửi',
    fromLabel: 'Từ {label} ({chain})',
    recipientLabel: 'Địa chỉ người nhận',
    scanQrAria: 'Quét mã QR',
    amountLabel: 'Số tiền',
    submit: 'Gửi',
  },
  receive: {
    title: 'Nhận',
    defaultAccountLabel: 'Tài khoản',
    tapToCopy: 'Nhấn để sao chép',
    copyAria: 'Sao chép địa chỉ',
  },
  swap: {
    title: 'Hoán đổi',
    sellTokenLabel: 'Bán token (theo địa chỉ hoặc bằng ETH đối với token gốc)',
    buyTokenLabel: 'Địa chỉ mua token',
    sellAmountLabel: 'Số lượng bán ra',
    getQuote: 'Yêu cầu báo giá',
    estimateText: 'Dự kiến sẽ nhận được: {amount} với giá {price}',
    signingNotice:
      'Bạn đang ký xác nhận một giao dịch với hợp đồng {address} (thông qua trình tổng hợp 0x).',
    submit: 'Hoán đổi',
  },
  payees: {
    title: 'Người nhận tiền',
    add: 'Thêm người nhận tiền',
    empty: 'Chưa có người nhận tiền.',
    deleteAria: 'Xóa {label}',
    labelField: 'Nhãn',
    addressField: 'Địa chỉ',
  },
  backup: {
    title: 'Sao lưu và khôi phục',
    intro:
      'Các bản sao lưu trên thiết bị này sẽ được mã hóa trước khi được chuyển ra ngoài. Máy chủ của wwwallet hoàn toàn không tham gia vào quá trình này — khi khôi phục trên một thiết bị mới, thiết bị sẽ kết nối trực tiếp với Google hoặc đọc tệp cục bộ.',
    googleDriveTitle: 'Google Drive',
    backUpNow: 'Sao lưu ngay bây giờ',
    restoreLatest: 'Khôi phục bản sao lưu mới nhất',
    localFileTitle: 'Tệp cục bộ',
    downloadBackup: 'Tải xuống tệp sao lưu',
    restoreFromFile: 'Khôi phục từ tệp',
    replaceTitle: 'Bạn có muốn thay thế ví hiện tại của mình không?',
    replaceBody:
      'Việc khôi phục sẽ ghi đè lên tất cả nội dung hiện có trong kho này — tài khoản, người nhận thanh toán và cài đặt — bằng dữ liệu trong bản sao lưu, đồng thời xóa bất kỳ mật khẩu nào đã được thiết lập trên thiết bị này (bạn sẽ kích hoạt lại mật khẩu sau khi mở khóa). Thao tác này không thể hoàn tác.',
    replaceConfirm: 'Thay thế nó',
  },
  vaultSetup: {
    createTitle: 'Tạo ví của bạn',
    recoveryExplainer:
      'Đây là {phrase} của bạn. Mã này sẽ mã hóa toàn bộ dữ liệu trên thiết bị này và là cách duy nhất để bạn lấy lại quyền truy cập nếu chẳng may mất mật khẩu — kể cả khi khôi phục bản sao lưu trên một thiết bị mới. Hãy ghi lại hoặc sao chép nó vào một nơi an toàn, không kết nối mạng. Bạn sẽ không cần dùng đến nó trong sinh hoạt hàng ngày sau khi thiết lập tính năng mở khóa nhanh trên màn hình tiếp theo, và wwwallet sẽ không bao giờ hiển thị nó cho bạn nữa.',
    recoveryExplainerPhrase: 'cụm từ khôi phục',
    copyRecoveryPhrase: 'Sao chép cụm từ khôi phục',
    savedAckLabel: 'Tôi đã lưu cụm từ khôi phục của mình ở một nơi an toàn',
    createVault: 'Tạo kho lưu trữ',
    haveBackup: 'Bạn đã có bản sao lưu chưa?',
    restoreFromDrive: 'Khôi phục từ Google Drive',
    restoreFromLocalFile: 'Khôi phục từ tệp cục bộ',
    quickUnlockTitle: 'Cài đặt tính năng mở khóa nhanh',
    quickUnlockBody:
      'Hãy sử dụng Face ID hoặc Touch ID để mở khóa thiết bị hàng ngày, thay vì sử dụng cụm từ khôi phục.',
    enablePasskey: 'Bật Face ID / Touch ID',
    passkeyEnabledLabel: 'Hỗ trợ Face ID / Touch ID',
    passkeyUnsupportedNote:
      'Tính năng này không được hỗ trợ trên thiết bị hoặc trình duyệt này — bạn vẫn có thể mở khóa bằng cụm từ khôi phục, hoặc thử lại sau từ mục Cài đặt.',
    skipTitle: 'Bỏ qua tính năng mở khóa nhanh?',
    skipBody:
      'Nếu không có mật khẩu, bạn sẽ phải nhập toàn bộ cụm từ khôi phục mỗi khi mở wwwallet. Bạn có thể thiết lập tính năng này sau này trong phần Cài đặt.',
    continueAnyway: 'Dù sao thì cứ tiếp tục đi',
  },
  vaultUnlock: {
    title: 'Mở khóa wwwallet',
    unlockWithPasskey: 'Mở khóa bằng Face ID / Touch ID',
    recoveryPhraseLabel: 'Cụm từ khôi phục (24 từ)',
    unlock: 'Mở khóa',
    useRecoveryInstead: 'Hãy sử dụng cụm từ khôi phục thay vào đó',
  },
  settings: {
    title: 'Cài đặt',
    toggleThemeAria: 'Chuyển đổi chủ đề',
    closeAria: 'Đóng cài đặt',
    lockNow: 'Khóa ngay',
    languageLabel: 'Ngôn ngữ',
    currencyLabel: 'Đơn vị tiền tệ',
    securityTitle: 'An ninh',
    securityIntro:
      'Cụm từ khôi phục của bạn sẽ không bao giờ được lưu trữ ở bất kỳ nơi nào mà người khác có thể xem được — hãy cất giữ nó ở một nơi an toàn. Face ID / Touch ID là cách nhanh nhất để mở khóa hàng ngày; wwwallet cũng sẽ tự động khóa sau vài phút không hoạt động.',
    passkeyLabel: 'Face ID / Touch ID',
    passkeyEnabled: 'Đã bật',
    passkeyNotSetUp: 'Chưa được thiết lập',
    remove: 'Xóa',
    enable: 'Bật',
    removePasskeyTitle: 'Hủy tính năng mở khóa bằng Face ID / Touch ID?',
    removePasskeyBody:
      'Bạn sẽ cần nhập toàn bộ cụm từ khôi phục mỗi khi mở khóa wwwallet cho đến khi bạn thiết lập lại mật khẩu.',
    removeAnyway: 'Vẫn xóa',
  },
  transactions: {
    title: 'Giao dịch',
    empty: 'Không tìm thấy giao dịch nào.',
    visitAccountFirst:
      'Hãy truy cập vào tài khoản đó trước để tải lịch sử giao dịch của tài khoản đó.',
  },
  token: {
    defaultLabel: 'Token',
  },
  qrScanner: {
    title: 'Quét mã QR địa chỉ',
    cameraError: 'Không thể truy cập camera. Vui lòng kiểm tra quyền truy cập và thử lại.',
  },
  validation: {
    amountGreaterThanZero: 'Hãy nhập một số lớn hơn 0.',
    insufficientBalance:
      'Số tiền cần chuyển vượt quá số dư trong tài khoản người gửi (bao gồm cả phí giao dịch).',
    invalidRecipientAddress: 'Vui lòng nhập địa chỉ người nhận hợp lệ.',
    validTokenOrEth: 'Nhập địa chỉ token hợp lệ hoặc ETH (nếu là token gốc).',
    validBuyToken: 'Vui lòng nhập địa chỉ token mua hợp lệ.',
    labelRequired: 'Phải điền nhãn.',
    validAddress: 'Vui lòng nhập một địa chỉ hợp lệ.',
    filePasswordRequired: 'Tệp này yêu cầu nhập mật khẩu.',
    mnemonicWordCount: 'Số từ không đúng ({count}). Yêu cầu phải có 12 hoặc 24 từ.',
    privateKeyRequired: 'Cần có khóa riêng.',
    keystoreFileRequired: 'Chọn một tệp keystore.',
    recoveryPhraseFormat: 'Câu đó có vẻ không phải là cụm từ khôi phục hợp lệ.',
  },
  msg: {
    account: {
      added: 'Tài khoản đã được thêm.',
    },
    address: {
      copied: 'Đã sao chép địa chỉ.',
    },
    qr: {
      noAddress: 'Mã QR không chứa địa chỉ nào có thể nhận diện được.',
    },
    send: {
      success: 'Đã gửi. Mã băm giao dịch: {hash}',
    },
    swap: {
      approvalSubmitted:
        'Đã gửi yêu cầu phê duyệt. Hãy đợi cho đến khi có xác nhận, sau đó thực hiện trao đổi lại.',
      success: 'Đã gửi yêu cầu hoán đổi. Mã băm giao dịch: {hash}',
    },
    backup: {
      driveSuccess: 'Đã sao lưu lên Google Drive.',
    },
    restore: {
      driveSuccess:
        'Đã khôi phục từ Google Drive. Hãy nhập cụm từ khôi phục để mở khóa và tiếp tục.',
      fileSuccess: 'Đã khôi phục từ tệp. Hãy nhập cụm từ khôi phục để mở khóa và tiếp tục.',
      driveSuccessSetup: 'Đã khôi phục từ Google Drive. Vui lòng nhập cụm từ khôi phục để mở khóa.',
      fileSuccessSetup: 'Đã khôi phục từ tệp. Nhập cụm từ khôi phục để mở khóa.',
    },
    recoveryPhrase: {
      copied:
        'Cụm từ khôi phục đã được sao chép — nó sẽ bị xóa khỏi khay nhớ tạm của bạn sau 45 giây.',
      copyFailed: 'Không thể sao chép tự động — hãy chọn và sao chép các từ theo cách thủ công.',
    },
    passkey: {
      ready: 'Chức năng mở khóa bằng Face ID / Touch ID đã sẵn sàng.',
    },
  },
  errors: {
    unknown: 'Đã xảy ra lỗi không xác định',
    requestFailed: 'Yêu cầu gửi đến {path} đã thất bại với {status}',
    webauthnUnavailable: 'WebAuthn không khả dụng trên trình duyệt này',
    passkeyRegistrationCancelled: 'Việc đăng ký mã thông hành đã bị hủy bỏ',
    passkeyNoPrfSecret: 'passkey không trả về khóa bí mật PRF',
    passkeyUnlockCancelled: 'Việc mở khóa bằng mật khẩu đã bị hủy',
    prfNotSupported:
      'Thiết bị hoặc trình duyệt này không hỗ trợ tính năng mở khóa bằng khóa truy cập không cần mật khẩu (WebAuthn PRF). Bạn vẫn có thể mở khóa bằng cụm từ khôi phục hoặc thử sử dụng thiết bị/trình duyệt khác.',
    googleDriveNotConfigured:
      'Chức năng sao lưu Google Drive chưa được cấu hình (thiếu VITE_GOOGLE_CLIENT_ID)',
    gisLoadFailed: 'Không thể tải Dịch vụ Nhận dạng của Google',
    googleSignInCancelled: 'Việc đăng nhập bằng Google đã bị hủy',
    googleDriveSearchFailed: 'Không thể tìm kiếm trên Google Drive',
    googleDriveUploadFailed: 'Không thể tải bản sao lưu lên Google Drive',
    googleDriveNoBackup: 'Không tìm thấy bản sao lưu nào trong tài khoản Google này',
    googleDriveDownloadFailed: 'Không tải xuống được bản sao lưu từ Google Drive',
    noVaultOnDevice: 'Không có kho lưu trữ nào trên thiết bị này',
    cannotSaveNoVault: 'Không thể lưu: chưa có kho lưu trữ nào',
    noRecoveryWrapToExport: 'Kho lưu trữ không có chuỗi khôi phục nào để xuất',
    invalidBackupFile: 'Tệp này không phải là bản sao lưu wwwallet hợp lệ.',
    vaultUnlockFailed: 'Cụm từ khôi phục không chính xác hoặc kho lưu trữ bị hỏng.',
    unlockMethodNotEnrolled: '{method} chưa được thiết lập cho kho lưu trữ này.',
    passkeyNotSetUp: 'Mật khẩu chính chưa được thiết lập cho kho này.',
    vaultLocked: 'két sắt đã được khóa',
    chooseKeystoreFile: 'Chọn tệp kho khóa',
  },
  currency: {
    USD: 'Đồng đô la Mỹ',
    EUR: 'Euro',
    GBP: 'Bảng Anh',
    AUD: 'Đồng đô la Úc',
    CAD: 'Đồng đô la Canada',
    JPY: 'Yên Nhật',
    CHF: 'Franc Thụy Sĩ',
    CNH: 'Yuan',
    SEK: 'Krona Thụy Điển',
    NZD: 'Đồng đô la New Zealand',
  },
}
