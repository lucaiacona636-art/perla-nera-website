import { cn } from "@/lib/utils";

interface SectionProps {
  surface?: "dark" | "light";
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
  id?: string;
  as?: "section" | "div";
}

// Unità di base del ritmo editoriale — Documento 3 §1, §3.
// Ogni sezione dichiara la propria superficie; niente colori hardcoded a valle.
export function Section({
  surface = "light",
  className,
  containerClassName,
  children,
  id,
  as: Tag = "section",
}: SectionProps) {
  return (
    <Tag
      id={id}
      className={cn(
        surface === "dark" ? "surface-dark" : "surface-light",
        "py-24 lg:py-48",
        className
      )}
    >
      <div className={cn("container-page", containerClassName)}>{children}</div>
    </Tag>
  );
}
