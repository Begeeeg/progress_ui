import type { Metadata } from "next";
import VerifyEmailScreen from "@/features/auth/components/VerifyEmailScreen";

export const metadata: Metadata = {
  title: "Verify your email — Progress",
};

export const instant = false;

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string | string[] }>;
}) {
  const params = await searchParams;
  const token = Array.isArray(params.token) ? params.token[0] : params.token;

  return <VerifyEmailScreen verificationToken={token ?? null} />;
}
