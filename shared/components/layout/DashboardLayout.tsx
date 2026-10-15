import type { ReactNode } from "react";
import HomeHeader from "@/features/home/components/HomeHeader";

export default function DashboardLayout({
  children,
  username,
}: {
  children: ReactNode;
  username?: string;
}) {
  return (
    <div className="min-h-screen bg-canvas">
      <HomeHeader username={username} />
      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        {children}
      </main>
    </div>
  );
}
