import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileIcon, GitlabIcon, HomeIcon, LinkedinIcon, LogOutIcon, MenuIcon, SettingsIcon, StoreIcon, TwitterIcon, UsersIcon } from "lucide-react"


export interface SidebarLinks {
  href: string;
  prefetch: boolean;
  text: string;
  isPremium: boolean;
  icon: React.ElementType
  children: React.ReactNode;
}


export default function DashboardSidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 flex h-full w-64 flex-col border-r bg-background shadow-lg">
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
      <nav className="flex-1 overflow-auto mt-4 space-y-4">
        <div className="space-y-1 px-2">
          <div className="px-2 text-xs font-medium text-muted-foreground">Main</div>
          <Link
            href="#"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-red-50 hover:text-foreground"
            prefetch={false}
          >
            <HomeIcon className="h-5 w-5" />
            Home
          </Link>
        </div>
        <div className="space-y-1 px-2">
          <div className="px-2 text-xs font-medium text-muted-foreground">Workspace</div>
          <Link
            href="#"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-red-50 hover:text-foreground"
            prefetch={false}
          >
            <UsersIcon className="h-5 w-5" />
            Team
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-red-50 hover:text-foreground"
            prefetch={false}
          >
            <FileIcon className="h-5 w-5" />
            Files
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-red-50 hover:text-foreground"
            prefetch={false}
          >
            <SettingsIcon className="h-5 w-5" />
            Settings
          </Link>
        </div>
        <div className="mt-auto p-4">
          <Button className="flex w-full gap-2">
            <LogOutIcon className="w-5 h-5" />
            Sair</Button>
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
  )
}
