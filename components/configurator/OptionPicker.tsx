import type { CatalogOption } from "@/lib/types";
import { cn } from "@/lib/utils";

interface OptionPickerProps<T extends CatalogOption> {
  options: T[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  renderSwatch?: (option: T) => React.ReactNode;
  showSwatch?: boolean;
}

export function OptionPicker<T extends CatalogOption>({
  options,
  selectedId,
  onSelect,
  renderSwatch,
  showSwatch = true,
}: OptionPickerProps<T>) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
      {options
        .filter((o) => o.active)
        .sort((a, b) => a.order - b.order)
        .map((option) => {
          const selected = option.id === selectedId;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onSelect(option.id)}
              aria-pressed={selected}
              className={cn(
                "group text-left border bg-ivory-2 transition-colors",
                selected ? "border-bronze" : "border-line-light hover:border-bronze/60"
              )}
            >
              {showSwatch && (
                <div className="aspect-square overflow-hidden border-b border-line-light">
                  {renderSwatch ? (
                    renderSwatch(option)
                  ) : (
                    <div className="h-full w-full" style={{ backgroundColor: option.material.baseColor }} />
                  )}
                </div>
              )}
              <div className="p-3.5">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-sans text-sm font-semibold">{option.label}</p>
                  <span
                    aria-hidden="true"
                    className={cn(
                      "h-3.5 w-3.5 shrink-0 rounded-full border",
                      selected ? "border-bronze bg-bronze" : "border-line-light"
                    )}
                  />
                </div>
                {option.description && (
                  <p className="mt-1.5 text-xs text-text-light-muted">{option.description}</p>
                )}
              </div>
            </button>
          );
        })}
    </div>
  );
}
