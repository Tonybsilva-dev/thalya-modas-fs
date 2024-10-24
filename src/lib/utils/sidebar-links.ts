import { LayoutDashboardIcon, UsersIcon, PackageSearchIcon, StoreIcon, SettingsIcon } from "lucide-react";

export interface SidebarLinks {
  href?: string;
  prefetch: boolean;
  text: string;
  icon: React.ElementType;
  children?: SidebarLinks[];
}

export const initialSidebarLinks: SidebarLinks[] = [
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