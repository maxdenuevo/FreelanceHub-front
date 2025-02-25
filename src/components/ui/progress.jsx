import React from "react";
import { cn } from "@/lib/utils";

const Progress = React.forwardRef(({ className, value = 0, max = 100, ...props }, ref) => {
  const percentage = value !== null ? Math.min(Math.max(value, 0), max) : 0;
  const calculatedValue = (percentage / max) * 100;

  return (
    <div
      ref={ref}
      className={cn(
        "relative h-4 w-full overflow-hidden rounded-full bg-gray-200",
        className
      )}
      {...props}
    >
      <div
        className="h-full w-full flex-1 bg-primary transition-all"
        style={{ transform: `translateX(-${100 - calculatedValue}%)` }}
      />
    </div>
  );
});

Progress.displayName = "Progress";

export { Progress }; 