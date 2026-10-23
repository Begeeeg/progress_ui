"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  Code2,
  ExternalLink,
  FolderKanban,
  Pencil,
  Trash2,
  Users,
} from "lucide-react";
import { toast } from "sonner";
import { deleteProject, leaveProject, updateProject } from "../api/project.api";
import type { Project, ProjectInput } from "../types/project.types";
import StatusBadge from "@/shared/components/ui/StatusBadge";
import DashboardLayout from "@/shared/components/layout/DashboardLayout";
import { Button } from "@/shared/components/ui/Button";
import TaskBoard from "@/features/progress/tasks/components/TaskBoard";
import ProjectFormDialog from "./ProjectFormDialog";
import ProjectNameConfirmationDialog from "./ProjectNameConfirmationDialog";
import ProjectTaskAnalytics from "./ProjectTaskAnalytics";

export default function ProjectDetailPage({
  project,
  userName,
  userId,
}: {
  project: Project;
  userName: string;
  userId: string;
}) {
  const router = useRouter();
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [projectAction, setProjectAction] = useState<"delete" | "leave" | null>(
    null,
  );
  const [projectActionPending, setProjectActionPending] = useState(false);
  const dueDate = new Date(project.dueDate);
  const owner =
    typeof project.userId === "string"
      ? null
      : (project.userId.username ?? null);

  async function handleProjectAction() {
    if (!projectAction) return;
    setProjectActionPending(true);
    try {
      if (projectAction === "delete") {
        await deleteProject(project.id, project.title);
        toast.success("Project deleted.");
      } else {
        await leaveProject(project.id, project.title);
        toast.success("You left the project.");
      }
      setProjectAction(null);
      router.replace("/home");
      router.refresh();
    } catch (cause) {
      toast.error(
        cause instanceof Error
          ? cause.message
          : `Could not ${projectAction} project.`,
      );
    } finally {
      setProjectActionPending(false);
    }
  }

  async function saveProject(
    _currentProject: Project | null,
    payload: ProjectInput,
  ) {
    await updateProject(project.id, payload);
    toast.success("Project updated.");
    setEditDialogOpen(false);
    router.refresh();
  }

  return (
    <DashboardLayout username={userName} fillViewport>
      <div className="grid h-full min-h-0 grid-rows-[minmax(0,0.9fr)_minmax(0,1.4fr)] gap-4 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)] md:grid-rows-1">
        <div className="flex min-h-0 flex-col gap-3">
          <Link
            href="/home"
            className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-ink-dim transition hover:text-(--secondary)"
          >
            <ArrowLeft size={16} /> All projects
          </Link>
          <section className="min-h-0 flex-1 overflow-hidden rounded-3xl border border-line bg-surface">
            <div className="h-2 bg-(image:--gradient-primary)" />
            <div className="flex min-h-full flex-col p-5 sm:p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex min-w-0 flex-1 items-start gap-4">
                <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-(--secondary)/10 text-(--secondary)">
                  <FolderKanban size={24} />
                </span>
                <div className="flex min-w-0 flex-1 items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h1 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                        {project.title}
                      </h1>
                      <StatusBadge status={project.status} />
                    </div>
                    <p className="mt-2 text-sm capitalize text-ink-dim">
                      {project.type} project
                      {owner && ` · owned by @${owner}`}
                    </p>
                  </div>
                  {project.isOwner && (
                    <div className="flex shrink-0 items-center gap-2">
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        onClick={() => setEditDialogOpen(true)}
                        aria-label={`Update ${project.title}`}
                      >
                        <Pencil size={15} aria-hidden="true" />
                      </Button>
                      <Button
                        type="button"
                        variant="danger"
                        size="sm"
                        onClick={() => setProjectAction("delete")}
                        aria-label={`Delete ${project.title}`}
                      >
                        <Trash2 size={15} aria-hidden="true" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
              {!project.isOwner && (
                <button
                  type="button"
                  onClick={() => setProjectAction("leave")}
                  className="self-start rounded-xl border border-line px-4 py-2.5 text-sm font-medium text-ink-dim transition hover:border-red-500/40 hover:text-red-600"
                >
                  Leave project
                </button>
              )}
            </div>
            {project.document && (
              <p className="mt-6 max-w-3xl whitespace-pre-wrap text-sm leading-7 text-ink-dim">
                {project.document}
              </p>
            )}
            <div className="mt-6 flex flex-wrap gap-3 border-t border-line pt-5">
              <div className="inline-flex items-center gap-2 rounded-xl bg-canvas px-3.5 py-2.5 text-sm text-ink-dim">
                <CalendarDays size={16} className="text-(--secondary)" />
                Due{" "}
                {Number.isNaN(dueDate.getTime())
                  ? "date unavailable"
                  : dueDate.toLocaleDateString(undefined, {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
              </div>
              <div className="inline-flex items-center gap-2 rounded-xl bg-canvas px-3.5 py-2.5 text-sm text-ink-dim">
                <Users size={16} className="text-(--secondary)" />
                {project.members?.length ?? 0} collaborators
              </div>
              {project.githubRepo && (
                <a
                  href={
                    project.githubRepo.startsWith("http")
                      ? project.githubRepo
                      : `https://github.com/${project.githubRepo}`
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-canvas px-3.5 py-2.5 text-sm font-medium text-ink-dim transition hover:text-(--secondary)"
                >
                  <Code2 size={16} /> Repository <ExternalLink size={13} />
                </a>
              )}
            </div>
            <div className="mt-auto pt-6">
              <ProjectTaskAnalytics projectId={project.id} />
            </div>
            </div>
          </section>
        </div>
        <TaskBoard project={project} userId={userId} />
      </div>
      {editDialogOpen && (
        <ProjectFormDialog
          project={project}
          onClose={() => setEditDialogOpen(false)}
          onSave={saveProject}
        />
      )}
      {projectAction && (
        <ProjectNameConfirmationDialog
          projectName={project.title}
          action={projectAction}
          submitting={projectActionPending}
          onCancel={() => {
            if (!projectActionPending) setProjectAction(null);
          }}
          onConfirm={handleProjectAction}
        />
      )}
    </DashboardLayout>
  );
}
