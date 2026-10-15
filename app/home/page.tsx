import type { Metadata } from "next";
import requireCurrentUser from "@/features/users/server/require-current-user";
import DashboardLayout from "@/shared/components/layout/DashboardLayout";
import ProjectWorkspace from "@/features/progress/projects/components/ProjectWorkspace";

export const metadata: Metadata = {
  title: "Progress",
};

export const instant = false;

export default async function HomePage() {
  const user = await requireCurrentUser();

  return (
    <DashboardLayout username={user.username}>
      <ProjectWorkspace userName={user.givenname} />
    </DashboardLayout>
  );
}
