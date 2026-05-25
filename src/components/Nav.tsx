import { Link } from "@tanstack/react-router";

export function Nav() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 backdrop-blur-md">
      <div className="border-b border-border/40 bg-background/60">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/" className="group flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-primary/60 text-primary pulse-red">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="10" cy="10" r="7" />
                <path d="M21 21l-6-6" strokeLinecap="round" />
              </svg>
            </span>
            <span className="font-display text-lg font-bold tracking-[0.25em] text-foreground">
              NOIR<span className="text-primary">/</span>CASE
            </span>
          </Link>
          <div className="flex items-center gap-1 text-sm md:gap-2">
            {[
              { to: "/", label: "HQ" },
              { to: "/games", label: "Cases" },
              { to: "/stories", label: "Files" },
            ].map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={{ exact: true }}
                activeProps={{ className: "text-primary text-glow" }}
                className="rounded-sm px-3 py-2 font-display text-xs font-bold tracking-[0.25em] text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
