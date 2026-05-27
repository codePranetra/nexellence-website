"use client";

import Link from "next/link";
import { useMagnetic } from "@/hooks/use-magnetic";
import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MagneticButtonProps extends ButtonProps {
  href?: string;
}

function isExternalHref(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

export function MagneticButton({
  href,
  children,
  className,
  ...props
}: MagneticButtonProps) {
  const ref = useMagnetic(0.3);

  if (href) {
    if (isExternalHref(href)) {
      return (
        <Button asChild className={cn("transition-transform duration-200", className)} {...props}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            ref={ref as React.RefObject<HTMLAnchorElement>}
            data-cursor="pointer"
          >
            {children}
          </a>
        </Button>
      );
    }

    return (
      <Button asChild className={cn("transition-transform duration-200", className)} {...props}>
        <Link href={href} ref={ref as React.RefObject<HTMLAnchorElement>} data-cursor="pointer">
          {children}
        </Link>
      </Button>
    );
  }

  return (
    <Button
      ref={ref as React.RefObject<HTMLButtonElement>}
      className={cn("transition-transform duration-200", className)}
      data-cursor="pointer"
      {...props}
    >
      {children}
    </Button>
  );
}
