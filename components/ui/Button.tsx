import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

// Sistema CTA — Documento 3 §1.4: il primario inverte sempre la superficie
// (mai un riempimento bronzo/oro). Le classi qui sotto assumono di essere
// annidate dentro .surface-dark o .surface-light (v. Section.tsx).
const base =
  "inline-flex items-center gap-2.5 font-sans font-semibold text-[15px] rounded-sm px-7 py-3.5 transition-all duration-200 ease-out cursor-pointer";

const variants = {
  primary: cn(
    base,
    "bg-ink text-ivory hover:bg-black",
    "[.surface-dark_&]:bg-ivory [.surface-dark_&]:text-ink [.surface-dark_&]:hover:bg-white"
  ),
  secondary: cn(
    base,
    "bg-transparent border border-bronze text-text-light hover:bg-bronze/10",
    "[.surface-dark_&]:border-bronze-hi [.surface-dark_&]:text-text-dark [.surface-dark_&]:hover:bg-bronze-hi/10"
  ),
  link: cn(
    "inline-flex items-center gap-2 font-sans font-semibold text-[15px] border-b border-bronze pb-0.5 transition-colors duration-200",
    "[.surface-dark_&]:border-bronze-hi"
  ),
};

type Variant = keyof typeof variants;

interface CommonProps {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
}

type ButtonAsLink = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { variant = "primary", className, children, ...rest } = props;
  const classes = cn(variants[variant], className);

  if ("href" in props && props.href) {
    const { href, ...anchorRest } = rest as AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <Link href={props.href} className={classes} {...anchorRest}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
