export default {
  nav: {
    wallet: 'wwwallet',
    ethereum: 'Ethereum',
    crypto: 'Krypto',
    faqs: 'Häufig gestellte Fragen',
    launch: 'Starte wwwallet',
    home: 'Zurück nach oben',
    sectionNavLabel: 'Abschnittsnavigation',
    principles: 'Grundsätze',
  },
  settings: {
    open: 'Einstellungen',
    close: 'Einstellungen schließen',
    theme: 'Thema',
    themeLight: 'Leicht',
    themeDark: 'Dunkel',
    language: 'Sprache',
    search: 'Suche',
    noMatches: 'Keine Treffer',
    version: 'Version {version}',
  },
  hero: {
    eyebrow: 'Eine kostenlose, nicht-verwahrende Ethereum-Wallet',
    heading1: 'Deine Schlüssel.',
    heading2: 'Dein Gerät.',
    heading3: 'Kostenlos für alle.',
    lede: 'wwwallet läuft in deinem Browser und speichert deine Schlüssel verschlüsselt auf deinem eigenen Gerät. Du musst kein Konto erstellen, nichts bezahlen und es gibt keine Werbung – und es funktioniert für alle gleich.',
    ctaPrimary: 'Starte wwwallet',
    ctaSecondary: 'Schau dir an, wie es funktioniert',
    note: 'Keine Anmeldung · Keine Werbung · Kein Tracking · 31 Sprachen',
  },
  wallet: {
    eyebrow: 'wwwallet',
    heading: 'So konzipiert, dass nur du sie öffnen kannst',
    lede: 'wwwallet verwahrt dein Guthaben nicht – es hilft dir dabei, es selbst zu verwahren. Und so funktioniert das in der Praxis.',
    points: [
      {
        title: 'Nicht-verwahrend, immer',
        body: 'Deine privaten Schlüssel werden auf deinem eigenen Gerät generiert und verschlüsselt. Die Server von wwwallet sehen sie niemals – es gibt keine Datenbank mit Schlüsseln, die gehackt werden könnte, da es überhaupt keine Datenbank gibt.',
      },
      {
        title: 'Verschlüsselt mit AES-256, nach deinen Vorstellungen entsperrt',
        body: 'Dein Tresor ist mit einer AES-256-GCM-Verschlüsselung geschützt. Entsperre ihn mit deiner Wiederherstellungsphrase oder aktiviere einen Passkey – Face ID, Touch ID oder Windows Hello – für schnellen, ausschließlich lokalen Zugriff.',
      },
      {
        title: 'Sperrt sich automatisch ab',
        body: 'wwwallet sperrt sich nach kurzer Inaktivität und speichert deine entsperrte Sitzung niemals auf der Festplatte – schließ den Tab und es vergisst alles, ganz bewusst.',
      },
      {
        title: 'Fünfzehn Ethereum-Netzwerke, ein Satz Konten',
        body: 'Speichere und versende über das Ethereum-Mainnet und 14 weitere Netzwerke – darunter Arbitrum, Base, Optimism, Polygon, Linea und ZKsync – mit denselben Konten und Adressen.',
      },
    ],
    caveatTitle:
      'Deine Wiederherstellungsphrase entsperrt deinen Tresor – sie ist kein magisches Backup',
    caveatBody:
      'Speichere deine Wiederherstellungsphrase an einem sicheren Ort, erstelle aber zusätzlich ein Backup auf Google Drive oder in einer Datei. Du benötigst das Backup, um deine Wallet auf einem neuen Gerät wiederherzustellen, und die Phrase, um sie anschließend zu entsperren.',
    caveatLink: 'Mehr dazu in den FAQs',
  },
  ethereum: {
    eyebrow: 'Ethereum',
    heading: 'Warum Ethereum',
    lede: 'wwwallet ist speziell auf Ethereum ausgerichtet. Hier sind die Argumente dafür, in einfachen Worten.',
    points: [
      {
        title: 'Ein Weltcomputer, nicht nur ein Hauptbuch',
        body: 'Ethereum hat Bitcoins Idee eines gemeinsamen, manipulationssicheren Hauptbuchs aufgegriffen und erweitert: ein globaler, programmierbarer Computer, auf dem jeder aufbauen kann und den keine einzelne Partei abschalten kann.',
      },
      {
        title: 'Gesichert durch Staking, nicht durch Mining',
        body: 'Seit „The Merge“ im Jahr 2022 wird Ethereum durch Proof-of-Stake statt durch energieintensives Mining gesichert – Validatoren setzen ETH als Sicherheit ein, anstatt Strom zu verbrauchen, um um Blöcke zu konkurrieren.',
      },
      {
        title: 'Offen und ohne Zugangsbeschränkungen',
        body: 'Niemand muss dein Konto genehmigen. Jeder, überall, kann ETH halten oder eine Anwendung auf Ethereum entwickeln – für alle gelten die gleichen Regeln, auch für die größten Institutionen.',
      },
      {
        title: 'Der Standard, auf dem andere Netzwerke aufbauen',
        body: 'Layer-2-Netzwerke wie Arbitrum, Base und Optimism – die alle von wwwallet unterstützt werden – erweitern die Sicherheit von Ethereum auf schnellere, kostengünstigere Transaktionen, anstatt ganz von vorne anzufangen.',
      },
    ],
    linkLabel: 'Mehr dazu bei der Ethereum Foundation',
    linkUrl: 'https://ethereum.org/en/foundation/',
  },
  crypto: {
    eyebrow: 'Krypto',
    heading: 'Krypto, in einfachen Worten',
    lede: 'Ein paar Konzepte, die es zu verstehen lohnt, bevor du selbst Kryptowährungen hältst – nicht nur mit wwwallet.',
    points: [
      {
        title: 'Verwahrend vs. nicht-verwahrend',
        body: 'Ein verwahrendes Wallet oder eine Börse verwahrt deine Schlüssel für dich – das ist bequem, aber du vertraust darauf, dass niemand anderes deine Gelder einfriert, verliert oder missbraucht. Bei einem nicht-verwahrenden Wallet wie wwwallet liegen die Schlüssel und die Verantwortung allein in deinen Händen.',
      },
      {
        title: 'Staking vs. Mining',
        body: 'Proof-of-Work-Mining sichert eine Blockchain mit roher Rechenleistung und Strom. Proof-of-Stake sichert sie stattdessen mit eingesetztem Kapital. Durch den Umstieg auf Staking hat Ethereum seinen Energieverbrauch um mehr als 99,9 % gesenkt – das entspricht in etwa dem Unterschied zwischen der Stromversorgung eines kleinen Landes und einer Kleinstadt.',
      },
      {
        title: 'Über Ethereum hinaus',
        body: 'Bitcoin legt mehr Wert auf Einfachheit und Vorhersehbarkeit als auf Programmierbarkeit. Blockchains wie Solana setzen auf hohen Durchsatz und opfern dafür oft die Dezentralisierung. Ethereum legt den Schwerpunkt auf Dezentralisierung und Sicherheit und überlässt Geschwindigkeit und Kosten den darauf aufbauenden Layer-2-Netzwerken.',
      },
      {
        title: 'Niemand, der seriös ist, fragt nach deiner Phrase',
        body: 'Keine Börse, kein Support-Mitarbeiter und niemand von wwwallet wird dich jemals nach deiner Wiederherstellungsphrase fragen – egal, welche App du nutzt. Wer das tut, versucht, dich zu bestehlen.',
      },
    ],
    linkLabel: 'Erfahre mehr im Bankless-Podcast',
    linkUrl: 'https://www.bankless.com/',
  },
  faqs: {
    eyebrow: 'Häufig gestellte Fragen',
    heading: 'Häufige Fragen',
    items: [
      {
        q: 'Ist wwwallet wirklich kostenlos?',
        a: 'Ja. Die Nutzung ist kostenlos, es gibt keine Premium-Stufe und nichts hinter einer Paywall, und wwwallet erhebt keine Gebühren auf das, was du sendest oder tauschst. Die einzigen unvermeidbaren Kosten sind die netzwerkeigenen Transaktionsgebühren (Gasgebühren), die an das Netzwerk und nicht an wwwallet gehen. Die Swap-Angebote stammen vom 0x-Börsenaggregator (oder von LI.FI in Netzwerken, die 0x nicht abdeckt), der bei einigen Trades eine eigene Gebühr erheben kann – eine solche Gebühr wird auf dem Übersichtsbildschirm angezeigt, bevor du den Vorgang bestätigst.',
      },
      {
        q: 'Gibt es Werbung, Tracker oder Analysetools?',
        a: 'Nein. wwwallet zeigt keine Werbung an, führt keine Analyse- oder Tracking-Skripte aus und erstellt kein Profil von dir. Es gibt kein Konto, also gibt es auch nichts, womit man eines verknüpfen könnte.',
      },
      {
        q: 'Brauche ich ein Konto oder einen Ausweis, um die App zu nutzen?',
        a: 'Nein. Es gibt keine Registrierung, keine E-Mail-Adresse, keine Telefonnummer und keine Identitätsprüfung – du erstellst einfach eine Wallet auf deinem Gerät und kannst sie sofort nutzen.',
      },
      {
        q: 'Wenn es kostenlos ist, wie finanziert sich wwwallet dann?',
        a: 'Die App verdient kein Geld an ihren Nutzern – keine Gebühren, keine Werbung, kein Datenverkauf. Die Betriebskosten sind bewusst gering gehalten: Die App selbst läuft in deinem Browser, und das Backend leitet lediglich öffentliche Blockchain- und Kursdaten weiter.',
      },
      {
        q: 'Kann irgendjemand mein Wallet sperren?',
        a: 'Es gibt kein Konto, daher gibt es für wwwallet – oder irgendjemanden sonst – nichts, was gesperrt werden könnte. Deine Schlüssel verlassen niemals dein Gerät, und Transaktionen werden dort signiert, bevor sie an das Netzwerk gesendet werden. Dein Guthaben befindet sich auf Ethereum, nicht in wwwallet: Du kannst den privaten Schlüssel oder die Wiederherstellungsphrase jedes Kontos über dessen Menü einsehen und sie jederzeit in jede andere Ethereum-Wallet-App importieren.',
      },
      {
        q: 'Reicht meine Wiederherstellungsphrase aus, um meine Wallet wiederherzustellen?',
        a: 'Nicht für sich allein. Deine Wiederherstellungsphrase entsperrt deinen verschlüsselten Tresor, aber der Tresor selbst befindet sich ausschließlich auf deinem Gerät. Wenn du dieses Gerät verlierst oder löschst, ohne jemals ein Backup erstellt zu haben, gibt es nichts mehr, was die Phrase entsperren könnte. Kombiniere deine Wiederherstellungsphrase immer mit einem Backup auf Google Drive oder einer Datei – siehe die nächste Frage.',
      },
      {
        q: 'Wie erstelle ich ein Backup meiner Wallet?',
        a: 'Sichere deinen verschlüsselten Tresor in den Einstellungen auf deinem eigenen Google Drive oder als Datei, die du herunterlädst und selbst aufbewahrst. Ein Drive-Backup wird in einem privaten App-Ordner gespeichert, und wwwallet kann nichts anderes in deinem Drive sehen. Erstelle ein Backup bei der Ersteinrichtung und jedes Mal, wenn du Konten hinzufügst.',
      },
      {
        q: 'Kann ich wwwallet auf mehr als einem Gerät nutzen?',
        a: 'Ja, aber es synchronisiert sich nicht automatisch – jedes Gerät verfügt über einen eigenen lokalen Tresor. Um wwwallet auf einem neuen Gerät zu nutzen, stelle es dort aus einem Drive- oder Dateisicherungsbackup wieder her und entsperre es anschließend mit deiner Wiederherstellungsphrase.',
      },
      {
        q: 'Was passiert, wenn ich mein Gerät verliere und nie ein Backup erstellt habe?',
        a: 'Dein Guthaben ist unwiederherstellbar. Das ist beabsichtigt: wwwallet hat kein Kontosystem und speichert nirgendwo eine Kopie deines Tresors, sodass niemand – auch wir nicht – ihn für dich wiederherstellen kann. Das ist der Kompromiss dafür, dass niemand außer dir Zugriff auf deine Schlüssel hat.',
      },
      {
        q: 'Werden Passkeys (Face ID / Touch ID) auf ein neues Gerät übertragen?',
        a: 'Nein. Ein Passkey ist an das Gerät gebunden, auf dem er erstellt wurde. Nachdem du ein Backup auf einem neuen Gerät wiederhergestellt hast, entsperre es mit deiner Recovery-Phrase und du kannst dort einen neuen Passkey einrichten.',
      },
      {
        q: 'Ist wwwallet Open Source?',
        a: 'Nein – der Quellcode ist verfügbar. Der vollständige Quellcode ist auf GitHub öffentlich zugänglich, sodass jeder ihn lesen, überprüfen und auditieren kann, aber es handelt sich nicht um Open Source: Der Code unterliegt der PolyForm Strict License 1.0.0.',
      },
      {
        q: 'Was darf ich mit dem Code machen?',
        a: 'Du darfst den gesamten Text lesen und prüfen sowie eine unveränderte Kopie für nichtkommerzielle Zwecke wie persönliches Studium, Forschung und Tests nutzen. Du darfst den Text nicht verbreiten, verändern oder abgeleitete Werke (einschließlich Forks) erstellen oder ihn kommerziell nutzen. Wenn du etwas benötigst, was die Lizenz nicht erlaubt, wende dich an den Urheberrechtsinhaber, um eine separate Lizenz zu erhalten.',
      },
      {
        q: 'Ist wwwallet sicher in der Nutzung? Gibt es eine Garantie?',
        a: 'wwwallet ist eine nicht-verwahrende Software, die „wie besehen“ ohne jegliche Gewährleistung bereitgestellt wird. Du allein hast die Kontrolle über deine Schlüssel und dein Guthaben – niemand, auch wir nicht, kann eine verlorene Wiederherstellungsphrase oder ein Backup wiederherstellen, eine Transaktion rückgängig machen oder dir Verluste ersetzen. Verwende nur Geld, dessen Verlust du verkraften kannst, überprüfe Adressen und Netzwerke vor dem Senden noch einmal genau, und nichts hier stellt eine Finanz-, Anlage-, Rechts- oder Steuerberatung dar.',
      },
      {
        q: 'Welche Netzwerke unterstützt wwwallet?',
        a: 'Ethereum-Mainnet sowie Arbitrum, Base, Optimism, Polygon, Robinhood Chain, World Chain, Ink, Linea, Gnosis, Celo, ZKsync Era, Ronin, Unichain und Scroll – alles über denselben Satz von Konten.',
      },
      {
        q: 'Wie lade ich Geld auf mein Wallet?',
        a: 'Eröffne ein Konto, wähle „QR-Code anzeigen“, um die Adresse zu sehen, und sende Guthaben von einer Börse oder einer anderen Wallet an diese Adresse. Achte darauf, dass du über das richtige Netzwerk sendest (z. B. Ethereum, Base oder Arbitrum) – dieselbe Adresse funktioniert in jedem unterstützten Netzwerk, aber Guthaben, das über ein bestimmtes Netzwerk gesendet wird, erscheint nur in diesem Netzwerk. Du solltest außerdem ein wenig von der nativen Coin des Netzwerks (z. B. ETH) bereithalten, um die Transaktionsgebühren zu bezahlen.',
      },
      {
        q: 'Was kann ich mit wwwallet machen?',
        a: 'Senden: Überweise ETH oder beliebige Token an eine Adresse, die du einfügst, per QR-Code einscannst oder aus deinen eigenen Konten auswählst, und überprüfe die Details, bevor du bestätigst. Tauschen: Tausche auf der Registerkarte „Swap“ einen Token gegen einen anderen im selben Netzwerk, wobei der Kurs und die geschätzten Gebühren im Voraus angezeigt werden. Empfangen: Zeige deine Adresse als QR-Code an. Außerdem kannst du deine Guthaben in US-Dollar sowie deinen Transaktionsverlauf über alle unterstützten Netzwerke hinweg einsehen.',
      },
      {
        q: 'Was weiß wwwallet über mich?',
        a: 'Nichts, was dich identifiziert. Es gibt kein Konto, keinen Login und keine Datenbank. Saldo- und Kursdaten werden über das eigene Backend von wwwallet abgerufen, anstatt dass dein Browser direkt Drittanbieter anspricht, und dieses Backend sieht niemals deine Schlüssel, Passwörter oder deine Wiederherstellungsphrase.',
      },
    ],
  },
  footer: {
    tagline: 'Eine kostenlose, nicht-verwahrende Ethereum-Wallet für alle.',
    copyright: '© {year} wwwallet',
    licenseLink: 'Lizenziert unter PolyForm Strict 1.0.0',
    disclaimer:
      'Nicht-verwahrende Software wird „wie besehen“ ohne Gewähr bereitgestellt. Dies ist keine Finanzberatung. Du bist allein verantwortlich für deine Schlüssel und dein Guthaben.',
  },
  principles: {
    eyebrow: 'Grundsätze',
    heading: 'Kostenlos, offen und für jeden gedacht',
    lede: 'Software, die dein Geld verwahrt, sollte ein Werkzeug sein, das du nutzt – und kein Geschäft, das auf seinen Nutzern aufgebaut ist. Das sind die Grundsätze, auf denen wwwallet basiert.',
    items: [
      {
        title: 'Kostenlos, ohne Haken',
        body: 'Keine Preise, keine Premium-Stufe, keine kostenpflichtigen Funktionen. wwwallet erhebt keine eigenen Gebühren – die einzigen Kosten sind die Transaktionsgebühren des Netzwerks.',
      },
      {
        title: 'Keine Werbung, kein Tracking',
        body: 'Keine Werbung, keine Analysen, keine Tracking-Skripte und keine Daten, die an Dritte verkauft werden. Es gibt gar kein Profil von dir, das verkauft werden könnte.',
      },
      {
        title: 'Keine Anmeldung',
        body: 'Keine E-Mail-Adresse, Telefonnummer oder Identitätsprüfung. Einfach öffnen, eine Wallet erstellen – und schon bist du startklar.',
      },
      {
        title: 'Deine Schlüssel bleiben bei dir',
        body: 'Die Schlüssel werden auf deinem Gerät erstellt und verschlüsselt und verlassen dieses niemals. wwwallet kann sie nicht einsehen, dein Guthaben nicht bewegen und dich nicht aussperren.',
      },
      {
        title: 'Funktioniert überall',
        body: 'Läuft in jedem modernen Browser auf dem Handy oder Desktop und lässt sich wie eine App installieren – kein App-Store-Konto erforderlich.',
      },
      {
        title: 'In 31 Sprachen',
        body: 'Verwende es in der Sprache, mit der du dich am wohlsten fühlst, im hellen oder dunklen Modus.',
      },
      {
        title: 'Code im Open Source',
        body: 'Der vollständige Quellcode ist für jedermann einsehbar und überprüfbar. Es handelt sich um „Source-Available“ statt um Open Source – in den FAQs wird erklärt, was die Lizenz erlaubt.',
      },
      {
        title: 'Nichts, was man ausschalten müsste',
        body: 'Es gibt kein Konto, das jemand sperren könnte. Dein Guthaben befindet sich direkt auf Ethereum selbst, und der Schlüssel eines jeden Kontos kann jederzeit in eine andere Wallet übertragen werden.',
      },
    ],
  },
  license: {
    title: 'Lizenz',
    close: 'Schließen',
    summaryTitle: 'In einfachem Deutsch',
    canUse:
      'Du kannst wwwallet kostenlos für persönliche und andere nichtkommerzielle Zwecke nutzen.',
    canRead: 'Du kannst jede Zeile des Quellcodes lesen und überprüfen.',
    cannot: 'Du darfst den Text weder kopieren, ändern, weiterverbreiten noch verkaufen.',
    englishNote:
      'Es folgt die vollständige Lizenz im englischen Original – es handelt sich um den Rechtstext.',
    viewSource: 'Quelltext auf GitHub anzeigen',
  },
  meta: {
    title: 'wwwallet – Kostenlose Non-Custodial Ethereum-Wallet',
    description:
      'Kostenlose Ethereum-Wallet in deinem Browser. Keine Anmeldung, keine Werbung, kein Tracking – deine Schlüssel bleiben verschlüsselt auf deinem Gerät. Ethereum, Base, Arbitrum, Optimism, Polygon und 10 weitere Netzwerke.',
  },
}
