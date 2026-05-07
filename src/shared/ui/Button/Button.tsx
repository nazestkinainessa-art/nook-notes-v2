import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none",
  {
    variants: {
      variant: {
        default: "text-[#4a3f35] bg-transparent border-none",
        tab: "text-[#4a3f35] bg-transparent underline underline-offset-8 decoration-2 decoration-[#4a3f35] rounded-none shadow-none ring-0 focus:outline-none focus:ring-0",
        add: "bg-[#4a3f35] text-white rounded-full px-6 py-2 hover:opacity-90",
        create: "bg-[#755d48] text-white rounded-full px-6 py-2 hover:opacity-90",
        icon: "text-[#4a3f35] bg-transparent border-none",
      },
      size: {
        default: "h-8 px-2.5 text-sm",
        icon: "size-6 text-[14px]",
        lg: "h-13",
        md: "h-10",
        sm: "h-7",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
