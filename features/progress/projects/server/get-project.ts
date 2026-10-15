import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { getApiUrl } from "@/shared/lib/api-client";
import type { ApiResponse } from "@/shared/lib/api-client";
import type { Project } from "../types/project.types";

export default async function getProject(projectId: string): Promise<Project> {
  const cookieStore = await cookies();
  if (!cookieStore.get("jwt")) redirect("/login");

  let response: Response;
  try {
    response = await fetch(
      getApiUrl(`progress/project/${encodeURIComponent(projectId)}`),
      {
        headers: { Cookie: cookieStore.toString() },
        cache: "no-store",
      },
    );
  } catch {
    throw new Error("Could not connect to the Progress API.");
  }

  if (response.status === 401 || response.status === 403) redirect("/login");
  if (response.status === 404) notFound();
  if (!response.ok) {
    throw new Error(`Could not load this project (${response.status}).`);
  }

  const payload = (await response.json()) as ApiResponse<Project>;
  if (!payload.data?.id) {
    throw new Error("The Progress API returned an invalid project.");
  }
  return payload.data;
}
