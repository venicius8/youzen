import Link from "next/link";
import { ReactNode } from "react";

// Color configuration mapping button types to Tailwind background and hover classes.
const colorVariants = {
  primary: ["bg-blue-600", "hover:bg-blue-700"],
  danger: ["bg-red-800", "hover:bg-red-900"],
  success: ["bg-green-600", "hover:bg-green-700"],
};

// Type definition for valid button variant keys.
type typeKey = keyof typeof colorVariants;

export default function Button({
  children,
  type,
  url,
}: {
  children: ReactNode;
  type: typeKey;
  url?: string;
}) {
  // Destructure the background and hover classes for the selected type.
  const [bg, hoverBg] = colorVariants[type];

  // Base classes for button styling, sizing, and transition effects.
  const classes = `${bg} ${hoverBg} p-4 m-4 rounded-2xl w-2/3 max-w-2xl text-white font-bold text-xl cursor-pointer transition`;

  // Render the button element with the combined classes.
  const btn = <button className={classes}>{children}</button>;

  // If a URL is provided, wrap the button in a Next.js Link; otherwise, render the button directly.
  return url ? <Link href={url}>{btn}</Link> : <>{btn}</>;
}
