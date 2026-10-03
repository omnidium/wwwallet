export default {
  nav: {
    wallet: 'wwwallet',
    ethereum: 'Ethereum',
    crypto: 'Kripto',
    faqs: 'Pertanyaan yang Sering Diajukan',
    launch: 'Luncurkan wwwallet',
    home: 'Kembali ke atas',
    sectionNavLabel: 'Navigasi bagian',
    principles: 'Prinsip-prinsip',
  },
  settings: {
    open: 'Pengaturan',
    close: 'Tutup pengaturan',
    theme: 'Tema',
    themeLight: 'Ringan',
    themeDark: 'Gelap',
    language: 'Bahasa',
    search: 'Cari',
    noMatches: 'Tidak ada hasil yang cocok',
    version: 'Versi {version}',
  },
  hero: {
    eyebrow: 'Dompet Ethereum gratis dan non-kustodian',
    heading1: 'Kunci Anda.',
    heading2: 'Perangkat Anda.',
    heading3: 'Gratis untuk semua orang.',
    lede: 'wwwallet berjalan di browser Anda dan menyimpan kunci Anda dalam bentuk terenkripsi di perangkat Anda sendiri. Tidak perlu membuat akun, tidak ada biaya yang harus dibayar, dan tidak ada iklan, serta cara kerjanya sama untuk semua orang.',
    ctaPrimary: 'Luncurkan wwwallet',
    ctaSecondary: 'Lihat cara kerjanya',
    note: 'Tanpa pendaftaran · Tanpa iklan · Tanpa pelacakan · 31 bahasa',
  },
  wallet: {
    eyebrow: 'wwwallet',
    heading: 'Dirancang agar hanya Anda yang dapat membukanya',
    lede: 'wwwallet tidak menyimpan dana Anda — aplikasi ini membantu Anda menyimpannya sendiri. Inilah artinya dalam praktiknya.',
    points: [
      {
        title: 'Non-custodial, selalu',
        body: 'Kunci pribadi Anda dihasilkan dan dienkripsi di perangkat Anda sendiri. Server wwwallet tidak pernah melihatnya — tidak ada basis data kunci yang dapat diretas, karena memang tidak ada basis data sama sekali.',
      },
      {
        title: 'Terenkripsi dengan AES-256, dibuka sesuai keinginan Anda',
        body: 'Brankas Anda dilindungi dengan enkripsi AES-256-GCM. Buka kuncinya dengan frasa pemulihan Anda, atau aktifkan kunci sandi — Face ID, Touch ID, atau Windows Hello — untuk akses cepat yang hanya berlaku secara lokal.',
      },
      {
        title: 'Mengunci diri secara otomatis',
        body: 'wwwallet akan terkunci setelah beberapa saat tidak aktif, dan tidak pernah menyimpan sesi yang tidak terkunci ke disk — tutup tabnya dan aplikasi ini akan melupakannya, secara sengaja.',
      },
      {
        title: 'Lima jaringan Ethereum, satu set akun',
        body: 'Simpan dan kirim di seluruh mainnet Ethereum, Polygon, Arbitrum, Base, dan Optimism dengan akun dan alamat yang sama.',
      },
    ],
    caveatTitle: 'Frasa pemulihan Anda membuka brankas Anda — ini bukanlah cadangan ajaib',
    caveatBody:
      'Simpan frasa pemulihan Anda di tempat yang aman, tetapi buat juga cadangan di Google Drive atau dalam bentuk file. Anda akan membutuhkan cadangan tersebut untuk memulihkan dompet Anda di perangkat baru, dan frasa tersebut untuk membukanya setelah Anda melakukannya.',
    caveatLink: 'Baca selengkapnya di FAQ',
  },
  ethereum: {
    eyebrow: 'Ethereum',
    heading: 'Mengapa Ethereum',
    lede: 'wwwallet dirancang khusus untuk Ethereum. Berikut alasannya, dalam bahasa yang sederhana.',
    points: [
      {
        title: 'Komputer dunia, bukan sekadar buku besar',
        body: 'Ethereum mengadopsi ide Bitcoin tentang buku besar bersama yang tahan manipulasi dan mengembangkannya: sebuah komputer global yang dapat diprogram, yang dapat dibangun oleh siapa saja, dan tidak dapat dimatikan oleh pihak mana pun.',
      },
      {
        title: 'Diamankan melalui staking, bukan penambangan',
        body: 'Sejak “The Merge” pada tahun 2022, Ethereum telah diamankan oleh Proof-of-Stake, bukan penambangan yang boros energi — validator mempertaruhkan ETH sebagai jaminan, bukan membakar listrik untuk bersaing mendapatkan blok.',
      },
      {
        title: 'Terbuka dan tanpa izin',
        body: 'Tidak ada yang menyetujui akun Anda. Siapa pun, di mana pun, dapat menyimpan ETH atau membangun aplikasi di Ethereum — aturan yang sama berlaku untuk semua orang, termasuk lembaga-lembaga terbesar.',
      },
      {
        title: 'Standar yang digunakan oleh jaringan lain',
        body: 'Jaringan Layer-2 seperti Arbitrum, Base, dan Optimism — yang semuanya didukung di wwwallet — memperluas keamanan Ethereum ke transaksi yang lebih cepat dan lebih murah, alih-alih memulai dari awal.',
      },
    ],
    linkLabel: 'Baca selengkapnya di Ethereum Foundation',
    linkUrl: 'https://ethereum.org/en/foundation/',
  },
  crypto: {
    eyebrow: 'Kripto',
    heading: 'Kripto, dalam istilah sederhana',
    lede: 'Beberapa konsep yang perlu dipahami sebelum Anda memiliki kripto sendiri — tidak hanya dengan wwwallet.',
    points: [
      {
        title: 'Kustodian vs. non-kustodian',
        body: 'Dompet kustodian atau bursa menyimpan kunci Anda untuk Anda — memang nyaman, tetapi Anda mempercayai pihak lain agar tidak membekukan, kehilangan, atau menyalahgunakan dana Anda. Dompet non-kustodian seperti wwwallet menyerahkan kunci, dan tanggung jawabnya, sepenuhnya ke tangan Anda sendiri.',
      },
      {
        title: 'Staking vs. penambangan',
        body: 'Penambangan Proof-of-Work mengamankan blockchain dengan daya komputasi mentah dan listrik. Proof-of-Stake mengamankannya dengan modal yang dipertaruhkan. Peralihan Ethereum ke staking mengurangi penggunaan energinya lebih dari 99,9% — kira-kira setara dengan perbedaan antara memasok listrik untuk sebuah negara kecil dan sebuah kota kecil.',
      },
      {
        title: 'Selain Ethereum',
        body: 'Bitcoin mengutamakan kesederhanaan dan prediktabilitas daripada kemampuan pemrograman. Rantai seperti Solana mengutamakan throughput mentah, seringkali dengan mengorbankan desentralisasi untuk mencapainya. Ethereum lebih mengutamakan desentralisasi dan keamanan, serta menyerahkan masalah kecepatan dan biaya kepada jaringan Layer-2 yang dibangun di atasnya.',
      },
      {
        title: 'Tidak ada pihak yang sah yang akan meminta frasa Anda',
        body: 'Tidak ada bursa, tidak ada agen dukungan, dan tidak ada seorang pun dari wwwallet yang akan meminta frasa pemulihan Anda — apa pun aplikasi yang Anda gunakan. Siapa pun yang melakukannya sedang mencoba merampok Anda.',
      },
    ],
    linkLabel: 'Pelajari lebih dalam dengan podcast Bankless',
    linkUrl: 'https://www.bankless.com/',
  },
  faqs: {
    eyebrow: 'Pertanyaan Umum',
    heading: 'Pertanyaan umum',
    items: [
      {
        q: 'Apakah wwwallet benar-benar gratis?',
        a: 'Ya. Tidak ada biaya untuk menggunakannya, tidak ada tingkatan premium, dan tidak ada konten di balik paywall, serta wwwallet tidak menambahkan biaya apa pun pada setiap pengiriman atau pertukaran yang Anda lakukan. Satu-satunya biaya yang tidak dapat dihindari adalah biaya transaksi (gas) jaringan itu sendiri, yang dibayarkan ke jaringan, bukan ke wwwallet. Penawaran pertukaran berasal dari agregator bursa 0x, yang mungkin mengenakan biayanya sendiri pada beberapa transaksi — biaya semacam itu tercantum di layar tinjauan sebelum Anda mengonfirmasi.',
      },
      {
        q: 'Apakah ada iklan, pelacak, atau analitik?',
        a: 'Tidak. wwwallet tidak menampilkan iklan, tidak menjalankan skrip analitik atau pelacakan, dan tidak membuat profil tentang Anda. Tidak ada akun, jadi tidak ada yang bisa dikaitkan dengannya.',
      },
      {
        q: 'Apakah saya memerlukan akun atau ID untuk menggunakannya?',
        a: 'Tidak. Tidak ada pendaftaran, alamat email, nomor telepon, atau verifikasi identitas — Anda cukup membuat dompet di perangkat Anda dan langsung menggunakannya.',
      },
      {
        q: 'Jika gratis, bagaimana wwwallet membiayai operasinya?',
        a: 'Aplikasi ini tidak menghasilkan uang dari penggunanya — tanpa biaya, tanpa iklan, tanpa penjualan data. Biaya operasional dirancang agar tetap rendah: aplikasi ini berjalan di browser Anda, dan bagian backend hanya meneruskan data blockchain publik serta data harga.',
      },
      {
        q: 'Apakah ada orang yang bisa membekukan dompet saya?',
        a: 'Tidak ada akun, jadi tidak ada yang bisa dibekukan oleh wwwallet — atau pihak mana pun. Kunci Anda tidak pernah meninggalkan perangkat Anda, dan transaksi ditandatangani di sana sebelum dikirim ke jaringan. Dana Anda tersimpan di Ethereum, bukan di wwwallet: Anda dapat melihat kunci pribadi atau frasa pemulihan akun mana pun dari menunya dan mengimpornya ke aplikasi dompet Ethereum lainnya kapan pun Anda mau.',
      },
      {
        q: 'Apakah frasa pemulihan saya cukup untuk mendapatkan kembali dompet saya?',
        a: 'Tidak bisa berdiri sendiri. Frasa pemulihan Anda membuka kunci brankas terenkripsi Anda, tetapi brankas itu sendiri hanya ada di perangkat Anda. Jika Anda kehilangan atau menghapus perangkat tersebut tanpa pernah membuat cadangan, tidak ada lagi yang bisa dibuka oleh frasa tersebut. Selalu pasangkan frasa pemulihan Anda dengan Google Drive atau cadangan file — lihat pertanyaan berikutnya.',
      },
      {
        q: 'Bagaimana cara mencadangkan dompet saya?',
        a: 'Dari Pengaturan, buat cadangan brankas terenkripsi Anda ke Google Drive milik Anda sendiri atau sebagai file yang Anda unduh dan simpan sendiri. Cadangan Drive disimpan di folder aplikasi pribadi, dan wwwallet tidak dapat melihat apa pun yang ada di Drive Anda. Buat cadangan saat pertama kali mengatur, dan buat cadangan lagi setiap kali Anda menambahkan akun.',
      },
      {
        q: 'Apakah saya bisa menggunakan wwwallet di lebih dari satu perangkat?',
        a: 'Ya, tetapi aplikasi ini tidak disinkronkan secara otomatis — setiap perangkat memiliki brankas lokalnya sendiri. Untuk menggunakan wwwallet di perangkat baru, pulihkan aplikasi tersebut dari Drive atau cadangan file, lalu buka kuncinya dengan frasa pemulihan Anda.',
      },
      {
        q: 'Apa yang terjadi jika saya kehilangan perangkat dan tidak pernah membuat cadangan?',
        a: 'Dana Anda tidak dapat dipulihkan. Hal ini memang dirancang demikian: wwwallet tidak memiliki sistem akun dan tidak menyimpan salinan brankas Anda di mana pun, sehingga tidak ada seorang pun — termasuk kami — yang dapat memulihkannya untuk Anda. Ini adalah konsekuensi dari kunci yang hanya dapat diakses oleh Anda sendiri.',
      },
      {
        q: 'Apakah passkey (Face ID / Touch ID) dapat dipindahkan ke perangkat baru?',
        a: 'Tidak. Kunci akses terikat pada perangkat tempat kunci tersebut dibuat. Setelah memulihkan cadangan di perangkat baru, buka kunci dengan frasa pemulihan Anda, lalu Anda dapat mengatur kunci akses baru di sana.',
      },
      {
        q: 'Apakah wwwallet bersifat open source?',
        a: 'Tidak — kode sumbernya tersedia. Kode sumber lengkapnya dipublikasikan di GitHub sehingga siapa pun dapat membaca, meninjau, dan mengauditnya, tetapi ini bukan open source: kode tersebut dilisensikan di bawah PolyForm Strict License 1.0.0.',
      },
      {
        q: 'Apa saja yang boleh saya lakukan dengan kode ini?',
        a: 'Anda dapat membaca dan meninjau seluruh isinya, serta menjalankan salinan yang tidak dimodifikasi untuk tujuan nonkomersial seperti studi pribadi, penelitian, dan pengujian. Anda tidak boleh mendistribusikannya, memodifikasinya, atau membuat karya turunan (termasuk fork), maupun menggunakannya secara komersial. Jika Anda memerlukan hal yang tidak diizinkan oleh lisensi ini, hubungi pemegang hak cipta untuk mendapatkan lisensi terpisah.',
      },
      {
        q: 'Apakah wwwallet aman digunakan? Apakah ada jaminan?',
        a: 'wwwallet adalah perangkat lunak non-custodial yang disediakan "apa adanya", tanpa jaminan apa pun. Hanya Anda yang mengendalikan kunci dan dana Anda — tidak ada seorang pun, termasuk kami, yang dapat memulihkan frasa pemulihan atau cadangan yang hilang, membatalkan transaksi, atau memberikan kompensasi atas kerugian Anda. Gunakanlah hanya dana yang Anda sanggup untuk kehilangan, periksa kembali alamat dan jaringan sebelum mengirim, dan tidak ada satu pun isi di sini yang merupakan nasihat keuangan, investasi, hukum, atau pajak.',
      },
      {
        q: 'Jaringan apa saja yang didukung oleh wwwallet?',
        a: 'Jaringan utama Ethereum, ditambah jaringan Layer-2 Polygon, Arbitrum, Base, dan Optimism — semuanya dari kumpulan akun yang sama.',
      },
      {
        q: 'Bagaimana cara mengisi saldo dompet saya?',
        a: 'Buat akun, pilih “Lihat kode QR” untuk melihat alamatnya, lalu kirim dana ke alamat tersebut dari bursa atau dompet lain. Pastikan Anda mengirim dana melalui jaringan yang benar (Ethereum, Polygon, Arbitrum, Base, atau Optimism) — alamat yang sama berlaku di semua jaringan tersebut, tetapi dana yang dikirim melalui satu jaringan hanya akan muncul di jaringan tersebut. Anda juga perlu memiliki sedikit koin asli jaringan tersebut (seperti ETH) untuk membayar biaya transaksi.',
      },
      {
        q: 'Apa yang bisa saya lakukan dengan wwwallet?',
        a: 'Kirim: transfer ETH atau token apa pun ke alamat yang Anda tempelkan, pindai dari kode QR, atau pilih dari akun Anda sendiri, lalu periksa detailnya sebelum mengonfirmasi. Tukar: tukarkan satu token dengan token lain di jaringan yang sama dari tab Tukar, dengan penawaran harga dan perkiraan biaya yang ditampilkan di awal. Terima: tampilkan alamat Anda sebagai kode QR. Anda juga dapat melihat saldo Anda dalam nilai USD serta riwayat transaksi di seluruh jaringan yang didukung.',
      },
      {
        q: 'Apa yang diketahui wwwallet tentang saya?',
        a: 'Jangan cantumkan apa pun yang dapat mengidentifikasi Anda. Tidak ada akun, login, atau basis data. Data saldo dan harga diambil melalui backend wwwallet sendiri, bukan melalui browser Anda yang menghubungi penyedia pihak ketiga secara langsung, dan backend tersebut tidak pernah melihat kunci, kata sandi, atau frasa pemulihan Anda.',
      },
    ],
  },
  footer: {
    tagline: 'Dompet Ethereum gratis dan non-custodial untuk semua orang.',
    copyright: '© {year} wwwallet',
    licenseLink: 'Dilisensikan di bawah PolyForm Strict 1.0.0',
    disclaimer:
      'Perangkat lunak non-kustodian disediakan "sebagaimana adanya", tanpa jaminan. Ini bukan nasihat keuangan. Anda sepenuhnya bertanggung jawab atas kunci dan dana Anda.',
  },
  principles: {
    eyebrow: 'Prinsip-prinsip',
    heading: 'Gratis, terbuka, dan dirancang untuk siapa saja',
    lede: 'Perangkat lunak yang menyimpan uang Anda seharusnya menjadi alat yang Anda gunakan, bukan bisnis yang dibangun di atas penggunanya. Inilah komitmen yang menjadi landasan wwwallet.',
    items: [
      {
        title: 'Gratis, tanpa syarat tersembunyi',
        body: 'Tanpa harga, tanpa tingkatan premium, tanpa fitur berbayar. wwwallet tidak menambahkan biaya apa pun — satu-satunya biaya adalah biaya transaksi jaringan itu sendiri.',
      },
      {
        title: 'Tanpa iklan, tanpa pelacakan',
        body: 'Tanpa iklan, tanpa analitik, tanpa skrip pelacakan, dan tanpa data yang dijual kepada siapa pun. Sejak awal, tidak ada profil Anda yang bisa dijual.',
      },
      {
        title: 'Tidak perlu mendaftar',
        body: 'Tanpa verifikasi email, nomor telepon, atau identitas. Buka aplikasinya, buat dompet, dan Anda siap menggunakannya.',
      },
      {
        title: 'Kunci Anda tetap berada di tangan Anda',
        body: 'Kunci dibuat dan dienkripsi di perangkat Anda dan tidak pernah meninggalkan perangkat tersebut. wwwallet tidak dapat melihatnya, memindahkan dana Anda, atau mengunci akses Anda.',
      },
      {
        title: 'Dapat digunakan di mana saja',
        body: 'Dapat dijalankan di browser modern apa pun di ponsel atau desktop, dan diinstal seperti aplikasi — tidak memerlukan akun toko aplikasi.',
      },
      {
        title: 'Dalam 31 bahasa',
        body: 'Gunakan dalam bahasa yang paling Anda kuasai, baik dalam mode terang maupun gelap.',
      },
      {
        title: 'Kode terbuka',
        body: 'Kode sumber lengkap dipublikasikan agar siapa pun dapat membacanya dan mengauditnya. Aplikasi ini bersifat "source-available" (kode sumber tersedia) bukan "open source" — FAQ menjelaskan apa yang diizinkan oleh lisensi tersebut.',
      },
      {
        title: 'Tidak ada yang perlu dinonaktifkan',
        body: 'Tidak ada akun yang dapat dibekukan. Dana Anda tersimpan di Ethereum itu sendiri, dan kunci akun apa pun dapat dipindahkan ke dompet lain kapan saja.',
      },
    ],
  },
  license: {
    title: 'Lisensi',
    close: 'Tutup',
    summaryTitle: 'Dalam bahasa Inggris yang sederhana',
    canUse:
      'Anda dapat menggunakan wwwallet secara gratis, untuk keperluan pribadi dan nonkomersial lainnya.',
    canRead: 'Anda dapat membaca dan mengaudit setiap baris kode sumbernya.',
    cannot: 'Anda tidak boleh menyalin, mengubah, mendistribusikan ulang, atau menjualnya.',
    englishNote:
      'Lisensi lengkap berikut ini disajikan dalam bahasa Inggris aslinya — ini adalah teks hukum.',
    viewSource: 'Lihat sumber di GitHub',
  },
  meta: {
    title: 'wwwallet — Dompet Ethereum gratis dan non-custodial',
    description:
      'Dompet Ethereum gratis di browser Anda. Tanpa pendaftaran, tanpa iklan, tanpa pelacakan — kunci Anda tetap terenkripsi di perangkat Anda. Ethereum, Arbitrum, Base, Optimism, dan Polygon.',
  },
}
