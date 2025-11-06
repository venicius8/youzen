import HorizontalElement from "../components/UI/HorizontalElement";
import HorizontalScrollView from "../components/UI/HorizontalScrollView";

export default function Explore() {
  return (
    <section>
      <div className="flex flex-col items-center my-20 gap-4">
        <h1 className="text-3xl font-bold">Destaque de hoje</h1>
        <div
          role="img"
          className="w-2/3 aspect-square bg-white max-w-130 rounded-3xl bg-cover border"
          style={{ backgroundImage: `url(/featuresImg/phrases.jpg)` }}
        ></div>
        <span className="text-3xl">Nome da funcionalidade</span>
      </div>
      <HorizontalScrollView title="Visto por último">
        <HorizontalElement img="/featuresImg/breathing.jpg" title="Breathing" />
        <HorizontalElement
          img="/featuresImg/soundscape.jpg"
          title="Soundscape"
        />
        <HorizontalElement img="/featuresImg/phrases.jpg" title="Phrases" />
      </HorizontalScrollView>

      <HorizontalScrollView title="Recomendado">
        <HorizontalElement img="greatImage" title="image title" />
        <HorizontalElement img="greatImage" title="image title" />
        <HorizontalElement img="greatImage" title="image title" />
        <HorizontalElement img="greatImage" title="image title" />
      </HorizontalScrollView>

      <HorizontalScrollView title="Explorar técnicas">
        <HorizontalElement img="greatImage" title="Soundscape" />
        <HorizontalElement img="greatImage" title="Phrases" />
        <HorizontalElement img="greatImage" title="image title" />
        <HorizontalElement img="greatImage" title="image title" />
        <HorizontalElement img="greatImage" title="image title" />
        <HorizontalElement img="greatImage" title="image title" />
        <HorizontalElement img="greatImage" title="image title" />
      </HorizontalScrollView>
    </section>
  );
}
