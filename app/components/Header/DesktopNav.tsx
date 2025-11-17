import Link from "next/link";

type navItemProps = { label: string; href: string };

const NavLink = ({ label, href }: navItemProps) => (
  <Link href={href}>
    <li className="bg-white text-xl p-2 rounded-xl border-white border hover:border-black duration-300">
      {label}
    </li>
  </Link>
);

export default function DesktopNav() {
  return (
    <ul className="flex gap-8 text-black">
      <NavLink label="Explorar" href="/explore" />
      <NavLink label="Perfil" href="/profile" />
      <NavLink label="Sobre" href="/about" />
    </ul>
  );
}
