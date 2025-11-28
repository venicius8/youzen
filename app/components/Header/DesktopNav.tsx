import Link from "next/link";

type NavItemProps = { label: string; href: string };

const NavLink = ({ label, href }: NavItemProps) => (
  <li className="bg-white text-xl p-2 rounded-xl border-white border hover:border-black duration-300">
    <Link href={href}>{label}</Link>
  </li>
);

export default function DesktopNav() {
  return (
    <ul className="hidden gap-8 text-black md:flex">
      <NavLink label="Explorar" href="/explore" />
      <NavLink label="Perfil" href="/profile" />
      <NavLink label="Sobre" href="/about" />
    </ul>
  );
}
