"use client";

import { JSX, useEffect, useState } from "react";

export type Direction = "left" | "right" | "down" | "normal";

export type CursorProps = {
  /**
   * เปิด / ปิด Cursor ทั้งระบบ
   */
  enabled: boolean;
  /**
   * Callback เมื่อคลิกที่ทิศทางต่างๆ
   */
  onDirectionClick?: (dir: Direction) => void;
  /**
   * Callback เมื่อเมาส์ขยับ ส่งค่า x, y กลับมา
   */
  onMove?: (x: number, y: number) => void;
};

export default function CustomCursor({
  enabled,
  onDirectionClick,
  onMove,
}: CursorProps): JSX.Element | null {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [direction, setDirection] = useState<Direction>("normal");

  useEffect(() => {
    if (!enabled) return;

    const move = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;

      const w = window.innerWidth;
      const h = window.innerHeight;

      setPos({ x, y });
      onMove?.(x, y);

      if (y < 100) {
        setDirection("normal");
        return;
      }

      if (x < w * 0.25) setDirection("left");
      else if (x > w * 0.75) setDirection("right");
      else if (y > h * 0.75) setDirection("down");
      else setDirection("normal");
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [enabled, onMove]);

  if (!enabled || direction === "normal") return null;

  return (
    <div
      onClick={() => onDirectionClick?.(direction)}
      className="
        fixed top-0 left-0 z-[9999]
        pointer-events-auto cursor-pointer
        text-white text-4xl select-none
        mix-blend-difference
      "
      style={{
        transform: `translate(${pos.x}px, ${pos.y}px)`,
      }}
    >
      {direction === "left" && "←"}
      {direction === "right" && "→"}
      {direction === "down" && "↓"}
    </div>
  );
}
