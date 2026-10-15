const labels: Record<string, string> = {
  active: "Active",
  inactive: "On hold",
  achieved: "Achieved",
  pending: "To do",
  in_progress: "In progress",
  completed: "Completed",
};

const colors: Record<string, string> = {
  active: "bg-(--primary)/10 text-(--secondary)",
  inactive: "bg-surface-soft text-ink-dim",
  achieved: "bg-emerald-500/10 text-emerald-600",
  pending: "bg-surface-soft text-ink-dim",
  in_progress: "bg-amber-500/10 text-amber-700",
  completed: "bg-emerald-500/10 text-emerald-600",
};

export default function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${colors[status] ?? colors.pending}`}
    >
      {labels[status] ?? status.replaceAll("_", " ")}
    </span>
  );
}
