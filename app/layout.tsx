"use client";

import { useState, useEffect, JSX } from "react";
import "./globals.css";
import Navbar from "@/components/Navbar";
import CustomCursor, { Direction } from "@/components/CustomCursor";
import HeroSlider from "@/components/HeroSlider";
import ScrollIndicator from "@/components/ScrollIndicator";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const [isHover, setIsHover] = useState(false);
  const [sliderAction, setSliderAction] = useState<Direction>("normal");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isInHero, setIsInHero] = useState(true);

  // ✅ ใช้ตำแหน่ง scroll จริงเป็นตัวตัดสินสถานะเท่านั้น
  useEffect(() => {
    const onScroll = () => {
      const hero = document.getElementById("hero");
      if (!hero) return;

      const heroBottom = hero.offsetTop + hero.offsetHeight;

      if (window.scrollY < heroBottom - 10) {
        setIsInHero(true);
      } else {
        setIsInHero(false);
      }
    };

    window.addEventListener("scroll", onScroll);
    onScroll(); // ✅ sync ครั้งแรกตอนโหลด

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ✅ คลิกลูกศรจาก Cursor
  const handleCursorAction = (dir: Direction) => {
    if (!isInHero) return;

    if (dir === "down") {
      const next = document.getElementById("next-section");
      next?.scrollIntoView({ behavior: "smooth" });
    } else {
      setSliderAction(dir);

      // ✅ สำคัญมาก: RESET ค่า action ทันที
      requestAnimationFrame(() => {
        setSliderAction("normal");
      });
    }
  };


  // ✅ คลิกวงกลม ↑ ↓
  const handleIndicatorClick = () => {
    if (isInHero) {
      document
        .getElementById("next-section")
        ?.scrollIntoView({ behavior: "smooth" });
    } else {
      document
        .getElementById("hero")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <html lang="en">
      <body
        className={`overflow-x-hidden ${isInHero ? "cursor-none" : "cursor-auto"
          }`}
      >
        <CustomCursor
          enabled={isInHero}
          onDirectionClick={handleCursorAction}
          onMove={(x, y) => setMousePos({ x, y })}
        />

        <ScrollIndicator
          direction={isInHero ? "down" : "up"}
          onClick={handleIndicatorClick}
        />

        <Navbar isHover={isHover} setIsHover={setIsHover} />

        <HeroSlider
          action={sliderAction}
          mouseX={mousePos.x}
          mouseY={mousePos.y}
          isInHero={isInHero} 
        />

        {children}
      </body>
    </html>
  );
}
