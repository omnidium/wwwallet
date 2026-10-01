export default {
  nav: {
    wallet: 'Portafoglio',
    ethereum: 'Ethereum',
    crypto: 'Criptovalute',
    faqs: 'Domande frequenti',
    launch: 'Avvia il portafoglio',
    home: "Torna all'inizio",
    sectionNavLabel: 'Navigazione tra le sezioni',
  },
  settings: {
    open: 'Impostazioni',
    close: 'Chiudi impostazioni',
    theme: 'Tema',
    themeLight: 'Luce',
    themeDark: 'Buio',
    language: 'Lingua',
  },
  hero: {
    eyebrow: 'Un portafoglio Ethereum personale e senza custodia',
    heading1: 'Le tue chiavi.',
    heading2: 'Il tuo dispositivo.',
    heading3: 'Il tuo portafoglio.',
    lede: "wwwallet crittografa il tuo wallet sul tuo dispositivo e non invia mai le tue chiavi, le tue password o la tua frase di recupero altrove. Non devi creare alcun account. Non c'è alcun server da violare. Solo tu e le tue criptovalute.",
    ctaPrimary: 'Avvia il portafoglio',
    ctaSecondary: 'Scopri come funziona',
  },
  wallet: {
    eyebrow: 'Portafoglio',
    heading: 'Progettato in modo che solo tu possa aprirlo',
    lede: 'wwwallet non custodisce i tuoi fondi: ti aiuta a custodirli tu stesso. Ecco cosa significa in pratica.',
    points: [
      {
        title: 'Senza custodia, sempre',
        body: "Le tue chiavi private vengono generate e crittografate sul tuo dispositivo. I server di wwwallet non le vedono mai: non esiste alcun database di portafogli da violare, perché semplicemente non c'è alcun database.",
      },
      {
        title: 'Crittografato con AES-256, sbloccabile come preferisci',
        body: 'Il tuo archivio è protetto con crittografia AES-256-GCM. Sbloccalo con la tua frase di recupero oppure attiva un codice di accesso — Face ID, Touch ID o Windows Hello — per un accesso rapido e esclusivamente locale.',
      },
      {
        title: 'Si blocca automaticamente',
        body: 'wwwallet si blocca dopo un breve periodo di inattività e non salva mai su disco i dati relativi alla sessione sbloccata: chiudi la scheda e il sistema li dimentica, di proposito.',
      },
      {
        title: 'Un unico portafoglio, cinque reti Ethereum',
        body: 'Conserva e invia sulla mainnet di Ethereum, su Polygon, Arbitrum, Base e Optimism utilizzando lo stesso insieme di account.',
      },
    ],
    caveatTitle: 'La tua frase di recupero sblocca il tuo vault: non è un backup magico',
    caveatBody:
      'Conserva la tua frase di recupero in un luogo sicuro, ma esegui anche un backup su Google Drive o in un file. Il backup ti servirà per ripristinare il tuo portafoglio su un nuovo dispositivo, mentre la frase ti servirà per sbloccarlo una volta effettuato il ripristino.',
    caveatLink: 'Per saperne di più, consulta le Domande frequenti',
  },
  ethereum: {
    eyebrow: 'Ethereum',
    heading: 'Perché Ethereum?',
    lede: 'wwwallet è stato progettato specificamente per Ethereum. Ecco perché, in parole semplici.',
    points: [
      {
        title: 'Un computer globale, non solo un registro',
        body: "Ethereum ha ripreso l'idea di Bitcoin di un registro condiviso e a prova di manomissione, ampliandola: un computer globale e programmabile su cui chiunque può sviluppare applicazioni e che nessuna singola entità può disattivare.",
      },
      {
        title: 'Garantito dallo staking, non dal mining',
        body: 'Dal “Merge” del 2022, Ethereum è protetto dal Proof-of-Stake anziché dal mining ad alto consumo energetico: i validatori mettono a rischio i propri ETH come garanzia invece di consumare elettricità per competere per i blocchi.',
      },
      {
        title: 'Aperto e senza autorizzazioni',
        body: 'Nessuno deve approvare il tuo account. Chiunque, ovunque si trovi, può detenere ETH o sviluppare un’applicazione su Ethereum: le stesse regole valgono per tutti, comprese le istituzioni più grandi.',
      },
      {
        title: 'Lo standard su cui si basano le altre reti',
        body: 'Le reti di livello 2 come Arbitrum, Base e Optimism — tutte supportate da wwwallet — estendono la sicurezza di Ethereum a transazioni più veloci ed economiche, invece di partire da zero.',
      },
    ],
    linkLabel: 'Per saperne di più, visita il sito della Fondazione Ethereum',
    linkUrl: 'https://ethereum.org/en/foundation/',
  },
  crypto: {
    eyebrow: 'Criptovalute',
    heading: 'Le criptovalute, in parole semplici',
    lede: 'Alcuni concetti che vale la pena comprendere prima di detenere criptovalute in proprio — non solo con wwwallet.',
    points: [
      {
        title: 'Con affidamento vs. senza affidamento',
        body: 'Un portafoglio custodito o un exchange custodisce le tue chiavi per te: è comodo, ma significa affidarsi a qualcun altro affinché non blocchi, perda o utilizzi in modo improprio i tuoi fondi. Un portafoglio non custodito come wwwallet mette le chiavi, e la responsabilità, esclusivamente nelle tue mani.',
      },
      {
        title: 'Staking vs. mining',
        body: 'Il mining Proof-of-Work garantisce la sicurezza di una blockchain grazie alla potenza di calcolo grezza e all’energia elettrica. Il Proof-of-Stake, invece, la garantisce tramite il capitale a rischio. Il passaggio di Ethereum allo staking ha ridotto il suo consumo energetico di oltre il 99,9% — più o meno la differenza tra l’energia necessaria per alimentare un piccolo Paese e quella necessaria per alimentare una piccola città.',
      },
      {
        title: 'Oltre Ethereum',
        body: 'Bitcoin privilegia la semplicità e la prevedibilità rispetto alla programmabilità. Catene come Solana puntano a massimizzare la larghezza di banda, spesso a scapito della decentralizzazione. Ethereum punta innanzitutto sulla decentralizzazione e sulla sicurezza, lasciando che siano le reti di secondo livello (Layer-2) costruite su di essa a occuparsi di velocità e costi.',
      },
      {
        title: 'Nessuno che sia in buona fede ti chiede la tua frase',
        body: 'Qualunque sia il portafoglio che utilizzi: né la piattaforma di scambio, né un addetto all’assistenza, né alcun dipendente di wwwallet ti chiederà mai la tua frase di recupero. Chiunque lo faccia sta cercando di derubarti.',
      },
    ],
    linkLabel: "Approfondisci l'argomento con il podcast di Bankless",
    linkUrl: 'https://www.bankless.com/',
  },
  faqs: {
    eyebrow: 'Domande frequenti',
    heading: 'Domande frequenti',
    items: [
      {
        q: 'La mia frase di recupero è sufficiente per riavere il mio portafoglio?',
        a: 'Non da sola. La frase di recupero sblocca il tuo archivio crittografato, ma l’archivio stesso risiede esclusivamente sul tuo dispositivo. Se perdi o cancelli i dati da quel dispositivo senza aver mai effettuato un backup, la frase non avrà più nulla da sbloccare. Assicurati sempre di abbinare la tua frase di recupero a un backup su Google Drive o a un backup dei file — vedi la domanda successiva.',
      },
      {
        q: 'Come faccio a eseguire il backup del mio portafoglio?',
        a: 'Da "Impostazioni", esegui il backup del tuo vault crittografato sul tuo Google Drive — dove verrà archiviato in una cartella privata accessibile solo dall\'app, di cui wwwallet non può visualizzare il contenuto — oppure come file da scaricare e conservare autonomamente. Esegui questa operazione ogni volta che configuri un portafoglio o aggiungi nuovi conti.',
      },
      {
        q: 'Posso utilizzare wwwallet su più di un dispositivo?',
        a: 'Sì, ma la sincronizzazione non avviene automaticamente: ogni dispositivo dispone di un proprio archivio locale. Per utilizzare wwwallet su un nuovo dispositivo, ripristinalo da un backup su Drive o da un file, quindi sbloccalo con la tua frase di recupero.',
      },
      {
        q: 'Cosa succede se perdo il mio dispositivo e non ho mai eseguito un backup?',
        a: 'I tuoi fondi sono irrecuperabili. È una scelta deliberata: wwwallet non dispone di un sistema di account e non conserva alcuna copia del tuo vault da nessuna parte, quindi nessuno — nemmeno noi — può ripristinarlo per te. È il compromesso necessario per avere un wallet a cui nessuno, tranne te, può accedere.',
      },
      {
        q: 'Le chiavi di accesso (Face ID / Touch ID) vengono trasferite su un nuovo dispositivo?',
        a: 'No. Una passkey è associata al dispositivo su cui è stata creata. Dopo aver ripristinato un backup su un nuovo dispositivo, sbloccalo utilizzando la tua frase di recupero e potrai impostare una nuova passkey su quel dispositivo.',
      },
      {
        q: 'wwwallet è open source?',
        a: 'No — è disponibile il codice sorgente. Il codice sorgente completo è pubblico su GitHub, quindi chiunque può leggerlo, esaminarlo e verificarne la correttezza, ma non è open source: il codice è concesso in licenza ai sensi della PolyForm Strict License 1.0.0.',
      },
      {
        q: 'Cosa posso fare con il codice?',
        a: 'È possibile leggere e verificare l’intero contenuto, nonché utilizzare una copia non modificata per scopi non commerciali quali lo studio personale, la ricerca e i test. Non è consentito distribuirlo, modificarlo o creare opere derivate (compresi i fork), né utilizzarlo a fini commerciali. Se avete bisogno di qualcosa che la licenza non consente, contattate il titolare del copyright per ottenere una licenza separata.',
      },
      {
        q: "È sicuro usare wwwallet? C'è qualche garanzia?",
        a: 'wwwallet è un software non custodiale fornito “così com’è”, senza garanzie di alcun tipo. Solo tu hai il controllo delle tue chiavi e dei tuoi fondi: nessuno, noi compresi, può recuperare una frase di recupero o un backup smarrito, annullare una transazione o risarcirti per eventuali perdite. Utilizza solo fondi che puoi permetterti di perdere, ricontrolla gli indirizzi e le reti prima di effettuare un invio; nulla di quanto riportato qui costituisce una consulenza finanziaria, di investimento, legale o fiscale.',
      },
      {
        q: 'Quali reti supporta wwwallet?',
        a: 'La mainnet di Ethereum, oltre alle reti Layer 2 Polygon, Arbitrum, Base e Optimism — tutte gestite dallo stesso insieme di account.',
      },
      {
        q: 'Come posso ricaricare il mio portafoglio?',
        a: 'Apri un conto, seleziona “Visualizza codice QR” per visualizzarne l’indirizzo, quindi invia fondi a quell’indirizzo da un exchange o da un altro portafoglio. Assicurati di effettuare il trasferimento sulla rete corretta (Ethereum, Polygon, Arbitrum, Base o Optimism): lo stesso indirizzo funziona su tutte queste reti, ma i fondi inviati su una rete appariranno solo su quella rete. Ti servirà anche una piccola quantità della moneta nativa della rete (come ETH) per pagare le commissioni di transazione.',
      },
      {
        q: 'Cosa posso fare con wwwallet?',
        a: 'Invia: trasferisci ETH o qualsiasi token a un indirizzo che incolli, scansiona da un codice QR o selezioni dai tuoi conti, e verifica i dettagli prima di confermare. Swap: scambia un token con un altro sulla stessa rete dalla scheda “Swap”, con quotazione e stima delle commissioni visualizzate in anticipo. Ricevi: mostra il tuo indirizzo sotto forma di codice QR. Puoi inoltre visualizzare i tuoi saldi in USD e la cronologia delle transazioni su tutte le reti supportate.',
      },
      {
        q: 'Cosa sa di me wwwallet?',
        a: 'Nulla che ti identifichi. Non ci sono account, login o database. I dati relativi al saldo e ai prezzi vengono recuperati tramite il backend di wwwallet, anziché tramite il tuo browser che si collega direttamente a fornitori terzi, e tale backend non ha mai accesso alle tue chiavi, alle tue password o alla tua frase di recupero.',
      },
    ],
  },
  footer: {
    tagline: 'Un portafoglio Ethereum personale e senza custodia.',
    sourceLink: 'Visualizza il codice sorgente su GitHub',
    copyright: '© {year} wwwallet',
    licenseLink: 'Concesso in licenza ai sensi della PolyForm Strict 1.0.0',
    disclaimer:
      'Software non di custodia fornito “così com’è”, senza alcuna garanzia. Non costituisce consulenza finanziaria. L’utente è l’unico responsabile delle proprie chiavi e dei propri fondi.',
  },
}
