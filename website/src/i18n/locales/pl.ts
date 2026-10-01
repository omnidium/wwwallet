export default {
  nav: {
    wallet: 'Portfel',
    ethereum: 'Ethereum',
    crypto: 'Kryptowaluty',
    faqs: 'Najczęściej zadawane pytania',
    launch: 'Uruchom portfel',
    home: 'Powrót do góry strony',
    sectionNavLabel: 'Nawigacja po sekcjach',
  },
  settings: {
    open: 'Ustawienia',
    close: 'Zamknij ustawienia',
    theme: 'Temat',
    themeLight: 'Światło',
    themeDark: 'Ciemny',
    language: 'Język',
  },
  hero: {
    eyebrow: 'Osobisty portfel Ethereum bez funkcji przechowywania środków',
    heading1: 'Twoje klucze.',
    heading2: 'Twoje urządzenie.',
    heading3: 'Twój portfel.',
    lede: 'wwwallet szyfruje Twój portfel na Twoim własnym urządzeniu i nigdy nie przesyła Twoich kluczy, haseł ani frazy odzyskiwania do żadnego innego miejsca. Nie musisz zakładać konta. Nie ma serwera, który można by zhakować. Tylko Ty i Twoje kryptowaluty.',
    ctaPrimary: 'Uruchom portfel',
    ctaSecondary: 'Zobacz, jak to działa',
  },
  wallet: {
    eyebrow: 'Portfel',
    heading: 'Zaprojektowane tak, by tylko Ty mogłeś je otworzyć',
    lede: 'wwwallet nie przechowuje Twoich środków — pomaga Ci samodzielnie nimi zarządzać. Oto, jak to wygląda w praktyce.',
    points: [
      {
        title: 'Bez przechowywania, zawsze',
        body: 'Twoje klucze prywatne są generowane i szyfrowane na Twoim własnym urządzeniu. Serwery wwwallet nigdy nie mają do nich dostępu — nie ma tu żadnej bazy danych portfeli, którą można by złamać, ponieważ w ogóle nie istnieje żadna baza danych.',
      },
      {
        title: 'Zaszyfrowane algorytmem AES-256, odblokowywanie na swój sposób',
        body: 'Twój sejf jest chroniony szyfrowaniem AES-256-GCM. Odblokuj go za pomocą frazy odzyskiwania lub włącz klucz dostępu — Face ID, Touch ID lub Windows Hello — aby uzyskać szybki dostęp wyłącznie w trybie lokalnym.',
      },
      {
        title: 'Zamyka się automatycznie',
        body: 'wwwallet blokuje się po krótkim okresie bezczynności i nigdy nie zapisuje odblokowanej sesji na dysku — wystarczy zamknąć kartę, a aplikacja celowo zapomina o niej.',
      },
      {
        title: 'Jeden portfel, pięć sieci Ethereum',
        body: 'Przechowuj i wysyłaj środki w sieci głównej Ethereum, Polygon, Arbitrum, Base i Optimism z tego samego zestawu kont.',
      },
    ],
    caveatTitle:
      'Twoje hasło odzyskiwania odblokowuje Twój sejf — nie jest to żadna magiczna kopia zapasowa',
    caveatBody:
      'Zapisz swoją frazę odzyskiwania w bezpiecznym miejscu, ale wykonaj również kopię zapasową na Dysku Google lub w pliku. Kopia zapasowa będzie Ci potrzebna do przywrócenia portfela na nowym urządzeniu, a fraza – do jego odblokowania po przywróceniu.',
    caveatLink: 'Więcej informacji znajdziesz w sekcji „Najczęściej zadawane pytania”',
  },
  ethereum: {
    eyebrow: 'Ethereum',
    heading: 'Dlaczego Ethereum?',
    lede: 'wwwallet został stworzony specjalnie z myślą o sieci Ethereum. Oto, dlaczego tak jest, w prostych słowach.',
    points: [
      {
        title: 'Komputer na skalę globalną, a nie tylko księga rachunkowa',
        body: 'Ethereum przejęło od Bitcoina koncepcję wspólnego, odpornego na manipulacje rejestru i rozwinęło ją: powstał globalny, programowalny komputer, na którym każdy może tworzyć aplikacje i którego żadna pojedyncza strona nie może wyłączyć.',
      },
      {
        title: 'Zabezpieczone poprzez staking, a nie wydobywanie',
        body: 'Od czasu „The Merge” w 2022 roku bezpieczeństwo sieci Ethereum zapewnia mechanizm Proof-of-Stake, a nie energochłonne wydobywanie — walidatorzy zastawiają ETH jako zabezpieczenie zamiast zużywać energię elektryczną, aby rywalizować o bloki.',
      },
      {
        title: 'Otwarty i niewymagający zezwoleń',
        body: 'Nikt nie zatwierdza Twojego konta. Każdy, gdziekolwiek się znajduje, może posiadać ETH lub tworzyć aplikacje na platformie Ethereum — te same zasady obowiązują wszystkich, w tym największe instytucje.',
      },
      {
        title: 'Standard, na którym opierają się inne sieci',
        body: 'Sieci warstwy drugiej, takie jak Arbitrum, Base i Optimism — wszystkie obsługiwane przez wwwallet — rozszerzają zabezpieczenia sieci Ethereum, umożliwiając szybsze i tańsze transakcje, zamiast tworzyć system od podstaw.',
      },
    ],
    linkLabel: 'Więcej informacji znajdziesz na stronie Fundacji Ethereum',
    linkUrl: 'https://ethereum.org/en/foundation/',
  },
  crypto: {
    eyebrow: 'Kryptowaluty',
    heading: 'Kryptowaluty – w prostych słowach',
    lede: 'Kilka pojęć, które warto zrozumieć, zanim zaczniesz samodzielnie przechowywać kryptowaluty — nie tylko za pomocą wwwallet.',
    points: [
      {
        title: 'Z prawem do opieki a bez prawa do opieki',
        body: 'Portfel powierniczy lub giełda przechowują Twoje klucze za Ciebie — to wygodne rozwiązanie, ale musisz polegać na tym, że ktoś inny nie zablokuje, nie zgubi ani nie wykorzysta Twoich środków w niewłaściwy sposób. Portfel niepowierniczy, taki jak wwwallet, przekazuje klucze — a wraz z nimi odpowiedzialność — wyłącznie w Twoje ręce.',
      },
      {
        title: 'Staking a wydobywanie',
        body: 'Wydobywanie w modelu Proof-of-Work zabezpiecza łańcuch bloków dzięki surowej mocy obliczeniowej i energii elektrycznej. Model Proof-of-Stake zabezpiecza go natomiast za pomocą kapitału narażonego na ryzyko. Przejście Ethereum na model stakingu zmniejszyło zużycie energii o ponad 99,9% — co odpowiada mniej więcej różnicy między zasilaniem małego kraju a małego miasteczka.',
      },
      {
        title: 'Poza Ethereum',
        body: 'Bitcoin przedkłada prostotę i przewidywalność nad programowalność. Łańcuchy takie jak Solana stawiają na maksymalną przepustowość, często kosztem decentralizacji. Ethereum stawia przede wszystkim na decentralizację i bezpieczeństwo, a kwestie szybkości i kosztów pozostawia sieciom warstwy drugiej (Layer-2) zbudowanym w oparciu o tę platformę.',
      },
      {
        title: 'Żadna wiarygodna osoba nie prosi o podanie hasła',
        body: 'Niezależnie od tego, z jakiego portfela korzystasz: żadna giełda, żaden pracownik obsługi klienta ani żaden pracownik serwisu wwwallet nigdy nie poprosi Cię o podanie frazy odzyskiwania. Każdy, kto to robi, próbuje Cię okraść.',
      },
    ],
    linkLabel: 'Dowiedz się więcej dzięki podcastowi „Bankless”',
    linkUrl: 'https://www.bankless.com/',
  },
  faqs: {
    eyebrow: 'Najczęściej zadawane pytania',
    heading: 'Najczęściej zadawane pytania',
    items: [
      {
        q: 'Czy moje hasło odzyskiwania wystarczy, żeby odzyskać portfel?',
        a: 'Nie sama w sobie. Fraza odzyskiwania odblokowuje zaszyfrowany sejf, ale sam sejf znajduje się wyłącznie na Twoim urządzeniu. Jeśli zgubisz lub wyczyścisz to urządzenie, nie tworząc wcześniej kopii zapasowej, fraza nie będzie miała czego odblokować. Zawsze łącz frazę odzyskiwania z kopią zapasową na Dysku Google lub w innym miejscu — zobacz następne pytanie.',
      },
      {
        q: 'Jak wykonać kopię zapasową mojego portfela?',
        a: 'W sekcji „Ustawienia” utwórz kopię zapasową zaszyfrowanego sejfu na swoim dysku Google Drive — zostanie ona zapisana w prywatnym folderze dostępnym wyłącznie dla aplikacji, do którego wwwallet nie ma wglądu — lub jako plik, który możesz pobrać i przechowywać samodzielnie. Należy to robić za każdym razem, gdy konfigurujesz portfel lub dodajesz nowe konta.',
      },
      {
        q: 'Czy mogę korzystać z wwwallet na więcej niż jednym urządzeniu?',
        a: 'Tak, ale synchronizacja nie odbywa się automatycznie — każde urządzenie posiada własny lokalny sejf. Aby korzystać z wwwallet na nowym urządzeniu, przywróć je z kopii zapasowej na Dysku lub z pliku, a następnie odblokuj za pomocą frazy odzyskiwania.',
      },
      {
        q: 'Co się stanie, jeśli zgubię urządzenie i nigdy nie wykonałem kopii zapasowej?',
        a: 'Twoich środków nie da się odzyskać. Tak zostało zaprojektowane: wwwallet nie posiada systemu kont i nigdzie nie przechowuje kopii Twojego sejfu, więc nikt — w tym my — nie może go dla Ciebie odtworzyć. Jest to cena, jaką trzeba zapłacić za portfel, do którego dostęp masz wyłącznie Ty.',
      },
      {
        q: 'Czy klucze dostępu (Face ID / Touch ID) są przenoszone na nowe urządzenie?',
        a: 'Nie. Hasło jest powiązane z urządzeniem, na którym zostało utworzone. Po przywróceniu kopii zapasowej na nowym urządzeniu odblokuj je za pomocą frazy odzyskiwania, a następnie skonfiguruj na nim nowe hasło.',
      },
      {
        q: 'Czy wwwallet jest oprogramowaniem typu open source?',
        a: 'Nie — kod źródłowy jest dostępny. Pełny kod źródłowy jest opublikowany na GitHubie, więc każdy może go przeczytać, przejrzeć i poddać audytowi, ale nie jest to oprogramowanie typu open source: kod jest objęty licencją PolyForm Strict License 1.0.0.',
      },
      {
        q: 'Co mogę robić z tym kodem?',
        a: 'Możesz zapoznać się z całą treścią i ją sprawdzić, a także korzystać z niezmodyfikowanej kopii w celach niekomercyjnych, takich jak nauka własna, badania i testowanie. Nie wolno jej rozpowszechniać, modyfikować ani tworzyć dzieł pochodnych (w tym rozgałęzień), ani wykorzystywać jej w celach komercyjnych. Jeśli potrzebujesz czegoś, na co licencja nie zezwala, skontaktuj się z właścicielem praw autorskich w celu uzyskania odrębnej licencji.',
      },
      {
        q: 'Czy korzystanie z serwisu wwwallet jest bezpieczne? Czy przysługuje jakaś gwarancja?',
        a: 'wwwallet to oprogramowanie bez powiernictwa, udostępniane „tak jak jest”, bez jakiejkolwiek gwarancji. Tylko Ty masz kontrolę nad swoimi kluczami i środkami — nikt, w tym my, nie może odzyskać utraconej frazy odzyskiwania ani kopii zapasowej, cofnąć transakcji ani zrekompensować Ci strat. Korzystaj wyłącznie ze środków, których utratę możesz sobie pozwolić, dokładnie sprawdzaj adresy i sieci przed wysłaniem, a żadna z zawartych tu informacji nie stanowi porady finansowej, inwestycyjnej, prawnej ani podatkowej.',
      },
      {
        q: 'Jakie sieci obsługuje wwwallet?',
        a: 'Sieć główna Ethereum oraz sieci warstwy drugiej: Polygon, Arbitrum, Base i Optimism — wszystko z tego samego zestawu kont.',
      },
      {
        q: 'Jak doładować portfel?',
        a: 'Załóż konto, wybierz opcję „Wyświetl kod QR”, aby zobaczyć adres, a następnie wyślij środki na ten adres z giełdy lub innego portfela. Upewnij się, że wysyłasz środki w odpowiedniej sieci (Ethereum, Polygon, Arbitrum, Base lub Optimism) — ten sam adres działa we wszystkich z nich, ale środki wysłane w jednej sieci pojawiają się tylko w tej sieci. Będziesz również potrzebować niewielkiej ilości natywnej monety sieci (np. ETH) na opłacenie opłat transakcyjnych.',
      },
      {
        q: 'Co mogę zrobić za pomocą wwwallet?',
        a: 'Wyślij: przelej ETH lub dowolny token na adres, który wkleisz, zeskanujesz z kodu QR lub wybierzesz spośród własnych kont, a następnie sprawdź szczegóły przed potwierdzeniem. Wymiana: wymień jeden token na inny w tej samej sieci w zakładce „Wymiana”, gdzie od razu wyświetla się kurs wymiany i szacunkowa opłata. Odbiór: wyświetl swój adres w postaci kodu QR. Możesz również sprawdzić swoje salda w USD oraz historię transakcji we wszystkich obsługiwanych sieciach.',
      },
      {
        q: 'Co serwis wwwallet wie o mnie?',
        a: 'Nie ma tu nic, co pozwoliłoby zidentyfikować użytkownika. Nie ma konta, logowania ani bazy danych. Dane dotyczące salda i cen są pobierane za pośrednictwem własnego zaplecza serwisu wwwallet, a nie poprzez bezpośrednie połączenie przeglądarki z zewnętrznymi dostawcami, a zaplecze to nigdy nie ma dostępu do kluczy, haseł ani frazy odzyskiwania użytkownika.',
      },
    ],
  },
  footer: {
    tagline: 'Osobisty portfel Ethereum bez funkcji przechowywania środków.',
    sourceLink: 'Zobacz kod źródłowy na GitHubie',
    copyright: '© {year} wwwallet',
    licenseLink: 'Na licencji PolyForm Strict 1.0.0',
    disclaimer:
      'Oprogramowanie nieposiadające funkcji przechowywania środków jest udostępniane „tak jak jest”, bez gwarancji. Nie stanowi to porady finansowej. Użytkownik ponosi wyłączną odpowiedzialność za swoje klucze i środki.',
  },
}
