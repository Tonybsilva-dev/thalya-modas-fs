// src/app/components/DashboardSidebar.tsx

"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  FileIcon,
  GitlabIcon,
  HomeIcon,
  LinkedinIcon,
  LogOutIcon,
  MenuIcon,
  SettingsIcon,
  StoreIcon,
  TwitterIcon,
  UsersIcon,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { ReactNode } from "react";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip"; // Ajuste o caminho conforme necessário
import clsx from "clsx";

export interface SidebarLinks {
  href: string;
  prefetch: boolean;
  text: string;
  isPremium: boolean;
  icon: React.ElementType;
  children?: SidebarLinks[]; // Opcional para submenus
}

// Defina os links aqui
const initialSidebarLinks: SidebarLinks[] = [
  {
    href: "/dashboard",
    prefetch: false,
    text: "Home",
    isPremium: false,
    icon: HomeIcon,
  },
  {
    href: "/dashboard/team",
    prefetch: false,
    text: "Team",
    isPremium: false,
    icon: UsersIcon,
  },
  {
    href: "/dashboard/files",
    prefetch: false,
    text: "Files",
    isPremium: false,
    icon: FileIcon,
    children: [
      {
        href: "/dashboard/files/reports",
        prefetch: false,
        text: "Reports",
        isPremium: true, // Submenu premium
        icon: FileIcon,
      },
      // Adicione mais sublinks conforme necessário
    ],
  },
  {
    href: "/dashboard/settings",
    prefetch: false,
    text: "Settings",
    isPremium: true, // Link premium
    icon: SettingsIcon,
  },
  // Adicione mais links conforme necessário
];

interface SidebarLinkProps {
  link: SidebarLinks;
  isPremiumUser: boolean;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ link, isPremiumUser }) => {
  const Icon = link.icon;
  const isDisabled = link.isPremium && !isPremiumUser;

  const linkContent = (
    <div
      className={clsx(
        "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium",
        isDisabled
          ? "cursor-not-allowed opacity-50 text-muted-foreground"
          : "transition-colors hover:bg-muted hover:text-foreground"
      )}
    >
      <Icon className="h-5 w-5" />
      <span>{link.text}</span>
    </div>
  );

  if (isDisabled) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
        <TooltipContent>
          <p>Esta é uma funcionalidade premium</p>
        </TooltipContent>
      </Tooltip>
    );
  }

  return (
    <Link href={link.href} prefetch={link.prefetch}>
      {linkContent}
    </Link>
  );
};

export default function DashboardSidebar() {
  const { data: session } = useSession();

  // Determine o status premium do usuário
  // Ajuste conforme a lógica do seu sistema de roles
  const isPremiumUser = session?.user?.role === "OWNER";

  // Atualize os links com base no status premium
  const links = initialSidebarLinks.map((link) => ({
    ...link,
    isPremium: link.isPremium && !isPremiumUser,
    children: link.children
      ? link.children.map((child) => ({
        ...child,
        isPremium: child.isPremium && !isPremiumUser,
      }))
      : undefined,
  }));

  return (
    <TooltipProvider>
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

        {/* Conteúdo principal */}
        <nav className="flex-1 overflow-auto mt-4 space-y-4 px-2">
          {/* Mapeie sobre os links principais */}
          {links.map((link) => (
            <SidebarLink key={link.href} link={link} isPremiumUser={isPremiumUser} />
          ))}

          {/* Botão SignOut fixado no rodapé */}
          <div className="mt-auto p-4">
            <Button onClick={() => signOut()} className="flex w-full gap-2">
              <LogOutIcon className="w-5 h-5" />
              Sair
            </Button>
          </div>
        </nav>

        {/* Rodapé com ícones de redes sociais */}
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
    </TooltipProvider>
  );
}