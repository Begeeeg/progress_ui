import { ArrowRight, Check, Plus } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Name what matters",
    description:
      "Create a project for a goal you care about, add a short description, and choose a date to work toward.",
  },
  {
    number: "02",
    title: "Find the next step",
    description:
      "Add tasks with clear deadlines. For team work, bring in collaborators and assign the right people.",
  },
  {
    number: "03",
    title: "Keep showing up",
    description:
      "Update tasks as you go, celebrate the milestones, and keep your momentum visible.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-24 bg-canvas px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="max-w-lg">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-(--secondary)">
            Simple by design
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            A good plan starts with one next step.
          </h2>
          <p className="mt-4 text-base leading-7 text-ink-dim">
            Progress gives you just enough structure to keep moving without
            getting in the way.
          </p>
          <div className="mt-8 flex items-center gap-2 rounded-2xl border border-line bg-surface p-4 text-sm font-medium text-ink">
            <span className="flex size-8 items-center justify-center rounded-lg bg-(--secondary)/10 text-(--secondary)">
              <Plus size={17} />
            </span>
            One step at a time is still forward.
            <ArrowRight size={16} className="ml-auto text-(--secondary)" />
          </div>
        </div>
        <div className="space-y-4">
          {steps.map((step, index) => (
            <article
              key={step.number}
              className="relative flex gap-5 rounded-2xl border border-line bg-surface p-5 sm:p-6"
            >
              {index < steps.length - 1 && (
                <span className="absolute bottom-[-1.25rem] left-[2.45rem] z-10 h-5 w-px bg-line" />
              )}
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-(--secondary)/10 text-xs font-bold text-(--secondary)">
                {index < 2 ? <Check size={16} /> : step.number}
              </span>
              <div>
                <p className="text-xs font-semibold tracking-wide text-(--secondary)">
                  STEP {step.number}
                </p>
                <h3 className="mt-1 text-base font-semibold text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-ink-dim">
                  {step.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
