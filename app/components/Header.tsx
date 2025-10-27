import Link from "next/link";

const navLink = (el: string, ref: string) => (
  <li>
    <Link
      href={ref}
      className="bg-white text-xl p-2 rounded-xl hover:border-b-2 duration-50"
    >
      {el}
    </Link>
  </li>
);

export default function Header() {
  return (
    <header className="bg-gray-100 flex justify-between items-center top-0 w-screen h-16 z-100 shadow-2xl sticky px-10">
      <div>
        <Link href={"/"} className="text-4xl">
          LogoEx
        </Link>
      </div>
      <nav>
        <ul className="flex gap-8">
          {navLink("Explorar", "/")}
          {navLink("Sobre", "/")}
          {navLink("Perfil", "/")}
        </ul>
      </nav>
    </header>
  );
}
