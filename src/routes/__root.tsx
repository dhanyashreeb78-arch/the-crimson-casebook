import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { MagnifierCursor } from "@/components/MagnifierCursor";
import { LoadingScreen } from "@/components/LoadingScreen";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <div className="stamp-confidential mx-auto">CASE LOST</div>
        <h1 className="mt-6 font-display text-7xl font-black text-primary text-glow">404</h1>
        <h2 className="mt-4 font-display tracking-[0.3em] text-foreground">FILE NOT FOUND</h2>
        <p className="mt-2 text-type text-sm text-muted-foreground">
          This evidence has gone missing from the archive.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center justify-center rounded-sm border border-primary bg-primary/10 px-5 py-2 font-display text-xs tracking-[0.3em] text-primary transition-all hover:bg-primary hover:text-primary-foreground"
        >
          RETURN TO HQ
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <div className="stamp-confidential mx-auto">EVIDENCE TAMPERED</div>
        <h1 className="mt-6 font-display text-2xl text-foreground">The investigation hit a snag.</h1>
        <p className="mt-2 text-type text-sm text-muted-foreground">
          Reload the scene and try again, detective.
        </p>
        <button
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className="mt-6 rounded-sm border border-primary bg-primary/10 px-5 py-2 font-display text-xs tracking-[0.3em] text-primary hover:bg-primary hover:text-primary-foreground"
        >
          RE-OPEN CASE
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Noir/Case — The Detective's Headquarters" },
      {
        name: "description",
        content:
          "Step into a noir investigation room. Solve cases, decode ciphers, and sharpen observation through interactive detective games and mystery stories.",
      },
      { name: "author", content: "Noir/Case" },
      { property: "og:title", content: "Noir/Case — The Detective's Headquarters" },
      { property: "og:description", content: "Uncover clues. Sharpen your mind. Become the detective." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <LoadingScreen />
      <MagnifierCursor />
      <Nav />
      <main className="relative z-10 pt-20">
        <Outlet />
      </main>
      <Footer />
    </QueryClientProvider>
  );
}
