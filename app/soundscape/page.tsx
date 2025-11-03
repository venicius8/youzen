import AudioContainer from "./components/AudioContainer";
import AudioSection from "./components/AudioSection";

export default function Soundscape() {
  const audios = process.env.AUDIOS_URL;

  return (
    <section className="h-screen flex flex-col md:flex-row">
      <div className="grow overflow-x-auto pl-4">
        <h1 className="mt-25 mb-11 text-4xl text-center">Soundscape</h1>

        <AudioSection label="Animais" />
        <AudioContainer src={`${audios}/owl.mp3`} label="Coruja" />
        <AudioContainer src={`${audios}/bird.mp3`} label="Pássaro" />
        <AudioContainer src={`${audios}/cricket.mp3`} label="Grilo" />

        <AudioSection label="Natureza" />
        <AudioContainer src={`${audios}/wind.mp3`} label="Vento" />
        <AudioContainer src={`${audios}/thunder.mp3`} label="Trovão" />
        <AudioContainer src={`${audios}/rain.mp3`} label="Chuva" />
      </div>
    </section>
  );
}
