import React from "react";
import { cn } from "@/lib/utils";

const Grid = React.forwardRef(({ 
  className, 
  children,
  cols = {
    xs: 1,
    sm: 2,
    md: 3,
    lg: 4
  },
  gap = "md",
  ...props 
}, ref) => {
  const colClasses = {
    xs: `grid-cols-${cols.xs}`,
    sm: `sm:grid-cols-${cols.sm}`,
    md: `md:grid-cols-${cols.md}`,
    lg: `lg:grid-cols-${cols.lg}`,
    xl: cols.xl ? `xl:grid-cols-${cols.xl}` : '',
    '2xl': cols['2xl'] ? `2xl:grid-cols-${cols['2xl']}` : ''
  };

  const gapClasses = {
    xs: "gap-1",
    sm: "gap-2",
    md: "gap-4",
    lg: "gap-6",
    xl: "gap-8"
  };

  return (
    <div
      ref={ref}
      className={cn(
        "grid",
        colClasses.xs,
        colClasses.sm,
        colClasses.md,
        colClasses.lg,
        colClasses.xl,
        colClasses['2xl'],
        gapClasses[gap],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});
Grid.displayName = "Grid";

export { Grid }; 