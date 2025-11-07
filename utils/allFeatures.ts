interface Features {
  nick: string;
  featureName: string;
  about: string;
  imageURL: string;
  tags: string[];
}

export const allFeatures: Features[] = [
  {
    nick: "breathing",
    featureName: "Breathing",
    about: "Acompanhe sua respiração profunda junto com o círculo.",
    imageURL: "/featuresImg/breathing.jpg",
    tags: ["breath", "calm", "mindfulness", "meditation"],
  },
  {
    nick: "soundscape",
    featureName: "Soundscape",
    about: "Adicione e escute sons naturais e relaxantes do seu jeito.",
    imageURL: "/featuresImg/soundscape.jpg",
    tags: ["relax", "sound", "screenoff", "mindfulness"],
  },
  {
    nick: "phrases",
    featureName: "Phrases",
    about: "Leia frases positivas e motivadoras.",
    imageURL: "/featuresImg/phrases.jpg",
    tags: ["read", "happiness", "mindfulness", "motivacional"],
  },
];
