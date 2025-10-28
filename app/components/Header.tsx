"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function scrollHandler() {
      setScrolled(window.scrollY > 40);
    }
    scrollHandler();

    window.addEventListener("scroll", scrollHandler);
  }, []);

  return (
    <header
      className={`flex justify-between items-center top-0 w-screen h-16 z-100 shadow-2xl sticky px-10 duration-300 ${
        scrolled ? "bg-green-100" : "bg-black/50 border-black border-b-2"
      }`}
    >
      <div>
        <Link
          href={"/"}
          className={`text-4xl ${scrolled ? "text-black" : "text-white"}`}
        >
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
