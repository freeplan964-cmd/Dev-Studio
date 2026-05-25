import { useState, useEffect, useCallback, useRef } from "react";
import { type LucideIcon } from "lucide-react";
import { PRAYER_ICONS } from "@/constants/icons";
import { toDateStr, to24hMin } from "@/lib/utils/planner";
import type { PrayerTime } from "@/types/planner";

export type { PrayerTime };

const PRAYER_KEYS = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"] as const;

export const PRAYER_META: Record<
  string,
  {
    arabic: string;
    Icon: LucideIcon;
    color: string;
    iconColor: string;
  }
> = {
  Fajr: { arabic: "الفجر", Icon: PRAYER_ICONS.Fajr, color: "text-indigo-400", iconColor: "text-indigo-400" },
  Dhuhr: { arabic: "الظهر", Icon: PRAYER_ICONS.Dhuhr, color: "text-amber-500", iconColor: "text-amber-500" },
  Asr: { arabic: "العصر", Icon: PRAYER_ICONS.Asr, color: "text-sky-400", iconColor: "text-sky-400" },
  Maghrib: {
    arabic: "المغرب",
    Icon: PRAYER_ICONS.Maghrib,
    color: "text-orange-500",
    iconColor: "text-orange-500",
  },
  Isha: {
    arabic: "العشاء",
    Icon: PRAYER_ICONS.Isha,
    color: "text-violet-400",
    iconColor: "text-violet-400",
  },
};

interface UsePrayerTimesResult {
  prayers: PrayerTime[];
  loading: boolean;
  error: string | null;
  city: string;
  nextIdx: number;
  nowMin: number;
  refresh: () => void;
}

export function usePrayerTimes(date?: string): UsePrayerTimesResult {
  const [prayers, setPrayers] = useState<PrayerTime[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [city, setCity] = useState("");
  const [now, setNow] = useState(() => new Date());

  const fetchRef = useRef<((lat: number, lng: number, label: string) => Promise<void>) | null>(
    null,
  );
  const targetDate = date ?? toDateStr(new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 10_000);
    return () => clearInterval(t);
  }, []);

  const fetchByCoords = useCallback(
    async (lat: number, lng: number, label: string) => {
      setLoading(true);
      setError(null);
      setCity(label);
      try {
        const [day, month, year] = [
          targetDate.slice(8, 10),
          targetDate.slice(5, 7),
          targetDate.slice(0, 4),
        ];
        const res = await fetch(
          `https://api.aladhan.com/v1/timings/${day}-${month}-${year}?latitude=${lat}&longitude=${lng}&method=4`,
        );
        if (!res.ok) throw new Error("Failed to fetch prayer times");
        const json = await res.json();
        const timings = json.data?.timings;
        if (!timings) throw new Error("Invalid response from prayer API");
        setPrayers(
          PRAYER_KEYS.map((key) => ({
            name: key,
            arabicName: PRAYER_META[key].arabic,
            time: timings[key],
            Icon: PRAYER_META[key].Icon,
            iconColor: PRAYER_META[key].iconColor,
          })),
        );
      } catch (e: any) {
        setError(e.message ?? "Could not load prayer times");
      } finally {
        setLoading(false);
      }
    },
    [targetDate],
  );

  fetchRef.current = fetchByCoords;

  const geolocate = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
          )
            .then((r) => r.json())
            .then((data) => {
              const label =
                data.address?.city || data.address?.town || data.address?.state || "Your location";
              fetchRef.current?.(latitude, longitude, label);
            })
            .catch(() => fetchRef.current?.(latitude, longitude, "Your location"));
        },
        () => fetchRef.current?.(21.3891, 39.8579, "Mecca"),
      );
    } else {
      fetchRef.current?.(21.3891, 39.8579, "Mecca");
    }
  }, []);

  useEffect(() => {
    geolocate();
  }, [targetDate]);

  const nowMin = now.getHours() * 60 + now.getMinutes();
  let nextIdx = -1;
  if (prayers.length > 0) {
    nextIdx = prayers.findIndex((p) => to24hMin(p.time) > nowMin);
    if (nextIdx === -1) nextIdx = 0;
  }

  return { prayers, loading, error, city, nextIdx, nowMin, refresh: geolocate };
}
