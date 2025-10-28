"use client";

import { useState } from "react";

export default function name() {
  const newUser: boolean = true;
  const [startQuiz, setStartQuiz] = useState(false);

  return (
    <main className="bg-green-100 h-600 text-center">
      <div className="relative bg-[url('/morning-nature.jpg')] h-[50vh] bg-cover bg-center flex items-center justify-center mb-10">
        <h1 className="text-4xl text-white bg-black/30 px-4 py-2 rounded-2xl z-10">
          Bom dia
        </h1>
        <span className="absolute inset-x-0 bottom-0 h-5 bg-linear-to-b from-transparent to-green-100"></span>
      </div>

      {newUser ? (
        <>
          <h2 className="text-2xl m-4 font">
            Parece que você é novo por aqui. Clique aqui abaixo e vamos iniciar
            sua primeira atividade.
          </h2>

          <button
            onClick={() => setStartQuiz(!startQuiz)}
            className="bg-yellow-800 p-4 m-4 rounded-2xl text-white font-bold text-xl cursor-pointer hover:bg-yellow-900 transition"
          >
            Começar
          </button>
          {startQuiz && (
            <div>
              <div className="fixed w-2/3 max-w-200 h-150 bg-green-200 left-1/2 top-1/2 -translate-1/2 border rounded-4xl z-90"></div>
              <div
                onClick={() => setStartQuiz(!setStartQuiz)}
                className="fixed top-0 left-0 w-screen h-screen bg-black/40 backdrop-blur-xs z-86"
              ></div>
            </div>
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
