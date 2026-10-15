import type { DocumentationSection as DocumentationSectionData } from "../types/documentation.types";

export default function DocumentationSection({
  section,
}: {
  section: DocumentationSectionData;
}) {
  return (
    <section
      id={section.id}
      aria-labelledby={`${section.id}-heading`}
      className="scroll-mt-24 rounded-3xl border border-line bg-surface p-5 sm:p-8"
    >
      <h2
        id={`${section.id}-heading`}
        className="text-xl font-semibold tracking-tight text-ink"
      >
        {section.title}
      </h2>
      <p className="mt-2 max-w-3xl text-sm leading-6 text-ink-dim">
        {section.description}
      </p>
      <div className="mt-6 grid gap-3 md:grid-cols-2">
        {section.details.map((detail) => (
          <article
            key={detail.title}
            className="rounded-2xl border border-line bg-canvas p-4"
          >
            <h3 className="text-sm font-semibold text-ink">{detail.title}</h3>
            <p className="mt-2 text-sm leading-6 text-ink-dim">
              {detail.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
