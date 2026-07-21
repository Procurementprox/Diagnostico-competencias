/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Participant } from "../types";
import { motion } from "motion/react";
import { User, Mail, Briefcase, Award, Building, Landmark, AlertCircle, PlayCircle } from "lucide-react";

interface ParticipantFormProps {
  onSubmit: (participant: Participant) => void;
}

export default function ParticipantForm({ onSubmit }: ParticipantFormProps) {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [cargo, setCargo] = useState("");
  const [area, setArea] = useState("");
  const [experiencia, setExperiencia] = useState("");
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!nombre.trim() || !correo.trim() || !empresa.trim() || !cargo.trim() || !area.trim() || !experiencia) {
      setError("Por favor, completa todos los campos requeridos para iniciar.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.trim())) {
      setError("Por favor, ingresa una dirección de correo electrónico válida.");
      return;
    }

    if (!consent) {
      setError("Debes aceptar el consentimiento de tratamiento confidencial para iniciar el examen.");
      return;
    }

    onSubmit({
      nombre: nombre.trim(),
      correo: correo.trim().toLowerCase(),
      empresa: empresa.trim(),
      cargo: cargo.trim(),
      area: area.trim(),
      experiencia: experiencia,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-slate-100 rounded-2xl shadow-xl p-6 md:p-8"
    >
      <div className="border-b border-slate-100 pb-5 mb-6">
        <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 font-bold text-xs py-1 px-3 rounded-full mb-3">
          <Award className="w-3.5 h-3.5" />
          <span>Formación Corporativa en Compras</span>
        </span>
        <h2 className="text-2xl font-bold text-[#02036e] tracking-tight">
          Registro de Participante
        </h2>
        <p className="text-slate-500 text-sm mt-1.5 leading-relaxed">
          Este diagnóstico toma entre 12 y 18 minutos. Consta de 35 preguntas de opción múltiple distribuidas en siete competencias clave del rol de compras. No es un examen para aprobar o reprobar: sirve para identificar temas prioritarios para el diseño de la capacitación corporativa. Responde honestamente según tu experiencia práctica diaria.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Nombre */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-slate-400" />
              <span>Nombre Completo <span className="text-red-500">*</span></span>
            </label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ej: María Fernanda Ríos"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0305AF] focus:border-[#0305AF] transition-all"
            />
          </div>

          {/* Correo */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              <span>Correo Electrónico <span className="text-red-500">*</span></span>
            </label>
            <input
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              placeholder="nombre@empresa.com"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0305AF] focus:border-[#0305AF] transition-all"
            />
          </div>

          {/* Empresa */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-slate-400" />
              <span>Empresa <span className="text-red-500">*</span></span>
            </label>
            <input
              type="text"
              value={empresa}
              onChange={(e) => setEmpresa(e.target.value)}
              placeholder="Nombre de la compañía"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0305AF] focus:border-[#0305AF] transition-all"
            />
          </div>

          {/* Cargo */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-slate-400" />
              <span>Cargo actual <span className="text-red-500">*</span></span>
            </label>
            <input
              type="text"
              value={cargo}
              onChange={(e) => setCargo(e.target.value)}
              placeholder="Ej: Analista de Compras Senior"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0305AF] focus:border-[#0305AF] transition-all"
            />
          </div>

          {/* Area */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Landmark className="w-3.5 h-3.5 text-slate-400" />
              <span>Área o Departamento <span className="text-red-500">*</span></span>
            </label>
            <input
              type="text"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              placeholder="Ej: Abastecimiento y Logística"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0305AF] focus:border-[#0305AF] transition-all"
            />
          </div>

          {/* Experiencia */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-slate-400" />
              <span>Años de experiencia en compras <span className="text-red-500">*</span></span>
            </label>
            <select
              value={experiencia}
              onChange={(e) => setExperiencia(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0305AF] focus:border-[#0305AF] transition-all cursor-pointer"
            >
              <option value="">Selecciona una opción...</option>
              <option value="Menos de 1 año">Menos de 1 año</option>
              <option value="1 a 3 años">1 a 3 años</option>
              <option value="3 a 5 años">3 a 5 años</option>
              <option value="5 a 10 años">5 a 10 años</option>
              <option value="Más de 10 años">Más de 10 años</option>
            </select>
          </div>
        </div>

        {/* Consentimiento */}
        <div className="bg-slate-50/50 rounded-xl border border-slate-200 p-4 mt-2">
          <label className="flex items-start gap-3.5 cursor-pointer">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-1 w-4 h-4 text-[#0305AF] border-slate-300 rounded focus:ring-[#0305AF]"
            />
            <span className="text-xs text-slate-500 leading-relaxed select-none">
              Autorizo el tratamiento confidencial de mis respuestas para fines del diagnóstico y el diseño de la formación de mi equipo. Entiendo que tengo un solo intento para completar este diagnóstico.
            </span>
          </label>
        </div>

        {/* Alert Error */}
        {error && (
          <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-100 text-red-700 rounded-xl text-xs font-medium">
            <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Action Button */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full bg-[#0305AF] hover:bg-[#02036e] active:scale-[0.99] text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-blue-900/10 transition-all flex items-center justify-center gap-2"
          >
            <PlayCircle className="w-5 h-5" />
            <span>Comenzar Diagnóstico</span>
          </button>
        </div>
      </form>
    </motion.div>
  );
}
