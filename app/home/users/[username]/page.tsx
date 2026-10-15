import type { Metadata } from "next";
import requireCurrentUser from "@/features/users/server/require-current-user";
import PublicProfilePageContent from "@/features/users/components/PublicProfilePageContent";

export const metadata: Metadata = { title: "Public profile — Progress" };

export default async function PublicUserProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const [{ username }, viewer] = await Promise.all([
    params,
    requireCurrentUser(),
  ]);

  return (
    <PublicProfilePageContent
      username={username}
      viewerUsername={viewer.username}
    />
  );
}
