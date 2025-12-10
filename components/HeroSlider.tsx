"use client";

import Image from "next/image";
import { JSX, useEffect, useRef, useState } from "react";
import { Direction } from "@/components/CustomCursor";

const images = [
  "/main/hero1.jpg",
  "/main/hero2.jpg",
  "/main/hero3.jpg",
  "/main/hero4.jpg",
];

type HeroSliderProps = {
  action: Direction;
  mouseX: number;
  mouseY: number;
  isInHero: boolean;
};

export default function HeroSlider({
  action,
  mouseX,
  mouseY,
  isInHero,
}: HeroSliderProps): JSX.Element {
  const hasMounted = useRef(false);
  const isAnimating = useRef(false);

  const [index, setIndex] = useState(0);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const [showTitle, setShowTitle] = useState(true);
  const [canShowTitle, setCanShowTitle] = useState(true);

  // ✅ Mobile Pan
  const panStart = useRef({ x: 0, y: 0 });
  const [pan, setPan] = useState({ x: 0, y: 0 });

  // ✅ แยก Tap vs Drag
  const isDragging = useRef(false);
  const tapStart = useRef({ x: 0, y: 0 });

  useEffect(() => {
    hasMounted.current = true;
  }, []);

  // ✅ เปลี่ยนรูปแบบปลอดภัย
  const triggerChange = (nextIndex: number) => {
    if (isAnimating.current) return;

    isAnimating.current = true;
    setShowTitle(false);
    setCanShowTitle(false);

    setTimeout(() => {
      setIndex(nextIndex);
    }, 200);

    setTimeout(() => {
      isAnimating.current = false;
    }, 800);

    setPan({ x: 0, y: 0 }); // ✅ reset pan เมื่อเปลี่ยนรูป
  };

  // ✅ Desktop Cursor Control
  useEffect(() => {
    if (action === "right") {
      const next = (index + 1) % images.length;
      triggerChange(next);
    }

    if (action === "left") {
      const prev = (index - 1 + images.length) % images.length;
      triggerChange(prev);
    }
  }, [action, index]);

  // ✅ Desktop Parallax
  useEffect(() => {
    const w = window.innerWidth;
    const h = window.innerHeight;

    const maxMoveX = w < 768 ? 0 : 40;
    const maxMoveY = w < 768 ? 0 : 30;

    const x = (mouseX / w - 0.5) * maxMoveX;
    const y = (mouseY / h - 0.5) * maxMoveY;

    setOffset({ x, y });
  }, [mouseX, mouseY]);

  // ✅ Touch Start
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];

    panStart.current = {
      x: touch.clientX - pan.x,
      y: touch.clientY - pan.y,
    };

    tapStart.current = {
      x: touch.clientX,
      y: touch.clientY,
    };

    isDragging.current = false;
  };

  // ✅ Touch Move (แพนรูป)
  const handleTouchMove = (e: React.TouchEvent) => {
    const dx = e.touches[0].clientX - tapStart.current.x;
    const dy = e.touches[0].clientY - tapStart.current.y;

    if (Math.abs(dx) > 8 || Math.abs(dy) > 8) {
      isDragging.current = true;
    }

    const x = e.touches[0].clientX - panStart.current.x;
    const y = e.touches[0].clientY - panStart.current.y;

    const limitX = 220;
    const limitY = 180;

    setPan({
      x: Math.max(-limitX, Math.min(limitX, x)),
      y: Math.max(-limitY, Math.min(limitY, y)),
    });
  };

  // ✅ Touch End (Tap = เปลี่ยนรูป, Drag = แค่ค้าง)
  const handleTouchEnd = () => {
    if (!isDragging.current) {
      const next = (index + 1) % images.length;
      triggerChange(next);
    }

    isDragging.current = false;
  };

  // ✅ Title Logic
  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      setShowTitle(true);
      return;
    }

    if (!isInHero) {
      setCanShowTitle(true);
      setShowTitle(false);
    } else {
      if (canShowTitle) {
        setShowTitle(true);
      }
    }
  }, [isInHero]);

  return (
    <section
      id="hero"
      className="relative min-h-screen w-screen overflow-hidden touch-pan-y bg-black"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* ✅ รูปที่แสดง */}
      {images.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt="Hero"
          fill
          priority={i === 0}
          className={`
            absolute object-cover
            transition-transform duration-200 ease-out
            ${i === index ? "opacity-100 z-0" : "opacity-0 -z-10"}
          `}
          style={
            i === index
              ? {
                  transform: `translate(${pan.x + offset.x}px, ${
                    pan.y + offset.y
                  }px) scale(1.3)`,
                }
              : {}
          }
        />
      ))}

      {/* ✅ Overlay */}
      <div className="absolute inset-0 bg-black/30 md:bg-black/40 z-10" />

      {/* ✅ Title */}
      <div
        className={`
          absolute inset-0 z-20
          flex items-center justify-center
          transition-all duration-500 ease-out
          ${showTitle ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
        `}
      >
        <h1
          className="
            text-white
            font-extrabold
            uppercase
            text-[52px] sm:text-[72px] md:text-[120px] lg:text-[160px] xl:text-[200px]
            tracking-[0.15em] sm:tracking-[0.18em] lg:tracking-[0.22em]
            leading-none
            select-none
            pointer-events-none
          "
        >
          HOHOKZ
        </h1>
      </div>
    </section>
  );
}
