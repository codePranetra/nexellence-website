import Image from "next/image";
import { cn } from "@/lib/utils";
import { SITE } from "@/lib/constants";

type BrandLogoVariant = "nav" | "hero" | "footer" | "loader";

const variantStyles: Record<
  BrandLogoVariant,
  { width: number; height: number; className: string }
> = {
  nav: {
    width: 200,
    height: 48,
    className: "h-9 w-auto min-w-[140px] sm:h-10 sm:min-w-[160px]",
  },
  hero: {
    width: 280,
    height: 68,
    className: "h-12 w-auto sm:h-14",
  },
  footer: {
    width: 220,
    height: 52,
    className: "h-11 w-auto",
  },
  loader: {
    width: 260,
    height: 62,
    className: "h-14 w-auto",
  },
};

interface BrandLogoProps {
  variant?: BrandLogoVariant;
  className?: string;
  priority?: boolean;
}

export function BrandLogo({
  variant = "nav",
  className,
  priority = false,
}: BrandLogoProps) {
  const v = variantStyles[variant];

  return (
    <Image
      src={SITE.logo}
      alt={SITE.name}
      width={v.width}
      height={v.height}
      priority={priority}
      className={cn("object-contain object-left", v.className, className)}
    />
  );
}
