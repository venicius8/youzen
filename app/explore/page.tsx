"use client";
import { useState, useEffect } from "react";
import { getResume } from "@/utils/timeTracker";
import HorizontalElement from "../components/UI/HorizontalElement";
import HorizontalScrollView from "../components/UI/HorizontalScrollView";
import { allFeatures } from "@/utils/allFeatures";

export default function Explore() {
  const [totalSpentTime, setTotalSpentTime] = useState<Record<string, number>>(
    {},
  );
  const [isClient, setIsClient] = useState(false);
  const [highlight, setHighlight] = useState<
    (typeof allFeatures)[number] | null
  >(null);

  useEffect(() => {
    setIsClient(true);
    const resume = getResume();
    setTotalSpentTime(resume);

    const sorted = Object.entries(resume)
      .sort((a, b) => b[1] - a[1])
      .slice(1, 4);

    if (sorted.length > 0) {
      const randomTop = sorted[new Date().getDate() % sorted.length];
      const feature = allFeatures.find((el) => el.nick === randomTop[0]);
      if (feature) setHighlight(feature);
    }
  }, []);

  const sortedEntries = Object.entries(totalSpentTime).sort(
    (a, b) => b[1] - a[1],
  );

  return (
    <section>
      <div className="flex flex-col items-center my-20 gap-4">
        <h1 className="text-3xl font-bold">Destaque de hoje</h1>

        {isClient && highlight && (
          <>
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
