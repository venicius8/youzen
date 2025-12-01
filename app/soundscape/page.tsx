"use client";

import { useEffect, useRef } from "react";
import AudioContainer from "./components/AudioContainer";
import AudioSection from "./components/AudioSection";
import { getTime, saveTime } from "@/utils/timeTracker";

export default function Soundscape() {
  const secondsRef = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const audios = process.env.NEXT_PUBLIC_AUDIOS_URL;

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      secondsRef.current += 1;
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);

      saveTime("soundscape", secondsRef.current);
    };
  }, []);

  return (
    <section className="h-screen flex flex-col md:flex-row">
      <div className="grow overflow-x-auto pl-4">
        <h1 className="mt-25 mb-11 text-4xl text-center">Soundscape</h1>

        <AudioSection label="Animais" />
        <AudioContainer src={`${audios}/owl.mp3`} label="Coruja" />
        <AudioContainer src={`${audios}/bird.mp3`} label="Pássaro" />
        <AudioContainer src={`${audios}/cricket.mp3`} label="Grilo" />
        <AudioContainer src={`${audios}/frog.mp3`} label="Sapo" />

        <AudioSection label="Natureza" />
        <AudioContainer src={`${audios}/wind.mp3`} label="Vento" />
        <AudioContainer src={`${audios}/thunder.mp3`} label="Trovão" />
        <AudioContainer src={`${audios}/fire.mp3`} label="Fogo" />

        <AudioSection label="Água" />
        <AudioContainer src={`${audios}/rain.mp3`} label="Chuva" />
        <AudioContainer src={`${audios}/river.mp3`} label="Rio" />
        <AudioContainer src={`${audios}/beach.mp3`} label="Praia" />
      </div>
    </section>
  );
}
