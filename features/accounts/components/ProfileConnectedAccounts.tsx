"use client";

import { useEffect, useState } from "react";
import { Globe2, LoaderCircle } from "lucide-react";
import EmptyState from "@/shared/components/ui/EmptyState";
import { getConnectedAccounts } from "../api/account.api";
import type { ConnectedAccount } from "../types/account.types";
import ConnectedAccountCard from "./ConnectedAccountCard";

export default function ProfileConnectedAccounts() {
  const [accounts, setAccounts] = useState<ConnectedAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    getConnectedAccounts()
      .then((result) => {
        if (active) setAccounts(result);
      })
      .catch((cause: unknown) => {
        if (active) {
          setError(
            cause instanceof Error
              ? cause.message
              : "Could not load connected profiles.",
          );
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return (
      <div
        role="status"
        className="flex items-center gap-2 py-8 text-sm text-ink-dim"
      >
        <LoaderCircle size={17} className="animate-spin" />
        Loading connected profiles...
      </div>
    );
  }

  if (error) {
    return (
      <p
        role="alert"
        className="rounded-xl bg-red-500/5 p-4 text-sm text-red-700"
      >
        {error}
      </p>
    );
  }

  if (accounts.length === 0) {
    return (
      <EmptyState
        icon={<Globe2 size={20} />}
        title="No profiles connected"
        description="Connected external profiles will appear here."
      />
    );
  }

  return (
    <div className="space-y-3">
      {accounts.map((account) => (
        <ConnectedAccountCard key={account.id} account={account} />
      ))}
    </div>
  );
}
