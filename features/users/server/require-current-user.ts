import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getApiUrl } from "@/shared/lib/api-client";
import type { UserProfile } from "../types/user.types";

export default async function requireCurrentUser(): Promise<UserProfile> {
  const cookieStore = await cookies();
  if (!cookieStore.get("jwt")) redirect("/login");

  let response: Response;
  try {
    response = await fetch(getApiUrl("identity/user/me"), {
      headers: { Cookie: cookieStore.toString() },
      cache: "no-store",
    });
  } catch {
    throw new Error("Could not connect to the Progress API.");
  }

  if (response.status === 401 || response.status === 403) redirect("/login");
  if (!response.ok) {
    throw new Error(`Could not load your account (${response.status}).`);
  }

  const payload = (await response.json()) as {
    data?: UserProfile;
  };
  if (!payload.data?.id) {
    throw new Error("The Progress API returned an invalid profile.");
  }
  if (!payload.data.isVerified) redirect("/verify-email");
  return payload.data;
}
