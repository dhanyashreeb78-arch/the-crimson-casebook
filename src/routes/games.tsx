import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import fingerprint from "@/assets/fingerprint.png";
import { Fog } from "@/components/Fog";

export const Route = createFileRoute("/games")({
  head: () => ({
    meta: [
      { title: "Case Files — Noir/Case Detective Games" },
      {
        name: "description",
        content:
          "Solve detective mini-games: spot the clue, decode ciphers, crime-scene puzzles, and hidden-object investigations.",
      },
      { property: "og:title", content: "Case Files — Detective Mini-Games" },
      { property: "og:description", content: "Spot the clue. Decode the cipher. Solve the scene." },
    ],
  }),
  component: GamesPage,
});

const CASES = [
  {
    id: "C-101",
    title: "The Vanishing at Pier 7",
    type: "SPOT THE CLUE",
    difficulty: "ROOKIE",
    desc: "A dock worker disappears between two security cameras. Five objects in the warehouse don't belong. Find them all.",
    color: "primary",
  },
  {
    id: "C-208",
    title: "The Crimson Cipher",
    type: "DECODE",
    difficulty: "DETECTIVE",
    desc: "A note pinned to the victim reads in glyphs only. Break the substitution cipher to reveal the rendezvous time.",
    color: "accent",
  },
  {
    id: "C-314",
    title: "Room 12, Hotel Mortimer",
    type: "CRIME SCENE",
    difficulty: "INSPECTOR",
    desc: "Three suspects. One murder weapon. Reconstruct the timeline from a shattered mirror and a stopped clock.",
    color: "primary",
  },
  {
    id: "C-419",
    title: "The Antique Collector",
    type: "HIDDEN OBJECT",
    difficulty: "ROOKIE",
    desc: "A counterfeit ring operates out of an art dealer's parlor. Find seven forgeries amongst the genuine pieces.",
    color: "accent",
  },
  {
    id: "C-522",
    title: "Echoes on Maple Street",
    type: "DEDUCTION",
    difficulty: "DETECTIVE",
    desc: "Four witnesses give four different stories. Only one is telling the whole truth. Cross-reference and accuse.",
    color: "primary",
  },
  {
    id: "C-666",
    title: "The Silent Bell",
    type: "MIXED",
    difficulty: "CHIEF",
    desc: "A locked-room mystery in a soundproof booth. No prints. No witnesses. Just one ticket stub and a missing pen.",
    color: "accent",
  },
];

function GamesPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <Fog />
      <section className="relative mx-auto max-w-7xl px-6 py-16">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="font-mono text-xs tracking-[0.4em] text-primary">› ARCHIVE</div>
            <h1 className="mt-3 font-display text-5xl font-bold md:text-7xl">
              OPEN <span className="text-primary text-glow">CASES</span>
            </h1>
            <p className="mt-4 max-w-xl text-type text-muted-foreground">
              Pick a folder. Read the brief. Don't leave until the file is closed.
            </p>
          </div>
          <div className="hidden flex-col items-end gap-1 text-type text-xs text-muted-foreground md:flex">
            <span>active investigations: <span className="text-primary font-mono">{CASES.length}</span></span>
            <span>last update: <span className="text-foreground">tonight, 02:47</span></span>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {CASES.map((c, i) => (
            <CaseFolder key={c.id} c={c} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
}

function CaseFolder({
  c,
  index,
}: {
  c: (typeof CASES)[number];
  index: number;
}) {
  const [open, setOpen] = useState(false);
  const accent = c.color === "accent" ? "text-accent" : "text-primary";
  const border = c.color === "accent" ? "border-accent/60" : "border-primary/60";

  return (
    <article
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className={`group relative cursor-pointer overflow-hidden rounded-sm border ${border} bg-card/60 backdrop-blur transition-all duration-500 hover:-translate-y-2 ${
        c.color === "accent"
          ? "hover:shadow-[0_0_40px_oklch(0.65_0.18_45_/_0.4)]"
          : "hover:shadow-[var(--shadow-glow)]"
      }`}
      style={{ transform: `rotate(${(index % 2 === 0 ? -0.6 : 0.6)}deg)` }}
    >
      {/* tab */}
      <div className="absolute -top-3 left-6 z-10 rounded-t-sm bg-card px-3 py-1 font-mono text-[10px] tracking-widest text-muted-foreground">
        FILE {c.id}
      </div>

      {/* paper texture */}
      <div className="evidence-paper relative m-2 mt-4 min-h-[260px] overflow-hidden p-5">
        <div className="flex items-start justify-between">
          <span className={`font-mono text-[10px] tracking-widest ${c.color === "accent" ? "text-accent" : "text-primary"} brightness-75`}>
            ▣ {c.type}
          </span>
          <span className="text-stamp text-[10px] text-ink/60">{c.difficulty}</span>
        </div>
        <h3 className="mt-3 font-display text-xl font-bold leading-tight text-ink">
          {c.title}
        </h3>
        <p className="mt-3 text-type text-sm leading-relaxed text-ink/80">{c.desc}</p>

        <div className="mt-5 flex items-center justify-between border-t border-ink/20 pt-3">
          <span className="text-type text-xs text-ink/60">est. time · 8–15 min</span>
          <span className={`font-display text-xs tracking-[0.25em] ${accent} brightness-75`}>
            OPEN →
          </span>
        </div>

        {/* fingerprint reveal */}
        <img
          src={fingerprint}
          alt=""
          className="pointer-events-none absolute right-2 top-2 h-20 w-20 mix-blend-multiply transition-all duration-500"
          style={{
            opacity: open ? 0.6 : 0,
            transform: `rotate(${open ? 12 : 0}deg) scale(${open ? 1 : 0.6})`,
          }}
        />

        {/* CONFIDENTIAL stamp on hover */}
        <div
          className="absolute bottom-4 right-4 transition-all duration-500"
          style={{ opacity: open ? 1 : 0, transform: `rotate(${open ? -8 : -20}deg) scale(${open ? 1 : 0.7})` }}
        >
          <span className="stamp-confidential text-[10px]">CONFIDENTIAL</span>
        </div>
      </div>

      {/* glowing scan line on hover */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-x-0 h-[2px] transition-all duration-700 ${
          c.color === "accent" ? "bg-accent" : "bg-primary"
        }`}
        style={{ top: open ? "100%" : "0%", boxShadow: "0 0 20px currentColor", opacity: open ? 1 : 0 }}
      />
    </article>
  );
}
