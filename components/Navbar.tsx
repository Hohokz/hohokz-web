"use client";

import { JSX } from "react";

type NavbarProps = {
  isHover: boolean;
  setIsHover: (v: boolean) => void;
};

export default function Navbar({
  isHover,
  setIsHover,
}: NavbarProps): JSX.Element {
  return (
    <nav
      className="fixed top-0 right-0 z-50 w-full px-10 py-6 flex justify-end"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {/* ✅ แถบขาวโปร่งใส */}
      <div
        className={`
          absolute top-0 right-0 h-full w-full
          bg-white/50 backdrop-blur-md
          transition-all duration-500 ease-out
          ${isHover ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}
        `}
      />

      {/* ✅ เมนู */}
      <ul
        className={`
          relative z-10 flex gap-8 text-sm tracking-widest uppercase transition
          ${isHover ? "text-black" : "text-white"}
        `}
      >
        <li className="hover:opacity-70 cursor-pointer transition">Home</li>
        {/* <li className="hover:opacity-70 cursor-pointer transition">Portfolio</li>
        <li className="hover:opacity-70 cursor-pointer transition">About</li>
        <li className="hover:opacity-70 cursor-pointer transition">Contact</li> */}
      </ul>
    </nav>
  );
}
