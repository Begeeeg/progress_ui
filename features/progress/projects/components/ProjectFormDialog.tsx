"use client";

import { useState } from "react";
import { toast } from "sonner";
import Modal from "@/shared/components/ui/Modal";
import { Button } from "@/shared/components/ui/Button";
import { FormField, TextArea, TextInput } from "@/shared/components/ui/FormField";
import type {
  Project,
  ProjectInput,
  ProjectStatus,
  ProjectType,
} from "../types/project.types";

function dateInputValue(value?: string) {
  if (!value) return "";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : date.toISOString().slice(0, 10);
}

export default function ProjectFormDialog({
  project,
  onClose,
  onSave,
}: {
  project: Project | null;
  onClose: () => void;
  onSave: (project: Project | null, payload: ProjectInput) => Promise<void>;
}) {
  const [title, setTitle] = useState(project?.title ?? "");
  const [type, setType] = useState<ProjectType>(project?.type ?? "personal");
  const [status, setStatus] = useState<ProjectStatus>(
    project?.status ?? "active",
  );
  const [documentation, setDocumentation] = useState(project?.document ?? "");
  const [githubRepo, setGithubRepo] = useState(project?.githubRepo ?? "");
  const [dueDate, setDueDate] = useState(dateInputValue(project?.dueDate));
  const [members, setMembers] = useState(
    project?.members
      ?.map((member) =>
        typeof member === "string" ? member : member.username ?? "",
      )
      .filter(Boolean)
      .join(", ") ?? "",
  );
  const [saving, setSaving] = useState(false);
  const isEditing = Boolean(project);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!dueDate && !isEditing) {
      toast.error("Choose a due date for your project.");
      return;
    }
    const usernames = members
      .split(",")
      .map((username) => username.trim())
      .filter(Boolean);
    if (type === "team" && usernames.length === 0) {
      toast.error("Add at least one username to a team project.");
      return;
    }

    const payload: ProjectInput = {
      title: title.trim(),
      type,
      status,
      documentation: documentation.trim() || undefined,
      githubRepo: githubRepo.trim() || undefined,
      ...(dueDate ? { dueDate } : {}),
      ...(type === "team" ? { members: usernames } : { members: [] }),
    };

    setSaving(true);
    try {
      await onSave(project, payload);
      onClose();
    } catch (cause) {
      toast.error(cause instanceof Error ? cause.message : "Could not save project.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Modal
      title={isEditing ? "Edit project" : "Create a project"}
      description="Capture the goal, deadline, and any teammates involved."
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField label="Project name" id="project-title">
          <TextInput
            id="project-title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            maxLength={15}
            required
            placeholder="e.g. Portfolio"
          />
          <p className="mt-1 text-right text-xs text-ink-dim">{title.length}/15</p>
        </FormField>
        <FormField label="Project type" id="project-type">
          <select
            id="project-type"
            value={type}
            onChange={(event) => setType(event.target.value as ProjectType)}
            className="w-full rounded-xl border border-line bg-canvas px-3.5 py-2.5 text-sm text-ink outline-none focus:border-(--secondary)"
          >
            <option value="personal">Personal</option>
            <option value="team">Team</option>
          </select>
        </FormField>
        {isEditing && (
          <FormField label="Status" id="project-status">
            <select
              id="project-status"
              value={status}
              onChange={(event) =>
                setStatus(event.target.value as ProjectStatus)
              }
              className="w-full rounded-xl border border-line bg-canvas px-3.5 py-2.5 text-sm text-ink outline-none focus:border-(--secondary)"
            >
              <option value="active">Active</option>
              <option value="inactive">On hold</option>
              <option value="achieved">Achieved</option>
            </select>
          </FormField>
        )}
        {type === "team" && (
          <FormField
            label="Collaborator usernames"
            id="project-members"
            hint="Separate usernames with commas. Teammates must already have Progress accounts."
          >
            <TextInput
              id="project-members"
              value={members}
              onChange={(event) => setMembers(event.target.value)}
              placeholder="alex, sam"
              required
            />
          </FormField>
        )}
        <FormField label="Due date" id="project-due-date">
          <TextInput
            id="project-due-date"
            type="date"
            value={dueDate}
            onChange={(event) => setDueDate(event.target.value)}
            min={new Date().toISOString().slice(0, 10)}
            required={!isEditing}
          />
        </FormField>
        <FormField label="Description" id="project-description">
          <TextArea
            id="project-description"
            value={documentation}
            onChange={(event) => setDocumentation(event.target.value)}
            placeholder="What does success look like?"
          />
        </FormField>
        <FormField label="GitHub repository" id="project-repository">
          <TextInput
            id="project-repository"
            value={githubRepo}
            onChange={(event) => setGithubRepo(event.target.value)}
            placeholder="owner/repository or https://github.com/..."
          />
        </FormField>
        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={saving}>
            {saving ? "Saving..." : isEditing ? "Save changes" : "Create project"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
