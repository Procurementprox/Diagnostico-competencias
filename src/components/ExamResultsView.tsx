/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { ExamResult } from "../types";
import { AREAS, PREGUNTAS } from "../questions";
import { motion, AnimatePresence } from "motion/react";
import Certificate from "./Certificate";
import {
  CheckCircle2,
  Award,
  PieChart
} from "lucide-react";

interface ExamResultsViewProps {
  result: ExamResult;
  onRestart: () => void;
}

export default function ExamResultsView({ result, onRestart }: ExamResultsViewProps) {
  const [showCertificate, setShowCertificate] = useState(false);

  // Calculate stats by Area for this participant
  const getAreaResultStats = (areaId: string) => {
    let total = 0;
    let correct = 0;

    PREGUNTAS.forEach((q, i) => {
      if (q.area === areaId) {
        total += 1;
        if (result.answers[i] === q.correctAnswerIndex) {
          correct += 1;
        }
      }
    });

    const scorePct = total ? Math.round((correct / total) * 100) : 0;
    return { total, correct, scorePct };
  };

  return (
    <div className="space-y-8">
      {/* Upper Status Header */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white border border-slate-100 rounded-2xl shadow-xl p-6 md:p-8"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <span className="bg-emerald-50 text-emerald-700 font-extrabold text-[10px] tracking-widest uppercase px-3 py-1 rounded-full border border-emerald-100 flex items-center gap-1 w-max">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Diagnóstico Finalizado Correctamente</span>
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-[#02036e] tracking-tight">
              ¡Buen trabajo, {result.participant.nombre.split(" ")[0]}!
            </h2>
            <p className="text-slate-500 text-sm max-w-xl leading-relaxed">
              Tus respuestas han sido procesadas. A continuación, puedes revisar tu reporte detallado de habilidades de compras y ver tu certificado oficial de competencias.
            </p>
          </div>

          {/* Large Circular Score Meter */}
          <div className="flex items-center gap-4 bg-slate-50 border border-slate-100 rounded-2xl p-4 md:p-6 self-start md:self-center">
            <div className="relative w-20 h-20 flex-shrink-0 flex items-center justify-center">
              {/* SVG Ring Path */}
              <svg className="absolute w-full h-full transform -rotate-90">
                <circle cx="40" cy="40" r="34" stroke="#e2e8f0" strokeWidth="6" fill="transparent" />
                <circle
                  cx="40"
                  cy="40"
                  r="34"
                  stroke="#0305AF"
                  strokeWidth="6"
                  fill="transparent"
                  strokeDasharray={2 * Math.PI * 34}
                  strokeDashoffset={2 * Math.PI * 34 * (1 - result.score / 100)}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <span className="text-xl font-black text-[#0305AF]">{result.score}%</span>
            </div>
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Puntuación</div>
              <div className="text-lg font-black text-slate-800 mt-0.5">
                {result.correctCount} / {result.totalCount}
              </div>
              <div className="text-[10px] text-slate-400 font-semibold mt-0.5">Respuestas correctas</div>
            </div>
          </div>
        </div>

        {/* Action Buttons Section */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 border-t border-slate-100 pt-6 mt-6">
          <button
            onClick={() => setShowCertificate(!showCertificate)}
            className="flex items-center justify-center gap-2 text-sm font-bold bg-[#0305AF] hover:bg-[#02036e] text-white py-3.5 px-8 rounded-xl shadow-md shadow-blue-900/10 transition-all cursor-pointer w-full sm:w-auto"
          >
            <Award className="w-4.5 h-4.5 text-[#FFD000] fill-current" />
            <span>{showCertificate ? "Ver Reporte Detallado" : "Ver Certificado Oficial"}</span>
          </button>
        </div>
      </motion.div>

      {/* Certificate view or Report view switch */}
      <AnimatePresence mode="wait">
        {showCertificate ? (
          <motion.div
            key="cert"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
          >
            <Certificate result={result} />
          </motion.div>
        ) : (
          <motion.div
            key="report"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-8"
          >
            {/* Competency area breakdown card */}
            <div className="bg-white border border-slate-100 rounded-2xl shadow-xl p-6 md:p-8 space-y-6">
              <h3 className="text-lg font-black text-slate-800 tracking-tight flex items-center gap-2">
                <PieChart className="w-5 h-5 text-[#0305AF]" />
                <span>Perfil de Competencias del Comprador</span>
              </h3>
              <p className="text-slate-500 text-xs md:text-sm">
                Tu rendimiento específico analizado según las siete competencias estratégicas clave de compras evaluadas en el diagnóstico.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                {AREAS.map((area) => {
                  const stats = getAreaResultStats(area.id);
                  return (
                    <div
                      key={area.id}
                      className="p-4 bg-slate-50/50 rounded-xl border border-slate-200/60 space-y-2.5"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-bold text-slate-800">{area.nombre}</h4>
                          <p className="text-[10px] text-slate-400 line-clamp-1">{area.descripcion}</p>
                        </div>
                        <span className="text-xs font-black text-[#0305AF] bg-blue-50/80 px-2 py-0.5 rounded border border-blue-100">
                          {stats.scorePct}%
                        </span>
                      </div>

                      {/* Visual progress bar */}
                      <div className="space-y-1">
                        <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#0305AF] to-[#4a4dff] rounded-full"
                            style={{ width: `${stats.scorePct}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                          <span>{stats.correct} aciertos de {stats.total}</span>
                          <span>Completado</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
