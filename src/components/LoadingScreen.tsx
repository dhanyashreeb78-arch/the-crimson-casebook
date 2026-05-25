import { useEffect, useState } from "react";
import fingerprint from "@/assets/fingerprint.png";

export function LoadingScreen() {
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let p = 0;
    const id = setInterval(() => {
      p += Math.random() * 18;
      setProgress(Math.min(100, p));
      if (p >= 100) {
        clearInterval(id);
        setTimeout(() => setDone(true), 500);
      }
    }, 120);
    return () => clearInterval(id);
  }, []);

  if (done) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-background scanline transition-opacity duration-500">
      <div className="relative h-56 w-56">
        <img src={fingerprint} alt="" className="h-full w-full object-contain opacity-60" />
        <div
          className="absolute inset-x-0 h-[2px] bg-primary shadow-[0_0_20px_oklch(0.55_0.25_25)]"
          style={{ top: `${progress}%`, transition: "top 0.2s linear" }}
        />
        <div className="absolute inset-0 rounded-full border-2 border-primary/30 pulse-red" />
      </div>
      <div className="mt-8 font-display text-xs tracking-[0.4em] text-muted-foreground">
        SCANNING IDENTITY
      </div>
      <div className="mt-3 font-mono text-2xl font-bold text-primary text-glow">
        {Math.round(progress)}%
      </div>
      <div className="mt-1 text-type text-xs text-muted-foreground">
        clearance level: <span className="text-accent">CLASSIFIED</span>
      </div>
    </div>
  );
}
