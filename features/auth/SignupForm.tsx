"use client";

import { useState } from "react";
import AuthInput from "./AuthInput";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function SignupForm() {
  const [formData, setFormData] = useState({
    username: "",
    givenname: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/identity/auth/register`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formData.username,
            givenname: formData.givenname,
            surname: formData.surname,
            email: formData.email,
            password: formData.password,
            confirmPassword: formData.confirmPassword,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }

      toast.success(data.message || "Account created successfully!");
      router.push("/home");
    } catch (error) {
      console.error(error);
      toast.error(error instanceof Error ? error.message : "Signup failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <AuthInput
        id="username"
        label="Username"
        autoComplete="username"
        placeholder="Enter your username"
        value={formData.username}
        onChange={handleChange}
      />

      <AuthInput
        id="givenname"
        label="Given Name"
        autoComplete="givenname"
        placeholder="Enter your given name"
        value={formData.givenname}
        onChange={handleChange}
      />

      <AuthInput
        id="surname"
        label="Surname"
        autoComplete="surname"
        placeholder="Enter your surname"
        value={formData.surname}
        onChange={handleChange}
      />

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

      <AuthInput
        id="confirmPassword"
        label="Confirm Password"
        type="password"
        autoComplete="new-password"
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChange={handleChange}
      />

      <label className="flex items-start gap-2 font-body text-xs text-ink-dim">
        <input
          type="checkbox"
          name="terms"
          required
          className="mt-0.5 h-4 w-4 rounded border-line bg-surface-soft accent-emerald"
        />
        I agree to the Terms of Service and Privacy Policy.
      </label>

      <button
        type="submit"
        disabled={submitting}
        className="rounded-md bg-emerald px-4 py-2.5 font-body font-semibold text-canvas transition-colors hover:bg-emerald-dark disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? "Creating your account..." : "Create account"}
      </button>
    </form>
  );
}
