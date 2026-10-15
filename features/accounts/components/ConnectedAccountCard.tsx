import {
  ExternalLink,
  LoaderCircle,
  Unplug,
} from "lucide-react";
import { Button } from "@/shared/components/ui/Button";
import ConnectedAccountAvatar from "./ConnectedAccountAvatar";
import type {
  AccountProvider,
  ConnectedAccount,
} from "../types/account.types";

const providerNames: Record<AccountProvider, string> = {
  github: "GitHub",
  google: "Google",
  linkedin: "LinkedIn",
  facebook: "Facebook",
};

export default function ConnectedAccountCard({
  account,
  disconnecting = false,
  onDisconnect,
}: {
  account: ConnectedAccount;
  disconnecting?: boolean;
  onDisconnect?: () => void;
}) {
  const displayName =
    account.username ?? account.email ?? account.providerAccountId;

  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-line bg-canvas p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-center gap-3">
        <ConnectedAccountAvatar
          provider={account.provider}
          avatarUrl={account.avatarUrl}
        />
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-sm font-semibold text-ink">
              {providerNames[account.provider]}
            </h3>
            <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
              Connected
            </span>
          </div>
          <p className="mt-1 truncate text-sm text-ink-dim">{displayName}</p>
          {account.email && account.username && (
            <p className="mt-0.5 truncate text-xs text-ink-dim">{account.email}</p>
          )}
          {account.profileUrl && (
            <a
              href={account.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex max-w-full items-center gap-1 truncate text-xs font-medium text-(--secondary) hover:underline"
            >
              <span className="truncate">{account.profileUrl}</span>
              <ExternalLink size={12} className="shrink-0" />
            </a>
          )}
        </div>
      </div>
      {onDisconnect && (
        <Button
          variant="secondary"
          size="sm"
          onClick={onDisconnect}
          disabled={disconnecting}
          className="shrink-0 self-start sm:self-center"
        >
          {disconnecting ? (
            <LoaderCircle size={14} className="animate-spin" />
          ) : (
            <Unplug size={14} />
          )}
          Disconnect
        </Button>
      )}
    </article>
  );
}
