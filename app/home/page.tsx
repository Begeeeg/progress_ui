import HomeHeader from "@/pages/Home/HomeHeader";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Progress",
};

export const instant = false;

export default async function HomePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt"); // match your actual cookie name

  if (!token) {
    redirect("/login");
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/identity/user/me`,
    {
      headers: { Cookie: cookieStore.toString() },
      cache: "no-store",
    },
  );

  if (!res.ok) {
    redirect("/login");
  }

  return (
    <>
      <HomeHeader />
    </>
  );
}
