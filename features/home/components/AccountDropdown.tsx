"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/features/auth/api/auth.api";
import { ChevronDown, LogOut, Settings, UserRound } from "lucide-react";
import { toast } from "sonner";

export default function AccountDropdown({ username }: { username?: string }) {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  async function handleLogout() {
    setIsDropdownOpen(false);

    try {
      await logoutUser();
      router.replace("/");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Could not log out.",
      );
    }
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsDropdownOpen((prev) => !prev)}
        aria-expanded={isDropdownOpen}
        aria-haspopup="menu"
        aria-label="Open account menu"
        className="group flex items-center gap-2 rounded-full p-1.5 transition hover:bg-surface-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--secondary)/50"
      >
        <span className="relative block size-10 overflow-hidden rounded-full border border-line bg-surface shadow-sm transition group-hover:border-(--secondary)/40">
          <Image
            src="/icons/user.png"
            alt=""
            width={40}
            height={40}
            className="size-full object-cover"
          />
        </span>
        <ChevronDown
          size={16}
          className={`mr-1 text-ink-dim transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      {isDropdownOpen && (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-64 overflow-hidden rounded-2xl border border-line bg-surface p-1.5 shadow-xl"
        >
          <div className="flex items-center gap-3 rounded-xl px-3 py-3">
            <Image
              src="/icons/user.png"
              alt=""
              width={40}
              height={40}
              className="size-10 rounded-full border border-line object-cover"
            />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-ink">
                {username ? `@${username}` : "Your account"}
              </p>
            </div>
          </div>
          <div className="my-1 border-t border-line" />
          <Link
            href="/home/profile"
            role="menuitem"
            onClick={() => setIsDropdownOpen(false)}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-ink transition-colors hover:bg-surface-soft"
          >
            <UserRound size={16} /> Profile
          </Link>

          <Link
            href="/home/settings"
            role="menuitem"
            onClick={() => setIsDropdownOpen(false)}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-ink transition-colors hover:bg-surface-soft"
          >
            <Settings size={16} /> Settings
          </Link>

          <div className="my-1 border-t border-line" />

          <button
            type="button"
            role="menuitem"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-red-600 transition-colors hover:bg-red-500/10"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      )}
    </div>
  );
}
