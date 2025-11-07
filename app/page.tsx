"use client";

import { useState, useEffect } from "react";
import Button from "./components/UI/Button";
import GreetingHeader from "./components/GreetingHeader";
import Overlay from "./components/UI/Overlay";
import { getResume } from "@/utils/timeTracker";
import HorizontalElement from "./components/UI/HorizontalElement";
import HorizontalScrollView from "./components/UI/HorizontalScrollView";
import { allFeatures } from "@/utils/allFeatures";
import Link from "next/link";

export default function Main() {
  const [totalSpentTime, setTotalSpentTime] = useState<Record<string, number>>(
    {}
  );
  const [isClient, setIsClient] = useState(false);
  const [startQuiz, setStartQuiz] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setTotalSpentTime(getResume());
  }, []);

  const newUser = isClient && Object.keys(totalSpentTime).length === 0;

  return (
    <main className="bg-blue-100 h-screen text-center">
      <GreetingHeader />

      {newUser ? (
        <>
          <h2 className="text-2xl m-4">
            Parece que você é novo por aqui. Clique aqui abaixo e vamos iniciar
            sua primeira atividade.
          </h2>

          {/*<div onClick={() => setStartQuiz(!startQuiz)}></div>*/}
          <Link href={"/explore"}>
            <Button type="primary">Começar</Button>
          </Link>
          {startQuiz && (
            <>
              <div className="fixed w-2/3 max-w-md h-150 bg-blue-200 left-1/2 top-1/2 -translate-1/2 border rounded-4xl flex flex-col justify-between px-8 py-15 z-110">
                <h2 className="text-2xl">
                  Antes de iniciar a sua primeira atividade, que tal fazermos um
                  teste rápido? Assim, recomendaremos práticas mais alinhada ao
                  seu objetivo.
                </h2>
                <div className="flex flex-col md:flex-row justify-around items-center">
                  <Button type="success">Fazer o teste</Button>
                  <Button type="danger">Rejeitar</Button>
                </div>
              </div>
              <Overlay onClick={() => setStartQuiz(false)} zIndex={100} />
            </>
          )}
        </>
      ) : (
        <>
          <h2 className="text-2xl m-4">Suas atividades recentes</h2>
          {isClient && Object.keys(totalSpentTime).length > 0 && (
            <HorizontalScrollView>
              {Object.entries(totalSpentTime).map(([nick], index) => {
                const feature = allFeatures.find((el) => el.nick === nick);

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
          <Button type="primary" url="/explore">
            Ir para página Explorar
          </Button>
        </>
      )}
    </main>
  );
}
