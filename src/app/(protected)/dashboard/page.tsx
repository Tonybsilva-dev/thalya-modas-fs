import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

export { DashboardHomeInterface as default } from "@/subdomains/dashboard/container/dashboard.container";