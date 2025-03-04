import React from "react";
import { cn } from "@/lib/utils";

export const H1 = React.forwardRef(({ className, ...props }, ref) => (
  <h1
    className={cn(
      "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
      className
    )}
    ref={ref}
    {...props}
  />
));
H1.displayName = "H1";

export const H2 = React.forwardRef(({ className, ...props }, ref) => (
  <h2
    className={cn(
      "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
      className
    )}
    ref={ref}
    {...props}
  />
));
H2.displayName = "H2";

export const H3 = React.forwardRef(({ className, ...props }, ref) => (
  <h3
    className={cn(
      "scroll-m-20 text-2xl font-semibold tracking-tight",
      className
    )}
    ref={ref}
    {...props}
  />
));
H3.displayName = "H3";

export const H4 = React.forwardRef(({ className, ...props }, ref) => (
  <h4
    className={cn(
      "scroll-m-20 text-xl font-semibold tracking-tight",
      className
    )}
    ref={ref}
    {...props}
  />
));
H4.displayName = "H4";

export const P = React.forwardRef(({ className, ...props }, ref) => (
  <p
    className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
    ref={ref}
    {...props}
  />
));
P.displayName = "P";

export const Large = React.forwardRef(({ className, ...props }, ref) => (
  <div
    className={cn("text-lg font-semibold", className)}
    ref={ref}
    {...props}
  />
));
Large.displayName = "Large";

export const Small = React.forwardRef(({ className, ...props }, ref) => (
  <small
    className={cn("text-sm font-medium leading-none", className)}
    ref={ref}
    {...props}
  />
));
Small.displayName = "Small";

export const Muted = React.forwardRef(({ className, ...props }, ref) => (
  <p
    className={cn("text-sm text-muted-foreground", className)}
    ref={ref}
    {...props}
  />
));
Muted.displayName = "Muted"; 