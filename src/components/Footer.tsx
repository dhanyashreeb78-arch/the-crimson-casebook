export function Footer() {
  return (
    <footer className="relative z-10 mt-32 border-t border-border/40 bg-background/80 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 md:flex-row">
        <div className="font-display text-xs tracking-[0.3em] text-muted-foreground">
          NOIR/CASE — DEPT. OF UNSOLVED MATTERS
        </div>
        <div className="text-type text-xs text-muted-foreground">
          all files property of the bureau · est. 1947
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
          <span className="font-mono text-primary">LIVE INVESTIGATION</span>
        </div>
      </div>
    </footer>
  );
}
