"use client";

import { useEffect, useState } from "react";
import {
  Globe2,
  LoaderCircle,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/shared/components/ui/Button";
import Modal from "@/shared/components/ui/Modal";
import { FormField, TextInput } from "@/shared/components/ui/FormField";
import EmptyState from "@/shared/components/ui/EmptyState";
import ConnectedAccountCard from "./ConnectedAccountCard";
import ProviderLogo from "./ProviderLogo";
import {
  connectAccount,
  disconnectAccount,
  getConnectedAccounts,
} from "../api/account.api";
import type {
  AccountProvider,
  ConnectedAccount,
} from "../types/account.types";

const providerDetails: Record<
  AccountProvider,
  { title: string; description: string }
> = {
  github: {
    title: "GitHub",
    description: "Link your developer profile and project repositories.",
  },
  google: {
    title: "Google",
    description: "Connect your Google account.",
  },
  linkedin: {
    title: "LinkedIn",
    description: "Connect your professional profile.",
  },
  facebook: {
    title: "Facebook",
    description: "Connect your Facebook profile.",
  },
};

const providers = Object.keys(providerDetails) as AccountProvider[];

export default function ConnectedAccounts() {
  const [accounts, setAccounts] = useState<ConnectedAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [disconnecting, setDisconnecting] = useState<AccountProvider | null>(
    null,
  );
  const [providerToDisconnect, setProviderToDisconnect] =
    useState<AccountProvider | null>(null);
  const [password, setPassword] = useState("");

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
              : "Could not load linked accounts.",
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

  async function handleDisconnect(provider: AccountProvider) {
    setDisconnecting(provider);
    try {
      await disconnectAccount(provider, password);
      setAccounts((current) =>
        current.filter((account) => account.provider !== provider),
      );
      toast.success(`${providerDetails[provider].title} disconnected.`);
      setProviderToDisconnect(null);
      setPassword("");
    } catch (cause) {
      toast.error(
        cause instanceof Error
          ? cause.message
          : "Could not disconnect account.",
      );
    } finally {
      setDisconnecting(null);
    }
  }

  if (loading) {
    return (
      <div
        role="status"
        className="flex items-center gap-2 py-8 text-sm text-ink-dim"
      >
        <LoaderCircle size={17} className="animate-spin" />
        Loading connected accounts...
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

  const connectedProviders = new Set(accounts.map((account) => account.provider));
  const availableProviders = providers.filter(
    (provider) => !connectedProviders.has(provider),
  );

  return (
    <div className="space-y-7">
      {accounts.length > 0 ? (
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-ink-dim">
            Connected profiles
          </h3>
          {accounts.map((account) => (
            <ConnectedAccountCard
              key={account.id}
              account={account}
              disconnecting={disconnecting === account.provider}
              onDisconnect={() => setProviderToDisconnect(account.provider)}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<Globe2 size={20} />}
          title="No accounts connected"
          description="Link an external profile to make it visible on your Progress profile."
        />
      )}

      {availableProviders.length > 0 && (
        <div className="space-y-3">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-ink-dim">
              {accounts.length > 0 ? "Connect another account" : "Available accounts"}
            </h3>
            <p className="mt-1 text-sm text-ink-dim">
              Choose a service to link to your profile.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {availableProviders.map((provider) => {
              const details = providerDetails[provider];
              return (
                <article
                  key={provider}
                  className="flex items-center justify-between gap-3 rounded-2xl border border-line bg-canvas p-4"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-line bg-white">
                      <ProviderLogo provider={provider} size={24} />
                    </span>
                    <div className="min-w-0">
                      <h4 className="text-sm font-semibold text-ink">
                        {details.title}
                      </h4>
                      <p className="mt-0.5 truncate text-xs text-ink-dim">
                        {details.description}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => connectAccount(provider)}
                  >
                    Connect
                  </Button>
                </article>
              );
            })}
          </div>
        </div>
      )}
      {providerToDisconnect && (
        <Modal
          title={`Disconnect ${providerDetails[providerToDisconnect].title}`}
          description="Confirm your Progress password to remove this connected account."
          onClose={() => {
            if (disconnecting) return;
            setProviderToDisconnect(null);
            setPassword("");
          }}
        >
          <form
            onSubmit={(event) => {
              event.preventDefault();
              void handleDisconnect(providerToDisconnect);
            }}
            className="space-y-5"
          >
            <FormField
              label="Progress account password"
              id="disconnect-account-password"
              hint="This is the password you use to sign in to Progress."
            >
              <TextInput
                id="disconnect-account-password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                autoFocus
              />
            </FormField>
            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  setProviderToDisconnect(null);
                  setPassword("");
                }}
                disabled={Boolean(disconnecting)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="danger"
                disabled={Boolean(disconnecting) || !password}
              >
                {disconnecting ? (
                  <>
                    <LoaderCircle size={15} className="animate-spin" />
                    Disconnecting...
                  </>
                ) : (
                  "Confirm disconnect"
                )}
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
