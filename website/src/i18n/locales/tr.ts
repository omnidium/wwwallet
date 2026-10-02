export default {
  nav: {
    wallet: 'Cüzdan',
    ethereum: 'Ethereum',
    crypto: 'Kripto',
    faqs: 'Sık Sorulan Sorular',
    launch: 'Cüzdanı Aç',
    home: 'Başa dön',
    sectionNavLabel: 'Bölüm gezintisi',
    principles: 'İlkeler',
  },
  settings: {
    open: 'Ayarlar',
    close: 'Ayarları kapat',
    theme: 'Tema',
    themeLight: 'Işık',
    themeDark: 'Karanlık',
    language: 'Dil',
    search: 'Arama',
    noMatches: 'Eşleşme bulunamadı',
  },
  hero: {
    eyebrow: 'Ücretsiz, merkezi olmayan bir Ethereum cüzdanı',
    heading1: 'Anahtarlarınız.',
    heading2: 'Cihazınız.',
    heading3: 'Herkes için ücretsiz.',
    lede: 'wwwallet, tarayıcınızda çalışır ve anahtarlarınızı kendi cihazınızda şifreli olarak saklar. Oluşturulacak bir hesap yok, ödenecek bir ücret yok ve reklam yok — sadece herkes için aynı şekilde çalışan bir cüzdan.',
    ctaPrimary: 'Cüzdanı Aç',
    ctaSecondary: 'Nasıl çalıştığını görün',
    note: 'Kayıt gerekmez · Reklam yok · İzleme yok · 31 dil',
  },
  wallet: {
    eyebrow: 'Cüzdan',
    heading: 'Sadece sizin açabilmeniz için tasarlanmıştır',
    lede: 'wwwallet, paranızın saklayıcısı değildir — parayı kendiniz saklamanıza yardımcı olur. Bunun pratikte ne anlama geldiğini aşağıda açıklıyoruz.',
    points: [
      {
        title: 'Saklama hizmeti içermeyen, her zaman',
        body: 'Özel anahtarlarınız kendi cihazınızda oluşturulur ve şifrelenir. wwwallet’in sunucuları bu anahtarları asla görmez — ihlal edilebilecek bir cüzdan veritabanı yoktur, çünkü ortada bir veritabanı bile yoktur.',
      },
      {
        title: 'AES-256 ile şifrelenmiş, istediğiniz şekilde kilidi açılabilir',
        body: 'Kasanız AES-256-GCM şifrelemeyle korunmaktadır. Kasayı kurtarma ifadesiyle açabilir veya hızlı, yalnızca yerel erişim için bir erişim anahtarı (Face ID, Touch ID veya Windows Hello) etkinleştirebilirsiniz.',
      },
      {
        title: 'Otomatik olarak kilitlenir',
        body: 'wwwallet, kısa bir süre kullanılmadığında kilitlenir ve kilidi açılmış oturumunuzu asla diske kaydetmez — sekmeyi kapattığınızda, kasıtlı olarak bu bilgiyi unutur.',
      },
      {
        title: 'Tek cüzdan, beş Ethereum ağı',
        body: 'Aynı hesap grubundan Ethereum ana ağı, Polygon, Arbitrum, Base ve Optimism üzerinden varlıklarınızı tutun ve gönderin.',
      },
    ],
    caveatTitle: 'Geri alma ifadeniz, kasanızı açar — bu sihirli bir yedekleme değildir',
    caveatBody:
      'Geri yükleme ifadesini güvenli bir yere kaydedin, ancak aynı zamanda Google Drive’a veya bir dosyaya da yedekleyin. Cüzdanınızı yeni bir cihaza geri yüklemek için yedeğe, geri yükledikten sonra ise kilidini açmak için ifadeye ihtiyacınız olacak.',
    caveatLink: 'Sıkça Sorulan Sorular bölümünde daha fazla bilgi edinin',
  },
  ethereum: {
    eyebrow: 'Ethereum',
    heading: 'Neden Ethereum?',
    lede: 'wwwallet, özellikle Ethereum üzerine kurulmuştur. İşte bunun gerekçeleri, basit bir dille.',
    points: [
      {
        title: 'Sadece bir defter değil, bir dünya bilgisayarı',
        body: 'Ethereum, Bitcoin’in paylaşımlı ve tahrif edilemez bir defter fikrini benimsedi ve bunu daha da genişletti: Herkesin üzerine geliştirme yapabileceği ve hiçbir tarafın kapatamayacağı küresel, programlanabilir bir bilgisayar.',
      },
      {
        title: 'Madencilikle değil, staking ile güvence altına alınmıştır',
        body: '2022’deki “The Merge” olayından bu yana, Ethereum enerji tüketimi yüksek madencilik yerine Proof-of-Stake ile güvence altına alınmıştır — doğrulayıcılar, bloklar için rekabet etmek amacıyla elektrik harcamak yerine ETH’lerini teminat olarak riske atmaktadır.',
      },
      {
        title: 'Açık ve izne gerek duymayan',
        body: 'Hesabınızı onaylayan kimse yoktur. Herkes, her yerden ETH tutabilir veya Ethereum üzerinde bir uygulama geliştirebilir — en büyük kurumlar da dahil olmak üzere herkes için aynı kurallar geçerlidir.',
      },
      {
        title: 'Diğer ağların dayandığı standart',
        body: 'Arbitrum, Base ve Optimism gibi Katman-2 ağları — bunların tümü wwwallet tarafından desteklenmektedir — sıfırdan başlamak yerine Ethereum’un güvenliğini daha hızlı ve daha ucuz işlemlere genişletir.',
      },
    ],
    linkLabel: "Ethereum Vakfı'nda daha fazlasını okuyun",
    linkUrl: 'https://ethereum.org/en/foundation/',
  },
  crypto: {
    eyebrow: 'Kripto',
    heading: 'Kripto, basit bir dille',
    lede: 'Kripto parayı kendiniz elinizde bulundurmaya başlamadan önce anlamanızda fayda olan birkaç kavram — sadece wwwallet ile sınırlı değil.',
    points: [
      {
        title: 'Vasiyetli ve vasiyetsiz',
        body: 'Bir emanet cüzdanı veya borsa, anahtarlarınızı sizin adınıza saklar — bu kullanışlıdır, ancak fonlarınızın dondurulmayacağına, kaybolmayacağına veya kötüye kullanılmayacağına dair başkasına güvenmiş olursunuz. wwwallet gibi bir emanetsiz cüzdan ise anahtarları ve sorumluluğu tamamen sizin elinize verir.',
      },
      {
        title: 'Staking ve madencilik karşılaştırması',
        body: 'İş Kanıtı (Proof-of-Work) madenciliği, blok zincirini ham hesaplama gücü ve elektrikle güvence altına alır. Hisse Kanıtı (Proof-of-Stake) ise bunu risk altındaki sermayeyle güvence altına alır. Ethereum’un hisse madenciliğine geçişi, enerji tüketimini %99,9’dan fazla azalttı — bu, küçük bir ülke ile küçük bir kasabayı elektrikle beslemek arasındaki farka yaklaşık olarak denk geliyor.',
      },
      {
        title: "Ethereum'un Ötesinde",
        body: 'Bitcoin, programlanabilirlikten ziyade basitliği ve öngörülebilirliği ön planda tutar. Solana gibi blok zincirleri ham işlem hacmini artırmaya odaklanır ve bunu başarmak için genellikle merkeziyetsizliği feda eder. Ethereum ise öncelikle merkeziyetsizliğe ve güvenliğe ağırlık verir; hız ve maliyet konularını ise üzerine kurulan Katman-2 ağlarına bırakır.',
      },
      {
        title: 'Hiçbir meşru kişi şifrenizi sormaz',
        body: 'Hangi cüzdanı kullanırsanız kullanın: ne bir borsa, ne bir destek temsilcisi, ne de wwwallet çalışanı sizden asla kurtarma ifadesini istemeyecektir. Bunu isteyen herkes sizi dolandırmaya çalışıyordur.',
      },
    ],
    linkLabel: 'Bankless podcast’iyle konuyu daha derinlemesine inceleyin',
    linkUrl: 'https://www.bankless.com/',
  },
  faqs: {
    eyebrow: 'Sık Sorulan Sorular',
    heading: 'Sık sorulan sorular',
    items: [
      {
        q: 'wwwallet gerçekten ücretsiz mi?',
        a: 'Evet. Kullanımı ücretsizdir, premium üyelik yoktur ve ödeme duvarının arkasında hiçbir içerik bulunmaz; ayrıca wwwallet, gönderdiğiniz veya takas ettiğiniz hiçbir işlem için ek ücret almaz. Kaçınılmaz tek maliyet, ağın kendi işlem (gaz) ücretidir ve bu ücret wwwallet’e değil, ağa ödenir. Takas teklifleri, 0x borsa toplayıcısından gelir; bu toplayıcı, bazı işlemlerde kendi ücretini ekleyebilir — bu tür ücretler, onay vermeden önce inceleme ekranında listelenir.',
      },
      {
        q: 'Reklamlar, izleme araçları veya analiz araçları var mı?',
        a: 'Hayır. wwwallet’te reklam gösterilmez, analiz veya izleme komut dosyaları çalıştırılmaz ve sizinle ilgili bir profil oluşturulmaz. Hesap olmadığı için, bir hesaba bağlanacak bir şey de yoktur.',
      },
      {
        q: 'Bunu kullanmak için bir hesap veya kimlik gerekli mi?',
        a: 'Hayır. Kayıt, e-posta adresi, telefon numarası veya kimlik doğrulaması gerekmez — cihazınızda bir cüzdan oluşturup kullanmaya başlayabilirsiniz.',
      },
      {
        q: 'Madem ücretsiz, wwwallet kendini nasıl finanse ediyor?',
        a: 'Kullanıcılarından gelir elde etmez — ücret yok, reklam yok, veri satışı yok. İşletme maliyetleri tasarım gereği düşük tutulur: cüzdan, tarayıcınızda çalışır ve arka uç yalnızca halka açık blok zinciri ve fiyat verilerini iletir.',
      },
      {
        q: 'Cüzdanımı dondurma yetkisi olan var mı?',
        a: "Hesap olmadığı için, wwwallet’in — ya da başka birinin — dondurabileceği bir şey yoktur. Anahtarlarınız cihazınızdan asla çıkmaz ve işlemler ağa gönderilmeden önce cihazınızda imzalanır. Paralarınız wwwallet'te değil, Ethereum'da bulunur: herhangi bir hesabın özel anahtarını veya kurtarma ifadesini menüsünden görüntüleyebilir ve istediğiniz zaman başka bir Ethereum cüzdanına aktarabilirsiniz.",
      },
      {
        q: 'Geri alma ifadem, cüzdanımı geri almak için yeterli mi?',
        a: 'Tek başına değil. Kurtarma ifadeniz şifrelenmiş kasayı açar, ancak kasanın kendisi yalnızca cihazınızda bulunur. Yedekleme yapmadan bu cihazı kaybederseniz veya silerseniz, ifadenizin açabileceği hiçbir şey kalmaz. Kurtarma ifadenizi her zaman bir Google Drive veya dosya yedeğiyle birlikte kullanın — bir sonraki soruya bakın.',
      },
      {
        q: 'Cüzdanımı nasıl yedekleyebilirim?',
        a: 'Ayarlar bölümünden, şifrelenmiş kasanızı kendi Google Drive’ınıza yedekleyin — bu yedek, wwwallet’in geri kalan kısmını göremeyeceği, yalnızca uygulamaya özel gizli bir klasörde saklanır — ya da indirip kendiniz saklayabileceğiniz bir dosya olarak. Bir cüzdan kurduğunuzda veya yeni hesaplar eklediğinizde bunu yapın.',
      },
      {
        q: 'wwwallet’i birden fazla cihazda kullanabilir miyim?',
        a: 'Evet, ancak otomatik olarak senkronize olmaz — her cihaz kendi yerel kasasını barındırır. Yeni bir cihazda wwwallet’i kullanmak için, Drive veya dosya yedeklemesinden o cihaza geri yükleyin, ardından kurtarma ifadesiyle kilidi açın.',
      },
      {
        q: 'Cihazımı kaybedersem ve hiç yedekleme yapmamışsam ne olur?',
        a: 'Paranız geri alınamaz. Bu, sistemin tasarımı gereğidir: wwwallet’te hesap sistemi yoktur ve kasanızın hiçbir yerde bir kopyası tutulmaz; dolayısıyla biz dahil hiç kimse bunu sizin için geri yükleyemez. Bu, sizden başka kimsenin erişemeyeceği bir cüzdanın getirdiği bir ödünleşmedir.',
      },
      {
        q: 'Geçiş anahtarları (Face ID / Touch ID) yeni bir cihaza aktarılabilir mi?',
        a: 'Hayır. Şifre anahtarı, oluşturulduğu cihaza bağlıdır. Yeni bir cihazda yedeği geri yükledikten sonra, kurtarma ifadesiyle kilidi açın; ardından o cihazda yeni bir şifre anahtarı oluşturabilirsiniz.',
      },
      {
        q: 'wwwallet açık kaynak mıdır?',
        a: 'Hayır — kaynak kodu erişilebilir. Kaynak kodun tamamı GitHub’da herkese açık olduğundan herkes onu okuyabilir, inceleyebilir ve denetleyebilir; ancak açık kaynak değildir: kod, PolyForm Strict Lisansı 1.0.0 kapsamında lisanslanmıştır.',
      },
      {
        q: 'Bu kodla ne yapmama izin veriliyor?',
        a: 'Tüm içeriği okuyabilir ve inceleyebilir, ayrıca kişisel çalışma, araştırma ve test gibi ticari olmayan amaçlarla değiştirilmemiş bir kopyasını kullanabilirsiniz. Bunu dağıtamaz, değiştiremez veya türev çalışmalar (forklar dahil) oluşturamaz ya da ticari amaçlarla kullanamazsınız. Lisansın izin vermediği bir şeye ihtiyacınız varsa, ayrı bir lisans almak için telif hakkı sahibiyle iletişime geçin.',
      },
      {
        q: "wwwallet'i kullanmak güvenli mi? Herhangi bir garanti var mı?",
        a: 'wwwallet, “olduğu gibi” sunulan ve hiçbir tür garanti içermeyen, emanetçi olmayan bir yazılımdır. Anahtarlarınızı ve varlıklarınızı yalnızca siz kontrol edersiniz — biz dahil hiç kimse, kaybolan kurtarma ifadesini veya yedeği geri getiremez, bir işlemi geri alamaz veya kayıplarınız için size tazminat ödeyemez. Yalnızca kaybetmeyi göze alabileceğiniz varlıklarınızı kullanın, göndermeden önce adresleri ve ağları iki kez kontrol edin; buradaki hiçbir bilgi finansal, yatırım, hukuki veya vergi tavsiyesi niteliğinde değildir.',
      },
      {
        q: 'wwwallet hangi ağları destekliyor?',
        a: 'Ethereum ana ağı ile Polygon, Arbitrum, Base ve Optimism gibi Katman-2 ağları — hepsi aynı hesap grubundan.',
      },
      {
        q: 'Cüzdanıma nasıl para yükleyebilirim?',
        a: 'Bir hesap açın, adresini görmek için “QR kodunu görüntüle” seçeneğini seçin ve bir borsadan veya başka bir cüzdandan bu adrese para gönderin. Doğru ağda (Ethereum, Polygon, Arbitrum, Base veya Optimism) gönderdiğinizden emin olun — aynı adres hepsinde çalışır, ancak bir ağda gönderilen fonlar yalnızca o ağda görünür. Ayrıca, işlem ücretlerini ödemek için ağın kendi kripto parası (ETH gibi) da biraz gerekecektir.',
      },
      {
        q: 'wwwallet ile neler yapabilirim?',
        a: 'Gönder: ETH veya herhangi bir token’ı, yapıştırdığınız, bir QR kodundan taradığınız ya da kendi hesaplarınızdan seçtiğiniz bir adrese aktarın ve onaylamadan önce ayrıntıları inceleyin. Takas: “Takas” sekmesinden, aynı ağ üzerinde bir token’ı başka bir token’la takas edin; fiyat teklifi ve ücret tahmini önceden gösterilir. Al: Adresinizi QR kodu olarak görüntüleyin. Ayrıca, desteklenen tüm ağlardaki bakiyelerinizi USD cinsinden ve işlem geçmişinizi de görebilirsiniz.',
      },
      {
        q: 'wwwallet benim hakkımda ne biliyor?',
        a: 'Sizi tanımlayacak hiçbir şey yoktur. Hesap, oturum açma veya veritabanı bulunmamaktadır. Bakiye ve fiyat verileri, tarayıcınızın üçüncü taraf sağlayıcılara doğrudan bağlanmak yerine wwwallet’in kendi arka ucundan alınır ve bu arka uç, anahtarlarınızı, şifrelerinizi veya kurtarma ifadesini asla görmez.',
      },
    ],
  },
  footer: {
    tagline: 'Herkes için ücretsiz, varlık saklama özelliği olmayan bir Ethereum cüzdanı.',
    copyright: '© {year} wwwallet',
    licenseLink: 'PolyForm Strict 1.0.0 lisansı kapsamında lisanslanmıştır',
    disclaimer:
      'Saklama hizmeti sunmayan yazılım, “olduğu gibi” ve herhangi bir garanti olmaksızın sağlanmaktadır. Bu, finansal tavsiye niteliğinde değildir. Anahtarlarınız ve varlıklarınızın sorumluluğu tamamen size aittir.',
  },
  license: {
    title: 'Lisans',
    close: 'Kapat',
    summaryTitle: 'Basitçe söylemek gerekirse',
    canUse:
      'wwwallet’i kişisel ve ticari olmayan diğer amaçlarla ücretsiz olarak kullanabilirsiniz.',
    canRead: 'Kaynak kodunun her satırını okuyabilir ve inceleyebilirsiniz.',
    cannot: 'Bunu kopyalayamaz, değiştiremez, yeniden dağıtamaz veya satamazsınız.',
    englishNote:
      'Aşağıda, orijinal İngilizce metniyle birlikte tam lisans metni yer almaktadır — bu, yasal metindir.',
    viewSource: "GitHub'da görüntüle",
  },
  principles: {
    eyebrow: 'İlkeler',
    heading: 'Ücretsiz, açık kaynaklı ve herkes için tasarlanmış',
    lede: 'Bir cüzdan, kullanıcılar üzerinde kurulu bir iş modeli değil, kullandığınız bir araç olmalıdır. İşte wwwallet’in temelini oluşturan taahhütler bunlardır.',
    items: [
      {
        title: 'Ücretsiz, hiçbir şart yok',
        body: 'Fiyat yok, premium üyelik yok, ücretli özellikler yok. wwwallet kendi adına herhangi bir ücret eklemez — tek masraf, ağın kendi işlem ücretidir.',
      },
      {
        title: 'Reklam yok, izleme yok',
        body: 'Reklam yok, analiz yok, izleme kodları yok ve veriler kimseye satılmıyor. Zaten satılacak bir profiliniz de yok.',
      },
      {
        title: 'Kayıt gerekmez',
        body: 'E-posta, telefon numarası veya kimlik doğrulaması gerekmez. Uygulamayı açın, bir cüzdan oluşturun ve hazırsınız.',
      },
      {
        title: 'Anahtarlarınız her zaman yanınızda olur',
        body: 'Anahtarlar cihazınızda oluşturulur ve şifrelenir; cihazınızdan asla dışarı çıkmazlar. wwwallet bu anahtarları göremez, paranızı hareket ettiremez veya hesabınıza erişiminizi engelleyemez.',
      },
      {
        title: 'Her yerde çalışır',
        body: 'Telefon veya masaüstü bilgisayarındaki herhangi bir modern tarayıcıda çalışır ve bir uygulama gibi yüklenir — uygulama mağazası hesabı gerekmez.',
      },
      {
        title: '31 dilde',
        body: 'En rahat hissettiğiniz dilde, açık veya koyu modda kullanın.',
      },
      {
        title: 'Açık kaynak kod',
        body: 'Kaynak kodun tamamı, herkesin okuyup inceleyebilmesi için yayınlanmıştır. Bu, açık kaynak değil, kaynak kodu erişilebilir bir projedir — SSS bölümünde lisansın nelere izin verdiği açıklanmaktadır.',
      },
      {
        title: 'Kapatılacak bir şey yok',
        body: 'Kimsenin hesabının dondurulması söz konusu değildir. Paranız doğrudan Ethereum ağında tutulur ve herhangi bir hesabın anahtarı istediğiniz zaman başka bir cüzdana aktarılabilir.',
      },
    ],
  },
}
