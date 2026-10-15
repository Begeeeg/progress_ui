export type ProjectType = "personal" | "team";
export type ProjectStatus = "active" | "inactive" | "achieved";

export interface ProjectMember {
  _id?: string;
  id?: string;
  username?: string;
}

export interface Project {
  id: string;
  userId: string | { _id: string; username?: string };
  title: string;
  type: ProjectType;
  document?: string;
  githubRepo?: string;
  status: ProjectStatus;
  dueDate: string;
  members?: Array<string | ProjectMember>;
  remainingDays: number;
  isOwner: boolean;
}

export interface ProjectInput {
  title: string;
  type: ProjectType;
  documentation?: string;
  githubRepo?: string;
  dueDate?: string;
  status?: ProjectStatus;
  members?: string[];
}
