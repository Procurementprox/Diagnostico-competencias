/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Award, ShieldCheck, User } from "lucide-react";

interface HeaderProps {
  participantName?: string;
  onAdminClick?: () => void;
  isAdmin?: boolean;
}

export default function Header({ participantName, onAdminClick, isAdmin }: HeaderProps) {
  return (
    <header className="w-full bg-white border-b border-slate-100 py-4 px-6 md:px-8 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Logo and Brand */}
        <div className="flex items-center gap-4">
          <div className="relative w-12 h-12 flex-shrink-0 flex items-center justify-center">
            {/* Custom High-Fidelity SVG of the Procurement Pro Logo */}
            <svg
              className="w-full h-full"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Logo Procurement Pro"
            >
              {/* Outer Blue Circle Ring */}
              <circle
                cx="50"
                cy="50"
                r="44"
                stroke="#0305AF"
                strokeWidth="8"
                fill="white"
              />
              {/* Yellow Shadow P */}
              <text
                x="33"
                y="69"
                fontFamily="system-ui, -apple-system, sans-serif"
                fontWeight="900"
                fontSize="58"
                fill="#FFD000"
              >
                P
              </text>
              {/* Dark Blue Main P (slightly offset to the right and up) */}
              <text
                x="41"
                y="65"
                fontFamily="system-ui, -apple-system, sans-serif"
                fontWeight="900"
                fontSize="58"
                fill="#0305AF"
              >
                P
              </text>
            </svg>
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-[#02036e]">
              Procurement Pro
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Diagnóstico de Competencias en Compras
            </p>
          </div>
        </div>

        {/* User Info & Settings / Admin Buttons */}
        <div className="flex items-center gap-3">
          {participantName && (
            <div className="hidden sm:flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-full py-1.5 px-3">
              <User className="w-4 h-4 text-slate-400" />
              <span className="text-xs font-semibold text-slate-600 truncate max-w-[150px]">
                {participantName}
              </span>
            </div>
          )}

          <button
            onClick={onAdminClick}
            className={`flex items-center gap-1.5 text-xs font-bold py-2 px-3.5 rounded-lg border transition-all ${
              isAdmin
                ? "bg-amber-50 text-amber-700 border-amber-200"
                : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{isAdmin ? "Panel Admin Activo" : "Administrador"}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
