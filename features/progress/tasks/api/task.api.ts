import { apiRequest } from "@/shared/lib/api-client";
import type { Task, TaskInput, TaskStatus } from "../types/task.types";

function taskPath(projectId: string, taskId?: string) {
  const path = `progress/project/${encodeURIComponent(projectId)}/task`;
  return taskId ? `${path}/${encodeURIComponent(taskId)}` : path;
}

export async function getTasks(projectId: string) {
  const response = await apiRequest<Task[]>(taskPath(projectId));
  return response.data;
}

export async function createTask(projectId: string, payload: TaskInput) {
  return apiRequest<Task>(taskPath(projectId), {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updateTask(
  projectId: string,
  taskId: string,
  payload: Partial<TaskInput>,
) {
  return apiRequest<Task>(taskPath(projectId, taskId), {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export async function setTaskStatus(
  projectId: string,
  taskId: string,
  status: TaskStatus,
) {
  return updateTask(projectId, taskId, { status });
}

export async function deleteTask(
  projectId: string,
  taskId: string,
  taskName: string,
) {
  return apiRequest<null>(
    taskPath(projectId, taskId),
    {
      method: "DELETE",
      body: JSON.stringify({ taskName }),
    },
    false,
  );
}

export async function leaveTask(
  projectId: string,
  taskId: string,
  taskName: string,
) {
  return apiRequest<null>(
    `${taskPath(projectId, taskId)}/leave`,
    {
      method: "DELETE",
      body: JSON.stringify({ taskName }),
    },
    false,
  );
}
