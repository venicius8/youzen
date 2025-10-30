"use client";

import { useState } from "react";
import Button from "./components/UI/Button";
import GreetingHeader from "./components/GreetingHeader";
import Overlay from "./components/UI/Overlay";

export default function Main() {
  const newUser: boolean = true;
  const [startQuiz, setStartQuiz] = useState(false);

  return (
    <main className="bg-blue-100 h-screen text-center">
      <GreetingHeader />

      {newUser ? (
        <>
          <h2 className="text-2xl m-4">
            Parece que você é novo por aqui. Clique aqui abaixo e vamos iniciar
            sua primeira atividade.
          </h2>

          <div onClick={() => setStartQuiz(!startQuiz)}>
            <Button type="primary">Começar</Button>
          </div>
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
          <h2 className="text-2xl m-4">Sua atividades recentes</h2>
        </>
      )}
    </main>
  );
}
