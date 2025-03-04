import React from "react";
import { cn } from "@/lib/utils";
import {
  Card as BaseCard,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent
} from "@/components/ui/card";

const shadowVariants = {
  none: "",
  sm: "shadow-sm hover:shadow",
  md: "shadow hover:shadow-md",
  lg: "shadow-md hover:shadow-lg",
  xl: "shadow-lg hover:shadow-xl"
};

const EnhancedCard = React.forwardRef(({ 
  className, 
  children, 
  shadow = "md",
  interactive = true,
  ...props 
}, ref) => {
  return (
    <BaseCard
      ref={ref}
      className={cn(
        shadowVariants[shadow],
        interactive && "transition-all duration-200 ease-in-out",
        interactive && "hover:translate-y-[-2px]",
        className
      )}
      {...props}
    >
      {children}
    </BaseCard>
  );
});
EnhancedCard.displayName = "EnhancedCard";

export { 
  EnhancedCard,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent 
}; 