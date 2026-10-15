"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/shared/components/ui/Button";
import AuthInput from "./AuthInput";
import { loginUser } from "../api/auth.api";

export default function LoginForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }));
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    try {
      const response = await loginUser(formData);
      toast.success(response.message || "Logged in successfully.");
      router.replace(
        response.data?.isVerified === false ? "/verify-email" : "/home",
      );
    } catch (cause) {
      toast.error(cause instanceof Error ? cause.message : "Log in failed.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <AuthInput
        id="email"
        label="Email"
        type="email"
        autoComplete="email"
        placeholder="you@example.com"
        value={formData.email}
        onChange={handleChange}
      />
      <AuthInput
        id="password"
        label="Password"
        type="password"
        autoComplete="current-password"
        placeholder="Enter your password"
        minLength={8}
        value={formData.password}
        onChange={handleChange}
      />
      <Button type="submit" disabled={submitting} className="w-full">
        {submitting ? "Logging in..." : "Log in"}
      </Button>
    </form>
  );
}
