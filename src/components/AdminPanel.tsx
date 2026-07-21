/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { ExamResult, Area } from "../types";
import { AREAS, PREGUNTAS } from "../questions";
import { motion } from "motion/react";
import {
  Settings,
  Users,
  Database,
  Download,
  Trash2,
  Lock,
  ChevronRight,
  Sparkles,
  Link2,
  Calendar,
  User,
  Percent,
  Check,
  X,
  FileSpreadsheet
} from "lucide-react";

interface AdminPanelProps {
  results: ExamResult[];
  onClearResults: () => void;
  sheetsUrl: string;
  onUpdateSheetsUrl: (url: string) => void;
  onClose: () => void;
}

export default function AdminPanel({
  results,
  onClearResults,
  sheetsUrl,
  onUpdateSheetsUrl,
  onClose,
}: AdminPanelProps) {
  const [passwordInput, setPasswordInput] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");
  const [editingUrl, setEditingUrl] = useState(sheetsUrl);
  const [isUrlSaved, setIsUrlSaved] = useState(false);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === "KATOLICO4#") {
      setIsAuthenticated(true);
      setAuthError("");
    } else {
      setAuthError("Contraseña incorrecta. El acceso administrativo está restringido.");
    }
  };

  const handleSaveUrl = () => {
    onUpdateSheetsUrl(editingUrl.trim());
    setIsUrlSaved(true);
    setTimeout(() => setIsUrlSaved(false), 2000);
  };

  // Calculations for Stats
  const totalTakers = results.length;
  const averageScore = totalTakers
    ? Math.round(results.reduce((acc, curr) => acc + curr.score, 0) / totalTakers)
    : 0;

  // Average Score per Area
  const getAreaAverage = (areaId: string) => {
    if (!totalTakers) return 0;

    let totalPoints = 0;
    let totalQuestions = 0;

    results.forEach((res) => {
      // Find all questions of this area
      const areaQuestionsIndexes: number[] = [];
      PREGUNTAS.forEach((q, i) => {
        if (q.area === areaId) areaQuestionsIndexes.push(i);
      });

      areaQuestionsIndexes.forEach((qIdx) => {
        const correctIndex = PREGUNTAS[qIdx].correctAnswerIndex;
        if (res.answers[qIdx] === correctIndex) {
          totalPoints += 1;
        }
        totalQuestions += 1;
      });
    });

    return totalQuestions ? Math.round((totalPoints / totalQuestions) * 100) : 0;
  };

  // Export to CSV
  const exportToCSV = () => {
    if (results.length === 0) return;

    let csvContent = "data:text/csv;charset=utf-8,";
    // CSV Header
    csvContent += "Fecha,Nombre,Correo,Empresa,Cargo,Area,Experiencia,Calificacion,Aciertos,Tiempo (seg),Tiempo Excedido\n";

    results.forEach((res) => {
      const row = [
        new Date(res.date).toLocaleString(),
        `"${res.participant.nombre.replace(/"/g, '""')}"`,
        `"${res.participant.correo}"`,
        `"${res.participant.empresa.replace(/"/g, '""')}"`,
        `"${res.participant.cargo.replace(/"/g, '""')}"`,
        `"${res.participant.area.replace(/"/g, '""')}"`,
        `"${res.participant.experiencia}"`,
        `${res.score}%`,
        `"${res.correctCount}/${res.totalCount}"`,
        res.timeSpentSeconds,
        res.wasTimeLimitExceeded ? "SI" : "NO",
      ];
      csvContent += row.join(",") + "\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `diagnostico_compras_reporte_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 bg-slate-50 rounded-2xl border border-slate-100">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-sm bg-white p-6 md:p-8 rounded-xl border border-slate-200 shadow-md text-center"
        >
          <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center text-amber-600 mx-auto mb-4 border border-amber-100">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-bold text-slate-800">Panel de Control Admin</h3>
          <p className="text-xs text-slate-500 mt-2">
            Ingresa la contraseña maestra para habilitar la visualización de resultados y la configuración técnica.
          </p>

          <form onSubmit={handleAuth} className="mt-6 space-y-4 text-left">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Contraseña Administrativa
              </label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => {
                  setPasswordInput(e.target.value);
                  setAuthError("");
                }}
                placeholder="Ingresar contraseña..."
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0305AF] focus:border-[#0305AF]"
                autoFocus
              />
            </div>

            {authError && <p className="text-xs text-red-600 font-semibold">{authError}</p>}

            <div className="flex gap-2.5 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 text-xs font-bold bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-600 transition-all"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 text-xs font-bold bg-[#0305AF] hover:bg-[#02036e] rounded-lg text-white transition-all shadow-sm"
              >
                Ingresar
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-slate-200 rounded-2xl shadow-xl p-6 md:p-8 space-y-8"
    >
      {/* Header Panel */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <span className="bg-amber-50 text-amber-700 font-black text-[10px] tracking-widest uppercase px-2 py-0.5 rounded border border-amber-100">
            Administrador Activo
          </span>
          <h2 className="text-2xl font-black text-[#02036e] tracking-tight mt-1.5 flex items-center gap-2">
            <Settings className="w-6 h-6 text-[#0305AF] animate-spin-slow" />
            <span>Panel de Gestión Técnica</span>
          </h2>
        </div>
        <button
          onClick={onClose}
          className="text-xs font-bold text-slate-500 bg-slate-50 border border-slate-200 hover:bg-slate-100 px-4 py-2.5 rounded-xl transition-all cursor-pointer self-start sm:self-center"
        >
          Cerrar Configuración
        </button>
      </div>

      {/* Webapp Config */}
      <div className="bg-blue-50/20 border border-[#0305AF]/10 rounded-xl p-4 md:p-6 space-y-4">
        <h3 className="text-sm font-extrabold text-[#02036e] uppercase tracking-wider flex items-center gap-2">
          <Link2 className="w-4 h-4 text-[#0305AF]" />
          <span>Configuración Google Apps Script</span>
        </h3>
        <p className="text-xs text-slate-500 leading-relaxed max-w-2xl">
          Pega aquí la URL de tu aplicación web de Google Apps Script (termina en <code className="bg-slate-100 px-1 py-0.5 rounded">/exec</code>). Las entregas se enviarán como peticiones POST en tiempo real. Deja el campo vacío para operar únicamente de forma local.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={editingUrl}
            onChange={(e) => setEditingUrl(e.target.value)}
            placeholder="https://script.google.com/macros/s/.../exec"
            className="flex-1 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs md:text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0305AF] focus:border-[#0305AF] transition-all font-mono"
          />
          <button
            onClick={handleSaveUrl}
            className="bg-[#0305AF] hover:bg-[#02036e] text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 flex-shrink-0"
          >
            {isUrlSaved ? <Check className="w-4 h-4" /> : null}
            <span>{isUrlSaved ? "Guardado" : "Guardar URL"}</span>
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-slate-50 rounded-xl border border-slate-100 p-4">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Total Takers</span>
            <Users className="w-5 h-5 text-slate-400" />
          </div>
          <div className="text-3xl font-black text-slate-800 mt-2">{totalTakers}</div>
          <p className="text-[10px] text-slate-400 mt-1">Exámenes completados</p>
        </div>

        <div className="bg-slate-50 rounded-xl border border-slate-100 p-4">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Calificación Promedio</span>
            <Percent className="w-5 h-5 text-slate-400" />
          </div>
          <div className="text-3xl font-black text-slate-800 mt-2">{averageScore}%</div>
          <p className="text-[10px] text-slate-400 mt-1">Rendimiento general del equipo</p>
        </div>

        <div className="bg-slate-50 rounded-xl border border-slate-100 p-4">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Base de Datos Local</span>
            <Database className="w-5 h-5 text-slate-400" />
          </div>
          <div className="text-xs font-extrabold text-[#0305AF] mt-3">Estado: Seguro y Cifrado</div>
          <p className="text-[10px] text-slate-400 mt-1">Guardado en almacenamiento persistente</p>
        </div>
      </div>

      {/* Average score by competency bar chart */}
      <div className="space-y-4">
        <h3 className="text-sm font-extrabold text-slate-700 uppercase tracking-wider">
          Puntuación Media por Competencia
        </h3>
        <div className="space-y-3.5 bg-slate-50/50 rounded-xl border border-slate-200 p-4">
          {AREAS.map((area) => {
            const avg = getAreaAverage(area.id);
            return (
              <div key={area.id} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-600 truncate">{area.nombre}</span>
                  <span className="text-slate-800">{avg}%</span>
                </div>
                <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#0305AF] to-[#4a4dff] rounded-full transition-all duration-500"
                    style={{ width: `${avg}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Submissions List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-sm font-extrabold text-slate-700 uppercase tracking-wider flex items-center gap-2">
            <span>Listado de Entregas</span>
            <span className="text-xs bg-slate-100 text-slate-600 rounded-full px-2 py-0.5">
              {results.length}
            </span>
          </h3>

          <div className="flex items-center gap-2">
            <button
              onClick={exportToCSV}
              disabled={results.length === 0}
              className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 disabled:opacity-50 py-2 px-3.5 rounded-xl transition-all flex items-center gap-1.5"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Exportar Excel (CSV)</span>
            </button>
            <button
              onClick={onClearResults}
              disabled={results.length === 0}
              className="text-xs font-bold text-red-700 bg-red-50 border border-red-200 hover:bg-red-100 disabled:opacity-50 py-2 px-3.5 rounded-xl transition-all flex items-center gap-1.5"
            >
              <Trash2 className="w-4 h-4" />
              <span>Restablecer Todo</span>
            </button>
          </div>
        </div>

        {results.length === 0 ? (
          <div className="text-center py-12 bg-slate-50 rounded-xl border border-slate-200 text-slate-400 text-xs">
            Aún no hay entregas registradas en este dispositivo.
          </div>
        ) : (
          <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold uppercase text-slate-500 tracking-wider">
                    <th className="py-3 px-4">Participante</th>
                    <th className="py-3 px-4">Organización / Área</th>
                    <th className="py-3 px-4">Años Exp</th>
                    <th className="py-3 px-4">Calificación</th>
                    <th className="py-3 px-4">Fecha</th>
                  </tr>
                </thead>
                <tbody className="text-xs text-slate-600 divide-y divide-slate-100">
                  {results.slice().reverse().map((res, index) => (
                    <tr key={index} className="hover:bg-slate-50/50">
                      <td className="py-3 px-4">
                        <div className="font-bold text-slate-800">{res.participant.nombre}</div>
                        <div className="text-[10px] text-slate-400">{res.participant.correo}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-medium text-slate-700">{res.participant.empresa}</div>
                        <div className="text-[10px] text-slate-400">{res.participant.cargo} · {res.participant.area}</div>
                      </td>
                      <td className="py-3 px-4 text-slate-500 font-medium">
                        {res.participant.experiencia}
                      </td>
                      <td className="py-3 px-4 font-extrabold text-[#0305AF]">
                        {res.score}% ({res.correctCount}/{res.totalCount})
                      </td>
                      <td className="py-3 px-4 text-slate-400 font-mono text-[10px]">
                        {new Date(res.date).toLocaleDateString()} {new Date(res.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
