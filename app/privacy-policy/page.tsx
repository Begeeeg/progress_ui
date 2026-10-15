import type { Metadata } from "next";
import LegalDocumentPage from "@/features/legal/components/LegalDocumentPage";
import { privacyPolicy } from "@/features/legal/content/privacy-policy";

export const metadata: Metadata = {
  title: "Privacy policy — Progress",
  description: "Privacy policy for the Progress service.",
};

export default function PrivacyPolicyPage() {
  return <LegalDocumentPage document={privacyPolicy} />;
}
