export default {
  nav: {
    wallet: 'Cartera',
    ethereum: 'Ethereum',
    crypto: 'Criptomonedas',
    faqs: 'Preguntas frecuentes',
    launch: 'Abrir la cartera',
    home: 'Volver al inicio',
    sectionNavLabel: 'Navegación por secciones',
    principles: 'Principios',
  },
  settings: {
    open: 'Configuración',
    close: 'Cerrar configuración',
    theme: 'Tema',
    themeLight: 'Luz',
    themeDark: 'Oscuro',
    language: 'Idioma',
    search: 'Buscar',
    noMatches: 'No hay resultados',
  },
  hero: {
    eyebrow: 'Un monedero de Ethereum gratuito y sin custodia',
    heading1: 'Tus llaves.',
    heading2: 'Tu dispositivo.',
    heading3: 'Gratis para todo el mundo.',
    lede: 'wwwallet se ejecuta en tu navegador y mantiene tus claves cifradas en tu propio dispositivo. No hay que crear ninguna cuenta, no hay que pagar nada y no hay anuncios: solo un monedero que funciona igual para todo el mundo.',
    ctaPrimary: 'Abrir la cartera',
    ctaSecondary: 'Descubre cómo funciona',
    note: 'Sin necesidad de registrarse · Sin anuncios · Sin seguimiento · 31 idiomas',
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
        q: '¿wwwallet es realmente gratis?',
        a: 'Sí. Su uso es gratuito, no hay ningún nivel premium ni contenido de pago, y wwwallet no aplica ninguna comisión a lo que envíes o intercambies. El único coste inevitable es la comisión de transacción (gas) de la propia red, que se destina a la red y no a wwwallet. Las cotizaciones de intercambio provienen del agregador de intercambios 0x, que puede incluir su propia comisión en algunas operaciones; dicha comisión aparece indicada en la pantalla de revisión antes de que confirmes la operación.',
      },
      {
        q: '¿Hay anuncios, rastreadores o herramientas de análisis?',
        a: 'No. wwwallet no muestra anuncios, no ejecuta scripts de análisis ni de seguimiento, y no crea un perfil sobre ti. No hay ninguna cuenta, así que no hay nada a lo que vincularla.',
      },
      {
        q: '¿Necesito una cuenta o un documento de identidad para utilizarlo?',
        a: 'No. No hay que registrarse, ni proporcionar una dirección de correo electrónico, ni un número de teléfono, ni pasar por ningún proceso de verificación de identidad: solo tienes que crear un monedero en tu dispositivo y empezar a utilizarlo.',
      },
      {
        q: 'Si es gratis, ¿cómo se financia wwwallet?',
        a: 'No obtiene ingresos de sus usuarios: ni comisiones, ni anuncios, ni venta de datos. Los costes de funcionamiento se mantienen bajos por diseño: el monedero en sí se ejecuta en tu navegador, y el servidor solo transmite datos públicos de la cadena de bloques y de precios.',
      },
      {
        q: '¿Alguien puede bloquear mi cartera?',
        a: 'No hay ninguna cuenta, por lo que wwwallet —ni nadie más— tiene nada que bloquear. Tus claves nunca salen de tu dispositivo, y las transacciones se firman allí antes de enviarse a la red. Tus fondos se encuentran en Ethereum, no en wwwallet: puedes ver la clave privada o la frase de recuperación de cualquier cuenta desde su menú e importarla a otra cartera de Ethereum cuando quieras.',
      },
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
        a: 'Sí, pero no se sincroniza automáticamente: cada dispositivo tiene su propio almacén local. Para utilizar wwwallet en un nuevo dispositivo, restaúralo desde una copia de seguridad de Drive o de un archivo y, a continuación, desbloquéalo con tu frase de recuperación.',
      },
      {
        q: '¿Qué pasa si pierdo mi dispositivo y nunca he hecho una copia de seguridad?',
        a: 'Tus fondos son irrecuperables. Así está diseñado: wwwallet no tiene ningún sistema de cuentas y no guarda ninguna copia de tu almacén en ningún sitio, por lo que nadie —ni siquiera nosotros— puede restaurarlo por ti. Es la contrapartida de tener un monedero al que nadie más que tú puede acceder.',
      },
      {
        q: '¿Se transfieren las claves de acceso (Face ID / Touch ID) a un nuevo dispositivo?',
        a: 'No. La clave de acceso está vinculada al dispositivo en el que se creó. Tras restaurar una copia de seguridad en un nuevo dispositivo, desbloquéalo con tu frase de recuperación y podrás configurar una nueva clave de acceso en él.',
      },
      {
        q: '¿wwwallet es de código abierto?',
        a: 'No, el código fuente está disponible. El código fuente completo está publicado en GitHub, por lo que cualquiera puede leerlo, revisarlo y auditarlo, pero no es de código abierto: el código está sujeto a la licencia PolyForm Strict License 1.0.0.',
      },
      {
        q: '¿Qué puedo hacer con el código?',
        a: 'Puedes leerlo y revisarlo en su totalidad, así como ejecutar una copia sin modificar con fines no comerciales, como el estudio personal, la investigación y la realización de pruebas. No puedes distribuirlo, modificarlo ni crear obras derivadas (incluidas bifurcaciones), ni utilizarlo con fines comerciales. Si necesitas algo que la licencia no permita, ponte en contacto con el titular de los derechos de autor para obtener una licencia independiente.',
      },
      {
        q: '¿Es seguro utilizar wwwallet? ¿Ofrece alguna garantía?',
        a: 'wwwallet es un software sin custodia que se proporciona «tal cual», sin garantía de ningún tipo. Solo tú controlas tus claves y tus fondos: nadie, ni siquiera nosotros, puede recuperar una frase de recuperación o una copia de seguridad perdidas, revertir una transacción ni compensarte por las pérdidas. Utiliza únicamente fondos que puedas permitirte perder, comprueba dos veces las direcciones y las redes antes de realizar un envío, y ten en cuenta que nada de lo aquí expuesto constituye asesoramiento financiero, de inversión, jurídico o fiscal.',
      },
      {
        q: '¿Qué redes admite wwwallet?',
        a: 'La red principal de Ethereum, además de las redes de capa 2 Polygon, Arbitrum, Base y Optimism, todas ellas desde el mismo conjunto de cuentas.',
      },
      {
        q: '¿Cómo puedo recargar mi monedero?',
        a: 'Abre una cuenta, selecciona «Ver código QR» para ver su dirección y envía fondos a esa dirección desde una plataforma de intercambio u otra cartera. Asegúrate de enviar los fondos a través de la red correcta (Ethereum, Polygon, Arbitrum, Base u Optimism): la misma dirección funciona en todas ellas, pero los fondos enviados a través de una red solo aparecerán en esa red. También necesitarás un poco de la moneda nativa de la red (como ETH) para pagar las comisiones de transacción.',
      },
      {
        q: '¿Qué puedo hacer con wwwallet?',
        a: 'Enviar: transfiere ETH o cualquier token a una dirección que pegues, escanees desde un código QR o elijas de tus propias cuentas, y revisa los detalles antes de confirmar. Intercambiar: cambia un token por otro en la misma red desde la pestaña «Intercambiar», donde se muestran de antemano la cotización y la estimación de las comisiones. Recibir: muestra tu dirección como un código QR. También puedes consultar tus saldos en dólares estadounidenses y tu historial de transacciones en todas las redes compatibles.',
      },
      {
        q: '¿Qué sabe wwwallet sobre mí?',
        a: 'Nada que te identifique. No hay cuenta, ni inicio de sesión, ni base de datos. Los datos sobre saldos y precios se obtienen a través del propio servidor de wwwallet, en lugar de que tu navegador se conecte directamente con proveedores externos, y ese servidor nunca tiene acceso a tus claves, contraseñas ni frase de recuperación.',
      },
    ],
  },
  footer: {
    tagline: 'Un monedero de Ethereum gratuito y sin custodia para todo el mundo.',
    copyright: '© {year} wwwallet',
    licenseLink: 'Bajo licencia PolyForm Strict 1.0.0',
    disclaimer:
      'El software sin custodia se proporciona «tal cual», sin garantía alguna. No constituye asesoramiento financiero. Eres el único responsable de tus claves y tus fondos.',
  },
  principles: {
    eyebrow: 'Principios',
    heading: 'Gratuito, abierto y diseñado para todo el mundo',
    lede: 'Una cartera digital debe ser una herramienta que utilices, no un negocio que se sustente a costa de sus usuarios. Estos son los principios en los que se basa wwwallet.',
    items: [
      {
        title: 'Gratis, sin trampa alguna',
        body: 'Sin precios, sin planes premium, sin funciones de pago. wwwallet no aplica comisiones propias; el único coste es la comisión por transacción de la propia red.',
      },
      {
        title: 'Sin anuncios, sin seguimiento',
        body: 'Sin anuncios, sin análisis de datos, sin scripts de seguimiento y sin venta de datos a nadie. Para empezar, no existe ningún perfil tuyo que se pueda vender.',
      },
      {
        title: 'No es necesario registrarse',
        body: 'No hace falta correo electrónico, número de teléfono ni verificación de identidad. Ábrela, crea un monedero y ya estás listo.',
      },
      {
        title: 'Las llaves las llevas contigo',
        body: 'Las claves se generan y se cifran en tu dispositivo y nunca salen de él. wwwallet no puede verlas, mover tus fondos ni bloquearte el acceso.',
      },
      {
        title: 'Funciona en cualquier sitio',
        body: 'Funciona en cualquier navegador moderno, tanto en el móvil como en el ordenador, y se instala como una aplicación; no hace falta tener una cuenta en ninguna tienda de aplicaciones.',
      },
      {
        title: 'En 31 idiomas',
        body: 'Úsalo en el idioma con el que te sientas más cómodo, en modo claro u oscuro.',
      },
      {
        title: 'Código abierto',
        body: 'El código fuente completo está publicado para que cualquiera pueda leerlo y auditarlo. Se trata de código fuente disponible, no de código abierto; en las preguntas frecuentes se explica lo que permite la licencia.',
      },
      {
        title: 'No hay nada que apagar',
        body: 'No hay ninguna cuenta que pueda bloquearse. Tus fondos se almacenan directamente en la red Ethereum, y la clave de cualquier cuenta puede transferirse a otro monedero en cualquier momento.',
      },
    ],
  },
  license: {
    title: 'Licencia',
    close: 'Cerrar',
    summaryTitle: 'En lenguaje sencillo',
    canUse:
      'Puedes utilizar wwwallet de forma gratuita, con fines personales y otros fines no comerciales.',
    canRead: 'Puedes leer y revisar cada línea de su código fuente.',
    cannot: 'No puedes copiarlo, modificarlo, redistribuirlo ni venderlo.',
    englishNote:
      'A continuación se incluye la licencia completa, en su versión original en inglés; se trata del texto legal.',
    viewSource: 'Ver en GitHub',
  },
}
