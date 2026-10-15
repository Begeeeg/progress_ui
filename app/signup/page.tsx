import AuthCard from "@/features/auth/components/AuthCard";
import SignupForm from "@/features/auth/components/SignupForm";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import requireCurrentUser from "@/features/users/server/require-current-user";

export const metadata: Metadata = {
  title: "Sign up — Progress",
};

export const instant = false;

export default async function SignupPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt");

  if (token) {
    const user = await requireCurrentUser();
    redirect(user.isVerified ? "/home" : "/verify-email");
  }

  return (
    <AuthCard
      eyebrow="your goals · your growth"
      title="Start making Progress"
      subtitle="Create your account, then verify your email to open your workspace."
      footer={
        <>
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-(--secondary) hover:text-(--primary) transition-colors"
          >
            Log in
          </Link>
        </>
      }
    >
      <SignupForm />
    </AuthCard>
  );
}
