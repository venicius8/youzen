import Link from "next/link";
import Overlay from "../UI/Overlay";

const NavMenu = ({
  label,
  href,
  event,
}: {
  label: string;
  href: string;
  event: () => void;
}) => (
  <Link href={href} onClick={event}>
    <li className="bg-blue-100 w-full py-2 text-3xl border-y border-white text-center">
      {label}
    </li>
  </Link>
);

export default function MobileSidebar({ event }: { event: () => void }) {
  return (
    <>
      <aside className="w-90 h-screen bg-blue-400 fixed right-0 top-0 border-l-2 border-blue-300 z-110">
        <button
          className="text-6xl cursor-pointer ml-6 text-black"
          onClick={event}
        >
          ×
        </button>
        <ul className="flex flex-col gap-6 mt-4 text-black">
          <NavMenu label="Explorar" href="/explore" event={event} />
          <NavMenu label="Perfil" href="/profile" event={event} />
          <NavMenu label="Sobre" href="/about" event={event} />
        </ul>
      </aside>
      <Overlay onClick={event} zIndex={100} />
    </>
  );
}
