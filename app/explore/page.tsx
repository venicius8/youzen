"use client";
import { useState, useEffect } from "react";
import { getResume } from "@/utils/timeTracker";
import HorizontalElement from "../components/UI/HorizontalElement";
import HorizontalScrollView from "../components/UI/HorizontalScrollView";
import { allFeatures } from "@/utils/allFeatures";

export default function Explore() {
  // Tracks total time spent per activity.
  const [totalSpentTime, setTotalSpentTime] = useState<Record<string, number>>(
    {},
  );
  // Flag to ensure client-side logic runs only after hydration.
  const [isClient, setIsClient] = useState(false);
  // Holds the single feature highlighted for "Today's Spotlight".
  const [highlight, setHighlight] = useState<
    (typeof allFeatures)[number] | null
  >(null);

  // Initialize state and calculate the daily highlight on mount.
  useEffect(() => {
    setIsClient(true);
    const resume = getResume();
    setTotalSpentTime(resume);

    // Sort activities by time spent (descending) and take the top 3.
    const sorted = Object.entries(resume)
      .sort((a, b) => b[1] - a[1])
      .slice(1, 4);

    // Pick one from the top 3 based on the day of the month for variety.
    if (sorted.length > 0) {
      const randomTop = sorted[new Date().getDate() % sorted.length];
      const feature = allFeatures.find((el) => el.nick === randomTop[0]);
      if (feature) setHighlight(feature);
    }
  }, []);

  // Sort all tracked activities by time spent for the "Most Used" list.
  const sortedEntries = Object.entries(totalSpentTime).sort(
    (a, b) => b[1] - a[1],
  );

  return (
    <section>
      {/* Today's Spotlight section */}
      <div className="flex flex-col items-center my-20 gap-4">
        <h1 className="text-3xl font-bold">Destaque de hoje</h1>

        {isClient && highlight && (
          <>
            {/* Highlighted feature image with click-to-navigate */}
            <div
              role="img"
              className="w-2/3 aspect-square bg-white max-w-130 rounded-3xl bg-cover border cursor-pointer"
              style={{ backgroundImage: `url(${highlight.imageURL})` }}
              onClick={() => (window.location.href = `/${highlight.nick}`)}
            ></div>
            <span className="text-3xl">{highlight.featureName}</span>
          </>
        )}
      </div>

      {/* List of most frequently used activities */}
      {isClient && sortedEntries.length > 0 && (
        <HorizontalScrollView title="Mais usados">
          {sortedEntries.map(([nick], index) => {
            const feature = allFeatures.find((el) => el.nick === nick);
            if (!feature) return null;
            return (
              <HorizontalElement
                key={index}
                img={feature.imageURL}
                title={feature.featureName}
                link={`/${feature.nick}`}
              />
            );
          })}
        </HorizontalScrollView>
      )}

      {/* List of all available features */}
      <HorizontalScrollView title="Explorar técnicas">
        {allFeatures.map((el, index) => (
          <HorizontalElement
            key={index}
            img={el.imageURL}
            title={el.featureName}
            link={`/${el.nick}`}
          />
        ))}
      </HorizontalScrollView>
    </section>
  );
}
