import type { ReactNode } from "react";

export default function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-line bg-surface/60 px-6 py-12 text-center">
      <div className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-(--secondary)/10 text-(--secondary)">
        {icon}
      </div>
      <h2 className="text-base font-semibold text-ink">{title}</h2>
      <p className="mt-2 max-w-sm text-sm leading-6 text-ink-dim">
        {description}
      </p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
