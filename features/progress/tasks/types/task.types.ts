export type TaskStatus = "pending" | "in_progress" | "completed";

export interface Task {
  id: string;
  projectId: string;
  title: string;
  notes?: string;
  status: TaskStatus;
  deadline: string;
  assignedTo?: string[];
  remainingDays: number;
}

export interface TaskInput {
  title: string;
  notes?: string;
  status?: TaskStatus;
  deadline: string;
  assignedTo?: string[];
}
