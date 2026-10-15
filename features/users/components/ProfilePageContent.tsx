import Link from "next/link";
import { ArrowLeft, AtSign, Mail, ShieldCheck, UserRound } from "lucide-react";
import DashboardLayout from "@/shared/components/layout/DashboardLayout";
import PageHeading from "@/shared/components/ui/PageHeading";
import { ButtonLink } from "@/shared/components/ui/Button";
import ProfileConnectedAccounts from "@/features/accounts/components/ProfileConnectedAccounts";
import type { UserProfile } from "../types/user.types";

export default function ProfilePageContent({ user }: { user: UserProfile }) {
  return (
    <DashboardLayout username={user.username}>
      <div className="space-y-8">
        <Link
          href="/home"
          className="inline-flex items-center gap-2 text-sm font-medium text-ink-dim hover:text-(--secondary)"
        >
          <ArrowLeft size={16} /> Back to workspace
        </Link>
        <PageHeading
          eyebrow="Your account"
          title="Profile"
          description="Your profile and the accounts you have connected to Progress."
          actions={
            <ButtonLink href="/home/settings" variant="secondary">
              Edit settings
            </ButtonLink>
          }
        />
        <section className="overflow-hidden rounded-3xl border border-line bg-surface">
          <div className="h-28 bg-(image:--gradient-primary)" />
          <div className="px-5 pb-6 sm:px-8">
            <div className="-mt-8 flex size-16 items-center justify-center rounded-2xl border-4 border-surface bg-surface-soft text-(--secondary)">
              <UserRound size={28} />
            </div>
            <div className="mt-4 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-ink">
                  {user.givenname} {user.surname}
                </h2>
                <p className="mt-1 text-sm text-ink-dim">@{user.username}</p>
              </div>
              {user.isVerified && (
                <span className="inline-flex items-center gap-1.5 self-start rounded-full bg-(--secondary)/10 px-3 py-1.5 text-xs font-semibold text-(--secondary)">
                  <ShieldCheck size={14} /> Verified account
                </span>
              )}
            </div>
            <div className="mt-6 grid gap-3 border-t border-line pt-5 sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-xl bg-canvas p-3.5">
                <AtSign size={17} className="text-(--secondary)" />
                <div>
                  <p className="text-xs text-ink-dim">Username</p>
                  <p className="mt-0.5 text-sm font-medium text-ink">@{user.username}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl bg-canvas p-3.5">
                <Mail size={17} className="text-(--secondary)" />
                <div className="min-w-0">
                  <p className="text-xs text-ink-dim">Email</p>
                  <p className="mt-0.5 truncate text-sm font-medium text-ink">{user.email}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="rounded-3xl border border-line bg-surface p-5 sm:p-8">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-ink">Connected accounts</h2>
            <p className="mt-1 text-sm text-ink-dim">
              External profiles linked to your Progress account.
            </p>
          </div>
          <ProfileConnectedAccounts />
        </section>
      </div>
    </DashboardLayout>
  );
}
