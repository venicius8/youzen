"use client";

import { useEffect, useRef, useState } from "react";
import Overlay from "../components/UI/Overlay";
import { saveTime } from "@/utils/timeTracker";

interface GratitudeEntry {
  id: string;
  quote: string;
  date: string;
}

export default function GratitudePage() {
  const [entries, setEntries] = useState<GratitudeEntry[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [currentEntry, setCurrentEntry] = useState<GratitudeEntry | null>();
  const [isEntryInfoVisible, setIsEntryInfoVisible] = useState(false);
  const secondsRef = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Get saved entries
  useEffect(() => {
    const savedEntries = localStorage.getItem("gratitudeEntries");
    if (savedEntries) {
      try {
        setEntries(JSON.parse(savedEntries));
      } catch (error) {
        console.error("Error: ", error);
        setEntries([]);
      }
    }
  }, []);

  // Save entries
  useEffect(() => {
    localStorage.setItem("gratitudeEntries", JSON.stringify(entries));
  }, [entries]);

  // Add new entry
  const addEntry = () => {
    const value = inputRef.current?.value.trim();
    if (!value) return;

    const newEntry: GratitudeEntry = {
      id: crypto.randomUUID(),
      quote: inputRef.current?.value || "",
      date: new Date().toISOString(),
    };

    inputRef.current!.value = "";
    inputRef.current?.focus();
    setEntries([...entries, newEntry]);
  };

  // Delete entry
  const deleteEntry = (idToDelete: string) => {
    setEntries(entries.filter((entry) => entry.id !== idToDelete));
    setIsEntryInfoVisible(false);
  };

  // Sort entries (most recent first)
  const sortedEntries = [...entries].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // handle entryInfo
  const handleEntryInfo = (entry: GratitudeEntry) => {
    setCurrentEntry(entry);
    setIsEntryInfoVisible(true);
  };

  // Convert ISOString to local date/time
  const convertDate = (date: string) => new Date(date).toLocaleDateString();
  const convertTime = (date: string) => new Date(date).toLocaleTimeString();

  // Time tracker
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      secondsRef.current += 1;
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);

      saveTime("gratitude", secondsRef.current);
    };
  }, []);

  return (
    <section className="mt-20 flex flex-col items-center">
      <div className="w-4/5 h-76 bg-linear-to-br from-white to-gray-200 border-2 border-gray-400 rounded-2xl flex flex-col justify-center">
        <h1 className="text-4xl font-bold text-center">Gratitude</h1>
        <p className="text-center text-xl mt-4 px-4">
          Registre as coisas que você é grato(a) hoje.
        </p>
        <div className="flex flex-row items-center mt-8 gap-4 px-10">
          <input
            ref={inputRef}
            className="w-full h-18 mx-auto block p-4 border-2 border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-400 duration-300 text-sm md:text-2xl"
            placeholder="Hoje sou grato(a) por..."
          ></input>
          <button
            className="h-18 aspect-square bg-blue-500 text-white rounded-2xl text-3xl font-bold hover:bg-blue-600 duration-300 cursor-pointer"
            onClick={() => addEntry()}
          >
            +
          </button>
        </div>
      </div>
      <div className="w-4/5 min-h-96 mt-10 bg-linear-to-br from-white to-gray-200 border-2 border-gray-400 rounded-2xl">
        {entries.length === 0 ? (
          <p className="text-center text-xl mt-20 px-4">
            Não há nenhum registro ainda... Comece seu primeiro registro de
            gratidão!
          </p>
        ) : (
          <div className="p-4">
            <h2 className="text-2xl mb-6 font-bold md:text-3xl">
              Seus agradecimentos recentes
            </h2>
            {sortedEntries.map((entry) => (
              <div
                className="border border-gray-600 flex flex-row justify-between items-center mb-4 p-2 gap-4 bg-linear-to-br from-gray-100 to-gray-300 rounded-xl shadow-md"
                key={entry.id}
              >
                <p className="border border-gray-400 min-h-12 w-full text-xl flex items-center bg-white rounded-xl px-4">
                  {entry.quote}
                </p>
                <button
                  className="h-10 aspect-square bg-blue-500 hover:bg-blue-600 cursor-pointer duration-300 rounded-sm text-3xl font-bold text-white"
                  onClick={() => handleEntryInfo(entry)}
                >
                  i
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      {isEntryInfoVisible && (
        <>
          <dialog
            open
            className="w-4/5 max-w-200 min-h-96 bg-white fixed left-1/2 top-1/2 -translate-1/2 p-6 rounded-xl z-110 flex flex-col justify-between"
          >
            <h1 className="text-3xl text-center font-bold">
              Informações adicionais
            </h1>
            <div>
              <p className="text-2xl">{currentEntry!.quote}</p>
              <div className="mt-4">
                <p>Data: {convertDate(currentEntry!.date)}</p>
                <p>Hora: {convertTime(currentEntry!.date)}</p>
              </div>
            </div>
            <div className="flex flex-row gap-4">
              <button
                className="h-15 w-full bg-blue-500 hover:bg-blue-600 cursor-pointer duration-300 rounded-sm text-xl font-bold text-white"
                onClick={() => setIsEntryInfoVisible(false)}
              >
                Voltar
              </button>
              <button
                className="h-15 px-2 bg-red-500 hover:bg-red-600 cursor-pointer duration-300 rounded-sm text-xl font-bold text-white"
                onClick={() => deleteEntry(currentEntry!.id)}
              >
                Deletar
              </button>
            </div>
          </dialog>
          <Overlay
            onClick={() => {
              setIsEntryInfoVisible(false);
              setCurrentEntry(null);
            }}
            zIndex={100}
          />
        </>
      )}
    </section>
  );
}
