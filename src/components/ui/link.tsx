// src/components/ui/link.tsx
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import { ExternalLink } from "lucide-react";

const linkVariants = cva(
  // Base styles
  "inline-flex items-center gap-1 rounded-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 decoration-2 hover:underline",
  {
    variants: {
      variant: {
        default: "text-primary underline-offset-2",
        muted: "text-muted-foreground hover:text-primary",
        underline: "underline-offset-4 hover:underline text-foreground",
        ghost: "hover:text-foreground/80",
        nav: "px-3 py-2 text-foreground/60 hover:text-foreground hover:bg-accent rounded-md transition-colors",
        button:
          "bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2 rounded-md",
        destructive: "text-destructive hover:text-destructive/80",
      },
      size: {
        default: "text-base",
        sm: "text-sm",
        lg: "text-lg",
      },
      weight: {
        default: "font-normal",
        medium: "font-medium",
        semibold: "font-semibold",
      },
      isActive: {
        true: "text-foreground font-medium",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      weight: "default",
      isActive: false,
    },
  }
);

export interface LinkProps
  extends RouterLinkProps,
    VariantProps<typeof linkVariants> {
  external?: boolean;
  showExternalIcon?: boolean;
  className?: string;
}

const CustomLink = forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      className,
      variant,
      size,
      weight,
      isActive,
      external = false,
      showExternalIcon = true,
      children,
      ...props
    },
    ref
  ) => {
    const classes = cn(
      linkVariants({ variant, size, weight, isActive }),
      className
    );

    if (external) {
      return (
        <a
          ref={ref}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
          {...(props as any)}
        >
          {children}
          {showExternalIcon && <ExternalLink className="w-4 h-4" />}
        </a>
      );
    }

    return (
      <RouterLink ref={ref} className={classes} {...props}>
        {children}
      </RouterLink>
    );
  }
);
CustomLink.displayName = "Link";

export { CustomLink, linkVariants };
