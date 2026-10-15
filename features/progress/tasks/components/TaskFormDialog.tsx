"use client";

import { useState } from "react";
import { toast } from "sonner";
import Modal from "@/shared/components/ui/Modal";
import { Button } from "@/shared/components/ui/Button";
import { FormField, TextArea, TextInput } from "@/shared/components/ui/FormField";
import type { Task, TaskInput, TaskStatus } from "../types/task.types";

function dateInputValue(value?: string) {
  if (!value) return "";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : date.toISOString().slice(0, 10);
}

export default function TaskFormDialog({
  task,
  projectDueDate,
  onClose,
  onSave,
}: {
  task: Task | null;
  projectDueDate: string;
  onClose: () => void;
  onSave: (task: Task | null, payload: TaskInput) => Promise<void>;
}) {
  const [title, setTitle] = useState(task?.title ?? "");
  const [notes, setNotes] = useState(task?.notes ?? "");
  const [status, setStatus] = useState<TaskStatus>(task?.status ?? "pending");
  const [deadline, setDeadline] = useState(dateInputValue(task?.deadline));
  const [assignedTo, setAssignedTo] = useState(task?.assignedTo?.join(", ") ?? "");
  const [saving, setSaving] = useState(false);
  const maxDeadline = dateInputValue(projectDueDate);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!deadline) {
      toast.error("Choose a deadline for this task.");
      return;
    }
    const usernames = assignedTo
      .split(",")
      .map((username) => username.trim())
      .filter(Boolean);
    setSaving(true);
    try {
      await onSave(task, {
        title: title.trim(),
        notes: notes.trim() || undefined,
        status,
        deadline,
        assignedTo: usernames,
      });
      onClose();
    } catch (cause) {
      toast.error(cause instanceof Error ? cause.message : "Could not save task.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Modal
      title={task ? "Edit task" : "Add a task"}
      description="Give the next step a clear owner and deadline."
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField label="Task name" id="task-title">
          <TextInput
            id="task-title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="What needs to get done?"
            required
          />
        </FormField>
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField label="Status" id="task-status">
            <select
              id="task-status"
              value={status}
              onChange={(event) => setStatus(event.target.value as TaskStatus)}
              className="w-full rounded-xl border border-line bg-canvas px-3.5 py-2.5 text-sm text-ink outline-none focus:border-(--secondary)"
            >
              <option value="pending">To do</option>
              <option value="in_progress">In progress</option>
              <option value="completed">Completed</option>
            </select>
          </FormField>
          <FormField
            label="Deadline"
            id="task-deadline"
            hint={`No later than ${new Date(projectDueDate).toLocaleDateString()}`}
          >
            <TextInput
              id="task-deadline"
              type="date"
              value={deadline}
              onChange={(event) => setDeadline(event.target.value)}
              min={new Date().toISOString().slice(0, 10)}
              max={maxDeadline}
              required
            />
          </FormField>
        </div>
        <FormField
          label="Assigned usernames"
          id="task-assignees"
          hint="Optional. Separate usernames with commas; users must be project members."
        >
          <TextInput
            id="task-assignees"
            value={assignedTo}
            onChange={(event) => setAssignedTo(event.target.value)}
            placeholder="alex, sam"
          />
        </FormField>
        <FormField label="Notes" id="task-notes">
          <TextArea
            id="task-notes"
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            placeholder="Details, links, or context for this task"
          />
        </FormField>
        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={saving}>
            {saving ? "Saving..." : task ? "Save changes" : "Add task"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
