"use client";

import { allFeatures } from "@/utils/allFeatures";
import { FeatureKey, getResume, saveTime } from "@/utils/timeTracker";
import { useState, useEffect } from "react";
import Overlay from "../components/UI/Overlay";
import { useWindowWidth } from "../components/useWindowWidth";

export default function Profile() {
  const [totalSpentTime, setTotalSpentTime] = useState<Record<string, number>>(
    {}
  );
  const [currentFeature, setCurrentFeature] = useState("");
  const width = useWindowWidth();

  const currentFeatureObj = allFeatures.find(
    (el) => el.nick === currentFeature
  );

  const clearFeatureTime = (feature: FeatureKey) => {
    saveTime(feature, 0);
    setTotalSpentTime(getResume());
  };

  useEffect(() => {
    setTotalSpentTime(getResume());
  }, []);

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const parts = [];

    if (hours > 0) parts.push(hours + "h");
    if (minutes > 0) parts.push(minutes + "min");
    if (seconds > 0) parts.push(seconds + "s");

    return parts.join(", ");
  };

  return (
    <section className="flex flex-col mt-20 mx-4">
      <h1 className="text-4xl my-4 font-bold text-center md:text-start">
        Seu perfil
      </h1>
      {Object.entries(totalSpentTime).map(([nick, number]) => {
        const feature = allFeatures.find((el) => el.nick === nick);

        return (
          <div
            key={nick}
            className="flex items-center gap-4 mt-4 cursor-pointer w-full bg-linear-to-br from-blue-200 to-blue-300 rounded md:w-2/5"
            onClick={() => setCurrentFeature(nick)}
          >
            <div
              className="w-30 aspect-square bg-cover border-r border-white"
              style={{ backgroundImage: `url(${feature?.imageURL})` }}
              role="img"
            ></div>
            <span className="flex flex-col">
              <p className="text-2xl">{feature?.featureName}</p>
              <p>{formatTime(number)}</p>
            </span>
          </div>
        );
      })}

      {currentFeature && (
        <>
          <div className="md:hidden block">
            <dialog
              open
              className="w-4/5 min-h-96 bg-white fixed left-1/2 top-1/2 -translate-1/2 p-6 rounded-xl z-110"
            >
              <h1 className="text-3xl">
                Detalhes sobre {currentFeatureObj?.featureName}
              </h1>
              <p>{currentFeatureObj?.about}</p>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded mt-4 hover:bg-red-700 duration-200"
                onClick={() =>
                  clearFeatureTime(currentFeatureObj?.nick as FeatureKey)
                }
              >
                Deletar tempo
              </button>
            </dialog>
            <Overlay onClick={() => setCurrentFeature("")} zIndex={100} />
          </div>

          <div className="fixed w-1/2 h-2/3 bg-blue-200 top-1/2 right-4 -translate-y-1/2 p-8 text-center md:block hidden">
            <h1 className="text-3xl">
              Detalhes sobre {currentFeatureObj?.featureName}
            </h1>
            <div className="w-full h-96 bg-blue-50 p-4">
              <p>{currentFeatureObj?.about}</p>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
