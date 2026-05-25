import { useEffect, useState } from "react";

export function MagnifierCursor() {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [down, setDown] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    const d = () => setDown(true);
    const u = () => setDown(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", d);
    window.addEventListener("mouseup", u);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", d);
      window.removeEventListener("mouseup", u);
    };
  }, []);

  return (
    <>
      <div
        className="pointer-events-none fixed z-[9999] hidden md:block"
        style={{
          left: pos.x,
          top: pos.y,
          transform: `translate(-50%, -50%) scale(${down ? 0.9 : 1})`,
          transition: "transform 120ms ease",
        }}
      >
        <svg width="80" height="80" viewBox="0 0 80 80">
          <defs>
            <radialGradient id="lens" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="oklch(0.95 0.05 60 / 0.15)" />
              <stop offset="70%" stopColor="oklch(0.55 0.25 25 / 0.1)" />
              <stop offset="100%" stopColor="oklch(0.55 0.25 25 / 0)" />
            </radialGradient>
          </defs>
          <circle cx="32" cy="32" r="26" fill="url(#lens)" stroke="oklch(0.6 0.22 30)" strokeWidth="2.5" />
          <circle cx="32" cy="32" r="26" fill="none" stroke="oklch(0.3 0.05 25)" strokeWidth="1" opacity="0.6" />
          <line x1="52" y1="52" x2="72" y2="72" stroke="oklch(0.4 0.08 25)" strokeWidth="6" strokeLinecap="round" />
          <line x1="52" y1="52" x2="72" y2="72" stroke="oklch(0.65 0.18 40)" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
      <div
        className="pointer-events-none fixed z-[9998] h-2 w-2 rounded-full bg-primary md:hidden"
        style={{ left: pos.x - 4, top: pos.y - 4 }}
      />
    </>
  );
}
