import { AuthCardProps } from "./types/auth.types";

export default function AuthCard({
  eyebrow,
  title,
  subtitle,
  children,
  footer,
}: AuthCardProps) {
  return (
    <section className="flex min-h-screen items-center justify-center bg-canvas px-4 py-10">
      <div className="w-full max-w-md rounded-xl border border-line bg-surface p-8 shadow-sm">
        <span className="font-mono text-xs uppercase tracking-widest text-emerald">
          {eyebrow}
        </span>

        <h1 className="mt-2 font-display text-2xl font-bold text-ink">
          {title}
        </h1>

        <p className="mt-1.5 font-body text-sm text-ink-dim">{subtitle}</p>

        <div className="mt-7">{children}</div>

        <p className="mt-6 text-center font-body text-sm text-ink-dim">
          {footer}
        </p>
      </div>
    </section>
  );
}
