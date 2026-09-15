export default {
  common: {
    cancel: 'Batal',
    save: 'Simpan',
    done: 'Selesai',
    goBack: 'Kembali',
    label: 'Label',
    chain: 'Rantai',
    address: 'Alamat',
  },
  nav: {
    settings: 'Pengaturan',
    accounts: 'Akun',
    dismiss: 'Tutup',
  },
  accounts: {
    title: 'Akun',
    addAccount: 'Tambahkan akun',
    empty: 'Belum ada akun. Tambahkan satu akun untuk memulai.',
  },
  accountDetail: {
    swap: 'Tukar',
    transactions: 'Transaksi',
    receiveAria: 'Menerima kripto',
    sendAria: 'Kirim kripto',
  },
  addAccount: {
    title: 'Tambahkan akun',
    tabCreate: 'Buat yang baru',
    tabMnemonic: 'Impor mnemonik',
    tabPrivateKey: 'Impor kunci pribadi',
    tabKeystore: 'Impor berkas keystore',
    mnemonicLabel: 'Frasa pemulihan (mnemonic)',
    privateKeyLabel: 'Kunci pribadi',
    keystoreFileLabel: 'Berkas JSON Keystore',
    filePasswordLabel: 'Kata sandi berkas ini',
    filePasswordHint:
      'Kata sandi yang awalnya digunakan untuk mengenkripsi berkas keystore ini — bukan kata sandi baru. Setelah diimpor, Anda hanya perlu membuka kunci brankas Anda.',
    noPasswordHint:
      'Tidak perlu kata sandi — akun ini dilindungi oleh metode pembuka kunci dari vault Anda sendiri (Face ID/Touch ID atau frasa pemulihan).',
    submit: 'Tambahkan akun',
  },
  send: {
    title: 'Kirim',
    fromLabel: 'Dari {label} ({chain})',
    recipientLabel: 'Alamat penerima',
    scanQrAria: 'Pindai kode QR',
    amountLabel: 'Jumlah',
    submit: 'Kirim',
  },
  receive: {
    title: 'Terima',
    defaultAccountLabel: 'Akun',
    tapToCopy: 'Ketuk untuk menyalin',
    copyAria: 'Salin alamat',
  },
  swap: {
    title: 'Tukar',
    sellTokenLabel: 'Jual token (alamat, atau ETH untuk token asli)',
    buyTokenLabel: 'Alamat pembelian token',
    sellAmountLabel: 'Jumlah yang dijual',
    getQuote: 'Dapatkan penawaran',
    estimateText: 'Diperkirakan akan diterima: {amount} dengan harga {price}',
    signingNotice:
      'Anda sedang menandatangani transaksi untuk kontrak {address} (melalui agregator 0x).',
    submit: 'Tukar',
  },
  payees: {
    title: 'Penerima pembayaran',
    add: 'Tambahkan penerima pembayaran',
    empty: 'Belum ada penerima pembayaran.',
    deleteAria: 'Hapus {label}',
    labelField: 'Label',
    addressField: 'Alamat',
  },
  backup: {
    title: 'Pencadangan & pemulihan',
    intro:
      'Cadangan dienkripsi di perangkat ini sebelum dikirim ke luar. Server wwwallet sama sekali tidak terlibat — saat memulihkan data di perangkat baru, prosesnya terhubung langsung ke Google atau membaca berkas lokal.',
    googleDriveTitle: 'Google Drive',
    backUpNow: 'Lakukan pencadangan sekarang',
    restoreLatest: 'Kembalikan cadangan terbaru',
    localFileTitle: 'Berkas lokal',
    downloadBackup: 'Unduh berkas cadangan',
    restoreFromFile: 'Pulihkan dari berkas',
    replaceTitle: 'Mau mengganti dompet yang sekarang?',
    replaceBody:
      'Proses pemulihan akan mengganti semua data yang saat ini ada di brankas ini — akun, penerima pembayaran, dan pengaturan — dengan data yang ada dalam cadangan, serta menghapus kode sandi apa pun yang telah diatur di perangkat ini (Anda akan mengaktifkannya kembali setelah membuka kunci). Tindakan ini tidak dapat dibatalkan.',
    replaceConfirm: 'Ganti saja',
  },
  vaultSetup: {
    createTitle: 'Buat dompet Anda',
    recoveryExplainer:
      'Ini adalah {phrase} Anda. Kode ini mengenkripsi semua data di perangkat ini dan merupakan satu-satunya cara untuk mengakses kembali perangkat jika Anda kehilangan akses ke kunci sandi Anda — termasuk saat memulihkan cadangan ke perangkat baru. Tuliskan atau salin ke tempat yang aman dan offline. Anda tidak akan membutuhkannya dalam aktivitas sehari-hari setelah fitur pembukaan kunci cepat disetel pada layar berikutnya, dan wwwallet tidak akan pernah menampilkannya lagi kepada Anda.',
    recoveryExplainerPhrase: 'frasa pemulihan',
    copyRecoveryPhrase: 'Salin frasa pemulihan',
    savedAckLabel: 'Saya sudah menyimpan frasa pemulihan saya di tempat yang aman',
    createVault: 'Buat brankas',
    haveBackup: 'Sudah punya salinan cadangan?',
    restoreFromDrive: 'Pulihkan dari Google Drive',
    restoreFromLocalFile: 'Memulihkan dari file lokal',
    quickUnlockTitle: 'Atur fitur buka kunci cepat',
    quickUnlockBody:
      'Gunakan Face ID atau Touch ID untuk membuka kunci perangkat sehari-hari, alih-alih menggunakan frasa pemulihan Anda.',
    enablePasskey: 'Aktifkan Face ID / Touch ID',
    passkeyEnabledLabel: 'Mendukung Face ID / Touch ID',
    passkeyUnsupportedNote:
      'Tidak didukung di perangkat atau peramban ini — Anda tetap bisa membuka kunci menggunakan frasa pemulihan, atau coba lagi nanti dari menu Pengaturan.',
    skipTitle: 'Lewati pembukaan cepat?',
    skipBody:
      'Tanpa kata sandi, Anda harus memasukkan frasa pemulihan lengkap setiap kali membuka wwwallet. Anda bisa mengaturnya nanti melalui Pengaturan.',
    continueAnyway: 'Lanjutkan saja',
  },
  vaultUnlock: {
    title: 'Buka kunci wwwallet',
    unlockWithPasskey: 'Buka kunci dengan Face ID / Touch ID',
    recoveryPhraseLabel: 'Frasa pemulihan (24 kata)',
    unlock: 'Buka Kunci',
    useRecoveryInstead: 'Gunakan frasa pemulihan sebagai gantinya',
  },
  settings: {
    title: 'Pengaturan',
    toggleThemeAria: 'Ubah tema',
    closeAria: 'Tutup pengaturan',
    lockNow: 'Kunci sekarang',
    languageLabel: 'Bahasa',
    currencyLabel: 'Mata uang',
    securityTitle: 'Keamanan',
    securityIntro:
      'Frasa pemulihan Anda tidak pernah disimpan di tempat mana pun yang memungkinkan frasa tersebut ditampilkan kembali kepada Anda — simpanlah di tempat yang aman. Face ID / Touch ID adalah cara tercepat untuk membuka kunci sehari-hari; wwwallet juga akan terkunci secara otomatis setelah beberapa menit tidak digunakan.',
    passkeyLabel: 'Face ID / Touch ID',
    passkeyEnabled: 'Diaktifkan',
    passkeyNotSetUp: 'Belum diatur',
    remove: 'Hapus',
    enable: 'Aktifkan',
    removePasskeyTitle: 'Hapus fitur pembukaan kunci Face ID / Touch ID?',
    removePasskeyBody:
      'Anda akan memerlukan frasa pemulihan lengkap setiap kali membuka kunci wwwallet sampai Anda mengatur kata sandi lagi.',
    removeAnyway: 'Hapus saja',
  },
  transactions: {
    title: 'Transaksi',
    empty: 'Tidak ditemukan transaksi.',
    visitAccountFirst: 'Kunjungi akun tersebut terlebih dahulu untuk memuat riwayat transaksinya.',
  },
  token: {
    defaultLabel: 'Token',
  },
  qrScanner: {
    title: 'Pindai kode QR alamat ini',
    cameraError: 'Akses kamera gagal. Periksa izinnya, lalu coba lagi.',
  },
  validation: {
    amountGreaterThanZero: 'Masukkan jumlah yang lebih besar dari nol.',
    insufficientBalance:
      'Jumlah yang akan dikirim melebihi saldo rekening pengirim (termasuk biaya transaksi).',
    invalidRecipientAddress: 'Masukkan alamat penerima yang valid.',
    validTokenOrEth: 'Masukkan alamat token yang valid, atau ETH untuk token asli.',
    validBuyToken: 'Masukkan alamat token pembelian yang valid.',
    labelRequired: 'Label wajib diisi.',
    validAddress: 'Masukkan alamat yang sah.',
    filePasswordRequired: 'Kata sandi berkas ini wajib diisi.',
    mnemonicWordCount: 'Jumlah kata tidak sesuai ({count}). Harus 12 atau 24 kata.',
    privateKeyRequired: 'Diperlukan kunci pribadi.',
    keystoreFileRequired: 'Pilih berkas keystore.',
    recoveryPhraseFormat: 'Itu sepertinya bukan frasa pemulihan yang sah.',
  },
  msg: {
    account: {
      added: 'Akun telah ditambahkan.',
    },
    address: {
      copied: 'Alamat telah disalin.',
    },
    qr: {
      noAddress: 'Kode QR tersebut tidak berisi alamat yang dapat dikenali.',
    },
    send: {
      success: 'Terkirim. Hash transaksi: {hash}',
    },
    swap: {
      approvalSubmitted:
        'Permohonan persetujuan telah diajukan. Tunggu hingga dikonfirmasi, lalu lakukan pertukaran lagi.',
      success: 'Pertukaran telah dikirim. Hash transaksi: {hash}',
    },
    backup: {
      driveSuccess: 'Telah dicadangkan ke Google Drive.',
    },
    restore: {
      driveSuccess:
        'Telah dipulihkan dari Google Drive. Buka kunci menggunakan frasa pemulihan Anda untuk melanjutkan.',
      fileSuccess:
        'Telah dipulihkan dari berkas. Buka kunci menggunakan frasa pemulihan Anda untuk melanjutkan.',
      driveSuccessSetup:
        'Telah dipulihkan dari Google Drive. Masukkan frasa pemulihan Anda untuk membuka kunci.',
      fileSuccessSetup:
        'Telah dipulihkan dari berkas. Masukkan frasa pemulihan Anda untuk membuka kunci.',
    },
    recoveryPhrase: {
      copied:
        'Frasa pemulihan telah disalin — frasa tersebut akan dihapus dari papan klip Anda dalam 45 detik.',
      copyFailed:
        'Tidak dapat disalin secara otomatis — silakan pilih dan salin kata-kata tersebut secara manual.',
    },
    passkey: {
      ready: 'Pembukaan kunci dengan Face ID / Touch ID sudah siap.',
    },
  },
  errors: {
    unknown: 'Terjadi kesalahan yang tidak diketahui',
    requestFailed: 'Permintaan ke {path} gagal dengan {status}',
    webauthnUnavailable: 'WebAuthn tidak tersedia di peramban ini',
    passkeyRegistrationCancelled: 'Pendaftaran kode akses telah dibatalkan',
    passkeyNoPrfSecret: 'passkey tidak mengembalikan rahasia PRF',
    passkeyUnlockCancelled: 'Pembukaan kunci dengan passkey telah dibatalkan',
    prfNotSupported:
      'Perangkat atau peramban ini tidak mendukung pembukaan kunci tanpa kata sandi (WebAuthn PRF). Anda masih bisa membuka kunci menggunakan frasa pemulihan, atau coba gunakan perangkat/peramban lain.',
    googleDriveNotConfigured:
      'Pencadangan Google Drive belum dikonfigurasi (VITE_GOOGLE_CLIENT_ID tidak ada)',
    gisLoadFailed: 'Gagal memuat Layanan Identitas Google',
    googleSignInCancelled: 'Proses masuk dengan Google telah dibatalkan',
    googleDriveSearchFailed: 'Gagal melakukan pencarian di Google Drive',
    googleDriveUploadFailed: 'Gagal mengunggah cadangan ke Google Drive',
    googleDriveNoBackup: 'Tidak ditemukan cadangan di akun Google ini',
    googleDriveDownloadFailed: 'Gagal mengunduh cadangan dari Google Drive',
    noVaultOnDevice: 'Tidak ada brankas di perangkat ini',
    cannotSaveNoVault: 'Tidak dapat menyimpan: brankas belum ada',
    noRecoveryWrapToExport: 'vault tidak memiliki pembungkus frasa pemulihan yang dapat diekspor',
    invalidBackupFile: 'Berkas ini bukanlah cadangan wwwallet yang sah.',
    vaultUnlockFailed: 'Frasa pemulihan salah atau brankas rusak.',
    unlockMethodNotEnrolled: '{method} belum dikonfigurasi untuk brankas ini.',
    passkeyNotSetUp: 'Kode akses belum diatur untuk brankas ini.',
    vaultLocked: 'brankasnya terkunci',
    chooseKeystoreFile: 'pilih berkas keystore',
  },
  currency: {
    USD: 'Dolar AS',
    EUR: 'Euro',
    GBP: 'Pound sterling',
    AUD: 'Dolar Australia',
    CAD: 'Dolar Kanada',
    JPY: 'Yen Jepang',
    CHF: 'franc Swiss',
    CNH: 'Yuan',
    SEK: 'Krona Swedia',
    NZD: 'Dolar Selandia Baru',
  },
}
