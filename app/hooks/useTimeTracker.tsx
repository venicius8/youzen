import { saveTime } from "@/utils/timeTracker";
import { useEffect, useRef } from "react";
import { FeatureKey } from "@/utils/timeTracker";

export default function useTimeTracker(key: FeatureKey) {
  // Tracks elapsed seconds for time persistence.
  const secondsRef = useRef(0);
  // Holds the setInterval ID for cleanup.
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // On mount, start counting seconds and set up cleanup to save time on unmount.
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      secondsRef.current += 1;
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        saveTime(key, secondsRef.current);
      }
    };
  }, [key]);

  // Returns the current elapsed seconds (optional).
  return secondsRef.current;
}
