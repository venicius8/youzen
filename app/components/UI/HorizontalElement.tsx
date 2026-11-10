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
    // Container for a single feature card in the horizontal scroll list.
    <article className="flex flex-col justify-around items-center">
      {/* Wraps the image thumbnail to make it clickable and navigate to the feature route. */}
      <Link href={link}>
        {/* Square thumbnail rendered via CSS background-image instead of an <img> tag. */}
        <div
          role="img"
          className="w-30 aspect-square rounded-xl bg-white bg-cover cursor-pointer border border-white shadow-xl"
          style={{ backgroundImage: `url(${img})` }}
        ></div>
      </Link>
      {/* Feature name displayed below the thumbnail. */}
      <span className="text-xl">{title}</span>
    </article>
  );
}
