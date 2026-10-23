"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LoaderCircle } from "lucide-react";
import { getPublicProfile } from "@/features/users/api/search.api";
import DashboardLayout from "@/shared/components/layout/DashboardLayout";
import PageHeading from "@/shared/components/ui/PageHeading";
import type { PublicProfile } from "../types/search.types";
import PublicProfileView from "./PublicProfileView";

export default function PublicProfilePageContent({
    username,
    viewerUsername,
}: {
    username: string;
    viewerUsername: string;
}) {
    const [profile, setProfile] = useState<PublicProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let active = true;

        async function loadProfile() {
            setLoading(true);
            setError("");
            try {
                const publicProfile = await getPublicProfile(username);
                if (active) setProfile(publicProfile);
            } catch (cause) {
                if (active) {
                    setProfile(null);
                    setError(
                        cause instanceof Error
                            ? cause.message
                            : "Could not load this profile.",
                    );
                }
            } finally {
                if (active) setLoading(false);
            }
        }

        void loadProfile();
        return () => {
            active = false;
        };
    }, [username]);

    return (
        <DashboardLayout username={viewerUsername}>
            <div className="space-y-8">
                <PageHeading
                    eyebrow="Community"
                    title="Public profile"
                    description="Explore the profile information and connected accounts this user has made public."
                />
                {loading ? (
                    <div
                        role="status"
                        className="flex min-h-48 items-center justify-center gap-3 rounded-3xl border border-line bg-surface text-sm text-ink-dim"
                    >
                        <LoaderCircle size={18} className="animate-spin" />
                        Loading profile...
                    </div>
                ) : error ? (
                    <div
                        role="alert"
                        className="rounded-3xl border border-line bg-surface px-5 py-8 text-center"
                    >
                        <p className="font-semibold text-ink">
                            Profile unavailable
                        </p>
                        <p className="mt-2 text-sm text-ink-dim">{error}</p>
                        <Link
                            href="/home"
                            className="mt-5 inline-flex text-sm font-semibold text-(--secondary) hover:underline"
                        >
                            Return to workspace
                        </Link>
                    </div>
                ) : profile ? (
                    <PublicProfileView profile={profile} />
                ) : null}
            </div>
        </DashboardLayout>
    );
}
