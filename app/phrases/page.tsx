"use client";

import { useEffect, useState, useRef } from "react";
import Phrases from "./Phrases";
import { addTime, getTime, saveTime } from "@/utils/timeTracker";

export default function Phrase() {
  const [currentPhrase, setCurrentPhrase] = useState("");
  const [allPhrases, setAllPhrases] = useState<string[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const secondsRef = useRef(0);

  useEffect(() => {
    setAllPhrases(Phrases);
  }, []);

  useEffect(() => {
    if (allPhrases.length === 0) return;

    const saved = getTime("phrases");
    secondsRef.current = saved;

    intervalRef.current = setInterval(() => {
      secondsRef.current += 1;
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);

      const totalTime = addTime("phrases", secondsRef.current);
      saveTime("phrases", totalTime);
    };
  }, [allPhrases]);

  const nextPhrase = () => {
    const randomIndex = Math.floor(Math.random() * allPhrases.length);
    const randomPhrase = allPhrases[randomIndex];

    setCurrentPhrase(randomPhrase);
  };

  const handleLocalClick = () => {
    nextPhrase();
  };

  return (
    <section className="h-screen flex flex-row">
      <div
        className="bg-blue-300/10 w-1/4"
        onClick={() => setCurrentPhrase(allPhrases[0])}
      ></div>
      <div className="bg-blue-500/10 w-3/4" onClick={handleLocalClick}></div>
      <span
        className="fixed left-1/2 top-1/2 -translate-1/2 text-4xl text-center w-4/5 rounded-2xl bg-white/30 p-4 md:w-1/3"
        onClick={(e) => e.stopPropagation()}
      >
        {currentPhrase || `Clique em qualquer lugar para começar`}
      </span>
    </section>
  );
}
