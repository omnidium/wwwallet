export default {
  nav: {
    wallet: 'wwwallet',
    ethereum: 'Ethereum',
    crypto: 'Kryptowaluty',
    faqs: 'Często zadawane pytania',
    launch: 'Uruchom wwwallet',
    home: 'Powrót do góry',
    sectionNavLabel: 'Nawigacja po sekcjach',
    principles: 'Zasady',
  },
  settings: {
    open: 'Ustawienia',
    close: 'Zamknij ustawienia',
    theme: 'Temat',
    themeLight: 'Krótko',
    themeDark: 'Ciemny',
    language: 'Język',
    search: 'Wyszukiwanie',
    noMatches: 'Brak wyników',
    version: 'Wersja {version}',
  },
  hero: {
    eyebrow: 'Darmowy portfel Ethereum bez powiernictwa',
    heading1: 'Twoje klucze.',
    heading2: 'Twoje urządzenie.',
    heading3: 'Darmowe dla wszystkich.',
    lede: 'wwwallet działa w przeglądarce i przechowuje twoje klucze w postaci zaszyfrowanej na twoim urządzeniu. Nie musisz zakładać konta, nic nie płacisz, nie ma reklam, a aplikacja działa tak samo dla wszystkich.',
    ctaPrimary: 'Uruchom wwwallet',
    ctaSecondary: 'Zobacz, jak to działa',
    note: 'Bez rejestracji · Bez reklam · Bez śledzenia · 31 języków',
  },
  wallet: {
    eyebrow: 'wwwallet',
    heading: 'Zaprojektowany tak, żeby tylko ty mógł go otworzyć',
    lede: 'wwwallet nie przechowuje twoich środków – pomaga ci samodzielnie je przechowywać. Oto, co to oznacza w praktyce.',
    points: [
      {
        title: 'Zawsze podkreślaj, że jest to portfel bez powiernictwa',
        body: 'Twoje klucze prywatne są generowane i szyfrowane na twoim własnym urządzeniu. Serwery wwwallet nigdy ich nie widzą – nie ma bazy danych kluczy, którą można by złamać, bo po prostu nie ma żadnej bazy danych.',
      },
      {
        title: 'Szyfrowane algorytmem AES-256, odblokowujesz to po swojemu',
        body: 'Twój sejf jest chroniony szyfrowaniem AES-256-GCM. Odblokuj go za pomocą frazy odzyskiwania lub włącz hasło dostępu — Face ID, Touch ID lub Windows Hello — aby uzyskać szybki dostęp wyłącznie lokalny.',
      },
      {
        title: 'Blokuje się automatycznie',
        body: 'wwwallet blokuje się po krótkim okresie bezczynności i nigdy nie zapisuje twojej odblokowanej sesji na dysku – zamknij kartę, a aplikacja celowo o tym zapomni.',
      },
      {
        title: 'Piętnaście sieci Ethereum, jeden zestaw kont',
        body: 'Przechowuj i wysyłaj środki w sieci głównej Ethereum oraz w 14 innych sieciach — w tym Arbitrum, Base, Optimism, Polygon, Linea i ZKsync — korzystając z tych samych kont i adresów.',
      },
    ],
    caveatTitle:
      'Twoja fraza odzyskiwania odblokowuje twój sejf – to nie jest żadna magiczna kopia zapasowa',
    caveatBody:
      'Zapisz swoją frazę odzyskiwania w bezpiecznym miejscu, ale zrób też kopię zapasową na Google Drive lub w pliku. Kopia zapasowa będzie ci potrzebna do przywrócenia portfela na nowym urządzeniu, a fraza – do jego odblokowania po przywróceniu.',
    caveatLink: 'Więcej informacji znajdziesz w sekcji FAQ',
  },
  ethereum: {
    eyebrow: 'Ethereum',
    heading: 'Dlaczego Ethereum',
    lede: 'wwwallet jest stworzony specjalnie z myślą o sieci Ethereum. Oto dlaczego, w prostych słowach.',
    points: [
      {
        title: 'Światowy komputer, a nie tylko rejestr transakcji',
        body: 'Ethereum przejęło od Bitcoina ideę wspólnego, odpornego na manipulacje rejestru i rozbudowało ją: powstał globalny, programowalny komputer, na którym każdy może tworzyć aplikacje, a żadna pojedyncza strona nie może go wyłączyć.',
      },
      {
        title: 'Zabezpieczone przez staking, a nie kopanie',
        body: 'Od czasu „The Merge” w 2022 roku Ethereum jest zabezpieczone mechanizmem Proof-of-Stake zamiast energochłonnego kopania – walidatorzy narażają swoje ETH jako zabezpieczenie zamiast spalać prąd, żeby rywalizować o bloki.',
      },
      {
        title: 'Otwarty i bez zezwoleń',
        body: 'Nikt nie zatwierdza twojego konta. Każdy, gdziekolwiek się znajduje, może posiadać ETH lub tworzyć aplikacje na Ethereum – te same zasady obowiązują wszystkich, w tym największe instytucje.',
      },
      {
        title: 'Standard, na którym opierają się inne sieci',
        body: 'Sieci warstwy drugiej, takie jak Arbitrum, Base i Optimism – wszystkie obsługiwane przez wwwallet – rozszerzają bezpieczeństwo sieci Ethereum, umożliwiając szybsze i tańsze transakcje, zamiast zaczynać wszystko od zera.',
      },
    ],
    linkLabel: 'Więcej informacji znajdziesz na stronie Fundacji Ethereum',
    linkUrl: 'https://ethereum.org/en/foundation/',
  },
  crypto: {
    eyebrow: 'Kryptowaluty',
    heading: 'Kryptowaluty w prostych słowach',
    lede: 'Kilka pojęć, które warto zrozumieć, zanim zaczniesz samodzielnie przechowywać kryptowaluty – nie tylko w wwwallet.',
    points: [
      {
        title: 'Portfele powiernicze a portfele niepowiernicze',
        body: 'Portfel powierniczy lub giełda przechowuje twoje klucze za ciebie – to wygodne, ale musisz zaufać, że nikt nie zablokuje, nie zgubi ani nie nadużyje twoich środków. Portfel niepowierniczy, taki jak wwwallet, pozostawia klucze i całą odpowiedzialność wyłącznie w twoich rękach.',
      },
      {
        title: 'Staking a wydobywanie',
        body: 'Wydobywanie w modelu Proof-of-Work zabezpiecza łańcuch bloków za pomocą surowej mocy obliczeniowej i energii elektrycznej. Model Proof-of-Stake zabezpiecza go natomiast za pomocą kapitału narażonego na ryzyko. Przejście Ethereum na staking zmniejszyło zużycie energii o ponad 99,9% — to mniej więcej różnica między zasilaniem małego kraju a małego miasteczka.',
      },
      {
        title: 'Poza Ethereum',
        body: 'Bitcoin stawia prostotę i przewidywalność ponad programowalnością. Łańcuchy takie jak Solana dążą do maksymalnej przepustowości, często poświęcając przy tym decentralizację. Ethereum stawia przede wszystkim na decentralizację i bezpieczeństwo, a kwestie szybkości i kosztów pozostawia sieciom warstwy drugiej (Layer-2) zbudowanym na jego bazie.',
      },
      {
        title: 'Żadna wiarygodna osoba nie prosi cię o podanie tej frazy',
        body: 'Żadna giełda, żaden pracownik obsługi klienta ani nikt z wwwallet nigdy nie poprosi cię o podanie frazy odzyskiwania – niezależnie od tego, z jakiej aplikacji korzystasz. Każdy, kto to robi, próbuje cię okraść.',
      },
    ],
    linkLabel: 'Dowiedz się więcej dzięki podcastowi Bankless',
    linkUrl: 'https://www.bankless.com/',
  },
  faqs: {
    eyebrow: 'Często zadawane pytania',
    heading: 'Często zadawane pytania',
    items: [
      {
        q: 'Czy wwwallet jest naprawdę darmowy?',
        a: 'Tak. Korzystanie z aplikacji jest bezpłatne, nie ma wersji premium ani żadnych treści za paywallem, a wwwallet nie dolicza żadnych opłat do wysyłanych ani wymienianych środków. Jedynym nieuniknionym kosztem jest opłata transakcyjna (gas) sieci, która trafia do sieci, a nie do wwwallet. Notowania wymiany pochodzą z agregatora giełd 0x (lub LI.FI w sieciach, których 0x nie obsługuje), który może naliczać własną opłatę przy niektórych transakcjach – każda taka opłata jest widoczna na ekranie podsumowania przed potwierdzeniem.',
      },
      {
        q: 'Czy są tam reklamy, trackery lub narzędzia analityczne?',
        a: 'Nie. wwwallet nie wyświetla reklam, nie uruchamia skryptów analitycznych ani śledzących i nie tworzy twojego profilu. Nie ma tu konta, więc nie ma do czego go przypisać.',
      },
      {
        q: 'Czy potrzebuję konta lub dowodu tożsamości, żeby z tego korzystać?',
        a: 'Nie. Nie ma rejestracji, adresu e-mail, numeru telefonu ani weryfikacji tożsamości – po prostu tworzysz portfel na swoim urządzeniu i zaczynasz z niego korzystać.',
      },
      {
        q: 'Skoro to jest za darmo, to jak wwwallet się finansuje?',
        a: 'Aplikacja nie zarabia na użytkownikach – żadnych opłat, żadnych reklam, żadnej sprzedaży danych. Koszty eksploatacji są z założenia niskie: sama aplikacja działa w przeglądarce, a serwer przesyła jedynie publiczne dane z łańcucha bloków i informacje o cenach.',
      },
      {
        q: 'Czy ktoś może zablokować mój portfel?',
        a: 'Nie ma tu żadnego konta, więc wwwallet – ani nikt inny – nie ma czego zamrozić. Twoje klucze nigdy nie opuszczają twojego urządzenia, a transakcje są tam podpisywane, zanim trafią do sieci. Twoje środki znajdują się w sieci Ethereum, a nie w wwwallet: możesz wyświetlić klucz prywatny lub frazę odzyskiwania dowolnego konta z jego menu i zaimportować je do dowolnej innej aplikacji portfela Ethereum, kiedy tylko chcesz.',
      },
      {
        q: 'Czy moja fraza odzyskiwania wystarczy, żeby odzyskać portfel?',
        a: 'Nie działa samodzielnie. Twoja fraza odzyskiwania odblokowuje zaszyfrowany sejf, ale sam sejf znajduje się wyłącznie na twoim urządzeniu. Jeśli zgubisz lub wyczyścisz to urządzenie bez wykonania kopii zapasowej, fraza nie będzie miała czego odblokować. Zawsze łącz swoją frazę odzyskiwania z kopią zapasową na Dysku Google lub w pliku – zobacz następne pytanie.',
      },
      {
        q: 'Jak wykonać kopię zapasową mojego portfela?',
        a: 'W Ustawieniach zrób kopię zapasową swojego zaszyfrowanego sejfu na własnym Dysku Google albo jako plik, który pobierzesz i zachowasz samodzielnie. Kopia zapasowa na Dysku trafia do prywatnego folderu aplikacji, a wwwallet nie ma wglądu w żadne inne pliki na Twoim Dysku. Zrób kopię zapasową przy pierwszej konfiguracji, a potem za każdym razem, gdy dodasz nowe konta.',
      },
      {
        q: 'Czy mogę korzystać z wwwallet na więcej niż jednym urządzeniu?',
        a: 'Tak, ale nie synchronizuje się automatycznie – każde urządzenie ma swój własny lokalny sejf. Żeby używać wwwallet na nowym urządzeniu, przywróć je stamtąd z Dysku lub kopii zapasowej pliku, a potem odblokuj za pomocą frazy odzyskiwania.',
      },
      {
        q: 'Co się stanie, jeśli zgubię urządzenie i nigdy nie zrobiłem kopii zapasowej?',
        a: 'Twoich środków nie da się odzyskać. Tak zostało zaprojektowane: wwwallet nie ma systemu kont i nigdzie nie przechowuje kopii twojego skarbca, więc nikt – w tym my – nie może go dla ciebie przywrócić. To cena, jaką płacisz za klucze, do których nikt oprócz ciebie nie ma dostępu.',
      },
      {
        q: 'Czy klucze dostępu (Face ID / Touch ID) przenoszą się na nowe urządzenie?',
        a: 'Nie. Hasło dostępu jest powiązane z urządzeniem, na którym zostało utworzone. Po przywróceniu kopii zapasowej na nowym urządzeniu odblokuj je za pomocą frazy odzyskiwania, a następnie ustaw tam nowe hasło dostępu.',
      },
      {
        q: 'Czy wwwallet jest oprogramowaniem open source?',
        a: 'Nie — kod źródłowy jest dostępny. Pełny kod źródłowy jest publicznie dostępny na GitHubie, więc każdy może go przeczytać, przejrzeć i zweryfikować, ale nie jest to oprogramowanie open source: kod jest objęty licencją PolyForm Strict License 1.0.0.',
      },
      {
        q: 'Co mogę robić z tym kodem?',
        a: 'Możesz to wszystko przeczytać i sprawdzić, a także uruchomić niezmodyfikowaną kopię do celów niekomercyjnych, takich jak nauka, badania i testowanie. Nie możesz tego rozpowszechniać, modyfikować ani tworzyć dzieł pochodnych (w tym forków), ani wykorzystywać tego komercyjnie. Jeśli potrzebujesz czegoś, na co licencja nie pozwala, skontaktuj się z właścicielem praw autorskich w sprawie osobnej licencji.',
      },
      {
        q: 'Czy korzystanie z wwwallet jest bezpieczne? Czy jest jakaś gwarancja?',
        a: 'wwwallet to oprogramowanie bez powiernictwa udostępniane „tak jak jest”, bez żadnej gwarancji. Tylko ty kontrolujesz swoje klucze i środki – nikt, w tym my, nie może odzyskać utraconej frazy odzyskiwania ani kopii zapasowej, cofnąć transakcji ani zrekompensować ci strat. Korzystaj wyłącznie ze środków, na których utratę możesz sobie pozwolić, dokładnie sprawdzaj adresy i sieci przed wysłaniem, a żadna z informacji tutaj nie stanowi porady finansowej, inwestycyjnej, prawnej ani podatkowej.',
      },
      {
        q: 'Jakie sieci obsługuje wwwallet?',
        a: 'Sieć główna Ethereum, a także Arbitrum, Base, Optimism, Polygon, Robinhood Chain, World Chain, Ink, Linea, Gnosis, Celo, ZKsync Era, Ronin, Unichain i Scroll — wszystko z tego samego zestawu kont.',
      },
      {
        q: 'Jak doładować portfel?',
        a: 'Załóż konto, wybierz „Wyświetl kod QR”, żeby zobaczyć adres, a potem wyślij środki na ten adres z giełdy lub innego portfela. Upewnij się, że wysyłasz środki w odpowiedniej sieci (np. Ethereum, Base lub Arbitrum) – ten sam adres działa w każdej obsługiwanej sieci, ale środki wysłane w jednej sieci pojawiają się tylko w tej sieci. Będziesz też potrzebować trochę natywnej monety sieci (np. ETH), żeby opłacić prowizje transakcyjne.',
      },
      {
        q: 'Co mogę zrobić z wwwallet?',
        a: 'Wyślij: przelej ETH lub dowolny token na adres, który wkleisz, zeskanujesz z kodu QR lub wybierzesz ze swoich kont, a przed potwierdzeniem sprawdź szczegóły. Wymiana: wymień jeden token na inny w tej samej sieci w zakładce „Wymiana”, gdzie od razu widzisz kurs i szacunkową opłatę. Odbiór: pokaż swój adres jako kod QR. Możesz też sprawdzić swoje salda w dolarach amerykańskich oraz historię transakcji we wszystkich obsługiwanych sieciach.',
      },
      {
        q: 'Co wwwallet wie o mnie?',
        a: 'Nie podawaj niczego, co mogłoby Cię zidentyfikować. Nie ma tu żadnego konta, logowania ani bazy danych. Dane o saldzie i cenach są pobierane przez własny serwer wwwallet, a nie przez przeglądarkę łączącą się bezpośrednio z zewnętrznymi dostawcami, a ten serwer nigdy nie ma wglądu w Twoje klucze, hasła ani frazę odzyskiwania.',
      },
    ],
  },
  footer: {
    tagline: 'Darmowy, niepowierniczy portfel Ethereum dla każdego.',
    copyright: '© {year} wwwallet',
    licenseLink: 'Na licencji PolyForm Strict 1.0.0',
    disclaimer:
      'Oprogramowanie bez powiernictwa udostępniane jest „tak jak jest”, bez gwarancji. To nie jest porada finansowa. Wy sam ponosisz pełną odpowiedzialność za swoje klucze i środki.',
  },
  principles: {
    eyebrow: 'Zasady',
    heading: 'Bezpłatna, otwarta i stworzona dla każdego',
    lede: 'Oprogramowanie, które przechowuje twoje pieniądze, powinno być narzędziem, z którego korzystasz, a nie biznesem zbudowanym na koszt użytkowników. To właśnie te zasady leżą u podstaw działania wwwallet.',
    items: [
      {
        title: 'Za darmo, bez żadnych haczyków',
        body: 'Żadnych cen, żadnych planów premium, żadnych płatnych funkcji. wwwallet nie nalicza żadnych własnych opłat – jedynym kosztem jest opłata transakcyjna sieci.',
      },
      {
        title: 'Żadnych reklam, żadnego śledzenia',
        body: 'Żadnych reklam, żadnych narzędzi analitycznych, żadnych skryptów śledzących i żadnych danych sprzedawanych komukolwiek. Po pierwsze, nie ma żadnego twojego profilu, który można by sprzedać.',
      },
      {
        title: 'Bez rejestracji',
        body: 'Nie ma sprawdzania adresu e-mail, numeru telefonu ani tożsamości. Otwórz aplikację, stwórz portfel i gotowe.',
      },
      {
        title: 'Twoje klucze pozostają u ciebie',
        body: 'Klucze są tworzone i szyfrowane na twoim urządzeniu i nigdy go nie opuszczają. wwwallet nie ma do nich wglądu, nie może przenosić twoich środków ani zablokować ci dostępu.',
      },
      {
        title: 'Działa wszędzie',
        body: 'Działa w każdej nowoczesnej przeglądarce na telefonie lub komputerze i instaluje się jak aplikacja – nie potrzebujesz konta w sklepie z aplikacjami.',
      },
      {
        title: 'W 31 językach',
        body: 'Używaj tego w języku, w którym czujesz się najlepiej, w trybie jasnym lub ciemnym.',
      },
      {
        title: 'Kod w otwartym dostępie',
        body: 'Pełny kod źródłowy jest opublikowany, żeby każdy mógł go przeczytać i sprawdzić. Jest to kod dostępny, a nie open source – w sekcji FAQ wyjaśniono, na co pozwala licencja.',
      },
      {
        title: 'Nie ma co wyłączać',
        body: 'Nie ma tu żadnego konta, które ktoś mógłby zablokować. Twoje środki znajdują się bezpośrednio w sieci Ethereum, a klucz do każdego konta można w dowolnym momencie przenieść do innego portfela.',
      },
    ],
  },
  license: {
    title: 'Licencja',
    close: 'Zamknij',
    summaryTitle: 'Prostym językiem',
    canUse: 'Możesz korzystać z wwwallet za darmo, do celów osobistych i innych niekomercyjnych.',
    canRead: 'Możesz przeczytać i sprawdzić każdy wiersz kodu źródłowego.',
    cannot: 'Nie możesz tego kopiować, zmieniać, rozpowszechniać ani sprzedawać.',
    englishNote:
      'Poniżej znajduje się pełna treść licencji w oryginalnej wersji angielskiej – jest to tekst prawny.',
    viewSource: 'Zobacz źródło na GitHubie',
  },
  meta: {
    title: 'wwwallet — Darmowy, niepowierniczy portfel Ethereum',
    description:
      'Darmowy portfel Ethereum w przeglądarce. Bez rejestracji, bez reklam, bez śledzenia — twoje klucze pozostają zaszyfrowane na twoim urządzeniu. Ethereum, Base, Arbitrum, Optimism, Polygon i 10 innych sieci.',
  },
}
