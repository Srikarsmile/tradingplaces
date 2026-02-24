import React, { memo } from "react";

const toneStyles = {
  good: {
    bg: "linear-gradient(90deg, #34d399, #10b981)",
    shadow: "0 0 12px rgba(52, 211, 153, 0.3)",
  },
  medium: {
    bg: "linear-gradient(90deg, #fbbf24, #f59e0b)",
    shadow: "0 0 12px rgba(251, 191, 36, 0.3)",
  },
  low: {
    bg: "linear-gradient(90deg, #ef4444, #dc2626)",
    shadow: "0 0 12px rgba(239, 68, 68, 0.3)",
  },
};

function MetricBar({ label, value }) {
  const tone = value >= 4 ? toneStyles.good : value >= 3 ? toneStyles.medium : toneStyles.low;
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between text-xs font-medium">
        <span className="text-[var(--text-secondary)]">{label}</span>
        <span className="font-mono text-[var(--text-tertiary)]">{value}/5</span>
      </div>
      <div className="h-2 w-full bg-[var(--surface-500)] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{
            width: `${(value / 5) * 100}%`,
            background: tone.bg,
            boxShadow: tone.shadow,
            animation: "progress-fill 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
          }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={1}
          aria-valuemax={5}
          aria-label={`${label}: ${value} out of 5`}
        />
      </div>
    </div>
  );
}

export default memo(MetricBar);
