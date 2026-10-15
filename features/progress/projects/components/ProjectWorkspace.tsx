"use client";

import { useState } from "react";
import { FolderKanban, Plus, Sparkles } from "lucide-react";
import { toast } from "sonner";
import PageHeading from "@/shared/components/ui/PageHeading";
import EmptyState from "@/shared/components/ui/EmptyState";
import LoadingState from "@/shared/components/ui/LoadingState";
import { Button } from "@/shared/components/ui/Button";
import ProjectCard from "./ProjectCard";
import ProjectFilters from "./ProjectFilters";
import ProjectFormDialog from "./ProjectFormDialog";
import useProjects from "../hooks/use-projects";
import { createProject } from "../api/project.api";
import type {
  Project,
  ProjectInput,
  ProjectStatus,
  ProjectType,
} from "../types/project.types";

export default function ProjectWorkspace({
  userName,
}: {
  userName: string;
}) {
  const [query, setQuery] = useState("");
  const [type, setType] = useState<ProjectType | "">("");
  const [status, setStatus] = useState<ProjectStatus | "">("");
  const [showForm, setShowForm] = useState(false);
  const { projects, loading, error, refresh } = useProjects({
    title: query,
    type,
    status,
  });

  async function saveProject(_project: Project | null, payload: ProjectInput) {
    await createProject(payload);
    toast.success("Project created.");
    refresh();
  }

  function closeForm() {
    setShowForm(false);
  }

  const activeCount = projects.filter((project) => project.status === "active").length;
  const teamCount = projects.filter((project) => project.type === "team").length;

  return (
    <div className="space-y-8">
      <PageHeading
        eyebrow="Your workspace"
        title={`Good to see you, ${userName}`}
        description="Keep your goals in motion. Choose a project to pick up where you left off."
        actions={
          <Button onClick={() => setShowForm(true)}>
            <Plus size={17} /> New project
          </Button>
        }
      />

      <section className="grid gap-4 sm:grid-cols-3" aria-label="Project overview">
        <div className="rounded-2xl border border-line bg-surface p-5">
          <p className="text-sm text-ink-dim">Projects in view</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-ink">{projects.length}</p>
        </div>
        <div className="rounded-2xl border border-line bg-surface p-5">
          <p className="text-sm text-ink-dim">Currently active</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-ink">{activeCount}</p>
        </div>
        <div className="rounded-2xl border border-line bg-surface p-5">
          <p className="text-sm text-ink-dim">Team projects</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-ink">{teamCount}</p>
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex items-center gap-2">
          <Sparkles size={18} className="text-(--secondary)" />
          <h2 className="text-lg font-semibold text-ink">Your projects</h2>
        </div>
        <ProjectFilters
          title={query}
          type={type}
          status={status}
          onTitleChange={setQuery}
          onTypeChange={setType}
          onStatusChange={setStatus}
        />

        {loading ? (
          <LoadingState label="Loading your projects..." />
        ) : error ? (
          <div
            role="alert"
            className="rounded-2xl border border-red-500/20 bg-red-500/5 p-5 text-sm text-red-700"
          >
            {error}
            <button
              type="button"
              onClick={refresh}
              className="ml-2 font-semibold underline"
            >
              Try again
            </button>
          </div>
        ) : projects.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={<FolderKanban size={22} />}
            title={query || type || status ? "No matching projects" : "Your first project starts here"}
            description={
              query || type || status
                ? "Try changing your search or filters."
                : "Turn a goal into a clear plan. Add a deadline and track the tasks that move it forward."
            }
            action={
              !query && !type && !status ? (
                <Button onClick={() => setShowForm(true)}>
                  <Plus size={16} /> Create your first project
                </Button>
              ) : undefined
            }
          />
        )}
      </section>

      {showForm && (
        <ProjectFormDialog
          project={null}
          onClose={closeForm}
          onSave={saveProject}
        />
      )}
    </div>
  );
}
