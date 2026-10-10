export default {
  nav: {
    wallet: 'wwwallet',
    ethereum: 'Ethereum',
    crypto: 'Criptomonede',
    faqs: 'Întrebări frecvente',
    launch: 'Lansați wwwallet',
    home: 'Înapoi sus',
    sectionNavLabel: 'Navigare în secțiuni',
    principles: 'Principii',
  },
  settings: {
    open: 'Setări',
    close: 'Închide setările',
    theme: 'Tema',
    themeLight: 'Ușor',
    themeDark: 'Dark',
    language: 'Limba',
    search: 'Căutare',
    noMatches: 'Nu s-au găsit rezultate',
    version: 'Versiunea {version}',
  },
  hero: {
    eyebrow: 'Un portofel Ethereum gratuit și fără custodie',
    heading1: 'Cheile tale.',
    heading2: 'Dispozitivul dumneavoastră.',
    heading3: 'Gratuit pentru toată lumea.',
    lede: 'wwwallet rulează în browserul dvs. și vă păstrează cheile criptate pe propriul dispozitiv. Nu este nevoie să creați un cont, nu trebuie să plătiți nimic și nu există reclame, iar aplicația funcționează la fel pentru toată lumea.',
    ctaPrimary: 'Lansați wwwallet',
    ctaSecondary: 'Vedeți cum funcționează',
    note: 'Fără înregistrare · Fără reclame · Fără urmărire · 31 de limbi',
  },
  wallet: {
    eyebrow: 'wwwallet',
    heading: 'Conceput astfel încât numai tu să îl poți deschide',
    lede: 'wwwallet nu vă păstrează fondurile — vă ajută să le păstrați singuri. Iată ce înseamnă asta în practică.',
    points: [
      {
        title: 'Fără custodie, întotdeauna',
        body: 'Cheile dvs. private sunt generate și criptate pe propriul dispozitiv. Serverele wwwallet nu le văd niciodată — nu există o bază de date cu chei care să poată fi compromisă, deoarece nu există deloc o bază de date.',
      },
      {
        title: 'Criptat cu AES-256, deblocat după cum doriți',
        body: 'Seiful dvs. este protejat cu criptare AES-256-GCM. Deblocați-l cu fraza de recuperare sau activați o cheie de acces — Face ID, Touch ID sau Windows Hello — pentru un acces rapid, exclusiv local.',
      },
      {
        title: 'Se blochează automat',
        body: 'wwwallet se blochează după o scurtă perioadă de inactivitate și nu salvează niciodată sesiunea dvs. deblocată pe disc — închideți fila și aplicația uită, în mod intenționat.',
      },
      {
        title: 'Cincisprezece rețele Ethereum, un singur set de conturi',
        body: 'Dețineți și trimiteți prin rețeaua principală Ethereum și alte 14 rețele — inclusiv Arbitrum, Base, Optimism, Polygon, Linea și ZKsync — folosind aceleași conturi și adrese.',
      },
    ],
    caveatTitle:
      'Fraza ta de recuperare îți deblochează seiful — nu este o copie de rezervă magică',
    caveatBody:
      'Salvați fraza de recuperare într-un loc sigur, dar faceți și o copie de rezervă pe Google Drive sau într-un fișier. Veți avea nevoie de copia de rezervă pentru a vă restaura portofelul pe un dispozitiv nou, iar de fraza de recuperare pentru a-l debloca odată ce ați făcut acest lucru.',
    caveatLink: 'Citiți mai multe în secțiunea Întrebări frecvente',
  },
  ethereum: {
    eyebrow: 'Ethereum',
    heading: 'De ce Ethereum',
    lede: 'wwwallet este conceput special pentru Ethereum. Iată argumentele în favoarea sa, în termeni simpli.',
    points: [
      {
        title: 'Un computer mondial, nu doar un registru',
        body: 'Ethereum a preluat ideea Bitcoin de registru partajat și protejat împotriva falsificării și a extins-o: un computer global, programabil, pe care oricine poate construi, și pe care nicio parte nu îl poate opri.',
      },
      {
        title: 'Securizat prin staking, nu prin minerit',
        body: 'De la „The Merge” din 2022, Ethereum este securizat prin Proof-of-Stake, în loc de mineritul care consumă multă energie — validatorii își pun ETH-ul în risc ca garanție, în loc să consume energie electrică pentru a concura pentru blocuri.',
      },
      {
        title: 'Deschis și fără permisiuni',
        body: 'Nimeni nu vă aprobă contul. Oricine, de oriunde, poate deține ETH sau poate crea o aplicație pe Ethereum — aceleași reguli se aplică tuturor, inclusiv celor mai mari instituții.',
      },
      {
        title: 'Standardul pe care se bazează alte rețele',
        body: 'Rețelele de nivel 2, precum Arbitrum, Base și Optimism — toate suportate de wwwallet — extind securitatea Ethereum la tranzacții mai rapide și mai ieftine, în loc să pornească de la zero.',
      },
    ],
    linkLabel: 'Citiți mai multe pe site-ul Fundației Ethereum',
    linkUrl: 'https://ethereum.org/en/foundation/',
  },
  crypto: {
    eyebrow: 'Criptomonede',
    heading: 'Criptomonedele, în termeni simpli',
    lede: 'Câteva noțiuni pe care merită să le înțelegeți înainte de a deține criptomonede — nu doar cu wwwallet.',
    points: [
      {
        title: 'Cu custodie vs. fără custodie',
        body: 'Un portofel cu custodie sau o platformă de schimb îți păstrează cheile pentru tine — este convenabil, dar înseamnă că ai încredere în altcineva că nu îți va îngheța, pierde sau folosi în mod abuziv fondurile. Un portofel fără custodie, precum wwwallet, lasă cheile și responsabilitatea exclusiv în mâinile tale.',
      },
      {
        title: 'Staking vs. minerit',
        body: 'Mineritul de tip Proof-of-Work securizează un blockchain cu putere de calcul brută și energie electrică. Proof-of-Stake îl securizează în schimb cu capitalul expus riscului. Trecerea Ethereum la staking a redus consumul de energie cu peste 99,9% — aproximativ diferența dintre alimentarea cu energie a unei țări mici și a unui oraș mic.',
      },
      {
        title: 'Dincolo de Ethereum',
        body: 'Bitcoin acordă prioritate simplității și previzibilității în detrimentul programabilității. Lanțuri precum Solana pun accentul pe capacitatea brută de procesare, adesea sacrificând descentralizarea pentru a atinge acest obiectiv. Ethereum pune pe primul plan descentralizarea și securitatea, lăsând viteza și costurile în seama rețelelor de nivel 2 construite pe baza sa.',
      },
      {
        title: 'Nimeni legitim nu vă va cere fraza dvs.',
        body: 'Niciun exchange, niciun agent de asistență și nimeni de la wwwallet nu vă va cere vreodată fraza de recuperare — indiferent de aplicația pe care o utilizați. Oricine face acest lucru încearcă să vă jefuiască.',
      },
    ],
    linkLabel: 'Aflați mai multe cu podcastul Bankless',
    linkUrl: 'https://www.bankless.com/',
  },
  faqs: {
    eyebrow: 'Întrebări frecvente',
    heading: 'Întrebări frecvente',
    items: [
      {
        q: 'wwwallet este cu adevărat gratuit?',
        a: 'Da. Utilizarea este gratuită, nu există un nivel premium și nimic nu este accesibil doar contra cost, iar wwwallet nu adaugă niciun comision la tranzacțiile pe care le efectuați sau la schimburile pe care le realizați. Singurul cost inevitabil este comisionul de tranzacție (gas) propriu rețelei, care revine rețelei, nu wwwallet. Cotațiile de schimb provin de la agregatorul de burse 0x (sau LI.FI, pe rețelele pe care 0x nu le acoperă), care poate include propriul comision la unele tranzacții — orice astfel de comision este afișat pe ecranul de verificare înainte de confirmare.',
      },
      {
        q: 'Există reclame, trackere sau instrumente de analiză?',
        a: 'Nu. wwwallet nu afișează reclame, nu rulează scripturi de analiză sau de urmărire și nu vă creează un profil. Nu există cont, așa că nu există nimic la care să se poată atașa unul.',
      },
      {
        q: 'Am nevoie de un cont sau de un act de identitate pentru a-l utiliza?',
        a: 'Nu. Nu este necesară înregistrarea, adresa de e-mail, numărul de telefon sau verificarea identității — creați un portofel pe dispozitivul dvs. și începeți să îl utilizați.',
      },
      {
        q: 'Dacă este gratuit, cum se finanțează wwwallet?',
        a: 'Aplicația nu generează venituri de la utilizatori — fără comisioane, fără reclame, fără vânzarea datelor. Costurile de funcționare sunt menținute la un nivel redus prin design: aplicația în sine rulează în browserul dvs., iar backend-ul transmite doar date publice despre blockchain și prețuri.',
      },
      {
        q: 'Poate cineva să-mi blocheze portofelul?',
        a: 'Nu există cont, așa că nu există nimic pe care wwwallet — sau oricine altcineva — să îl poată bloca. Cheile tale nu părăsesc niciodată dispozitivul tău, iar tranzacțiile sunt semnate acolo înainte de a fi trimise în rețea. Fondurile tale se află pe Ethereum, nu în wwwallet: poți vizualiza cheia privată sau fraza de recuperare a oricărui cont din meniul acestuia și o poți importa în orice altă aplicație de portofel Ethereum oricând dorești.',
      },
      {
        q: 'Este suficientă fraza mea de recuperare pentru a-mi recupera portofelul?',
        a: 'Nu este suficientă singură. Fraza de recuperare deblochează seiful tău criptat, dar seiful în sine se află doar pe dispozitivul tău. Dacă pierzi sau ștergi datele de pe acel dispozitiv fără să fi făcut vreodată o copie de rezervă, nu mai rămâne nimic pe care fraza să îl poată debloca. Asociază întotdeauna fraza de recuperare cu o copie de rezervă pe Google Drive sau într-un fișier — vezi următoarea întrebare.',
      },
      {
        q: 'Cum pot face o copie de rezervă a portofelului meu?',
        a: 'Din Setări, faceți o copie de rezervă a seifului dvs. criptat pe propriul Google Drive sau sub forma unui fișier pe care îl descărcați și îl păstrați personal. O copie de rezervă pe Drive se salvează într-un dosar privat al aplicației, iar wwwallet nu poate vedea nimic altceva din Drive-ul dvs. Faceți o copie de rezervă la prima configurare și din nou de fiecare dată când adăugați conturi.',
      },
      {
        q: 'Pot folosi wwwallet pe mai multe dispozitive?',
        a: 'Da, dar nu se sincronizează automat — fiecare dispozitiv deține propriul seif local. Pentru a utiliza wwwallet pe un dispozitiv nou, restaurați-l de acolo dintr-o copie de rezervă de pe Drive sau dintr-un fișier, apoi deblocați-l cu fraza de recuperare.',
      },
      {
        q: 'Ce se întâmplă dacă îmi pierd dispozitivul și nu am făcut niciodată o copie de rezervă?',
        a: 'Fondurile dvs. sunt irecuperabile. Așa a fost conceput: wwwallet nu are un sistem de conturi și nu păstrează nicio copie a seifului dvs. nicăieri, astfel încât nimeni — inclusiv noi — nu îl poate restaura pentru dvs. Este compromisul pentru cheile la care nimeni altcineva în afară de dvs. nu are acces.',
      },
      {
        q: 'Cheile de acces (Face ID / Touch ID) se transferă pe un dispozitiv nou?',
        a: 'Nu. O parolă de acces este legată de dispozitivul pe care a fost creată. După restaurarea unei copii de rezervă pe un dispozitiv nou, deblocați-l cu fraza de recuperare și puteți configura acolo o parolă de acces nouă.',
      },
      {
        q: 'wwwallet este open source?',
        a: 'Nu — este disponibil codul sursă. Codul sursă complet este public pe GitHub, astfel încât oricine îl poate citi, revizui și audita, dar nu este open source: codul este licențiat sub PolyForm Strict License 1.0.0.',
      },
      {
        q: 'Ce am voie să fac cu codul?',
        a: 'Puteți citi și verifica tot conținutul și puteți rula o copie nemodificată în scopuri necomerciale, cum ar fi studiul personal, cercetarea și testarea. Nu puteți distribui textul, nu îl puteți modifica și nu puteți crea opere derivate (inclusiv „fork-uri”), nici nu îl puteți utiliza în scopuri comerciale. Dacă aveți nevoie de ceva ce licența nu permite, contactați deținătorul drepturilor de autor pentru a obține o licență separată.',
      },
      {
        q: 'Este sigur să folosești wwwallet? Există vreo garanție?',
        a: 'wwwallet este un software fără custodie furnizat „așa cum este”, fără niciun fel de garanție. Numai dumneavoastră dețineți controlul asupra cheilor și fondurilor dumneavoastră — nimeni, inclusiv noi, nu poate recupera o frază de recuperare sau o copie de rezervă pierdută, nu poate anula o tranzacție și nu vă poate compensa pierderile. Folosiți numai fonduri pe care vă puteți permite să le pierdeți, verificați de două ori adresele și rețelele înainte de a efectua o tranzacție, iar nimic din ceea ce este prezentat aici nu constituie sfaturi financiare, de investiții, juridice sau fiscale.',
      },
      {
        q: 'Ce rețele suportă wwwallet?',
        a: 'Rețeaua principală Ethereum, plus Arbitrum, Base, Optimism, Polygon, Robinhood Chain, World Chain, Ink, Linea, Gnosis, Celo, ZKsync Era, Ronin, Unichain și Scroll — toate din același set de conturi.',
      },
      {
        q: 'Cum îmi alimentez portofelul?',
        a: 'Deschideți un cont, alegeți „Vizualizați codul QR” pentru a vedea adresa acestuia și trimiteți fonduri către acea adresă de pe o platformă de schimb sau dintr-un alt portofel. Asigurați-vă că trimiteți pe rețeaua corectă (cum ar fi Ethereum, Base sau Arbitrum) — aceeași adresă funcționează pe toate rețelele acceptate, dar fondurile trimise pe o rețea apar doar pe acea rețea. De asemenea, veți avea nevoie de o cantitate mică din moneda nativă a rețelei (cum ar fi ETH) pentru a plăti comisioanele de tranzacție.',
      },
      {
        q: 'Ce pot face cu wwwallet?',
        a: 'Trimitere: transferați ETH sau orice alt token către o adresă pe care o lipiți, o scanați dintr-un cod QR sau o alegeți din propriile conturi și verificați detaliile înainte de a confirma. Schimb: schimbați un token cu altul pe aceeași rețea din fila „Schimb”, cu o cotație și o estimare a comisioanelor afișate în avans. Primire: afișați-vă adresa sub formă de cod QR. De asemenea, puteți vedea soldurile dvs. exprimate în USD și istoricul tranzacțiilor pe toate rețelele acceptate.',
      },
      {
        q: 'Ce știe wwwallet despre mine?',
        a: 'Nimic care să vă identifice. Nu există cont, autentificare sau bază de date. Datele privind soldul și prețul sunt preluate prin propriul backend al wwwallet, în loc ca browserul dvs. să apeleze direct la furnizori terți, iar acel backend nu vede niciodată cheile, parolele sau fraza de recuperare.',
      },
    ],
  },
  footer: {
    tagline: 'Un portofel Ethereum gratuit și fără custodie, pentru toată lumea.',
    copyright: '© {year} wwwallet',
    licenseLink: 'Licențiat sub PolyForm Strict 1.0.0',
    disclaimer:
      'Software-ul fără custodie este furnizat „așa cum este”, fără garanție. Nu reprezintă sfaturi financiare. Sunteți singurul responsabil pentru cheile și fondurile dvs.',
  },
  principles: {
    eyebrow: 'Principii',
    heading: 'Gratuit, deschis și creat pentru oricine',
    lede: 'Software-ul care vă păstrează banii ar trebui să fie un instrument pe care îl folosiți, nu o afacere construită pe seama utilizatorilor săi. Acestea sunt angajamentele pe care se bazează wwwallet.',
    items: [
      {
        title: 'Gratuit, fără nicio capcană',
        body: 'Fără prețuri, fără niveluri premium, fără funcții cu plată. wwwallet nu adaugă comisioane proprii — singurul cost este comisionul de tranzacție al rețelei.',
      },
      {
        title: 'Fără reclame, fără urmărire',
        body: 'Fără reclame, fără analize, fără scripturi de urmărire și fără date vândute nimănui. În primul rând, nu există niciun profil al tău care să poată fi vândut.',
      },
      {
        title: 'Fără înregistrare',
        body: 'Fără verificare prin e-mail, număr de telefon sau act de identitate. Deschideți aplicația, creați un portofel și sunteți gata.',
      },
      {
        title: 'Cheile tale rămân la tine',
        body: 'Cheile sunt create și criptate pe dispozitivul dvs. și nu părăsesc niciodată acest dispozitiv. wwwallet nu le poate vedea, nu vă poate muta fondurile și nu vă poate bloca accesul.',
      },
      {
        title: 'Funcționează oriunde',
        body: 'Funcționează în orice browser modern de pe telefon sau desktop și se instalează ca o aplicație — nu este necesar un cont în magazinul de aplicații.',
      },
      {
        title: 'În 31 de limbi',
        body: 'Folosiți-o în limba cu care vă simțiți cel mai confortabil, în modul luminos sau întunecat.',
      },
      {
        title: 'Cod deschis',
        body: 'Codul sursă complet este publicat pentru ca oricine să îl poată citi și verifica. Este „source-available” (cu sursa disponibilă), nu „open source” — secțiunea de întrebări frecvente explică ce permite licența.',
      },
      {
        title: 'Nu este nimic de dezactivat',
        body: 'Nu există niciun cont care să poată fi înghețat. Fondurile dvs. se află pe rețeaua Ethereum, iar cheia oricărui cont poate fi transferată într-un alt portofel în orice moment.',
      },
    ],
  },
  license: {
    title: 'Licență',
    close: 'Închide',
    summaryTitle: 'În limbaj simplu',
    canUse:
      'Puteți utiliza wwwallet gratuit, în scopuri personale și în alte scopuri necomerciale.',
    canRead: 'Puteți citi și verifica fiecare linie din codul sursă al aplicației.',
    cannot: 'Nu aveți dreptul să copiați, modificați, redistribuiți sau vindeți acest conținut.',
    englishNote:
      'Urmează licența completă, în limba engleză originală — acesta este textul juridic.',
    viewSource: 'Vizualizați sursa pe GitHub',
  },
  meta: {
    title: 'wwwallet — Portofel Ethereum gratuit, fără custodie',
    description:
      'Portofel Ethereum gratuit în browserul tău. Fără înregistrare, fără reclame, fără urmărire — cheile tale rămân criptate pe dispozitivul tău. Ethereum, Base, Arbitrum, Optimism, Polygon și încă 10 rețele.',
  },
}
