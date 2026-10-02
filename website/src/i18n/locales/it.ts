export default {
  nav: {
    wallet: 'Portafoglio',
    ethereum: 'Ethereum',
    crypto: 'Criptovalute',
    faqs: 'Domande frequenti',
    launch: 'Avvia il portafoglio',
    home: "Torna all'inizio",
    sectionNavLabel: 'Navigazione tra le sezioni',
    principles: 'Principi',
  },
  settings: {
    open: 'Impostazioni',
    close: 'Chiudi impostazioni',
    theme: 'Tema',
    themeLight: 'Luce',
    themeDark: 'Buio',
    language: 'Lingua',
    search: 'Cerca',
    noMatches: 'Nessun risultato',
  },
  hero: {
    eyebrow: 'Un portafoglio Ethereum gratuito e senza custodia',
    heading1: 'Le tue chiavi.',
    heading2: 'Il tuo dispositivo.',
    heading3: 'Gratuito per tutti.',
    lede: 'wwwallet funziona nel tuo browser e conserva le tue chiavi crittografate sul tuo dispositivo. Non devi creare alcun account, non devi pagare nulla e non ci sono pubblicità: è semplicemente un portafoglio che funziona allo stesso modo per tutti.',
    ctaPrimary: 'Avvia il portafoglio',
    ctaSecondary: 'Scopri come funziona',
    note: 'Nessuna registrazione · Nessuna pubblicità · Nessun tracciamento · 31 lingue',
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
        q: 'wwwallet è davvero gratuito?',
        a: 'Sì. L’utilizzo è gratuito, non ci sono livelli premium né contenuti a pagamento, e wwwallet non applica alcuna commissione sulle operazioni di invio o scambio. L’unico costo inevitabile è la commissione di transazione (gas) della rete stessa, che va alla rete piuttosto che a wwwallet. Le quotazioni di scambio provengono dall’aggregatore di exchange 0x, che può applicare una propria commissione su alcune operazioni; eventuali commissioni di questo tipo sono indicate nella schermata di riepilogo prima della conferma.',
      },
      {
        q: 'Ci sono pubblicità, tracker o strumenti di analisi?',
        a: "No. wwwallet non mostra pubblicità, non esegue script di analisi o tracciamento e non crea un profilo dell'utente. Non esiste un account, quindi non c'è nulla a cui collegarlo.",
      },
      {
        q: "Devo avere un account o un documento d'identità per utilizzarlo?",
        a: "No. Non è richiesta alcuna registrazione, né l'inserimento di un indirizzo e-mail, di un numero di telefono o di un documento d'identità: basta creare un portafoglio sul proprio dispositivo e iniziare a utilizzarlo.",
      },
      {
        q: 'Se è gratuito, come fa wwwallet a ripagarsi?',
        a: 'Non ricava profitti dai propri utenti: nessuna commissione, nessuna pubblicità, nessuna vendita di dati. I costi di gestione sono volutamente contenuti: il wallet funziona direttamente nel browser, mentre il backend si limita a trasmettere i dati pubblici della blockchain e quelli relativi ai prezzi.',
      },
      {
        q: 'Qualcuno può bloccare il mio portafoglio?',
        a: "Non esiste alcun account, quindi non c'è nulla che wwwallet — o chiunque altro — possa bloccare. Le tue chiavi non lasciano mai il tuo dispositivo e le transazioni vengono firmate lì prima di essere inviate alla rete. I tuoi fondi risiedono su Ethereum, non in wwwallet: puoi visualizzare la chiave privata o la frase di recupero di qualsiasi account dal relativo menu e importarla in un altro portafoglio Ethereum quando vuoi.",
      },
      {
        q: 'La mia frase di recupero è sufficiente per riavere il mio portafoglio?',
        a: 'Non da sola. La frase di recupero sblocca il tuo archivio crittografato, ma l’archivio stesso risiede esclusivamente sul tuo dispositivo. Se perdi o cancelli il dispositivo senza aver mai effettuato un backup, la frase non avrà più nulla da sbloccare. Abbina sempre la frase di recupero a un backup su Google Drive o a un backup dei file — vedi la domanda successiva.',
      },
      {
        q: 'Come posso eseguire il backup del mio portafoglio?',
        a: 'Da "Impostazioni", esegui il backup del tuo vault crittografato sul tuo Google Drive — dove verrà archiviato in una cartella privata accessibile solo dall\'app, di cui wwwallet non può visualizzare il contenuto — oppure come file da scaricare e conservare autonomamente. Esegui questa operazione ogni volta che configuri un portafoglio o aggiungi nuovi conti.',
      },
      {
        q: 'Posso utilizzare wwwallet su più di un dispositivo?',
        a: 'Sì, ma la sincronizzazione non avviene automaticamente: ogni dispositivo dispone di un proprio archivio locale. Per utilizzare wwwallet su un nuovo dispositivo, ripristinalo da un backup su Drive o da un file, quindi sbloccalo con la tua frase di recupero.',
      },
      {
        q: 'Cosa succede se smarrisco il mio dispositivo e non ho mai eseguito un backup?',
        a: 'I tuoi fondi sono irrecuperabili. È una scelta deliberata: wwwallet non dispone di un sistema di account e non conserva alcuna copia del tuo vault da nessuna parte, quindi nessuno — nemmeno noi — può ripristinarlo per te. È il compromesso necessario per avere un wallet a cui nessuno, tranne te, può accedere.',
      },
      {
        q: 'Le chiavi di accesso (Face ID / Touch ID) vengono trasferite su un nuovo dispositivo?',
        a: 'No. Una passkey è associata al dispositivo su cui è stata creata. Dopo aver ripristinato un backup su un nuovo dispositivo, sbloccalo utilizzando la tua frase di recupero e potrai impostare una nuova passkey su quel dispositivo.',
      },
      {
        q: 'wwwallet è open source?',
        a: 'No — è disponibile il codice sorgente. Il codice sorgente completo è pubblico su GitHub, quindi chiunque può leggerlo, esaminarlo e verificarlo, ma non è open source: il codice è concesso in licenza ai sensi della PolyForm Strict License 1.0.0.',
      },
      {
        q: 'Cosa posso fare con il codice?',
        a: "È possibile leggere e verificare l'intero contenuto, nonché utilizzare una copia non modificata per scopi non commerciali quali lo studio personale, la ricerca e la sperimentazione. Non è consentito distribuirlo, modificarlo o creare opere derivate (compresi i fork), né utilizzarlo a fini commerciali. Se avete bisogno di qualcosa che la licenza non consente, contattate il titolare del copyright per ottenere una licenza separata.",
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
        a: 'Apri un conto, seleziona “Visualizza codice QR” per visualizzarne l’indirizzo, quindi invia fondi a quell’indirizzo da un exchange o da un altro portafoglio. Assicurati di effettuare l’invio sulla rete corretta (Ethereum, Polygon, Arbitrum, Base o Optimism): lo stesso indirizzo funziona su tutte queste reti, ma i fondi inviati su una rete appariranno solo su quella rete. Ti servirà anche una piccola quantità della moneta nativa della rete (come ETH) per pagare le commissioni di transazione.',
      },
      {
        q: 'Cosa posso fare con wwwallet?',
        a: 'Invia: trasferisci ETH o qualsiasi token a un indirizzo che incolli, scansiona da un codice QR o selezioni dai tuoi conti, e verifica i dettagli prima di confermare. Scambio: scambia un token con un altro sulla stessa rete dalla scheda “Scambio”, con quotazione e stima delle commissioni visualizzate in anticipo. Ricevi: mostra il tuo indirizzo sotto forma di codice QR. Puoi anche visualizzare i tuoi saldi in dollari statunitensi (USD) e la cronologia delle transazioni su tutte le reti supportate.',
      },
      {
        q: 'Cosa sa di me wwwallet?',
        a: 'Nulla che ti identifichi. Non ci sono account, login o database. I dati relativi al saldo e ai prezzi vengono recuperati tramite il backend di wwwallet, anziché tramite il tuo browser che si rivolge direttamente a fornitori terzi, e tale backend non ha mai accesso alle tue chiavi, alle tue password o alla tua frase di recupero.',
      },
    ],
  },
  footer: {
    tagline: 'Un portafoglio Ethereum gratuito e senza custodia, per tutti.',
    copyright: '© {year} wwwallet',
    licenseLink: 'Concesso in licenza ai sensi della PolyForm Strict 1.0.0',
    disclaimer:
      'Software non di custodia fornito “così com’è”, senza alcuna garanzia. Non costituisce consulenza finanziaria. L’utente è l’unico responsabile delle proprie chiavi e dei propri fondi.',
  },
  principles: {
    eyebrow: 'Principi',
    heading: 'Gratuito, aperto e pensato per tutti',
    lede: 'Un portafoglio dovrebbe essere uno strumento da utilizzare, non un’attività commerciale che si basa sui propri utenti. Questi sono i principi su cui si fonda wwwallet.',
    items: [
      {
        title: 'Gratis, senza alcun trucco',
        body: 'Nessun costo, nessun piano premium, nessuna funzionalità a pagamento. wwwallet non applica commissioni proprie: l’unico costo è la commissione di transazione prevista dalla rete.',
      },
      {
        title: 'Nessuna pubblicità, nessun tracciamento',
        body: 'Nessuna pubblicità, nessuna analisi dei dati, nessun script di tracciamento e nessun dato venduto a nessuno. Innanzitutto, non esiste alcun tuo profilo da vendere.',
      },
      {
        title: 'Nessuna registrazione',
        body: 'Non serve né un indirizzo e-mail, né un numero di telefono, né la verifica dell’identità. Basta aprirlo, creare un portafoglio e il gioco è fatto.',
      },
      {
        title: 'Le tue chiavi rimangono con te',
        body: "Le chiavi vengono generate e crittografate sul tuo dispositivo e non escono mai da esso. wwwallet non può visualizzarle, spostare i tuoi fondi né impedirti l'accesso.",
      },
      {
        title: 'Funziona ovunque',
        body: "Funziona su qualsiasi browser moderno, sia su cellulare che su computer, e si installa come un'app — non è necessario avere un account su un app store.",
      },
      {
        title: 'In 31 lingue',
        body: 'Usalo nella lingua con cui ti trovi più a tuo agio, in modalità chiara o scura.',
      },
      {
        title: 'Codice aperto',
        body: 'Il codice sorgente completo è pubblicato affinché chiunque possa leggerlo e verificarne la correttezza. Si tratta di codice sorgente disponibile piuttosto che open source: le FAQ spiegano cosa consente la licenza.',
      },
      {
        title: "Non c'è nulla da spegnere",
        body: 'Non esiste alcun account che possa essere bloccato. I tuoi fondi risiedono direttamente sulla rete Ethereum e la chiave di qualsiasi account può essere trasferita in un altro portafoglio in qualsiasi momento.',
      },
    ],
  },
  license: {
    title: 'Licenza',
    close: 'Chiudi',
    summaryTitle: 'In parole povere',
    canUse:
      'È possibile utilizzare wwwallet gratuitamente, per scopi personali e altri scopi non commerciali.',
    canRead: 'È possibile leggere e verificare ogni riga del suo codice sorgente.',
    cannot: 'Non è consentito copiarlo, modificarlo, ridistribuirlo o venderlo.',
    englishNote:
      'Di seguito è riportata la licenza completa, nella versione originale in inglese: si tratta del testo legale.',
    viewSource: 'Visualizza su GitHub',
  },
}
