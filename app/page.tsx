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
  // Tracks total time spent per activity, keyed by the activity's "nick" (slug).
  const [totalSpentTime, setTotalSpentTime] = useState<Record<string, number>>(
    {},
  );
  // Flag to ensure browser-only APIs (localStorage) run only on the client,
  // avoiding hydration mismatches in Next.js.
  const [isClient, setIsClient] = useState(false);
  // Holds a randomly picked gratitude entry to display as a quote, or null if none exist.
  const [gratitudeQuote, setGratitudeQuote] = useState<{
    quote: string;
    date: string;
  } | null>(null);

  // On mount (client-side only), mark as client and load the saved time-tracking resume.
  useEffect(() => {
    setIsClient(true);
    setTotalSpentTime(getResume());
  }, []);

  // Once hydrated, read gratitude entries from localStorage and pick one at random.
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
        // Select a random entry so the displayed quote varies between visits.
        const randomIndex = Math.floor(Math.random() * entries.length);
        setGratitudeQuote(entries[randomIndex]);
      } else {
        setGratitudeQuote(null);
      }
    } catch (error) {
      // Guard against malformed JSON in localStorage.
      console.error("Error parsing gratitude entries:", error);
      setGratitudeQuote(null);
    }
  }, [isClient]);

  // Formats an ISO date string into Brazilian Portuguese locale (e.g. "10 de nov. de 2026").
  const convertDate = (date: string) =>
    new Date(date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  // A user is considered "new" when there is no recorded activity yet (after hydration).
  const newUser = isClient && Object.keys(totalSpentTime).length === 0;

  return (
    <main className="bg-blue-100 h-screen text-center">
      {/* Personalized greeting based on time of day / user state. */}
      <GreetingHeader />

      {newUser ? (
        // Onboarding view: shown when no activity has been tracked yet.
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
        // Returning-user view: recent activities + optional gratitude quote.
        <div className="space-y-8">
          <section className="mt-6">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
              Suas atividades recentes
            </h2>

            {/* Render only after hydration and when there is at least one tracked activity. */}
            {isClient && Object.keys(totalSpentTime).length > 0 && (
              <HorizontalScrollView>
                {Object.entries(totalSpentTime).map(([nick]) => {
                  // Map the stored nick back to its feature metadata (name, image, route).
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

            {/* CTA to browse all available features. */}
            <div className="mt-6 flex justify-center">
              <Button type="primary" url="/explore">
                Ir para página Explorar
              </Button>
            </div>
          </section>

          {/* Randomly selected gratitude entry, shown only if one exists. */}
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
