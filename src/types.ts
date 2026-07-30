/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Participant {
  nombre: string;
  correo: string;
  empresa: string;
  cargo: string;
  area: string;
  experiencia: string;
}

export interface Pregunta {
  area: string; // ID of the Area
  text: string;
  options: string[];
  // Sin correctAnswerIndex ni explanation a propósito: la clave vive en el
  // Apps Script. Todo lo que se declare aquí viaja al navegador del participante.
}

/** Calificación de una pregunta, tal como la devuelve el servidor. */
export interface DetallePregunta {
  correcta: number;      // índice canónico de la opción correcta
  acertada: boolean;
  explicacion: string;
}

/** Desempeño por área devuelto por el servidor. */
export interface AreaScore {
  aciertos: number;
  total: number;
}

/** Respuesta completa de calificación del Apps Script. */
export interface ServerGrading {
  total: number;
  totalCount: number;
  porcentaje: number;
  porArea: Record<string, AreaScore>;
  focos: string[];
  detalle: DetallePregunta[];
}

export interface Area {
  id: string;
  nombre: string;
  descripcion: string;
}

/**
 * Estado de la calificación. Como la clave vive en el servidor, un fallo de red
 * deja el examen entregado pero sin nota; nunca se inventa un puntaje local.
 */
export type EstadoCalificacion = "calificado" | "sin_conexion";

export interface ExamResult {
  participant: Participant;
  answers: (number | null)[];
  score: number; // percentage, e.g., 85
  correctCount: number;
  totalCount: number;
  date: string;
  timeSpentSeconds: number;
  wasTimeLimitExceeded: boolean;
  estado: EstadoCalificacion;
  /** Detalle devuelto por el servidor. Ausente si no hubo conexión. */
  grading?: ServerGrading;
}
