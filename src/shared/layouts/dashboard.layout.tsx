'use client'

import React from 'react';
import dynamic from 'next/dynamic';

import { useMediaQuery } from '../hooks/use-media-query.hook';
import { initialSidebarLinks } from '@/lib/utils/sidebar-links';

const DashboardHeader = dynamic(() =>
  import('@/components/ui/header').then((mod) => mod.default)
);

const DashboardSidebar = dynamic(() =>
  import('@/components/ui/sidebar').then((mod) => mod.default)
);
const SidebarFloatingMenu = dynamic(() =>
  import('@/components/ui/sidebar-floating-menu').then((mod) => mod.SidebarFloatingMenu)
);

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const isLgScreen = useMediaQuery('(min-width: 1024px)');

  return (
    <section className="flex h-screen">
      {isLgScreen ? (
        <DashboardSidebar links={initialSidebarLinks} />
      ) : (
        <SidebarFloatingMenu links={initialSidebarLinks} />
      )}
      <div className={`flex flex-col flex-1 ${isLgScreen ? 'ml-64' : ''}`}>
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
