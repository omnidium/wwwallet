export default {
  nav: {
    wallet: 'Cartera',
    ethereum: 'Ethereum',
    crypto: 'Criptomonedas',
    faqs: 'Preguntas frecuentes',
    launch: 'Abrir la cartera',
    home: 'Volver al inicio',
    sectionNavLabel: 'Navegación por secciones',
  },
  settings: {
    open: 'Configuración',
    close: 'Cerrar configuración',
    theme: 'Tema',
    themeLight: 'Luz',
    themeDark: 'Oscuro',
    language: 'Idioma',
  },
  hero: {
    eyebrow: 'Un monedero de Ethereum personal y sin custodia',
    heading1: 'Tus llaves.',
    heading2: 'Tu dispositivo.',
    heading3: 'Tu cartera.',
    lede: 'wwwallet cifra tu monedero en tu propio dispositivo y nunca envía tus claves, contraseñas ni frase de recuperación a ningún otro sitio. No hay que crear ninguna cuenta. No hay ningún servidor que pueda ser objeto de un ataque. Solo tú y tus criptomonedas.',
    ctaPrimary: 'Abrir la cartera',
    ctaSecondary: 'Descubre cómo funciona',
  },
  wallet: {
    eyebrow: 'Cartera',
    heading: 'Diseñado para que solo tú puedas abrirlo',
    lede: 'wwwallet no gestiona tus fondos, sino que te ayuda a gestionarlos tú mismo. Esto es lo que significa en la práctica.',
    points: [
      {
        title: 'Sin custodia, siempre',
        body: 'Tus claves privadas se generan y se cifran en tu propio dispositivo. Los servidores de wwwallet nunca tienen acceso a ellas: no hay ninguna base de datos de carteras que pueda ser objeto de un ataque, ya que, sencillamente, no existe ninguna base de datos.',
      },
      {
        title: 'Cifrado con AES-256, desbloqueado a tu manera',
        body: 'Tu caja fuerte está protegida con cifrado AES-256-GCM. Desbloquéala con tu frase de recuperación o activa una clave de acceso —Face ID, Touch ID o Windows Hello— para disfrutar de un acceso rápido y exclusivamente local.',
      },
      {
        title: 'Se bloquea automáticamente',
        body: 'wwwallet se bloquea tras un breve periodo de inactividad y nunca guarda en el disco los datos de tu sesión desbloqueada: si cierras la pestaña, se olvida, y es a propósito.',
      },
      {
        title: 'Una cartera, cinco redes de Ethereum',
        body: 'Almacenar y enviar a la red principal de Ethereum, Polygon, Arbitrum, Base y Optimism desde el mismo conjunto de cuentas.',
      },
    ],
    caveatTitle:
      'Tu frase de recuperación te permite acceder a tu almacén; no es una copia de seguridad mágica.',
    caveatBody:
      'Guarda tu frase de recuperación en un lugar seguro, pero haz también una copia de seguridad en Google Drive o en un archivo. Necesitarás la copia de seguridad para restaurar tu monedero en un nuevo dispositivo y la frase para desbloquearlo una vez que lo hayas hecho.',
    caveatLink: 'Más información en las preguntas frecuentes',
  },
  ethereum: {
    eyebrow: 'Ethereum',
    heading: '¿Por qué Ethereum?',
    lede: 'wwwallet está diseñado específicamente para Ethereum. A continuación te explicamos por qué, en términos sencillos.',
    points: [
      {
        title: 'Un ordenador mundial, no solo un libro de cuentas',
        body: 'Ethereum tomó la idea de Bitcoin de un libro mayor compartido e inviolable y la amplió: un ordenador global y programable sobre el que cualquiera puede desarrollar aplicaciones y que ninguna entidad puede desactivar.',
      },
      {
        title: 'Asegurado mediante staking, no mediante minería',
        body: 'Desde «The Merge» en 2022, Ethereum se ha protegido mediante la prueba de participación (Proof-of-Stake) en lugar de la minería, que consume mucha energía: los validadores ponen ETH en riesgo como garantía en lugar de consumir electricidad para competir por los bloques.',
      },
      {
        title: 'Abierto y sin necesidad de permisos',
        body: 'Nadie tiene que aprobar tu cuenta. Cualquiera, esté donde esté, puede tener ETH o desarrollar una aplicación en Ethereum: las mismas reglas se aplican a todo el mundo, incluidas las instituciones más grandes.',
      },
      {
        title: 'El estándar en el que se basan otras redes',
        body: 'Las redes de capa 2 como Arbitrum, Base y Optimism —todas ellas compatibles con wwwallet— amplían la seguridad de Ethereum para ofrecer transacciones más rápidas y económicas, en lugar de empezar desde cero.',
      },
    ],
    linkLabel: 'Más información en la Fundación Ethereum',
    linkUrl: 'https://ethereum.org/en/foundation/',
  },
  crypto: {
    eyebrow: 'Criptomonedas',
    heading: 'Las criptomonedas, en términos sencillos',
    lede: 'Hay algunos conceptos que conviene conocer antes de tener criptomonedas, y no solo con wwwallet.',
    points: [
      {
        title: 'Con custodia frente a sin custodia',
        body: 'Un monedero con custodia o una plataforma de intercambio se encarga de guardar tus claves por ti; es cómodo, pero estás confiando en que otra persona no bloquee, pierda o haga un uso indebido de tus fondos. Un monedero sin custodia, como wwwallet, pone las claves —y la responsabilidad— exclusivamente en tus manos.',
      },
      {
        title: 'El staking frente a la minería',
        body: 'La minería de «prueba de trabajo» protege una cadena de bloques mediante potencia de cálculo bruta y electricidad. La «prueba de participación», en cambio, la protege mediante capital en riesgo. El paso de Ethereum al staking redujo su consumo energético en más del 99,9 %, lo que equivale aproximadamente a la diferencia entre abastecer de energía a un país pequeño y a una localidad pequeña.',
      },
      {
        title: 'Más allá de Ethereum',
        body: 'Bitcoin da prioridad a la simplicidad y la previsibilidad frente a la programabilidad. Cadenas como Solana se centran en el rendimiento bruto, a menudo a costa de la descentralización. Ethereum se decanta ante todo por la descentralización y la seguridad, y deja la velocidad y el coste en manos de las redes de capa 2 construidas sobre ella.',
      },
      {
        title: 'Nadie que sea de fiar te pide tu contraseña',
        body: 'Sea cual sea la cartera que utilices: ni la plataforma de intercambio, ni ningún agente de atención al cliente, ni ningún empleado de wwwallet te pedirá jamás tu frase de recuperación. Cualquiera que lo haga está intentando robarte.',
      },
    ],
    linkLabel: 'Profundiza en el tema con el podcast de Bankless',
    linkUrl: 'https://www.bankless.com/',
  },
  faqs: {
    eyebrow: 'Preguntas frecuentes',
    heading: 'Preguntas frecuentes',
    items: [
      {
        q: '¿Basta con mi frase de recuperación para recuperar mi monedero?',
        a: 'No por sí sola. Tu frase de recuperación desbloquea tu caja fuerte cifrada, pero la caja fuerte en sí solo se encuentra en tu dispositivo. Si pierdes o borras ese dispositivo sin haber hecho nunca una copia de seguridad, no quedará nada que la frase pueda desbloquear. Combina siempre tu frase de recuperación con una copia de seguridad en Google Drive o en un archivo; consulta la siguiente pregunta.',
      },
      {
        q: '¿Cómo puedo hacer una copia de seguridad de mi monedero?',
        a: 'Desde «Configuración», haz una copia de seguridad de tu caja fuerte cifrada en tu propio Google Drive —almacenada en una carpeta privada a la que solo tiene acceso la aplicación y de la que wwwallet no puede ver el resto del contenido— o como un archivo que descargues y guardes tú mismo. Hazlo cada vez que configures una cartera o añadas nuevas cuentas.',
      },
      {
        q: '¿Puedo utilizar wwwallet en más de un dispositivo?',
        a: 'Sí, pero no se sincroniza automáticamente: cada dispositivo tiene su propia caja fuerte local. Para utilizar wwwallet en un nuevo dispositivo, restaura la aplicación desde una copia de seguridad de Drive o de un archivo y, a continuación, desbloquéala con tu frase de recuperación.',
      },
      {
        q: '¿Qué pasa si pierdo mi dispositivo y nunca he hecho una copia de seguridad?',
        a: 'Tus fondos son irrecuperables. Así está diseñado: wwwallet no tiene un sistema de cuentas y no guarda ninguna copia de tu almacén en ningún sitio, por lo que nadie —ni siquiera nosotros— puede restaurarlo por ti. Es la contrapartida de tener un monedero al que nadie más que tú puede acceder.',
      },
      {
        q: '¿Se transfieren las claves de acceso (Face ID / Touch ID) a un nuevo dispositivo?',
        a: 'No. La clave de acceso está vinculada al dispositivo en el que se creó. Tras restaurar una copia de seguridad en un nuevo dispositivo, desbloquéalo con tu frase de recuperación y podrás configurar allí una nueva clave de acceso.',
      },
      {
        q: '¿Es wwwallet de código abierto?',
        a: 'El código fuente está disponible públicamente en GitHub, por lo que cualquiera puede consultarlo. Todavía no se ha publicado bajo una licencia de código abierto, así que, por el momento, considéralo como código público para su revisión y no como código abierto.',
      },
      {
        q: '¿Qué redes admite wwwallet?',
        a: 'La red principal de Ethereum, además de las redes de capa 2 Polygon, Arbitrum, Base y Optimism, todas ellas desde el mismo conjunto de cuentas.',
      },
      {
        q: '¿Qué sabe wwwallet sobre mí?',
        a: 'Nada que te identifique. No hay cuenta, ni inicio de sesión, ni base de datos. Los datos sobre saldos y precios se obtienen a través del propio servidor de wwwallet, en lugar de que tu navegador se conecte directamente con proveedores externos, y ese servidor nunca tiene acceso a tus claves, contraseñas ni frase de recuperación.',
      },
    ],
  },
  footer: {
    tagline: 'Un monedero de Ethereum personal y sin custodia.',
    sourceLink: 'Ver el código fuente en GitHub',
    copyright: '© {year} wwwallet',
  },
}
