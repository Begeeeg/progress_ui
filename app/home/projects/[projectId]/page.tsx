import type { Metadata } from "next";
import getProject from "@/features/progress/projects/server/get-project";
import ProjectDetailPage from "@/features/progress/projects/components/ProjectDetailPage";
import requireCurrentUser from "@/features/users/server/require-current-user";

export const metadata: Metadata = { title: "Project — Progress" };

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  const [user, project] = await Promise.all([
    requireCurrentUser(),
    getProject(projectId),
  ]);
  return (
    <ProjectDetailPage
      project={project}
      userName={user.givenname}
      userId={user.id}
    />
  );
}
