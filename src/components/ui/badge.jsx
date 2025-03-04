import React from "react";
import { cn } from "@/lib/utils";
import { getBadgeVariant } from "@/utils/colors";

const Badge = React.forwardRef(({ className, variant = "default", children, ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border",
        getBadgeVariant(variant),
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
});
Badge.displayName = "Badge";

export { Badge }; 