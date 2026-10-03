export default {
  nav: {
    wallet: 'wwwallet',
    ethereum: 'Ethereum',
    crypto: 'Cripto',
    faqs: 'Domande frequenti',
    launch: 'Lancia wwwallet',
    home: 'Torna all’inizio',
    sectionNavLabel: 'Navigazione tra le sezioni',
    principles: 'Principi',
  },
  settings: {
    open: 'Impostazioni',
    close: 'Chiudi le impostazioni',
    theme: 'Tema',
    themeLight: 'Leggero',
    themeDark: 'Scuro',
    language: 'Lingua',
    search: 'Cerca',
    noMatches: 'Nessun risultato',
    version: 'Versione {version}',
  },
  hero: {
    eyebrow: 'Un portafoglio Ethereum gratuito e non custodito',
    heading1: 'Le tue chiavi.',
    heading2: 'Il tuo dispositivo.',
    heading3: 'Gratis per tutti.',
    lede: 'wwwallet funziona nel tuo browser e conserva le tue chiavi crittografate sul tuo dispositivo. Non devi creare alcun account, non devi pagare nulla e non ci sono pubblicità; funziona allo stesso modo per tutti.',
    ctaPrimary: 'Lancia wwwallet',
    ctaSecondary: 'Scopri come funziona',
    note: 'Nessuna registrazione · Nessuna pubblicità · Nessun tracciamento · 31 lingue',
  },
  wallet: {
    eyebrow: 'wwwallet',
    heading: 'Progettato in modo che solo tu possa aprirlo',
    lede: 'wwwallet non custodisce i tuoi fondi: ti aiuta a custodirli da solo. Ecco cosa significa in pratica.',
    points: [
      {
        title: 'Non custodito, sempre',
        body: 'Le tue chiavi private vengono generate e crittografate sul tuo dispositivo. I server di wwwallet non le vedono mai: non c’è nessun database di chiavi da violare, perché semplicemente non esiste alcun database.',
      },
      {
        title: 'Crittografato con AES-256, sbloccabile a modo tuo',
        body: 'Il tuo vault è protetto con crittografia AES-256-GCM. Sbloccalo con la tua frase di recupero oppure attiva un codice di accesso — Face ID, Touch ID o Windows Hello — per un accesso veloce e solo locale.',
      },
      {
        title: 'Si blocca automaticamente',
        body: 'wwwallet si blocca dopo un breve periodo di inattività e non salva mai la tua sessione sbloccata sul disco: chiudi la scheda e l’app se ne dimentica, di proposito.',
      },
      {
        title: 'Cinque reti Ethereum, un unico set di account',
        body: 'Conserva e invia sulla mainnet di Ethereum, su Polygon, Arbitrum, Base e Optimism utilizzando gli stessi account e indirizzi.',
      },
    ],
    caveatTitle: 'La tua frase di recupero sblocca il tuo caveau: non è un backup magico',
    caveatBody:
      'Salva la tua frase di recupero in un posto sicuro, ma fai anche un backup su Google Drive o in un file. Avrai bisogno del backup per ripristinare il tuo portafoglio su un nuovo dispositivo e della frase per sbloccarlo una volta fatto.',
    caveatLink: "Per saperne di più, dai un'occhiata alle FAQ",
  },
  ethereum: {
    eyebrow: 'Ethereum',
    heading: 'Perché Ethereum',
    lede: 'wwwallet è progettato specificamente per Ethereum. Ecco perché, in parole semplici.',
    points: [
      {
        title: 'Un computer mondiale, non solo un registro',
        body: 'Ethereum ha preso l’idea di Bitcoin di un registro condiviso e a prova di manomissione e l’ha ampliata: un computer globale e programmabile su cui chiunque può costruire, e che nessuna singola entità può spegnere.',
      },
      {
        title: 'Protezione tramite staking, non tramite mining',
        body: 'Dal “Merge” del 2022, Ethereum è protetto dal Proof-of-Stake anziché dal mining ad alto consumo energetico: i validatori mettono a rischio i propri ETH come garanzia invece di bruciare elettricità per competere per i blocchi.',
      },
      {
        title: 'Aperto e senza autorizzazioni',
        body: 'Nessuno deve approvare il tuo account. Chiunque, ovunque si trovi, può detenere ETH o sviluppare un’applicazione su Ethereum: le stesse regole valgono per tutti, comprese le istituzioni più grandi.',
      },
      {
        title: 'Lo standard su cui si basano le altre reti',
        body: 'Le reti Layer-2 come Arbitrum, Base e Optimism — tutte supportate da wwwallet — estendono la sicurezza di Ethereum a transazioni più veloci ed economiche, invece di partire da zero.',
      },
    ],
    linkLabel: 'Per saperne di più, visita il sito della Fondazione Ethereum',
    linkUrl: 'https://ethereum.org/en/foundation/',
  },
  crypto: {
    eyebrow: 'Cripto',
    heading: 'Le criptovalute, in parole semplici',
    lede: 'Alcuni concetti che vale la pena capire prima di possedere criptovalute in prima persona — non solo con wwwallet.',
    points: [
      {
        title: 'Custodiale vs. non custodiale',
        body: 'Un portafoglio custodito o un exchange custodisce le tue chiavi per te: è comodo, ma significa affidarti a qualcun altro sperando che non blocchi, perda o usi in modo improprio i tuoi fondi. Un portafoglio non custodito come wwwallet lascia le chiavi, e la responsabilità, esclusivamente nelle tue mani.',
      },
      {
        title: 'Staking vs. mining',
        body: 'Il mining Proof-of-Work protegge una blockchain con potenza di calcolo grezza ed elettricità. Il Proof-of-Stake la protegge invece con capitale a rischio. Il passaggio di Ethereum allo staking ha ridotto il suo consumo energetico di oltre il 99,9% — più o meno la differenza tra alimentare un piccolo paese e una piccola città.',
      },
      {
        title: 'Oltre Ethereum',
        body: 'Bitcoin privilegia la semplicità e la prevedibilità rispetto alla programmabilità. Catene come Solana puntano sulla velocità di trasmissione grezza, spesso sacrificando la decentralizzazione per raggiungerla. Ethereum punta innanzitutto sulla decentralizzazione e sulla sicurezza, lasciando la velocità e i costi alle reti di secondo livello (Layer-2) costruite sopra di esso.',
      },
      {
        title: 'Nessuno che sia in buona fede ti chiederà mai la tua frase',
        body: 'Nessun exchange, nessun agente dell’assistenza e nessuno di wwwallet ti chiederà mai la tua frase di recupero — indipendentemente dall’app che usi. Chiunque lo faccia sta cercando di derubarti.',
      },
    ],
    linkLabel: 'Approfondisci l’argomento con il podcast di Bankless',
    linkUrl: 'https://www.bankless.com/',
  },
  faqs: {
    eyebrow: 'Domande frequenti',
    heading: 'Domande frequenti',
    items: [
      {
        q: 'wwwallet è davvero gratis?',
        a: 'Sì. L’uso è gratuito, non ci sono livelli premium né contenuti a pagamento, e wwwallet non aggiunge commissioni a nulla di ciò che invii o scambi. L’unico costo inevitabile è la commissione di transazione (gas) della rete stessa, che va alla rete piuttosto che a wwwallet. Le quotazioni di scambio provengono dall’aggregatore di exchange 0x, che può includere una propria commissione su alcune operazioni: eventuali commissioni di questo tipo sono indicate nella schermata di riepilogo prima della conferma.',
      },
      {
        q: 'Ci sono pubblicità, tracker o strumenti di analisi?',
        a: 'No. wwwallet non mostra pubblicità, non esegue script di analisi o tracciamento e non crea un tuo profilo. Non c’è alcun account, quindi non c’è nulla a cui collegarlo.',
      },
      {
        q: 'Mi serve un account o un documento d’identità per usarla?',
        a: 'No. Non c’è bisogno di registrarsi, né di fornire indirizzo e-mail, numero di telefono o verifica dell’identità: crei un portafoglio sul tuo dispositivo e inizi subito a usarlo.',
      },
      {
        q: 'Se è gratis, come fa wwwallet a sostenersi?',
        a: 'Non guadagna dai suoi utenti: niente commissioni, niente pubblicità, niente vendita di dati. I costi di gestione sono tenuti bassi per scelta: l’app funziona direttamente nel tuo browser e il backend si limita a trasmettere i dati pubblici della blockchain e dei prezzi.',
      },
      {
        q: 'Qualcuno può bloccare il mio portafoglio?',
        a: 'Non c’è nessun account, quindi non c’è nulla che wwwallet — o chiunque altro — possa bloccare. Le tue chiavi non lasciano mai il tuo dispositivo e le transazioni vengono firmate lì prima di essere inviate alla rete. I tuoi fondi risiedono su Ethereum, non su wwwallet: puoi visualizzare la chiave privata o la frase di recupero di qualsiasi account dal relativo menu e importarla in qualsiasi altra app di portafoglio Ethereum quando vuoi.',
      },
      {
        q: 'La mia frase di recupero è sufficiente per recuperare il mio portafoglio?',
        a: 'Non da sola. La tua frase di recupero sblocca il tuo archivio crittografato, ma l’archivio stesso risiede solo sul tuo dispositivo. Se perdi o resetti quel dispositivo senza aver mai fatto un backup, non ci sarà più nulla che la frase possa sbloccare. Abbina sempre la tua frase di recupero a un backup su Google Drive o su un file — vedi la domanda successiva.',
      },
      {
        q: 'Come faccio a fare il backup del mio portafoglio?',
        a: 'Da Impostazioni, esegui il backup del tuo vault crittografato sul tuo Google Drive o come file da scaricare e conservare personalmente. Il backup su Drive viene salvato in una cartella privata dell’app e wwwallet non può vedere nient’altro nel tuo Drive. Esegui il backup al momento della prima configurazione e poi ogni volta che aggiungi nuovi account.',
      },
      {
        q: 'Posso usare wwwallet su più di un dispositivo?',
        a: 'Sì, ma non si sincronizza automaticamente: ogni dispositivo ha il proprio archivio locale. Per usare wwwallet su un nuovo dispositivo, ripristinalo da un backup su Drive o da un file, poi sbloccalo con la tua frase di recupero.',
      },
      {
        q: 'Cosa succede se perdo il mio dispositivo e non ho mai fatto un backup?',
        a: 'I tuoi fondi sono irrecuperabili. È una scelta progettuale: wwwallet non ha un sistema di account e non conserva alcuna copia del tuo vault da nessuna parte, quindi nessuno — noi compresi — può ripristinarlo per te. È il compromesso da accettare per avere chiavi a cui nessuno, tranne te, può accedere.',
      },
      {
        q: 'Le passkey (Face ID / Touch ID) si trasferiscono su un nuovo dispositivo?',
        a: 'No. Una passkey è legata al dispositivo su cui è stata creata. Dopo aver ripristinato un backup su un nuovo dispositivo, sbloccalo con la tua frase di recupero e potrai impostare una nuova passkey su quel dispositivo.',
      },
      {
        q: 'wwwallet è open source?',
        a: 'No, è a codice sorgente disponibile. Il codice sorgente completo è pubblico su GitHub, quindi chiunque può leggerlo, esaminarlo e verificarlo, ma non è open source: il codice è concesso in licenza ai sensi della PolyForm Strict License 1.0.0.',
      },
      {
        q: 'Cosa posso fare con il codice?',
        a: 'Puoi leggere e verificare tutto il codice, ed eseguire una copia non modificata per scopi non commerciali come lo studio personale, la ricerca e i test. Non puoi distribuirlo, modificarlo o creare opere derivate (compresi i fork), né utilizzarlo a fini commerciali. Se hai bisogno di qualcosa che la licenza non consente, contatta il titolare del copyright per ottenere una licenza separata.',
      },
      {
        q: 'È sicuro usare wwwallet? C’è qualche garanzia?',
        a: 'wwwallet è un software non custodito fornito “così com’è”, senza garanzie di alcun tipo. Sei tu l’unico a controllare le tue chiavi e i tuoi fondi: nessuno, noi compresi, può recuperare una frase di recupero o un backup smarrito, annullare una transazione o risarcirti per eventuali perdite. Usa solo fondi che puoi permetterti di perdere, ricontrolla indirizzi e reti prima di inviare, e tieni presente che nulla di quanto riportato qui costituisce una consulenza finanziaria, di investimento, legale o fiscale.',
      },
      {
        q: 'Quali reti supporta wwwallet?',
        a: 'La mainnet di Ethereum, oltre alle reti Layer-2 Polygon, Arbitrum, Base e Optimism — tutte gestite dallo stesso insieme di account.',
      },
      {
        q: 'Come faccio a ricaricare il mio portafoglio?',
        a: 'Apri un conto, scegli “Visualizza codice QR” per vedere il tuo indirizzo e invia fondi a quell’indirizzo da un exchange o da un altro portafoglio. Assicurati di inviare i fondi sulla rete giusta (Ethereum, Polygon, Arbitrum, Base o Optimism): lo stesso indirizzo funziona su tutte queste reti, ma i fondi inviati su una rete appariranno solo su quella rete. Ti servirà anche un po’ della moneta nativa della rete (come ETH) per pagare le commissioni di transazione.',
      },
      {
        q: 'Cosa posso fare con wwwallet?',
        a: 'Invia: trasferisci ETH o qualsiasi token a un indirizzo che incolli, scansiona da un codice QR o scegli dai tuoi account, e controlla i dettagli prima di confermare. Scambia: scambia un token con un altro sulla stessa rete dalla scheda "Scambia", con quotazione e stima delle commissioni mostrate in anticipo. Ricevi: mostra il tuo indirizzo come codice QR. Puoi anche visualizzare i tuoi saldi in USD e la cronologia delle transazioni su tutte le reti supportate.',
      },
      {
        q: 'Cosa sa wwwallet di me?',
        a: 'Niente che ti identifichi. Non ci sono account, login o database. I dati relativi al saldo e ai prezzi vengono recuperati tramite il backend di wwwallet, anziché tramite il tuo browser che chiama direttamente fornitori di terze parti, e quel backend non vede mai le tue chiavi, le tue password o la tua frase di recupero.',
      },
    ],
  },
  footer: {
    tagline: 'Un portafoglio Ethereum gratuito e non custodito per tutti.',
    copyright: '© {year} wwwallet',
    licenseLink: 'Concesso in licenza ai sensi della PolyForm Strict 1.0.0',
    disclaimer:
      'Il software non custodito viene fornito “così com’è”, senza alcuna garanzia. Non si tratta di consulenza finanziaria. Sei l’unico responsabile delle tue chiavi e dei tuoi fondi.',
  },
  principles: {
    eyebrow: 'Principi',
    heading: 'Gratuito, aperto e pensato per tutti',
    lede: 'Un software che custodisce i tuoi soldi dovrebbe essere uno strumento che usi, non un’azienda costruita sulle spalle dei propri utenti. Questi sono i principi su cui si basa wwwallet.',
    items: [
      {
        title: 'Gratis, senza trucchi',
        body: 'Niente prezzi, niente piani premium, niente funzionalità a pagamento. wwwallet non aggiunge commissioni proprie: l’unico costo è la commissione di transazione della rete stessa.',
      },
      {
        title: 'Niente pubblicità, niente tracciamento',
        body: 'Niente pubblicità, niente analisi, niente script di tracciamento e nessun dato venduto a nessuno. Tanto per cominciare, non c’è nessun tuo profilo da vendere.',
      },
      {
        title: 'Nessuna registrazione',
        body: 'Nessuna verifica tramite e-mail, numero di telefono o documento d’identità. Apri l’app, crea un portafoglio e sei pronto.',
      },
      {
        title: 'Le tue chiavi restano con te',
        body: 'Le chiavi vengono create e crittografate sul tuo dispositivo e non lo lasciano mai. wwwallet non può vederle, spostare i tuoi fondi né bloccarti l’accesso.',
      },
      {
        title: 'Funziona ovunque',
        body: 'Funziona su qualsiasi browser moderno, sia su telefono che su computer, e si installa come un’app — non serve un account sull’app store.',
      },
      {
        title: 'In 31 lingue',
        body: 'Usala nella lingua con cui ti trovi più a tuo agio, in modalità chiara o scura.',
      },
      {
        title: 'Codice aperto',
        body: 'Il codice sorgente completo è pubblicato affinché chiunque possa leggerlo e verificarlo. Si tratta di codice "source-available" anziché "open source": le FAQ spiegano cosa consente la licenza.',
      },
      {
        title: 'Niente da disattivare',
        body: 'Non c’è nessun account che possa essere bloccato. I tuoi fondi risiedono direttamente su Ethereum e la chiave di qualsiasi account può essere trasferita su un altro portafoglio in qualsiasi momento.',
      },
    ],
  },
  license: {
    title: 'Licenza',
    close: 'Chiudi',
    summaryTitle: 'In parole povere',
    canUse: 'Puoi usare wwwallet gratuitamente, per scopi personali e altri scopi non commerciali.',
    canRead: 'Puoi leggere e controllare ogni riga del suo codice sorgente.',
    cannot: 'Non puoi copiarlo, modificarlo, ridistribuirlo o venderlo.',
    englishNote:
      'Di seguito trovi la licenza completa, nella versione originale in inglese: si tratta del testo legale.',
    viewSource: 'Visualizza il codice sorgente su GitHub',
  },
  meta: {
    title: 'wwwallet — Portafoglio Ethereum gratuito e non custodito',
    description:
      'Portafoglio Ethereum gratuito nel tuo browser. Nessuna registrazione, nessuna pubblicità, nessun tracciamento: le tue chiavi rimangono crittografate sul tuo dispositivo. Ethereum, Arbitrum, Base, Optimism e Polygon.',
  },
}
