import { BriefcaseBusiness, Code2, Sparkles } from "lucide-react";

const principles = [
  "Clear milestones instead of a noisy backlog",
  "Accountability that works solo or with a team",
  "A simple view of what is moving forward",
];

export default function Purpose() {
  return (
    <section
      id="purpose"
      className="scroll-mt-24 bg-surface px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 rounded-[2rem] border border-line bg-canvas p-6 sm:p-10 lg:grid-cols-[1fr_0.8fr] lg:p-14">
        <div>
          <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-(--secondary)">
            <Sparkles size={14} /> Made for makers
          </p>
          <h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Built around the work you want to be proud of.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-ink-dim">
            Link your developer profiles and repositories, keep project details
            close to your tasks, and make your progress part of your story.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-line bg-surface px-4 text-sm font-semibold text-ink transition hover:border-(--secondary)/40"
            >
              <Code2 size={17} /> GitHub
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-line bg-surface px-4 text-sm font-semibold text-ink transition hover:border-(--secondary)/40"
            >
              <BriefcaseBusiness size={17} /> LinkedIn
            </a>
            <a
              href="https://www.google.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-line bg-surface px-4 text-sm font-semibold text-ink transition hover:border-(--secondary)/40"
            >
              <BriefcaseBusiness size={17} /> Google
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-line bg-surface px-4 text-sm font-semibold text-ink transition hover:border-(--secondary)/40"
            >
              <BriefcaseBusiness size={17} /> Facebook
            </a>
          </div>
        </div>
        <ul className="space-y-3">
          {principles.map((principle) => (
            <li
              key={principle}
              className="flex items-center gap-3 rounded-xl border border-line bg-surface p-4 text-sm font-medium text-ink"
            >
              <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-(--secondary)/10 text-(--secondary)">
                <Sparkles size={14} />
              </span>
              {principle}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
