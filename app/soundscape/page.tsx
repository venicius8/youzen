import AudioContainer from "./components/AudioContainer";
import AudioSection from "./components/AudioSection";

export default function Soundscape() {
  return (
    <section className="h-screen flex flex-col md:flex-row">
      <div className="grow overflow-x-auto pl-4">
        <h1 className="mt-25 mb-11 text-4xl text-center">Soundscape</h1>

        <AudioSection label="Animais" />
        <AudioContainer src={`${process.env.AUDIO_URL}/owl`} />
        <AudioContainer src={`${process.env.AUDIO_URL}/bird`} />
        <AudioContainer src={`${process.env.AUDIO_URL}/cricket`} />

        <AudioSection label="Natureza" />
        <AudioContainer src={`${process.env.AUDIO_URL}/wind`} />
        <AudioContainer src={`${process.env.AUDIO_URL}/thunder`} />
        <AudioContainer src={`${process.env.AUDIO_URL}/rain`} />
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
        <div className="w-1/3 md:w-full">
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
