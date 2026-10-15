import { AtSign, CalendarDays, UserRound } from "lucide-react";
import type { PublicProfile } from "../types/search.types";
import PublicLinkedAccountCard from "./PublicLinkedAccountCard";
import PublicProfileAvatar from "./PublicProfileAvatar";

export default function PublicProfileView({
  profile,
}: {
  profile: PublicProfile;
}) {
  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-3xl border border-line bg-surface">
        <div className="h-36 bg-(image:--gradient-primary) sm:h-44" />
        <div className="px-5 pb-7 sm:px-8">
          <div className="-mt-12">
            <PublicProfileAvatar avatarUrl={profile.avatarUrl} />
          </div>
          <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <h2 className="text-2xl font-bold tracking-tight text-ink">
                {profile.givenname} {profile.surname}
              </h2>
              <p className="mt-1 text-sm text-ink-dim">@{profile.username}</p>
            </div>
            <span className="inline-flex items-center gap-2 self-start rounded-full border border-line bg-canvas px-3 py-2 text-xs font-medium text-ink-dim">
              <UserRound size={14} aria-hidden="true" />
              Public profile
            </span>
          </div>

          <div className="mt-7 grid gap-3 border-t border-line pt-5 sm:grid-cols-2">
            <div className="flex items-center gap-3 rounded-2xl bg-canvas p-4">
              <AtSign size={18} className="shrink-0 text-(--secondary)" />
              <div className="min-w-0">
                <p className="text-xs text-ink-dim">Username</p>
                <p className="mt-1 truncate text-sm font-medium text-ink">
                  @{profile.username}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl bg-canvas p-4">
              <CalendarDays
                size={18}
                className="shrink-0 text-(--secondary)"
              />
              <div>
                <p className="text-xs text-ink-dim">Member since</p>
                <p className="mt-1 text-sm font-medium text-ink">
                  {new Date(profile.createdAt).toLocaleDateString(undefined, {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-line bg-surface p-5 sm:p-8">
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-ink">Connected accounts</h2>
          <p className="mt-1 text-sm text-ink-dim">
            Public profiles this person has chosen to connect.
          </p>
        </div>
        {profile.linkedAccounts.length > 0 ? (
          <div className="grid gap-3 md:grid-cols-2">
            {profile.linkedAccounts.map((account) => (
              <PublicLinkedAccountCard
                key={account.provider}
                account={account}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-line bg-canvas px-4 py-8 text-center">
            <p className="text-sm font-medium text-ink">
              No connected accounts
            </p>
            <p className="mt-1 text-sm text-ink-dim">
              This user has not shared any connected profiles.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
