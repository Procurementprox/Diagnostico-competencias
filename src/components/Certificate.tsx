/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from "react";
import { ExamResult } from "../types";
import { Award, CheckCircle, Download, FileText, Printer, Sparkles } from "lucide-react";

interface CertificateProps {
  result: ExamResult;
}

export default function Certificate({ result }: CertificateProps) {
  const certificateRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    const printContent = certificateRef.current?.innerHTML;
    const originalContent = document.body.innerHTML;

    if (printContent) {
      // Open print dialog with custom stylesheets and page setup
      const printWindow = window.open("", "_blank");
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Certificado - ${result.participant.nombre}</title>
              <script src="https://cdn.tailwindcss.com"></script>
              <style>
                @page { size: landscape; margin: 0; }
                body { margin: 0; -webkit-print-color-adjust: exact; font-family: system-ui, sans-serif; }
                .cert-container { padding: 40px; }
              </style>
            </head>
            <body>
              <div class="cert-container">
                ${printContent}
              </div>
              <script>
                window.onload = function() {
                  window.print();
                  window.close();
                }
              </script>
            </body>
          </html>
        `);
        printWindow.document.close();
      }
    }
  };

  const formattedDate = new Date(result.date).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="space-y-6">
      {/* Certificate Frame Container */}
      <div
        ref={certificateRef}
        className="w-full aspect-[1.414/1] max-w-4xl mx-auto bg-amber-50/20 border-8 border-double border-amber-600/40 rounded-3xl p-6 md:p-12 text-center relative overflow-hidden shadow-xl"
        id="certificate-print-area"
      >
        {/* Subtle Watermark background logo */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center">
          <Award className="w-[300px] h-[300px]" />
        </div>

        {/* Certificate Border Corner Decorations */}
        <div className="absolute top-4 left-4 w-12 h-12 border-t-4 border-l-4 border-amber-600/50" />
        <div className="absolute top-4 right-4 w-12 h-12 border-t-4 border-r-4 border-amber-600/50" />
        <div className="absolute bottom-4 left-4 w-12 h-12 border-b-4 border-l-4 border-amber-600/50" />
        <div className="absolute bottom-4 right-4 w-12 h-12 border-b-4 border-r-4 border-amber-600/50" />

        {/* Content */}
        <div className="h-full flex flex-col justify-between items-center py-4">
          {/* Header */}
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2 text-amber-700 font-extrabold text-sm tracking-widest uppercase">
              <Sparkles className="w-4 h-4 fill-current" />
              <span>Certificado de Competencia</span>
              <Sparkles className="w-4 h-4 fill-current" />
            </div>
            <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#02036e]">
              Procurement Pro
            </h3>
            <div className="w-24 h-1 bg-amber-500 mx-auto rounded-full my-3" />
          </div>

          {/* Statement */}
          <div className="my-6 space-y-4">
            <p className="text-slate-500 font-medium italic text-sm md:text-base">
              Se otorga con distinción el presente reconocimiento a:
            </p>
            <h4 className="text-2xl md:text-4xl font-black text-slate-800 tracking-tight underline decoration-amber-500/30 underline-offset-8">
              {result.participant.nombre}
            </h4>
            <p className="text-slate-500 text-xs md:text-sm max-w-xl mx-auto leading-relaxed">
              Por haber completado con éxito el <strong>Diagnóstico de Competencias en Compras</strong>,
              demostrando conocimientos teóricos y prácticos avanzados en Strategic Sourcing, Category Management, SRM, Negociación, Indicadores (KPIs), Gestión de Riesgos y Análisis de Ofertas.
            </p>
          </div>

          {/* Validation Metrics & Seal */}
          <div className="grid grid-cols-3 w-full max-w-2xl items-center gap-4 mt-4">
            {/* Left signature */}
            <div className="text-center space-y-1.5 border-t border-slate-200/80 pt-3">
              <div className="font-mono text-[10px] text-slate-400">UUID: {Math.random().toString(36).substring(2, 10).toUpperCase()}</div>
              <p className="text-xs font-bold text-[#02036e]">Evaluador Académico</p>
              <p className="text-[10px] text-slate-400 font-semibold">Procurement Pro Training</p>
            </div>

            {/* Gold Seal stamp */}
            <div className="flex justify-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-amber-100 border-4 border-dashed border-amber-500 rounded-full flex items-center justify-center shadow-lg relative transform rotate-12">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-amber-500 rounded-full flex flex-col items-center justify-center text-white">
                  <Award className="w-6 h-6 md:w-8 md:h-8" />
                  <span className="text-[8px] font-black tracking-wider uppercase">Aprobado</span>
                </div>
              </div>
            </div>

            {/* Right signature */}
            <div className="text-center space-y-1.5 border-t border-slate-200/80 pt-3">
              <p className="font-sans text-xs font-black text-[#0305AF] tracking-wide">
                Puntuación: {result.score}%
              </p>
              <p className="text-xs font-bold text-[#02036e]">Comité Académico</p>
              <p className="text-[10px] text-slate-400 font-semibold">Fecha: {formattedDate}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 text-sm font-bold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 py-3 px-6 rounded-xl transition-all cursor-pointer shadow-sm"
        >
          <Printer className="w-4 h-4" />
          <span>Imprimir / Guardar en PDF</span>
        </button>
      </div>
    </div>
  );
}
