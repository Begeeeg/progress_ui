import type { Metadata } from "next";
import requireCurrentUser from "@/features/users/server/require-current-user";
import ProfilePageContent from "@/features/users/components/ProfilePageContent";

export const metadata: Metadata = { title: "Profile — Progress" };

export default async function ProfilePage() {
  const user = await requireCurrentUser();
  return <ProfilePageContent user={user} />;
}
