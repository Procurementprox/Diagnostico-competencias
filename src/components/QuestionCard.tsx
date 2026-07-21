/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Pregunta, Area } from "../types";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, AlertCircle, Bookmark, HelpCircle } from "lucide-react";

interface QuestionCardProps {
  currentQuestion: Pregunta;
  currentArea: Area;
  currentAreaIndex: number; // 0-based
  totalAreasCount: number;
  questionIndexInArea: number; // 0-based
  totalQuestionsInArea: number;
  selectedAnswer: number | null;
  onAnswerSelect: (optionIndex: number) => void;
  onNext: () => void;
  onBack: () => void;
  error: string;
}

export default function QuestionCard({
  currentQuestion,
  currentArea,
  currentAreaIndex,
  totalAreasCount,
  questionIndexInArea,
  totalQuestionsInArea,
  selectedAnswer,
  onAnswerSelect,
  onNext,
  onBack,
  error,
}: QuestionCardProps) {
  const letters = ["A", "B", "C", "D"];

  return (
    <motion.div
      key={currentQuestion.text} // Trigger entry transitions on question change
      initial={{ opacity: 0, x: 15 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -15 }}
      transition={{ duration: 0.3 }}
      className="bg-white border border-slate-100 rounded-2xl shadow-xl p-6 md:p-8"
    >
      {/* Competency Area Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#0305AF]/5 flex items-center justify-center text-[#0305AF]">
            <Bookmark className="w-4 h-4 fill-current" />
          </div>
          <div>
            <span className="text-xs font-extrabold text-[#0305AF] tracking-widest uppercase">
              Sección {currentAreaIndex + 1} de {totalAreasCount}
            </span>
            <h3 className="text-base font-bold text-slate-800 tracking-tight">
              {currentArea.nombre}
            </h3>
          </div>
        </div>
        <div className="text-xs font-bold text-slate-400 bg-slate-50 border border-slate-100 rounded-full px-3 py-1 self-start sm:self-center">
          Pregunta {questionIndexInArea + 1} de {totalQuestionsInArea} de esta sección
        </div>
      </div>

      {/* Question Text */}
      <div className="space-y-4 mb-8">
        <div className="flex items-start gap-3">
          <HelpCircle className="w-6 h-6 text-[#0305AF] flex-shrink-0 mt-0.5" />
          <h4 className="text-lg md:text-xl font-bold text-slate-800 leading-snug">
            {currentQuestion.text}
          </h4>
        </div>
      </div>

      {/* Options List */}
      <div className="space-y-3.5">
        {currentQuestion.options.map((option, idx) => {
          const isSelected = selectedAnswer === idx;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => onAnswerSelect(idx)}
              className={`w-full text-left flex items-start gap-4 p-4 rounded-xl border transition-all ${
                isSelected
                  ? "border-[#0305AF] bg-blue-50/40 shadow-sm shadow-blue-900/5"
                  : "border-slate-200 bg-slate-50/30 hover:border-slate-300 hover:bg-slate-50/80"
              }`}
            >
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 mt-0.5 border transition-all ${
                  isSelected
                    ? "bg-[#0305AF] text-[#FFD000] border-[#0305AF]"
                    : "bg-white text-[#0305AF] border-slate-200"
                }`}
              >
                {letters[idx]}
              </span>
              <span
                className={`text-sm md:text-base leading-relaxed ${
                  isSelected ? "font-bold text-slate-900" : "font-medium text-slate-600"
                }`}
              >
                {option}
              </span>
            </button>
          );
        })}
      </div>

      {/* Action Navigation */}
      <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center justify-center gap-2 text-sm font-bold text-slate-600 bg-slate-50 border border-slate-200 hover:bg-slate-100 py-3 px-5 rounded-xl transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Anterior</span>
        </button>

        {error && (
          <div className="flex items-center gap-2 text-red-600 text-xs font-semibold py-1 px-2.5 bg-red-50 border border-red-100 rounded-lg">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <button
          type="button"
          onClick={onNext}
          className="flex items-center justify-center gap-2 text-sm font-bold text-white bg-[#0305AF] hover:bg-[#02036e] py-3 px-6 rounded-xl shadow-lg shadow-blue-900/10 transition-all"
        >
          <span>Siguiente</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}
