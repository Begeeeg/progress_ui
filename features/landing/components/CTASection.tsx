import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/shared/components/ui/Button";

export default function CTASection() {
  return (
    <section className="bg-canvas px-4 py-16 sm:px-6 sm:py-20">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-(image:--gradient-primary) px-6 py-12 text-center text-white sm:px-12 sm:py-16">
        <div className="pointer-events-none absolute -right-10 -top-36 size-80 rounded-full border border-white/20" />
        <div className="pointer-events-none absolute -bottom-52 -left-10 size-96 rounded-full border border-white/20" />
        <div className="relative">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/75">
            Your next step starts here
          </p>
          <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
            Make room for the progress you want to make.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-white/80 sm:text-base">
            Start a workspace, shape a goal into a plan, and keep your momentum
            somewhere you can see it.
          </p>
          <ButtonLink
            href="/signup"
            variant="secondary"
            size="lg"
            className="mt-8 bg-black/60 hover:bg-black/50 hover:text-(--secondary)"
          >
            Create your free account <ArrowRight size={17} />
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
