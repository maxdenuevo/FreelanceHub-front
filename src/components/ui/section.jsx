import React from "react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";

const Section = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <section
      ref={ref}
      className={cn("py-12 md:py-16 lg:py-20", className)}
      {...props}
    >
      <Container>{children}</Container>
    </section>
  );
});
Section.displayName = "Section";

export { Section }; 