export default {
  nav: {
    wallet: 'Dompet',
    ethereum: 'Ethereum',
    crypto: 'Kripto',
    faqs: 'Pertanyaan yang Sering Diajukan',
    launch: 'Buka Dompet',
    home: 'Kembali ke atas',
    sectionNavLabel: 'Navigasi bagian',
    principles: 'Prinsip-prinsip',
  },
  settings: {
    open: 'Pengaturan',
    close: 'Tutup pengaturan',
    theme: 'Tema',
    themeLight: 'Cahaya',
    themeDark: 'Gelap',
    language: 'Bahasa',
    search: 'Cari',
    noMatches: 'Tidak ada hasil yang sesuai',
  },
  hero: {
    eyebrow: 'Dompet Ethereum gratis dan tanpa layanan penitipan',
    heading1: 'Kunci-kunci Anda.',
    heading2: 'Perangkat Anda.',
    heading3: 'Gratis untuk semua orang.',
    lede: 'wwwallet berjalan di peramban Anda dan menyimpan kunci Anda dalam bentuk terenkripsi di perangkat Anda sendiri. Tidak perlu membuat akun, tidak ada biaya yang harus dibayar, dan tidak ada iklan — hanya dompet yang berfungsi sama bagi semua orang.',
    ctaPrimary: 'Buka Dompet',
    ctaSecondary: 'Lihat cara kerjanya',
    note: 'Tanpa registrasi · Tanpa iklan · Tanpa pelacakan · 31 bahasa',
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
        q: 'Apakah wwwallet benar-benar gratis?',
        a: 'Ya. Penggunaannya gratis, tidak ada paket premium, dan tidak ada konten yang terkunci di balik paywall, serta wwwallet tidak mengenakan biaya tambahan apa pun untuk setiap pengiriman atau pertukaran yang Anda lakukan. Satu-satunya biaya yang tidak dapat dihindari adalah biaya transaksi (gas) jaringan itu sendiri, yang dibayarkan kepada jaringan, bukan kepada wwwallet. Penawaran pertukaran berasal dari agregator bursa 0x, yang mungkin mengenakan biaya tersendiri pada beberapa transaksi — biaya semacam itu akan ditampilkan di layar tinjauan sebelum Anda mengonfirmasi.',
      },
      {
        q: 'Apakah ada iklan, pelacak, atau alat analisis?',
        a: 'Tidak. wwwallet tidak menampilkan iklan, tidak menjalankan skrip analitik atau pelacakan, dan tidak membuat profil tentang Anda. Tidak ada akun, jadi tidak ada yang bisa dikaitkan dengannya.',
      },
      {
        q: 'Apakah saya perlu memiliki akun atau ID untuk menggunakannya?',
        a: 'Tidak. Tidak ada proses pendaftaran, alamat email, nomor telepon, atau verifikasi identitas — Anda cukup membuat dompet di perangkat Anda dan langsung menggunakannya.',
      },
      {
        q: 'Kalau gratis, bagaimana wwwallet bisa membiayai operasionalnya?',
        a: 'Layanan ini tidak memperoleh pendapatan dari penggunanya — tanpa biaya, tanpa iklan, dan tanpa penjualan data. Biaya operasional dirancang agar tetap rendah: dompet itu sendiri berjalan di peramban Anda, sedangkan sistem backend hanya meneruskan data blockchain publik dan data harga.',
      },
      {
        q: 'Apakah ada orang yang bisa membekukan dompet saya?',
        a: 'Tidak ada akun, jadi tidak ada yang bisa dibekukan oleh wwwallet — atau pihak mana pun. Kunci Anda tidak pernah meninggalkan perangkat Anda, dan transaksi ditandatangani di sana sebelum dikirim ke jaringan. Dana Anda disimpan di Ethereum, bukan di wwwallet: Anda dapat melihat kunci pribadi atau frasa pemulihan dari akun mana pun melalui menunya dan mengimpornya ke dompet Ethereum lain kapan pun Anda mau.',
      },
      {
        q: 'Apakah frasa pemulihan saya cukup untuk mendapatkan dompet saya kembali?',
        a: 'Tidak sendirian. Frasa pemulihan Anda memang dapat membuka brankas terenkripsi Anda, tetapi brankas itu sendiri hanya tersimpan di perangkat Anda. Jika Anda kehilangan atau menghapus data perangkat tersebut tanpa pernah membuat cadangan, tidak akan ada lagi yang bisa dibuka oleh frasa tersebut. Selalu padukan frasa pemulihan Anda dengan cadangan di Google Drive atau cadangan file — lihat pertanyaan berikutnya.',
      },
      {
        q: 'Bagaimana cara membuat cadangan dompet saya?',
        a: 'Dari menu Pengaturan, buat cadangan brankas terenkripsi Anda ke Google Drive milik Anda sendiri — yang disimpan dalam folder pribadi yang hanya dapat diakses oleh aplikasi ini, sehingga wwwallet tidak dapat melihat bagian lain dari folder tersebut — atau dalam bentuk berkas yang dapat Anda unduh dan simpan sendiri. Lakukan hal ini setiap kali Anda membuat dompet atau menambahkan akun baru.',
      },
      {
        q: 'Apakah saya bisa menggunakan wwwallet di lebih dari satu perangkat?',
        a: 'Ya, tapi sinkronisasinya tidak dilakukan secara otomatis — setiap perangkat memiliki brankas lokalnya sendiri. Untuk menggunakan wwwallet di perangkat baru, pulihkan data dari Drive atau cadangan file ke perangkat tersebut, lalu buka kuncinya menggunakan frasa pemulihan Anda.',
      },
      {
        q: 'Apa yang akan terjadi jika perangkat saya hilang dan saya belum pernah membuat cadangan?',
        a: 'Dana Anda tidak dapat dipulihkan. Hal ini memang dirancang demikian: wwwallet tidak memiliki sistem akun dan tidak menyimpan salinan brankas Anda di mana pun, sehingga tidak ada seorang pun — termasuk kami — yang dapat memulihkannya untuk Anda. Inilah konsekuensi dari dompet yang hanya dapat diakses oleh Anda sendiri.',
      },
      {
        q: 'Apakah kode sandi (Face ID / Touch ID) dapat dipindahkan ke perangkat baru?',
        a: 'Tidak. Kode sandi terikat pada perangkat tempat kode tersebut dibuat. Setelah memulihkan cadangan ke perangkat baru, buka kunci perangkat menggunakan frasa pemulihan Anda, lalu Anda dapat membuat kode sandi baru di perangkat tersebut.',
      },
      {
        q: 'Apakah wwwallet bersifat open source?',
        a: 'Tidak — kode sumbernya tersedia. Kode sumber lengkapnya dipublikasikan di GitHub sehingga siapa pun dapat membacanya, meninjaunya, dan mengauditnya, tetapi ini bukan perangkat lunak sumber terbuka: kode tersebut dilisensikan di bawah Lisensi PolyForm Strict 1.0.0.',
      },
      {
        q: 'Apa saja yang boleh saya lakukan dengan kode tersebut?',
        a: 'Anda dapat membaca dan meninjau seluruh isinya, serta menjalankan salinan yang tidak dimodifikasi untuk tujuan nonkomersial seperti belajar pribadi, penelitian, dan pengujian. Anda tidak boleh mendistribusikannya, memodifikasinya, atau membuat karya turunan (termasuk fork), maupun menggunakannya secara komersial. Jika Anda memerlukan hal yang tidak diizinkan oleh lisensi ini, hubungi pemegang hak cipta untuk mendapatkan lisensi terpisah.',
      },
      {
        q: 'Apakah wwwallet aman digunakan? Apakah ada garansi?',
        a: 'wwwallet adalah perangkat lunak non-kustodian yang disediakan “apa adanya”, tanpa jaminan apa pun. Anda sendirilah yang mengendalikan kunci dan dana Anda — tidak ada seorang pun, termasuk kami, yang dapat memulihkan frasa pemulihan atau cadangan yang hilang, membatalkan transaksi, atau mengganti kerugian Anda. Gunakanlah hanya dana yang Anda sanggup untuk kehilangan, periksa kembali alamat dan jaringan sebelum mengirim, dan tidak ada satu pun informasi di sini yang merupakan nasihat keuangan, investasi, hukum, atau perpajakan.',
      },
      {
        q: 'Jaringan apa saja yang didukung oleh wwwallet?',
        a: 'Jaringan utama Ethereum, ditambah jaringan Layer-2 seperti Polygon, Arbitrum, Base, dan Optimism — semuanya berasal dari kumpulan akun yang sama.',
      },
      {
        q: 'Bagaimana cara mengisi saldo dompet saya?',
        a: 'Buka akun, pilih “Lihat kode QR” untuk melihat alamatnya, lalu kirim dana ke alamat tersebut dari bursa atau dompet lain. Pastikan Anda mengirim dana melalui jaringan yang benar (Ethereum, Polygon, Arbitrum, Base, atau Optimism) — alamat yang sama berlaku di semua jaringan tersebut, tetapi dana yang dikirim melalui satu jaringan hanya akan muncul di jaringan tersebut. Anda juga perlu memiliki sedikit koin asli jaringan tersebut (seperti ETH) untuk membayar biaya transaksi.',
      },
      {
        q: 'Apa saja yang bisa saya lakukan dengan wwwallet?',
        a: 'Kirim: transfer ETH atau token apa pun ke alamat yang Anda tempelkan, pindai dari kode QR, atau pilih dari akun Anda sendiri, lalu periksa detailnya sebelum mengonfirmasi. Tukar: tukar satu token dengan token lain di jaringan yang sama melalui tab Tukar, dengan penawaran harga dan perkiraan biaya yang ditampilkan di awal. Terima: tampilkan alamat Anda dalam bentuk kode QR. Anda juga dapat melihat saldo Anda dalam nilai USD serta riwayat transaksi di seluruh jaringan yang didukung.',
      },
      {
        q: 'Apa saja yang diketahui wwwallet tentang saya?',
        a: 'Tidak ada yang dapat mengidentifikasi Anda. Tidak ada akun, proses login, maupun basis data. Data saldo dan harga diambil melalui sistem backend milik wwwallet sendiri, bukan melalui browser Anda yang menghubungi penyedia pihak ketiga secara langsung, dan sistem backend tersebut tidak pernah melihat kunci, kata sandi, atau frasa pemulihan Anda.',
      },
    ],
  },
  footer: {
    tagline: 'Dompet Ethereum gratis dan tanpa layanan penyimpanan untuk semua orang.',
    copyright: '© {year} wwwallet',
    licenseLink: 'Dilisensikan di bawah PolyForm Strict 1.0.0',
    disclaimer:
      'Perangkat lunak non-penyimpanan disediakan “apa adanya”, tanpa jaminan apa pun. Ini bukan nasihat keuangan. Anda sepenuhnya bertanggung jawab atas kunci dan dana Anda.',
  },
  principles: {
    eyebrow: 'Prinsip-prinsip',
    heading: 'Gratis, terbuka, dan dirancang untuk siapa saja',
    lede: 'Dompet seharusnya menjadi alat yang Anda gunakan, bukan bisnis yang dibangun dengan mengeksploitasi penggunanya. Inilah komitmen-komitmen yang menjadi landasan wwwallet.',
    items: [
      {
        title: 'Gratis, tanpa syarat apa pun',
        body: 'Tanpa harga, tanpa paket premium, tanpa fitur berbayar. wwwallet tidak mengenakan biaya apa pun — satu-satunya biaya adalah biaya transaksi dari jaringan itu sendiri.',
      },
      {
        title: 'Tanpa iklan, tanpa pelacakan',
        body: 'Tanpa iklan, tanpa analitik, tanpa skrip pelacakan, dan data tidak dijual kepada siapa pun. Lagipula, tidak ada profil Anda yang bisa dijual.',
      },
      {
        title: 'Tidak perlu mendaftar',
        body: 'Tidak perlu verifikasi email, nomor telepon, atau identitas. Buka aplikasinya, buat dompet digital, dan Anda sudah siap.',
      },
      {
        title: 'Kunci Anda tetap ada pada Anda',
        body: 'Kunci dibuat dan dienkripsi di perangkat Anda serta tidak pernah meninggalkan perangkat tersebut. wwwallet tidak dapat melihat kunci tersebut, memindahkan dana Anda, atau memblokir akses Anda.',
      },
      {
        title: 'Dapat digunakan di mana saja',
        body: 'Dapat dijalankan di browser modern apa pun, baik di ponsel maupun desktop, dan diinstal layaknya sebuah aplikasi — tanpa perlu akun di toko aplikasi.',
      },
      {
        title: 'Dalam 31 bahasa',
        body: 'Gunakanlah dalam bahasa yang paling Anda kuasai, baik dalam mode terang maupun gelap.',
      },
      {
        title: 'Kode yang terbuka untuk umum',
        body: 'Kode sumber lengkapnya telah dipublikasikan agar dapat dibaca dan diaudit oleh siapa saja. Kode sumber ini bersifat “source-available” — bukan “open source” — dan bagian FAQ menjelaskan apa saja yang diizinkan oleh lisensi tersebut.',
      },
      {
        title: 'Tidak ada yang perlu dimatikan',
        body: 'Tidak ada akun yang bisa dibekukan. Dana Anda disimpan langsung di jaringan Ethereum, dan kunci akun mana pun dapat dipindahkan ke dompet lain kapan saja.',
      },
    ],
  },
  license: {
    title: 'Lisensi',
    close: 'Tutup',
    summaryTitle: 'Dalam bahasa yang mudah dimengerti',
    canUse:
      'Anda dapat menggunakan wwwallet secara gratis, untuk keperluan pribadi maupun keperluan nonkomersial lainnya.',
    canRead: 'Anda dapat membaca dan memeriksa setiap baris kode sumbernya.',
    cannot: 'Anda tidak boleh menyalin, mengubah, mendistribusikan kembali, atau menjualnya.',
    englishNote:
      'Berikut ini adalah teks lisensi lengkap dalam bahasa Inggris aslinya — ini adalah teks hukumnya.',
    viewSource: 'Lihat di GitHub',
  },
}
