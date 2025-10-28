"use client";

import { useState } from "react";
import Button from "./components/UI/Button";

export default function name() {
  const newUser: boolean = true;
  const [startQuiz, setStartQuiz] = useState(false);

  return (
    <main className="bg-blue-100 h-600 text-center">
      <div className="relative bg-[url('/morning-nature.jpg')] h-[50vh] bg-cover bg-center flex items-center justify-center mb-10">
        <h1 className="text-4xl text-white bg-black/30 px-4 py-2 rounded-2xl z-10">
          Bom dia
        </h1>
        <span className="absolute inset-x-0 bottom-0 h-5 bg-linear-to-b from-transparent to-blue-100"></span>
      </div>

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
              <div className="fixed w-2/3 max-w-200 h-150 bg-blue-200 left-1/2 top-1/2 -translate-1/2 border rounded-4xl flex flex-col justify-between px-8 py-15 z-90">
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
              <div
                onClick={() => setStartQuiz(false)}
                className="fixed top-0 left-0 w-screen h-screen bg-black/40 backdrop-blur-xs z-86"
              ></div>
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
