import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Fog } from "@/components/Fog";
import fingerprint from "@/assets/fingerprint.png";

export const Route = createFileRoute("/stories")({
  head: () => ({
    meta: [
      { title: "Classified Files — Detective Mystery Stories" },
      {
        name: "description",
        content:
          "Read suspenseful detective mysteries presented as classified case reports, with case-solved badges and clue highlights.",
      },
      { property: "og:title", content: "Classified Files — Detective Stories" },
      { property: "og:description", content: "Mystery dossiers from the bureau's archives." },
    ],
  }),
  component: StoriesPage,
});

const STORIES = [
  {
    id: "S-001",
    title: "The Woman in the Amber Coat",
    location: "BRIGHTON, 11:42 PM",
    solved: true,
    excerpt:
      "Rain. Always rain on the cases that matter. The witness swore she boarded the last tram, but the conductor's punch card said otherwise. There were three things wrong with her story, and I noticed them in the order she expected me to.",
    clues: ["punch card", "left-handed lipstick", "unworn umbrella"],
  },
  {
    id: "S-002",
    title: "Twelve Bells for Mr. Halloran",
    location: "OLD HARBOR DISTRICT, 02:13 AM",
    solved: true,
    excerpt:
      "The clock had stopped at twelve. Mr. Halloran had not. The brandy in his glass was warm, the cigarette still smoking — whoever killed him had wanted me here at exactly this minute. I obliged. I always do.",
    clues: ["warm brandy", "fresh smoke", "stopped clock"],
  },
  {
    id: "S-003",
    title: "Postcards From a Dead Man",
    location: "UNKNOWN, ONGOING",
    solved: false,
    excerpt:
      "He'd been dead six months. The postcards arrived weekly, always from a different city, always in his handwriting. The fourteenth one named me by my mother's maiden name. I poured a drink and started reading from the beginning.",
    clues: ["maiden name", "regional postmarks", "ink dated forward"],
  },
];

function StoriesPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <Fog />
      <section className="relative mx-auto max-w-5xl px-6 py-16">
        <div className="mb-12">
          <div className="font-mono text-xs tracking-[0.4em] text-primary">› DOSSIERS</div>
          <h1 className="mt-3 font-display text-5xl font-bold md:text-7xl">
            CLASSIFIED <span className="text-primary text-glow">FILES</span>
          </h1>
          <p className="mt-4 max-w-2xl text-type text-muted-foreground">
            Stories pulled from the bottom drawer. Some are closed. Some never will be.
          </p>
        </div>

        <div className="space-y-10">
          {STORIES.map((s, i) => (
            <StoryReport key={s.id} s={s} flip={i % 2 === 1} />
          ))}
        </div>
      </section>
    </div>
  );
}

function StoryReport({
  s,
  flip,
}: {
  s: (typeof STORIES)[number];
  flip: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [typed, setTyped] = useState("");

  useEffect(() => {
    if (!open) {
      setTyped("");
      return;
    }
    let i = 0;
    const id = setInterval(() => {
      i += 2;
      setTyped(s.excerpt.slice(0, i));
      if (i >= s.excerpt.length) clearInterval(id);
    }, 18);
    return () => clearInterval(id);
  }, [open, s.excerpt]);

  return (
    <article
      className="noir-card group relative overflow-hidden p-0 transition-all hover:border-primary/60"
      style={{ transform: `rotate(${flip ? 0.4 : -0.4}deg)` }}
    >
      {/* header bar */}
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-background/60 px-6 py-3">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] tracking-widest text-primary">DOSSIER {s.id}</span>
          <span className="hidden text-type text-xs text-muted-foreground md:inline">·</span>
          <span className="text-type text-xs text-muted-foreground">{s.location}</span>
        </div>
        {s.solved ? (
          <span className="rounded-sm border border-accent/60 bg-accent/10 px-3 py-1 font-display text-[10px] tracking-[0.3em] text-accent">
            ✓ CASE SOLVED
          </span>
        ) : (
          <span className="flicker rounded-sm border border-primary/60 bg-primary/10 px-3 py-1 font-display text-[10px] tracking-[0.3em] text-primary">
            ◉ OPEN INVESTIGATION
          </span>
        )}
      </header>

      <div className="grid gap-0 md:grid-cols-[1fr_240px]">
        <div className="relative p-6 md:p-10">
          <h2 className="font-display text-3xl font-bold leading-tight text-foreground md:text-4xl">
            {s.title}
          </h2>

          <div className="mt-6 min-h-[120px] border-l-2 border-primary/40 pl-5">
            <p className="text-type text-base leading-relaxed text-foreground/90">
              {open ? typed : s.excerpt.slice(0, 90) + "…"}
              {open && typed.length < s.excerpt.length && (
                <span className="ml-0.5 inline-block h-4 w-[2px] animate-pulse bg-primary align-middle" />
              )}
            </p>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="text-type text-xs text-muted-foreground">key clues:</span>
            {s.clues.map((c) => (
              <span
                key={c}
                className="rounded-sm border border-accent/40 bg-accent/5 px-2 py-1 font-mono text-[10px] tracking-wider text-accent"
              >
                ◆ {c}
              </span>
            ))}
          </div>

          <button
            onClick={() => setOpen((o) => !o)}
            className="mt-6 rounded-sm border border-primary bg-primary/10 px-5 py-2 font-display text-xs tracking-[0.3em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            {open ? "SEAL FILE" : "OPEN DOSSIER"}
          </button>
        </div>

        {/* side panel — looks like a tag */}
        <aside className="relative hidden border-l border-border bg-background/40 p-6 md:block">
          <img
            src={fingerprint}
            alt=""
            className="mx-auto h-32 w-32 opacity-30"
          />
          <div className="mt-4 text-center font-mono text-[10px] tracking-widest text-muted-foreground">
            PRINT MATCH
          </div>
          <div className="mt-1 text-center font-mono text-xs text-accent">
            {Math.floor(60 + Math.random() * 39)}%
          </div>
          <div className="mt-6 stamp-confidential mx-auto block w-fit text-[10px]">
            EVIDENCE
          </div>
        </aside>
      </div>
    </article>
  );
}
