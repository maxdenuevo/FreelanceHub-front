import React from "react";
import { cn } from "@/lib/utils";

export const Stack = React.forwardRef(({ className, space = "md", children, ...props }, ref) => {
  const spaces = {
    xs: "space-y-1",
    sm: "space-y-2",
    md: "space-y-4",
    lg: "space-y-6",
    xl: "space-y-8",
    "2xl": "space-y-12"
  };
  
  return (
    <div
      ref={ref}
      className={cn(spaces[space], className)}
      {...props}
    >
      {children}
    </div>
  );
});
Stack.displayName = "Stack";

export const HStack = React.forwardRef(({ className, space = "md", children, ...props }, ref) => {
  const spaces = {
    xs: "space-x-1",
    sm: "space-x-2",
    md: "space-x-4",
    lg: "space-x-6",
    xl: "space-x-8",
    "2xl": "space-x-12"
  };
  
  return (
    <div
      ref={ref}
      className={cn("flex", spaces[space], className)}
      {...props}
    >
      {children}
    </div>
  );
});
HStack.displayName = "HStack";

export const Spacer = ({ size = "md" }) => {
  const sizes = {
    xs: "h-1",
    sm: "h-2",
    md: "h-4",
    lg: "h-6",
    xl: "h-8",
    "2xl": "h-12"
  };
  
  return <div className={sizes[size]} />;
}; 