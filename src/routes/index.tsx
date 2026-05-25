import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import desk from "@/assets/detective-desk.jpg";
import fingerprint from "@/assets/fingerprint.png";
import { ThiefSilhouette } from "@/components/ThiefSilhouette";
import { Fog } from "@/components/Fog";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Noir/Case — Uncover Clues. Become the Detective." },
      {
        name: "description",
        content:
          "An immersive noir investigation experience: solve cases, decode ciphers, read classified stories. Sharpen your observation and deduction.",
      },
      { property: "og:title", content: "Noir/Case — The Detective's Headquarters" },
      { property: "og:description", content: "Uncover clues. Sharpen your mind. Become the detective." },
    ],
  }),
  component: Home,
});

const HIDDEN_CLUES = [
  { x: "12%", y: "30%", label: "BLOODSTAIN" },
  { x: "78%", y: "22%", label: "FINGERPRINT" },
  { x: "30%", y: "70%", label: "MATCHBOOK" },
  { x: "65%", y: "62%", label: "CIPHER NOTE" },
  { x: "50%", y: "40%", label: "WITNESS" },
];

function Home() {
  return (
    <div className="relative">
      <Hero />
      <About />
      <ClueBoard />
      <CTASection />
    </div>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const [m, setM] = useState({ x: -500, y: -500, inside: false });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      setM({ x: e.clientX - r.left, y: e.clientY - r.top, inside: true });
    };
    const leave = () => setM((s) => ({ ...s, inside: false }));
    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", leave);
    return () => {
      el.removeEventListener("mousemove", move);
      el.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-[92vh] items-center overflow-hidden"
    >
      {/* desk background */}
      <div className="absolute inset-0 -z-10">
        <img
          src={desk}
          alt="Detective's desk at night"
          width={1920}
          height={1280}
          className="h-full w-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-background" />
        <div className="absolute inset-0 smoke-bg" />
      </div>

      <Fog />
      <ThiefSilhouette />

      {/* hidden clues revealed by magnifier */}
      {HIDDEN_CLUES.map((c, i) => {
        const cx = (parseFloat(c.x) / 100) * (ref.current?.clientWidth ?? 0);
        const cy = (parseFloat(c.y) / 100) * (ref.current?.clientHeight ?? 0);
        const d = Math.hypot(m.x - cx, m.y - cy);
        const visible = m.inside && d < 90;
        return (
          <div
            key={i}
            className="pointer-events-none absolute z-[4] transition-all duration-300"
            style={{
              left: c.x,
              top: c.y,
              opacity: visible ? 1 : 0,
              transform: `translate(-50%, -50%) scale(${visible ? 1 : 0.6})`,
            }}
          >
            <div className="flex items-center gap-2 rounded-sm border border-primary/70 bg-background/90 px-2 py-1 shadow-[0_0_30px_oklch(0.55_0.25_25_/_0.6)] backdrop-blur">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
              <span className="font-mono text-[10px] tracking-widest text-primary">CLUE · {c.label}</span>
            </div>
          </div>
        );
      })}

      <div className="relative z-[5] mx-auto w-full max-w-6xl px-6">
        <div className="mb-6 flex items-center gap-3">
          <span className="h-px w-12 bg-primary" />
          <span className="font-mono text-xs tracking-[0.4em] text-primary">CASE FILE №&nbsp;0001</span>
          <span className="stamp-confidential text-xs">CONFIDENTIAL</span>
        </div>

        <h1 className="font-display text-5xl font-black leading-[0.95] tracking-tight text-foreground md:text-7xl lg:text-8xl">
          UNCOVER <span className="text-primary text-glow flicker">CLUES.</span>
          <br />
          SHARPEN YOUR <span className="text-primary text-glow">MIND.</span>
          <br />
          <span className="text-accent">BECOME</span> THE DETECTIVE.
        </h1>

        <p className="mt-8 max-w-xl text-type text-base leading-relaxed text-muted-foreground md:text-lg">
          Step inside the bureau's most classified room. Train your eye for detail,
          test your logic against locked rooms and encrypted notes, and uncover the
          stories no one else dares to file.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            to="/games"
            className="group relative overflow-hidden rounded-sm border border-primary bg-primary px-6 py-3 font-display text-sm tracking-[0.25em] text-primary-foreground shadow-[var(--shadow-glow)] transition-all hover:scale-[1.02]"
          >
            <span className="relative z-10">START INVESTIGATING</span>
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-accent/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </Link>
          <Link
            to="/games"
            className="rounded-sm border border-primary/60 bg-background/40 px-6 py-3 font-display text-sm tracking-[0.25em] text-foreground backdrop-blur transition-colors hover:border-primary hover:text-primary"
          >
            PLAY GAMES
          </Link>
          <Link
            to="/stories"
            className="rounded-sm border border-border bg-background/40 px-6 py-3 font-display text-sm tracking-[0.25em] text-foreground backdrop-blur transition-colors hover:border-accent hover:text-accent"
          >
            READ STORIES
          </Link>
        </div>

        <div className="mt-10 text-type text-xs text-muted-foreground">
          <span className="text-accent">› Hint:</span> move your magnifying glass across the desk.
        </div>
      </div>

      {/* faint fingerprint corner watermark */}
      <img
        src={fingerprint}
        alt=""
        className="pointer-events-none absolute -right-20 bottom-0 h-[500px] w-[500px] opacity-[0.07]"
        aria-hidden
      />
    </section>
  );
}

function About() {
  const items = [
    {
      n: "01",
      title: "OBSERVE",
      body: "Train your eye to catch what others miss — the slightest tear, the misplaced ash, the silence after a name.",
    },
    {
      n: "02",
      title: "DEDUCE",
      body: "Build a chain of inference from cold evidence. Connect motive, opportunity, and the cipher hidden in plain text.",
    },
    {
      n: "03",
      title: "RESOLVE",
      body: "Close the case. Stamp the file. Move to the next room before the trail goes cold.",
    },
  ];
  return (
    <section className="relative mx-auto max-w-6xl px-6 py-24">
      <div className="mb-12 flex items-end justify-between gap-6">
        <div>
          <div className="font-mono text-xs tracking-[0.4em] text-primary">› BRIEFING</div>
          <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">
            Three skills. <span className="text-primary">One detective.</span>
          </h2>
        </div>
        <div className="hidden text-type text-sm text-muted-foreground md:block">
          dossier ref. <span className="text-foreground">#NC-447-A</span>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {items.map((it) => (
          <article
            key={it.n}
            className="noir-card group relative overflow-hidden p-8 transition-all hover:-translate-y-1 hover:border-primary/60 hover:shadow-[var(--shadow-glow)]"
          >
            <div className="font-display text-6xl font-black text-primary/20 transition-colors group-hover:text-primary/50">
              {it.n}
            </div>
            <h3 className="mt-2 font-display text-xl tracking-[0.3em] text-foreground">{it.title}</h3>
            <p className="mt-4 text-type text-sm leading-relaxed text-muted-foreground">{it.body}</p>
            <img
              src={fingerprint}
              alt=""
              className="pointer-events-none absolute -bottom-6 -right-6 h-32 w-32 opacity-0 transition-opacity duration-500 group-hover:opacity-20"
            />
          </article>
        ))}
      </div>
    </section>
  );
}

function ClueBoard() {
  return (
    <section className="relative mx-auto max-w-6xl px-6 py-24">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <div>
          <div className="font-mono text-xs tracking-[0.4em] text-primary">› THE BOARD</div>
          <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">
            Every thread <span className="text-primary text-glow">leads somewhere.</span>
          </h2>
          <p className="mt-6 text-type text-base leading-relaxed text-muted-foreground">
            Pin the photos. Stretch the red string. The pattern only reveals itself
            once you stop looking at the pieces and start watching the gaps between them.
          </p>
          <ul className="mt-6 space-y-3 text-type text-sm">
            <li className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
              <span><span className="text-accent">Pattern recognition</span> across crime scene puzzles</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
              <span><span className="text-accent">Lateral thinking</span> via ciphers, hidden objects, and dead drops</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
              <span><span className="text-accent">Narrative empathy</span> through classified case reports</span>
            </li>
          </ul>
        </div>
        <div className="relative">
          <div className="absolute -inset-4 rounded bg-gradient-to-br from-primary/20 to-transparent blur-2xl" />
          <div className="relative overflow-hidden rounded border border-border shadow-[var(--shadow-noir)]">
            <img
              src={new URL("../assets/investigation-board.jpg", import.meta.url).href}
              alt="Investigation board with red strings"
              width={1600}
              height={1000}
              loading="lazy"
              className="h-full w-full object-cover"
            />
            <div className="absolute right-4 top-4 stamp-confidential text-xs">CONFIDENTIAL</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="relative mx-auto max-w-6xl px-6 py-24">
      <div className="noir-card relative overflow-hidden p-12 text-center">
        <div className="absolute inset-0 smoke-bg opacity-60" />
        <div className="relative">
          <div className="stamp-confidential mx-auto">CLEARANCE GRANTED</div>
          <h2 className="mt-6 font-display text-4xl font-bold md:text-6xl">
            The case is <span className="text-primary text-glow">open.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-type text-muted-foreground">
            Will you crack it before sunrise?
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/games"
              className="rounded-sm border border-primary bg-primary px-6 py-3 font-display text-sm tracking-[0.25em] text-primary-foreground shadow-[var(--shadow-glow)] hover:scale-[1.02]"
            >
              ENTER THE CASE ROOM
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
