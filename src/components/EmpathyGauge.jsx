import React, { memo } from "react";

function EmpathyGauge({ label, score, onChange }) {
  const toneColor =
    score >= 4
      ? "var(--accent-emerald)"
      : score >= 3
      ? "var(--accent-amber)"
      : "var(--accent-rose)";

  return (
    <div className="glass-card-elevated p-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-semibold text-[var(--text-primary)]">{label}</h4>
        <span className="text-xs font-mono font-medium text-[var(--text-tertiary)]">
          Empathy level: {score}/5
        </span>
      </div>
      <div className="h-2.5 w-full bg-[var(--surface-500)] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{
            width: `${(score / 5) * 100}%`,
            background: toneColor,
            boxShadow: `0 0 12px ${toneColor}40`,
            animation: "progress-fill 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
          }}
          role="progressbar"
          aria-valuenow={score}
          aria-valuemin={1}
          aria-valuemax={5}
          aria-label={`${label} empathy level: ${score} out of 5`}
        />
      </div>
      <input
        aria-label={`${label} empathy level`}
        type="range"
        min="1"
        max="5"
        step="1"
        value={score}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 w-full"
      />
      <p className="text-xs text-[var(--text-tertiary)] mt-2">
        Shift the slider after you roleplay to reflect how understood the other
        person would feel.
      </p>
    </div>
  );
}

export default memo(EmpathyGauge);
