export default {
  nav: {
    wallet: 'wwwallet',
    ethereum: 'Ethereum',
    crypto: 'Kripto',
    faqs: 'Sıkça Sorulan Sorular',
    launch: "wwwallet'i piyasaya sürün",
    home: 'Başa dön',
    sectionNavLabel: 'Bölüm gezinme',
    principles: 'İlkeler',
  },
  settings: {
    open: 'Ayarlar',
    close: 'Ayarları kapat',
    theme: 'Tema',
    themeLight: 'Hafif',
    themeDark: 'Koyu',
    language: 'Dil',
    search: 'Arama',
    noMatches: 'Eşleşme yok',
    version: 'Sürüm {version}',
  },
  hero: {
    eyebrow: 'Ücretsiz, emanetsiz bir Ethereum cüzdanı',
    heading1: 'Anahtarlarınız.',
    heading2: 'Cihazınız.',
    heading3: 'Herkes için ücretsizdir.',
    lede: 'wwwallet tarayıcınızda çalışır ve anahtarlarınızı kendi cihazınızda şifreli olarak saklar. Oluşturulacak bir hesap, ödenecek bir ücret veya reklam yoktur ve herkes için aynı şekilde çalışır.',
    ctaPrimary: "wwwallet'i piyasaya sürün",
    ctaSecondary: 'Nasıl çalıştığını görün',
    note: 'Kayıt yok · Reklam yok · İzleme yok · 31 dil',
  },
  wallet: {
    eyebrow: 'wwwallet',
    heading: 'Sadece sizin açabileceğiniz şekilde tasarlanmıştır',
    lede: 'wwwallet, varlıklarınızı saklamaz — bunları kendiniz saklamanıza yardımcı olur. Bunun pratikte ne anlama geldiği aşağıda açıklanmıştır.',
    points: [
      {
        title: 'Her zaman "saklama hizmeti sunmayan" ifadesini kullanın.',
        body: "Özel anahtarlarınız kendi cihazınızda oluşturulur ve şifrelenir. wwwallet'in sunucuları bu anahtarları asla görmez — ihlal edilebilecek bir anahtar veritabanı yoktur, çünkü ortada bir veritabanı bile yoktur.",
      },
      {
        title: 'AES-256 ile şifrelenmiş, istediğiniz şekilde kilidini açın',
        body: 'Kasanız AES-256-GCM şifreleme ile korunmaktadır. Kurtarma ifadenizle kilidini açın veya hızlı, yalnızca yerel erişim için bir geçiş anahtarı (Face ID, Touch ID veya Windows Hello) etkinleştirin.',
      },
      {
        title: 'Otomatik olarak kilitlenir',
        body: 'wwwallet, kısa bir süre kullanılmadığında kilitlenir ve kilidi açılmış oturumunuzu asla diske kaydetmez — sekmeyi kapattığınızda, kasıtlı olarak bu bilgiyi unutur.',
      },
      {
        title: 'On beş Ethereum ağı, tek bir hesap grubu',
        body: 'Aynı hesaplar ve adreslerle Ethereum ana ağı ve Arbitrum, Base, Optimism, Polygon, Linea ve ZKsync dahil olmak üzere 14 ağda daha kripto varlıklarınızı saklayın ve gönderin.',
      },
    ],
    caveatTitle: 'Kurtarma ifadeniz, kasanızın kilidini açar — bu sihirli bir yedekleme değildir.',
    caveatBody:
      'Kurtarma ifadenizi güvenli bir yere kaydedin, ancak aynı zamanda Google Drive’a veya bir dosyaya da yedekleyin. Cüzdanınızı yeni bir cihazda geri yüklemek için yedeğe, geri yükledikten sonra kilidini açmak için de ifadeye ihtiyacınız olacak.',
    caveatLink: 'Daha fazla bilgi için SSS bölümüne bakın',
  },
  ethereum: {
    eyebrow: 'Ethereum',
    heading: 'Neden Ethereum?',
    lede: 'wwwallet, özellikle Ethereum üzerine geliştirilmiştir. İşte bunun gerekçeleri, basit bir dille.',
    points: [
      {
        title: 'Sadece bir defter değil, bir dünya bilgisayarı',
        body: 'Ethereum, Bitcoin’in paylaşımlı ve tahrif edilemez bir defter fikrini benimsedi ve bunu daha da genişletti: Herkesin üzerine inşa edebileceği ve hiçbir tarafın kapatamayacağı küresel, programlanabilir bir bilgisayar.',
      },
      {
        title: 'Madencilikle değil, staking ile güvence altına alınmıştır',
        body: "2022'deki “The Merge” olayından bu yana, Ethereum enerji yoğun madencilik yerine Proof-of-Stake ile güvence altına alınmıştır — doğrulayıcılar, bloklar için rekabet etmek amacıyla elektrik harcamak yerine ETH'lerini teminat olarak riske atmaktadır.",
      },
      {
        title: 'Açık ve izinsiz',
        body: 'Hesabınızı kimse onaylamaz. Herkes, her yerden ETH tutabilir veya Ethereum üzerinde bir uygulama geliştirebilir — en büyük kurumlar da dahil olmak üzere herkes için aynı kurallar geçerlidir.',
      },
      {
        title: 'Diğer ağların dayandığı standart',
        body: 'Arbitrum, Base ve Optimism gibi Katman-2 ağları — hepsi wwwallet tarafından desteklenmektedir — sıfırdan başlamak yerine Ethereum’un güvenliğini daha hızlı ve daha ucuz işlemlere genişletir.',
      },
    ],
    linkLabel: "Daha fazla bilgi için Ethereum Vakfı'nı ziyaret edin",
    linkUrl: 'https://ethereum.org/en/foundation/',
  },
  crypto: {
    eyebrow: 'Kripto',
    heading: 'Kripto, basit bir dille',
    lede: 'Kripto paraya sahip olmadan önce anlamanız gereken birkaç kavram var — bu sadece wwwallet ile sınırlı değil.',
    points: [
      {
        title: 'Saklama hizmeti sunan ve sunmayan cüzdanlar',
        body: 'Saklama hizmetine dayalı bir cüzdan veya borsa, anahtarlarınızı sizin adınıza saklar — bu kullanışlıdır, ancak fonlarınızın dondurulmayacağına, kaybolmayacağına veya kötüye kullanılmayacağına dair başkasına güvenmiş olursunuz. wwwallet gibi saklama hizmetine dayalı olmayan bir cüzdan ise anahtarları ve sorumluluğu tamamen sizin elinizde bırakır.',
      },
      {
        title: 'Staking ve madencilik karşılaştırması',
        body: 'İş İspatı (Proof-of-Work) madenciliği, blok zincirini ham hesaplama gücü ve elektrikle güvence altına alır. Hisse İspatı (Proof-of-Stake) ise bunu risk altındaki sermaye ile güvence altına alır. Ethereum’un hisse madenciliğine geçişi, enerji kullanımını %99,9’dan fazla azalttı — bu, küçük bir ülkeyi ve küçük bir kasabayı beslemek arasındaki farka yaklaşık olarak denk geliyor.',
      },
      {
        title: "Ethereum'un ötesinde",
        body: 'Bitcoin, programlanabilirlikten ziyade basitliği ve öngörülebilirliği ön planda tutar. Solana gibi zincirler ham işlem hacmini artırmaya odaklanır ve bunu başarmak için genellikle merkeziyetsizliği feda eder. Ethereum ise öncelikle merkeziyetsizliğe ve güvenliğe öncelik verir; hız ve maliyet konularını ise üzerine inşa edilen Katman-2 ağlarına bırakır.',
      },
      {
        title: 'Hiçbir meşru kişi sizden bu cümleyi istemez',
        body: "Hangi uygulamayı kullanırsanız kullanın, hiçbir borsa, destek temsilcisi veya wwwallet'ten kimse sizden kurtarma ifadenizi istemeyecektir. Bunu isteyen herkes sizi soymaya çalışıyordur.",
      },
    ],
    linkLabel: "Bankless podcast'iyle konuyu daha derinlemesine inceleyin",
    linkUrl: 'https://www.bankless.com/',
  },
  faqs: {
    eyebrow: 'Sıkça Sorulan Sorular',
    heading: 'Sık sorulan sorular',
    items: [
      {
        q: 'wwwallet gerçekten ücretsiz mi?',
        a: 'Evet. Kullanımı ücretsizdir, premium seviye yoktur ve ödeme duvarının arkasında hiçbir şey yoktur; ayrıca wwwallet, gönderdiğiniz veya takas ettiğiniz hiçbir şeye ek ücret eklemez. Kaçınılmaz tek maliyet, ağın kendi işlem (gaz) ücretidir ve bu ücret wwwallet’e değil, ağa ödenir. Takas teklifleri, 0x borsa toplayıcısından (veya 0x’in kapsamadığı ağlarda LI.FI’den) gelir; bu toplayıcı bazı işlemlerde kendi ücretini ekleyebilir — bu tür ücretler, onaylamadan önce inceleme ekranında listelenir.',
      },
      {
        q: 'Reklam, izleme araçları veya analiz araçları var mı?',
        a: 'Hayır. wwwallet reklam göstermez, analiz veya izleme komut dosyaları çalıştırmaz ve sizinle ilgili bir profil oluşturmaz. Hesap olmadığı için, bir hesaba bağlanacak bir şey de yoktur.',
      },
      {
        q: 'Kullanmak için bir hesap veya kimlik gerekli mi?',
        a: 'Hayır. Kayıt, e-posta adresi, telefon numarası veya kimlik doğrulaması gerekmez — cihazınızda bir cüzdan oluşturup kullanmaya başlarsınız.',
      },
      {
        q: 'Eğer ücretsizse, wwwallet kendini nasıl finanse ediyor?',
        a: 'Kullanıcılarından para kazanmaz — ücret yok, reklam yok, veri satışı yok. İşletme maliyetleri tasarım gereği düşük tutulur: uygulamanın kendisi tarayıcınızda çalışır ve arka uç yalnızca halka açık blok zinciri ve fiyat verilerini iletir.',
      },
      {
        q: 'Herkes cüzdanımı dondurabilir mi?',
        a: "Hesap olmadığı için wwwallet'in — ya da başka birinin — dondurması gereken hiçbir şey yoktur. Anahtarlarınız cihazınızdan asla çıkmaz ve işlemler ağa gönderilmeden önce cihazınızda imzalanır. Paralarınız wwwallet'te değil, Ethereum'da bulunur: herhangi bir hesabın özel anahtarını veya kurtarma ifadesini menüsünden görüntüleyebilir ve istediğiniz zaman başka herhangi bir Ethereum cüzdan uygulamasına aktarabilirsiniz.",
      },
      {
        q: 'Cüzdanımı geri almak için kurtarma ifadem yeterli mi?',
        a: 'Tek başına yeterli değildir. Kurtarma ifadeniz şifrelenmiş kasanızın kilidini açar, ancak kasanın kendisi yalnızca cihazınızda bulunur. Yedekleme yapmadan o cihazı kaybederseniz veya silerseniz, ifadenin kilidini açabileceği hiçbir şey kalmaz. Kurtarma ifadenizi her zaman bir Google Drive veya dosya yedeğiyle birlikte kullanın — bir sonraki soruya bakın.',
      },
      {
        q: 'Cüzdanımı nasıl yedeklerim?',
        a: "Ayarlar'dan şifrelenmiş kasanızı kendi Google Drive'ınıza yedekleyin veya indirip kendiniz saklayacağınız bir dosya olarak kaydedin. Drive yedeklemesi, özel bir uygulama klasörüne kaydedilir ve wwwallet, Drive'ınızdaki diğer hiçbir şeye erişemez. İlk kurulumda yedekleme yapın ve hesap eklediğinizde her seferinde tekrar yedekleme yapın.",
      },
      {
        q: "wwwallet'i birden fazla cihazda kullanabilir miyim?",
        a: "Evet, ancak otomatik olarak senkronize olmaz — her cihaz kendi yerel kasasını barındırır. wwwallet'i yeni bir cihazda kullanmak için, Drive veya dosya yedeklemesinden o cihaza geri yükleyin, ardından kurtarma ifadenizle kilidi açın.",
      },
      {
        q: 'Cihazımı kaybedersem ve hiç yedekleme yapmamışsam ne olur?',
        a: "Paralarınızı geri alamazsınız. Bu, tasarım gereğidir: wwwallet'in hesap sistemi yoktur ve kasanızın hiçbir yerinde bir kopyasını tutmaz; bu nedenle, biz dahil kimse sizin için geri yükleme yapamaz. Bu, sizden başka kimsenin erişemeyeceği anahtarların getirdiği bir ödünleşmedir.",
      },
      {
        q: 'Geçiş anahtarları (Face ID / Touch ID) yeni bir cihaza aktarılabilir mi?',
        a: 'Hayır. Şifre anahtarı, oluşturulduğu cihaza bağlıdır. Yeni bir cihazda yedeği geri yükledikten sonra, kurtarma ifadesiyle kilidi açın ve orada yeni bir şifre anahtarı ayarlayabilirsiniz.',
      },
      {
        q: 'wwwallet açık kaynak mıdır?',
        a: 'Hayır — kaynak kodu erişilebilir. Tam kaynak kodu GitHub’da herkese açık olduğundan herkes onu okuyabilir, inceleyebilir ve denetleyebilir, ancak açık kaynak değildir: kod, PolyForm Strict License 1.0.0 lisansı altında lisanslanmıştır.',
      },
      {
        q: 'Kodla ne yapmama izin veriliyor?',
        a: 'Tüm içeriği okuyabilir ve denetleyebilir, ayrıca kişisel çalışma, araştırma ve test gibi ticari olmayan amaçlarla değiştirilmemiş bir kopyasını çalıştırabilirsiniz. Bunu dağıtamaz, değiştiremez veya türev çalışmalar (forklar dahil) oluşturamaz ya da ticari olarak kullanamazsınız. Lisansın izin vermediği bir şeye ihtiyacınız varsa, ayrı bir lisans için telif hakkı sahibiyle iletişime geçin.',
      },
      {
        q: "wwwallet'i kullanmak güvenli mi? Herhangi bir garanti var mı?",
        a: 'wwwallet, herhangi bir garanti olmaksızın "olduğu gibi" sunulan, emanetçi olmayan bir yazılımdır. Anahtarlarınızı ve varlıklarınızı yalnızca siz kontrol edersiniz — biz dahil hiç kimse, kaybolan bir kurtarma ifadesini veya yedeği geri getiremez, bir işlemi geri alamaz veya kayıplarınız için size tazminat ödeyemez. Yalnızca kaybetmeyi göze alabileceğiniz varlıklarınızı kullanın, göndermeden önce adresleri ve ağları iki kez kontrol edin; buradaki hiçbir bilgi finansal, yatırım, hukuki veya vergi tavsiyesi niteliğinde değildir.',
      },
      {
        q: 'wwwallet hangi ağları destekliyor?',
        a: 'Ethereum ana ağı, ayrıca Arbitrum, Base, Optimism, Polygon, Robinhood Chain, World Chain, Ink, Linea, Gnosis, Celo, ZKsync Era, Ronin, Unichain ve Scroll — hepsi aynı hesap grubundan.',
      },
      {
        q: 'Cüzdanıma nasıl para yatırabilirim?',
        a: 'Bir hesap açın, adresini görmek için “QR kodunu görüntüle” seçeneğini seçin ve bir borsadan veya başka bir cüzdandan bu adrese para gönderin. Doğru ağda (Ethereum, Base veya Arbitrum gibi) gönderdiğinizden emin olun — aynı adres desteklenen her ağda çalışır, ancak bir ağda gönderilen paralar yalnızca o ağda görünür. Ayrıca, işlem ücretlerini ödemek için ağın kendi kripto parası (ETH gibi) da biraz gerekecektir.',
      },
      {
        q: 'wwwallet ile neler yapabilirim?',
        a: 'Gönder: ETH veya herhangi bir token\'ı, yapıştırdığınız, QR kodundan taradığınız veya kendi hesaplarınızdan seçtiğiniz bir adrese aktarın ve onaylamadan önce ayrıntıları gözden geçirin. Takas: "Takas" sekmesinden, aynı ağdaki bir token\'ı başka bir token ile takas edin; fiyat teklifi ve ücret tahmini önceden gösterilir. Al: adresinizi QR kodu olarak gösterin. Ayrıca, desteklenen tüm ağlardaki bakiyelerinizi USD değerleriyle ve işlem geçmişinizi de görebilirsiniz.',
      },
      {
        q: 'wwwallet benim hakkımda ne biliyor?',
        a: 'Sizi tanımlayacak hiçbir şey olmamalıdır. Hesap, oturum açma veya veritabanı yoktur. Bakiye ve fiyat verileri, tarayıcınızın üçüncü taraf sağlayıcılara doğrudan bağlanması yerine wwwallet’in kendi arka ucundan alınır ve bu arka uç, anahtarlarınızı, şifrelerinizi veya kurtarma ifadesinizi asla görmez.',
      },
    ],
  },
  footer: {
    tagline: 'Herkes için ücretsiz, emanetsiz bir Ethereum cüzdanı.',
    copyright: '© {year} wwwallet',
    licenseLink: 'PolyForm Strict 1.0.0 lisansı altında yayınlanmıştır.',
    disclaimer:
      'Saklama hizmeti sunmayan yazılım, garanti olmaksızın “olduğu gibi” sağlanır. Bu, finansal tavsiye niteliğinde değildir. Anahtarlarınız ve varlıklarınızın sorumluluğu tamamen size aittir.',
  },
  license: {
    title: 'Lisans',
    close: 'Kapat',
    summaryTitle: 'Basit ve anlaşılır bir dille',
    canUse:
      "wwwallet'i kişisel ve diğer ticari olmayan amaçlarla ücretsiz olarak kullanabilirsiniz.",
    canRead: 'Kaynak kodunun her satırını okuyabilir ve denetleyebilirsiniz.',
    cannot: 'Bu içeriği kopyalayamaz, değiştiremez, yeniden dağıtamaz veya satamazsınız.',
    englishNote:
      'Aşağıda, orijinal İngilizce metniyle birlikte lisans metninin tamamı yer almaktadır — bu, yasal metindir.',
    viewSource: "GitHub'da kaynağı görüntüle",
  },
  principles: {
    eyebrow: 'İlkeler',
    heading: 'Ücretsiz, açık ve herkes için tasarlanmış',
    lede: 'Paranızı saklayan yazılım, kullanıcıları üzerine kurulu bir iş modeli değil, sizin kullandığınız bir araç olmalıdır. wwwallet, bu ilkeler üzerine kurulmuştur.',
    items: [
      {
        title: 'Ücretsiz, hiçbir şart yok',
        body: 'Fiyat, premium seviye veya ücretli özelliklerden bahsetmeyin. wwwallet kendi başına herhangi bir ücret eklemez — tek maliyet, ağın kendi işlem ücretidir.',
      },
      {
        title: 'Reklam yok, izleme yok',
        body: 'Reklam yok, analiz yok, izleme komut dosyaları yok ve kimseye veri satışı yok. Öncelikle satılacak bir profiliniz bile yok.',
      },
      {
        title: 'Kayıt gerekmez',
        body: 'E-posta, telefon numarası veya kimlik doğrulaması gerekmez. Uygulamayı açın, bir cüzdan oluşturun ve hazırsınız.',
      },
      {
        title: 'Anahtarlarınız sizde kalır',
        body: 'Anahtarlar cihazınızda oluşturulur ve şifrelenir; cihazınızdan asla dışarı çıkmaz. wwwallet bu anahtarları göremez, varlıklarınızı hareket ettiremez veya hesabınıza erişiminizi engelleyemez.',
      },
      {
        title: 'Her yerde çalışır',
        body: 'Telefon veya masaüstü bilgisayarındaki herhangi bir modern tarayıcıda çalışır ve bir uygulama gibi yüklenir — uygulama mağazası hesabı gerekmez.',
      },
      {
        title: '31 dilde',
        body: 'En rahat hissettiğiniz dilde, açık veya karanlık modda kullanın.',
      },
      {
        title: 'Açık kaynak kod',
        body: 'Kaynak kodun tamamı, herkesin okuyup denetleyebilmesi için yayınlanmıştır. Bu, açık kaynak değil, kaynak kodu erişilebilir bir projedir — SSS bölümünde lisansın nelere izin verdiği açıklanmaktadır.',
      },
      {
        title: 'Değiştirilecek hiçbir şey yok',
        body: 'Dondurulacak bir hesap yoktur. Paranız Ethereum ağında bulunur ve herhangi bir hesabın anahtarı istediğiniz zaman başka bir cüzdana aktarılabilir.',
      },
    ],
  },
  meta: {
    title: 'wwwallet — Ücretsiz, emanetsiz Ethereum cüzdanı',
    description:
      'Tarayıcınızda ücretsiz Ethereum cüzdanı. Kayıt yok, reklam yok, izleme yok — anahtarlarınız cihazınızda şifreli olarak kalır. Ethereum, Base, Arbitrum, Optimism, Polygon ve 10 ağ daha.',
  },
}
