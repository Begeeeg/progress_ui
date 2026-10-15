import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";
import type { LegalDocument } from "../types/legal-document.types";

export default function LegalDocumentPage({
  document,
}: {
  document: LegalDocument;
}) {
  return (
    <main className="min-h-screen bg-canvas px-4 py-10 sm:px-6 sm:py-16">
      <article className="mx-auto max-w-4xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-ink-dim transition hover:text-(--secondary)"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Back to Progress
        </Link>

        <header className="mt-8 rounded-3xl border border-line bg-surface p-6 sm:p-10">
          <span className="flex size-11 items-center justify-center rounded-2xl bg-(--secondary)/10 text-(--secondary)">
            <FileText size={21} aria-hidden="true" />
          </span>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            {document.title}
          </h1>
          <p className="mt-2 text-xs text-ink-dim">
            Effective date: {document.effectiveDate}
          </p>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-ink-dim sm:text-base">
            {document.summary}
          </p>
        </header>

        <div className="mt-6 space-y-4">
          {document.sections.map((section, index) => (
            <section
              key={section.title}
              className="rounded-3xl border border-line bg-surface p-6 sm:p-8"
            >
              <h2 className="text-lg font-semibold text-ink">
                {index + 1}. {section.title}
              </h2>
              <div className="mt-4 space-y-4 text-sm leading-7 text-ink-dim">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              {section.bullets && (
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-ink-dim">
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        <p className="mt-6 text-center text-xs leading-5 text-ink-dim">
          These terms and this policy do not limit rights that cannot legally be
          excluded in your place of residence. Contact the developer if you
          have questions or need to exercise a privacy right.
        </p>
      </article>
    </main>
  );
}
