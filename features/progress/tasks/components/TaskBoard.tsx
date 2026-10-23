"use client";

import { useCallback, useEffect, useState } from "react";
import { ListTodo, Plus } from "lucide-react";
import { toast } from "sonner";
import EmptyState from "@/shared/components/ui/EmptyState";
import LoadingState from "@/shared/components/ui/LoadingState";
import { Button } from "@/shared/components/ui/Button";
import TaskFormDialog from "./TaskFormDialog";
import TaskListItem from "./TaskListItem";
import TaskNameConfirmationDialog from "./TaskNameConfirmationDialog";
import {
  createTask,
  deleteTask,
  getTasks,
  leaveTask,
  setTaskStatus,
  updateTask,
} from "../api/task.api";
import type { Project } from "@/features/progress/projects/types/project.types";
import type { Task, TaskInput, TaskStatus } from "../types/task.types";
import { isTaskAssignedToUser } from "../utils/task.utils";

export default function TaskBoard({
  project,
  userId,
}: {
  project: Project;
  userId: string;
}) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [taskAction, setTaskAction] = useState<{
    task: Task;
    action: "delete" | "leave";
  } | null>(null);
  const [taskActionPending, setTaskActionPending] = useState(false);

  const fetchTasks = useCallback(async () => {
    return getTasks(project.id);
  }, [project.id]);

  const loadTasks = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      setTasks(await fetchTasks());
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not load tasks.");
    } finally {
      setLoading(false);
    }
  }, [fetchTasks]);

  useEffect(() => {
    let active = true;
    fetchTasks()
      .then((result) => {
        if (active) setTasks(result);
      })
      .catch((cause: unknown) => {
        if (active) {
          setError(cause instanceof Error ? cause.message : "Could not load tasks.");
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [fetchTasks]);

  async function saveTask(task: Task | null, payload: TaskInput) {
    if (task) {
      await updateTask(project.id, task.id, payload);
      toast.success("Task updated.");
    } else {
      await createTask(project.id, payload);
      toast.success("Task added.");
    }
    await loadTasks();
  }

  async function changeStatus(task: Task, status: TaskStatus) {
    try {
      await setTaskStatus(project.id, task.id, status);
      setTasks((current) =>
        current.map((item) => (item.id === task.id ? { ...item, status } : item)),
      );
    } catch (cause) {
      toast.error(cause instanceof Error ? cause.message : "Could not update task.");
    }
  }

  async function confirmTaskAction() {
    if (!taskAction || taskActionPending) return;
    const { task, action } = taskAction;
    setTaskActionPending(true);
    try {
      if (action === "delete") {
        await deleteTask(project.id, task.id, task.title);
        setTasks((current) => current.filter((item) => item.id !== task.id));
        toast.success("Task deleted.");
      } else {
        await leaveTask(project.id, task.id, task.title);
        setTasks((current) =>
          current.map((item) =>
            item.id === task.id
              ? {
                  ...item,
                  assignedTo: item.assignedTo?.filter(
                    (assignedId) => assignedId !== userId,
                  ),
                }
              : item,
          ),
        );
        toast.success("You were unassigned from the task.");
      }
      setTaskAction(null);
    } catch (cause) {
      toast.error(
        cause instanceof Error
          ? cause.message
          : action === "delete"
            ? "Could not delete task."
            : "Could not leave task.",
      );
    } finally {
      setTaskActionPending(false);
    }
  }

  const completedCount = tasks.filter((task) => task.status === "completed").length;

  return (
    <section className="flex h-full min-h-0 flex-col">
      <div className="mb-4 flex shrink-0 items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-ink">Tasks</h2>
          <p className="mt-1 text-sm text-ink-dim">
            {completedCount} of {tasks.length} completed
          </p>
        </div>
        {project.isOwner || project.type === "team" ? (
          <Button onClick={() => setDialogOpen(true)}>
            <Plus size={16} /> Add task
          </Button>
        ) : null}
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain pr-1">
        {loading ? (
          <LoadingState label="Loading tasks..." />
        ) : error ? (
          <p role="alert" className="rounded-2xl bg-red-500/5 p-5 text-sm text-red-700">
            {error}{" "}
            <button onClick={() => void loadTasks()} className="font-semibold underline">
              Try again
            </button>
          </p>
        ) : tasks.length ? (
          <div className="space-y-3">
            {tasks.map((task) => (
              <TaskListItem
                key={task.id}
                task={task}
                onStatusChange={(item, status) => void changeStatus(item, status)}
                onEdit={(item) => {
                  setEditingTask(item);
                  setDialogOpen(true);
                }}
                onDelete={(item) => setTaskAction({ task: item, action: "delete" })}
                onLeave={(item) => setTaskAction({ task: item, action: "leave" })}
                canLeave={isTaskAssignedToUser(task, userId)}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={<ListTodo size={22} />}
            title="No tasks yet"
            description="Break your project into small, clear next steps."
            action={
              <Button onClick={() => setDialogOpen(true)}>
                <Plus size={16} /> Add the first task
              </Button>
            }
          />
        )}
      </div>

      {dialogOpen && (
        <TaskFormDialog
          task={editingTask}
          projectDueDate={project.dueDate}
          onClose={() => {
            setDialogOpen(false);
            setEditingTask(null);
          }}
          onSave={saveTask}
        />
      )}
      {taskAction && (
        <TaskNameConfirmationDialog
          taskName={taskAction.task.title}
          action={taskAction.action}
          submitting={taskActionPending}
          onCancel={() => {
            if (!taskActionPending) setTaskAction(null);
          }}
          onConfirm={confirmTaskAction}
        />
      )}
    </section>
  );
}
