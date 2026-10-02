export default {
  nav: {
    wallet: 'Geldbörse',
    ethereum: 'Ethereum',
    crypto: 'Krypto',
    faqs: 'Häufig gestellte Fragen',
    launch: 'Wallet starten',
    home: 'Zurück nach oben',
    sectionNavLabel: 'Abschnittsnavigation',
    principles: 'Grundsätze',
  },
  settings: {
    open: 'Einstellungen',
    close: 'Einstellungen schließen',
    theme: 'Thema',
    themeLight: 'Licht',
    themeDark: 'Dunkel',
    language: 'Sprache',
    search: 'Suche',
    noMatches: 'Keine Treffer',
  },
  hero: {
    eyebrow: 'Eine kostenlose, nicht-verwahrende Ethereum-Wallet',
    heading1: 'Deine Schlüssel.',
    heading2: 'Ihr Gerät.',
    heading3: 'Für alle kostenlos.',
    lede: 'wwwallet läuft in Ihrem Browser und speichert Ihre Schlüssel verschlüsselt auf Ihrem eigenen Gerät. Sie müssen kein Konto erstellen, nichts bezahlen und es gibt keine Werbung – einfach nur eine Wallet, die für alle gleich funktioniert.',
    ctaPrimary: 'Wallet starten',
    ctaSecondary: 'So funktioniert es',
    note: 'Keine Registrierung · Keine Werbung · Kein Tracking · 31 Sprachen',
  },
  wallet: {
    eyebrow: 'Geldbörse',
    heading: 'So konstruiert, dass nur Sie es öffnen können',
    lede: 'wwwallet verwahrt Ihr Geld nicht – es hilft Ihnen dabei, es selbst zu verwahren. Und so funktioniert das in der Praxis.',
    points: [
      {
        title: 'Nicht-verwahrend, immer',
        body: 'Ihre privaten Schlüssel werden auf Ihrem eigenen Gerät generiert und verschlüsselt. Die Server von wwwallet haben niemals Zugriff darauf – es gibt keine Datenbank mit Wallets, in die eingedrungen werden könnte, da es gar keine Datenbank gibt.',
      },
      {
        title: 'Mit AES-256 verschlüsselt, nach Ihren Wünschen entsperrt',
        body: 'Ihr Tresor ist durch eine AES-256-GCM-Verschlüsselung geschützt. Entsperren Sie ihn mit Ihrer Wiederherstellungsphrase oder richten Sie einen Passcode ein – Face ID, Touch ID oder Windows Hello –, um einen schnellen, ausschließlich lokalen Zugriff zu erhalten.',
      },
      {
        title: 'Verriegelt sich automatisch',
        body: 'wwwallet sperrt sich nach kurzer Inaktivität und speichert Ihre entsperrte Sitzung niemals auf der Festplatte – schließen Sie den Tab, und das Programm vergisst sie absichtlich.',
      },
      {
        title: 'Eine Wallet, fünf Ethereum-Netzwerke',
        body: 'Halten und senden Sie über das Ethereum-Mainnet, Polygon, Arbitrum, Base und Optimism von denselben Konten aus.',
      },
    ],
    caveatTitle:
      'Ihre Wiederherstellungsphrase entsperrt Ihren Tresor – sie ist kein magisches Backup.',
    caveatBody:
      'Bewahren Sie Ihre Wiederherstellungsphrase an einem sicheren Ort auf, erstellen Sie aber zusätzlich ein Backup auf Google Drive oder in einer Datei. Das Backup benötigen Sie, um Ihre Wallet auf einem neuen Gerät wiederherzustellen, und die Phrase, um sie anschließend zu entsperren.',
    caveatLink: 'Weitere Informationen finden Sie in den FAQs',
  },
  ethereum: {
    eyebrow: 'Ethereum',
    heading: 'Warum Ethereum?',
    lede: 'wwwallet wurde speziell auf Ethereum zugeschnitten. Hier sind die Gründe dafür, in einfachen Worten erklärt.',
    points: [
      {
        title: 'Ein Weltcomputer, nicht nur ein Hauptbuch',
        body: 'Ethereum hat Bitcoins Idee eines gemeinsamen, manipulationssicheren Hauptbuchs aufgegriffen und weiterentwickelt: einen globalen, programmierbaren Computer, auf dem jeder aufbauen kann und den keine einzelne Partei abschalten kann.',
      },
      {
        title: 'Durch Staking gesichert, nicht durch Mining',
        body: 'Seit „The Merge“ im Jahr 2022 wird Ethereum nicht mehr durch energieintensives Mining, sondern durch Proof-of-Stake gesichert – Validatoren setzen ETH als Sicherheit ein, anstatt Strom zu verbrauchen, um um Blöcke zu konkurrieren.',
      },
      {
        title: 'Offen und ohne Zugangsbeschränkungen',
        body: 'Niemand genehmigt Ihr Konto. Jeder kann überall ETH halten oder eine Anwendung auf Ethereum entwickeln – für alle gelten dieselben Regeln, auch für die größten Institutionen.',
      },
      {
        title: 'Der Standard, auf dem andere Netzwerke aufbauen',
        body: 'Layer-2-Netzwerke wie Arbitrum, Base und Optimism – die alle von wwwallet unterstützt werden – erweitern die Sicherheit von Ethereum auf schnellere und kostengünstigere Transaktionen, anstatt ganz von vorne anzufangen.',
      },
    ],
    linkLabel: 'Weitere Informationen finden Sie bei der Ethereum Foundation',
    linkUrl: 'https://ethereum.org/en/foundation/',
  },
  crypto: {
    eyebrow: 'Krypto',
    heading: 'Krypto, einfach erklärt',
    lede: 'Ein paar Begriffe, die man kennen sollte, bevor man selbst Kryptowährungen hält – nicht nur bei wwwallet.',
    points: [
      {
        title: 'Mit Sorgerecht vs. ohne Sorgerecht',
        body: 'Eine Wallet mit Verwahrung oder eine Börse verwahrt Ihre Schlüssel für Sie – das ist zwar bequem, aber Sie vertrauen darauf, dass niemand Ihre Gelder sperrt, verliert oder missbraucht. Bei einer Wallet ohne Verwahrung wie wwwallet liegen die Schlüssel – und damit auch die Verantwortung – allein in Ihren Händen.',
      },
      {
        title: 'Staking vs. Mining',
        body: 'Beim Proof-of-Work-Mining wird eine Blockchain durch reine Rechenleistung und Strom gesichert. Beim Proof-of-Stake erfolgt die Sicherung stattdessen durch eingesetztes Kapital. Durch die Umstellung auf Staking konnte Ethereum seinen Energieverbrauch um mehr als 99,9 % senken – das entspricht in etwa dem Unterschied zwischen der Stromversorgung eines kleinen Landes und der einer Kleinstadt.',
      },
      {
        title: 'Jenseits von Ethereum',
        body: 'Bitcoin legt mehr Wert auf Einfachheit und Vorhersehbarkeit als auf Programmierbarkeit. Blockchains wie Solana setzen auf hohen Durchsatz und opfern dafür oft die Dezentralisierung. Ethereum legt den Schwerpunkt in erster Linie auf Dezentralisierung und Sicherheit und überlässt Geschwindigkeit und Kosten den darauf aufbauenden Layer-2-Netzwerken.',
      },
      {
        title: 'Niemand, der seriös ist, fragt nach Ihrem Passwort.',
        body: 'Egal, welche Wallet Sie nutzen: Weder eine Börse noch ein Support-Mitarbeiter noch ein Mitarbeiter von wwwallet wird Sie jemals nach Ihrer Wiederherstellungsphrase fragen. Wer dies tut, versucht, Sie zu bestehlen.',
      },
    ],
    linkLabel: 'Erfahren Sie mehr im „Bankless“-Podcast',
    linkUrl: 'https://www.bankless.com/',
  },
  faqs: {
    eyebrow: 'Häufig gestellte Fragen',
    heading: 'Häufig gestellte Fragen',
    items: [
      {
        q: 'Ist wwwallet wirklich kostenlos?',
        a: 'Ja. Die Nutzung ist kostenlos, es gibt keine Premium-Stufe und nichts hinter einer Paywall, und wwwallet erhebt keine Gebühren für Ihre Überweisungen oder Tauschgeschäfte. Die einzigen unvermeidbaren Kosten sind die netzwerkinternen Transaktionsgebühren (Gasgebühren), die an das Netzwerk und nicht an wwwallet gehen. Die Swap-Angebote stammen vom 0x-Börsenaggregator, der bei einigen Transaktionen eine eigene Gebühr erheben kann – eine solche Gebühr wird auf dem Bestätigungsbildschirm angezeigt, bevor Sie den Vorgang bestätigen.',
      },
      {
        q: 'Gibt es Werbung, Tracker oder Analysetools?',
        a: 'Nein. wwwallet zeigt keine Werbung an, führt keine Analyse- oder Tracking-Skripte aus und erstellt kein Profil von Ihnen. Es gibt kein Konto, daher gibt es auch nichts, womit ein Profil verknüpft werden könnte.',
      },
      {
        q: 'Brauche ich ein Konto oder einen Ausweis, um es zu nutzen?',
        a: 'Nein. Es ist keine Registrierung, keine E-Mail-Adresse, keine Telefonnummer und keine Identitätsprüfung erforderlich – Sie erstellen einfach eine Wallet auf Ihrem Gerät und können sie sofort nutzen.',
      },
      {
        q: 'Wenn es kostenlos ist, wie finanziert sich wwwallet dann?',
        a: 'Das Unternehmen verdient kein Geld mit seinen Nutzern – keine Gebühren, keine Werbung, kein Verkauf von Daten. Die Betriebskosten werden bewusst gering gehalten: Die Wallet selbst läuft in Ihrem Browser, und das Backend leitet lediglich öffentliche Blockchain- und Kursdaten weiter.',
      },
      {
        q: 'Kann jemand mein Portemonnaie sperren?',
        a: 'Es gibt kein Konto, daher gibt es für wwwallet – oder irgendjemanden sonst – nichts, was gesperrt werden könnte. Ihre Schlüssel verlassen Ihr Gerät zu keinem Zeitpunkt, und Transaktionen werden dort signiert, bevor sie an das Netzwerk gesendet werden. Dein Guthaben befindet sich auf Ethereum, nicht in wwwallet: Du kannst den privaten Schlüssel oder die Wiederherstellungsphrase jedes Kontos über dessen Menü einsehen und jederzeit in eine andere Ethereum-Wallet importieren.',
      },
      {
        q: 'Reicht meine Wiederherstellungsphrase aus, um meine Wallet wiederzuerlangen?',
        a: 'Nicht allein. Ihre Wiederherstellungsphrase entsperrt Ihren verschlüsselten Tresor, aber der Tresor selbst befindet sich ausschließlich auf Ihrem Gerät. Wenn Sie dieses Gerät verlieren oder löschen, ohne jemals ein Backup erstellt zu haben, gibt es nichts mehr, was die Phrase entsperren könnte. Kombinieren Sie Ihre Wiederherstellungsphrase daher immer mit einem Backup auf Google Drive oder einer Dateisicherung – siehe die nächste Frage.',
      },
      {
        q: 'Wie erstelle ich ein Backup meiner Wallet?',
        a: 'Sichern Sie in den Einstellungen Ihren verschlüsselten Tresor auf Ihrem eigenen Google Drive – dort wird er in einem privaten Ordner gespeichert, auf den nur die App Zugriff hat und dessen Inhalt wwwallet nicht einsehen kann – oder als Datei, die Sie herunterladen und selbst aufbewahren. Führen Sie diesen Vorgang jedes Mal durch, wenn Sie eine Wallet einrichten oder neue Konten hinzufügen.',
      },
      {
        q: 'Kann ich wwwallet auf mehr als einem Gerät nutzen?',
        a: 'Ja, aber es erfolgt keine automatische Synchronisierung – jedes Gerät verfügt über einen eigenen lokalen Tresor. Um wwwallet auf einem neuen Gerät zu nutzen, stellen Sie es dort aus einer Drive- oder Dateisicherung wieder her und entsperren Sie es anschließend mit Ihrer Wiederherstellungsphrase.',
      },
      {
        q: 'Was passiert, wenn ich mein Gerät verliere und noch nie ein Backup erstellt habe?',
        a: 'Ihr Guthaben ist unwiederherstellbar. Das ist beabsichtigt: wwwallet verfügt über kein Kontosystem und speichert nirgendwo eine Kopie Ihres Tresors, sodass niemand – auch wir nicht – ihn für Sie wiederherstellen kann. Das ist der Kompromiss, den Sie eingehen, wenn Sie eine Wallet nutzen, auf die niemand außer Ihnen Zugriff hat.',
      },
      {
        q: 'Werden Passkeys (Face ID / Touch ID) auf ein neues Gerät übertragen?',
        a: 'Nein. Ein Passkey ist an das Gerät gebunden, auf dem er erstellt wurde. Nachdem Sie ein Backup auf einem neuen Gerät wiederhergestellt haben, entsperren Sie das Gerät mit Ihrer Wiederherstellungsphrase und können dort einen neuen Passkey einrichten.',
      },
      {
        q: 'Ist wwwallet Open Source?',
        a: 'Nein – der Quellcode ist verfügbar. Der vollständige Quellcode ist auf GitHub öffentlich zugänglich, sodass jeder ihn lesen, prüfen und begutachten kann, aber es handelt sich nicht um Open Source: Der Code unterliegt der PolyForm Strict License 1.0.0.',
      },
      {
        q: 'Was darf ich mit dem Code machen?',
        a: 'Sie dürfen das gesamte Werk lesen und prüfen sowie eine unveränderte Kopie für nichtkommerzielle Zwecke wie zum Beispiel zum persönlichen Studium, zur Forschung und zu Testzwecken nutzen. Sie dürfen es jedoch nicht verbreiten, verändern oder abgeleitete Werke (einschließlich Forks) erstellen oder es kommerziell nutzen. Wenn Sie etwas benötigen, was die Lizenz nicht erlaubt, wenden Sie sich bitte an den Urheberrechtsinhaber, um eine separate Lizenz zu erhalten.',
      },
      {
        q: 'Ist die Nutzung von wwwallet sicher? Gibt es eine Garantie?',
        a: 'wwwallet ist eine nicht-verwahrende Software, die „wie besehen“ und ohne jegliche Gewährleistung bereitgestellt wird. Sie allein haben die Kontrolle über Ihre Schlüssel und Ihr Guthaben – niemand, auch nicht wir, kann eine verlorene Wiederherstellungsphrase oder ein Backup wiederherstellen, eine Transaktion rückgängig machen oder Ihnen Verluste ersetzen. Verwenden Sie nur Guthaben, dessen Verlust Sie sich leisten können, überprüfen Sie Adressen und Netzwerke vor dem Senden noch einmal gründlich, und beachten Sie, dass nichts hier eine Finanz-, Anlage-, Rechts- oder Steuerberatung darstellt.',
      },
      {
        q: 'Welche Netzwerke unterstützt wwwallet?',
        a: 'Das Ethereum-Mainnet sowie die Layer-2-Netzwerke Polygon, Arbitrum, Base und Optimism – alles über denselben Satz von Konten.',
      },
      {
        q: 'Wie lade ich Guthaben auf meine Wallet?',
        a: 'Eröffnen Sie ein Konto, wählen Sie „QR-Code anzeigen“, um die Adresse anzuzeigen, und senden Sie Guthaben von einer Börse oder einer anderen Wallet an diese Adresse. Achten Sie darauf, dass Sie über das richtige Netzwerk senden (Ethereum, Polygon, Arbitrum, Base oder Optimism) – dieselbe Adresse funktioniert zwar in allen Netzwerken, aber Guthaben, das über ein bestimmtes Netzwerk gesendet wird, erscheint nur in diesem Netzwerk. Außerdem benötigen Sie eine kleine Menge der nativen Kryptowährung des Netzwerks (z. B. ETH), um die Transaktionsgebühren zu bezahlen.',
      },
      {
        q: 'Was kann ich mit wwwallet machen?',
        a: 'Senden: Überweisen Sie ETH oder einen beliebigen Token an eine Adresse, die Sie einfügen, über einen QR-Code einscannen oder aus Ihren eigenen Konten auswählen, und überprüfen Sie die Details, bevor Sie den Vorgang bestätigen. Tauschen: Tauschen Sie auf der Registerkarte „Swap“ einen Token gegen einen anderen im selben Netzwerk, wobei der Kurs und die geschätzten Gebühren im Voraus angezeigt werden. Empfangen: Zeigen Sie Ihre Adresse als QR-Code an. Außerdem kannst du deine Guthaben in US-Dollar sowie deinen Transaktionsverlauf über alle unterstützten Netzwerke hinweg einsehen.',
      },
      {
        q: 'Was weiß wwwallet über mich?',
        a: 'Nichts, was Rückschlüsse auf Ihre Identität zulässt. Es gibt weder ein Konto noch eine Anmeldung noch eine Datenbank. Kontostands- und Kursdaten werden über das eigene Backend von wwwallet abgerufen, anstatt dass Ihr Browser Drittanbieter direkt anruft, und dieses Backend hat niemals Zugriff auf Ihre Schlüssel, Passwörter oder Ihre Wiederherstellungsphrase.',
      },
    ],
  },
  footer: {
    tagline: 'Eine kostenlose, nicht-verwahrende Ethereum-Wallet für alle.',
    copyright: '© {year} wwwallet',
    licenseLink: 'Lizenziert unter PolyForm Strict 1.0.0',
    disclaimer:
      'Nicht-verwahrende Software wird „wie besehen“ und ohne Gewährleistung bereitgestellt. Dies stellt keine Finanzberatung dar. Sie tragen die alleinige Verantwortung für Ihre Schlüssel und Ihr Guthaben.',
  },
  principles: {
    eyebrow: 'Grundsätze',
    heading: 'Kostenlos, offen und für jeden gedacht',
    lede: 'Eine Wallet sollte ein Werkzeug sein, das man nutzt, und kein Geschäft, das auf seinen Nutzern basiert. Das sind die Grundsätze, auf denen wwwallet basiert.',
    items: [
      {
        title: 'Kostenlos, ganz ohne Haken',
        body: 'Keine Preise, keine Premium-Stufe, keine kostenpflichtigen Funktionen. wwwallet erhebt keine eigenen Gebühren – die einzigen Kosten sind die Transaktionsgebühren des Netzwerks.',
      },
      {
        title: 'Keine Werbung, kein Tracking',
        body: 'Keine Werbung, keine Analysen, keine Tracking-Skripte und keine Weitergabe von Daten an Dritte. Es gibt gar kein Profil von dir, das verkauft werden könnte.',
      },
      {
        title: 'Keine Registrierung erforderlich',
        body: 'Keine E-Mail-Adresse, keine Telefonnummer und keine Identitätsprüfung. Einfach öffnen, eine Wallet erstellen – und schon kann es losgehen.',
      },
      {
        title: 'Ihre Schlüssel bleiben bei Ihnen',
        body: 'Die Schlüssel werden auf Ihrem Gerät erstellt und verschlüsselt und verlassen dieses niemals. wwwallet kann sie nicht einsehen, Ihr Guthaben nicht bewegen und Sie nicht aussperren.',
      },
      {
        title: 'Funktioniert überall',
        body: 'Läuft in jedem modernen Browser auf dem Smartphone oder Desktop und lässt sich wie eine App installieren – ein App-Store-Konto ist nicht erforderlich.',
      },
      {
        title: 'In 31 Sprachen',
        body: 'Nutzen Sie es in der Sprache, mit der Sie am besten zurechtkommen – im hellen oder dunklen Modus.',
      },
      {
        title: 'Code öffentlich zugänglich machen',
        body: 'Der vollständige Quellcode ist für jedermann einsehbar und überprüfbar. Es handelt sich um „Source-Available“ und nicht um „Open Source“ – in den FAQs wird erläutert, was die Lizenz erlaubt.',
      },
      {
        title: 'Nichts, was man ausschalten müsste',
        body: 'Es gibt kein Konto, das gesperrt werden könnte. Ihr Guthaben befindet sich direkt auf Ethereum, und der Schlüssel zu jedem Konto kann jederzeit in eine andere Wallet übertragen werden.',
      },
    ],
  },
  license: {
    title: 'Lizenz',
    close: 'Schließen',
    summaryTitle: 'Im Klartext',
    canUse: 'Sie können wwwallet kostenlos für private und andere nichtkommerzielle Zwecke nutzen.',
    canRead: 'Sie können jede Zeile des Quellcodes lesen und prüfen.',
    cannot: 'Sie dürfen es weder kopieren, ändern, weiterverbreiten noch verkaufen.',
    englishNote:
      'Es folgt der vollständige Lizenztext in der englischen Originalfassung – dies ist der rechtsverbindliche Text.',
    viewSource: 'Auf GitHub anzeigen',
  },
}
