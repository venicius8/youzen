"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import DesktopNav from "./Header/DesktopNav";
import MobileSidebar from "./Header/MobileSidebar";
import { useWindowWidth } from "./Header/useWindowWidth";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const width = useWindowWidth();

  useEffect(() => {
    if (width > 767) setMenu(false);
  }, [width]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
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
          {width > 767 ? (
            <DesktopNav />
          ) : (
            <button
              onClick={() => setMenu(!menu)}
              className="text-6xl cursor-pointer hover:scale-110 duration-300"
            >
              ≡
            </button>
          )}
        </nav>
      </header>
      {width < 768 && menu && (
        <MobileSidebar event={() => setMenu(!menu)}></MobileSidebar>
      )}
    </>
  );
}
