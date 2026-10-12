"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import AuthInput from "./AuthInput";
import { toast } from "sonner";
import { buttonVariants } from "@/shared/components/ui/Button";
import { loginUser } from "./api/auth.api";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setSubmitting(true);

    try {
      const data = await loginUser(formData);

      toast.success(data.message || "Log in successfully!");
      router.replace(data.data?.isVerified === false ? "/verify-email" : "/home");
    } catch (error) {
      console.error(error);
      toast.error(error instanceof Error ? error.message : "Log in failed");
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
        autoComplete="new-password"
        placeholder="Enter Password"
        value={formData.password}
        onChange={handleChange}
      />

      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 font-body text-sm text-ink-dim">
          <input
            type="checkbox"
            name="remember"
            className="h-4 w-4 rounded border-line bg-surface-soft accent-emerald"
          />
          Remember me
        </label>
        <a
          href="#"
          className="font-body text-sm text-emerald hover:text-emerald-dark"
        >
          Forgot password?
        </a>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className={buttonVariants.default}
      >
        {submitting ? "Logging in…" : "Log in"}
      </button>
    </form>
  );
}
