import { ListChecks } from "lucide-react";
import type { UserGuide } from "../types/documentation.types";

export default function UserGuideCard({ guide }: { guide: UserGuide }) {
  return (
    <article
      id={guide.id}
      className="scroll-mt-24 rounded-3xl border border-line bg-surface p-5 sm:p-7"
    >
      <div className="flex items-start gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-(--secondary)/10 text-(--secondary)">
          <ListChecks size={19} aria-hidden="true" />
        </span>
        <div>
          <h3 className="font-semibold text-ink">{guide.title}</h3>
          <p className="mt-1 text-sm leading-6 text-ink-dim">
            {guide.summary}
          </p>
        </div>
      </div>
      <ol className="mt-5 space-y-3">
        {guide.steps.map((step, index) => (
          <li key={step} className="flex gap-3 text-sm leading-6">
            <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-surface-soft text-xs font-semibold text-(--secondary)">
              {index + 1}
            </span>
            <span className="text-ink-dim">{step}</span>
          </li>
        ))}
      </ol>
      {guide.note && (
        <p className="mt-4 rounded-xl bg-amber-500/10 p-3 text-xs leading-5 text-amber-900">
          {guide.note}
        </p>
      )}
    </article>
  );
}
