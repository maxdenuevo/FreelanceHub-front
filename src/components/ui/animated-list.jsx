import React from "react";
import { cn } from "@/lib/utils";

const AnimatedList = React.forwardRef(({ 
  className, 
  children, 
  animation = "slide-up", 
  staggered = true,
  ...props 
}, ref) => {
  const animationClass = `animate-${animation}`;

  return (
    <div
      ref={ref}
      className={cn(
        staggered && "stagger-animation",
        className
      )}
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;
        
        return React.cloneElement(child, {
          className: cn(animationClass, child.props.className)
        });
      })}
    </div>
  );
});
AnimatedList.displayName = "AnimatedList";

export { AnimatedList }; 