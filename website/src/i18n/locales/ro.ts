export default {
  nav: {
    wallet: 'Portofel',
    ethereum: 'Ethereum',
    crypto: 'Criptomonede',
    faqs: 'Întrebări frecvente',
    launch: 'Pornește Wallet',
    home: 'Înapoi la începutul paginii',
    sectionNavLabel: 'Navigare în secțiuni',
    principles: 'Principii',
  },
  settings: {
    open: 'Setări',
    close: 'Închide setările',
    theme: 'Tema',
    themeLight: 'Lumină',
    themeDark: 'Întuneric',
    language: 'Limba',
    search: 'Căutare',
    noMatches: 'Nu s-au găsit rezultate',
  },
  hero: {
    eyebrow: 'Un portofel Ethereum gratuit, fără custodie',
    heading1: 'Cheile tale.',
    heading2: 'Dispozitivul dumneavoastră.',
    heading3: 'Gratuit pentru toată lumea.',
    lede: 'wwwallet rulează în browserul tău și îți păstrează cheile criptate pe propriul tău dispozitiv. Nu trebuie să-ți creezi un cont, nu trebuie să plătești nimic și nu există reclame — este pur și simplu un portofel care funcționează la fel pentru toată lumea.',
    ctaPrimary: 'Pornește Wallet',
    ctaSecondary: 'Vezi cum funcționează',
    note: 'Fără înregistrare · Fără reclame · Fără urmărire · 31 de limbi',
  },
  wallet: {
    eyebrow: 'Portofel',
    heading: 'Conceput astfel încât numai tu să-l poți deschide',
    lede: 'wwwallet nu îți păstrează fondurile — te ajută să le gestionezi singur. Iată ce înseamnă asta în practică.',
    points: [
      {
        title: 'Fără custodie, întotdeauna',
        body: 'Cheile tale private sunt generate și criptate pe propriul tău dispozitiv. Serverele wwwallet nu le accesează niciodată — nu există nicio bază de date cu portofele care să poată fi compromisă, deoarece nu există nicio bază de date.',
      },
      {
        title: 'Criptat cu AES-256, deblocat după cum doriți',
        body: 'Seiful dvs. este protejat prin criptare AES-256-GCM. Deblocați-l folosind fraza de recuperare sau activați o metodă de autentificare — Face ID, Touch ID sau Windows Hello — pentru un acces rapid, exclusiv local.',
      },
      {
        title: 'Se blochează automat',
        body: 'wwwallet se blochează după o scurtă perioadă de inactivitate și nu salvează niciodată pe disc sesiunea ta deblocată — dacă închizi fila, aplicația uită totul, în mod intenționat.',
      },
      {
        title: 'Un singur portofel, cinci rețele Ethereum',
        body: 'Dețineți și efectuați transferuri prin rețeaua principală Ethereum, Polygon, Arbitrum, Base și Optimism folosind același set de conturi.',
      },
    ],
    caveatTitle: 'Fraza de recuperare îți deblochează seiful — nu este o copie de rezervă magică',
    caveatBody:
      'Păstrează fraza de recuperare într-un loc sigur, dar fă și o copie de rezervă pe Google Drive sau într-un fișier. Vei avea nevoie de copia de rezervă pentru a-ți restaura portofelul pe un dispozitiv nou, iar de fraza de recuperare pentru a-l debloca odată ce ai făcut asta.',
    caveatLink: 'Află mai multe în secțiunea „Întrebări frecvente”',
  },
  ethereum: {
    eyebrow: 'Ethereum',
    heading: 'De ce Ethereum?',
    lede: 'wwwallet este conceput special pentru Ethereum. Iată, pe scurt, de ce.',
    points: [
      {
        title: 'Un computer mondial, nu doar un registru contabil',
        body: 'Ethereum a preluat ideea lui Bitcoin privind un registru comun, protejat împotriva falsificării, și a extins-o: un computer global, programabil, pe care oricine poate construi aplicații și pe care nicio entitate nu îl poate opri.',
      },
      {
        title: 'Securizat prin staking, nu prin minerit',
        body: 'De la „The Merge” din 2022, Ethereum este securizat prin mecanismul Proof-of-Stake, în locul mineritului cu consum ridicat de energie — validatorii își pun ETH-ul în joc ca garanție, în loc să consume energie electrică pentru a concura pentru blocuri.',
      },
      {
        title: 'Deschis și fără autorizare',
        body: 'Nimeni nu îți aprobă contul. Oricine, de oriunde, poate deține ETH sau poate dezvolta o aplicație pe Ethereum — aceleași reguli se aplică tuturor, inclusiv celor mai mari instituții.',
      },
      {
        title: 'Standardul pe care se bazează celelalte rețele',
        body: 'Rețelele de nivel 2, precum Arbitrum, Base și Optimism — toate acceptate de wwwallet — extind securitatea Ethereum la tranzacții mai rapide și mai ieftine, fără a fi nevoie să se pornească de la zero.',
      },
    ],
    linkLabel: 'Află mai multe pe site-ul Fundației Ethereum',
    linkUrl: 'https://ethereum.org/en/foundation/',
  },
  crypto: {
    eyebrow: 'Criptomonede',
    heading: 'Criptomonedele, pe înțelesul tuturor',
    lede: 'Câteva noțiuni pe care merită să le înțelegi înainte de a deține criptomonede — nu doar prin intermediul wwwallet.',
    points: [
      {
        title: 'Cu custodie vs. fără custodie',
        body: 'Un portofel cu custodie sau o platformă de schimb îți păstrează cheile — este convenabil, dar trebuie să ai încredere că altcineva nu îți va îngheța, pierde sau folosi în mod abuziv fondurile. Un portofel fără custodie, precum wwwallet, îți pune cheile — și responsabilitatea — exclusiv în mâinile tale.',
      },
      {
        title: 'Staking vs. minerit',
        body: 'Mineritul de tip „Proof-of-Work” asigură securitatea unui blockchain prin puterea de calcul brută și consumul de energie electrică. În schimb, „Proof-of-Stake” asigură securitatea acestuia prin capitalul expus riscului. Trecerea Ethereum la staking a redus consumul de energie cu peste 99,9% — aproximativ diferența dintre alimentarea cu energie a unei țări mici și a unui oraș mic.',
      },
      {
        title: 'Dincolo de Ethereum',
        body: 'Bitcoin acordă prioritate simplității și previzibilității în detrimentul programabilității. Lanțuri precum Solana pun accentul pe capacitatea brută de procesare, adesea sacrificând descentralizarea pentru a atinge acest obiectiv. Ethereum pune pe primul plan descentralizarea și securitatea, lăsând viteza și costurile în seama rețelelor de nivel 2 construite pe baza sa.',
      },
      {
        title: 'Nimeni care acționează în mod legitim nu îți cere parola',
        body: 'Indiferent de portofelul pe care îl folosești: nici platforma de schimb, nici un agent de asistență și niciun angajat al wwwallet nu îți va cere vreodată fraza de recuperare. Oricine face acest lucru încearcă să te jefuiască.',
      },
    ],
    linkLabel: 'Află mai multe ascultând podcastul Bankless',
    linkUrl: 'https://www.bankless.com/',
  },
  faqs: {
    eyebrow: 'Întrebări frecvente',
    heading: 'Întrebări frecvente',
    items: [
      {
        q: 'wwwallet este într-adevăr gratuit?',
        a: 'Da. Utilizarea serviciului este gratuită, nu există un nivel premium și nimic nu este accesibil doar contra cost, iar wwwallet nu adaugă niciun comision la tranzacțiile pe care le efectuați sau la schimburile pe care le faceți. Singurul cost inevitabil este comisionul de tranzacție (gas) al rețelei, care revine rețelei, nu wwwallet. Cotațiile de schimb provin de la agregatorul de burse 0x, care poate include propria taxă la unele tranzacții — orice astfel de taxă este afișată pe ecranul de verificare înainte de a confirma.',
      },
      {
        q: 'Există reclame, dispozitive de urmărire sau instrumente de analiză?',
        a: 'Nu. wwwallet nu afișează reclame, nu rulează scripturi de analiză sau de urmărire și nu creează un profil al utilizatorului. Nu există cont, așa că nu există nimic la care să se poată atașa unul.',
      },
      {
        q: 'Am nevoie de un cont sau de un act de identitate pentru a-l folosi?',
        a: 'Nu. Nu este necesară nicio înregistrare, nicio adresă de e-mail, niciun număr de telefon și nicio verificare a identității — îți creezi un portofel pe dispozitivul tău și începi să-l folosești.',
      },
      {
        q: 'Dacă este gratuit, cum își acoperă wwwallet costurile?',
        a: 'Nu generează venituri de la utilizatori — fără comisioane, fără reclame, fără vânzarea datelor. Costurile de funcționare sunt menținute la un nivel redus prin însăși concepția sa: portofelul în sine funcționează în browserul tău, iar sistemul backend se limitează la transmiterea datelor publice din blockchain și a celor referitoare la prețuri.',
      },
      {
        q: 'Poate cineva să-mi blocheze portofelul?',
        a: 'Nu există niciun cont, așa că wwwallet — sau oricine altcineva — nu are ce să blocheze. Cheile tale nu părăsesc niciodată dispozitivul tău, iar tranzacțiile sunt semnate acolo înainte de a fi trimise în rețea. Fondurile tale se află pe Ethereum, nu în wwwallet: poți vizualiza cheia privată sau fraza de recuperare a oricărui cont din meniul acestuia și o poți importa într-un alt portofel Ethereum oricând dorești.',
      },
      {
        q: 'Este suficientă fraza mea de recuperare pentru a-mi recupera portofelul?',
        a: 'Nu de una singură. Fraza de recuperare deblochează seiful tău criptat, dar seiful în sine se află doar pe dispozitivul tău. Dacă pierzi sau ștergi datele de pe acel dispozitiv fără să fi făcut vreodată o copie de rezervă, nu mai rămâne nimic pe care fraza să îl poată debloca. Asigură-te întotdeauna că ai o copie de rezervă a frazei de recuperare pe Google Drive sau într-un fișier — vezi următoarea întrebare.',
      },
      {
        q: 'Cum pot face o copie de rezervă a portofelului meu?',
        a: 'Din secțiunea „Setări”, faceți o copie de rezervă a seifului dvs. criptat pe propriul Google Drive — stocată într-un dosar privat, accesibil doar din aplicație, al cărui conținut nu poate fi vizualizat de wwwallet — sau sub forma unui fișier pe care îl descărcați și îl păstrați personal. Efectuați această operațiune de fiecare dată când configurați un portofel sau adăugați conturi noi.',
      },
      {
        q: 'Pot folosi wwwallet pe mai multe dispozitive?',
        a: 'Da, dar nu se sincronizează automat — fiecare dispozitiv are propriul seif local. Pentru a utiliza wwwallet pe un dispozitiv nou, restaurează-l de pe Drive sau dintr-o copie de rezervă a fișierelor, apoi deblochează-l folosind fraza de recuperare.',
      },
      {
        q: 'Ce se întâmplă dacă îmi pierd dispozitivul și nu am făcut niciodată o copie de rezervă?',
        a: 'Fondurile tale nu pot fi recuperate. Așa a fost conceput: wwwallet nu dispune de un sistem de conturi și nu păstrează nicăieri o copie a seifului tău, așa că nimeni — nici măcar noi — nu ți-l poate restaura. Acesta este compromisul pe care îl presupune un portofel la care nimeni în afară de tine nu are acces.',
      },
      {
        q: 'Se transferă codurile de acces (Face ID / Touch ID) pe un dispozitiv nou?',
        a: 'Nu. Parola este asociată dispozitivului pe care a fost creată. După ce restaurați o copie de rezervă pe un dispozitiv nou, deblocați-l folosind fraza de recuperare și veți putea configura o nouă parolă pe acel dispozitiv.',
      },
      {
        q: 'wwwallet este un proiect open source?',
        a: 'Nu — este disponibil codul sursă. Codul sursă complet este public pe GitHub, astfel încât oricine îl poate citi, revizui și verifica, dar nu este open source: codul este licențiat sub PolyForm Strict License 1.0.0.',
      },
      {
        q: 'Ce am voie să fac cu codul?',
        a: 'Puteți citi și verifica întregul conținut și puteți rula o copie nemodificată în scopuri necomerciale, cum ar fi studiul personal, cercetarea și testarea. Nu aveți dreptul să o distribuiți, să o modificați sau să creați opere derivate (inclusiv ramificații) și nici să o utilizați în scopuri comerciale. Dacă aveți nevoie de ceva ce licența nu permite, contactați deținătorul drepturilor de autor pentru a obține o licență separată.',
      },
      {
        q: 'Este sigur să folosești wwwallet? Există vreo garanție?',
        a: 'wwwallet este un software fără custodie, furnizat „așa cum este”, fără niciun fel de garanție. Numai dumneavoastră dețineți controlul asupra cheilor și fondurilor dumneavoastră — nimeni, inclusiv noi, nu poate recupera o frază de recuperare sau o copie de rezervă pierdută, nu poate anula o tranzacție și nu vă poate despăgubi pentru pierderi. Folosiți numai fonduri pe care vă puteți permite să le pierdeți, verificați de două ori adresele și rețelele înainte de a efectua o tranzacție, iar nimic din ceea ce este prezentat aici nu constituie consultanță financiară, de investiții, juridică sau fiscală.',
      },
      {
        q: 'Ce rețele suportă wwwallet?',
        a: 'Rețeaua principală Ethereum, precum și rețelele Layer-2 Polygon, Arbitrum, Base și Optimism — toate din același set de conturi.',
      },
      {
        q: 'Cum pot alimenta portofelul meu?',
        a: 'Deschideți un cont, selectați „Vizualizați codul QR” pentru a vedea adresa acestuia și trimiteți fonduri către acea adresă de pe o platformă de schimb sau dintr-un alt portofel. Asigură-te că trimiți pe rețeaua corectă (Ethereum, Polygon, Arbitrum, Base sau Optimism) — aceeași adresă funcționează pe toate, dar fondurile trimise pe o rețea apar doar pe rețeaua respectivă. De asemenea, vei avea nevoie de o cantitate mică din moneda nativă a rețelei (cum ar fi ETH) pentru a plăti comisioanele de tranzacție.',
      },
      {
        q: 'Ce pot face cu wwwallet?',
        a: 'Trimitere: transferați ETH sau orice alt token către o adresă pe care o introduceți, o scanați dintr-un cod QR sau o selectați din propriile conturi, apoi verificați detaliile înainte de a confirma. Schimb: schimbați un token cu altul pe aceeași rețea din fila „Schimb”, cu afișarea în avans a cotației și a estimării comisioanelor. Primire: afișați-vă adresa sub formă de cod QR. De asemenea, poți vedea soldurile tale exprimate în USD și istoricul tranzacțiilor pe toate rețelele acceptate.',
      },
      {
        q: 'Ce știe wwwallet despre mine?',
        a: 'Nimic care să vă identifice. Nu există cont, dată de autentificare sau bază de date. Datele privind soldul și prețurile sunt preluate prin intermediul sistemului backend propriu al wwwallet, fără ca browserul dvs. să apeleze direct la furnizori terți, iar acest sistem backend nu are niciodată acces la cheile dvs., parolele sau fraza de recuperare.',
      },
    ],
  },
  footer: {
    tagline: 'Un portofel Ethereum gratuit și fără custodie, accesibil tuturor.',
    copyright: '© {year} wwwallet',
    licenseLink: 'Licențiat sub licența PolyForm Strict 1.0.0',
    disclaimer:
      'Software-ul fără custodie este furnizat „așa cum este”, fără garanție. Nu constituie consultanță financiară. Sunteți singurul responsabil pentru cheile și fondurile dumneavoastră.',
  },
  principles: {
    eyebrow: 'Principii',
    heading: 'Gratuit, deschis și creat pentru oricine',
    lede: 'Un portofel ar trebui să fie un instrument pe care îl folosești, nu o afacere construită pe seama utilizatorilor săi. Acestea sunt angajamentele pe care se bazează wwwallet.',
    items: [
      {
        title: 'Gratuit, fără nicio condiție ascunsă',
        body: 'Fără preț, fără abonament premium, fără funcții cu plată. wwwallet nu percepe comisioane proprii — singurul cost este comisionul de tranzacție al rețelei.',
      },
      {
        title: 'Fără reclame, fără urmărire',
        body: 'Fără reclame, fără instrumente de analiză, fără scripturi de urmărire și fără vânzarea datelor către nimeni. În primul rând, nu există niciun profil al tău care să poată fi vândut.',
      },
      {
        title: 'Fără înregistrare',
        body: 'Nu este necesară verificarea adresei de e-mail, a numărului de telefon sau a actului de identitate. Deschide aplicația, creează-ți un portofel și ești gata.',
      },
      {
        title: 'Cheile rămân la dumneavoastră',
        body: 'Cheile sunt generate și criptate pe dispozitivul tău și nu părăsesc niciodată acesta. wwwallet nu le poate vedea, nu îți poate muta fondurile și nu îți poate bloca accesul.',
      },
      {
        title: 'Funcționează oriunde',
        body: 'Funcționează în orice browser modern, pe telefon sau pe computer, și se instalează ca o aplicație — nu este nevoie de un cont în magazinul de aplicații.',
      },
      {
        title: 'În 31 de limbi',
        body: 'Folosește-l în limba cu care te simți cel mai confortabil, în modul luminos sau întunecat.',
      },
      {
        title: 'Cod deschis',
        body: 'Codul sursă complet este publicat, pentru ca oricine să îl poată citi și verifica. Este vorba mai degrabă de un cod sursă disponibil decât de unul cu sursă deschisă — secțiunea de întrebări frecvente explică ce permite licența.',
      },
      {
        title: 'Nu e nimic de oprit',
        body: 'Nu există niciun cont care să poată fi blocat. Fondurile tale se află direct pe rețeaua Ethereum, iar cheia oricărui cont poate fi transferată în orice moment într-un alt portofel.',
      },
    ],
  },
  license: {
    title: 'Licență',
    close: 'Închide',
    summaryTitle: 'Pe înțelesul tuturor',
    canUse:
      'Puteți utiliza wwwallet gratuit, în scopuri personale și în alte scopuri necomerciale.',
    canRead: 'Puteți citi și verifica fiecare linie din codul sursă al acestuia.',
    cannot: 'Nu aveți voie să o copiați, să o modificați, să o redistribuiți sau să o vindeți.',
    englishNote:
      'În continuare este prezentată licența integrală, în limba engleză originală — acesta este textul juridic.',
    viewSource: 'Vizualizare pe GitHub',
  },
}
