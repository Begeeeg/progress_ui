import Link from "next/link";
import { ArrowLeft, BookOpen, TriangleAlert } from "lucide-react";
import {
  documentationSections,
  productLimitations,
  userGuides,
} from "../content/documentation-content";
import DocumentationSection from "./DocumentationSection";
import UserGuideCard from "./UserGuideCard";

export default function DocumentationPage() {
  const navigationItems = [
    ...documentationSections.map(({ id, title }) => ({ id, title })),
    { id: "use-cases", title: "Use-case guides" },
    { id: "current-limitations", title: "Current limitations" },
  ];

  return (
    <main className="min-h-screen bg-canvas px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-ink-dim transition hover:text-(--secondary)"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Back to Progress
        </Link>

        <header className="mt-7 overflow-hidden rounded-3xl border border-line bg-surface">
          <div className="h-2 bg-(image:--gradient-primary)" />
          <div className="p-6 sm:p-10">
            <span className="flex size-11 items-center justify-center rounded-2xl bg-(--secondary)/10 text-(--secondary)">
              <BookOpen size={21} aria-hidden="true" />
            </span>
            <p className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-(--secondary)">
              Progress guide
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Application documentation
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-ink-dim sm:text-base">
              Learn what Progress is for, how its features work, and how to
              complete common workflows—from creating your first project to
              collaborating with a team and managing your account.
            </p>
          </div>
        </header>

        <div className="mt-8 grid items-start gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-8">
          <aside className="lg:sticky lg:top-6">
            <nav
              aria-label="Documentation sections"
              className="rounded-2xl border border-line bg-surface p-4"
            >
              <h2 className="px-2 text-xs font-bold uppercase tracking-[0.14em] text-ink-dim">
                On this page
              </h2>
              <ul className="mt-3 flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
                {navigationItems.map(({ id, title }) => (
                  <li key={id} className="shrink-0 lg:shrink">
                    <a
                      href={`#${id}`}
                      className="block rounded-xl px-3 py-2 text-sm text-ink-dim transition hover:bg-(--secondary)/5 hover:text-(--secondary)"
                    >
                      {title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <div className="min-w-0 space-y-5">
            {documentationSections.map((section) => (
              <DocumentationSection key={section.id} section={section} />
            ))}

            <section
              id="use-cases"
              aria-labelledby="use-cases-heading"
              className="scroll-mt-24 space-y-4"
            >
              <div className="px-1">
                <h2
                  id="use-cases-heading"
                  className="text-xl font-semibold tracking-tight text-ink"
                >
                  Use-case guides
                </h2>
                <p className="mt-2 text-sm leading-6 text-ink-dim">
                  Step-by-step recipes for common ways to use Progress.
                </p>
              </div>
              {userGuides.map((guide) => (
                <UserGuideCard key={guide.id} guide={guide} />
              ))}
            </section>

            <section
              id="current-limitations"
              aria-labelledby="limitations-heading"
              className="scroll-mt-24 rounded-3xl border border-amber-500/25 bg-amber-500/[0.04] p-5 sm:p-8"
            >
              <div className="flex items-center gap-2">
                <TriangleAlert
                  size={18}
                  className="text-amber-700"
                  aria-hidden="true"
                />
                <h2
                  id="limitations-heading"
                  className="text-lg font-semibold text-ink"
                >
                  Current limitations
                </h2>
              </div>
              <p className="mt-2 text-sm leading-6 text-ink-dim">
                These notes describe the current application behavior, not
                planned features.
              </p>
              <ul className="mt-4 space-y-3">
                {productLimitations.map((limitation) => (
                  <li
                    key={limitation}
                    className="flex gap-3 text-sm leading-6 text-ink-dim"
                  >
                    <span
                      className="mt-2 size-1.5 shrink-0 rounded-full bg-amber-700"
                      aria-hidden="true"
                    />
                    {limitation}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>

        <footer className="mt-10 border-t border-line pt-5 text-center text-sm text-ink-dim">
          Need help?{" "}
          <a
            href="https://vmy.onrender.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-(--secondary) hover:underline"
          >
            Contact the developer
          </a>
          .
        </footer>
      </div>
    </main>
  );
}
