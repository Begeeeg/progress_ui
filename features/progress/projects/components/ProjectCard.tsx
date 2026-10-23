import Link from "next/link";
import { ArrowUpRight, CalendarDays, Code2 } from "lucide-react";
import StatusBadge from "@/shared/components/ui/StatusBadge";
import type { Project } from "../types/project.types";

export default function ProjectCard({ project }: { project: Project }) {
    const dueDate = new Date(project.dueDate);
    const memberCount = project.members?.length ?? 0;
    const projectUrl = `/home/projects/${encodeURIComponent(project.id)}`;

    return (
        <article className="group relative flex items-center gap-3 rounded-2xl border border-line bg-surface p-3.5 shadow-sm transition hover:border-(--secondary)/40 hover:shadow-md sm:gap-4 sm:p-4">
            <Link
                href={projectUrl}
                aria-label={`Open project ${project.title}`}
                className="absolute inset-0 z-0 rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--secondary)"
            />
            <div className="pointer-events-none relative z-0 flex min-w-0 flex-1 items-center gap-3 sm:gap-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-(--secondary)/10 text-xs font-bold uppercase text-(--secondary)">
                    {project.title.slice(0, 2)}
                </span>
                <div className="min-w-0 flex-1">
                    <div className="flex min-w-0 items-center gap-1">
                        <h3 className="truncate text-sm font-semibold text-ink sm:text-base">
                            {project.title}
                        </h3>
                        <ArrowUpRight
                            size={14}
                            className="shrink-0 text-ink-dim opacity-0 transition group-hover:opacity-100"
                            aria-hidden="true"
                        />
                    </div>
                    <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                        <span className="text-xs capitalize text-ink-dim">
                            {project.type} project
                            {!project.isOwner && " · shared with you"}
                        </span>
                        <StatusBadge status={project.status} />
                        <span className="rounded-full bg-surface-soft px-2 py-0.5 text-[11px] font-medium capitalize text-ink-dim">
                            {memberCount > 0
                                ? `${memberCount} collaborators`
                                : "Solo"}
                        </span>
                    </div>
                </div>
            </div>

            <div className="relative z-10 flex shrink-0 items-center gap-2 sm:gap-3">
                <p className="flex items-center gap-1.5 text-right text-[11px] text-ink-dim sm:text-xs">
                    <CalendarDays size={14} className="shrink-0" />
                    <span>
                        {Number.isNaN(dueDate.getTime())
                            ? "No due date"
                            : dueDate.toLocaleDateString(undefined, {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                              })}
                    </span>
                </p>
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
                        className="rounded-lg p-2 text-ink-dim transition hover:bg-surface-soft hover:text-ink focus-visible:outline-2 focus-visible:outline-(--secondary)"
                    >
                        <Code2 size={16} />
                    </a>
                )}
            </div>
        </article>
    );
}
