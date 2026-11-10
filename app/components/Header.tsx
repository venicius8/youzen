"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import DesktopNav from "./Header/DesktopNav";
import MobileSidebar from "./Header/MobileSidebar";
import { useWindowWidth } from "./useWindowWidth";

export default function Header() {
  // Tracks whether the page has been scrolled past 40px to change header style.
  const [scrolled, setScrolled] = useState(false);
  // Controls visibility of the mobile sidebar menu.
  const [menu, setMenu] = useState(false);
  // Current viewport width to handle responsive state changes.
  const width = useWindowWidth();

  // Close mobile menu automatically when switching to desktop view.
  useEffect(() => {
    if (width > 767) setMenu(false);
  }, [width]);

  // Update scroll state on window scroll event.
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Fixed header: transparent on top, solid blue when scrolled */}
      <header
        className={`flex justify-between items-center top-0 w-full h-16 z-100 shadow-2xl fixed px-10 duration-300 ${
          scrolled
            ? "bg-blue-100 text-black"
            : "bg-black/30 border-black border-b text-white"
        }`}
      >
        {/* Brand logo/link */}
        <div>
          <Link href="/" className="text-4xl">
            YouZen
          </Link>
        </div>
        {/* Navigation area */}
        <nav>
          {/* Desktop navigation links */}
          <DesktopNav />

          {/* Hamburger button: visible only on mobile */}
          <button
            onClick={() => setMenu(!menu)}
            className="text-6xl cursor-pointer hover:scale-110 duration-300 block md:hidden"
          >
            ≡
          </button>
        </nav>
      </header>

      {/* Mobile sidebar overlay, toggled by the hamburger button */}
      <MobileSidebar event={() => setMenu(!menu)} state={menu}></MobileSidebar>
    </>
  );
}
