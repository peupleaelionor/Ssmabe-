import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl",
    "text-sm font-semibold transition-all duration-200 select-none",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-noir",
    "disabled:pointer-events-none disabled:opacity-40",
    "active:scale-[0.97]",
  ],
  {
    variants: {
      variant: {
        default:
          "bg-vert-congo text-blanc-chaud hover:bg-vert-light focus-visible:ring-vert-congo shadow-congo-glow",
        destructive:
          "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-600",
        outline:
          "border border-noir-border bg-transparent text-blanc-chaud hover:bg-noir-light hover:border-vert-congo/50 focus-visible:ring-blanc-chaud/20",
        secondary:
          "bg-noir-light text-blanc-chaud hover:bg-noir-border focus-visible:ring-blanc-chaud/20",
        ghost:
          "bg-transparent text-blanc-chaud hover:bg-noir-light focus-visible:ring-blanc-chaud/20",
        link:
          "bg-transparent text-cuivre underline-offset-4 hover:underline focus-visible:ring-cuivre",
        cuivre:
          "bg-cuivre text-blanc-chaud hover:bg-cuivre-light focus-visible:ring-cuivre shadow-cuivre-glow",
      },
      size: {
        default: "h-11 px-6 py-2.5",
        sm: "h-9 px-4 py-2 text-xs rounded-xl",
        lg: "h-14 px-8 py-3 text-base rounded-2xl",
        xl: "h-16 px-10 py-4 text-lg rounded-3xl",
        icon: "h-10 w-10 rounded-xl",
        "icon-sm": "h-8 w-8 rounded-lg",
        "icon-lg": "h-14 w-14 rounded-2xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
