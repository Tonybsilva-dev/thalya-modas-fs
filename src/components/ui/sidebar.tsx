'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  LogOutIcon,
  MenuIcon,
  TwitterIcon,
  LinkedinIcon,
  GitlabIcon,
  StoreIcon,
  ChevronRightIcon,
  LightbulbIcon,
} from 'lucide-react';
import { signOut } from 'next-auth/react';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible';
import { LinksPropsSidebar } from '@/shared/types/dashboard/sidebar.type';
import { SidebarLinks } from '@/lib/utils/sidebar-links';

const renderLinks = (links: SidebarLinks[]) => {
  return links.map((link, index) => {
    const Icon = link.icon;
    if (link.children && link.children.length > 0) {
      return (
        <Collapsible key={index} className="space-y-1">
          <CollapsibleTrigger className="flex items-center justify-between px-3 py-2 rounded-md hover:bg-muted transition-colors [&[data-state=open]>svg]:rotate-90 w-full">
            <div className="flex items-center gap-2">
              <Icon className="h-5 w-5" />
              <span>{link.text}</span>
            </div>
            <ChevronRightIcon className="h-5 w-5 transition-transform" />
          </CollapsibleTrigger>
          <CollapsibleContent className="pl-6 space-y-1">
            {renderLinks(link.children)}
          </CollapsibleContent>
        </Collapsible>
      );
    } else if (link.href) {
      return (
        <Link
          key={index}
          href={link.href}
          prefetch={link.prefetch}
          className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted transition-colors"
        >
          <Icon className="h-5 w-5" />
          <span>{link.text}</span>
        </Link>
      );
    } else {
      return null;
    }
  });
};

export default function DashboardSidebar({ links }: LinksPropsSidebar) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <aside className="hidden lg:flex fixed inset-y-0 left-0 z-10 h-full w-64 flex-col border-r bg-background shadow-lg">
        <div className="flex h-16 shrink-0 items-center justify-between px-4">
          <Link href="#" className="flex items-center gap-2" prefetch={false}>
            <StoreIcon className="h-6 w-6" />
            <span className="text-lg font-semibold">Thalya Modas</span>
          </Link>
          <Button variant="ghost" size="icon" className="rounded-full">
            <LightbulbIcon className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
        <nav className="flex-1 overflow-auto mt-4 px-2">
          {renderLinks(links)}
          <div className="mt-auto p-4">
            <Button onClick={() => signOut()} className="flex w-full gap-2">
              <LogOutIcon className="w-5 h-5" />
              Sair
            </Button>
          </div>
        </nav>
        <div className="flex h-16 shrink-0 items-center justify-center gap-4 border-t px-4">
          <Link href="#" className="text-muted-foreground hover:text-foreground" prefetch={false}>
            <TwitterIcon className="h-5 w-5" />
            <span className="sr-only">Twitter</span>
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-foreground" prefetch={false}>
            <LinkedinIcon className="h-5 w-5" />
            <span className="sr-only">LinkedIn</span>
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-foreground" prefetch={false}>
            <GitlabIcon className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </Link>
        </div>
      </aside>

      {/* Botão flutuante para telas menores que lg */}
      <div className="lg:hidden fixed bottom-4 right-4">
        <Button
          onClick={toggleSidebar}
          className="p-4 rounded-full shadow-lg bg-primary text-white"
        >
          <MenuIcon className="h-6 w-6" />
        </Button>
      </div>
    </>
  );
}
