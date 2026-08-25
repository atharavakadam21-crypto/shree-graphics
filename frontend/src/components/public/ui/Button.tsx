import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Shared = { children: ReactNode; variant?: "primary" | "secondary"; className?: string };
type LinkProps = Shared & { href: string } & AnchorHTMLAttributes<HTMLAnchorElement>;
type NativeButtonProps = Shared & ButtonHTMLAttributes<HTMLButtonElement>;
type Props = LinkProps | NativeButtonProps;

const styles = {
  primary: "bg-[#4274D9] text-white hover:bg-[#5a86e0] shadow-lg shadow-[#4274D9]/20",
  secondary: "border border-white/15 bg-white/[0.045] text-white hover:bg-white/[0.09]",
};

export default function Button({ children, variant = "primary", className, ...props }: Props) {
  const classes = cn("inline-flex min-h-12 items-center justify-center rounded-full px-6 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5", styles[variant], className);
  if ("href" in props) {
    const { href, ...linkProps } = props;
    return <Link href={href} {...linkProps} className={classes}>{children}</Link>;
  }
  return <button {...props} className={classes}>{children}</button>;
}
