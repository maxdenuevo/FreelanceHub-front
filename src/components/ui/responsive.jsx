import React from "react";
import { cn } from "@/lib/utils";

export const ShowAt = React.forwardRef(({ 
  breakpoint, 
  className, 
  children,
  ...props 
}, ref) => {
  const breakpoints = {
    xs: "block",
    sm: "hidden sm:block",
    md: "hidden md:block",
    lg: "hidden lg:block",
    xl: "hidden xl:block",
    "2xl": "hidden 2xl:block"
  };

  return (
    <div
      ref={ref}
      className={cn(breakpoints[breakpoint], className)}
      {...props}
    >
      {children}
    </div>
  );
});
ShowAt.displayName = "ShowAt";

export const HideAt = React.forwardRef(({ 
  breakpoint, 
  className, 
  children,
  ...props 
}, ref) => {
  const breakpoints = {
    xs: "hidden",
    sm: "sm:hidden",
    md: "md:hidden",
    lg: "lg:hidden",
    xl: "xl:hidden",
    "2xl": "2xl:hidden"
  };

  return (
    <div
      ref={ref}
      className={cn(breakpoints[breakpoint], className)}
      {...props}
    >
      {children}
    </div>
  );
});
HideAt.displayName = "HideAt"; 