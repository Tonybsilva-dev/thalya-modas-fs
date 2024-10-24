import Loading from "@/app/loading"
import { Switch } from "@/components/ui/switch"
import { useLocation } from "@/shared/hooks/use-location.hook"

export function LocationSwitch() {
  const { locationEnabled, toggleLocation } = useLocation()

  return (
    <div className="flex flex-col items-start space-y-2">
      <div className="flex items-center space-x-2">
        <Switch
          id="location-mode"
          checked={locationEnabled ?? undefined}
          onCheckedChange={toggleLocation}
        />
      </div>
    </div>
  )
}