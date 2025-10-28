import { ReactNode } from "react";

const colorVariants = {
  danger: ["bg-red-800", "hover:bg-red-900"],
  info: ["bg-blue-600", "hover:bg-blue-700"],
  success: ["bg-green-600", "hover:bg-green-700"],
};

type typeKey = keyof typeof colorVariants;

export default function Button({
  children,
  type,
}: {
  children: ReactNode;
  type: typeKey;
}) {
  const [bg, hoverBg] = colorVariants[type];

  return (
    <button
      className={`${bg} ${hoverBg} p-4 m-4 rounded-2xl text-white font-bold text-xl cursor-pointer transition`}
    >
      {children}
    </button>
  );
}
