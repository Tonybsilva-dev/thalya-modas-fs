import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { StoreIcon } from "lucide-react"

export default function DashboardHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-transparent backdrop-blur">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Store" />
            </SelectTrigger>
            <SelectContent  >
              <SelectItem value="store1">
                <div className="flex items-center gap-2">
                  <StoreIcon className="h-5 w-5" />
                  <div>
                    <div className="font-medium">Store 1</div>
                    <p className="text-xs text-muted-foreground">Main location</p>
                  </div>
                </div>
              </SelectItem>
              <SelectItem value="store2">
                <div className="flex items-center gap-2">
                  <StoreIcon className="h-5 w-5" />
                  <div>
                    <div className="font-medium">Store 2</div>
                    <p className="text-xs text-muted-foreground">Downtown branch</p>
                  </div>
                </div>
              </SelectItem>
              <SelectItem value="store3">
                <div className="flex items-center gap-2">
                  <StoreIcon className="h-5 w-5" />
                  <div>
                    <div className="font-medium">Store 3</div>
                    <p className="text-xs text-muted-foreground">Suburban location</p>
                  </div>
                </div>
              </SelectItem>
              <SelectItem value="store4">
                <div className="flex items-center gap-2">
                  <StoreIcon className="h-5 w-5" />
                  <div>
                    <div className="font-medium">Store 4</div>
                    <p className="text-xs text-muted-foreground">Flagship store</p>
                  </div>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </header>
  )
}