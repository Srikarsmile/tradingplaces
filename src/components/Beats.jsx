import React, { memo } from "react";

function Beats({ title, beats }) {
  return (
    <div className="glass-card-elevated p-4">
      <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-3">{title}</h4>
      <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
        {beats.map((line, idx) => (
          <li key={idx} className="flex gap-3 items-start">
            <span
              className="mt-1.5 h-2 w-2 rounded-full bg-[var(--accent-cyan)] shrink-0"
              style={{ boxShadow: "0 0 6px rgba(0, 229, 255, 0.4)" }}
              aria-hidden="true"
            />
            <span>{line}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default memo(Beats);
