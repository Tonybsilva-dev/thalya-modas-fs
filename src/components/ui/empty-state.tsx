import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface EmptyStateProps {
  title: string
  icon: React.ElementType
  description?: string
  className?: string
}

export default function EmptyState({
  title,
  icon: Icon,
  description,
  className,
}: EmptyStateProps) {
  return (
    <div className={cn(
      "flex flex-col items-center justify-center text-center",
      className
    )}>
      <div className="flex flex-col items-center max-w-md gap-2">
        <Icon className="h-5 w-5 text-muted-foreground font-bold" />
        <h2 className="text-lg font-bold text-muted-foreground">{title}</h2>
        {description && (
          <p className="text-muted-foreground">{description}</p>
        )}
      </div>
    </div>
  )
}