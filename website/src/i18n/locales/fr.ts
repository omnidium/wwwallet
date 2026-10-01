export default {
  nav: {
    wallet: 'Portefeuille',
    ethereum: 'Ethereum',
    crypto: 'Crypto',
    faqs: 'Foire aux questions',
    launch: 'Lancer le portefeuille',
    home: 'Retour en haut de la page',
    sectionNavLabel: 'Navigation entre les rubriques',
  },
  settings: {
    open: 'Paramètres',
    close: 'Fermer les paramètres',
    theme: 'Thème',
    themeLight: 'Lumière',
    themeDark: 'Sombre',
    language: 'Langue',
  },
  hero: {
    eyebrow: 'Un portefeuille Ethereum personnel sans dépôt fiduciaire',
    heading1: 'Vos clés.',
    heading2: 'Votre appareil.',
    heading3: 'Votre portefeuille.',
    lede: "wwwallet crypte votre portefeuille sur votre propre appareil et n'envoie jamais vos clés, vos mots de passe ou votre phrase de récupération ailleurs. Pas besoin de créer de compte. Pas de serveur susceptible d'être piraté. Juste vous et vos cryptomonnaies.",
    ctaPrimary: 'Lancer le portefeuille',
    ctaSecondary: 'Découvrez comment ça marche',
  },
  wallet: {
    eyebrow: 'Portefeuille',
    heading: "Conçu pour que vous seul puissiez l'ouvrir",
    lede: 'wwwallet ne détient pas vos fonds : il vous aide à les gérer vous-même. Voici ce que cela signifie concrètement.',
    points: [
      {
        title: 'Sans garde, toujours',
        body: "Vos clés privées sont générées et chiffrées sur votre propre appareil. Les serveurs de wwwallet n'y ont jamais accès : il n'y a pas de base de données de portefeuilles à pirater, car il n'y a tout simplement pas de base de données.",
      },
      {
        title: 'Chiffré avec AES-256, à déverrouiller comme vous le souhaitez',
        body: "Votre coffre-fort est protégé par un chiffrement AES-256-GCM. Déverrouillez-le à l'aide de votre phrase de récupération ou activez un code d'accès (Face ID, Touch ID ou Windows Hello) pour bénéficier d'un accès rapide, exclusivement local.",
      },
      {
        title: 'Se verrouille automatiquement',
        body: "wwwallet se verrouille après une courte période d'inactivité et n'enregistre jamais votre session déverrouillée sur le disque : fermez l'onglet et il l'oublie, c'est voulu.",
      },
      {
        title: 'Un seul portefeuille, cinq réseaux Ethereum',
        body: "Conserver et effectuer des transferts sur le réseau principal d'Ethereum, Polygon, Arbitrum, Base et Optimism à partir d'un même ensemble de comptes.",
      },
    ],
    caveatTitle:
      "Votre phrase de récupération vous permet d'accéder à votre coffre-fort — ce n'est pas une sauvegarde « magique »",
    caveatBody:
      'Conservez votre phrase de récupération dans un endroit sûr, mais pensez également à effectuer une sauvegarde sur Google Drive ou dans un fichier. Vous aurez besoin de cette sauvegarde pour restaurer votre portefeuille sur un nouvel appareil, et de la phrase pour le déverrouiller une fois cette opération effectuée.',
    caveatLink: 'Pour en savoir plus, consultez la FAQ',
  },
  ethereum: {
    eyebrow: 'Ethereum',
    heading: 'Pourquoi Ethereum ?',
    lede: 'wwwallet est spécialement conçu pour fonctionner sur Ethereum. Voici pourquoi, en termes simples.',
    points: [
      {
        title: "Un ordinateur mondial, bien plus qu'un simple registre comptable",
        body: "Ethereum s'est inspiré du concept de registre partagé et inviolable proposé par Bitcoin et l'a poussé plus loin : un ordinateur mondial et programmable sur lequel chacun peut s'appuyer, et qu'aucune entité ne peut désactiver.",
      },
      {
        title: 'Sécurisé par le staking, et non par le minage',
        body: 'Depuis « The Merge » en 2022, Ethereum est sécurisé par le mécanisme de la preuve d’enjeu (Proof-of-Stake) plutôt que par le minage, très gourmand en énergie : les validateurs mettent des ETH en jeu à titre de garantie au lieu de consommer de l’électricité pour entrer en compétition pour les blocs.',
      },
      {
        title: 'Ouvert et sans autorisation préalable',
        body: "Personne ne valide votre compte. N'importe qui, où qu'il se trouve, peut détenir des ETH ou développer une application sur Ethereum : les mêmes règles s'appliquent à tout le monde, y compris aux plus grandes institutions.",
      },
      {
        title: "La norme sur laquelle s'appuient les autres réseaux",
        body: 'Les réseaux de couche 2 tels qu’Arbitrum, Base et Optimism — tous pris en charge par wwwallet — permettent de tirer parti de la sécurité d’Ethereum pour offrir des transactions plus rapides et moins coûteuses, sans avoir à repartir de zéro.',
      },
    ],
    linkLabel: 'Pour en savoir plus, rendez-vous sur le site de la Fondation Ethereum',
    linkUrl: 'https://ethereum.org/en/foundation/',
  },
  crypto: {
    eyebrow: 'Crypto',
    heading: 'La cryptomonnaie, en termes simples',
    lede: "Quelques notions qu'il est utile de comprendre avant de détenir vous-même des cryptomonnaies — et pas seulement avec wwwallet.",
    points: [
      {
        title: 'Avec garde vs. sans garde',
        body: "Un portefeuille de type « custodial » ou une plateforme d'échange conserve vos clés à votre place — c'est pratique, mais vous devez faire confiance à un tiers pour qu'il ne gèle pas, ne perde pas ou n'utilise pas à mauvais escient vos fonds. Un portefeuille de type « non-custodial », comme wwwallet, vous confie les clés — et la responsabilité — en entier.",
      },
      {
        title: 'Le staking par rapport au minage',
        body: "Le minage de type « preuve de travail » (Proof-of-Work) sécurise une blockchain grâce à la puissance de calcul brute et à l'électricité. La « preuve d'enjeu » (Proof-of-Stake) la sécurise quant à elle grâce au capital mis en jeu. Le passage d'Ethereum au staking a permis de réduire sa consommation d'énergie de plus de 99,9 % — ce qui correspond à peu près à la différence entre l'alimentation électrique d'un petit pays et celle d'une petite ville.",
      },
      {
        title: "Au-delà d'Ethereum",
        body: 'Le Bitcoin privilégie la simplicité et la prévisibilité au détriment de la programmabilité. Des chaînes comme Solana misent sur un débit brut élevé, au détriment souvent de la décentralisation. Ethereum privilégie avant tout la décentralisation et la sécurité, et confie la vitesse et les coûts aux réseaux de couche 2 construits par-dessus.',
      },
      {
        title: 'Aucun organisme officiel ne vous demandera jamais votre mot de passe.',
        body: "Quel que soit le portefeuille que vous utilisez : ni la plateforme d'échange, ni un agent du service client, ni aucun employé de wwwallet ne vous demandera jamais votre phrase de récupération. Toute personne qui vous la demande tente de vous voler.",
      },
    ],
    linkLabel: 'Approfondissez le sujet avec le podcast Bankless',
    linkUrl: 'https://www.bankless.com/',
  },
  faqs: {
    eyebrow: 'Foire aux questions',
    heading: 'Questions fréquentes',
    items: [
      {
        q: 'Ma phrase de récupération suffit-elle pour récupérer mon portefeuille ?',
        a: 'Pas à elle seule. Votre phrase de récupération permet de déverrouiller votre coffre-fort chiffré, mais ce dernier n’existe que sur votre appareil. Si vous perdez cet appareil ou si vous l’effacez sans avoir jamais effectué de sauvegarde, la phrase de récupération ne pourra plus déverrouiller quoi que ce soit. Associez toujours votre phrase de récupération à une sauvegarde sur Google Drive ou à une sauvegarde de vos fichiers — voir la question suivante.',
      },
      {
        q: 'Comment puis-je sauvegarder mon portefeuille ?',
        a: "Dans les paramètres, sauvegardez votre coffre-fort chiffré sur votre propre Google Drive — où il sera stocké dans un dossier privé, accessible uniquement par l'application, dont wwwallet ne peut pas voir le contenu — ou sous forme de fichier que vous téléchargez et conservez vous-même. Effectuez cette opération chaque fois que vous configurez un portefeuille ou que vous ajoutez de nouveaux comptes.",
      },
      {
        q: 'Puis-je utiliser wwwallet sur plusieurs appareils ?',
        a: "Oui, mais la synchronisation ne se fait pas automatiquement : chaque appareil dispose de son propre coffre-fort local. Pour utiliser wwwallet sur un nouvel appareil, restaurez-le à partir d'une sauvegarde sur Drive ou d'un fichier, puis déverrouillez-le à l'aide de votre phrase de récupération.",
      },
      {
        q: "Que se passe-t-il si je perds mon appareil et que je n'ai jamais effectué de sauvegarde ?",
        a: "Vos fonds sont irrécupérables. C'est voulu : wwwallet ne dispose d'aucun système de compte et ne conserve aucune copie de votre coffre-fort où que ce soit ; par conséquent, personne — pas même nous — ne peut le restaurer pour vous. C'est le compromis à accepter pour disposer d'un portefeuille auquel vous seul avez accès.",
      },
      {
        q: "Les codes d'accès (Face ID / Touch ID) sont-ils transférés vers un nouvel appareil ?",
        a: "Non. Une clé d'accès est liée à l'appareil sur lequel elle a été créée. Après avoir restauré une sauvegarde sur un nouvel appareil, déverrouillez-le à l'aide de votre phrase de récupération ; vous pourrez alors y configurer une nouvelle clé d'accès.",
      },
      {
        q: 'wwwallet est-il un logiciel libre ?',
        a: "Non, le code source est accessible. L'intégralité du code source est publique sur GitHub, ce qui permet à tout le monde de le lire, de l'examiner et de l'auditer, mais il ne s'agit pas d'un logiciel libre : le code est soumis à la licence PolyForm Strict License 1.0.0.",
      },
      {
        q: 'Que suis-je autorisé à faire avec ce code ?',
        a: "Vous pouvez lire et vérifier l'intégralité de ce contenu, et utiliser une copie non modifiée à des fins non commerciales, telles que l'étude personnelle, la recherche et les tests. Vous ne pouvez pas le distribuer, le modifier ni créer d’œuvres dérivées (y compris des « forks »), ni l’utiliser à des fins commerciales. Si vous avez besoin d’une utilisation non autorisée par la licence, contactez le détenteur des droits d’auteur pour obtenir une licence distincte.",
      },
      {
        q: "L'utilisation de wwwallet est-elle sûre ? Bénéficie-t-on d'une garantie ?",
        a: "wwwallet est un logiciel non dépositaire fourni « tel quel », sans garantie d’aucune sorte. Vous seul contrôlez vos clés et vos fonds — personne, y compris nous, ne peut récupérer une phrase de récupération ou une sauvegarde perdue, annuler une transaction ou vous indemniser en cas de pertes. N'utilisez que des fonds que vous pouvez vous permettre de perdre, vérifiez soigneusement les adresses et les réseaux avant d'effectuer un envoi, et sachez que rien ici ne constitue un conseil financier, d'investissement, juridique ou fiscal.",
      },
      {
        q: 'Quels réseaux wwwallet prend-il en charge ?',
        a: "Le réseau principal d'Ethereum, ainsi que les réseaux de couche 2 Polygon, Arbitrum, Base et Optimism — le tout à partir d'un même ensemble de comptes.",
      },
      {
        q: 'Comment approvisionner mon portefeuille ?',
        a: "Ouvrez un compte, sélectionnez « Afficher le code QR » pour voir son adresse, puis envoyez des fonds à cette adresse depuis une plateforme d'échange ou un autre portefeuille. Assurez-vous d’effectuer le virement sur le bon réseau (Ethereum, Polygon, Arbitrum, Base ou Optimism) : la même adresse fonctionne sur tous ces réseaux, mais les fonds envoyés sur un réseau n’apparaîtront que sur ce réseau-là. Vous aurez également besoin d’une petite quantité de la cryptomonnaie native du réseau (comme l’ETH) pour payer les frais de transaction.",
      },
      {
        q: 'Que puis-je faire avec wwwallet ?',
        a: "Envoyer : transférez des ETH ou n'importe quel token vers une adresse que vous collez, scannez à partir d'un code QR ou sélectionnez parmi vos propres comptes, puis vérifiez les détails avant de valider. Échanger : échangez un token contre un autre sur le même réseau depuis l'onglet « Échanger », avec un devis et une estimation des frais affichés dès le départ. Recevoir : affichez votre adresse sous forme de code QR. Vous pouvez également consulter vos soldes en dollars américains ainsi que l'historique de vos transactions sur tous les réseaux pris en charge.",
      },
      {
        q: 'Que sait wwwallet à mon sujet ?',
        a: "Aucune information permettant de vous identifier. Il n'y a ni compte, ni identifiant, ni base de données. Les données relatives au solde et aux cours sont récupérées via le backend propre à wwwallet, sans que votre navigateur n'ait à faire appel directement à des fournisseurs tiers, et ce backend n'a jamais accès à vos clés, mots de passe ou phrase de récupération.",
      },
    ],
  },
  footer: {
    tagline: 'Un portefeuille Ethereum personnel et sans dépôt fiduciaire.',
    sourceLink: 'Consulter le code source sur GitHub',
    copyright: '© {year} wwwallet',
    licenseLink: 'Sous licence PolyForm Strict 1.0.0',
    disclaimer:
      'Logiciel sans garde fourni « tel quel », sans aucune garantie. Ne constitue pas un conseil financier. Vous êtes seul responsable de vos clés et de vos fonds.',
  },
}
