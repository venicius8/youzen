import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-gray-100 flex justify-between items-center top-0 w-screen h-16 z-100 shadow-2xl sticky">
      <div>
        <h1 className="text-4xl">LogoEx</h1>
      </div>
      <nav>
        <ul className="flex gap-4 bg-white">
          <li>
            <Link href="/">aEx</Link>
          </li>
          <li>
            <Link href="/">bEx</Link>
          </li>
          <li>
            <Link href="/">cEx</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
