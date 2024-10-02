
'use client';

import React from 'react';
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
  UsersIcon,
  PackageSearchIcon,
  LayoutDashboardIcon,
  SettingsIcon,
} from 'lucide-react';
import { signOut } from 'next-auth/react';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible';

export interface SidebarLinks {
  href?: string;
  prefetch: boolean;
  text: string;
  icon: React.ElementType;
  children?: SidebarLinks[];
}

const initialSidebarLinks: SidebarLinks[] = [
  {
    href: '/dashboard',
    prefetch: false,
    text: 'Início',
    icon: LayoutDashboardIcon,
  },
  {
    href: '/dashboard/customers',
    prefetch: false,
    text: 'Clientes',
    icon: UsersIcon,
  },
  {
    prefetch: false,
    text: 'Produtos',
    icon: PackageSearchIcon,
    children: [
      {
        href: '/dashboard/products/reports',
        prefetch: false,
        text: 'Reports',
        icon: StoreIcon,
      },
    ],
  },
  {
    href: '/dashboard/settings',
    prefetch: false,
    text: 'Configurações',
    icon: SettingsIcon,
  },
];

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

export default function DashboardSidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 flex h-full w-64 flex-col border-r bg-background shadow-lg">
      {/* Cabeçalho */}
      <div className="flex h-16 shrink-0 items-center justify-between px-4">
        <Link href="#" className="flex items-center gap-2" prefetch={false}>
          <StoreIcon className="h-6 w-6" />
          <span className="text-lg font-semibold">Thalya Modas</span>
        </Link>
        <Button variant="ghost" size="icon" className="rounded-full">
          <MenuIcon className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </div>
      <nav className="flex-1 overflow-auto mt-4 px-2">
        {renderLinks(initialSidebarLinks)}
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
  );
}