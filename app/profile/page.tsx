"use client";

import { allFeatures } from "@/utils/allFeatures";
import { getResume } from "@/utils/timeTracker";
import { useState, useEffect } from "react";
import Overlay from "../components/UI/Overlay";

export default function Profile() {
  const [totalSpentTime, setTotalSpentTime] = useState<Record<string, number>>(
    {}
  );
  const [currentFeature, setCurrentFeature] = useState("");

  const currentFeatureObj = allFeatures.find(
    (el) => el.nick === currentFeature
  );

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
      <h1 className="text-4xl text-center my-4 font-bold">Seu perfil</h1>

      {Object.entries(totalSpentTime).map(([nick, number]) => {
        const feature = allFeatures.find((el) => el.nick === nick);

        return (
          <div
            key={nick}
            className="flex items-center gap-4 mt-4 cursor-pointer w-full bg-linear-to-br from-blue-200 to-blue-300 rounded"
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
          <dialog
            open
            className="w-4/5 min-h-96 bg-white fixed left-1/2 top-1/2 -translate-1/2 p-6 rounded-xl z-110"
          >
            <h1 className="text-3xl">
              Detalhes sobre {currentFeatureObj?.featureName}
            </h1>
            <p>{currentFeatureObj?.about}</p>
            <p></p>
          </dialog>
          <Overlay onClick={() => setCurrentFeature("")} zIndex={100} />
        </>
      )}
    </section>
  );
}
