import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes } from "react";

const button = cva(
  "inline-flex items-center justify-center rounded-md text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[color:var(--primary)] disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--btn-bg)] text-[var(--btn-text)] border border-[color:var(--btn-border)] hover:bg-[var(--btn-bg-hover)] hover:border-[color:var(--btn-border-hover)]",
        outline:
          "border border-[color:var(--btn-border)] text-[var(--btn-outline-text)] hover:bg-[var(--btn-bg-hover)] hover:border-[color:var(--btn-border-hover)]",
        ghost: "hover:bg-[var(--btn-ghost-hover-bg)]",
      },
      size: {
        md: "h-10 px-4",
        lg: "h-12 px-6 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

type Props = ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof button>;

export function Button({ className, variant, size, ...props }: Props) {
  return <button className={cn(button({ variant, size }), className)} {...props} />;
}
