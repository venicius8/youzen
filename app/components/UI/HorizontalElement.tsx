export default function HorizontalElement({
  img,
  title,
}: {
  img: string;
  title: string;
}) {
  return (
    <article className="flex flex-col justify-around items-center">
      <div
        role="img"
        className="w-30 aspect-square rounded-xl bg-white bg-cover cursor-pointer border border-white shadow-xl"
        style={{ backgroundImage: `url(${img})` }}
      ></div>
      <span className="text-xl">{title}</span>
    </article>
  );
}
