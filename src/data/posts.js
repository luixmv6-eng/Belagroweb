import { media } from './media'

/**
 * Los títulos, autores y metadatos son los reales de Academia Belagro.
 * El cuerpo de cada artículo es contenido original redactado para este sitio.
 */
export const posts = [
  {
    slug: 'rehabilitacion-de-vertisoles-suelos-sodicos-valle-del-cauca',
    title:
      'Rehabilitación de Vertisoles Suelos sódicos en el Valle del Cauca: Impacto en el Porcentaje de Sodio Intercambiable (PSI) y la Recuperación Fisiológica en Saccharum officinarum L.',
    author: 'Nicole Guamanga',
    date: '11 jun',
    readingTime: '3 min de lectura',
    cover: media.posts.vertisoles,
    excerpt:
      'Cómo leer el PSI de un vertisol sódico, qué umbral marca el punto de no retorno agronómico y qué secuencia de enmienda y nutrición devuelve funcionalidad al perfil.',
    body: [
      {
        type: 'p',
        text: 'Los vertisoles del valle geográfico del río Cauca concentran arcillas expansivas que se hinchan al humedecerse y se agrietan al secarse. Ese comportamiento, por sí solo, ya condiciona el laboreo. Cuando además el complejo de cambio se satura de sodio, el suelo deja de comportarse como un medio poroso y empieza a comportarse como una masa sellada.',
      },
      { type: 'h2', text: 'Qué mide realmente el PSI' },
      {
        type: 'p',
        text: 'El Porcentaje de Sodio Intercambiable expresa la proporción del complejo de intercambio ocupada por sodio frente a la capacidad de intercambio catiónico total. No es un dato de laboratorio decorativo: describe la probabilidad de que las arcillas se dispersen al entrar en contacto con agua de baja salinidad, como la de una lluvia fuerte o un riego limpio.',
      },
      {
        type: 'ul',
        items: [
          'PSI por debajo de 7: el perfil conserva agregados estables y conductividad hidráulica útil.',
          'PSI entre 7 y 15: aparecen sellamientos superficiales, encharcamiento tras riego y raíces que se desvían lateralmente.',
          'PSI por encima de 15: dispersión franca de arcillas, colapso de macroporos y anoxia radicular recurrente.',
        ],
      },
      { type: 'h2', text: 'El efecto sobre Saccharum officinarum' },
      {
        type: 'p',
        text: 'En caña, el daño rara vez se presenta como una deficiencia nutricional clásica. Se presenta como un cultivo que arranca desuniforme, macolla poco y responde mal a la fertilización nitrogenada, porque la raíz no encuentra oxígeno ni agua disponible en el volumen que necesita. El sodio en solución además compite con potasio y calcio en los sitios de absorción, y desregula el ajuste osmótico de la hoja.',
      },
      {
        type: 'quote',
        text: 'Un suelo sódico no tiene un problema de nutrientes. Tiene un problema de estructura que se manifiesta como problema de nutrientes.',
      },
      { type: 'h2', text: 'Secuencia de rehabilitación' },
      {
        type: 'p',
        text: 'La corrección tiene un orden que no conviene alterar. Primero se desplaza el sodio del complejo de cambio con una fuente de calcio soluble, dimensionada a partir del PSI y de la capacidad de intercambio catiónico real del lote. Segundo, se lava el sodio desplazado, lo que exige un drenaje que efectivamente evacúe. Sin drenaje funcional, la enmienda solo redistribuye el problema dentro del perfil.',
      },
      {
        type: 'p',
        text: 'El tercer paso es el que suele omitirse: la recuperación fisiológica del cultivo. Una vez restablecida la porosidad, la planta necesita reconstruir sistema radicular antes de poder capitalizar la nutrición de fondo. Las aplicaciones de arranque con aminoácidos libres, fósforo y fitohormonas actúan aquí, no como fertilizante de reemplazo, sino como acelerador del restablecimiento de la interfase raíz-suelo.',
      },
      { type: 'h2', text: 'Qué monitorear después de la enmienda' },
      {
        type: 'ul',
        items: [
          'PSI y conductividad eléctrica del extracto de saturación, en la misma profundidad de muestreo, antes y después del lavado.',
          'Infiltración básica en campo, que responde antes que cualquier análisis químico.',
          'Densidad y profundidad radicular efectiva, medidas en calicata y no inferidas desde la parte aérea.',
          'Relación potasio/sodio en tejido foliar, como indicador temprano de recuperación del ajuste osmótico.',
        ],
      },
      {
        type: 'p',
        text: 'La rehabilitación de un vertisol sódico se mide en ciclos, no en semanas. El criterio técnico consiste en aceptar esa escala de tiempo y construir el plan de nutrición sobre un suelo que vuelve a funcionar, en lugar de fertilizar contra un suelo que todavía no lo hace.',
      },
    ],
  },
  {
    slug: 'fotosintesis-bajo-limitaciones-nutricionales',
    title:
      'Fotosíntesis bajo limitaciones nutricionales, estrategias adaptativas y transporte de azucares',
    date: '4 mar',
    readingTime: '2 min de lectura',
    cover: media.posts.fotosintesis,
    excerpt:
      'Nitrógeno, magnesio, fósforo y potasio no alimentan la fotosíntesis por igual. Cada uno limita una etapa distinta, y el síntoma foliar llega tarde.',
    body: [
      {
        type: 'p',
        text: 'La fotosíntesis se suele explicar como una ecuación cerrada. En campo se comporta más bien como una línea de producción, donde cada nutriente sostiene una estación distinta y el cuello de botella se desplaza según cuál esté escaso.',
      },
      { type: 'h2', text: 'Dónde limita cada elemento' },
      {
        type: 'ul',
        items: [
          'Nitrógeno: construye Rubisco y proteínas del aparato fotosintético. Su déficit reduce la capacidad de carboxilación antes de que la hoja amarillee.',
          'Magnesio: es el átomo central de la clorofila. Sin magnesio no hay captura de luz, aunque el nitrógeno esté completo.',
          'Fósforo: sostiene la regeneración de ribulosa y el flujo de ATP. Su déficit frena el ciclo de Calvin aun con estomas abiertos.',
          'Potasio: regula apertura estomática y carga del floema. Su déficit no apaga la fábrica, sino que bloquea el despacho del producto.',
        ],
      },
      { type: 'h2', text: 'La estrategia adaptativa de la planta' },
      {
        type: 'p',
        text: 'Ante una limitación sostenida, la planta no se detiene: reasigna. Moviliza nutrientes móviles desde hojas viejas hacia los tejidos jóvenes, reduce la superficie foliar activa y ajusta la conductancia estomática para proteger el balance hídrico. El resultado es un cultivo que sobrevive con un techo productivo más bajo, y que aparenta normalidad hasta que se compara el rendimiento.',
      },
      {
        type: 'quote',
        text: 'Cuando el síntoma visual aparece, la pérdida de rendimiento ya ocurrió. La nutrición eficiente se anticipa a la clínica.',
      },
      { type: 'h2', text: 'El transporte de azúcares es parte de la fotosíntesis' },
      {
        type: 'p',
        text: 'Fijar carbono no sirve de nada si la sacarosa no llega al órgano de destino. La carga del floema depende de bombas de protones que consumen ATP y de un gradiente que el potasio ayuda a sostener. Si el destino no demanda, la sacarosa se acumula en la hoja fuente y retroinhibe la propia fotosíntesis. Por eso una aplicación bien situada en fase de llenado no solo aporta elementos: reabre el canal de descarga.',
      },
      {
        type: 'p',
        text: 'Leer la fotosíntesis como un sistema fuente-destino cambia la decisión de campo. La pregunta deja de ser cuánto aplicar y pasa a ser qué etapa está limitando hoy.',
      },
    ],
  },
  {
    slug: 'adaptaciones-fisiologicas-de-las-plantas-ante-el-estres',
    title: 'Adaptaciones fisiológicas de las plantas ante el estrés',
    date: '4 mar',
    readingTime: '2 min de lectura',
    cover: media.posts.estres,
    excerpt:
      'Toda respuesta al estrés tiene un costo energético. Entender esa contabilidad permite decidir cuándo intervenir y cuándo la planta ya está pagando de más.',
    body: [
      {
        type: 'p',
        text: 'El estrés no es un evento, es un presupuesto. Cuando una planta enfrenta déficit hídrico, salinidad, temperatura alta o un suelo compactado, activa mecanismos de defensa que funcionan, pero que consumen carbono y energía que dejan de estar disponibles para crecer y llenar.',
      },
      { type: 'h2', text: 'Las tres respuestas que se activan primero' },
      {
        type: 'ul',
        items: [
          'Cierre estomático: protege el estado hídrico y, en el mismo movimiento, corta la entrada de CO2. La planta se salva y deja de producir.',
          'Ajuste osmótico: acumula solutos compatibles como prolina y azúcares solubles para retener agua. Es eficaz y es caro.',
          'Sistema antioxidante: neutraliza especies reactivas de oxígeno que dañan membranas y aparato fotosintético. Su capacidad es finita.',
        ],
      },
      { type: 'h2', text: 'Estrés agudo y estrés crónico no se manejan igual' },
      {
        type: 'p',
        text: 'Un golpe de calor de tres días deja una planta que se recupera si el sistema radicular está intacto. Un suelo con mala estructura genera un estrés de fondo, permanente, que mantiene a la planta gastando presupuesto todo el ciclo. El primero se acompaña; el segundo se corrige en el suelo, porque ninguna aplicación foliar compensa indefinidamente una restricción física.',
      },
      {
        type: 'quote',
        text: 'Acompañar el estrés agudo es buena agronomía. Sostener un estrés crónico con producto es solo aplazar la factura.',
      },
      { type: 'h2', text: 'Dónde entra la nutrición' },
      {
        type: 'p',
        text: 'Los aminoácidos libres aplicados en ventana de estrés ahorran a la planta el costo de sintetizarlos desde nitrógeno inorgánico, que es una ruta de alto consumo energético. El potasio y el boro sostienen el ajuste osmótico y la integridad de membranas. El zinc participa en la respuesta antioxidante. Ninguno elimina el estrés: todos reducen la energía que la planta gasta en soportarlo, y esa energía vuelve al rendimiento.',
      },
      {
        type: 'p',
        text: 'La decisión técnica consiste en identificar la ventana en la que la intervención todavía cambia el resultado, y en no gastar producto cuando el daño fisiológico ya se consolidó.',
      },
    ],
  },
  {
    slug: 'transpiracion-equilibrio-hidrico-y-energetico',
    title: 'Transpiración: equilibrio hídrico y energético de las plantas',
    date: '4 mar',
    readingTime: '3 min de lectura',
    cover: media.posts.transpiracion,
    excerpt:
      'La transpiración es el precio que paga la planta por fotosintetizar, y a la vez el motor que transporta calcio y disipa calor. Regularla, no eliminarla, es el objetivo.',
    body: [
      {
        type: 'p',
        text: 'Más del noventa por ciento del agua que absorbe una raíz no se queda en la planta: se pierde por los estomas. Visto así parece un derroche. Visto en su función completa, es el sistema que permite que exista todo lo demás.',
      },
      { type: 'h2', text: 'Tres funciones que dependen del flujo transpiratorio' },
      {
        type: 'ul',
        items: [
          'Entrada de CO2: los mismos estomas que dejan salir vapor son los que dejan entrar el carbono. No hay fotosíntesis sin esa apertura.',
          'Transporte de calcio: el calcio se mueve únicamente por xilema, arrastrado por la corriente transpiratoria. Sin flujo, no llega a los tejidos jóvenes por más que abunde en el suelo.',
          'Regulación térmica: la evaporación disipa el calor de la hoja. Un cultivo que no transpira se sobrecalienta y desnaturaliza enzimas del aparato fotosintético.',
        ],
      },
      { type: 'h2', text: 'El continuo suelo-planta-atmósfera' },
      {
        type: 'p',
        text: 'El agua se mueve siguiendo un gradiente de potencial hídrico, desde el suelo húmedo hasta el aire seco. Cualquier restricción en esa cadena limita el conjunto: una raíz superficial por compactación, un vaso de xilema con embolia, una humedad relativa muy baja al mediodía. Diagnosticar la transpiración implica revisar el continuo completo y no solo la hoja, que es donde el síntoma se ve.',
      },
      {
        type: 'quote',
        text: 'Un cultivo que cierra estomas al mediodía no está ahorrando agua. Está pagando con rendimiento para no morir.',
      },
      { type: 'h2', text: 'Eficiencia en el uso del agua' },
      {
        type: 'p',
        text: 'La eficiencia se define como carbono fijado por unidad de agua transpirada. Mejorarla no consiste en reducir la transpiración, sino en aumentar el carbono que se fija por cada unidad de agua que ya se está perdiendo. Esto se logra con un sistema radicular profundo que sostenga el suministro, con un estado nutricional que permita a la hoja aprovechar cada apertura estomática y con un manejo que evite los picos de demanda evaporativa cuando el suelo no puede responder.',
      },
      {
        type: 'p',
        text: 'La transpiración no se combate. Se administra, y esa administración empieza en la raíz.',
      },
    ],
  },
]

export const postBySlug = Object.fromEntries(posts.map((p) => [p.slug, p]))
