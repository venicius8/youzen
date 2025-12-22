"use client";

import { allFeatures } from "@/utils/allFeatures";
import { clearTime, FeatureKey, getResume } from "@/utils/timeTracker";
import { useState, useEffect } from "react";
import Overlay from "../components/UI/Overlay";
import Button from "../components/UI/Button";

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
      {Object.entries(totalSpentTime).length === 0 ? (
        <div className="flex flex-col text-center">
          <h1 className="text-4xl my-4 font-bold">Perfil vazio...</h1>
          <p className="text-center mt-10 text-2xl">
            Pareque que não há nenhuma atividade registrada ainda. Clique no
            botão abaixo para começar a usar!
          </p>
          <Button type="primary" url="/explore">
            Ir para página Explorar
          </Button>
        </div>
      ) : (
        <h1 className="text-4xl my-4 font-bold text-center md:text-start">
          Seu perfil
        </h1>
      )}

      {Object.entries(totalSpentTime).map(([nick, number]) => {
        const feature = allFeatures.find((el) => el.nick === nick);

        return (
          <div
            key={nick}
            className="flex items-center gap-4 mt-4 cursor-pointer w-full bg-linear-to-br from-blue-200 to-blue-300 rounded md:w-2/5 hover:scale-102 duration-200"
            onClick={() => setCurrentFeature(nick)}
          >
            <div
              className="w-30 aspect-square bg-cover border-r border-white"
              style={{ backgroundImage: `url(${feature?.imageURL})` }}
              role="img"
            ></div>
            <span className="flex flex-col">
              <p className="text-2xl font-bold tracking-wide">
                {feature?.featureName}
              </p>
              <p>{formatTime(number)}</p>
            </span>
          </div>
        );
      })}

      {currentFeature && (
        <div>
          <dialog
            open
            className="w-4/5 max-w-md min-h-72 bg-white fixed left-1/2 top-1/2 -translate-1/2 p-6 rounded-xl z-110 flex flex-col justify-between gap-6"
          >
            <h1 className="text-3xl">
              Detalhes sobre {currentFeatureObj?.featureName}
            </h1>
            <div>
              <p>{currentFeatureObj?.about}</p>
              <p>
                Tempo gasto no aplicativo:{" "}
                {formatTime(totalSpentTime[currentFeature])}
              </p>
            </div>
            <div className="flex flex-col md:flex-row justify-between gap-2">
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 duration-200 cursor-pointer"
                onClick={() =>
                  (window.location.href = "/" + currentFeatureObj?.nick)
                }
              >
                Acessar aplicativo 🡵
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 duration-200 cursor-pointer"
                onClick={() => setCurrentFeature("")}
              >
                Voltar
              </button>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 duration-200 cursor-pointer"
                onClick={() => {
                  clearTime(currentFeatureObj?.nick as FeatureKey);
                  setTotalSpentTime(getResume());
                  setCurrentFeature("");
                }}
              >
                Deletar tempo
              </button>
            </div>
          </dialog>
          <Overlay onClick={() => setCurrentFeature("")} zIndex={100} />
        </div>
      )}
    </section>
  );
}
