export default {
  nav: {
    wallet: 'Dompet',
    ethereum: 'Ethereum',
    crypto: 'Kripto',
    faqs: 'Pertanyaan yang Sering Diajukan',
    launch: 'Buka Dompet',
    home: 'Kembali ke atas',
    sectionNavLabel: 'Navigasi bagian',
  },
  settings: {
    open: 'Pengaturan',
    close: 'Tutup pengaturan',
    theme: 'Tema',
    themeLight: 'Cahaya',
    themeDark: 'Gelap',
    language: 'Bahasa',
  },
  hero: {
    eyebrow: 'Dompet Ethereum pribadi yang tidak menyimpan aset',
    heading1: 'Kunci Anda.',
    heading2: 'Perangkat Anda.',
    heading3: 'Dompet Anda.',
    lede: 'wwwallet mengenkripsi dompet Anda di perangkat Anda sendiri dan tidak pernah mengirimkan kunci, kata sandi, atau frasa pemulihan Anda ke tempat lain mana pun. Tidak perlu membuat akun. Tidak ada server yang bisa diretas. Hanya Anda dan aset kripto Anda.',
    ctaPrimary: 'Buka Dompet',
    ctaSecondary: 'Lihat cara kerjanya',
  },
  wallet: {
    eyebrow: 'Dompet',
    heading: 'Dirancang sedemikian rupa sehingga hanya Anda yang bisa membukanya',
    lede: 'wwwallet tidak menyimpan dana Anda — layanan ini membantu Anda menyimpannya sendiri. Inilah artinya dalam praktiknya.',
    points: [
      {
        title: 'Tanpa penyimpanan, selalu',
        body: 'Kunci pribadi Anda dihasilkan dan dienkripsi di perangkat Anda sendiri. Server wwwallet sama sekali tidak pernah mengaksesnya — tidak ada basis data dompet yang bisa diretas, karena memang tidak ada basis data sama sekali.',
      },
      {
        title: 'Terenkripsi dengan AES-256, dapat dibuka sesuai keinginan Anda',
        body: 'Brankas Anda dilindungi dengan enkripsi AES-256-GCM. Buka kuncinya menggunakan frasa pemulihan Anda, atau aktifkan kunci akses — Face ID, Touch ID, atau Windows Hello — untuk akses cepat yang hanya berlaku secara lokal.',
      },
      {
        title: 'Mengunci sendiri secara otomatis',
        body: 'wwwallet akan terkunci setelah beberapa saat tidak digunakan, dan tidak pernah menyimpan sesi yang sudah dibuka kuncinya ke disk — tutup tab tersebut, dan sistem akan melupakannya, secara sengaja.',
      },
      {
        title: 'Satu dompet, lima jaringan Ethereum',
        body: 'Menyimpan dan mengirim melalui jaringan utama Ethereum, Polygon, Arbitrum, Base, dan Optimism dari sekumpulan akun yang sama.',
      },
    ],
    caveatTitle:
      'Frasa pemulihan Anda berfungsi untuk membuka brankas Anda — ini bukanlah cadangan ajaib',
    caveatBody:
      'Simpan frasa pemulihan Anda di tempat yang aman, tetapi buat juga cadangan di Google Drive atau dalam bentuk file. Anda akan membutuhkan cadangan tersebut untuk memulihkan dompet Anda di perangkat baru, dan frasa tersebut untuk membukanya setelah dompet tersebut dipulihkan.',
    caveatLink: 'Baca selengkapnya di bagian Pertanyaan yang Sering Diajukan (FAQ)',
  },
  ethereum: {
    eyebrow: 'Ethereum',
    heading: 'Mengapa Ethereum',
    lede: 'wwwallet dirancang khusus untuk Ethereum. Berikut ini alasannya, dalam bahasa yang sederhana.',
    points: [
      {
        title: 'Sebuah komputer global, bukan sekadar buku besar',
        body: 'Ethereum mengadopsi konsep Bitcoin mengenai buku besar bersama yang tidak dapat dimanipulasi, lalu mengembangkannya menjadi sebuah komputer global yang dapat diprogram, yang dapat dikembangkan oleh siapa saja, dan tidak dapat dimatikan oleh pihak mana pun.',
      },
      {
        title: 'Dijamin melalui staking, bukan penambangan',
        body: 'Sejak “The Merge” pada tahun 2022, Ethereum telah diamankan melalui mekanisme Proof-of-Stake, bukan melalui penambangan yang boros energi — para validator mempertaruhkan ETH sebagai jaminan, alih-alih menghabiskan listrik untuk bersaing memperebutkan blok.',
      },
      {
        title: 'Terbuka dan tanpa izin',
        body: 'Tidak ada pihak yang menyetujui akun Anda. Siapa pun, di mana pun, dapat menyimpan ETH atau mengembangkan aplikasi di Ethereum — aturan yang sama berlaku bagi semua orang, termasuk lembaga-lembaga terbesar sekalipun.',
      },
      {
        title: 'Standar yang menjadi landasan bagi jaringan-jaringan lain',
        body: 'Jaringan Layer-2 seperti Arbitrum, Base, dan Optimism — yang semuanya didukung di wwwallet — memperluas keamanan Ethereum untuk memungkinkan transaksi yang lebih cepat dan lebih murah, alih-alih membangunnya dari nol.',
      },
    ],
    linkLabel: 'Baca selengkapnya di situs Ethereum Foundation',
    linkUrl: 'https://ethereum.org/en/foundation/',
  },
  crypto: {
    eyebrow: 'Kripto',
    heading: 'Kripto, dalam bahasa yang sederhana',
    lede: 'Beberapa konsep yang perlu dipahami sebelum Anda memiliki aset kripto sendiri — tidak hanya melalui wwwallet.',
    points: [
      {
        title: 'Penitipan vs. non-penitipan',
        body: 'Dompet kustodian atau bursa menyimpan kunci Anda — memang praktis, tetapi Anda harus mempercayai pihak lain agar tidak membekukan, kehilangan, atau menyalahgunakan dana Anda. Dompet non-kustodian seperti wwwallet menempatkan kunci, serta tanggung jawabnya, sepenuhnya di tangan Anda sendiri.',
      },
      {
        title: 'Staking vs. penambangan',
        body: 'Penambangan Proof-of-Work mengamankan blockchain dengan daya komputasi mentah dan listrik. Sementara itu, Proof-of-Stake mengamankannya dengan modal yang dipertaruhkan. Langkah Ethereum beralih ke staking berhasil mengurangi konsumsi energinya lebih dari 99,9% — kira-kira setara dengan perbedaan antara memasok listrik untuk sebuah negara kecil dan sebuah kota kecil.',
      },
      {
        title: 'Melampaui Ethereum',
        body: 'Bitcoin lebih mengutamakan kesederhanaan dan prediktabilitas daripada kemampuan pemrograman. Jaringan seperti Solana mengutamakan throughput mentah, yang seringkali dilakukan dengan mengorbankan desentralisasi. Ethereum lebih mengutamakan desentralisasi dan keamanan, serta menyerahkan urusan kecepatan dan biaya kepada jaringan Layer-2 yang dibangun di atasnya.',
      },
      {
        title: 'Tidak ada pihak yang sah yang akan meminta frasa Anda',
        body: 'Apa pun dompet yang Anda gunakan: tidak ada bursa, tidak ada petugas dukungan, dan tidak ada karyawan wwwallet yang akan pernah meminta frasa pemulihan Anda. Siapa pun yang melakukannya sedang berusaha merampok Anda.',
      },
    ],
    linkLabel: 'Pelajari lebih dalam bersama podcast Bankless',
    linkUrl: 'https://www.bankless.com/',
  },
  faqs: {
    eyebrow: 'Pertanyaan yang Sering Diajukan',
    heading: 'Pertanyaan yang Sering Diajukan',
    items: [
      {
        q: 'Apakah frasa pemulihan saya cukup untuk mendapatkan dompet saya kembali?',
        a: 'Tidak sendirian. Frasa pemulihan Anda memang dapat membuka brankas terenkripsi Anda, tetapi brankas itu sendiri hanya tersimpan di perangkat Anda. Jika Anda kehilangan atau menghapus data perangkat tersebut tanpa pernah membuat cadangan, tidak akan ada lagi yang bisa dibuka oleh frasa tersebut. Selalu padukan frasa pemulihan Anda dengan cadangan di Google Drive atau cadangan file — lihat pertanyaan berikutnya.',
      },
      {
        q: 'Bagaimana cara membuat cadangan dompet saya?',
        a: 'Dari menu Pengaturan, buat cadangan brankas terenkripsi Anda ke Google Drive milik Anda sendiri — yang disimpan dalam folder pribadi yang hanya dapat diakses oleh aplikasi, sehingga wwwallet tidak dapat melihat bagian lainnya — atau sebagai berkas yang dapat Anda unduh dan simpan sendiri. Lakukan hal ini setiap kali Anda membuat dompet atau menambahkan akun baru.',
      },
      {
        q: 'Apakah saya bisa menggunakan wwwallet di lebih dari satu perangkat?',
        a: 'Ya, tapi fitur ini tidak disinkronkan secara otomatis — setiap perangkat memiliki brankas lokalnya sendiri. Untuk menggunakan wwwallet di perangkat baru, pulihkan data dari Drive atau cadangan file, lalu buka kuncinya menggunakan frasa pemulihan Anda.',
      },
      {
        q: 'Apa yang akan terjadi jika saya kehilangan perangkat saya dan belum pernah membuat cadangan?',
        a: 'Dana Anda tidak dapat dipulihkan. Hal ini memang dirancang demikian: wwwallet tidak memiliki sistem akun dan tidak menyimpan salinan brankas Anda di mana pun, sehingga tidak ada seorang pun — termasuk kami — yang dapat memulihkannya untuk Anda. Inilah konsekuensi dari dompet yang hanya dapat diakses oleh Anda sendiri.',
      },
      {
        q: 'Apakah kode sandi (Face ID/Touch ID) dapat dipindahkan ke perangkat baru?',
        a: 'Tidak. Kode sandi terikat pada perangkat tempat kode tersebut dibuat. Setelah memulihkan cadangan ke perangkat baru, buka kunci perangkat tersebut menggunakan frasa pemulihan Anda, lalu Anda dapat membuat kode sandi baru di perangkat tersebut.',
      },
      {
        q: 'Apakah wwwallet bersifat open source?',
        a: 'Kode sumbernya tersedia untuk umum di GitHub, sehingga siapa pun dapat membacanya. Kode tersebut belum dirilis di bawah lisensi sumber terbuka, jadi untuk saat ini anggaplah kode tersebut sebagai kode yang tersedia untuk umum guna ditinjau, bukan sebagai kode sumber terbuka.',
      },
      {
        q: 'Jaringan apa saja yang didukung oleh wwwallet?',
        a: 'Jaringan utama Ethereum, ditambah jaringan Layer-2 Polygon, Arbitrum, Base, dan Optimism — semuanya berasal dari kumpulan akun yang sama.',
      },
      {
        q: 'Apa saja yang diketahui wwwallet tentang saya?',
        a: 'Tidak ada yang dapat mengidentifikasi Anda. Tidak ada akun, proses login, maupun basis data. Data saldo dan harga diambil melalui backend milik wwwallet sendiri, bukan melalui browser Anda yang menghubungi penyedia pihak ketiga secara langsung, dan backend tersebut sama sekali tidak melihat kunci, kata sandi, atau frasa pemulihan Anda.',
      },
    ],
  },
  footer: {
    tagline: 'Dompet Ethereum pribadi yang tidak menyimpan aset.',
    sourceLink: 'Lihat kode sumbernya di GitHub',
    copyright: '© {year} wwwallet',
  },
}
