import { allFeatures } from "./allFeatures";

interface Features {
  breathing: string;
  soundscape: string;
  phrases: string;
}

type FeatureKey = keyof Features;

export const getTime = (feature: FeatureKey) =>
  Number(localStorage.getItem(feature)) || 0;

export const addTime = (feature: FeatureKey, time: number) =>
  Number(localStorage.getItem(feature)) + time;

export const saveTime = (feature: FeatureKey, newTime: number) =>
  localStorage.setItem(feature, `${newTime}`);

export const getResume = () => {
  const usedFeatured = allFeatures.filter(
    (el) => getTime(el["nick"] as FeatureKey) !== 0
  );

  const resume: Record<string, number> = {};

  usedFeatured.forEach((el) => {
    resume[el.nick] = getTime(el["nick"] as FeatureKey);
  });

  return resume;
};
