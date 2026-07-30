/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import Header from "./components/Header";
import PasswordLock from "./components/PasswordLock";
import ParticipantForm from "./components/ParticipantForm";
import QuestionCard from "./components/QuestionCard";
import ExamResultsView from "./components/ExamResultsView";
import AdminPanel from "./components/AdminPanel";
import { Participant, ExamResult, ServerGrading } from "./types";
import { PREGUNTAS, AREAS } from "./questions";
import { motion, AnimatePresence } from "motion/react";
import { Timer, AlertTriangle, Info, CheckCircle2 } from "lucide-react";

const PASSWORD_KEY = "pp_unlocked_session_2026";
const RESULTS_KEY = "pp_exam_results_history";
const SHEETS_URL_KEY = "pp_configured_sheets_url";
const DEFAULT_SHEETS_URL = "https://script.google.com/macros/s/AKfycbyX-oRhfMz4NxBrOIdNuA0YnBXd7EJW_vfuxbYWEglfeti-UnNjUshTsZOJijSOvHMw/exec";
const EXAM_DURATION_SECONDS = 30 * 60; // 30 minutes
const GRADING_TIMEOUT_MS = 20000;

/**
 * Barajado Fisher-Yates. Devuelve los índices canónicos de las opciones en el
 * orden en que se mostrarán, de modo que la posición en pantalla deje de
 * delatar cuál es la respuesta correcta. El índice canónico es el único que
 * viaja al servidor, así que la CLAVE del Apps Script no se ve afectada.
 */
function barajarIndices(n: number): number[] {
  const orden = Array.from({ length: n }, (_, i) => i);
  for (let i = orden.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [orden[i], orden[j]] = [orden[j], orden[i]];
  }
  return orden;
}

function ordenInicialOpciones(): number[][] {
  return PREGUNTAS.map((q) => barajarIndices(q.options.length));
}

export default function App() {
  // Session unlock state (saved in sessionStorage so a browser reload preserves session)
  const [isUnlocked, setIsUnlocked] = useState(() => {
    return sessionStorage.getItem(PASSWORD_KEY) === "true";
  });

  const [isAdminMode, setIsAdminMode] = useState(false);
  const [screen, setScreen] = useState<"register" | "exam" | "results">("register");
  const [participant, setParticipant] = useState<Participant | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  // Track selected answers (index of answer selected, or null)
  const [answers, setAnswers] = useState<Record<number, number | null>>({});
  const [timeRemaining, setTimeRemaining] = useState(EXAM_DURATION_SECONDS);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [error, setError] = useState("");

  // Orden de presentación de las opciones, distinto para cada intento.
  const [ordenOpciones, setOrdenOpciones] = useState<number[][]>(ordenInicialOpciones);
  // Mientras el servidor califica no se puede volver a enviar.
  const [isGrading, setIsGrading] = useState(false);

  // Loaded from storage
  const [sheetsUrl, setSheetsUrl] = useState(() => {
    return localStorage.getItem(SHEETS_URL_KEY) || DEFAULT_SHEETS_URL;
  });
  const [resultsHistory, setResultsHistory] = useState<ExamResult[]>(() => {
    const raw = localStorage.getItem(RESULTS_KEY);
    return raw ? JSON.parse(raw) : [];
  });
  const [activeResult, setActiveResult] = useState<ExamResult | null>(null);

  // Sync results history to localStorage
  useEffect(() => {
    localStorage.setItem(RESULTS_KEY, JSON.stringify(resultsHistory));
  }, [resultsHistory]);

  // Sync sheets URL to localStorage
  useEffect(() => {
    localStorage.setItem(SHEETS_URL_KEY, sheetsUrl);
  }, [sheetsUrl]);

  // Handle countdown ticking
  useEffect(() => {
    let timerId: NodeJS.Timeout;
    if (isTimerRunning && timeRemaining > 0) {
      timerId = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timerId);
            setIsTimerRunning(false);
            // Handle automatic timeout submission
            handleTimeoutSubmission();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [isTimerRunning, timeRemaining]);

  const handleUnlock = () => {
    setIsUnlocked(true);
    sessionStorage.setItem(PASSWORD_KEY, "true");
  };

  const handleRegisterParticipant = (data: Participant) => {
    setParticipant(data);
    setAnswers({});
    setCurrentQuestionIndex(0);
    setTimeRemaining(EXAM_DURATION_SECONDS);
    setScreen("exam");
    setIsTimerRunning(true);
    setError("");
  };

  const handleAnswerSelect = (optionIndex: number) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: optionIndex,
    }));
    setError("");
  };

  const handleNext = () => {
    const selected = answers[currentQuestionIndex];
    if (selected === undefined || selected === null) {
      setError("Por favor, selecciona una opción antes de continuar.");
      return;
    }

    if (currentQuestionIndex < PREGUNTAS.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setError("");
    } else {
      // It was the last question, proceed to calculate and submit!
      handleSubmitExam();
    }
  };

  const handleBack = () => {
    setError("");
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    } else {
      // Trying to go back from first question
      if (window.confirm("¿Estás seguro de que deseas regresar al registro? Se perderá todo tu progreso actual de este intento.")) {
        setIsTimerRunning(false);
        setScreen("register");
        setParticipant(null);
      }
    }
  };

  // Hidden submission mechanism to Google Sheets Webapp
  /**
   * Envía las respuestas al Apps Script y DEVUELVE la calificación.
   * La nota se calcula solo en el servidor: aquí no existe la clave.
   * Se usa Content-Type text/plain para que el navegador no dispare el
   * preflight CORS, que Apps Script no responde.
   */
  const gradeOnServer = async (
    participantData: Participant,
    answersArray: (number | null)[],
    ordenUsado: number[][],
    wasTimeout: boolean,
    timeSpentSeconds: number,
    targetUrl: string
  ): Promise<ServerGrading | null> => {
    if (!targetUrl) return null;

    // Posición en pantalla (0..3) que marcó el participante. Sirve para detectar
    // a quien siempre elige el mismo lugar sin leer; con el orden barajado ese
    // patrón ya no puede confundirse con conocimiento real.
    const posiciones = answersArray.map((canonical, i) =>
      canonical === null ? "" : ordenUsado[i].indexOf(canonical)
    );

    const payload = {
      version: "2.0",
      enviado: new Date().toISOString(),
      motivo_cierre: wasTimeout ? "tiempo_agotado" : "completado",
      segundos_empleados: timeSpentSeconds,
      participante: {
        nombre: participantData.nombre,
        correo: participantData.correo,
        empresa: participantData.empresa,
        cargo: participantData.cargo,
        area: participantData.area,
        experiencia: participantData.experiencia
      },
      // Índices canónicos (no la posición en pantalla, que va barajada).
      respuestas: answersArray,
      posiciones: posiciones
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), GRADING_TIMEOUT_MS);

    try {
      const response = await fetch(targetUrl, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
        signal: controller.signal
      });

      const data = await response.json();
      if (data && data.result === "ok" && data.calificacion) {
        return data.calificacion as ServerGrading;
      }
      if (data && data.result === "duplicate") {
        alert(
          "Este correo ya registró un intento. El diagnóstico admite una sola " +
          "presentación por participante, así que no se calificará de nuevo."
        );
        return null;
      }
      console.error("El servidor no devolvió calificación:", data);
      return null;
    } catch (err) {
      console.error("Error al calificar en el servidor:", err);
      return null;
    } finally {
      clearTimeout(timeoutId);
    }
  };

  const handleSubmitExam = async (wasTimeout = false) => {
    if (isGrading) return;
    setIsTimerRunning(false);

    if (!participant) return;

    const answersArray: (number | null)[] = PREGUNTAS.map((_, idx) => {
      const selected = answers[idx];
      return selected !== undefined ? selected : null;
    });

    const totalCount = PREGUNTAS.length;
    const timeSpentSeconds = EXAM_DURATION_SECONDS - timeRemaining;

    setIsGrading(true);
    const grading = await gradeOnServer(
      participant,
      answersArray,
      ordenOpciones,
      wasTimeout,
      timeSpentSeconds,
      sheetsUrl
    );
    setIsGrading(false);

    const resultObj: ExamResult = {
      participant,
      answers: answersArray,
      score: grading ? grading.porcentaje : 0,
      correctCount: grading ? grading.total : 0,
      totalCount,
      date: new Date().toISOString(),
      timeSpentSeconds,
      wasTimeLimitExceeded: wasTimeout,
      estado: grading ? "calificado" : "sin_conexion",
      grading: grading ?? undefined
    };

    // Store in historical registry
    setResultsHistory((prev) => [...prev, resultObj]);
    setActiveResult(resultObj);
    setScreen("results");
  };

  const handleTimeoutSubmission = () => {
    alert("¡Atención! El tiempo reglamentario de 30 minutos se ha agotado. Tus respuestas se calificarán y registrarán de forma automática con lo que lograste responder.");
    handleSubmitExam(true);
  };

  const handleRestart = () => {
    setScreen("register");
    setParticipant(null);
    setAnswers({});
    setCurrentQuestionIndex(0);
    setActiveResult(null);
    // Nuevo intento, nuevo orden de opciones.
    setOrdenOpciones(ordenInicialOpciones());
  };

  const handleClearResultsHistory = () => {
    if (window.confirm("¿Seguro de que deseas restablecer por completo los registros? Esto eliminará de forma irreversible el historial de entregas de este dispositivo.")) {
      setResultsHistory([]);
    }
  };

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, "0")}:${remainingSecs.toString().padStart(2, "0")}`;
  };

  const getGlobalProgressPercent = () => {
    if (screen === "register") return 0;
    if (screen === "results") return 100;
    return Math.round(((currentQuestionIndex + 1) / PREGUNTAS.length) * 100);
  };

  // Find active area metadata for active question card
  const getActiveQuestionAreaDetails = () => {
    const activeQ = PREGUNTAS[currentQuestionIndex];
    const activeArea = AREAS.find((a) => a.id === activeQ.area) || AREAS[0];
    const activeAreaIdx = AREAS.findIndex((a) => a.id === activeQ.area);

    // Filter questions belonging to this area to compute area-level progress
    const areaQuestions = PREGUNTAS.filter((q) => q.area === activeQ.area);
    const questionIndexInArea = areaQuestions.findIndex((q) => q.text === activeQ.text);

    return {
      activeQ,
      activeArea,
      activeAreaIdx,
      questionIndexInArea,
      totalQuestionsInArea: areaQuestions.length,
    };
  };

  const {
    activeQ,
    activeArea,
    activeAreaIdx,
    questionIndexInArea,
    totalQuestionsInArea,
  } = (screen === "exam" && isUnlocked) ? getActiveQuestionAreaDetails() : {
    activeQ: PREGUNTAS[0],
    activeArea: AREAS[0],
    activeAreaIdx: 0,
    questionIndexInArea: 0,
    totalQuestionsInArea: 5,
  };

  const isTimerLow = timeRemaining <= 300; // 5 minutes or less

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col justify-between">
      {/* Header with quick Admin / User Info toggle */}
      <Header
        participantName={participant?.nombre}
        onAdminClick={() => setIsAdminMode(!isAdminMode)}
        isAdmin={isAdminMode}
      />

      <main className="flex-grow max-w-4xl w-full mx-auto px-4 py-8 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {isAdminMode ? (
            <div key="admin" className="w-full">
              <AdminPanel
                results={resultsHistory}
                onClearResults={handleClearResultsHistory}
                sheetsUrl={sheetsUrl}
                onUpdateSheetsUrl={setSheetsUrl}
                onClose={() => setIsAdminMode(false)}
              />
            </div>
          ) : !isUnlocked ? (
            <div key="lock" className="w-full flex items-center justify-center">
              <PasswordLock onUnlock={handleUnlock} />
            </div>
          ) : (
            <div className="space-y-6 w-full">
              {/* Progress and Timer floating bar (only on active exam) */}
              {screen === "exam" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white border border-slate-100 rounded-2xl shadow-sm p-4 flex flex-col md:flex-row items-center justify-between gap-4"
                >
                  {/* Left: Overall Progression */}
                  <div className="w-full md:w-2/3 space-y-1.5">
                    <div className="flex justify-between text-xs font-black text-slate-400 uppercase tracking-widest">
                      <span>Progreso del Diagnóstico</span>
                      <span className="text-[#0305AF]">
                        {currentQuestionIndex + 1} de {PREGUNTAS.length} preguntas
                      </span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#0305AF] to-[#4a4dff] rounded-full transition-all duration-300"
                        style={{ width: `${getGlobalProgressPercent()}%` }}
                      />
                    </div>
                  </div>

                  {/* Right: Countdown clock */}
                  <div
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl border font-bold text-sm transition-all duration-300 ${
                      isTimerLow
                        ? "bg-rose-50 text-rose-700 border-rose-200 animate-pulse"
                        : "bg-slate-50 text-slate-700 border-slate-200"
                    }`}
                  >
                    <Timer className={`w-4 h-4 ${isTimerLow ? "text-rose-500" : "text-[#0305AF]"}`} />
                    <span className="font-mono">{formatTimer(timeRemaining)}</span>
                  </div>
                </motion.div>
              )}

              {/* View Switch */}
              {screen === "register" && (
                <div key="register">
                  <ParticipantForm onSubmit={handleRegisterParticipant} />
                </div>
              )}

              {screen === "exam" && (
                <div key="question">
                  <QuestionCard
                    currentQuestion={activeQ}
                    currentArea={activeArea}
                    currentAreaIndex={activeAreaIdx}
                    totalAreasCount={AREAS.length}
                    questionIndexInArea={questionIndexInArea}
                    totalQuestionsInArea={totalQuestionsInArea}
                    selectedAnswer={answers[currentQuestionIndex] ?? null}
                    optionOrder={ordenOpciones[currentQuestionIndex]}
                    onAnswerSelect={handleAnswerSelect}
                    onNext={handleNext}
                    onBack={handleBack}
                    error={error}
                    isSubmitting={isGrading}
                    isLastQuestion={currentQuestionIndex === PREGUNTAS.length - 1}
                  />
                </div>
              )}

              {screen === "results" && activeResult && (
                <div key="results">
                  <ExamResultsView
                    result={activeResult}
                    onRestart={handleRestart}
                  />
                </div>
              )}
            </div>
          )}
        </AnimatePresence>
      </main>

      <footer className="py-6 text-center text-xs text-slate-400 font-semibold border-t border-slate-100 bg-white mt-12">
        Diagnóstico de <b>Procurement Pro</b> · Formación Corporativa y Abastecimiento Estratégico
      </footer>
    </div>
  );
}
