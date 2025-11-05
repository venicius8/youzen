function HorizontalElement({ img, title }: { img: string; title: string }) {
  return (
    <article className="flex flex-col justify-around items-center">
      <div
        role="img"
        className="w-30 aspect-square bg-white rounded-xl"
        style={{ backgroundImage: `url(${img})` }}
      ></div>
      <span className="text-xl">{title}</span>
    </article>
  );
}
