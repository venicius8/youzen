"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

function NavLink(el: string, ref: string) {
  return (
    <li>
      <Link
        href={ref}
        className="bg-white text-xl p-2 rounded-xl hover:border-b-2 duration-100"
      >
        {el}
      </Link>
    </li>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function scrollHandler() {
      setScrolled(window.scrollY > 40);
    }
    scrollHandler();

    window.addEventListener("scroll", scrollHandler);

    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  return (
    <header
      className={`flex justify-between items-center top-0 w-full h-16 z-100 shadow-2xl fixed px-10 duration-300 ${
        scrolled ? "bg-green-100" : "bg-black/30 border-black border-b"
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
          {NavLink("Explorar", "/")}
          {NavLink("Sobre", "/")}
          {NavLink("Perfil", "/")}
        </ul>
      </nav>
    </header>
  );
}
