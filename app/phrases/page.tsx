"use client";

import { useEffect, useState, useRef } from "react";
import Phrases from "./Phrases";
import { saveTime } from "@/utils/timeTracker";

export default function Phrase() {
  // The phrase currently displayed to the user.
  const [currentPhrase, setCurrentPhrase] = useState("");
  // Full list of available phrases loaded from the Phrases data module.
  const [allPhrases, setAllPhrases] = useState<string[]>([]);
  // Interval ID used to track elapsed time on the page.
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  // Elapsed seconds counter kept in a ref to avoid re-renders every tick.
  const secondsRef = useRef(0);
  // Whether the fade-out animation is running (blocks rapid clicks).
  const [isAnimating, setIsAnimating] = useState(false);

  // Load the static phrase list once on mount.
  useEffect(() => {
    setAllPhrases(Phrases);
  }, []);

  // Count seconds while the component is mounted; persist total time on unmount.
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      secondsRef.current += 1;
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      saveTime("phrases", secondsRef.current);
    };
  }, []);

  // Pick and display a random phrase from the list.
  const nextPhrase = () => {
    const randomIndex = Math.floor(Math.random() * allPhrases.length);
    const randomPhrase = allPhrases[randomIndex];

    setCurrentPhrase(randomPhrase);
  };

  // Fade out the card, then swap in a new phrase once the animation ends.
  const handleLocalClick = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
      nextPhrase();
    }, 1000);
  };

  return (
    <section className="h-screen flex flex-row" onClick={handleLocalClick}>
      {/* Decorative background strips; clicking them triggers the next phrase. */}
      <span className="bg-blue-300/10 w-1/4"></span>
      <span className="bg-blue-500/10 w-3/4"></span>
      {/* Centered phrase card; opacity toggles for the fade transition. */}
      <div
        className={`fixed left-1/2 top-1/2 -translate-1/2 text-4xl
          text-center w-4/5 rounded-2xl bg-white/30 p-4 md:w-1/3
          duration-700 ${isAnimating ? "opacity-0" : "opacity-100"}`}
        // Prevents clicks on the card itself from advancing the phrase.
        onClick={(e) => e.stopPropagation()}
      >
        <p>
          {currentPhrase || `Clique em qualquer lugar ao redor para começar`}
        </p>
      </div>
    </section>
  );
}
