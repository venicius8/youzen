"use client";

import { allFeatures } from "@/utils/allFeatures";
import { getResume } from "@/utils/timeTracker";
import { useState, useEffect } from "react";

export default function Profile() {
  const [totalSpentTime, setTotalSpentTime] = useState<Record<string, number>>(
    {}
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
          <div key={nick} className="flex items-center gap-2">
            <div
              className="w-30 aspect-square bg-cover"
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
    </section>
  );
}
