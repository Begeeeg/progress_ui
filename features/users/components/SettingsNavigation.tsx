"use client";

import { useEffect } from "react";
import { Globe2, LockKeyhole, ShieldAlert, UserRound } from "lucide-react";

export const settingsSections = [
  {
    id: "personal-information",
    label: "Personal information",
    description: "Name and username",
    icon: UserRound,
  },
  {
    id: "change-password",
    label: "Change password",
    description: "Keep your account secure",
    icon: LockKeyhole,
  },
  {
    id: "connected-accounts",
    label: "Connected accounts",
    description: "Manage linked profiles",
    icon: Globe2,
  },
  {
    id: "delete-account",
    label: "Delete account",
    description: "Permanently remove your account",
    icon: ShieldAlert,
  },
];

export type SettingsSectionId = (typeof settingsSections)[number]["id"];

export default function SettingsNavigation({
  activeSection,
  onSectionChange,
}: {
  activeSection: SettingsSectionId;
  onSectionChange: (section: SettingsSectionId) => void;
}) {
  useEffect(() => {
    const targets = settingsSections
      .map(({ id }) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    if (!("IntersectionObserver" in window) || targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        const firstVisibleId = visibleSections[0]?.target.id;
        if (firstVisibleId) {
          onSectionChange(firstVisibleId as SettingsSectionId);
        }
      },
      { rootMargin: "-18% 0px -65% 0px", threshold: 0 },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [onSectionChange]);

  return (
    <nav aria-label="Settings sections">
      <p className="mb-3 hidden px-3 text-xs font-bold uppercase tracking-[0.14em] text-ink-dim lg:block">
        Settings menu
      </p>
      <ul className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0">
        {settingsSections.map(({ id, label, description, icon: Icon }, index) => {
          const active = activeSection === id;
          return (
            <li key={id} className="shrink-0 lg:shrink">
              <button
                type="button"
                aria-current={active ? "page" : undefined}
                aria-pressed={active}
                onClick={() => onSectionChange(id)}
                className={`group flex min-h-12 items-center gap-3 rounded-2xl border px-3 py-2.5 text-left transition lg:w-full lg:border-transparent ${
                  active
                    ? "border-(--secondary)/15 bg-(--secondary)/8 text-(--secondary) lg:border-(--secondary)/15"
                    : "border-line bg-surface text-ink-dim hover:border-(--secondary)/20 hover:bg-surface"
                }`}
              >
                <span
                  className={`flex size-9 shrink-0 items-center justify-center rounded-xl transition ${
                    active
                      ? "bg-(--secondary)/10 text-(--secondary)"
                      : "bg-surface-soft text-ink-dim group-hover:text-(--secondary)"
                  }`}
                >
                  <Icon size={17} />
                </span>
                <span className="min-w-0 lg:block">
                  <span className="block whitespace-nowrap text-sm font-semibold">
                    {label}
                  </span>
                  <span className="hidden truncate text-xs text-ink-dim lg:block">
                    {description}
                  </span>
                </span>
                <span className="ml-auto hidden text-xs font-semibold text-ink-dim lg:block">
                  0{index + 1}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      <div className="mt-6 hidden rounded-2xl border border-line bg-surface p-4 lg:block">
        <div className="flex size-9 items-center justify-center rounded-xl bg-(--secondary)/10 text-(--secondary)">
          <LockKeyhole size={17} />
        </div>
        <p className="mt-3 text-sm font-semibold text-ink">
          Your account, your way
        </p>
        <p className="mt-1 text-xs leading-5 text-ink-dim">
          Keep your details up to date and your sign-in secure.
        </p>
      </div>
    </nav>
  );
}
