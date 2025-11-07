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

// const breathing: number = Number(localStorage.getItem("breathing")) || 0;

// const newTime = addTime(10, "breathing");

// saveTime("breathing", newTime);
