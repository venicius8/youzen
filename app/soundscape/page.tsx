"use client";

import AudioContainer from "./components/AudioContainer";
import AudioSection from "./components/AudioSection";
import useTimeTracker from "../hooks/useTimeTracker";

export default function Soundscape() {
  // Custom hook to track time spent on this page.
  useTimeTracker("soundscape");

  // Base URL for audio assets, injected at build time via Next.js env vars.
  const audios = process.env.NEXT_PUBLIC_AUDIOS_URL;

  return (
    <section className="h-screen flex flex-col md:flex-row">
      {/* Scrollable container for audio players organized by category. */}
      <div className="grow overflow-x-auto pl-4">
        <h1 className="mt-25 mb-11 text-4xl text-center">Soundscape</h1>

        {/* Animals category */}
        <AudioSection label="Animais" />
        <AudioContainer src={`${audios}/owl.mp3`} label="Coruja" />
        <AudioContainer src={`${audios}/bird.mp3`} label="Pássaro" />
        <AudioContainer src={`${audios}/cricket.mp3`} label="Grilo" />
        <AudioContainer src={`${audios}/frog.mp3`} label="Sapo" />

        {/* Nature category */}
        <AudioSection label="Natureza" />
        <AudioContainer src={`${audios}/wind.mp3`} label="Vento" />
        <AudioContainer src={`${audios}/thunder.mp3`} label="Trovão" />
        <AudioContainer src={`${audios}/fire.mp3`} label="Fogo" />

        {/* Water category */}
        <AudioSection label="Água" />
        <AudioContainer src={`${audios}/rain.mp3`} label="Chuva" />
        <AudioContainer src={`${audios}/river.mp3`} label="Rio" />
        <AudioContainer src={`${audios}/beach.mp3`} label="Praia" />
      </div>
    </section>
  );
}
