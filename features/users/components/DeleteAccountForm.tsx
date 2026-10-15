"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/shared/components/ui/Button";
import { FormField, TextInput } from "@/shared/components/ui/FormField";
import { deleteUser } from "../api/user.api";

export default function DeleteAccountForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [deleting, setDeleting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!window.confirm("This permanently deletes your account and projects. Continue?")) {
      return;
    }
    setDeleting(true);
    try {
      const result = await deleteUser({ password });
      toast.success(result.message || "Account deleted.");
      router.replace("/");
      router.refresh();
    } catch (cause) {
      toast.error(cause instanceof Error ? cause.message : "Could not delete your account.");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-2xl border border-red-500/20 bg-red-500/[0.03] p-5"
    >
      <div>
        <h3 className="font-semibold text-ink">Delete account</h3>
        <p className="mt-1 text-sm leading-6 text-ink-dim">
          This removes your Progress profile and sign-in record. The current
          system may retain connected-account, project, and task records. Read
          the{" "}
          <a
            href="/privacy-policy"
            className="font-medium text-(--secondary) hover:underline"
          >
            Privacy Policy
          </a>{" "}
          and contact the developer if you need those records removed too.
        </p>
      </div>
      <FormField label="Confirm with your password" id="delete-password">
        <TextInput
          id="delete-password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
      </FormField>
      <Button type="submit" variant="danger" disabled={deleting}>
        {deleting ? "Deleting..." : "Permanently delete account"}
      </Button>
    </form>
  );
}
