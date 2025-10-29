import { useMemo } from "react";

const backgrounds = {
  morning: "url(/morning-nature.jpg)",
  afternoon: "url(/afternoon-nature.jpg)",
  night: "url(/night-nature.jpg)",
};

const greetings = {
  morning: "Bom dia",
  afternoon: "Boa tarde",
  night: "Boa noite",
};

export default function GreetingHeader() {
  const hour = new Date().getHours();

  const period = useMemo(() => {
    if (hour >= 5 && hour < 12) return "morning";
    if (hour >= 12 && hour < 18) return "afternoon";
    return "night";
  }, [hour]);

  return (
    <div
      className={`relative h-[50vh] bg-cover bg-top flex items-center justify-center mb-10`}
      style={{ backgroundImage: backgrounds[period] }}
    >
      <h1 className="text-4xl text-white bg-black/30 px-4 py-2 rounded-2xl z-10">
        {greetings[period]}
      </h1>
      <span className="absolute inset-x-0 bottom-0 h-5 bg-linear-to-b from-transparent to-blue-100"></span>
    </div>
  );
}
