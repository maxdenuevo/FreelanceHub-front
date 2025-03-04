import React from "react";
import { cn } from "@/lib/utils";

const textVariants = {
  h1: "text-4xl font-extrabold tracking-tight lg:text-5xl",
  h2: "text-3xl font-semibold tracking-tight",
  h3: "text-2xl font-semibold tracking-tight",
  h4: "text-xl font-semibold tracking-tight",
  p: "leading-7",
  large: "text-lg font-medium",
  small: "text-sm font-medium",
  muted: "text-sm text-muted-foreground",
  lead: "text-xl text-muted-foreground",
  label: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
};

const Text = React.forwardRef(({ 
  className, 
  variant = "p", 
  as,
  children, 
  ...props 
}, ref) => {
  const Component = as || (
    variant === 'h1' ? 'h1' :
    variant === 'h2' ? 'h2' :
    variant === 'h3' ? 'h3' :
    variant === 'h4' ? 'h4' :
    variant === 'p' ? 'p' :
    variant === 'small' ? 'small' :
    variant === 'muted' ? 'p' :
    variant === 'lead' ? 'p' :
    variant === 'label' ? 'label' :
    'span'
  );

  return (
    <Component
      ref={ref}
      className={cn(textVariants[variant], className)}
      {...props}
    >
      {children}
    </Component>
  );
});
Text.displayName = "Text";

export { Text }; 