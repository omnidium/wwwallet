export default {
  nav: {
    wallet: 'wwwallet',
    ethereum: 'Ethereum',
    crypto: 'Crypto',
    faqs: 'FAQ',
    launch: 'Lance wwwallet',
    home: 'Retour en haut de la page',
    sectionNavLabel: 'Navigation entre les sections',
    principles: 'Principes',
  },
  settings: {
    open: 'Paramètres',
    close: 'Fermer les paramètres',
    theme: 'Thème',
    themeLight: 'Léger',
    themeDark: 'Sombre',
    language: 'Langue',
    search: 'Recherche',
    noMatches: 'Aucun résultat',
    version: 'Version {version}',
  },
  hero: {
    eyebrow: 'Un portefeuille Ethereum gratuit et non dépositaire',
    heading1: 'Tes clés.',
    heading2: 'Ton appareil.',
    heading3: 'Gratuit pour tout le monde.',
    lede: 'wwwallet fonctionne dans ton navigateur et conserve tes clés cryptées sur ton propre appareil. Pas besoin de créer de compte, rien à payer, pas de pub, et ça marche de la même façon pour tout le monde.',
    ctaPrimary: 'Lance wwwallet',
    ctaSecondary: 'Découvre comment ça marche',
    note: 'Pas d’inscription · Pas de pubs · Pas de suivi · 31 langues',
  },
  wallet: {
    eyebrow: 'wwwallet',
    heading: "Conçu pour que toi seul puisses l'ouvrir",
    lede: "wwwallet ne détient pas tes fonds — il t'aide à les conserver toi-même. Voici ce que ça signifie concrètement.",
    points: [
      {
        title: 'Non-custodial, toujours',
        body: 'Tes clés privées sont générées et chiffrées sur ton propre appareil. Les serveurs de wwwallet n’y ont jamais accès — il n’y a pas de base de données de clés à pirater, car il n’y a tout simplement pas de base de données.',
      },
      {
        title: 'Chiffré avec AES-256, à déverrouiller comme tu veux',
        body: 'Ton coffre-fort est protégé par un chiffrement AES-256-GCM. Déverrouille-le avec ta phrase de récupération, ou active un code d’accès — Face ID, Touch ID ou Windows Hello — pour un accès rapide et exclusivement local.',
      },
      {
        title: 'Se verrouille automatiquement',
        body: 'wwwallet se verrouille après une courte période d’inactivité et n’enregistre jamais ta session déverrouillée sur le disque : si tu fermes l’onglet, l’appli oublie tout, et c’est voulu.',
      },
      {
        title: 'Quinze réseaux Ethereum, un seul ensemble de comptes',
        body: 'Conserve et envoie des cryptomonnaies sur le réseau principal d’Ethereum et 14 autres réseaux — dont Arbitrum, Base, Optimism, Polygon, Linea et ZKsync — avec les mêmes comptes et adresses.',
      },
    ],
    caveatTitle:
      'Ta phrase de récupération te permet d’accéder à ton coffre-fort — ce n’est pas une sauvegarde magique',
    caveatBody:
      'Enregistre ta phrase de récupération dans un endroit sûr, mais fais aussi une sauvegarde sur Google Drive ou dans un fichier. Tu auras besoin de cette sauvegarde pour restaurer ton portefeuille sur un nouvel appareil, et de la phrase pour le déverrouiller une fois que ce sera fait.',
    caveatLink: 'Pour en savoir plus, consulte la FAQ',
  },
  ethereum: {
    eyebrow: 'Ethereum',
    heading: 'Pourquoi Ethereum ?',
    lede: 'wwwallet est spécialement conçu pour Ethereum. Voici pourquoi, en termes simples.',
    points: [
      {
        title: 'Un ordinateur mondial, pas seulement un registre',
        body: 'Ethereum a repris l’idée du Bitcoin d’un registre partagé et inviolable, puis l’a développée : un ordinateur mondial et programmable sur lequel tout le monde peut s’appuyer, et qu’aucune entité ne peut désactiver.',
      },
      {
        title: 'Sécurisé par le staking, pas par le minage',
        body: 'Depuis « The Merge » en 2022, Ethereum est sécurisé par la preuve d’enjeu (Proof-of-Stake) plutôt que par le minage, très gourmand en énergie : les validateurs mettent des ETH en jeu comme garantie au lieu de consommer de l’électricité pour se disputer les blocs.',
      },
      {
        title: 'Ouvert et sans autorisation',
        body: 'Personne n’approuve ton compte. N’importe qui, n’importe où, peut détenir des ETH ou développer une application sur Ethereum — les mêmes règles s’appliquent à tout le monde, y compris aux plus grandes institutions.',
      },
      {
        title: "La norme sur laquelle s'appuient les autres réseaux",
        body: 'Les réseaux de couche 2 comme Arbitrum, Base et Optimism — tous pris en charge par wwwallet — étendent la sécurité d’Ethereum à des transactions plus rapides et moins chères, sans avoir à repartir de zéro.',
      },
    ],
    linkLabel: 'Pour en savoir plus, rends-toi sur le site de la Fondation Ethereum',
    linkUrl: 'https://ethereum.org/en/foundation/',
  },
  crypto: {
    eyebrow: 'Crypto',
    heading: 'La crypto, en termes simples',
    lede: 'Quelques concepts qu’il est utile de comprendre avant de détenir toi-même des cryptomonnaies — pas seulement avec wwwallet.',
    points: [
      {
        title: 'Custodial vs non-custodial',
        body: 'Un portefeuille avec garde ou une plateforme d’échange conserve tes clés pour toi — c’est pratique, mais tu fais confiance à quelqu’un d’autre pour ne pas geler, perdre ou utiliser tes fonds à mauvais escient. Un portefeuille sans garde comme wwwallet te laisse les clés, et la responsabilité, entre tes mains uniquement.',
      },
      {
        title: 'Staking vs minage',
        body: 'Le minage en « preuve de travail » (Proof-of-Work) sécurise une blockchain grâce à la puissance de calcul brute et à l’électricité. La « preuve d’enjeu » (Proof-of-Stake) la sécurise plutôt grâce à des capitaux mis en jeu. Le passage d’Ethereum au staking a réduit sa consommation d’énergie de plus de 99,9 % — ce qui correspond à peu près à la différence entre alimenter un petit pays et une petite ville.',
      },
      {
        title: 'Au-delà d’Ethereum',
        body: 'Le Bitcoin privilégie la simplicité et la prévisibilité plutôt que la programmabilité. Des chaînes comme Solana misent sur un débit brut élevé, souvent au détriment de la décentralisation. Ethereum privilégie d’abord la décentralisation et la sécurité, et laisse la vitesse et les coûts aux réseaux de couche 2 construits par-dessus.',
      },
      {
        title: 'Personne de sérieux ne te demandera ta phrase de récupération',
        body: 'Aucune plateforme d’échange, aucun agent du service client et personne chez wwwallet ne te demandera jamais ta phrase de récupération — quelle que soit l’appli que tu utilises. Si quelqu’un te la demande, c’est qu’il essaie de te voler.',
      },
    ],
    linkLabel: 'Approfondis le sujet avec le podcast Bankless',
    linkUrl: 'https://www.bankless.com/',
  },
  faqs: {
    eyebrow: 'FAQ',
    heading: 'Questions fréquentes',
    items: [
      {
        q: 'Est-ce que wwwallet est vraiment gratuit ?',
        a: "Oui. Son utilisation est gratuite, il n’y a pas de formule premium ni de contenu payant, et wwwallet n’ajoute aucun frais aux transferts ou aux échanges que tu effectues. Le seul coût inévitable est le frais de transaction (gas) propre au réseau, qui revient au réseau et non à wwwallet. Les cotations d'échange proviennent de l'agrégateur 0x (ou de LI.FI, sur les réseaux non couverts par 0x), qui peut appliquer ses propres frais sur certaines transactions — ces frais sont indiqués sur l'écran de vérification avant que tu ne confirmes.",
      },
      {
        q: "Y a-t-il des publicités, des traceurs ou des outils d'analyse ?",
        a: 'Non. wwwallet n’affiche aucune publicité, n’exécute aucun script d’analyse ou de suivi, et ne crée pas de profil te concernant. Il n’y a pas de compte, donc il n’y a rien à y associer.',
      },
      {
        q: 'Faut-il un compte ou une pièce d’identité pour l’utiliser ?',
        a: 'Non. Il n’y a ni inscription, ni adresse e-mail, ni numéro de téléphone, ni vérification d’identité : tu crées un portefeuille sur ton appareil et tu commences à l’utiliser.',
      },
      {
        q: 'Si c’est gratuit, comment wwwallet s’autofinance-t-il ?',
        a: 'L’appli ne tire aucun profit de ses utilisateurs : pas de frais, pas de pubs, pas de vente de données. Les coûts de fonctionnement sont volontairement réduits : l’appli s’exécute directement dans ton navigateur, et le serveur ne fait que relayer les données publiques de la blockchain et les cours.',
      },
      {
        q: 'Est-ce que quelqu’un peut bloquer mon portefeuille ?',
        a: 'Il n’y a pas de compte, donc wwwallet — ni personne d’autre — ne peut rien geler. Tes clés ne quittent jamais ton appareil, et les transactions y sont signées avant d’être envoyées sur le réseau. Tes fonds se trouvent sur Ethereum, pas dans wwwallet : tu peux consulter la clé privée ou la phrase de récupération de n’importe quel compte depuis son menu et l’importer dans n’importe quelle autre application de portefeuille Ethereum quand tu le souhaites.',
      },
      {
        q: 'Ma phrase de récupération suffit-elle pour récupérer mon portefeuille ?',
        a: 'Pas toute seule. Ta phrase de récupération déverrouille ton coffre-fort crypté, mais ce coffre-fort n’existe que sur ton appareil. Si tu perds ou effaces cet appareil sans jamais avoir fait de sauvegarde, il ne restera plus rien que la phrase puisse déverrouiller. Associe toujours ta phrase de récupération à une sauvegarde sur Google Drive ou dans un fichier — voir la question suivante.',
      },
      {
        q: 'Comment faire une sauvegarde de mon portefeuille ?',
        a: 'Depuis les Paramètres, sauvegarde ton coffre-fort chiffré sur ton propre Google Drive ou sous forme de fichier que tu télécharges et conserves toi-même. Une sauvegarde sur Drive est stockée dans un dossier privé de l’appli, et wwwallet ne peut rien voir d’autre sur ton Drive. Fais une sauvegarde lors de la première configuration, puis à chaque fois que tu ajoutes des comptes.',
      },
      {
        q: 'Est-ce que je peux utiliser wwwallet sur plusieurs appareils ?',
        a: 'Oui, mais la synchronisation ne se fait pas automatiquement : chaque appareil dispose de son propre coffre-fort local. Pour utiliser wwwallet sur un nouvel appareil, restaure-le à partir d’une sauvegarde sur Drive ou dans un fichier, puis déverrouille-le avec ta phrase de récupération.',
      },
      {
        q: 'Que se passe-t-il si je perds mon appareil et que je n’ai jamais fait de sauvegarde ?',
        a: 'Tes fonds sont irrécupérables. C’est voulu : wwwallet n’a pas de système de compte et ne conserve aucune copie de ton coffre-fort nulle part, donc personne — y compris nous — ne peut le restaurer pour toi. C’est le compromis à accepter pour que personne d’autre que toi n’ait accès à tes clés.',
      },
      {
        q: 'Est-ce que les codes d’accès (Face ID / Touch ID) sont transférés sur un nouvel appareil ?',
        a: "Non. Une clé d'accès est liée à l'appareil sur lequel elle a été créée. Après avoir restauré une sauvegarde sur un nouvel appareil, déverrouille-le avec ta phrase de récupération et tu pourras y configurer une nouvelle clé d'accès.",
      },
      {
        q: 'Est-ce que wwwallet est open source ?',
        a: 'Non, c’est « source-available ». Le code source complet est public sur GitHub, donc tout le monde peut le lire, l’examiner et l’auditer, mais ce n’est pas de l’open source : le code est sous licence PolyForm Strict License 1.0.0.',
      },
      {
        q: 'Qu’est-ce que j’ai le droit de faire avec le code ?',
        a: "Tu peux lire et vérifier l’intégralité du texte, et utiliser une copie non modifiée à des fins non commerciales, comme l’étude personnelle, la recherche et les tests. Tu ne peux pas le distribuer, le modifier, créer des œuvres dérivées (y compris des forks) ni l'utiliser à des fins commerciales. Si tu as besoin de faire quelque chose que la licence n'autorise pas, contacte le détenteur des droits d'auteur pour obtenir une licence distincte.",
      },
      {
        q: 'Est-ce que wwwallet est sûr à utiliser ? Y a-t-il une garantie ?',
        a: "wwwallet est un logiciel non dépositaire fourni « tel quel », sans garantie d’aucune sorte. Toi seul contrôles tes clés et tes fonds — personne, y compris nous, ne peut récupérer une phrase de récupération ou une sauvegarde perdue, annuler une transaction ou t'indemniser en cas de pertes. N’utilise que des fonds que tu peux te permettre de perdre, vérifie bien les adresses et les réseaux avant d’effectuer un envoi, et sache que rien ici ne constitue un conseil financier, d’investissement, juridique ou fiscal.",
      },
      {
        q: 'Quels réseaux wwwallet prend-il en charge ?',
        a: 'Le réseau principal d’Ethereum, ainsi qu’Arbitrum, Base, Optimism, Polygon, Robinhood Chain, World Chain, Ink, Linea, Gnosis, Celo, ZKsync Era, Ronin, Unichain et Scroll — le tout à partir du même ensemble de comptes.',
      },
      {
        q: 'Comment approvisionner mon portefeuille ?',
        a: 'Ouvre un compte, choisis « Afficher le code QR » pour voir son adresse, puis envoie des fonds vers cette adresse depuis une plateforme d’échange ou un autre portefeuille. Assure-toi d’envoyer les fonds sur le bon réseau (comme Ethereum, Base ou Arbitrum) : la même adresse fonctionne sur tous les réseaux pris en charge, mais les fonds envoyés sur un réseau n’apparaissent que sur ce réseau-là. Tu auras également besoin d’un peu de la cryptomonnaie native du réseau (comme l’ETH) pour payer les frais de transaction.',
      },
      {
        q: 'Que puis-je faire avec wwwallet ?',
        a: "Envoyer : transfère des ETH ou n’importe quel token vers une adresse que tu colles, que tu scannes à partir d’un code QR ou que tu choisis parmi tes propres comptes, puis vérifie les détails avant de confirmer. Échanger : échange un token contre un autre sur le même réseau depuis l’onglet « Échanger », avec un cours et une estimation des frais affichés dès le départ. Recevoir : affiche ton adresse sous forme de code QR. Tu peux aussi consulter tes soldes en dollars américains et l'historique de tes transactions sur tous les réseaux pris en charge.",
      },
      {
        q: "Qu'est-ce que wwwallet sait de moi ?",
        a: "Rien qui permette de t'identifier. Il n'y a ni compte, ni identifiant, ni base de données. Les données relatives au solde et aux cours sont récupérées via le backend propre à wwwallet, plutôt que par ton navigateur qui ferait appel directement à des fournisseurs tiers, et ce backend n'a jamais accès à tes clés, tes mots de passe ou ta phrase de récupération.",
      },
    ],
  },
  footer: {
    tagline: 'Un portefeuille Ethereum gratuit et non dépositaire pour tout le monde.',
    copyright: '© {year} wwwallet',
    licenseLink: 'Sous licence PolyForm Strict 1.0.0',
    disclaimer:
      'Logiciel non dépositaire fourni « tel quel », sans garantie. Ceci ne constitue pas un conseil financier. Tu es seul(e) responsable de tes clés et de tes fonds.',
  },
  principles: {
    eyebrow: 'Principes',
    heading: 'Gratuit, ouvert et conçu pour tout le monde',
    lede: "Un logiciel qui gère ton argent doit être un outil que tu utilises, pas une entreprise qui s'enrichit sur le dos de ses utilisateurs. Tels sont les engagements sur lesquels wwwallet repose.",
    items: [
      {
        title: 'Gratuit, sans piège',
        body: 'Pas de prix, pas de formule premium, pas de fonctionnalités payantes. wwwallet n’ajoute aucun frais supplémentaire : le seul coût, ce sont les frais de transaction du réseau lui-même.',
      },
      {
        title: 'Pas de pubs, pas de suivi',
        body: 'Pas de publicités, pas d’analyses, pas de scripts de suivi, et aucune donnée vendue à qui que ce soit. Il n’y a d’ailleurs aucun profil te concernant à vendre.',
      },
      {
        title: "Pas d'inscription",
        body: 'Pas d’e-mail, pas de numéro de téléphone, pas de vérification d’identité. Tu l’ouvres, tu crées un portefeuille, et c’est parti.',
      },
      {
        title: 'Tes clés restent en ta possession',
        body: "Les clés sont créées et chiffrées sur ton appareil et n'en sortent jamais. wwwallet ne peut pas les voir, ni déplacer tes fonds, ni te bloquer l'accès.",
      },
      {
        title: 'Fonctionne partout',
        body: "Fonctionne sur n'importe quel navigateur moderne, sur mobile ou sur ordinateur, et s'installe comme une appli — pas besoin de compte sur une boutique d'applications.",
      },
      {
        title: 'En 31 langues',
        body: "Utilise-la dans la langue où tu te sens le plus à l'aise, en mode clair ou sombre.",
      },
      {
        title: 'Code en open source',
        body: "Le code source complet est publié pour que tout le monde puisse le lire et l'auditer. Il s'agit d'un code « source disponible » plutôt que d'un code « open source » — la FAQ explique ce que la licence autorise.",
      },
      {
        title: 'Rien à désactiver',
        body: 'Il n’y a pas de compte que quelqu’un pourrait bloquer. Tes fonds se trouvent directement sur le réseau Ethereum, et la clé de n’importe quel compte peut être transférée vers un autre portefeuille à tout moment.',
      },
    ],
  },
  license: {
    title: 'Licence',
    close: 'Fermer',
    summaryTitle: 'En langage simple',
    canUse:
      'Tu peux utiliser wwwallet gratuitement, à des fins personnelles et autres fins non commerciales.',
    canRead: 'Tu peux lire et vérifier chaque ligne de son code source.',
    cannot: 'Tu ne peux pas le copier, le modifier, le redistribuer ou le vendre.',
    englishNote:
      "La licence complète suit, dans sa version originale en anglais — c'est le texte juridique.",
    viewSource: 'Voir la source sur GitHub',
  },
  meta: {
    title: 'wwwallet — Portefeuille Ethereum gratuit et non custodial',
    description:
      'Portefeuille Ethereum gratuit dans ton navigateur. Pas d’inscription, pas de pubs, pas de suivi — tes clés restent cryptées sur ton appareil. Ethereum, Base, Arbitrum, Optimism, Polygon et 10 autres réseaux.',
  },
}
