import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, hint, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label className="text-sm font-medium text-blanc-chaud/80">
            {label}
          </label>
        )}
        <input
          type={type}
          className={cn(
            "w-full bg-noir-light border border-noir-border text-blanc-chaud",
            "placeholder:text-gris-texte rounded-xl px-4 py-3 text-sm",
            "focus:outline-none focus:border-vert-congo focus:ring-1 focus:ring-vert-congo",
            "transition-colors duration-200",
            "disabled:opacity-40 disabled:cursor-not-allowed",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="text-xs text-red-400 flex items-center gap-1">
            <span>⚠</span>
            {error}
          </p>
        )}
        {hint && !error && (
          <p className="text-xs text-gris-texte">{hint}</p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
