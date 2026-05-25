export function Fog() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="animate-fog absolute rounded-full blur-3xl"
          style={{
            width: `${300 + i * 80}px`,
            height: `${200 + i * 40}px`,
            left: `${i * 22}%`,
            top: `${(i % 2) * 60 + 10}%`,
            background:
              i % 2 === 0
                ? "radial-gradient(circle, oklch(0.55 0.25 25 / 0.18), transparent 70%)"
                : "radial-gradient(circle, oklch(0.4 0.05 25 / 0.25), transparent 70%)",
            animationDelay: `${i * 1.4}s`,
          }}
        />
      ))}
    </div>
  );
}
