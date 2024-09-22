import { DashboardPageContainer } from "@/subdomains/dashboard/container/dashboard.container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Dashboard",
    default: "Dashboard"
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <DashboardPageContainer>{children}</DashboardPageContainer>;
}
