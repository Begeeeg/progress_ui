"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/shared/components/ui/Button";
import { FormField, TextInput } from "@/shared/components/ui/FormField";
import type { UserProfile } from "../types/user.types";
import { updateUserInfo } from "../api/user.api";

export default function ProfileSettingsForm({
  user,
}: {
  user: UserProfile;
}) {
  const [username, setUsername] = useState(user.username);
  const [givenname, setGivenname] = useState(user.givenname);
  const [surname, setSurname] = useState(user.surname);
  const [password, setPassword] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (
      username === user.username &&
      givenname === user.givenname &&
      surname === user.surname
    ) {
      toast.error("Change at least one profile field before saving.");
      return;
    }

    setSaving(true);
    try {
      await updateUserInfo({ username, givenname, surname, password });
      toast.success("Profile updated.");
      window.location.reload();
    } catch (cause) {
      toast.error(cause instanceof Error ? cause.message : "Could not update profile.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="First name" id="givenname">
          <TextInput
            id="givenname"
            value={givenname}
            onChange={(event) => setGivenname(event.target.value)}
            minLength={3}
            maxLength={15}
            required
          />
        </FormField>
        <FormField label="Last name" id="surname">
          <TextInput
            id="surname"
            value={surname}
            onChange={(event) => setSurname(event.target.value)}
            minLength={3}
            maxLength={15}
            required
          />
        </FormField>
      </div>
      <FormField label="Username" id="username">
        <TextInput
          id="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          minLength={3}
          maxLength={15}
          required
        />
      </FormField>
      <FormField
        label="Current password"
        id="profile-password"
        hint="Confirm your identity before changing account details."
      >
        <TextInput
          id="profile-password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
      </FormField>
      <div className="flex justify-end">
        <Button type="submit" disabled={saving}>
          {saving ? "Saving..." : "Save profile"}
        </Button>
      </div>
    </form>
  );
}
