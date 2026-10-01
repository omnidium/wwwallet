export default {
  nav: {
    wallet: 'Cüzdan',
    ethereum: 'Ethereum',
    crypto: 'Kripto',
    faqs: 'Sık Sorulan Sorular',
    launch: 'Cüzdanı Aç',
    home: 'Başa dön',
    sectionNavLabel: 'Bölüm gezintisi',
  },
  settings: {
    open: 'Ayarlar',
    close: 'Ayarları kapat',
    theme: 'Tema',
    themeLight: 'Işık',
    themeDark: 'Karanlık',
    language: 'Dil',
  },
  hero: {
    eyebrow: 'Kişisel, saklama hizmeti sunmayan bir Ethereum cüzdanı',
    heading1: 'Anahtarlarınız.',
    heading2: 'Cihazınız.',
    heading3: 'Cüzdanınız.',
    lede: 'wwwallet, cüzdanınızı kendi cihazınızda şifreler ve anahtarlarınızı, şifrelerinizi veya kurtarma ifadesini hiçbir zaman başka bir yere göndermez. Oluşturulacak bir hesap yok. Sızılabilecek bir sunucu yok. Sadece siz ve kripto varlıklarınız.',
    ctaPrimary: 'Cüzdanı Aç',
    ctaSecondary: 'Nasıl çalıştığını görün',
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
        q: 'Geri alma ifadem, cüzdanımı geri almak için yeterli mi?',
        a: 'Tek başına yeterli değildir. Kurtarma ifadeniz şifrelenmiş kasayı açar, ancak kasanın kendisi yalnızca cihazınızda bulunur. Yedekleme yapmadan bu cihazı kaybederseniz veya silerseniz, ifadenizin açabileceği hiçbir şey kalmaz. Kurtarma ifadenizi her zaman bir Google Drive veya dosya yedeğiyle birlikte kullanın — bir sonraki soruya bakın.',
      },
      {
        q: 'Cüzdanımı nasıl yedekleyebilirim?',
        a: 'Ayarlar bölümünden, şifrelenmiş kasenizi kendi Google Drive’ınıza yedekleyin — bu, wwwallet’in geri kalanını göremeyeceği, uygulamaya özel gizli bir klasörde saklanır — ya da indirip kendiniz saklayabileceğiniz bir dosya olarak. Bir cüzdan kurduğunuzda veya yeni hesaplar eklediğinizde bunu yapın.',
      },
      {
        q: 'wwwallet’i birden fazla cihazda kullanabilir miyim?',
        a: 'Evet, ancak otomatik olarak senkronize olmaz — her cihaz kendi yerel kasasını barındırır. wwwallet’i yeni bir cihazda kullanmak için, Drive veya dosya yedeklemesinden o cihaza geri yükleyin, ardından kurtarma ifadesiyle kilidi açın.',
      },
      {
        q: 'Cihazımı kaybedersem ve hiç yedekleme yapmamışsam ne olur?',
        a: 'Paranızı geri alamazsınız. Bu, sistemin tasarımından kaynaklanmaktadır: wwwallet’te hesap sistemi yoktur ve kasanızın hiçbir yerde bir kopyası tutulmaz; dolayısıyla biz dahil hiç kimse bunu sizin için geri yükleyemez. Bu, sizden başka kimsenin erişemeyeceği bir cüzdanın getirdiği bir ödünleşmedir.',
      },
      {
        q: 'Geçiş anahtarları (Face ID / Touch ID) yeni bir cihaza aktarılır mı?',
        a: 'Hayır. Şifre anahtarı, oluşturulduğu cihaza bağlıdır. Yedeklemeyi yeni bir cihaza geri yükledikten sonra, kurtarma ifadesiyle kilidi açın; ardından o cihazda yeni bir şifre anahtarı oluşturabilirsiniz.',
      },
      {
        q: 'wwwallet açık kaynak mıdır?',
        a: "Kaynak kodu GitHub'da herkese açık durumda, dolayısıyla herkes okuyabilir. Henüz bir açık kaynak lisansı altında yayınlanmamıştır; bu nedenle şimdilik bunu açık kaynak olarak değil, inceleme amacıyla herkese açık bir kaynak olarak değerlendirin.",
      },
      {
        q: 'wwwallet hangi ağları destekliyor?',
        a: 'Ethereum ana ağı ile Polygon, Arbitrum, Base ve Optimism gibi Katman-2 ağları — hepsi aynı hesap grubundan.',
      },
      {
        q: 'wwwallet benim hakkımda ne biliyor?',
        a: 'Sizi tanımlayacak hiçbir şey yoktur. Hesap, oturum açma veya veritabanı yoktur. Bakiye ve fiyat verileri, tarayıcınızın üçüncü taraf sağlayıcılara doğrudan bağlanmak yerine wwwallet’in kendi arka ucundan alınır ve bu arka uç, anahtarlarınızı, şifrelerinizi veya kurtarma ifadesini asla görmez.',
      },
    ],
  },
  footer: {
    tagline: 'Kişisel, merkezi olmayan bir Ethereum cüzdanı.',
    sourceLink: "GitHub'da kaynak kodunu görüntüle",
    copyright: '© {year} wwwallet',
  },
}
