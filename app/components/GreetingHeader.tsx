import { useMemo } from "react";

// Maps time periods to background image URLs.
const backgrounds = {
  morning: "url(/morning-nature.jpg)",
  afternoon: "url(/afternoon-nature.jpg)",
  night: "url(/night-nature.jpg)",
};

// Maps time periods to localized greeting messages.
const greetings = {
  morning: "Bom dia",
  afternoon: "Boa tarde",
  night: "Boa noite",
};

export default function GreetingHeader() {
  // Get the current hour (0-23) to determine the time of day.
  const hour = new Date().getHours();

  // Determine the period based on the hour, memoized to avoid recalculation.
  const period = useMemo(() => {
    if (hour >= 5 && hour < 12) return "morning";
    if (hour >= 12 && hour < 18) return "afternoon";
    return "night";
  }, [hour]);

  return (
    // Hero banner with a period-specific background image and centered greeting.
    <div
      className={`relative h-[50vh] bg-cover bg-top flex items-center justify-center mb-10`}
      style={{ backgroundImage: backgrounds[period] }}
    >
      {/* Greeting text overlaid on a semi-transparent dark pill for readability. */}
      <h1 className="text-4xl text-white bg-black/30 px-4 py-2 rounded-2xl z-10">
        {greetings[period]}
      </h1>
      {/* Gradient fade at the bottom blending the image into the page background. */}
      <span className="absolute inset-x-0 bottom-0 h-5 bg-linear-to-b from-transparent to-blue-100"></span>
    </div>
  );
}
