import Link from "next/link";
import {
  ArrowRight,
  Check,
  CircleDashed,
  Clock3,
  Layers3,
  Sparkles,
} from "lucide-react";
import { ButtonLink } from "@/shared/components/ui/Button";

const previewTasks = [
  { title: "Sketch the first milestone", state: "completed" },
  { title: "Build the core experience", state: "in_progress" },
  { title: "Share progress with the team", state: "pending" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-canvas px-4 pb-20 pt-16 sm:px-6 sm:pb-28 sm:pt-24">
      <div className="pointer-events-none absolute -right-28 -top-24 size-[30rem] rounded-full bg-(--secondary)/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-40 bottom-0 size-[24rem] rounded-full bg-(--primary)/10 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="max-w-2xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-(--secondary)/20 bg-surface px-3.5 py-2 text-xs font-semibold text-(--secondary)">
            <Sparkles size={14} /> A calmer way to make progress
          </p>
          <h1 className="mt-7 text-5xl font-semibold leading-[1.05] tracking-[-0.05em] text-ink sm:text-6xl lg:text-7xl">
            Big goals,
            <span className="block bg-(image:--gradient-primary) bg-clip-text text-transparent">
              steady progress.
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-ink-dim sm:text-lg">
            Give every idea a home, every project a plan, and every small win a
            place to count. Progress keeps your next step in view.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <ButtonLink href="/signup" size="lg">
              Start your workspace <ArrowRight size={17} />
            </ButtonLink>
            <Link
              href="#features"
              className="inline-flex min-h-12 items-center rounded-xl px-5 text-sm font-semibold text-ink-dim transition hover:bg-surface hover:text-ink"
            >
              Explore features
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-ink-dim">
            <span className="inline-flex items-center gap-1.5">
              <Check size={14} className="text-(--secondary)" /> Personal or team
              projects
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Check size={14} className="text-(--secondary)" /> Your progress,
              at a glance
            </span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl">
          <div className="absolute -inset-5 rounded-[2rem] bg-(image:--gradient-primary) opacity-15 blur-2xl" />
          <div className="relative rounded-[1.75rem] border border-line bg-surface p-5 shadow-2xl shadow-(--secondary)/10 sm:p-7">
            <div className="flex items-center justify-between border-b border-line pb-5">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-(--secondary)/10 text-(--secondary)">
                  <Layers3 size={19} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-ink">Spring refresh</p>
                  <p className="mt-0.5 text-xs text-ink-dim">Personal project</p>
                </div>
              </div>
              <span className="rounded-full bg-(--primary)/10 px-3 py-1 text-xs font-semibold text-(--secondary)">
                In motion
              </span>
            </div>
            <div className="mt-6">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xs font-medium text-ink-dim">Project progress</p>
                  <p className="mt-1 text-3xl font-semibold tracking-tight text-ink">
                    68<span className="text-lg text-ink-dim">%</span>
                  </p>
                </div>
                <span className="text-xs text-ink-dim">A little every day adds up.</span>
              </div>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-surface-soft">
                <div className="h-full w-[68%] rounded-full bg-(image:--gradient-primary)" />
              </div>
            </div>
            <div className="mt-6 space-y-2">
              {previewTasks.map((task) => (
                <div
                  key={task.title}
                  className="flex items-center gap-3 rounded-xl bg-canvas px-3.5 py-3"
                >
                  <span
                    className={`flex size-5 items-center justify-center rounded-full ${
                      task.state === "completed"
                        ? "bg-(--secondary) text-white"
                        : task.state === "in_progress"
                          ? "border-2 border-(--secondary) text-(--secondary)"
                          : "border border-line text-ink-dim"
                    }`}
                  >
                    {task.state === "completed" ? (
                      <Check size={12} />
                    ) : task.state === "in_progress" ? (
                      <span className="size-1.5 rounded-full bg-(--secondary)" />
                    ) : (
                      <CircleDashed size={12} />
                    )}
                  </span>
                  <span
                    className={`flex-1 text-sm ${
                      task.state === "completed"
                        ? "text-ink-dim line-through"
                        : "text-ink"
                    }`}
                  >
                    {task.title}
                  </span>
                  {task.state === "in_progress" && (
                    <span className="text-[10px] font-semibold uppercase tracking-wide text-(--secondary)">
                      Up next
                    </span>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-5 flex items-center gap-2 border-t border-line pt-4 text-xs text-ink-dim">
              <Clock3 size={14} className="text-(--secondary)" />
              Next milestone in 6 days
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
