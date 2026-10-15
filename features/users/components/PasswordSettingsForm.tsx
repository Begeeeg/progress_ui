"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/shared/components/ui/Button";
import { FormField, TextInput } from "@/shared/components/ui/FormField";
import { updatePassword } from "../api/user.api";

export default function PasswordSettingsForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (newPassword !== confirmNewPassword) {
      toast.error("The new passwords do not match.");
      return;
    }
    setSaving(true);
    try {
      const result = await updatePassword({
        currentPassword,
        newPassword,
        confirmNewPassword,
      });
      toast.success(result.message || "Password updated.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (cause) {
      toast.error(cause instanceof Error ? cause.message : "Could not update password.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <FormField label="Current password" id="current-password">
        <TextInput
          id="current-password"
          type="password"
          autoComplete="current-password"
          value={currentPassword}
          onChange={(event) => setCurrentPassword(event.target.value)}
          required
        />
      </FormField>
      <FormField
        label="New password"
        id="new-password"
        hint="At least 8 characters, including uppercase, lowercase, and a number."
      >
        <TextInput
          id="new-password"
          type="password"
          autoComplete="new-password"
          minLength={8}
          value={newPassword}
          onChange={(event) => setNewPassword(event.target.value)}
          required
        />
      </FormField>
      <FormField label="Confirm new password" id="confirm-new-password">
        <TextInput
          id="confirm-new-password"
          type="password"
          autoComplete="new-password"
          value={confirmNewPassword}
          onChange={(event) => setConfirmNewPassword(event.target.value)}
          required
        />
      </FormField>
      <div className="flex justify-end">
        <Button type="submit" disabled={saving}>
          {saving ? "Updating..." : "Update password"}
        </Button>
      </div>
    </form>
  );
}
