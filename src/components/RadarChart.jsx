import React from "react";
import { SIGNALS, SIGNAL_LABELS } from "../constants/scoringConstants";

/**
 * SVG Radar Chart for 6-signal visualization.
 * Props:
 *   signals: { "Active Listening": 1.5, ... } — scores (0–2)
 *   comparison: optional second set for delta overlay
 *   size: number (px), default 280
 */
export default function RadarChart({ signals = {}, comparison = null, size = 280 }) {
    const cx = size / 2;
    const cy = size / 2;
    const radius = size * 0.38;
    const levels = 3; // 0, 1, 2
    const angleSlice = (2 * Math.PI) / SIGNALS.length;

    // Get point on radar for a given signal index and value (0–2)
    const getPoint = (idx, value) => {
        const angle = angleSlice * idx - Math.PI / 2;
        const r = (value / 2) * radius;
        return {
            x: cx + r * Math.cos(angle),
            y: cy + r * Math.sin(angle),
        };
    };

    // Build path string from signal values
    const buildPath = (vals) => {
        return SIGNALS.map((s, i) => {
            const p = getPoint(i, vals[s] || 0);
            return `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`;
        }).join(" ") + " Z";
    };

    // Grid rings
    const gridRings = Array.from({ length: levels }, (_, i) => {
        const r = ((i + 1) / levels) * radius;
        return (
            <polygon
                key={i}
                points={SIGNALS.map((_, si) => {
                    const angle = angleSlice * si - Math.PI / 2;
                    return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
                }).join(" ")}
                fill="none"
                stroke="var(--surface-600)"
                strokeWidth="1"
                opacity={0.5}
            />
        );
    });

    // Axis lines
    const axes = SIGNALS.map((_, i) => {
        const p = getPoint(i, 2);
        return (
            <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="var(--surface-600)" strokeWidth="1" opacity={0.3} />
        );
    });

    // Labels
    const labels = SIGNALS.map((s, i) => {
        const p = getPoint(i, 2.5);
        return (
            <text
                key={s}
                x={p.x}
                y={p.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="var(--text-secondary)"
                fontSize="10"
                fontWeight="600"
            >
                {SIGNAL_LABELS[s]}
            </text>
        );
    });

    return (
        <div className="flex flex-col items-center w-full">
            <svg className="w-full max-w-[280px]" viewBox={`0 0 ${size} ${size}`}>
                {gridRings}
                {axes}

                {/* Comparison (if present) — shown as outline */}
                {comparison && (
                    <path
                        d={buildPath(comparison)}
                        fill="rgba(251, 113, 133, 0.08)"
                        stroke="var(--accent-rose)"
                        strokeWidth="1.5"
                        strokeDasharray="4 3"
                        opacity={0.7}
                    />
                )}

                {/* Primary data */}
                <path
                    d={buildPath(signals)}
                    fill="rgba(6, 182, 212, 0.15)"
                    stroke="var(--accent-cyan)"
                    strokeWidth="2"
                />

                {/* Data points */}
                {SIGNALS.map((s, i) => {
                    const p = getPoint(i, signals[s] || 0);
                    return (
                        <circle
                            key={s}
                            cx={p.x}
                            cy={p.y}
                            r={3.5}
                            fill="var(--accent-cyan)"
                            stroke="var(--surface-900)"
                            strokeWidth="1.5"
                        />
                    );
                })}

                {labels}
            </svg>

            {/* Signal legend */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 mt-2 text-xs">
                {SIGNALS.map((s) => (
                    <div key={s} className="flex items-center gap-2">
                        <span className="font-mono font-bold text-[var(--accent-cyan)]">{SIGNAL_LABELS[s]}</span>
                        <span className="text-[var(--text-tertiary)]">{s}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
