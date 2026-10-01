export default {
  nav: {
    wallet: 'Geldbörse',
    ethereum: 'Ethereum',
    crypto: 'Krypto',
    faqs: 'Häufig gestellte Fragen',
    launch: 'Wallet starten',
    home: 'Zurück nach oben',
    sectionNavLabel: 'Abschnittsnavigation',
  },
  settings: {
    open: 'Einstellungen',
    close: 'Einstellungen schließen',
    theme: 'Thema',
    themeLight: 'Licht',
    themeDark: 'Dunkel',
    language: 'Sprache',
  },
  hero: {
    eyebrow: 'Eine persönliche Ethereum-Wallet ohne Verwahrung',
    heading1: 'Ihre Schlüssel.',
    heading2: 'Ihr Gerät.',
    heading3: 'Deine Geldbörse.',
    lede: 'wwwallet verschlüsselt Ihr Wallet auf Ihrem eigenen Gerät und übermittelt Ihre Schlüssel, Passwörter oder Wiederherstellungsphrase niemals an Dritte. Sie müssen kein Konto erstellen. Es gibt keinen Server, der gehackt werden könnte. Nur Sie und Ihre Kryptowährung.',
    ctaPrimary: 'Wallet starten',
    ctaSecondary: 'So funktioniert es',
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
        q: 'Reicht meine Wiederherstellungsphrase aus, um meine Wallet wiederherzustellen?',
        a: 'Nicht allein. Ihre Wiederherstellungsphrase entsperrt Ihren verschlüsselten Tresor, aber der Tresor selbst befindet sich ausschließlich auf Ihrem Gerät. Wenn Sie dieses Gerät verlieren oder löschen, ohne jemals ein Backup erstellt zu haben, gibt es nichts mehr, was die Phrase entsperren könnte. Kombinieren Sie Ihre Wiederherstellungsphrase daher immer mit einem Backup auf Google Drive oder einem Dateispeicher – siehe die nächste Frage.',
      },
      {
        q: 'Wie erstelle ich ein Backup meiner Wallet?',
        a: 'Sichern Sie in den Einstellungen Ihren verschlüsselten Tresor auf Ihrem eigenen Google Drive – dort wird er in einem privaten, ausschließlich für die App zugänglichen Ordner gespeichert, auf den wwwallet keinen Zugriff hat – oder als Datei, die Sie herunterladen und selbst aufbewahren. Führen Sie diesen Schritt jedes Mal durch, wenn Sie eine Wallet einrichten oder neue Konten hinzufügen.',
      },
      {
        q: 'Kann ich wwwallet auf mehr als einem Gerät nutzen?',
        a: 'Ja, aber es erfolgt keine automatische Synchronisierung – jedes Gerät verfügt über einen eigenen lokalen Tresor. Um wwwallet auf einem neuen Gerät zu nutzen, stellen Sie es dort aus einer Drive- oder Dateisicherung wieder her und entsperren Sie es anschließend mit Ihrer Wiederherstellungsphrase.',
      },
      {
        q: 'Was passiert, wenn ich mein Gerät verliere und noch nie ein Backup erstellt habe?',
        a: 'Ihr Guthaben ist unwiederherstellbar. Das ist beabsichtigt: wwwallet verfügt über kein Kontosystem und speichert nirgendwo eine Kopie Ihres Tresors, sodass niemand – auch wir nicht – diesen für Sie wiederherstellen kann. Das ist der Kompromiss, den Sie eingehen, wenn Sie eine Wallet nutzen, auf die niemand außer Ihnen Zugriff hat.',
      },
      {
        q: 'Werden Passkeys (Face ID / Touch ID) auf ein neues Gerät übertragen?',
        a: 'Nein. Ein Passkey ist an das Gerät gebunden, auf dem er erstellt wurde. Nachdem Sie ein Backup auf einem neuen Gerät wiederhergestellt haben, entsperren Sie es mit Ihrer Wiederherstellungsphrase, und Sie können dort einen neuen Passkey einrichten.',
      },
      {
        q: 'Ist wwwallet Open Source?',
        a: 'Der Quellcode ist auf GitHub öffentlich zugänglich, sodass ihn jeder einsehen kann. Er wurde noch nicht unter einer Open-Source-Lizenz veröffentlicht; betrachten Sie ihn daher vorerst eher als öffentlich zur Überprüfung und nicht als Open Source.',
      },
      {
        q: 'Welche Netzwerke unterstützt wwwallet?',
        a: 'Das Ethereum-Mainnet sowie die Layer-2-Netzwerke Polygon, Arbitrum, Base und Optimism – alles über denselben Satz von Konten.',
      },
      {
        q: 'Was weiß wwwallet über mich?',
        a: 'Nichts, was Rückschlüsse auf Ihre Identität zulässt. Es gibt weder ein Konto noch eine Anmeldung noch eine Datenbank. Guthaben- und Kursdaten werden über das eigene Backend von wwwallet abgerufen, anstatt dass Ihr Browser Drittanbieter direkt anruft, und dieses Backend hat zu keinem Zeitpunkt Zugriff auf Ihre Schlüssel, Passwörter oder Ihre Wiederherstellungsphrase.',
      },
    ],
  },
  footer: {
    tagline: 'Eine persönliche, nicht-verwahrende Ethereum-Wallet.',
    sourceLink: 'Quellcode auf GitHub anzeigen',
    copyright: '© {year} wwwallet',
  },
}
