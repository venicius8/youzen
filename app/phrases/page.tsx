"use client";

import { useEffect, useState, useRef } from "react";
import Phrases from "./Phrases";

export default function Phrase() {
  const [firstClick, setFirstClick] = useState(false);
  const [currentPhrase, setCurrentPhrase] = useState("");
  const [allPhrases, setAllPhrases] = useState<string[]>([]);

  const clickHandlerRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const loadPhrases = async () => {
      const data = Phrases;
      setAllPhrases(data);
    };

    loadPhrases();
  }, []);

  useEffect(() => {
    if (allPhrases.length === 0) return;

    const handleFirstClick = () => {
      setFirstClick(true);
      nextPhrase();
    };

    clickHandlerRef.current = handleFirstClick;
    window.addEventListener("click", handleFirstClick);

    return () => {
      if (clickHandlerRef.current)
        window.removeEventListener("click", clickHandlerRef.current);
    };
  }, [firstClick, allPhrases]);

  const nextPhrase = () => {
    const randomIndex = Math.floor(Math.random() * allPhrases.length);
    const randomPhrase = allPhrases[randomIndex];

    setCurrentPhrase(randomPhrase);
  };

  const handleLocalClick = () => {
    if (firstClick) {
      nextPhrase();
    }
  };

  return (
    <section className="h-screen flex flex-row">
      <div
        className="bg-blue-300/10 w-1/4"
        onClick={() => setCurrentPhrase(allPhrases[-1])}
      ></div>
      <div className="bg-blue-500/10 w-3/4" onClick={handleLocalClick}></div>
      <span
        className="fixed left-1/2 top-1/2 -translate-1/2 text-4xl text-center w-4/5 rounded-2xl bg-white/30 p-4 md:w-1/3"
        onClick={(e) => e.stopPropagation()}
      >
        {currentPhrase || "Clique em qualquer lugar para começar"}
      </span>
    </section>
  );
}
