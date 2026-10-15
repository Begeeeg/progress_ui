import Link from "next/link";
import { ArrowUpRight, CalendarDays, Code2 } from "lucide-react";
import StatusBadge from "@/shared/components/ui/StatusBadge";
import type { Project } from "../types/project.types";

export default function ProjectCard({ project }: { project: Project }) {
  const dueDate = new Date(project.dueDate);
  const memberCount = project.members?.length ?? 0;

  return (
    <article className="group rounded-2xl border border-line bg-surface p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-(--secondary)/40 hover:shadow-lg sm:p-6">
      <div className="mb-5 flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-(--secondary)/10 text-sm font-bold uppercase text-(--secondary)">
            {project.title.slice(0, 2)}
          </span>
          <div className="min-w-0">
            <Link
              href={`/home/projects/${encodeURIComponent(project.id)}`}
              className="inline-flex max-w-full items-center gap-1 text-base font-semibold text-ink transition hover:text-(--secondary)"
            >
              <span className="truncate">{project.title}</span>
              <ArrowUpRight
                size={14}
                className="shrink-0 opacity-0 transition group-hover:opacity-100"
              />
            </Link>
            <p className="mt-1 text-xs capitalize text-ink-dim">
              {project.type} project
              {!project.isOwner && " · shared with you"}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <StatusBadge status={project.status} />
        <span className="rounded-full bg-surface-soft px-2.5 py-1 text-xs font-medium capitalize text-ink-dim">
          {memberCount > 0 ? `${memberCount} collaborators` : "Solo"}
        </span>
      </div>

      {project.document && (
        <p className="mt-4 line-clamp-2 min-h-10 text-sm leading-5 text-ink-dim">
          {project.document}
        </p>
      )}
      {!project.document && <div className="mt-4 min-h-10" />}

      <div className="mt-5 flex items-center justify-between gap-3 border-t border-line pt-4">
        <p className="flex items-center gap-2 text-xs text-ink-dim">
          <CalendarDays size={15} />
          {Number.isNaN(dueDate.getTime())
            ? "No due date"
            : dueDate.toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
        </p>
        <div className="flex items-center gap-2">
          {project.githubRepo && (
            <a
              href={
                project.githubRepo.startsWith("http")
                  ? project.githubRepo
                  : `https://github.com/${project.githubRepo}`
              }
              target="_blank"
              rel="noreferrer"
              aria-label={`Open ${project.title} GitHub repository`}
              className="rounded-lg p-2 text-ink-dim transition hover:bg-surface-soft hover:text-ink"
            >
              <Code2 size={16} />
            </a>
          )}
          <Link
            href={`/home/projects/${encodeURIComponent(project.id)}`}
            className="text-xs font-semibold text-(--secondary) hover:underline"
          >
            View project
          </Link>
        </div>
      </div>
    </article>
  );
}
