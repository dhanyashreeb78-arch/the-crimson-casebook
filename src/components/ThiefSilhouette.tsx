export function ThiefSilhouette({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute bottom-8 left-0 z-[3] animate-sneak ${className}`}
      aria-hidden
    >
      <svg width="120" height="160" viewBox="0 0 120 160" className="opacity-80 drop-shadow-[0_0_30px_oklch(0.5_0.25_25_/_0.5)]">
        {/* hat */}
        <ellipse cx="60" cy="28" rx="34" ry="6" fill="#0a0a0a" />
        <path d="M40 28 Q40 10 60 8 Q80 10 80 28 Z" fill="#0a0a0a" />
        <rect x="40" y="26" width="40" height="4" fill="oklch(0.3 0.1 25)" />
        {/* head */}
        <circle cx="60" cy="40" r="10" fill="#0a0a0a" />
        {/* body / trench coat */}
        <path d="M40 50 Q35 75 38 110 L50 155 L70 155 L82 110 Q85 75 80 50 Q70 46 60 46 Q50 46 40 50 Z" fill="#0a0a0a" />
        {/* collar */}
        <path d="M48 50 L60 62 L72 50 Z" fill="oklch(0.18 0.02 25)" />
        {/* arm holding bag */}
        <path d="M82 70 Q95 78 100 95 L92 100 Q86 88 78 78 Z" fill="#0a0a0a" />
        {/* loot sack */}
        <ellipse cx="100" cy="105" rx="12" ry="14" fill="#0a0a0a" stroke="oklch(0.35 0.05 25)" strokeWidth="1.5" />
        <text x="100" y="110" textAnchor="middle" fontSize="14" fill="oklch(0.55 0.25 25)" fontWeight="900">$</text>
        {/* leg stride */}
        <path d="M50 150 L48 158 L55 158 L58 150 Z" fill="#0a0a0a" />
        <path d="M70 150 L72 158 L65 158 L62 150 Z" fill="#0a0a0a" />
      </svg>
    </div>
  );
}
