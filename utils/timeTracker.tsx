import { allFeatures } from "./allFeatures";

const isBrowser = typeof window !== "undefined";

interface Features {
  breathing: string;
  soundscape: string;
  phrases: string;
}

export type FeatureKey = keyof Features;

export const getTime = (feature: FeatureKey): number => {
  if (!isBrowser) return 0;
  return Number(localStorage.getItem(feature)) || 0;
};

export const saveTime = (feature: FeatureKey, time: number) => {
  if (!isBrowser) return time;

  const currentTime = Number(localStorage.getItem(feature)) || 0 + time;
  const newTime = currentTime + time;
  localStorage.setItem(feature, `${newTime}`);
};

export const getResume = (): Record<string, number> => {
  if (!isBrowser) return {};

  const resume: Record<string, number> = {};
  allFeatures.forEach((el) => {
    const time = getTime(el["nick"] as FeatureKey);
    if (time > 0) resume[el.nick] = time;
  });

  return resume;
};
