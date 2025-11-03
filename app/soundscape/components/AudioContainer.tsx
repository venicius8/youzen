"use client";

import { useEffect, useRef, useState } from "react";

export default function AudioContainer({
  src,
  label,
}: {
  src: string;
  label: string;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [volume, setVolume] = useState(0.6);

  useEffect(() => {
    audioRef.current = new Audio(src);
    audioRef.current.loop = true;
    audioRef.current.volume = volume;

    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, [src]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const toggleAudio = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div
      className={`w-3/4 max-w-3xl h-20 bg-linear-to-br rounded-full my-6 flex items-center justify-between px-6 cursor-pointer ${
        isPlaying ? "from-cyan-400 to-blue-600" : "from-gray-400 to-gray-600"
      }`}
      style={{ boxShadow: "-2px 5px 10px rgba(0, 0, 0, 0.5)" }}
      onClick={toggleAudio}
    >
      <span className="text-white text-4xl">{label}</span>
      {isPlaying && (
        <input
          className="w-1/2 max-w-80 "
          type="range"
          id="volume"
          min={0}
          max={1}
          step={0.01}
          defaultValue={0.6}
          onChange={(e) => setVolume(Number(e.target.value))}
          onClick={(e) => e.stopPropagation()}
        />
      )}
    </div>
  );
}
