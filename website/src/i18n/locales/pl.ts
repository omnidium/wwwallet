export default {
  nav: {
    wallet: 'Portfel',
    ethereum: 'Ethereum',
    crypto: 'Kryptowaluty',
    faqs: 'Najczęściej zadawane pytania',
    launch: 'Uruchom portfel',
    home: 'Powrót do góry strony',
    sectionNavLabel: 'Nawigacja po sekcjach',
    principles: 'Zasady',
  },
  settings: {
    open: 'Ustawienia',
    close: 'Zamknij ustawienia',
    theme: 'Temat',
    themeLight: 'Światło',
    themeDark: 'Ciemny',
    language: 'Język',
    search: 'Wyszukiwanie',
    noMatches: 'Brak wyników',
  },
  hero: {
    eyebrow: 'Bezpłatny portfel Ethereum bez funkcji przechowywania środków',
    heading1: 'Twoje klucze.',
    heading2: 'Twoje urządzenie.',
    heading3: 'Bezpłatne dla wszystkich.',
    lede: 'wwwallet działa w przeglądarce, a klucze są przechowywane w zaszyfrowanej postaci na Twoim urządzeniu. Nie trzeba zakładać konta, nic nie trzeba płacić i nie ma reklam — to po prostu portfel, który działa tak samo dla wszystkich.',
    ctaPrimary: 'Uruchom portfel',
    ctaSecondary: 'Zobacz, jak to działa',
    note: 'Bez rejestracji · Bez reklam · Bez śledzenia · 31 języków',
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
        q: 'Czy wwwallet jest naprawdę darmowy?',
        a: 'Tak. Korzystanie z serwisu jest bezpłatne, nie ma wersji premium ani żadnych treści dostępnych wyłącznie po opłaceniu, a wwwallet nie nalicza żadnych opłat za wysyłanie ani wymianę środków. Jedynym nieuniknionym kosztem jest opłata transakcyjna (gas) pobierana przez samą sieć, która trafia do sieci, a nie do wwwallet. Oferty wymiany pochodzą z agregatora giełdowego 0x, który w przypadku niektórych transakcji może naliczać własną opłatę — każda taka opłata jest widoczna na ekranie podsumowania przed potwierdzeniem transakcji.',
      },
      {
        q: 'Czy są tam reklamy, moduły śledzące lub narzędzia analityczne?',
        a: 'Nie. Witryna wwwallet nie wyświetla reklam, nie korzysta ze skryptów analitycznych ani śledzących i nie tworzy profilu użytkownika. Nie ma tam konta, więc nie ma do czego go przypisać.',
      },
      {
        q: 'Czy do korzystania z tej usługi potrzebne jest konto lub dowód tożsamości?',
        a: 'Nie. Nie trzeba się rejestrować, podawać adresu e-mail, numeru telefonu ani przechodzić weryfikacji tożsamości — wystarczy utworzyć portfel na swoim urządzeniu i zacząć z niego korzystać.',
      },
      {
        q: 'Skoro to nic nie kosztuje, to w jaki sposób wwwallet się finansuje?',
        a: 'Serwis nie czerpie zysków od użytkowników — nie pobiera opłat, nie wyświetla reklam ani nie sprzedaje danych. Koszty eksploatacji są z założenia niskie: sam portfel działa w przeglądarce, a serwer przesyła jedynie publiczne dane z łańcucha bloków oraz dane dotyczące cen.',
      },
      {
        q: 'Czy ktoś może zablokować mój portfel?',
        a: 'Nie ma tu żadnego konta, więc wwwallet – ani nikt inny – nie ma czego zablokować. Twoje klucze nigdy nie opuszczają Twojego urządzenia, a transakcje są tam podpisywane przed wysłaniem do sieci. Twoje środki znajdują się w sieci Ethereum, a nie w wwwallet: w menu każdego konta możesz wyświetlić jego klucz prywatny lub frazę odzyskiwania i zaimportować je do innego portfela Ethereum w dowolnym momencie.',
      },
      {
        q: 'Czy hasło odzyskiwania wystarczy, żebym odzyskał portfel?',
        a: 'Nie sama w sobie. Twoja fraza odzyskiwania odblokowuje zaszyfrowany sejf, ale sam sejf znajduje się wyłącznie na Twoim urządzeniu. Jeśli zgubisz lub wyczyścisz to urządzenie, nie tworząc wcześniej kopii zapasowej, fraza nie będzie miała czego odblokować. Zawsze łącz swoją frazę odzyskiwania z kopią zapasową na Dysku Google lub w innym miejscu — zobacz następne pytanie.',
      },
      {
        q: 'Jak wykonać kopię zapasową mojego portfela?',
        a: 'W sekcji „Ustawienia” utwórz kopię zapasową zaszyfrowanego sejfu na swoim dysku Google Drive — zostanie ona zapisana w prywatnym folderze dostępnym wyłącznie dla aplikacji, do którego wwwallet nie ma wglądu — lub jako plik, który możesz pobrać i przechowywać samodzielnie. Wykonaj tę czynność za każdym razem, gdy konfigurujesz portfel lub dodajesz nowe konta.',
      },
      {
        q: 'Czy mogę korzystać z wwwallet na więcej niż jednym urządzeniu?',
        a: 'Tak, ale synchronizacja nie odbywa się automatycznie — każde urządzenie posiada własny lokalny sejf. Aby korzystać z aplikacji wwwallet na nowym urządzeniu, przywróć ją na tym urządzeniu z kopii zapasowej na Dysku lub z pliku, a następnie odblokuj za pomocą frazy odzyskiwania.',
      },
      {
        q: 'Co się stanie, jeśli zgubię urządzenie i nigdy nie wykonałem kopii zapasowej?',
        a: 'Twoich środków nie da się odzyskać. Tak zostało zaprojektowane: wwwallet nie posiada systemu kont i nigdzie nie przechowuje kopii Twojego skarbca, więc nikt — w tym my — nie może go dla Ciebie odtworzyć. To cena, jaką trzeba zapłacić za portfel, do którego dostęp masz wyłącznie Ty.',
      },
      {
        q: 'Czy klucze dostępu (Face ID / Touch ID) są przenoszone na nowe urządzenie?',
        a: 'Nie. Hasło jest powiązane z urządzeniem, na którym zostało utworzone. Po przywróceniu kopii zapasowej na nowym urządzeniu odblokuj je za pomocą frazy odzyskiwania, a następnie skonfiguruj na nim nowe hasło.',
      },
      {
        q: 'Czy wwwallet jest oprogramowaniem typu open source?',
        a: 'Nie — kod źródłowy jest dostępny. Pełna wersja kodu źródłowego jest opublikowana na GitHubie, więc każdy może ją przeczytać, przejrzeć i poddać audytowi, ale nie jest to oprogramowanie typu open source: kod jest objęty licencją PolyForm Strict License 1.0.0.',
      },
      {
        q: 'Co mogę robić z tym kodem?',
        a: 'Możesz zapoznać się z całą treścią i ją zweryfikować, a także korzystać z niezmodyfikowanej kopii w celach niekomercyjnych, takich jak nauka własna, badania i testowanie. Nie wolno jej rozpowszechniać, modyfikować ani tworzyć dzieł pochodnych (w tym rozgałęzień), ani też wykorzystywać jej w celach komercyjnych. Jeśli potrzebujesz czegoś, na co licencja nie zezwala, skontaktuj się z właścicielem praw autorskich w celu uzyskania oddzielnej licencji.',
      },
      {
        q: 'Czy korzystanie z serwisu wwwallet jest bezpieczne? Czy istnieje jakakolwiek gwarancja?',
        a: 'wwwallet to oprogramowanie bez powiernictwa, udostępniane „tak jak jest”, bez jakiejkolwiek gwarancji. Tylko Ty masz kontrolę nad swoimi kluczami i środkami — nikt, w tym my, nie może odzyskać utraconej frazy odzyskiwania ani kopii zapasowej, cofnąć transakcji ani zrekompensować Ci strat. Korzystaj wyłącznie ze środków, których utratę możesz sobie pozwolić, dokładnie sprawdzaj adresy i sieci przed wysłaniem, a żadna z informacji zawartych w niniejszym dokumencie nie stanowi porady finansowej, inwestycyjnej, prawnej ani podatkowej.',
      },
      {
        q: 'Jakie sieci obsługuje wwwallet?',
        a: 'Sieć główna Ethereum oraz sieci warstwy drugiej: Polygon, Arbitrum, Base i Optimism — wszystkie z tego samego zestawu kont.',
      },
      {
        q: 'Jak doładować portfel?',
        a: 'Załóż konto, wybierz opcję „Wyświetl kod QR”, aby zobaczyć adres, a następnie wyślij środki na ten adres z giełdy lub innego portfela. Upewnij się, że wysyłasz środki w odpowiedniej sieci (Ethereum, Polygon, Arbitrum, Base lub Optimism) — ten sam adres działa we wszystkich z nich, ale środki wysłane w jednej sieci pojawiają się tylko w tej sieci. Będziesz również potrzebować niewielkiej ilości natywnej monety sieci (np. ETH) na opłacenie opłat transakcyjnych.',
      },
      {
        q: 'Co mogę zrobić za pomocą wwwallet?',
        a: 'Wyślij: przekaż ETH lub dowolny token na adres, który wkleisz, zeskanujesz z kodu QR lub wybierzesz spośród swoich kont, a następnie sprawdź szczegóły przed potwierdzeniem. Wymiana: wymień jeden token na inny w tej samej sieci w zakładce „Wymiana”, gdzie od razu wyświetlana jest oferta i szacunkowa opłata. Odbiór: wyświetl swój adres w postaci kodu QR. Możesz również sprawdzić swoje salda w USD oraz historię transakcji we wszystkich obsługiwanych sieciach.',
      },
      {
        q: 'Co serwis wwwallet wie o mnie?',
        a: 'Nie ma tu żadnych danych umożliwiających identyfikację użytkownika. Nie ma konta, logowania ani bazy danych. Dane dotyczące salda i kursów są pobierane za pośrednictwem własnego zaplecza serwisu wwwallet, a nie poprzez bezpośrednie połączenie przeglądarki z zewnętrznymi dostawcami, a zaplecze to nigdy nie ma wglądu w klucze, hasła ani frazę odzyskiwania użytkownika.',
      },
    ],
  },
  footer: {
    tagline: 'Bezpłatny portfel Ethereum bez funkcji przechowywania środków, dostępny dla każdego.',
    copyright: '© {year} wwwallet',
    licenseLink: 'Na licencji PolyForm Strict 1.0.0',
    disclaimer:
      'Oprogramowanie nieposiadające funkcji przechowywania środków jest udostępniane „tak jak jest”, bez gwarancji. Nie stanowi to porady finansowej. Użytkownik ponosi wyłączną odpowiedzialność za swoje klucze i środki.',
  },
  principles: {
    eyebrow: 'Zasady',
    heading: 'Bezpłatny, otwarty i stworzony z myślą o każdym',
    lede: 'Portfel powinien być narzędziem, z którego korzystasz, a nie biznesem opartym na swoich użytkownikach. Właśnie na tych zasadach opiera się działalność wwwallet.',
    items: [
      {
        title: 'Za darmo, bez żadnych haczyków',
        body: 'Żadnych opłat, żadnego planu premium, żadnych płatnych funkcji. wwwallet nie nalicza żadnych własnych opłat — jedynym kosztem jest opłata transakcyjna pobierana przez samą sieć.',
      },
      {
        title: 'Bez reklam, bez śledzenia',
        body: 'Żadnych reklam, żadnych narzędzi analitycznych, żadnych skryptów śledzących ani sprzedaży danych jakimkolwiek podmiotom. Po pierwsze, nie istnieje żaden profil użytkownika, który można by sprzedać.',
      },
      {
        title: 'Bez rejestracji',
        body: 'Nie trzeba podawać adresu e-mail, numeru telefonu ani potwierdzać tożsamości. Wystarczy otworzyć aplikację, założyć portfel i gotowe.',
      },
      {
        title: 'Klucze pozostają przy tobie',
        body: 'Klucze są generowane i szyfrowane na Twoim urządzeniu i nigdy go nie opuszczają. wwwallet nie ma do nich wglądu, nie może przenosić Twoich środków ani zablokować Ci dostępu.',
      },
      {
        title: 'Działa wszędzie',
        body: 'Działa w każdej nowoczesnej przeglądarce na telefonie lub komputerze i instaluje się jak aplikacja — nie trzeba mieć konta w sklepie z aplikacjami.',
      },
      {
        title: 'W 31 językach',
        body: 'Korzystaj z niego w języku, który najbardziej Ci odpowiada, w trybie jasnym lub ciemnym.',
      },
      {
        title: 'Kod w przestrzeni publicznej',
        body: 'Pełny kod źródłowy został opublikowany, aby każdy mógł go przeczytać i poddać weryfikacji. Jest to kod dostępny, a nie open source — w sekcji FAQ wyjaśniono, na co zezwala licencja.',
      },
      {
        title: 'Nie ma czego wyłączać',
        body: 'Nie ma tu żadnych kont, które mogłyby zostać zablokowane. Twoje środki znajdują się bezpośrednio w sieci Ethereum, a klucz do każdego konta można w dowolnym momencie przenieść do innego portfela.',
      },
    ],
  },
  license: {
    title: 'Licencja',
    close: 'Zamknij',
    summaryTitle: 'Mówiąc prostym językiem',
    canUse:
      'Z serwisu wwwallet można korzystać bezpłatnie do celów osobistych i innych celów niekomercyjnych.',
    canRead: 'Można przeczytać i sprawdzić każdy wiersz jego kodu źródłowego.',
    cannot: 'Nie wolno jej kopiować, modyfikować, rozpowszechniać ani sprzedawać.',
    englishNote:
      'Poniżej zamieszczono pełną treść licencji w oryginalnej wersji angielskiej — jest to tekst prawny.',
    viewSource: 'Zobacz na GitHubie',
  },
}
