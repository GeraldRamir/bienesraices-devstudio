import {
  ArrowUpDown,
  Baby,
  Building,
  Check,
  Dumbbell,
  Flame,
  Layout,
  Lock,
  Shield,
  Sun,
  Waves,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { AMENITY_ICONS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const ICON_MAP: Record<string, LucideIcon> = {
  pool: Waves,
  dumbbell: Dumbbell,
  shield: Shield,
  baby: Baby,
  sun: Sun,
  layout: Layout,
  "arrow-up-down": ArrowUpDown,
  zap: Zap,
  flame: Flame,
  building: Building,
  lock: Lock,
  waves: Waves,
};

interface AmenitiesGridProps {
  amenities: string[];
  className?: string;
}

export function AmenitiesGrid({ amenities, className }: AmenitiesGridProps) {
  if (amenities.length === 0) return null;

  return (
    <div className={cn("rounded-2xl border border-black/[0.06] bg-white p-6", className)}>
      <h3 className="font-serif text-xl font-semibold text-ink">Amenidades</h3>
      <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {amenities.map((amenity) => {
          const iconKey = AMENITY_ICONS[amenity];
          const Icon = (iconKey && ICON_MAP[iconKey]) || Check;

          return (
            <li
              key={amenity}
              className="flex items-center gap-3 rounded-xl bg-cream px-4 py-3 text-[14px] font-medium text-ink"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-accent-dark">
                <Icon className="h-4 w-4" />
              </span>
              {amenity}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
