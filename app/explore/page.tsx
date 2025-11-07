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
          className="w-2/3 aspect-square bg-white max-w-130 rounded-3xl bg-cover border"
          style={{ backgroundImage: `url(/featuresImg/phrases.jpg)` }}
        ></div>
        <span className="text-3xl">Nome da funcionalidade</span>
      </div>

      {/*
      <HorizontalScrollView title="Visto por último">
        <HorizontalElement img="/featuresImg/breathing.jpg" title="Breathing" />
        <HorizontalElement
          img="/featuresImg/soundscape.jpg"
          title="Soundscape"
        />
        <HorizontalElement img="/featuresImg/phrases.jpg" title="Phrases" />
      </HorizontalScrollView>
      */}

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

      <HorizontalScrollView title="Explorar técnicas">
        {allFeatures.map((el, index) => (
          <HorizontalElement
            key={index}
            img={el.imageURL}
            title={el.featureName}
            link={`/${el.nick}`}
          />
        ))}

        {/*
        <HorizontalElement img="greatImage" title="Phrases" />
        <HorizontalElement img="greatImage" title="image title" />
        <HorizontalElement img="greatImage" title="image title" />
        <HorizontalElement img="greatImage" title="image title" />
        <HorizontalElement img="greatImage" title="image title" />
        <HorizontalElement img="greatImage" title="image title" />
        */}
      </HorizontalScrollView>
    </section>
  );
}
