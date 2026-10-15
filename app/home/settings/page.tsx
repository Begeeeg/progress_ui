import type { Metadata } from "next";
import requireCurrentUser from "@/features/users/server/require-current-user";
import AccountSettingsPageContent from "@/features/users/components/AccountSettingsPageContent";

export const metadata: Metadata = { title: "Settings — Progress" };

export default async function SettingsPage() {
  const user = await requireCurrentUser();
  return <AccountSettingsPageContent user={user} />;
}
