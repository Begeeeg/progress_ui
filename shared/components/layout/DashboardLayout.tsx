import type { ReactNode } from "react";
import HomeHeader from "@/features/home/components/HomeHeader";

export default function DashboardLayout({
  children,
  username,
  fillViewport = false,
}: {
  children: ReactNode;
  username?: string;
  fillViewport?: boolean;
}) {
  return (
    <div
      className={
        fillViewport
          ? "flex h-dvh flex-col overflow-hidden bg-canvas"
          : "min-h-screen bg-canvas"
      }
    >
      <div className="shrink-0">
        <HomeHeader username={username} />
      </div>
      <main
        className={`mx-auto w-full max-w-7xl px-4 lg:px-8 ${
          fillViewport
            ? "min-h-0 flex-1 py-4 sm:px-6"
            : "py-8 sm:px-6 sm:py-10"
        }`}
      >
        {children}
      </main>
    </div>
  );
}
