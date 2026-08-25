import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ContainerProps<T extends ElementType> = {
  as?: T;
  children?: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children">;

export default function Container<T extends ElementType = "div">({
  as,
  className,
  children,
  ...props
}: ContainerProps<T>) {
  const Component = (as ?? "div") as ElementType;
  return <Component {...props} className={cn("mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10", className)}>{children}</Component>;
}
