import type { DimensionRule } from "@/lib/types";

interface DimensionsControlProps {
  label: string;
  rule: DimensionRule;
  value: number;
  onChange: (value: number) => void;
}

function DimensionSlider({ label, rule, value, onChange }: DimensionsControlProps) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <label className="font-sans text-sm font-semibold" htmlFor={`dim-${label}`}>
          {label}
        </label>
        <span className="font-mono text-sm text-text-light-muted">{value} cm</span>
      </div>
      <input
        id={`dim-${label}`}
        type="range"
        min={rule.min}
        max={rule.max}
        step={rule.step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 h-1 w-full cursor-pointer appearance-none bg-line-light accent-bronze"
      />
      <div className="mt-1 flex justify-between font-mono text-[11px] text-text-light-muted">
        <span>{rule.min}cm</span>
        <span>{rule.max}cm</span>
      </div>
    </div>
  );
}

export { DimensionSlider };
