"use client";

import { useState } from "react";
import DashboardLayout from "@/shared/components/layout/DashboardLayout";
import PageHeading from "@/shared/components/ui/PageHeading";
import ProfileSettingsForm from "./ProfileSettingsForm";
import PasswordSettingsForm from "./PasswordSettingsForm";
import DeleteAccountForm from "./DeleteAccountForm";
import ConnectedAccounts from "@/features/accounts/components/ConnectedAccounts";
import SettingsNavigation, {
    type SettingsSectionId,
} from "./SettingsNavigation";
import type { UserProfile } from "../types/user.types";

export default function AccountSettingsPageContent({
    user,
}: {
    user: UserProfile;
}) {
    const [activeSection, setActiveSection] = useState<SettingsSectionId>(
        "personal-information",
    );

    return (
        <DashboardLayout username={user.username}>
            <div className="min-w-0 space-y-8">
                <PageHeading
                    eyebrow="Your account"
                    title="Settings"
                    description="Everything you need to manage your account, organized in one place."
                />

                <div className="grid min-w-0 items-start gap-6 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-10">
                    <aside className="min-w-0 lg:sticky lg:top-24">
                        <SettingsNavigation
                            activeSection={activeSection}
                            onSectionChange={setActiveSection}
                        />
                    </aside>
                    <div className="min-w-0">
                        {activeSection === "personal-information" && (
                            <section
                                id="personal-information"
                                aria-labelledby="personal-information-heading"
                                className="rounded-3xl border border-line bg-surface p-5 sm:p-8"
                            >
                                <div className="mb-6 border-b border-line pb-5">
                                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-(--secondary)">
                                        Profile
                                    </p>
                                    <h2
                                        id="personal-information-heading"
                                        className="mt-2 text-xl font-semibold text-ink"
                                    >
                                        Personal information
                                    </h2>
                                    <p className="mt-1.5 text-sm leading-6 text-ink-dim">
                                        Update your name and username. Your
                                        current password is required to save
                                        changes.
                                    </p>
                                </div>
                                <ProfileSettingsForm user={user} />
                            </section>
                        )}

                        {activeSection === "change-password" && (
                            <section
                                id="change-password"
                                aria-labelledby="change-password-heading"
                                className="rounded-3xl border border-line bg-surface p-5 sm:p-8"
                            >
                                <div className="mb-6 border-b border-line pb-5">
                                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-(--secondary)">
                                        Security
                                    </p>
                                    <h2
                                        id="change-password-heading"
                                        className="mt-2 text-xl font-semibold text-ink"
                                    >
                                        Change password
                                    </h2>
                                    <p className="mt-1.5 text-sm leading-6 text-ink-dim">
                                        Choose a unique password with uppercase,
                                        lowercase, and number characters.
                                    </p>
                                </div>
                                <PasswordSettingsForm />
                            </section>
                        )}

                        {activeSection === "connected-accounts" && (
                            <section
                                id="connected-accounts"
                                aria-labelledby="connected-accounts-heading"
                                className="rounded-3xl border border-line bg-surface p-5 sm:p-8"
                            >
                                <div className="mb-6 border-b border-line pb-5">
                                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-(--secondary)">
                                        Linked profiles
                                    </p>
                                    <h2
                                        id="connected-accounts-heading"
                                        className="mt-2 text-xl font-semibold text-ink"
                                    >
                                        Connected accounts
                                    </h2>
                                    <p className="mt-1.5 text-sm leading-6 text-ink-dim">
                                        Connect or disconnect external profiles
                                        associated with your Progress account.
                                    </p>
                                </div>
                                <ConnectedAccounts />
                            </section>
                        )}

                        {activeSection === "delete-account" && (
                            <section
                                id="delete-account"
                                aria-labelledby="delete-account-heading"
                                className="rounded-3xl border border-red-500/20 bg-surface p-5 sm:p-8"
                            >
                                <div className="mb-6 border-b border-red-500/15 pb-5">
                                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-red-600">
                                        Danger zone
                                    </p>
                                    <h2
                                        id="delete-account-heading"
                                        className="mt-2 text-xl font-semibold text-ink"
                                    >
                                        Delete account
                                    </h2>
                                    <p className="mt-1.5 text-sm leading-6 text-ink-dim">
                                        Permanently remove your profile and
                                        sign-in record. Some linked-account,
                                        project, or task records may remain; see
                                        the Privacy Policy for details.
                                    </p>
                                </div>
                                <DeleteAccountForm />
                            </section>
                        )}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
