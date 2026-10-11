"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function HomeHeader() {
  const router = useRouter();

  async function handleLogout() {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/identity/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      router.push("/home");
      router.refresh();
    }
  }

  const handleCreate = () => {
    router.push("/list");
  };

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-canvas/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/home" className="font-display text-xl font-bold text-ink">
          Group<span className="text-emerald">Pad</span>
        </Link>

        <div className="flex items-center gap-4">
          <button
            onClick={handleCreate}
            className="rounded-md bg-emerald px-4 py-2 font-body text-sm font-semibold text-canvas transition-colors hover:bg-emerald-dark"
          >
            +
          </button>

          <button
            onClick={handleLogout}
            className="rounded-md bg-emerald px-4 py-2 font-body text-sm font-semibold text-canvas transition-colors hover:bg-emerald-dark"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
