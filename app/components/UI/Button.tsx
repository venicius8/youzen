import Link from "next/link";
import { ReactNode } from "react";

const colorVariants = {
  primary: ["bg-blue-600", "hover:bg-blue-700"],
  danger: ["bg-red-800", "hover:bg-red-900"],
  success: ["bg-green-600", "hover:bg-green-700"],
};

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
  const [bg, hoverBg] = colorVariants[type];

  const classes = `${bg} ${hoverBg} p-4 m-4 rounded-2xl w-2/3 max-w-2xl text-white font-bold text-xl cursor-pointer transition`;
  const btn = <button className={classes}>{children}</button>;

  return url ? <Link href={url}>{btn}</Link> : <>{btn}</>;
}
