import type { Task } from "../types/task.types";

export function isTaskAssignedToUser(task: Task, userId: string) {
  return task.assignedTo?.some((assignedId) => assignedId === userId) ?? false;
}
