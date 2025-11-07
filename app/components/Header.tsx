"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Overlay from "./UI/Overlay";

type navItemProps = { label: string; href: string };

const NavLink = ({ label, href }: navItemProps) => (
  <li>
    <Link
      href={href}
      className="bg-white text-xl p-2 rounded-xl hover:border-b-2 duration-100"
    >
      {label}
    </Link>
  </li>
);

const NavMenu = ({ label, href }: navItemProps) => (
  <li className="bg-blue-100 w-full py-2 text-3xl border-y border-white text-center">
    <Link href={href}>{label}</Link>
  </li>
);

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [innerWidth, setInnerWidth] = useState(0);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);

    const handleResize = () => {
      const width = window.innerWidth;
      setInnerWidth(width);

      if (width > 767) setMenu((prev) => (prev ? false : prev));
    };

    handleScroll();
    handleResize();

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [menu]);

  return (
    <header
      className={`flex justify-between items-center top-0 w-full h-16 z-100 shadow-2xl fixed px-10 duration-300 ${
        scrolled
          ? "bg-blue-100 text-black"
          : "bg-black/30 border-black border-b text-white"
      }`}
    >
      <div>
        <Link href="/" className="text-4xl">
          YouZen
        </Link>
      </div>
      <nav>
        {innerWidth > 767 ? (
          <ul className="flex gap-8">
            <NavLink label="Explorar" href="/explore" />
            <NavLink label="Perfil" href="/profile" />
            <NavLink label="Sobre" href="/about" />
          </ul>
        ) : (
          <button onClick={() => setMenu(!menu)} className="text-6xl">
            ≡
          </button>
        )}
      </nav>

      {innerWidth < 768 && menu && (
        <>
          <aside className="w-90 h-screen bg-blue-400 fixed right-0 top-0 border-l-2 border-blue-300 z-100">
            <button
              className="text-6xl cursor-pointer ml-6"
              onClick={() => setMenu(!menu)}
            >
              ×
            </button>
            <ul className="flex flex-col gap-6 mt-4 text-black">
              <NavMenu label="Explorar" href="/explore" />
              <NavMenu label="Perfil" href="/profile" />
              <NavMenu label="Sobre" href="/about" />
            </ul>
          </aside>
          <Overlay onClick={() => setMenu(!menu)} zIndex={90} />
        </>
      )}
    </header>
  );
}
