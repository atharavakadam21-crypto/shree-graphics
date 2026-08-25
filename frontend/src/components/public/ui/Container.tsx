import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
};

export default function Container({ className, children, ...props }: ContainerProps) {
  return (
    <div
      {...props}
      className={cn("mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10", className)}
    >
      {children}
    </div>
  );
}
