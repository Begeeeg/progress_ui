import AuthCard from "@/features/auth/AuthCard";
import SignupForm from "@/features/auth/SignupForm";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Sign up — Progress",
};

export const instant = false;

export default async function SignupPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt");

  if (token) {
    redirect("/home");
  }

  return (
    <AuthCard
      eyebrow="your goals · your growth"
      title="Start making Progress"
      subtitle="Create your account and turn your goals into achievements."
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
