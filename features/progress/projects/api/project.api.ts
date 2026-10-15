import { apiRequest } from "@/shared/lib/api-client";
import type {
  Project,
  ProjectInput,
  ProjectStatus,
  ProjectType,
} from "../types/project.types";

const projectPath = "progress/project";

export async function getProjects() {
  const response = await apiRequest<Project[]>(projectPath);
  return response.data;
}

export async function getProject(projectId: string) {
  const response = await apiRequest<Project>(
    `${projectPath}/${encodeURIComponent(projectId)}`,
  );
  return response.data;
}

export async function searchProjects(filters: {
  title?: string;
  type?: ProjectType | "";
  status?: ProjectStatus | "";
}) {
  const params = new URLSearchParams();
  if (filters.title?.trim()) params.set("title", filters.title.trim());
  if (filters.type) params.set("type", filters.type);
  if (filters.status) params.set("status", filters.status);

  const query = params.toString();
  const response = await apiRequest<Project[]>(
    `${projectPath}/search${query ? `?${query}` : ""}`,
  );
  return response.data;
}

export async function createProject(payload: ProjectInput) {
  return apiRequest<Project>(projectPath, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updateProject(projectId: string, payload: ProjectInput) {
  return apiRequest<Project>(`${projectPath}/${encodeURIComponent(projectId)}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export async function deleteProject(projectId: string, projectName: string) {
  return apiRequest<null>(`${projectPath}/${encodeURIComponent(projectId)}`, {
    method: "DELETE",
    body: JSON.stringify({ projectName }),
  }, false);
}

export async function leaveProject(projectId: string, projectName: string) {
  return apiRequest<null>(
    `${projectPath}/${encodeURIComponent(projectId)}/leave`,
    {
      method: "DELETE",
      body: JSON.stringify({ projectName }),
    },
    false,
  );
}
