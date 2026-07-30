/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * BANCO DE PREGUNTAS v2 — SIN CLAVE DE RESPUESTAS.
 *
 * La respuesta correcta y su explicación viven ÚNICAMENTE en el Google Apps
 * Script (servidor). Este archivo se empaqueta en el JavaScript público, así
 * que cualquier dato que se ponga aquí queda visible con F12. No agregues
 * `correctAnswerIndex` ni `explanation`: rompería la integridad del examen.
 *
 * El orden de las preguntas y el de sus opciones es CANÓNICO y debe coincidir
 * exactamente con los arreglos CLAVE y AREA_DE del Apps Script. Las opciones se
 * barajan solo al mostrarlas; al servidor siempre se le envía el índice canónico.
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
    text: "Dos ofertas del mismo rodamiento: A cuesta USD 100 y dura 12 meses; B cuesta USD 130 y dura 20 meses. Cada recambio suma USD 40. ¿Qué conviene?",
    options: [
      "A es preferible: su precio unitario es 23% menor y el ahorro se captura de inmediato",
      "Son equivalentes: el mayor precio de B se compensa con su mayor vida útil de servicio",
      "B es preferible: su costo mensual con el recambio resulta un 27% menor que el de A",
      "Falta conocer el costo financiero del inventario, que puede cambiar la comparación"
    ]
  },
  {
    area: "SS",
    text: "El gerente pide salir con el RFP de mantenimiento en tres semanas. ¿Qué condiciona más el resultado del proceso?",
    options: [
      "Analizar el gasto histórico y el mercado de oferta antes de fijar el alcance del RFP",
      "Publicar el RFP cuanto antes para dar a los proveedores más plazo para preparar ofertas",
      "Ampliar la lista de invitados para asegurar que lleguen más ofertas comparables entre sí",
      "Definir primero las condiciones de pago y las garantías exigidas a los participantes"
    ]
  },
  {
    area: "SS",
    text: "Un proveedor pide 12% de alza por el acero, que pesa 40% de su costo y subió 15%. ¿Qué sustenta mejor tu contrapropuesta?",
    options: [
      "Aceptar el 12%: el proveedor documentó el alza y la relación es de largo plazo",
      "Rechazar el alza: el contrato fija el precio y rige hasta su vencimiento pactado",
      "Proponer 7,5%: repartir el impacto del alza, aunque el acero pese menos",
      "Reconocer un 6%: el acero pesa 40% del costo y el traslado es proporcional"
    ]
  },
  {
    area: "SS",
    text: "Una categoría depende de un proveedor con tecnología patentada. ¿Qué decisión de abastecimiento es más defendible?",
    options: [
      "Homologar un segundo proveedor, aunque su tecnología no alcance el estándar",
      "Mantener al proveedor único y acotar el riesgo con contrato y plan de respaldo",
      "Licitar la categoría cada año para sostener la presión competitiva sobre el titular",
      "Integrar la fabricación de la pieza para eliminar la dependencia del proveedor externo"
    ]
  },
  {
    area: "SS",
    text: "¿En cuál de estas categorías la consolidación de volumen resulta la palanca menos efectiva?",
    options: [
      "Un insumo estándar comprado hoy a once proveedores locales con especificación idéntica",
      "Un servicio especializado con un solo proveedor calificado en el país y demanda estable",
      "Material de empaque que compran cuatro plantas con referencias y calidades similares",
      "Papelería y aseo que cada sede adquiere por separado con proveedores distintos"
    ]
  },
  // ---- Category Management ----
  {
    area: "CM",
    text: "La energía eléctrica pesa 18% del gasto, con pocos comercializadores y precio volátil. Según Kraljic, la categoría es:",
    options: [
      "Apalancada: el alto peso en el gasto permite competir el volumen entre comercializadores",
      "Cuello de botella: la volatilidad y la escasez de oferentes dominan la decisión de compra",
      "Estratégica: pesa mucho en el resultado y el mercado de suministro es concentrado",
      "Rutinaria: es un servicio estandarizado que se contrata en condiciones regulares"
    ]
  },
  {
    area: "CM",
    text: "En una categoría apalancada, el proveedor de ocho años ofrece renovar con 3% de descuento. ¿Qué haces?",
    options: [
      "Renovar: la relación larga reduce el costo de cambio y el descuento mejora lo actual",
      "Negociar bilateralmente con el titular hasta lograr el mayor descuento que acepte",
      "Dividir el volumen entre dos proveedores para reducir la dependencia del titular",
      "Llevar la categoría a competencia y usar ese resultado como referencia de precio"
    ]
  },
  {
    area: "CM",
    text: "Un reactivo pesa 0,4% del gasto, tiene un único fabricante homologado y 16 semanas de entrega. ¿Qué estrategia prioriza?",
    options: [
      "Asegurar el suministro con stock y un contrato de reserva con el fabricante único",
      "Negociar el precio con firmeza dado que el proveedor depende del volumen anual",
      "Bajar la prioridad de gestión porque su peso en el gasto total resulta marginal",
      "Agrupar su compra con otros insumos de laboratorio para ganar algo de escala"
    ]
  },
  {
    area: "CM",
    text: "¿Qué evidencia distingue un plan de categoría maduro de un simple plan de compras?",
    options: [
      "Incluye el calendario de licitaciones y el vencimiento de cada contrato vigente",
      "Parte del análisis de mercado y fija objetivos plurianuales con palancas por segmento",
      "Detalla el consumo previsto por área usuaria y el presupuesto asignado a cada una",
      "Registra los proveedores homologados y el resultado de su evaluación de desempeño"
    ]
  },
  {
    area: "CM",
    text: "Te asignan una categoría nueva sin información previa. ¿Con qué empiezas?",
    options: [
      "Con la reunión con los proveedores actuales, para conocer portafolio y condiciones",
      "Con la definición de la meta de ahorro que la categoría debe aportar en el año",
      "Con el análisis del gasto histórico y de la demanda interna del negocio",
      "Con la revisión de los contratos vigentes y sus cláusulas de renovación automática"
    ]
  },
  // ---- SRM ----
  {
    area: "SRM",
    text: "Un proveedor estratégico incumple entregas por segundo mes consecutivo. ¿Qué respuesta es más consistente con SRM?",
    options: [
      "Aplicar la penalización contractual y mover parte del volumen a un proveedor alterno",
      "Convocar de inmediato una licitación para reemplazar al proveedor que incumple",
      "Escalar el caso al área legal para documentar el incumplimiento y sus efectos",
      "Abrir un plan conjunto de mejora con causa raíz y seguimiento mensual acordado"
    ]
  },
  {
    area: "SRM",
    text: "Con recursos limitados, ¿a qué proveedores diriges el programa de SRM?",
    options: [
      "A los de mayor facturación anual, que concentran la mayor parte del gasto gestionado",
      "A los que combinan alto impacto en el negocio y baja facilidad de sustitución",
      "A los de peor desempeño reciente, para corregir los problemas más urgentes del año",
      "A los que llevan más años trabajando con la empresa y conocen mejor su operación"
    ]
  },
  {
    area: "SRM",
    text: "¿Qué consecuencia práctica tiene segmentar la base de proveedores?",
    options: [
      "Permite unificar condiciones de pago y plazos de entrega para toda la base",
      "Reduce el número de proveedores activos al depurar los de menor facturación",
      "Define cuánta gobernanza y qué recursos recibe cada grupo de proveedores",
      "Establece el orden de prioridad de pago cuando la caja disponible es limitada"
    ]
  },
  {
    area: "SRM",
    text: "¿Cuál es la señal más confiable de que la relación con un proveedor estratégico es sana?",
    options: [
      "Trae mejoras por iniciativa propia y advierte los problemas antes de que impacten",
      "Concede el precio más bajo del mercado en cada renovación del acuerdo comercial",
      "Cumple los SLA pactados sin generar reclamaciones formales durante el periodo",
      "Acepta las condiciones propuestas sin abrir discusiones sobre el contrato"
    ]
  },
  {
    area: "SRM",
    text: "En un mercado con capacidad escasa, ¿qué te ayuda a ser cliente preferido de un proveedor clave?",
    options: [
      "Concentrar el mayor volumen posible para ganar peso en su facturación anual",
      "Exigir exclusividad sobre su capacidad a cambio de un contrato más largo",
      "Ser predecible en la demanda y pagar a tiempo sin generar desgaste al proveedor",
      "Negociar con firmeza cada renovación para que sostenga precios ajustados"
    ]
  },
  // ---- Negociación ----
  {
    area: "NEG",
    text: "Tu único proveedor homologado sube 15% y homologar otro toma cinco meses. ¿Qué dice esto de tu BATNA?",
    options: [
      "Es fuerte: el proveedor, si no modera el alza, arriesga perder el contrato",
      "Es débil: sin una alternativa disponible el plazo juega en tu contra",
      "Es neutro: el BATNA depende del precio objetivo y no del plazo de homologación",
      "Es irrelevante: con proveedor único la decisión la define el presupuesto anual"
    ]
  },
  {
    area: "NEG",
    text: "El proveedor no cede en precio pero necesita cerrar el año con volumen. ¿Qué movimiento crea valor?",
    options: [
      "Ofrecer un compromiso de volumen anual a cambio de una mejora escalonada de precio",
      "Mantener la presión sobre el precio y postergar la decisión hasta que ceda",
      "Aceptar el precio actual y compensarlo pidiendo un plazo de pago más amplio",
      "Solicitar cotización a un competidor para usarla como referencia de presión"
    ]
  },
  {
    area: "NEG",
    text: "Tu precio máximo es 100 y el mínimo aceptable del proveedor es 108. ¿Qué describe la situación?",
    options: [
      "Hay ZOPA entre 100 y 108, y el acuerdo se cerrará dentro de ese rango de precio",
      "Hay ZOPA porque ambas partes siguen dispuestas a negociar el precio del contrato",
      "La ZOPA se define al comparar las ofertas recibidas en el proceso de compra",
      "No hay ZOPA: sin cambiar alcance o condiciones no existe acuerdo posible hoy"
    ]
  },
  {
    area: "NEG",
    text: "Antes de una negociación importante, ¿qué omisión debilita más tu posición?",
    options: [
      "No haber acordado internamente quién aprueba y hasta qué monto llega tu mandato",
      "No haber fijado con el área usuaria el nivel de servicio mínimo aceptable",
      "No haber estimado tus alternativas ni el costo del proveedor si no hay acuerdo",
      "No haber definido la cifra de apertura con la que iniciarás la conversación"
    ]
  },
  {
    area: "NEG",
    text: "El proveedor abre pidiendo 20% de alza cuando esperabas 6%. ¿Qué neutraliza mejor ese anclaje?",
    options: [
      "Contraofertar de inmediato con una cifra baja para desplazar el rango a tu lado",
      "Pedir el desglose que sustenta el 20% y reencuadrar la charla sobre esos costos",
      "Aceptar el rango propuesto y buscar cerrar cerca del punto medio entre ambos",
      "Suspender la reunión y retomarla cuando el proveedor modere su solicitud inicial"
    ]
  },
  // ---- Indicadores ----
  {
    area: "KPI",
    text: "El precio pasó de 100 a 95, pero el índice del insumo cayó 8% en el mismo periodo. ¿Cómo se reporta?",
    options: [
      "Ahorro de 5%: el precio pagado bajó frente al del periodo inmediatamente anterior",
      "Ahorro de 13%: se suma la baja negociada, más la caída del índice de mercado",
      "Sin ahorro efectivo: frente a un mercado que cayó 8% quedaste 3 puntos arriba",
      "Ahorro de 8%: la referencia válida es la variación del índice del insumo"
    ]
  },
  {
    area: "KPI",
    text: "Mides 32 días de requisición a entrega y quieres reducirlo. ¿Qué te dice ese dato por sí solo?",
    options: [
      "Poco: sin desagregar por etapas no se sabe dónde está el tiempo reducible",
      "Que el proceso interno es lento y conviene automatizar la aprobación",
      "Que el proveedor incumple los plazos pactados y debe revisarse su desempeño",
      "Que el indicador está bien: 32 días es razonable para compras indirectas"
    ]
  },
  {
    area: "KPI",
    text: "¿Cuál de estos indicadores del área resulta más accionable?",
    options: [
      "Monto total facturado por los proveedores durante el periodo analizado",
      "Nivel de satisfacción general del cliente interno con la gestión del área",
      "Número de órdenes de compra emitidas por cada comprador durante el mes",
      "Porcentaje del gasto canalizado por contratos vigentes en cada categoría"
    ]
  },
  {
    area: "KPI",
    text: "El gasto total es USD 40M y compras gestiona con proceso y contrato USD 22M. ¿Qué indica ese dato?",
    options: [
      "Un ahorro potencial de 55% sobre el gasto total anual de la compañía",
      "Un spend under management de 55% y USD 18M fuera del alcance del área",
      "Que el área gestiona bien, ya que supera la mitad del gasto de la empresa",
      "Un cumplimiento de contratos del 55% frente a lo que estaba presupuestado"
    ]
  },
  {
    area: "KPI",
    text: "Si el área se mide solo por ahorro, ¿qué comportamiento es más probable que aparezca?",
    options: [
      "Se cierran acuerdos que bajan precio y elevan el riesgo o dañan el servicio",
      "Se posterga la homologación de proveedores nuevos, aunque el costo sea bajo",
      "Se incrementa el número de proveedores para generar más competencia por compra",
      "Se reduce el tiempo de negociación para atender más solicitudes por comprador"
    ]
  },
  // ---- Gestión de Riesgos ----
  {
    area: "RSK",
    text: "Un insumo tiene baja probabilidad de falla, pero su falta detiene la planta. ¿Cómo lo tratas?",
    options: [
      "Como riesgo bajo: la probabilidad de ocurrencia es reducida según el histórico",
      "Como riesgo medio: se compensa la baja probabilidad con el alto impacto",
      "Como riesgo alto por impacto: exige plan de contingencia pese a ser raro",
      "Como riesgo de producción y no de la gestión de abastecimiento del área"
    ]
  },
  {
    area: "RSK",
    text: "Dependes de un proveedor único y no hay alternativa homologable a corto plazo. ¿Qué haces primero?",
    options: [
      "Homologar un segundo proveedor aunque todavía no cumpla el estándar técnico",
      "Renegociar el contrato para incluir penalizaciones mayores por incumplimiento",
      "Reducir el volumen comprado a ese proveedor para bajar la exposición al riesgo",
      "Cubrir el horizonte con stock y cláusulas de continuidad y buscar alterna"
    ]
  },
  {
    area: "RSK",
    text: "¿Qué distingue un plan de continuidad real de una simple lista de proveedores alternos?",
    options: [
      "Que incluye contactos y condiciones comerciales de cada proveedor alterno",
      "Que define disparadores y tiempos de respuesta y además se pone a prueba",
      "Que se documenta y se archiva junto con los contratos de cada categoría",
      "Que estima el sobrecosto de acudir al alterno si ocurre una disrupción"
    ]
  },
  {
    area: "RSK",
    text: "¿Cuál de estas situaciones constituye un riesgo de cumplimiento (compliance)?",
    options: [
      "El proveedor eleva su precio sobre el índice del sector sin justificación técnica",
      "El proveedor concentra el 60% de la capacidad instalada de la categoría comprada",
      "El proveedor entrega con retraso recurrente y afecta la programación de planta",
      "El proveedor adjudicado pertenece a un familiar del solicitante del área usuaria"
    ]
  },
  {
    area: "RSK",
    text: "¿Qué señal anticipa mejor el riesgo de quiebra de un proveedor crítico?",
    options: [
      "El retraso creciente en pagos a sus proveedores y la salida de personal clave",
      "El aumento de reclamaciones de calidad presentadas en los últimos meses",
      "La solicitud de incrementos de precio por encima de la inflación del periodo",
      "La caída en la variedad de referencias que mantiene en su catálogo vigente"
    ]
  },
  // ---- Análisis de Ofertas ----
  {
    area: "OFE",
    text: "Ya recibidas las ofertas, el área usuaria pide sumar un criterio técnico no anunciado. ¿Qué corresponde?",
    options: [
      "Incorporarlo: mejora la decisión y responde a una necesidad real del usuario",
      "Incorporarlo y volver a pedir ofertas solo a quienes puedan cumplirlo",
      "Mantener los criterios publicados y dejar el requisito para otro proceso",
      "Aplicarlo como criterio de desempate si dos ofertas quedan con igual puntaje"
    ]
  },
  {
    area: "OFE",
    text: "Precio pesa 60% y técnico 40%. Oferta A: precio 100, técnico 60. Oferta B: precio 70, técnico 95. ¿Cuál gana?",
    options: [
      "B, porque su puntaje promedio simple resulta superior al de la oferta A",
      "A, con 84 frente a 80: el peso del precio compensa su menor nota técnica",
      "B, porque la ventaja técnica es mayor que la diferencia registrada en precio",
      "Empatan: ambas superan el umbral mínimo exigido en las dos dimensiones"
    ]
  },
  {
    area: "OFE",
    text: "La oferta A es 12% más barata pero exige pago anticipado; la B paga a 60 días. ¿Qué falta para comparar?",
    options: [
      "Llevar ambas a una misma base sumando el costo financiero del plazo de pago",
      "Pedir a A que iguale las condiciones de pago que ofrece el proveedor B",
      "Adjudicar a A: el 12% de descuento supera el efecto del plazo concedido",
      "Descartar a A porque el pago anticipado eleva el riesgo frente al proveedor"
    ]
  },
  {
    area: "OFE",
    text: "Tres ofertas de mantenimiento: una por hora, otra por evento y otra con tarifa mensual fija. ¿Qué haces primero?",
    options: [
      "Pedir a los tres que coticen bajo el esquema de tarifa mensual fija",
      "Elegir el esquema mensual fijo por dar mayor previsibilidad al presupuesto",
      "Estimar la demanda anual y convertir las tres a costo total del periodo",
      "Solicitar a cada proveedor que explique las ventajas de su esquema"
    ]
  },
  {
    area: "OFE",
    text: "¿Cuál de estos criterios de evaluación está mejor definido?",
    options: [
      "Experiencia: se valorará la trayectoria del proveedor en proyectos similares",
      "Experiencia: mayor puntaje al proveedor con más años operando en el mercado",
      "Experiencia: el comité valorará el conocimiento visto en la presentación",
      "Experiencia: tres proyectos de alcance equivalente en los últimos cinco años"
    ]
  }
];
