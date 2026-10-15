import { AuthCardProps } from "../types/auth.types";

export default function AuthCard({
  eyebrow,
  title,
  subtitle,
  children,
  footer,
}: AuthCardProps) {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-canvas px-4 py-10">
      <div className="pointer-events-none absolute -right-32 -top-32 size-96 rounded-full bg-(--secondary)/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-28 size-96 rounded-full bg-(--primary)/10 blur-3xl" />
      <div className="relative w-full max-w-md rounded-3xl border border-line bg-surface p-7 shadow-xl shadow-(--secondary)/5 sm:p-9">
        <span className="font-mono text-xs uppercase tracking-widest text-(--secondary)">
          {eyebrow}
        </span>

        <h1 className="mt-2 text-2xl font-bold tracking-tight text-ink">
          {title}
        </h1>

        <p className="mt-1.5 text-sm leading-6 text-ink-dim">{subtitle}</p>

        <div className="mt-7">{children}</div>

        <p className="mt-6 text-center text-sm text-ink-dim">
          {footer}
        </p>
      </div>
    </section>
  );
}
