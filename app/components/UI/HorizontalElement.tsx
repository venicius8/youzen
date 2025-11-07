import Link from "next/link";

export default function HorizontalElement({
  img,
  title,
  link,
}: {
  img: string;
  title: string;
  link: string;
}) {
  return (
    <article className="flex flex-col justify-around items-center">
      <Link href={link}>
        <div
          role="img"
          className="w-30 aspect-square rounded-xl bg-white bg-cover cursor-pointer border border-white shadow-xl"
          style={{ backgroundImage: `url(${img})` }}
        ></div>
      </Link>
      <span className="text-xl">{title}</span>
    </article>
  );
}
