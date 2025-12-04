"use client";

import { JSX } from "react";

type ScrollIndicatorProps = {
    direction: "down" | "up" | null;
    onClick: () => void;
};

export default function ScrollIndicator({
    direction,
    onClick,
}: ScrollIndicatorProps): JSX.Element | null {
    if (!direction) return null;

    return (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[9999]">
            <button
                onClick={onClick}
                className="
          w-14 h-14 rounded-full border border-white/60
          flex items-center justify-center
          animate-bounce
          bg-black/30 backdrop-blur-md
          text-white text-2xl
        "
            >
                {direction === "down" ? "↓" : "↑"}
            </button>
        </div>
    );
}
