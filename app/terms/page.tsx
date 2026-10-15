import type { Metadata } from "next";
import LegalDocumentPage from "@/features/legal/components/LegalDocumentPage";
import { termsAndConditions } from "@/features/legal/content/terms-and-conditions";

export const metadata: Metadata = {
  title: "Terms & conditions — Progress",
  description: "Terms and conditions for the Progress service.",
};

export default function TermsPage() {
  return <LegalDocumentPage document={termsAndConditions} />;
}
