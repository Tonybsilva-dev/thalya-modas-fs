import DashboardLayout from "@/shared/layouts/dashboard.layout";
export { DashboardHomeInterface } from "../interfaces/home/dashboard-home.interface";

export const DashboardPageContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <DashboardLayout>
      {children}
    </DashboardLayout>
  );
};