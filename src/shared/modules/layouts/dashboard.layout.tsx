import DashboardHeader from '@/components/ui/header';
import DashboardSidebar from '@/components/ui/sidebar';
import React from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex h-screen">
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Main content area with header and page content */}
      <div className="flex flex-col flex-1 ml-64">
        {/* Header */}
        <DashboardHeader />

        {/* Page Content */}
        <main className="flex-1 bg-gray-50 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </section>
  );
}
