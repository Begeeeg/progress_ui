import DashboardLayout from "@/shared/components/layout/DashboardLayout";
import LoadingState from "@/shared/components/ui/LoadingState";

export default function HomeLoading() {
  return (
    <DashboardLayout>
      <LoadingState label="Opening your workspace..." />
    </DashboardLayout>
  );
}
