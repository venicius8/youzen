function AudioContainer() {
  return (
    <div
      className="w-3/4 max-w-3xl h-20 bg-linear-to-br from-cyan-400 to-blue-600 rounded-full my-6"
      style={{ boxShadow: "-2px 5px 10px rgba(0, 0, 0, 0.5)" }}
    ></div>
  );
}

function AudioSection({ label }: { label: String }) {
  return (
    <span className="flex flex-col items-center mt-20">
      <p className="text-xl text-center">{label}</p>
      <hr className="w-4/5" />
    </span>
  );
}

export default function Soundscape() {
  return (
    <section className="h-screen flex flex-col md:flex-row">
      <div className="grow overflow-x-auto pl-4">
        <h1 className="mt-25 mb-11 text-4xl text-center">Soundscape</h1>

        <AudioSection label="Animais" />
        <AudioContainer />
        <AudioContainer />
        <AudioContainer />
        <AudioContainer />

        <AudioSection label="Natureza" />
        <AudioContainer />
        <AudioContainer />
        <AudioContainer />
        <AudioContainer />

        <AudioSection label="Artificiais" />
        <AudioContainer />
        <AudioContainer />
        <AudioContainer />
      </div>

      <div className="h-full flex flex-row md:h-full md:w-1/3 md:flex-col">
        <div className="border w-2/3 flex-1 md:mt-20 md:w-full">
          <h2 className="text-center text-2xl">Áudios ativos</h2>
          <div>
            <p>Exemplo</p>
            <p>Exemplo</p>
            <p>Exemplo</p>
            <p>Exemplo</p>
            <p>Exemplo</p>
            <p>Exemplo</p>
          </div>
        </div>
        <div className="border w-1/3 md:w-full">
          <div className="border h-1/3 text-center">
            <h2>Áudio selecionado:</h2>
            <p>...</p>
          </div>
          <div className="border h-2/3 flex justify-center items-center">
            <input
              className="-rotate-90 h-3/4 aspect-square md:rotate-0 md:w-2/3 md:aspect-auto md:p-10"
              type="range"
              min={0}
              max={1}
              step={0.01}
              defaultValue={0.6}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
