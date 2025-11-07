"use client";

import { getResume } from "@/utils/timeTracker";
import HorizontalElement from "../components/UI/HorizontalElement";
import HorizontalScrollView from "../components/UI/HorizontalScrollView";
import { allFeatures } from "@/utils/allFeatures";

export default function Explore() {
  const totalSpentTime = getResume();

  return (
    <section>
      <div className="flex flex-col items-center my-20 gap-4">
        <h1 className="text-3xl font-bold">Destaque de hoje</h1>
        <div
          role="img"
          className="w-2/3 aspect-square bg-white max-w-130 rounded-3xl bg-cover border cursor-pointer"
          style={{ backgroundImage: `url(/featuresImg/breathing.jpg)` }}
          onClick={() => (window.location.href = "/breathing")}
        ></div>
        <span className="text-3xl">Breathing</span>
      </div>

      {Object.keys(getResume()).length !== 0 && (
        <HorizontalScrollView title="Mais usados">
          {Object.entries(totalSpentTime)
            .sort((a, b) => b[1] - a[1])
            .map((sortedEl, index) => {
              const feature = allFeatures.find(
                (el) => el["nick"] === sortedEl[0]
              );

              return (
                <HorizontalElement
                  key={index}
                  img={feature!.imageURL}
                  title={feature!.featureName}
                  link={`/${feature!.nick}`}
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
