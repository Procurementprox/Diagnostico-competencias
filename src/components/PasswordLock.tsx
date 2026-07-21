/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion } from "motion/react";
import { Lock, Eye, EyeOff, AlertCircle, Sparkles } from "lucide-react";

interface PasswordLockProps {
  onUnlock: () => void;
}

export default function PasswordLock({ onUnlock }: PasswordLockProps) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    // Simulate a brief secure hash/validation delay for professional premium feel
    setTimeout(() => {
      if (password === "PPRO2026*") {
        onUnlock();
      } else {
        setError("Contraseña incorrecta. Por favor, verifique e intente de nuevo.");
        setIsSubmitting(false);
      }
    }, 400);
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-md bg-white border border-slate-100 rounded-2xl shadow-xl p-8 text-center relative overflow-hidden"
      >
        {/* Subtle upper background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-[#0305AF] opacity-80 rounded-full" />

        {/* Security Shield Icon */}
        <div className="mx-auto w-14 h-14 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-[#0305AF] mb-6">
          <Lock className="w-6 h-6" />
        </div>

        {/* Headings */}
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
          Ingreso al Examen
        </h2>
        <p className="text-sm text-slate-500 mt-2 max-w-[280px] mx-auto leading-relaxed">
          Para realizar este diagnóstico de competencias, ingresa la contraseña de acceso provista.
        </p>

        {/* Password Form */}
        <form onSubmit={handleSubmit} className="mt-8 text-left space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Contraseña Requerida
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                disabled={isSubmitting}
                placeholder="Introducir contraseña..."
                className="w-full pl-4 pr-11 py-3 bg-slate-50/50 border border-slate-200 rounded-xl text-base text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0305AF] focus:ring-offset-1 focus:border-[#0305AF] transition-all disabled:opacity-50"
                id="password_input"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isSubmitting}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1"
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Animated Error Alert */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-2 p-3 bg-red-50 border border-red-100 text-red-700 rounded-xl text-xs font-medium"
            >
              <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </motion.div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || !password}
            className="w-full bg-[#0305AF] hover:bg-[#02036e] active:scale-[0.99] text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-blue-900/10 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#0305AF]"
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>Desbloquear Diagnóstico</span>
                <Sparkles className="w-4 h-4 text-[#FFD000]" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-center gap-2 text-xs text-slate-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span>Servicio de Evaluación Seguro</span>
        </div>
      </motion.div>
    </div>
  );
}
