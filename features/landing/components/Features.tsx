import {
  CalendarDays,
  ChartNoAxesCombined,
  FolderKanban,
  UsersRound,
} from "lucide-react";

const features = [
  {
    icon: FolderKanban,
    title: "Projects with purpose",
    description:
      "Bring goals, descriptions, deadlines, and your GitHub repository together in one focused space.",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Small steps, visible wins",
    description:
      "Break a project into practical tasks and see what is done, what is moving, and what comes next.",
  },
  {
    icon: UsersRound,
    title: "Make it collaborative",
    description:
      "Create team projects, invite Progress members, and assign work to the people involved.",
  },
  {
    icon: CalendarDays,
    title: "Keep the finish line in view",
    description:
      "Set realistic project and task deadlines that keep priorities clear and work moving forward.",
  },
];

export default function Features() {
  return (
    <section id="features" className="scroll-mt-24 bg-surface px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-(--secondary)">
            Everything in one place
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Less juggling. More moving forward.
          </h2>
          <p className="mt-4 text-base leading-7 text-ink-dim">
            A clear view of the work behind your goals, built for solo projects
            and shared momentum alike.
          </p>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, description }, index) => (
            <article
              key={title}
              className="rounded-2xl border border-line bg-canvas p-6 transition hover:-translate-y-1 hover:border-(--secondary)/30 hover:shadow-lg hover:shadow-(--secondary)/5"
            >
              <span className="flex size-11 items-center justify-center rounded-xl bg-(--secondary)/10 text-(--secondary)">
                <Icon size={20} />
              </span>
              <p className="mt-5 text-xs font-semibold text-(--secondary)">
                0{index + 1}
              </p>
              <h3 className="mt-2 text-base font-semibold text-ink">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-ink-dim">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
