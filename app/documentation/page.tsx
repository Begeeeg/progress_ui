import type { Metadata } from "next";
import DocumentationPage from "@/features/documentation/components/DocumentationPage";

export const metadata: Metadata = {
  title: "Documentation — Progress",
  description:
    "Learn what Progress does and how to use projects, tasks, profiles, and account settings.",
};

export default function DocumentationRoute() {
  return <DocumentationPage />;
}
