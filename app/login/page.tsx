import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AuthCard from "@/features/auth/components/AuthCard";
import LoginForm from "@/features/auth/components/LoginForm";
import requireCurrentUser from "@/features/users/server/require-current-user";

export const metadata: Metadata = {
  title: "Log in — Progress",
};

export const instant = false;

export default async function Page() {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt");

  if (token) {
    const user = await requireCurrentUser();
    redirect(user.isVerified ? "/home" : "/verify-email");
  }

  return (
    <AuthCard
      eyebrow="welcome back"
      title="Continue your Progress"
      subtitle="Pick up where you left off and keep moving toward your goals."
      footer={
        <>
          New to Progress?{" "}
          <Link
            href="/signup"
            className="text-(--secondary) hover:text-(--primary) transition-colors"
          >
            Create an account
          </Link>
        </>
      }
    >
      <LoginForm />
    </AuthCard>
  );
}
