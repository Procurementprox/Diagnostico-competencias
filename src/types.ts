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
  correctAnswerIndex: number;
  explanation: string;
}

export interface Area {
  id: string;
  nombre: string;
  descripcion: string;
}

export interface ExamResult {
  participant: Participant;
  answers: (number | null)[];
  score: number; // percentage, e.g., 85
  correctCount: number;
  totalCount: number;
  date: string;
  timeSpentSeconds: number;
  wasTimeLimitExceeded: boolean;
}
