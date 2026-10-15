import { ExternalLink } from "lucide-react";
import ConnectedAccountAvatar from "@/features/accounts/components/ConnectedAccountAvatar";
import type { PublicProfile } from "../types/search.types";

const providerNames = {
  github: "GitHub",
  google: "Google",
  linkedin: "LinkedIn",
  facebook: "Facebook",
} as const;

export default function PublicLinkedAccountCard({
  account,
}: {
  account: PublicProfile["linkedAccounts"][number];
}) {
  return (
    <article className="flex min-w-0 items-center gap-3 rounded-2xl border border-line bg-canvas p-4">
      <ConnectedAccountAvatar
        provider={account.provider}
        avatarUrl={account.avatarUrl}
      />
      <div className="min-w-0 flex-1">
        <h3 className="text-sm font-semibold text-ink">
          {providerNames[account.provider]}
        </h3>
        <p className="mt-1 truncate text-sm text-ink-dim">
          {account.username ?? "Connected profile"}
        </p>
        <p className="mt-1 text-xs text-ink-dim">
          Linked{" "}
          {new Date(account.createdAt).toLocaleDateString(undefined, {
            month: "short",
            year: "numeric",
          })}
        </p>
      </div>
      {account.profileUrl && (
        <a
          href={account.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View ${providerNames[account.provider]} profile`}
          className="flex size-9 shrink-0 items-center justify-center rounded-xl text-(--secondary) transition hover:bg-(--secondary)/10"
        >
          <ExternalLink size={17} />
        </a>
      )}
    </article>
  );
}
