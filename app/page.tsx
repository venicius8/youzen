"use client";

import { useState, useEffect } from "react";
import Button from "./components/UI/Button";
import GreetingHeader from "./components/GreetingHeader";
import { getResume } from "@/utils/timeTracker";
import HorizontalElement from "./components/UI/HorizontalElement";
import HorizontalScrollView from "./components/UI/HorizontalScrollView";
import { allFeatures } from "@/utils/allFeatures";
import Link from "next/link";

export default function Main() {
  const [totalSpentTime, setTotalSpentTime] = useState<Record<string, number>>(
    {},
  );
  const [isClient, setIsClient] = useState(false);
  const [gratitudeQuote, setGratitudeQuote] = useState<{
    quote: string;
    date: string;
  } | null>(null);

  useEffect(() => {
    setIsClient(true);
    setTotalSpentTime(getResume());
  }, []);

  useEffect(() => {
    if (!isClient) return;

    try {
      const stored = localStorage.getItem("gratitudeEntries");
      if (!stored) {
        setGratitudeQuote(null);
        return;
      }

      const entries = JSON.parse(stored);
      if (Array.isArray(entries) && entries.length > 0) {
        const randomIndex = Math.floor(Math.random() * entries.length);
        setGratitudeQuote(entries[randomIndex]);
      } else {
        setGratitudeQuote(null);
      }
    } catch (error) {
      console.error("Error parsing gratitude entries:", error);
      setGratitudeQuote(null);
    }
  }, [isClient]);

  const convertDate = (date: string) =>
    new Date(date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const newUser = isClient && Object.keys(totalSpentTime).length === 0;

  return (
    <main className="bg-blue-100 h-screen text-center">
      <GreetingHeader />

      {newUser ? (
        <section className="flex flex-col items-center justify-center gap-6 mt-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800 max-w-md leading-relaxed">
            Parece que você é novo por aqui. Clique abaixo e vamos iniciar sua
            primeira atividade.
          </h2>
          <Link href="/explore" className="w-full max-w-xs sm:w-auto">
            <Button type="primary">Começar</Button>
          </Link>
        </section>
      ) : (
        <div className="space-y-8">
          <section className="mt-6">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
              Suas atividades recentes
            </h2>

            {isClient && Object.keys(totalSpentTime).length > 0 && (
              <HorizontalScrollView>
                {Object.entries(totalSpentTime).map(([nick]) => {
                  const feature = allFeatures.find((el) => el.nick === nick);
                  if (!feature) return null;

                  return (
                    <HorizontalElement
                      key={nick}
                      img={feature.imageURL}
                      title={feature.featureName}
                      link={`/${feature.nick}`}
                    />
                  );
                })}
              </HorizontalScrollView>
            )}

            <div className="mt-6 flex justify-center">
              <Button type="primary" url="/explore">
                Ir para página Explorar
              </Button>
            </div>
          </section>

          {gratitudeQuote && (
            <section className="mx-auto w-full max-w-3xl px-2">
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg p-6 sm:p-8">
                <blockquote className="text-lg sm:text-xl md:text-2xl text-gray-700 italic leading-relaxed">
                  "{gratitudeQuote.quote}"
                </blockquote>
                <cite className="block mt-4 text-sm sm:text-base text-gray-500 not-italic">
                  — Um ser determinado ({convertDate(gratitudeQuote.date)})
                </cite>
              </div>
            </section>
          )}
        </div>
      )}
    </main>
  );
}
