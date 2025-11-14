"use client";

import { saveTime } from "@/utils/timeTracker";
import { useState, useEffect, useRef } from "react";

export default function Breathing() {
  const [scale, setScale] = useState(0.5);
  const [phase, setPhase] = useState<
    "Inspire" | "Segure" | "Expire" | "Quando quiser..."
  >("Quando quiser...");
  const [isRunning, setIsRunning] = useState(false);

  const [inhale, setInhale] = useState(6000);
  const [holdInhale, setHoldInhale] = useState(2000);
  const [exhale, setExhale] = useState(6000);
  const [holdExhale, setHoldExhale] = useState(2000);

  const animationRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const secondsRef = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const easeInOut = (t: number) => {
    return -(Math.cos(Math.PI * t) - 1) / 2;
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      secondsRef.current += 1;
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);

      saveTime("breathing", secondsRef.current);
    };
  }, []);

  useEffect(() => {
    if (!isRunning) {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      return;
    }

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const totalCycle = inhale + holdInhale + exhale + holdExhale;
      const cycleTime = (timestamp - startTimeRef.current) % totalCycle;

      let currentScale = 0.5;
      let currentPhase: typeof phase = "Inspire";

      if (cycleTime < inhale) {
        const progress = cycleTime / inhale;
        currentScale = 0.5 + 0.7 * easeInOut(progress);
        currentPhase = "Inspire";
      } else if (cycleTime < inhale + holdInhale) {
        currentScale = 1.2;
        currentPhase = "Segure";
      } else if (cycleTime < inhale + holdInhale + exhale) {
        const progress = (cycleTime - inhale - holdInhale) / exhale;
        currentScale = 1.2 - 0.7 * easeInOut(progress);
        currentPhase = "Expire";
      } else {
        currentScale = 0.5;
        currentPhase = "Segure";
      }

      setScale(currentScale);
      setPhase(currentPhase);

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isRunning, inhale, holdInhale, exhale, holdExhale]);

  const reset = () => {
    startTimeRef.current = 0;
    setScale(0.5);
    setPhase("Quando quiser...");
  };

  return (
    <section className="flex flex-col justify-between py-12 px-4 h-screen">
      <div className="flex-1 flex items-center justify-center">
        <div
          className="bg-linear-to-br from-cyan-400 to-blue-600 rounded-full shadow-2xl transition-all duration-100"
          style={{
            width: "300px",
            height: "300px",
            transform: `scale(${scale})`,
            boxShadow: `0 20px 40px rgba(0, 0, 0, 0.4)`,
          }}
        />
      </div>

      <p
        className={`text-4xl font-light text-cyan-700 text-center mb-10 ${
          isRunning && "animate-pulse"
        }`}
      >
        {isRunning ? phase : "Quando quiser..."}
      </p>

      <div className="bg-white/50 backdrop-blur-xl rounded-xl p-4 shadow-xl max-w-2xl mx-auto space-y-4">
        <div className="grid md:grid-cols-4 grid-cols-2 gap-4 text-sm">
          <div>
            <label className="block text-gray-600">Inspire</label>
            <input
              type="range"
              min="1000"
              max="15000"
              step="500"
              onChange={(e) => setInhale(Number(e.target.value))}
              className="w-full"
              disabled={isRunning}
            />
            <span className="text-xs text-gray-500">
              {(inhale / 1000).toFixed(1)}s
            </span>
          </div>
          <div>
            <label className="block text-gray-600">Segure</label>
            <input
              type="range"
              min="0"
              max="15000"
              step="500"
              onChange={(e) => setHoldInhale(Number(e.target.value))}
              className="w-full"
              disabled={isRunning}
            />
            <span className="text-xs text-gray-500">
              {(holdInhale / 1000).toFixed(1)}s
            </span>
          </div>
          <div>
            <label className="block text-gray-600">Expire</label>
            <input
              type="range"
              min="1000"
              max="15000"
              step="500"
              onChange={(e) => setExhale(Number(e.target.value))}
              className="w-full"
              disabled={isRunning}
            />
            <span className="text-xs text-gray-500">
              {(exhale / 1000).toFixed(1)}s
            </span>
          </div>
          <div>
            <label className="block text-gray-600">Segure</label>
            <input
              type="range"
              min="0"
              max="15000"
              step="500"
              onChange={(e) => setHoldExhale(Number(e.target.value))}
              className="w-full"
              disabled={isRunning}
            />
            <span className="text-xs text-gray-500">
              {(holdExhale / 1000).toFixed(1)}s
            </span>
          </div>
        </div>

        <div className="flex gap-3 justify-center duration-300">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`px-6 py-2 text-white rounded-full transition ${
              isRunning
                ? "bg-red-500 hover:bg-red-600"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {isRunning ? "Pausar" : "Iniciar"}
          </button>
          {!isRunning && (
            <button
              onClick={reset}
              className="text-white px-6 py-2 rounded-full bg-gray-500 hover:bg-gray-600 transition"
            >
              Reiniciar
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
