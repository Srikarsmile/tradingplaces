import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SIGNALS, SIGNAL_LABELS, calcSignalAverages, identifyWeakBeats, calcDelta, compositeScore } from "../constants/scoringConstants";
import { dialogueScenarios } from "../constants/scenarios";
import RadarChart from "../components/RadarChart";

const DEBRIEF_KEY = "TP_DEBRIEF_DATA";

export default function Debrief() {
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [rerunBeats, setRerunBeats] = useState({}); // beatIdx → new optionIdx
    const [expandedBeat, setExpandedBeat] = useState(null);

    useEffect(() => {
        try {
            const raw = localStorage.getItem(DEBRIEF_KEY);
            if (raw) setData(JSON.parse(raw));
        } catch (e) {
            console.error("Failed to load debrief data", e);
        }
    }, []);

    const scenario = useMemo(() => {
        if (!data) return null;
        return dialogueScenarios.find((s) => s.id === data.scenarioId) || null;
    }, [data]);

    const originalAverages = useMemo(() => {
        if (!scenario || !data) return {};
        return calcSignalAverages(data.selections, scenario.lines);
    }, [scenario, data]);

    const weakBeats = useMemo(() => {
        if (!scenario || !data) return [];
        return identifyWeakBeats(data.selections, scenario.lines, 2);
    }, [scenario, data]);

    // Merged selections: original + any re-runs
    const mergedSelections = useMemo(() => {
        if (!data) return [];
        const merged = [...data.selections];
        Object.entries(rerunBeats).forEach(([idx, val]) => {
            merged[parseInt(idx)] = val;
        });
        return merged;
    }, [data, rerunBeats]);

    const rerunAverages = useMemo(() => {
        if (!scenario || Object.keys(rerunBeats).length === 0) return null;
        return calcSignalAverages(mergedSelections, scenario.lines);
    }, [scenario, mergedSelections, rerunBeats]);

    const delta = useMemo(() => {
        if (!rerunAverages) return null;
        return calcDelta(originalAverages, rerunAverages);
    }, [originalAverages, rerunAverages]);

    if (!data || !scenario) {
        return (
            <div className="max-w-4xl mx-auto py-20 text-center animate-fade-in">
                <div className="glass-card-elevated p-12">
                    <div className="text-5xl mb-4">📋</div>
                    <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">No debrief data</h2>
                    <p className="text-[var(--text-secondary)] mb-6">
                        Complete a scenario first to generate your debrief.
                    </p>
                    <button
                        onClick={() => navigate("/workspace/scenario")}
                        className="btn-primary px-6 py-3 text-sm"
                    >
                        Go to Scenarios
                    </button>
                </div>
            </div>
        );
    }

    const originalComposite = compositeScore(originalAverages);
    const rerunComposite = rerunAverages ? compositeScore(rerunAverages) : null;

    return (
        <div className="max-w-5xl mx-auto pb-16 animate-fade-in">
            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-[var(--accent-cyan-subtle)] rounded-2xl flex items-center justify-center">
                    <span className="text-2xl">📊</span>
                </div>
                <div>
                    <p className="text-xs font-semibold text-[var(--accent-cyan)] uppercase tracking-[0.08em]">
                        Structured Debrief
                    </p>
                    <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[var(--text-primary)]">
                        {scenario.title}
                    </h1>
                    <p className="text-[var(--text-secondary)] mt-1 text-sm">
                        Review your responses, see your signal scores, and re-run key moments.
                    </p>
                </div>
            </div>

            <div className="grid lg:grid-cols-5 gap-6">
                {/* ── Left: Beat-by-beat replay ── */}
                <div className="lg:col-span-3 space-y-4">
                    <div className="glass-card-elevated p-5 mb-2">
                        <h3 className="text-sm font-bold text-[var(--text-primary)] uppercase tracking-wider mb-1">
                            Your Run — Beat by Beat
                        </h3>
                        <p className="text-xs text-[var(--text-tertiary)]">
                            {weakBeats.length > 0
                                ? `${weakBeats.length} moment${weakBeats.length > 1 ? "s" : ""} flagged for re-run`
                                : "All moments scored well"}
                        </p>
                    </div>

                    {scenario.lines.map((line, beatIdx) => {
                        const choiceIdx = data.selections[beatIdx];
                        const chosen = choiceIdx != null ? line.options[choiceIdx] : null;
                        const isFlagged = weakBeats.includes(beatIdx);
                        const isExpanded = expandedBeat === beatIdx;
                        const rerunChoice = rerunBeats[beatIdx];
                        const rerunOption = rerunChoice != null ? line.options[rerunChoice] : null;

                        return (
                            <div
                                key={beatIdx}
                                className={`glass-card-elevated p-5 transition-all ${isFlagged ? "border-l-[3px] border-l-[var(--accent-rose)]" : ""
                                    }`}
                            >
                                {/* Beat header */}
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-mono font-bold text-[var(--text-tertiary)]">
                                            Beat {beatIdx + 1}
                                        </span>
                                        <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${line.role === "officer"
                                                ? "bg-[var(--accent-cyan-subtle)] text-[var(--accent-cyan)]"
                                                : "bg-[var(--accent-pink-subtle)] text-[var(--accent-pink)]"
                                            }`}>
                                            {line.persona}
                                        </span>
                                        {isFlagged && (
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--accent-rose)] bg-[var(--accent-rose)]/10 px-2 py-0.5 rounded-full">
                                                ⚠ Flagged
                                            </span>
                                        )}
                                    </div>
                                    {/* Voice playback */}
                                    {data.recordings?.[`${scenario.id}-${beatIdx}`] && (
                                        <AudioPlayback url={data.recordings[`${scenario.id}-${beatIdx}`]} />
                                    )}
                                </div>

                                {/* Dialogue text */}
                                <p className="text-sm text-[var(--text-primary)] font-medium leading-relaxed mb-2">
                                    "{line.text}"
                                </p>
                                <p className="text-xs text-[var(--text-tertiary)] mb-3">
                                    Cue: {line.cue}
                                </p>

                                {/* What you chose */}
                                {chosen && (
                                    <div className={`rounded-xl p-3 mb-3 border ${rerunChoice != null
                                            ? "bg-[var(--surface-700)]/50 border-[var(--surface-600)] opacity-60"
                                            : "bg-[var(--accent-cyan-subtle)] border-[var(--accent-cyan)]/20"
                                        }`}>
                                        <p className="text-xs font-bold text-[var(--text-tertiary)] uppercase tracking-wider mb-1">
                                            {rerunChoice != null ? "Original choice" : "Your choice"}
                                        </p>
                                        <p className="text-sm font-semibold text-[var(--text-primary)]">{chosen.label}</p>
                                        {chosen.signals && (
                                            <div className="flex flex-wrap gap-1.5 mt-2">
                                                {SIGNALS.map((s) => (
                                                    <span
                                                        key={s}
                                                        className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${chosen.signals[s] === 2
                                                                ? "bg-emerald-500/20 text-emerald-400"
                                                                : chosen.signals[s] === 1
                                                                    ? "bg-amber-500/20 text-amber-400"
                                                                    : "bg-red-500/20 text-red-400"
                                                            }`}
                                                    >
                                                        {SIGNAL_LABELS[s]}:{chosen.signals[s]}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Re-run result */}
                                {rerunOption && (
                                    <div className="rounded-xl p-3 mb-3 bg-emerald-500/10 border border-emerald-500/20">
                                        <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
                                            Re-run choice ✓
                                        </p>
                                        <p className="text-sm font-semibold text-[var(--text-primary)]">{rerunOption.label}</p>
                                        {rerunOption.signals && (
                                            <div className="flex flex-wrap gap-1.5 mt-2">
                                                {SIGNALS.map((s) => {
                                                    const orig = chosen?.signals?.[s] ?? 0;
                                                    const rerun = rerunOption.signals[s];
                                                    const diff = rerun - orig;
                                                    return (
                                                        <span
                                                            key={s}
                                                            className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${rerun === 2
                                                                    ? "bg-emerald-500/20 text-emerald-400"
                                                                    : rerun === 1
                                                                        ? "bg-amber-500/20 text-amber-400"
                                                                        : "bg-red-500/20 text-red-400"
                                                                }`}
                                                        >
                                                            {SIGNAL_LABELS[s]}:{rerun}
                                                            {diff !== 0 && (
                                                                <span className={diff > 0 ? "text-emerald-300" : "text-red-300"}>
                                                                    {" "}({diff > 0 ? "+" : ""}{diff})
                                                                </span>
                                                            )}
                                                        </span>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Re-run UI for flagged beats */}
                                {isFlagged && rerunChoice == null && (
                                    <div>
                                        <button
                                            onClick={() => setExpandedBeat(isExpanded ? null : beatIdx)}
                                            className="text-xs font-bold text-[var(--accent-rose)] hover:text-[var(--accent-pink)] transition-colors uppercase tracking-wider"
                                        >
                                            {isExpanded ? "Cancel re-run" : "↻ Re-run this moment"}
                                        </button>

                                        {isExpanded && (
                                            <div className="mt-3 space-y-2">
                                                <p className="text-xs text-[var(--text-tertiary)] font-semibold">
                                                    Choose a different response:
                                                </p>
                                                {line.options.map((opt, optIdx) => {
                                                    if (optIdx === choiceIdx) return null; // hide original choice
                                                    return (
                                                        <button
                                                            key={opt.label}
                                                            onClick={() => {
                                                                setRerunBeats((prev) => ({ ...prev, [beatIdx]: optIdx }));
                                                                setExpandedBeat(null);
                                                            }}
                                                            className="w-full text-left px-4 py-3 rounded-xl border bg-[var(--surface-700)] border-[var(--surface-500)] text-[var(--text-secondary)] hover:border-[var(--accent-cyan)] hover:text-[var(--text-primary)] transition-all"
                                                        >
                                                            <span className="block text-sm font-semibold">{opt.label}</span>
                                                            {opt.signals && (
                                                                <span className="block text-[10px] font-mono text-[var(--text-tertiary)] mt-1">
                                                                    {SIGNALS.map((s) => `${SIGNAL_LABELS[s]}:${opt.signals[s]}`).join(" · ")}
                                                                </span>
                                                            )}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* ── Right: Radar + Scores ── */}
                <div className="lg:col-span-2 space-y-4">
                    {/* Radar chart */}
                    <div className="glass-card-elevated p-5">
                        <h3 className="text-sm font-bold text-[var(--text-primary)] uppercase tracking-wider mb-4">
                            Signal Profile
                        </h3>
                        <RadarChart
                            signals={rerunAverages || originalAverages}
                            comparison={rerunAverages ? originalAverages : null}
                            size={280}
                        />
                        <div className="mt-4 flex items-center justify-center gap-4 text-xs">
                            <div className="flex items-center gap-1.5">
                                <div className="w-3 h-0.5 bg-[var(--accent-cyan)] rounded" />
                                <span className="text-[var(--text-tertiary)]">
                                    {rerunAverages ? "After re-run" : "Your scores"}
                                </span>
                            </div>
                            {rerunAverages && (
                                <div className="flex items-center gap-1.5">
                                    <div className="w-3 h-0.5 border-t border-dashed border-[var(--accent-rose)]" />
                                    <span className="text-[var(--text-tertiary)]">Original</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Composite score */}
                    <div className="glass-card-elevated p-5">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-sm font-bold text-[var(--text-primary)] uppercase tracking-wider">
                                Composite Score
                            </h3>
                            <span className="text-2xl font-extrabold text-[var(--accent-cyan)]">
                                {(rerunComposite ?? originalComposite).toFixed(1)}/2
                            </span>
                        </div>
                        {rerunComposite != null && (
                            <div className="text-xs text-[var(--text-tertiary)]">
                                Original: {originalComposite.toFixed(1)} →{" "}
                                <span className={rerunComposite > originalComposite ? "text-emerald-400" : "text-red-400"}>
                                    {rerunComposite.toFixed(1)} ({rerunComposite > originalComposite ? "+" : ""}
                                    {(rerunComposite - originalComposite).toFixed(1)})
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Per-signal breakdown */}
                    <div className="glass-card-elevated p-5">
                        <h3 className="text-sm font-bold text-[var(--text-primary)] uppercase tracking-wider mb-3">
                            Signal Breakdown
                        </h3>
                        <div className="space-y-3">
                            {SIGNALS.map((s) => {
                                const val = (rerunAverages || originalAverages)[s] || 0;
                                const origVal = originalAverages[s] || 0;
                                const pct = (val / 2) * 100;
                                return (
                                    <div key={s}>
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-xs font-semibold text-[var(--text-secondary)]">{s}</span>
                                            <span className="text-xs font-mono font-bold text-[var(--text-primary)]">
                                                {val.toFixed(1)}
                                                {rerunAverages && val !== origVal && (
                                                    <span className={val > origVal ? "text-emerald-400" : "text-red-400"}>
                                                        {" "}({val > origVal ? "+" : ""}{(val - origVal).toFixed(1)})
                                                    </span>
                                                )}
                                            </span>
                                        </div>
                                        <div className="h-1.5 bg-[var(--surface-600)] rounded-full overflow-hidden">
                                            <div
                                                className="h-full rounded-full transition-all duration-500"
                                                style={{
                                                    width: `${pct}%`,
                                                    background:
                                                        val >= 1.5
                                                            ? "var(--accent-emerald)"
                                                            : val >= 0.8
                                                                ? "var(--accent-primary)"
                                                                : "var(--accent-rose)",
                                                }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="glass-card-elevated p-5 space-y-3">
                        {Object.keys(rerunBeats).length > 0 && (
                            <button
                                onClick={() => setRerunBeats({})}
                                className="w-full btn-secondary text-sm py-2.5"
                            >
                                Reset Re-runs
                            </button>
                        )}
                        <button
                            onClick={() => navigate("/workspace/scenario")}
                            className="w-full btn-primary text-sm py-2.5"
                        >
                            Run Again
                        </button>
                        <button
                            onClick={() => navigate("/workspace/report")}
                            className="w-full text-sm py-2.5 rounded-xl border border-[var(--surface-500)] text-[var(--text-secondary)] hover:border-[var(--accent-cyan)] hover:text-[var(--text-primary)] transition-all font-semibold"
                        >
                            View Full Report
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

/** Tiny audio playback inline component */
function AudioPlayback({ url }) {
    const [playing, setPlaying] = useState(false);
    const ref = React.useRef(null);

    return (
        <div className="flex items-center gap-1">
            <audio ref={ref} src={url} onEnded={() => setPlaying(false)} />
            <button
                onClick={() => {
                    if (playing) { ref.current?.pause(); setPlaying(false); }
                    else { ref.current?.play(); setPlaying(true); }
                }}
                className="text-[10px] font-bold uppercase tracking-wider text-[var(--accent-cyan)] hover:text-[var(--text-primary)] transition-colors"
            >
                {playing ? "⏸ Pause" : "▶ Play recording"}
            </button>
        </div>
    );
}
