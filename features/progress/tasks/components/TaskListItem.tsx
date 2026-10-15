import { CalendarDays, Check, Pencil, Trash2 } from "lucide-react";
import StatusBadge from "@/shared/components/ui/StatusBadge";
import type { Task, TaskStatus } from "../types/task.types";

export default function TaskListItem({
  task,
  onStatusChange,
  onEdit,
  onDelete,
  onLeave,
  canLeave,
}: {
  task: Task;
  onStatusChange: (task: Task, status: TaskStatus) => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  onLeave: (task: Task) => void;
  canLeave: boolean;
}) {
  const deadline = new Date(task.deadline);

  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-line bg-surface p-4 sm:flex-row sm:items-start sm:justify-between sm:p-5">
      <div className="flex min-w-0 gap-3">
        <button
          type="button"
          aria-label={
            task.status === "completed"
              ? "Mark task as to do"
              : "Mark task complete"
          }
          onClick={() =>
            onStatusChange(
              task,
              task.status === "completed" ? "pending" : "completed",
            )
          }
          className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md border transition ${
            task.status === "completed"
              ? "border-(--secondary) bg-(--secondary) text-white"
              : "border-line hover:border-(--secondary)"
          }`}
        >
          {task.status === "completed" && <Check size={13} />}
        </button>
        <div className="min-w-0">
          <h3
            className={`font-semibold ${
              task.status === "completed"
                ? "text-ink-dim line-through"
                : "text-ink"
            }`}
          >
            {task.title}
          </h3>
          {task.notes && (
            <p className="mt-1.5 whitespace-pre-wrap text-sm leading-6 text-ink-dim">
              {task.notes}
            </p>
          )}
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <StatusBadge status={task.status} />
            <span className="flex items-center gap-1.5 text-xs text-ink-dim">
              <CalendarDays size={13} />
              {Number.isNaN(deadline.getTime())
                ? "No deadline"
                : deadline.toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
            </span>
            {task.assignedTo && task.assignedTo.length > 0 && (
              <span className="text-xs text-ink-dim">
                Assigned to {task.assignedTo.length}{" "}
                {task.assignedTo.length === 1 ? "member" : "members"}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-2 self-end sm:self-start">
        {canLeave && (
          <button
            type="button"
            onClick={() => onLeave(task)}
            className="rounded-lg px-2 py-1.5 text-xs font-medium text-ink-dim transition hover:bg-surface-soft hover:text-ink"
          >
            Unassign me
          </button>
        )}
        <button
          type="button"
          onClick={() => onEdit(task)}
          className="rounded-lg p-2 text-ink-dim transition hover:bg-surface-soft hover:text-ink"
          aria-label={`Edit ${task.title}`}
        >
          <Pencil size={15} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => onDelete(task)}
          className="rounded-lg px-2 py-1.5 text-xs font-medium text-red-600/80 transition hover:bg-red-500/5 hover:text-red-600"
        >
          <Trash2 size={15} aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}
