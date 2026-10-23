"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/shared/components/ui/Button";
import AuthInput from "./AuthInput";
import { registerUser } from "../api/auth.api";

const passwordRequirements = [
    { label: "At least 8 characters", test: (pw: string) => pw.length >= 8 },
    { label: "One uppercase letter", test: (pw: string) => /[A-Z]/.test(pw) },
    { label: "One lowercase letter", test: (pw: string) => /[a-z]/.test(pw) },
    { label: "One number", test: (pw: string) => /\d/.test(pw) },
];

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

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((previous) => ({
            ...previous,
            [event.target.name]: event.target.value,
        }));
    };

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }

        setSubmitting(true);
        try {
            const response = await registerUser(formData);
            toast.success(response.message || "Account created successfully.");
            router.replace("/verify-email");
        } catch (cause) {
            toast.error(
                cause instanceof Error ? cause.message : "Signup failed.",
            );
        } finally {
            setSubmitting(false);
        }
    }

    const requirementResults = passwordRequirements.map((req) => ({
        label: req.label,
        met: req.test(formData.password),
    }));

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <AuthInput
                id="username"
                label="Username"
                autoComplete="username"
                placeholder="Choose a username"
                minLength={3}
                maxLength={15}
                value={formData.username}
                onChange={handleChange}
            />
            <AuthInput
                id="givenname"
                label="Given name"
                autoComplete="given-name"
                placeholder="Your first name"
                minLength={3}
                maxLength={15}
                value={formData.givenname}
                onChange={handleChange}
            />
            <AuthInput
                id="surname"
                label="Surname"
                autoComplete="family-name"
                placeholder="Your last name"
                minLength={3}
                maxLength={15}
                value={formData.surname}
                onChange={handleChange}
            />
            <AuthInput
                id="email"
                label="Email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                title="Use a Gmail, Yahoo, or Outlook email address."
                value={formData.email}
                onChange={handleChange}
            />
            <AuthInput
                id="password"
                label="Password"
                type="password"
                autoComplete="new-password"
                placeholder="Create a password"
                minLength={8}
                pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+"
                title="Use at least 8 characters with an uppercase letter, lowercase letter, and number."
                value={formData.password}
                onChange={handleChange}
            />
            <ul className="space-y-1" aria-live="polite">
                {requirementResults.map(({ label, met }) => (
                    <li
                        key={label}
                        className={`flex items-center gap-2 text-xs transition-colors ${
                            met ? "text-green-500" : "text-ink-dim"
                        }`}
                    >
                        {met ? (
                            <svg
                                className="h-3.5 w-3.5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0L3.3 9.7a1 1 0 111.4-1.4l3.8 3.8 6.8-6.8a1 1 0 011.4 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        ) : (
                            <svg
                                className="h-3.5 w-3.5"
                                viewBox="0 0 20 20"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                aria-hidden="true"
                            >
                                <circle cx="10" cy="10" r="6" />
                            </svg>
                        )}
                        <span>{label}</span>
                        <span className="sr-only">
                            {met ? "(met)" : "(not met)"}
                        </span>
                    </li>
                ))}
            </ul>
            <AuthInput
                id="confirmPassword"
                label="Confirm password"
                type="password"
                autoComplete="new-password"
                placeholder="Enter your password again"
                minLength={8}
                value={formData.confirmPassword}
                onChange={handleChange}
            />
            <p className="text-xs leading-5 text-ink-dim">
                Only Gmail, Yahoo, and Outlook addresses are currently
                supported.
            </p>
            <Button type="submit" disabled={submitting} className="w-full">
                {submitting ? "Creating your account..." : "Create account"}
            </Button>
        </form>
    );
}
