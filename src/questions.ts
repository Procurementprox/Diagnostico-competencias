/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Area, Pregunta } from "./types";

export const AREAS: Area[] = [
  {
    id: "SS",
    nombre: "Strategic Sourcing",
    descripcion: "Estrategia de abastecimiento y optimización del costo total de propiedad (TCO)."
  },
  {
    id: "CM",
    nombre: "Category Management",
    descripcion: "Segmentación de categorías de compra y estrategias diferenciadas usando Kraljic."
  },
  {
    id: "SRM",
    nombre: "SRM (Gestión de Proveedores)",
    descripcion: "Desarrollo, segmentación y colaboración estratégica con la base de proveedores."
  },
  {
    id: "NEG",
    nombre: "Negociación",
    descripcion: "Tácticas, alternativas (BATNA/MAAN), zonas de acuerdo (ZOPA) y creación de valor."
  },
  {
    id: "KPI",
    nombre: "Indicadores (KPIs)",
    descripcion: "Medición del desempeño del área, ahorros reales y tiempos de ciclo."
  },
  {
    id: "RSK",
    nombre: "Gestión de Riesgos",
    descripcion: "Mitigación de disrupciones, planes de continuidad y cumplimiento normativo (compliance)."
  },
  {
    id: "OFE",
    nombre: "Análisis de Ofertas",
    descripcion: "Evaluación objetiva, normalización de propuestas y costo total (TCO)."
  }
];

export const PREGUNTAS: Pregunta[] = [
  // ---- Strategic Sourcing ----
  {
    area: "SS",
    text: "¿Cuál es el objetivo central del Strategic Sourcing frente a la compra tradicional?",
    options: [
      "Obtener el precio unitario más bajo posible en cada solicitud de cotización que se recibe",
      "Agilizar la emisión de las órdenes de compra para reducir los tiempos administrativos",
      "Optimizar el costo total de propiedad (TCO) y el valor a largo plazo, alineado con la estrategia del negocio",
      "Concentrar todas las compras en un único proveedor para simplificar la relación comercial"
    ],
    correctAnswerIndex: 2,
    explanation: "El Strategic Sourcing busca maximizar el valor a largo plazo y optimizar el Costo Total de Propiedad (TCO), no solo enfocarse en el precio transaccional inmediato."
  },
  {
    area: "SS",
    text: "En un proceso de Strategic Sourcing, ¿qué se debe realizar ANTES de salir al mercado?",
    options: [
      "El análisis del gasto y del mercado de abastecimiento (spend y supply market)",
      "La firma del contrato y la formalización de los acuerdos comerciales con el proveedor",
      "La evaluación del desempeño y los indicadores del proveedor que ya fue seleccionado",
      "La gestión de los pagos y de los anticipos financieros pactados con el proveedor"
    ],
    correctAnswerIndex: 0,
    explanation: "Antes de contactar proveedores, es fundamental analizar internamente el perfil del gasto (Spend Analysis) y externamente el mercado de suministro (Supply Market Analysis) para definir la estrategia correcta."
  },
  {
    area: "SS",
    text: "El análisis de \"should-cost\" (costo debido) se utiliza principalmente para:",
    options: [
      "Calcular los impuestos y aranceles aplicables al valor final de la compra",
      "Estimar la estructura de costos del proveedor y construir una posición de negociación",
      "Definir el presupuesto anual y los límites de gasto asignados al área de compras",
      "Medir el nivel de satisfacción de los clientes internos con el área de compras"
    ],
    correctAnswerIndex: 1,
    explanation: "El análisis de 'Should-Cost' modela de forma teórica los costos de materiales, mano de obra, gastos generales y margen razonable de un proveedor para negociar basándose en hechos objetivos."
  },
  {
    area: "SS",
    text: "¿Cuándo es más apropiado optar por un proveedor único (single sourcing)?",
    options: [
      "Siempre, porque reduce la carga administrativa y simplifica la gestión de proveedores",
      "Nunca, porque depender de un solo proveedor eleva el riesgo en toda circunstancia",
      "Únicamente cuando ese proveedor ofrece el precio más bajo del mercado disponible",
      "Cuando hay dependencia tecnológica, economías de escala o colaboración estratégica que lo justifican, con planes de mitigación"
    ],
    correctAnswerIndex: 3,
    explanation: "El 'Single Sourcing' se elige deliberadamente por razones estratégicas (como patentes, co-diseño o alta integración) pero siempre debe estar acompañado de planes de gestión de riesgo."
  },
  {
    area: "SS",
    text: "La palanca de sourcing \"consolidación de volumen\" busca principalmente:",
    options: [
      "Ampliar la base de proveedores para repartir el volumen entre más participantes",
      "Incrementar el poder de negociación agregando la demanda para lograr mejores condiciones",
      "Aceptar una menor calidad del bien o servicio a cambio de reducir el precio de compra",
      "Prescindir de los contratos vigentes para negociar cada compra de forma independiente"
    ],
    correctAnswerIndex: 1,
    explanation: "La consolidación de volumen combina las necesidades de compra de múltiples unidades o sitios en un solo contrato grande, aumentando la fuerza de negociación del comprador."
  },

  // ---- Category Management ----
  {
    area: "CM",
    text: "La matriz de Kraljic clasifica las categorías de compra según:",
    options: [
      "El volumen físico y las características técnicas del producto que se compra",
      "La trayectoria del proveedor y la antigüedad de la relación con la empresa",
      "El impacto en el negocio/resultado y el riesgo o complejidad del mercado de suministro",
      "Las condiciones de pago acordadas y la moneda en la que se factura la operación"
    ],
    correctAnswerIndex: 2,
    explanation: "La matriz de Kraljic (1983) evalúa las compras bajo dos ejes críticos: el impacto financiero (en el beneficio) y la complejidad/riesgo del mercado de abastecimiento."
  },
  {
    area: "CM",
    text: "Según Kraljic, una categoría \"apalancada\" (alto gasto, bajo riesgo de suministro) se gestiona idealmente:",
    options: [
      "Estableciendo un contrato exclusivo de largo plazo con un único proveedor de confianza",
      "Aprovechando el poder de compra: competencia entre proveedores, subastas y consolidación de volumen",
      "Buscando de forma constante proveedores alternativos ante el riesgo de desabastecimiento",
      "Realizando compras puntuales en el mercado abierto pero con alto volumen"
    ],
    correctAnswerIndex: 1,
    explanation: "En categorías apalancadas, al haber muchos proveedores disponibles y un alto nivel de gasto, se debe buscar la competencia activa para optimizar costos."
  },
  {
    area: "CM",
    text: "Un artículo \"cuello de botella\" (bajo gasto, alto riesgo de suministro) requiere una estrategia orientada a:",
    options: [
      "Presionar al proveedor para obtener el precio más bajo posible en cada negociación",
      "Darle baja prioridad de gestión debido a su reducida participación en el gasto total",
      "Concentrar el mayor volumen de compra posible para capturar economías de escala",
      "Asegurar la continuidad del suministro y reducir la dependencia"
    ],
    correctAnswerIndex: 3,
    explanation: "Los artículos cuello de botella tienen un bajo impacto financiero pero un alto riesgo de desabastecimiento. La prioridad absoluta aquí es asegurar el suministro por encima del costo de compra."
  },
  {
    area: "CM",
    text: "¿Qué caracteriza a un enfoque maduro de Category Management?",
    options: [
      "Atender las requisiciones agrupadas por áreas usuarias",
      "Aplicar el mismo procedimiento estándar a todas las categorías sin distinción alguna",
      "Un plan de categoría con visión de mercado, estrategia diferenciada por segmento y objetivos plurianuales",
      "Seleccionar en cada compra al proveedor que venda más categorías parecidas"
    ],
    correctAnswerIndex: 2,
    explanation: "Un Category Management maduro trata cada categoría como un negocio independiente, aplicando un plan dinámico, estratégico y a largo plazo adaptado a la naturaleza de su mercado."
  },
  {
    area: "CM",
    text: "El primer paso para construir una estrategia de categoría sólida es:",
    options: [
      "Cerrar de inmediato el contrato con el proveedor actual para asegurar el suministro",
      "Entender el gasto, la demanda interna y la dinámica del mercado de proveedores",
      "Emitir las órdenes de compra correspondientes al consumo previsto del periodo",
      "Definir las penalizaciones y cláusulas de incumplimiento que regirán la relación"
    ],
    correctAnswerIndex: 1,
    explanation: "No se puede diseñar una estrategia sin datos. Comprender a fondo el gasto actual, los requisitos de las partes interesadas internas y el mercado de proveedores es el paso número uno indispensable."
  },

  // ---- SRM ----
  {
    area: "SRM",
    text: "El objetivo principal del Supplier Relationship Management (SRM) es:",
    options: [
      "Reducir al mínimo la interacción con los proveedores para evitar dependencias",
      "Rotar con frecuencia a los proveedores para presionar de forma continua los precios",
      "Concentrar la gestión en la revisión y auditoría de los documentos del proveedor",
      "Maximizar el valor de las relaciones clave mediante colaboración, desarrollo y gestión del desempeño"
    ],
    correctAnswerIndex: 3,
    explanation: "SRM busca estructurar las relaciones con los proveedores para desbloquear valor que va más allá del contrato transaccional, mediante la innovación conjunta y el desarrollo de capacidades."
  },
  {
    area: "SRM",
    text: "¿A qué proveedores debe dirigirse prioritariamente un programa de SRM estratégico?",
    options: [
      "A la totalidad de los proveedores, aplicando el mismo nivel de atención a cada uno",
      "A los proveedores estratégicos y críticos que aportan mayor valor o riesgo al negocio",
      "Exclusivamente a los proveedores que ofrecen los mejores precios del portafolio",
      "Solo a los proveedores recién incorporados que aún están en periodo de prueba"
    ],
    correctAnswerIndex: 1,
    explanation: "Dado que los recursos corporativos son limitados, los programas formales de SRM deben enfocarse en los proveedores identificados como estratégicos o de alto riesgo."
  },
  {
    area: "SRM",
    text: "La segmentación de proveedores sirve para:",
    options: [
      "Organizar el listado de proveedores por antiguedad para facilitar su búsqueda",
      "Calcular los costos de flete y logística asociados a cada pedido que se realiza",
      "Diferenciar el nivel de relación, recursos y gobernanza según su importancia estratégica",
      "Depurar la base de proveedores eliminando registros de forma aleatoria cada periodo"
    ],
    correctAnswerIndex: 2,
    explanation: "La segmentación divide a los proveedores en grupos (p. ej., Estratégico, Preferente, Transaccional) para determinar cuánto esfuerzo y qué tipo de gobernanza aplicar a cada relación."
  },
  {
    area: "SRM",
    text: "Un indicador de una relación SRM saludable con un proveedor estratégico es:",
    options: [
      "La cantidad de reclamaciones y disputas legales presentadas contra el proveedor",
      "La colaboración en innovación, la mejora continua y el cumplimiento sostenido de los SLAs",
      "La rotación permanente del proveedor para mantener la relación siempre renovada",
      "La mínima comunicación posible para no generar expectativas ni compromisos mutuos"
    ],
    correctAnswerIndex: 1,
    explanation: "Una buena relación SRM se basa en la co-creación de valor, donde ambas partes se comunican abiertamente, resuelven problemas de manera ágil y logran metas de desempeño estables."
  },
  {
    area: "SRM",
    text: "El concepto \"customer of choice\" (cliente preferido) en SRM se refiere a:",
    options: [
      "Ser el cliente que ejerce mayor presión para imponer sus condiciones en cada trato",
      "Ser el cliente que garantiza el pago anticipado a cambio de no negociar el precio",
      "Ser el cliente que exige exclusividad al proveedor sin ofrecer nada a cambio de ello",
      "Ser un cliente atractivo para que los mejores proveedores prioricen, innoven y ofrezcan sus mejores condiciones"
    ],
    correctAnswerIndex: 3,
    explanation: "Ser un 'Customer of Choice' significa que, en tiempos de escasez o alta demanda, los mejores proveedores elegirán destinar su capacidad e innovación a tu empresa por encima de tus competidores."
  },

  // ---- Negociación ----
  {
    area: "NEG",
    text: "En negociación, el BATNA (MAAN) es:",
    options: [
      "El precio objetivo que el comprador se propone alcanzar durante la negociación",
      "La mejor alternativa a un acuerdo negociado; tu opción si la negociación no prospera",
      "El descuento máximo que el proveedor está dispuesto a conceder sobre su tarifa",
      "El documento formal que recoge los términos finales del acuerdo entre las partes"
    ],
    correctAnswerIndex: 1,
    explanation: "BATNA (Best Alternative to a Negotiated Agreement) o MAAN (Mejor Alternativa a un Acuerdo Negociado) es tu plan de respaldo. Conocerlo determina tu verdadero poder en la mesa."
  },
  {
    area: "NEG",
    text: "Una negociación basada en intereses (colaborativa) se enfoca en:",
    options: [
      "Conseguir la mayor ventaja posible a costa de la posición de la otra parte",
      "Ocultar toda la información propia para no revelar la estrategia a la contraparte",
      "Comprender los deseos de ambas partes para crear valor y acuerdos sostenibles",
      "Imponer el precio más bajo para tener margen de maniobra en la negociación"
    ],
    correctAnswerIndex: 2,
    explanation: "A diferencia de la negociación posicional distributiva (donde se discute un solo pastel fijo), el enfoque Harvard busca los intereses de fondo de cada parte para ampliar el pastel antes de dividirlo."
  },
  {
    area: "NEG",
    text: "La \"ZOPA\" (zona de posible acuerdo) es:",
    options: [
      "El rango entre el precio de reserva del comprador y el del vendedor donde es posible un acuerdo",
      "El espacio físico destinado a la carga y descarga de la mercancía del proveedor",
      "La cláusula del contrato que fija las penalizaciones por incumplimiento de las partes",
      "El plazo de entrega que el proveedor se compromete a cumplir tras cerrar el acuerdo"
    ],
    correctAnswerIndex: 0,
    explanation: "La ZOPA (Zone of Possible Agreement) existe cuando el precio máximo que el comprador está dispuesto a pagar es superior al precio mínimo que el vendedor está dispuesto a aceptar."
  },
  {
    area: "NEG",
    text: "¿Cuál es el error más común que debilita al comprador en la mesa de negociación?",
    options: [
      "Querer hablar solo con el que más cargo tiene para negociar",
      "Dar la información necesaria para que la contraparte pueda ofertar mejor",
      "Conocer con detalle la estructura de costos y el margen estimado del proveedor",
      "Llegar sin preparación, sin alternativas (BATNA) y anclado solo en el precio"
    ],
    correctAnswerIndex: 3,
    explanation: "Ir a negociar sin preparación rigurosa, sin opciones reales para levantarse de la mesa (BATNA) y enfocándose de manera ciega y obsesiva solo en el precio destruye el poder de negociación."
  },
  {
    area: "NEG",
    text: "El \"anclaje\" en negociación consiste en:",
    options: [
      "Formalizar la entrega de la mercancía en el puerto de destino acordado por las partes",
      "Establecer una primera cifra de referencia que condiciona el rango de la negociación",
      "Abonar una prima adicional al proveedor como garantía frente a posibles riesgos",
      "Suspender la negociación de forma indefinida hasta que mejoren las condiciones"
    ],
    correctAnswerIndex: 1,
    explanation: "El efecto anclaje es un sesgo cognitivo donde la primera oferta propuesta en una negociación ejerce un peso desproporcionado sobre la cifra del acuerdo final."
  },

  // ---- Indicadores ----
  {
    area: "KPI",
    text: "El ahorro (savings) en compras debe medirse idealmente:",
    options: [
      "Comparando el precio final únicamente contra la primera cotización que se recibió",
      "Con una metodología consistente (vs. línea base, presupuesto o histórico) validada con finanzas",
      "Según la estimación del comprador, sin un soporte documental que respalde la cifra",
      "Tomando el valor total facturado durante el año como referencia del ahorro logrado"
    ],
    correctAnswerIndex: 1,
    explanation: "Los ahorros reportados por compras pierden credibilidad si no son auditables y validados formalmente con la gerencia financiera utilizando metodologías acordadas de antemano."
  },
  {
    area: "KPI",
    text: "Un indicador de \"lead time\" (tiempo de ciclo) mide:",
    options: [
      "El nivel de calidad y de conformidad del producto que fue entregado",
      "El margen de ganancia que obtiene el proveedor en cada operación",
      "El tiempo del proceso, por ejemplo de la requisición a la entrega",
      "La cantidad total de proveedores activos que gestiona el área"
    ],
    correctAnswerIndex: 2,
    explanation: "El Lead Time del proceso mide la velocidad del área de abastecimiento desde el surgimiento de la necesidad (requisición) hasta que el usuario final recibe el producto o servicio."
  },
  {
    area: "KPI",
    text: "¿Qué caracteriza a un buen KPI de compras?",
    options: [
      "Que sea escoja teniendo en cuenta que sea fácil cumplirlo",
      "Que sea relevante, medible, accionable y alineado con los objetivos del negocio",
      "Que se concentre exclusivamente en el precio como única dimensión a controlar",
      "Que se modifique cada semana según la coyuntura, sin un criterio estable de medición"
    ],
    correctAnswerIndex: 1,
    explanation: "Los buenos KPIs siguen la metodología SMART. Deben influir directamente en la toma de decisiones y estar conectados con las metas corporativas de alto nivel."
  },
  {
    area: "KPI",
    text: "El \"spend under management\" (gasto bajo gestión) indica:",
    options: [
      "El monto de los gastos personales en que incurre el comprador durante su gestión",
      "El presupuesto total que el área de marketing destina a sus campañas del periodo",
      "La proporción del gasto total que compras gestiona activamente bajo procesos y contratos",
      "El gasto que la empresa realiza específicamente en licencias y herramientas de software"
    ],
    correctAnswerIndex: 2,
    explanation: "Gasto Bajo Gestión (SUM) mide la madurez e influencia del área de compras. A mayor SUM, menor es la compra desorganizada o 'maverick buy' fuera del radar del departamento."
  },
  {
    area: "KPI",
    text: "Medir solo el ahorro (savings) como único KPI del área tiende a:",
    options: [
      "Reflejar de forma completa y suficiente todo el valor estratégico que aporta el área",
      "Mejorar por sí solo la relación y la colaboración con la base de proveedores clave",
      "Volver innecesario cualquier otro indicador de gestión dentro del área de compras",
      "Dar una visión incompleta, al ignorar riesgo, calidad, innovación, cumplimiento y servicio"
    ],
    correctAnswerIndex: 3,
    explanation: "Enfocarse únicamente en ahorros de corto plazo puede incentivar malas conductas, como seleccionar proveedores deficientes, comprometer la calidad o deteriorar relaciones estratégicas."
  },

  // ---- Gestión de Riesgos ----
  {
    area: "RSK",
    text: "En la gestión de riesgos de abastecimiento, el riesgo se evalúa comúnmente en función de:",
    options: [
      "El diseño gráfico y los colores del logotipo del proveedor",
      "La probabilidad de ocurrencia y el impacto en el negocio",
      "El número de personas que integran el área de compras",
      "La antigüedad del contrato vigente como único factor"
    ],
    correctAnswerIndex: 1,
    explanation: "La valoración clásica del riesgo se realiza multiplicando la Probabilidad (qué tan posible es que ocurra una disrupción) por el Impacto (cuán grave sería su efecto en la operación o finanzas)."
  },
  {
    area: "RSK",
    text: "La dependencia excesiva de un único proveedor para un insumo crítico se mitiga con:",
    options: [
      "Incrementar todo el volumen de compra concentrándolo en ese mismo proveedor único",
      "Mantener la situación sin cambios mientras el proveedor siga cumpliendo con lo pactado",
      "Proveedores alternativos, stock de seguridad, cláusulas contractuales y planes de contingencia",
      "Disminuir la frecuencia de comunicación con el proveedor para no generar dependencia"
    ],
    correctAnswerIndex: 2,
    explanation: "La resiliencia en la cadena de suministro se construye diversificando la base de proveedores, manteniendo inventario estratégico contra disrupciones y acordando cláusulas sólidas de servicio."
  },
  {
    area: "RSK",
    text: "Un plan de continuidad de suministro (business continuity) busca:",
    options: [
      "Incrementar el precio de compra para asegurar la prioridad del proveedor ante otros",
      "Asegurar el abastecimiento ante disrupciones (desastres, quiebras, geopolítica) con planes preventivos y de respuesta",
      "Reducir la estructura del área de compras para bajar los costos operativos fijos",
      "Limitar las compras a productos importados para diversificar el origen del suministro"
    ],
    correctAnswerIndex: 1,
    explanation: "El plan de continuidad establece de manera preventiva qué hacer si falla un proveedor crítico, definiendo rutas logísticas alternas, fuentes secundarias de suministro y protocolos de emergencia."
  },
  {
    area: "RSK",
    text: "El riesgo de \"compliance\" (cumplimiento) en compras incluye:",
    options: [
      "El riesgo de que una variación del tipo de cambio afecte el costo de la compra",
      "El riesgo de adquirir bienes a un precio demasiado bajo frente al del mercado",
      "Incumplimientos legales, normativos o éticos (corrupción, sanciones, conflicto de interés)",
      "El riesgo asociado al diseño del empaque y a la presentación del producto"
    ],
    correctAnswerIndex: 2,
    explanation: "El riesgo de cumplimiento abarca la adhesión a las leyes locales e internacionales (leyes anticorrupción, ambientales, derechos humanos) y la prevención de conflictos de interés internos."
  },
  {
    area: "RSK",
    text: "Una buena práctica para gestionar el riesgo de proveedores de forma proactiva es:",
    options: [
      "Evaluar el riesgo del proveedor solo después de que un problema ya haya ocurrido",
      "Confiar en el buen desempeño histórico y asumir que no surgirán inconvenientes",
      "Suprimir las evaluaciones periódicas de proveedores para ahorrar tiempo y recursos",
      "Monitorear de forma continua la salud financiera, operativa y de cumplimiento de los proveedores críticos"
    ],
    correctAnswerIndex: 3,
    explanation: "La proactividad en riesgos requiere el monitoreo continuo de indicadores clave (salud financiera, alertas de mercado) para anticipar una posible falla del proveedor antes de que afecte la operación."
  },

  // ---- Análisis de Ofertas ----
  {
    area: "OFE",
    text: "¿Cuándo deben definirse los criterios de evaluación de las ofertas?",
    options: [
      "Después de abrir las ofertas, ajustándolos en función de cuál resulte más conveniente",
      "Al momento de formalizar el contrato con el proveedor que sea finalmente elegido",
      "Antes de recibir las ofertas, definidos de forma objetiva y comunicados a los proveedores",
      "Únicamente si algún proveedor cuestiona o impugna la decisión de adjudicación"
    ],
    correctAnswerIndex: 2,
    explanation: "Por transparencia y rigor metodológico, los criterios de evaluación y ponderación deben diseñarse con el área usuaria antes de la licitación y explicarse en los pliegos de solicitud."
  },
  {
    area: "OFE",
    text: "¿Para qué sirve una matriz de evaluación ponderada de ofertas?",
    options: [
      "Comparar las ofertas con criterios objetivos y pesos asignados a cada factor",
      "Ordenar las ofertas según la fecha y la hora en que cada una fue recibida",
      "Seleccionar de forma automática la oferta que presente el precio más bajo",
      "Registrar los datos de contacto y la información fiscal de cada proveedor"
    ],
    correctAnswerIndex: 0,
    explanation: "Una matriz ponderada calcula una puntuación integrada, equilibrando factores técnicos, financieros y comerciales según las prioridades definidas para esa compra específica."
  },
  {
    area: "OFE",
    text: "Al comparar ofertas de proveedores, ¿por qué no basta con mirar solo el precio?",
    options: [
      "Porque un precio más alto siempre es señal de una mejor calidad del producto",
      "Porque el precio no suele aparecer expresado con claridad en las ofertas",
      "Porque comparar precios entre distintos proveedores no está permitido",
      "Porque debe evaluarse el costo total: calidad, plazos, garantías, servicio y TCO"
    ],
    correctAnswerIndex: 3,
    explanation: "Un precio bajo inicial puede volverse costoso debido a entregas tardías, fallas de calidad, altos costos de mantenimiento o condiciones comerciales desfavorables."
  },
  {
    area: "OFE",
    text: "Para comparar ofertas de forma justa (\"manzanas con manzanas\"), primero conviene:",
    options: [
      "Adjudicar al proveedor ya conocido para no tener que comparar las propuestas",
      "Normalizar las ofertas a una misma base de alcance, unidades y condiciones",
      "Elegir la oferta que tenga la presentación visual más cuidada y profesional",
      "Solicitar a cada proveedor que califique y valore él mismo su propia propuesta"
    ],
    correctAnswerIndex: 1,
    explanation: "La normalización (o tabulación) de ofertas ajusta los precios sumando o restando costos omitidos por los proveedores (como fletes, herramientas, embalajes) para permitir una comparación equitativa."
  },
  {
    area: "OFE",
    text: "¿Qué caracteriza a un criterio de evaluación bien definido?",
    options: [
      "Que sea subjetivo, para dejar margen de decisión discrecional al evaluador",
      "Que asigne siempre al precio el mayor peso por encima de los demás factores",
      "Que sea medible, relevante para la necesidad y ponderado según su importancia",
      "Que se mantenga en reserva y no se dé a conocer a los proveedores participantes"
    ],
    correctAnswerIndex: 2,
    explanation: "Un buen criterio de evaluación reduce la discrecionalidad del comprador, es transparente para los licitantes y mide directamente factores críticos para el éxito del proyecto."
  }
];
