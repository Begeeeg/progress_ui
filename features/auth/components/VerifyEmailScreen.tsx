"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  CircleAlert,
  Mail,
  RefreshCw,
} from "lucide-react";
import AuthCard from "./AuthCard";
import {
  logoutUser,
  resendVerificationEmail,
  verifyEmail,
} from "../api/auth.api";
import { toast } from "sonner";

type VerificationState = "waiting" | "verifying" | "verified" | "failed";

export default function VerifyEmailScreen({
  verificationToken,
}: {
  verificationToken: string | null;
}) {
  const router = useRouter();
  const requestRef = useRef<{
    token: string;
    promise: ReturnType<typeof verifyEmail>;
  } | null>(null);
  const [state, setState] = useState<VerificationState>(
    verificationToken ? "verifying" : "waiting",
  );
  const [message, setMessage] = useState("");
  const [resending, setResending] = useState(false);
  const [loginRequired, setLoginRequired] = useState(false);

  useEffect(() => {
    if (!verificationToken) return;
    let active = true;

    if (requestRef.current?.token !== verificationToken) {
      requestRef.current = {
        token: verificationToken,
        promise: verifyEmail(verificationToken),
      };
    }

    void requestRef.current.promise
      .then((response) => {
        if (!active) return;
        setMessage(response.message || "Your email address is verified.");
        setState("verified");
      })
      .catch((error: unknown) => {
        if (!active) return;
        setMessage(
          error instanceof Error
            ? error.message
            : "We could not verify this link. Please request a new one.",
        );
        setState("failed");
      });

    return () => {
      active = false;
    };
  }, [verificationToken]);

  async function handleResend() {
    setResending(true);
    setLoginRequired(false);
    setMessage("");

    try {
      const response = await resendVerificationEmail();
      setMessage(
        response.message ||
          "A new verification email was sent. Use the newest link; older links no longer work.",
      );
      setState("waiting");
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "We could not send a verification email.";
      setMessage(errorMessage);
      setLoginRequired(
        errorMessage.toLowerCase().includes("not authenticated") ||
          errorMessage.toLowerCase().includes("invalid or expired token"),
      );
    } finally {
      setResending(false);
    }
  }

  async function handleLogout() {
    try {
      await logoutUser();
      router.replace("/");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Could not log out.",
      );
    }
  }

  const verified = state === "verified";
  const verifying = state === "verifying";

  return (
    <AuthCard
      eyebrow="email verification"
      title={
        verified
          ? "You’re verified"
          : verifying
            ? "Verifying your email"
            : state === "failed"
              ? "This link didn’t work"
              : "Check your inbox"
      }
      subtitle={
        verified
          ? "Your email is confirmed. Your Progress workspace is ready."
          : verifying
            ? "We’re confirming your email address. This usually takes just a moment."
            : "Before you can use your workspace, confirm the email address you signed up with."
      }
      footer={
        <>
          {verified ? "Ready to continue?" : "Want to sign out?"}{" "}
          {verified ? (
            <Link
              href="/home"
              className="font-medium text-(--secondary) hover:text-(--primary)"
            >
              Open Progress
            </Link>
          ) : (
            <button
              type="button"
              onClick={handleLogout}
              className="font-medium text-(--secondary) hover:text-(--primary)"
            >
              Log out
            </button>
          )}
        </>
      }
    >
      <div className="flex flex-col gap-5">
        <div
          className={`mx-auto flex size-16 items-center justify-center rounded-2xl ${
            verified
              ? "bg-green-500/10 text-green-600"
              : state === "failed"
                ? "bg-amber-500/10 text-amber-600"
                : "bg-(--secondary)/10 text-(--secondary)"
          }`}
        >
          {verified ? (
            <CheckCircle2 size={30} />
          ) : state === "failed" ? (
            <CircleAlert size={30} />
          ) : (
            <Mail size={30} className={verifying ? "animate-pulse" : ""} />
          )}
        </div>

        {!verificationToken && !verified && (
          <div className="rounded-lg border border-line bg-surface-soft/40 p-4">
            <p className="font-medium text-ink">Do these three things:</p>
            <ol className="mt-3 space-y-3 text-sm text-ink-dim">
              <li className="flex gap-3">
                <span className="font-semibold text-(--secondary)">1.</span>
                <span>
                  Open the inbox for the email address you used to sign up.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold text-(--secondary)">2.</span>
                <span>
                  Find the Progress verification email. Check spam or junk if it
                  is missing.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold text-(--secondary)">3.</span>
                <span>
                  Click the email’s verification button. This page will confirm
                  it automatically.
                </span>
              </li>
            </ol>
          </div>
        )}

        {verifying && (
          <p role="status" className="text-center text-sm text-ink-dim">
            Checking your verification link…
          </p>
        )}

        {message && (
          <div
            role={verified ? "status" : "alert"}
            className={`rounded-lg border p-3 text-sm ${
              verified
                ? "border-green-500/25 bg-green-500/10 text-green-700"
                : "border-amber-500/25 bg-amber-500/10 text-amber-800"
            }`}
          >
            {message}
          </div>
        )}

        {verified ? (
          <button
            type="button"
            onClick={() => {
              router.replace("/home");
              router.refresh();
            }}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-(image:--gradient-primary) px-4 py-3 font-semibold text-white transition hover:brightness-110"
          >
            Continue to your workspace <ArrowRight size={17} />
          </button>
        ) : (
          <div className="space-y-3">
            {state !== "verifying" && (
              <button
                type="button"
                onClick={handleResend}
                disabled={resending}
                className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-line px-4 py-3 font-medium transition hover:border-(--secondary) disabled:cursor-not-allowed disabled:opacity-50"
              >
                <RefreshCw
                  size={16}
                  className={resending ? "animate-spin" : ""}
                />
                {resending
                  ? "Sending a new email…"
                  : "Resend verification email"}
              </button>
            )}
            {loginRequired && (
              <p className="text-center text-sm text-ink-dim">
                To resend, first{" "}
                <Link
                  href="/login"
                  className="font-medium text-(--secondary) hover:text-(--primary)"
                >
                  log in with the account you registered
                </Link>
                . You’ll return here if it still needs verification.
              </p>
            )}
            {state === "failed" && (
              <p className="text-center text-xs text-ink-dim">
                Links expire after 15 minutes and work only once. If you
                requested a new email, open the newest link.
              </p>
            )}
          </div>
        )}
      </div>
    </AuthCard>
  );
}
