import { FileText, Truck, CalendarDays, Gavel, Tag, Bell, AlertTriangle, CheckCircle } from "lucide-react";

export const ICON_OPTIONS = {
  FileText,
  Truck,
  CalendarDays,
  Gavel,
  Tag,
  Bell,
  AlertTriangle,
  CheckCircle,
} as const;

export type IconKey = keyof typeof ICON_OPTIONS;

export const BADGE_COLOURS: Record<string, string> = {
  Blue:    "bg-blue-100 text-blue-700",
  Sky:     "bg-sky-100 text-sky-700",
  Green:   "bg-green-100 text-green-700",
  Teal:    "bg-teal-100 text-teal-700",
  Yellow:  "bg-yellow-100 text-yellow-800",
  Orange:  "bg-orange-100 text-orange-700",
  Red:     "bg-red-100 text-red-700",
  Purple:  "bg-purple-100 text-purple-700",
  Amber:   "bg-amber-100 text-amber-700",
  Emerald: "bg-emerald-100 text-emerald-700",
};
