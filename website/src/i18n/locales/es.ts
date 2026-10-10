export default {
  nav: {
    wallet: 'wwwallet',
    ethereum: 'Ethereum',
    crypto: 'Criptomonedas',
    faqs: 'Preguntas frecuentes',
    launch: 'Lanza wwwallet',
    home: 'Volver arriba',
    sectionNavLabel: 'Navegación por secciones',
    principles: 'Principios',
  },
  settings: {
    open: 'Configuración',
    close: 'Cerrar ajustes',
    theme: 'Tema',
    themeLight: 'Ligero',
    themeDark: 'Oscuro',
    language: 'Idioma',
    search: 'Buscar',
    noMatches: 'No hay coincidencias',
    version: 'Versión {version}',
  },
  hero: {
    eyebrow: 'Un monedero de Ethereum gratuito y sin custodia',
    heading1: 'Tus claves.',
    heading2: 'Tu dispositivo.',
    heading3: 'Gratis para todo el mundo.',
    lede: 'wwwallet se ejecuta en tu navegador y guarda tus claves cifradas en tu propio dispositivo. No hay que crear ninguna cuenta, no hay que pagar nada y no hay anuncios, y funciona igual para todo el mundo.',
    ctaPrimary: 'Lanza wwwallet',
    ctaSecondary: 'Descubre cómo funciona',
    note: 'Sin registro · Sin anuncios · Sin seguimiento · 31 idiomas',
  },
  wallet: {
    eyebrow: 'wwwallet',
    heading: 'Diseñada para que solo tú puedas abrirla',
    lede: 'wwwallet no guarda tus fondos: te ayuda a que los guardes tú mismo. Esto es lo que significa en la práctica.',
    points: [
      {
        title: 'Sin custodia, siempre',
        body: 'Tus claves privadas se generan y se cifran en tu propio dispositivo. Los servidores de wwwallet nunca las ven: no hay ninguna base de datos de claves que pueda ser vulnerada, porque simplemente no hay ninguna base de datos.',
      },
      {
        title: 'Cifrado con AES-256, desbloquea como tú quieras',
        body: 'Tu monedero está protegido con cifrado AES-256-GCM. Desbloquéalo con tu frase de recuperación o activa una clave de acceso —Face ID, Touch ID o Windows Hello— para un acceso rápido y solo local.',
      },
      {
        title: 'Se bloquea automáticamente',
        body: 'wwwallet se bloquea tras un breve periodo de inactividad y nunca guarda tu sesión desbloqueada en el disco: si cierras la pestaña, se olvida, a propósito.',
      },
      {
        title: 'Quince redes de Ethereum, un conjunto de cuentas',
        body: 'Guarda y envía a la red principal de Ethereum y a otras 14 redes —entre ellas Arbitrum, Base, Optimism, Polygon, Linea y ZKsync— con las mismas cuentas y direcciones.',
      },
    ],
    caveatTitle:
      'Tu frase de recuperación te permite acceder a tu monedero; no es una copia de seguridad mágica.',
    caveatBody:
      'Guarda tu frase de recuperación en un lugar seguro, pero haz también una copia de seguridad en Google Drive o en un archivo. Necesitarás la copia de seguridad para restaurar tu monedero en un dispositivo nuevo, y la frase para desbloquearlo una vez que lo hayas hecho.',
    caveatLink: 'Más información en las preguntas frecuentes',
  },
  ethereum: {
    eyebrow: 'Ethereum',
    heading: '¿Por qué Ethereum?',
    lede: 'wwwallet está diseñada específicamente para Ethereum. Aquí tienes las razones, en términos sencillos.',
    points: [
      {
        title: 'Un ordenador mundial, no solo un libro mayor',
        body: 'Ethereum tomó la idea de Bitcoin de un libro mayor compartido e inviolable y la amplió: un ordenador global y programable sobre el que cualquiera puede desarrollar aplicaciones, y que ninguna parte puede apagar.',
      },
      {
        title: 'Protegido mediante staking, no mediante minería',
        body: 'Desde «The Merge» en 2022, Ethereum se protege mediante la prueba de participación (Proof-of-Stake) en lugar de la minería, que consume mucha energía: los validadores ponen ETH en riesgo como garantía en lugar de gastar electricidad para competir por los bloques.',
      },
      {
        title: 'Abierto y sin permisos',
        body: 'Nadie tiene que aprobar tu cuenta. Cualquiera, en cualquier lugar, puede tener ETH o crear una aplicación en Ethereum: las mismas reglas se aplican a todo el mundo, incluidas las instituciones más grandes.',
      },
      {
        title: 'El estándar en el que se basan otras redes',
        body: 'Las redes de capa 2 como Arbitrum, Base y Optimism —todas compatibles con wwwallet— amplían la seguridad de Ethereum para ofrecer transacciones más rápidas y baratas, en lugar de empezar desde cero.',
      },
    ],
    linkLabel: 'Más información en la Fundación Ethereum',
    linkUrl: 'https://ethereum.org/en/foundation/',
  },
  crypto: {
    eyebrow: 'Criptomonedas',
    heading: 'Las criptomonedas, en términos sencillos',
    lede: 'Hay algunos conceptos que conviene entender antes de tener criptomonedas por tu cuenta, no solo con wwwallet.',
    points: [
      {
        title: 'Con custodia frente a sin custodia',
        body: 'Un monedero con custodia o una plataforma de intercambio guarda tus claves por ti; es cómodo, pero estás confiando en que otra persona no congele, pierda o haga un mal uso de tus fondos. Un monedero sin custodia, como wwwallet, deja las claves, y la responsabilidad, exclusivamente en tus manos.',
      },
      {
        title: 'Staking frente a minería',
        body: 'La minería de Prueba de Trabajo (Proof-of-Work) protege una cadena de bloques con potencia de cálculo bruta y electricidad. La Prueba de Participación (Proof-of-Stake), en cambio, la protege con capital en riesgo. El cambio de Ethereum al staking redujo su consumo energético en más del 99,9 % —más o menos la diferencia entre abastecer de energía a un país pequeño y a un pueblo pequeño—.',
      },
      {
        title: 'Más allá de Ethereum',
        body: 'Bitcoin prioriza la simplicidad y la previsibilidad por encima de la programabilidad. Cadenas como Solana apuestan por el rendimiento bruto, a menudo sacrificando la descentralización para conseguirlo. Ethereum se decanta primero por la descentralización y la seguridad, y deja la velocidad y el coste en manos de las redes de Capa 2 construidas sobre ella.',
      },
      {
        title: 'Nadie de fiar te va a pedir tu frase',
        body: 'Ni ninguna plataforma de intercambio, ni ningún agente de atención al cliente, ni nadie de wwwallet te pedirá jamás tu frase de recuperación, independientemente de la app que uses. Cualquiera que lo haga está intentando robarte.',
      },
    ],
    linkLabel: 'Profundiza más con el podcast de Bankless',
    linkUrl: 'https://www.bankless.com/',
  },
  faqs: {
    eyebrow: 'Preguntas frecuentes',
    heading: 'Preguntas frecuentes',
    items: [
      {
        q: '¿wwwallet es realmente gratis?',
        a: 'Sí. Usarla es gratis, no hay ningún nivel premium ni nada detrás de un muro de pago, y wwwallet no añade ninguna comisión a lo que envíes o intercambies. El único coste inevitable es la comisión de transacción (gas) de la propia red, que va a parar a la red y no a wwwallet. Las cotizaciones de intercambio provienen del agregador de exchanges 0x (o de LI.FI, en las redes que 0x no cubre), que puede incluir su propia comisión en algunas operaciones; cualquier comisión de este tipo aparece en la pantalla de revisión antes de que confirmes.',
      },
      {
        q: '¿Hay anuncios, rastreadores o herramientas de análisis?',
        a: 'No. wwwallet no muestra anuncios, no ejecuta scripts de análisis ni de seguimiento, y no crea un perfil tuyo. No hay cuenta, así que no hay nada a lo que vincularla.',
      },
      {
        q: '¿Necesito una cuenta o un DNI para usarla?',
        a: 'No. No hay que registrarse, ni dar una dirección de correo electrónico, ni un número de teléfono, ni pasar por ninguna verificación de identidad: creas un monedero en tu dispositivo y empiezas a usarlo.',
      },
      {
        q: 'Si es gratis, ¿cómo se financia wwwallet?',
        a: 'No gana dinero a costa de sus usuarios: sin comisiones, sin anuncios, sin venta de datos. Los costes de funcionamiento se mantienen bajos por diseño: la propia app se ejecuta en tu navegador, y el servidor solo transmite datos públicos de la cadena de bloques y de precios.',
      },
      {
        q: '¿Alguien puede bloquear mi monedero?',
        a: 'No hay ninguna cuenta, así que no hay nada que wwwallet —ni nadie más— pueda bloquear. Tus claves nunca salen de tu dispositivo, y las transacciones se firman allí antes de enviarlas a la red. Tus fondos están en Ethereum, no en wwwallet: puedes ver la clave privada o la frase de recuperación de cualquier cuenta desde su menú e importarla a cualquier otra app de monedero de Ethereum cuando quieras.',
      },
      {
        q: '¿Basta con mi frase de recuperación para recuperar mi monedero?',
        a: 'No por sí sola. Tu frase de recuperación desbloquea tu almacén cifrado, pero el almacén en sí solo está en tu dispositivo. Si pierdes o borras ese dispositivo sin haber hecho nunca una copia de seguridad, no quedará nada que la frase pueda desbloquear. Combina siempre tu frase de recuperación con una copia de seguridad en Google Drive o en un archivo; consulta la siguiente pregunta.',
      },
      {
        q: '¿Cómo hago una copia de seguridad de mi monedero?',
        a: 'Desde Ajustes, haz una copia de seguridad de tu caja fuerte cifrada en tu propio Google Drive o como un archivo que descargues y guardes tú mismo. La copia de seguridad de Drive se guarda en una carpeta privada de la app, y wwwallet no puede ver nada más de tu Drive. Haz una copia de seguridad cuando la configures por primera vez y vuelve a hacerla cada vez que añadas cuentas.',
      },
      {
        q: '¿Puedo usar wwwallet en más de un dispositivo?',
        a: 'Sí, pero no se sincroniza automáticamente: cada dispositivo tiene su propio almacén local. Para usar wwwallet en un dispositivo nuevo, restáuralo desde una copia de seguridad de Drive o de un archivo y, a continuación, desbloquéalo con tu frase de recuperación.',
      },
      {
        q: '¿Qué pasa si pierdo mi dispositivo y nunca he hecho una copia de seguridad?',
        a: 'Tus fondos son irrecuperables. Así está diseñado: wwwallet no tiene sistema de cuentas y no guarda ninguna copia de tu monedero en ningún sitio, así que nadie —ni siquiera nosotros— puede restaurarlo por ti. Es la contrapartida de que nadie más que tú pueda acceder a las claves.',
      },
      {
        q: '¿Se transfieren las claves de acceso (Face ID / Touch ID) a un dispositivo nuevo?',
        a: 'No. Una clave de acceso está vinculada al dispositivo en el que se creó. Después de restaurar una copia de seguridad en un dispositivo nuevo, desbloquéalo con tu frase de recuperación y podrás configurar allí una nueva clave de acceso.',
      },
      {
        q: '¿wwwallet es de código abierto?',
        a: 'No, el código fuente está disponible. El código fuente completo es público en GitHub, así que cualquiera puede leerlo, revisarlo y auditarlo, pero no es de código abierto: el código está bajo la licencia PolyForm Strict License 1.0.0.',
      },
      {
        q: '¿Qué puedo hacer con el código?',
        a: 'Puedes leer y revisar todo el contenido, y ejecutar una copia sin modificar con fines no comerciales, como el estudio personal, la investigación y las pruebas. No puedes distribuirlo, modificarlo ni crear obras derivadas (incluidas bifurcaciones), ni utilizarlo con fines comerciales. Si necesitas algo que la licencia no permita, ponte en contacto con el titular de los derechos de autor para obtener una licencia independiente.',
      },
      {
        q: '¿Es seguro usar wwwallet? ¿Hay alguna garantía?',
        a: 'wwwallet es un software sin custodia que se proporciona «tal cual», sin garantía de ningún tipo. Solo tú controlas tus claves y tus fondos: nadie, ni siquiera nosotros, puede recuperar una frase de recuperación o una copia de seguridad perdida, revertir una transacción ni compensarte por las pérdidas. Usa solo fondos que puedas permitirte perder, comprueba bien las direcciones y las redes antes de enviar nada, y ten en cuenta que nada de lo que aquí se dice constituye asesoramiento financiero, de inversión, legal ni fiscal.',
      },
      {
        q: '¿Qué redes admite wwwallet?',
        a: 'La red principal de Ethereum, además de Arbitrum, Base, Optimism, Polygon, Robinhood Chain, World Chain, Ink, Linea, Gnosis, Celo, ZKsync Era, Ronin, Unichain y Scroll: todo desde el mismo conjunto de cuentas.',
      },
      {
        q: '¿Cómo recargo mi monedero?',
        a: 'Abre una cuenta, selecciona «Ver código QR» para ver tu dirección y envía fondos a esa dirección desde un exchange u otra cartera. Asegúrate de enviar los fondos por la red correcta (como Ethereum, Base o Arbitrum): la misma dirección funciona en todas las redes compatibles, pero los fondos enviados por una red solo aparecerán en esa red. También te conviene tener un poco de la moneda nativa de la red (como ETH) para pagar las comisiones de transacción.',
      },
      {
        q: '¿Qué puedo hacer con wwwallet?',
        a: 'Enviar: transfiere ETH o cualquier token a una dirección que pegues, escanees desde un código QR o elijas de tus propias cuentas, y revisa los detalles antes de confirmar. Intercambiar: cambia un token por otro en la misma red desde la pestaña «Intercambiar», donde se muestran de antemano la cotización y la estimación de comisiones. Recibir: muestra tu dirección como un código QR. También puedes ver tus saldos en dólares estadounidenses y tu historial de transacciones en todas las redes compatibles.',
      },
      {
        q: '¿Qué sabe wwwallet sobre mí?',
        a: 'Nada que te identifique. No hay cuenta, inicio de sesión ni base de datos. Los datos de saldo y precio se obtienen a través del propio servidor de wwwallet, en lugar de que tu navegador se conecte directamente con proveedores externos, y ese servidor nunca ve tus claves, contraseñas ni frase de recuperación.',
      },
    ],
  },
  footer: {
    tagline: 'Un monedero de Ethereum gratuito y sin custodia para todo el mundo.',
    copyright: '© {year} wwwallet',
    licenseLink: 'Bajo licencia PolyForm Strict 1.0.0',
    disclaimer:
      'El software sin custodia se proporciona «tal cual», sin garantía alguna. No constituye asesoramiento financiero. Tú eres el único responsable de tus claves y tus fondos.',
  },
  principles: {
    eyebrow: 'Principios',
    heading: 'Gratis, abierta y diseñada para todo el mundo',
    lede: 'El software que guarda tu dinero debería ser una herramienta que uses, no un negocio que se lucre a costa de sus usuarios. Estos son los compromisos en los que se basa wwwallet.',
    items: [
      {
        title: 'Gratis, sin trampa alguna',
        body: 'Sin precios, sin planes premium, sin funciones de pago. wwwallet no añade comisiones propias; el único coste es la comisión de transacción de la propia red.',
      },
      {
        title: 'Sin anuncios, sin seguimiento',
        body: 'Sin anuncios, sin análisis, sin scripts de seguimiento y sin vender datos a nadie. Para empezar, ni siquiera hay un perfil tuyo que vender.',
      },
      {
        title: 'Sin registro',
        body: 'Sin correo electrónico, número de teléfono ni verificación de identidad. Ábrela, crea un monedero y ya estás listo.',
      },
      {
        title: 'Tus claves las guardas tú mismo',
        body: 'Las claves se crean y se cifran en tu dispositivo y nunca salen de él. wwwallet no puede verlas, mover tus fondos ni bloquearte el acceso.',
      },
      {
        title: 'Funciona en cualquier sitio',
        body: 'Funciona en cualquier navegador moderno, tanto en el móvil como en el ordenador, y se instala como una app —no hace falta tener una cuenta en ninguna tienda de apps—.',
      },
      {
        title: 'En 31 idiomas',
        body: 'Úsala en el idioma con el que te sientas más cómodo, en modo claro o oscuro.',
      },
      {
        title: 'Código abierto',
        body: 'El código fuente completo está publicado para que cualquiera pueda leerlo y auditarlo. Es «source-available» en lugar de «open source»; en las preguntas frecuentes se explica lo que permite la licencia.',
      },
      {
        title: 'No hay que desactivar nada',
        body: 'No hay ninguna cuenta que nadie pueda bloquear. Tus fondos están en la propia red de Ethereum, y la clave de cualquier cuenta se puede trasladar a otra cartera en cualquier momento.',
      },
    ],
  },
  license: {
    title: 'Licencia',
    close: 'Cerrar',
    summaryTitle: 'En un lenguaje sencillo',
    canUse: 'Puedes usar wwwallet gratis, para uso personal y otros fines no comerciales.',
    canRead: 'Puedes leer y revisar cada línea de su código fuente.',
    cannot: 'No puedes copiarlo, modificarlo, redistribuirlo ni venderlo.',
    englishNote:
      'A continuación viene la licencia completa, en su inglés original: es el texto legal.',
    viewSource: 'Ver código fuente en GitHub',
  },
  meta: {
    title: 'wwwallet — Monedero de Ethereum gratuito y sin custodia',
    description:
      'Cartera gratuita de Ethereum en tu navegador. Sin registrarte, sin anuncios, sin seguimiento: tus claves permanecen cifradas en tu dispositivo. Ethereum, Base, Arbitrum, Optimism, Polygon y 10 redes más.',
  },
}
