import { useState, useMemo, useCallback, useEffect } from "react";
import { checkpointEchoDialogue } from "../constants/scenarios";
import {
    behaviourSignals,
    computeAssessmentScores,
    ASSESSMENT_STORAGE_KEY,
} from "../constants/behaviourSignals";

/* ─────────────────── helpers ─────────────────── */

const PHASE = { RUN: "run", DEBRIEF: "debrief", RERUN: "rerun" };

function loadSavedAssessment() {
    try {
        const raw = window.localStorage.getItem(ASSESSMENT_STORAGE_KEY);
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
}

function saveAssessment(data) {
    try {
        window.localStorage.setItem(ASSESSMENT_STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
        console.error("Unable to persist assessment", e);
    }
}

/* ─────────────────── sub-components ──────────── */

function SignalBar({ signal, showRerun, rerunScore }) {
    const pct = (signal.score / 2) * 100;
    const rerunPct = rerunScore != null ? (rerunScore / 2) * 100 : null;

    const getToneStyle = (score) => {
        if (score >= 2) return { bg: "linear-gradient(90deg, #34d399, #10b981)", shadow: "0 0 12px rgba(52, 211, 153, 0.3)", badge: "bg-[var(--accent-emerald-subtle)] text-[var(--accent-emerald)]" };
        if (score >= 1) return { bg: "linear-gradient(90deg, #fbbf24, #f59e0b)", shadow: "0 0 12px rgba(251, 191, 36, 0.3)", badge: "bg-[var(--accent-amber-subtle)] text-[var(--accent-amber)]" };
        return { bg: "linear-gradient(90deg, #ef4444, #dc2626)", shadow: "0 0 12px rgba(239, 68, 68, 0.3)", badge: "bg-[var(--accent-rose-subtle)] text-[var(--accent-rose)]" };
    };

    const tone = getToneStyle(signal.score);
    const rerunTone = rerunScore != null ? getToneStyle(rerunScore) : null;

    return (
        <div className="glass-card-elevated p-4">
            <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{signal.icon}</span>
                <div className="flex-1">
                    <p className="text-sm font-semibold text-[var(--text-primary)]">
                        {signal.label}
                    </p>
                    <p className="text-xs text-[var(--text-tertiary)]">{signal.description}</p>
                </div>
                <span className={`text-xs font-bold font-mono px-2 py-1 rounded-full ${tone.badge}`}>
                    {signal.score}/2
                </span>
            </div>
            <div className="h-2 w-full bg-[var(--surface-500)] rounded-full overflow-hidden">
                <div
                    className="h-full rounded-full"
                    style={{ width: `${pct}%`, background: tone.bg, boxShadow: tone.shadow, animation: "progress-fill 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards" }}
                />
            </div>
            {showRerun && rerunScore != null && (
                <div className="mt-2">
                    <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-[var(--text-tertiary)]">Re-run score</span>
                        <span
                            className={`font-bold font-mono ${
                                rerunScore > signal.score
                                    ? "text-[var(--accent-emerald)]"
                                    : rerunScore === signal.score
                                        ? "text-[var(--text-tertiary)]"
                                        : "text-[var(--accent-rose)]"
                            }`}
                        >
                            {rerunScore}/2{" "}
                            {rerunScore > signal.score ? "↑" : rerunScore < signal.score ? "↓" : "—"}
                        </span>
                    </div>
                    <div className="h-1.5 w-full bg-[var(--surface-500)] rounded-full overflow-hidden">
                        <div
                            className="h-full rounded-full"
                            style={{ width: `${rerunPct}%`, background: rerunTone.bg, boxShadow: rerunTone.shadow }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

function ChoiceTimeline({ selections, lines, flaggedIndices }) {
    return (
        <div className="space-y-3">
            {lines.map((line, idx) => {
                const choice = selections[idx];
                const option = choice != null ? line.options[choice] : null;
                const isFlagged = flaggedIndices.includes(idx);
                const signal = behaviourSignals.find((s) => s.lineIndex === idx);

                return (
                    <div
                        key={idx}
                        className={`rounded-xl border p-4 transition-all ${
                            isFlagged
                                ? "border-[var(--accent-rose)]/30 bg-[var(--accent-rose-subtle)]"
                                : "border-[var(--surface-500)] bg-[var(--surface-700)]"
                        }`}
                    >
                        <div className="flex items-start justify-between gap-3">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-full bg-[var(--surface-600)] text-[var(--text-tertiary)]">
                                        Line {idx + 1}
                                    </span>
                                    <span className="text-xs text-[var(--text-tertiary)]">
                                        {line.persona} — {line.role}
                                    </span>
                                    {isFlagged && (
                                        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[var(--accent-rose-subtle)] text-[var(--accent-rose)]">
                                            Focus moment
                                        </span>
                                    )}
                                </div>
                                <p className="text-sm text-[var(--text-primary)] font-medium mt-1">
                                    "{line.text}"
                                </p>
                                {option && (
                                    <p className="text-sm text-[var(--text-secondary)] mt-2">
                                        <span className="font-semibold text-[var(--text-primary)]">
                                            Your response:
                                        </span>{" "}
                                        {option.label}
                                    </p>
                                )}
                            </div>
                            {signal && (
                                <div className="text-right shrink-0">
                                    <p className="text-xs text-[var(--text-tertiary)]">{signal.label}</p>
                                    <p className="text-lg font-bold font-mono text-[var(--text-primary)]">
                                        {choice != null ? signal.optionScores[choice] : "—"}/2
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

/* ─────────────────── main page ───────────────── */

export default function Assessment() {
    const lines = checkpointEchoDialogue.lines;
    const saved = useMemo(() => loadSavedAssessment(), []);

    const [phase, setPhase] = useState(saved?.phase ?? PHASE.RUN);
    const [lineIndex, setLineIndex] = useState(0);
    const [runSelections, setRunSelections] = useState(
        () => saved?.runSelections ?? Array(lines.length).fill(null)
    );
    const [rerunSelections, setRerunSelections] = useState(
        () => saved?.rerunSelections ?? {}
    );
    const [rerunLineIdx, setRerunLineIdx] = useState(0);

    const runResults = useMemo(
        () => computeAssessmentScores(runSelections),
        [runSelections]
    );

    const flaggedLines = useMemo(() => runResults.flagged, [runResults]);

    useEffect(() => {
        saveAssessment({ phase, runSelections, rerunSelections });
    }, [phase, runSelections, rerunSelections]);

    const handleRunSelect = useCallback(
        (optionIdx) => {
            setRunSelections((prev) => {
                const next = [...prev];
                next[lineIndex] = optionIdx;
                return next;
            });
        },
        [lineIndex]
    );

    const handleRunNext = useCallback(() => {
        if (lineIndex < lines.length - 1) setLineIndex((i) => i + 1);
    }, [lineIndex, lines.length]);

    const handleRunComplete = useCallback(() => setPhase(PHASE.DEBRIEF), []);

    const handleStartRerun = useCallback(() => {
        setRerunSelections({});
        setRerunLineIdx(0);
        setPhase(PHASE.RERUN);
    }, []);

    const handleRerunSelect = useCallback(
        (optionIdx) => {
            const actualLineIdx = flaggedLines[rerunLineIdx];
            setRerunSelections((prev) => ({ ...prev, [actualLineIdx]: optionIdx }));
        },
        [flaggedLines, rerunLineIdx]
    );

    const handleRerunNext = useCallback(() => {
        if (rerunLineIdx < flaggedLines.length - 1) setRerunLineIdx((i) => i + 1);
    }, [rerunLineIdx, flaggedLines.length]);

    const handleRerunComplete = useCallback(() => setPhase(PHASE.DEBRIEF), []);

    const handleRestart = useCallback(() => {
        setPhase(PHASE.RUN);
        setLineIndex(0);
        setRunSelections(Array(lines.length).fill(null));
        setRerunSelections({});
        setRerunLineIdx(0);
        window.localStorage.removeItem(ASSESSMENT_STORAGE_KEY);
    }, [lines.length]);

    /* ===== PHASE: NATURAL RUN ===== */
    if (phase === PHASE.RUN) {
        const line = lines[lineIndex];
        const selected = runSelections[lineIndex];
        const progress = Math.round(((lineIndex + 1) / lines.length) * 100);
        const isLast = lineIndex === lines.length - 1;
        const allDone = runSelections.every((s) => s != null);

        return (
            <div className="max-w-4xl mx-auto pb-16 animate-fade-in">
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 bg-[var(--accent-cyan-subtle)] rounded-2xl flex items-center justify-center">
                        <span className="text-2xl">🛂</span>
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-[var(--accent-cyan)] uppercase tracking-[0.08em]">
                            Behaviour Assessment — Run 1
                        </p>
                        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[var(--text-primary)]">
                            Checkpoint Echo
                        </h1>
                        <p className="text-[var(--text-secondary)] mt-1">
                            Respond naturally — no coaching cues, no scores. Your instinct is the baseline.
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-4 mb-6">
                    <div className="flex-1 h-2 bg-[var(--surface-500)] rounded-full overflow-hidden">
                        <div
                            className="h-full bg-[var(--accent-cyan)] rounded-full"
                            style={{ width: `${progress}%`, boxShadow: "0 0 8px rgba(110, 231, 183, 0.3)" }}
                        />
                    </div>
                    <span className="text-sm font-mono font-semibold text-[var(--text-tertiary)]">
                        {lineIndex + 1}/{lines.length}
                    </span>
                </div>

                <div className="glass-card-elevated p-6 mb-6">
                    <div className="flex items-center gap-2 mb-4">
                        <span
                            className={`text-xs font-semibold px-3 py-1 rounded-full ${
                                line.role === "officer"
                                    ? "bg-[var(--accent-cyan-subtle)] text-[var(--accent-cyan)]"
                                    : "bg-[var(--accent-pink-subtle)] text-[var(--accent-pink)]"
                            }`}
                        >
                            {line.persona} — {line.role}
                        </span>
                    </div>

                    <p className="text-xl font-semibold text-[var(--text-primary)] leading-relaxed mb-6">
                        "{line.text}"
                    </p>

                    <p className="text-xs font-semibold text-[var(--text-tertiary)] mb-3">
                        Choose your response:
                    </p>
                    <div className="space-y-3">
                        {line.options.map((opt, idx) => {
                            const isActive = selected === idx;
                            return (
                                <button
                                    key={idx}
                                    onClick={() => handleRunSelect(idx)}
                                    className={`w-full text-left px-5 py-4 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-[var(--accent-cyan)] ${
                                        isActive
                                            ? "bg-[var(--accent-cyan-subtle)] border-[var(--accent-cyan)] text-[var(--text-primary)] glow-cyan"
                                            : "bg-[var(--surface-600)] border-[var(--surface-500)] text-[var(--text-secondary)] hover:border-[var(--accent-cyan)]/50 hover:text-[var(--text-primary)]"
                                    }`}
                                    aria-pressed={isActive}
                                >
                                    <span className="block text-sm font-semibold">{opt.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="flex flex-wrap gap-3">
                    {!isLast && (
                        <button
                            onClick={handleRunNext}
                            disabled={selected == null}
                            className={`px-6 py-3 rounded-full text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-[var(--accent-cyan)] ${
                                selected == null
                                    ? "bg-[var(--surface-500)] text-[var(--text-tertiary)] cursor-not-allowed"
                                    : "btn-primary"
                            }`}
                        >
                            Next moment →
                        </button>
                    )}
                    {isLast && allDone && (
                        <button
                            onClick={handleRunComplete}
                            className="px-6 py-3 rounded-full text-sm font-semibold bg-[var(--accent-cyan)] text-[var(--text-inverse)] glow-cyan"
                        >
                            Complete run → View debrief
                        </button>
                    )}
                    {lineIndex > 0 && (
                        <button
                            onClick={() => setLineIndex((i) => i - 1)}
                            className="btn-secondary text-sm px-5 py-3"
                        >
                            ← Previous
                        </button>
                    )}
                </div>
            </div>
        );
    }

    /* ===== PHASE: DEBRIEF ===== */
    if (phase === PHASE.DEBRIEF) {
        const hasRerun = Object.keys(rerunSelections).length > 0;
        const totalPct = Math.round((runResults.total / runResults.max) * 100);

        return (
            <div className="max-w-5xl mx-auto pb-16 animate-fade-in">
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 bg-[var(--accent-pink-subtle)] rounded-2xl flex items-center justify-center">
                        <span className="text-2xl">📊</span>
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-[var(--accent-pink)] uppercase tracking-[0.08em]">
                            Structured Debrief
                        </p>
                        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[var(--text-primary)]">
                            Your Behaviour Profile
                        </h1>
                        <p className="text-[var(--text-secondary)] mt-1">
                            6 signals scored from your natural responses. Focus moments are highlighted below.
                        </p>
                    </div>
                </div>

                {/* Total score card */}
                <div className="rounded-2xl bg-gradient-to-br from-[var(--surface-700)] via-[var(--surface-800)] to-[var(--surface-700)] p-6 mb-8 relative overflow-hidden border border-[var(--glass-border)]"
                    style={{ boxShadow: "var(--shadow-lg)" }}
                >
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--accent-cyan)] rounded-full blur-[80px] opacity-[0.08]" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[var(--accent-pink)] rounded-full blur-[80px] opacity-[0.05]" />
                    </div>
                    <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <p className="text-xs uppercase tracking-[0.08em] text-[var(--accent-cyan)] font-semibold glow-cyan-text">
                                Overall Score
                            </p>
                            <p className="text-5xl font-bold font-mono text-[var(--text-primary)] mt-1">
                                {runResults.total}
                                <span className="text-2xl text-[var(--text-tertiary)]">
                                    /{runResults.max}
                                </span>
                            </p>
                            <p className="text-sm text-[var(--text-secondary)] mt-1">
                                {totalPct >= 80
                                    ? "Excellent instinctive responses"
                                    : totalPct >= 50
                                        ? "Solid foundation — focus moments can improve"
                                        : "Clear growth areas identified — re-run will help"}
                            </p>
                        </div>
                        <div className="flex gap-3">
                            {flaggedLines.length > 0 && (
                                <button
                                    onClick={handleStartRerun}
                                    className="btn-accent text-sm px-5 py-3"
                                >
                                    Re-run {flaggedLines.length} flagged moment{flaggedLines.length > 1 ? "s" : ""}
                                </button>
                            )}
                            <button
                                onClick={handleRestart}
                                className="btn-secondary text-sm px-5 py-3"
                            >
                                Start over
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-1 space-y-3">
                        <h2 className="text-sm font-semibold uppercase tracking-[0.06em] text-[var(--text-tertiary)] mb-2">
                            Behaviour Signals
                        </h2>
                        {runResults.signals.map((signal) => {
                            const rerunScore =
                                hasRerun && rerunSelections[signal.lineIndex] != null
                                    ? signal.optionScores[rerunSelections[signal.lineIndex]]
                                    : null;
                            return (
                                <SignalBar
                                    key={signal.id}
                                    signal={signal}
                                    showRerun={hasRerun}
                                    rerunScore={rerunScore}
                                />
                            );
                        })}
                    </div>

                    <div className="lg:col-span-2 space-y-4">
                        <h2 className="text-sm font-semibold uppercase tracking-[0.06em] text-[var(--text-tertiary)] mb-2">
                            Choice Timeline
                        </h2>
                        <ChoiceTimeline
                            selections={runSelections}
                            lines={lines}
                            flaggedIndices={flaggedLines}
                        />

                        {hasRerun && (
                            <div className="glass-card-elevated p-6 mt-6 border-l-[3px] border-l-[var(--accent-emerald)]">
                                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-1">
                                    Re-run Comparison
                                </h3>
                                <p className="text-sm text-[var(--text-secondary)] mb-4">
                                    With coaching cues visible, here's how your responses changed:
                                </p>
                                {flaggedLines.map((lineIdx) => {
                                    const line = lines[lineIdx];
                                    const origChoice = runSelections[lineIdx];
                                    const rerunChoice = rerunSelections[lineIdx];
                                    const signal = behaviourSignals.find(
                                        (s) => s.lineIndex === lineIdx
                                    );
                                    const origScore =
                                        origChoice != null ? signal.optionScores[origChoice] : 0;
                                    const newScore =
                                        rerunChoice != null ? signal.optionScores[rerunChoice] : origScore;
                                    const improved = newScore > origScore;

                                    return (
                                        <div
                                            key={lineIdx}
                                            className="rounded-xl border border-[var(--surface-500)] bg-[var(--surface-700)] p-4 mb-3"
                                        >
                                            <p className="text-xs font-semibold text-[var(--text-tertiary)] mb-1">
                                                Line {lineIdx + 1}: {signal?.label}
                                            </p>
                                            <div className="grid sm:grid-cols-2 gap-3 mt-2">
                                                <div className="rounded-xl bg-[var(--accent-rose-subtle)] border border-[var(--accent-rose)]/20 p-3">
                                                    <p className="text-xs font-semibold text-[var(--accent-rose)] mb-1">
                                                        Run 1 (no coaching)
                                                    </p>
                                                    <p className="text-sm text-[var(--text-secondary)]">
                                                        {origChoice != null ? line.options[origChoice].label : "—"}
                                                    </p>
                                                    <p className="text-xs font-bold font-mono text-[var(--accent-rose)] mt-1">
                                                        Score: {origScore}/2
                                                    </p>
                                                </div>
                                                <div
                                                    className={`rounded-xl border p-3 ${
                                                        improved
                                                            ? "bg-[var(--accent-emerald-subtle)] border-[var(--accent-emerald)]/20"
                                                            : "bg-[var(--accent-amber-subtle)] border-[var(--accent-amber)]/20"
                                                    }`}
                                                >
                                                    <p
                                                        className={`text-xs font-semibold mb-1 ${
                                                            improved ? "text-[var(--accent-emerald)]" : "text-[var(--accent-amber)]"
                                                        }`}
                                                    >
                                                        Re-run (with coaching)
                                                    </p>
                                                    <p className="text-sm text-[var(--text-secondary)]">
                                                        {rerunChoice != null ? line.options[rerunChoice].label : "—"}
                                                    </p>
                                                    <p
                                                        className={`text-xs font-bold font-mono mt-1 ${
                                                            improved ? "text-[var(--accent-emerald)]" : "text-[var(--accent-amber)]"
                                                        }`}
                                                    >
                                                        Score: {newScore}/2 {improved ? "↑ Improved" : ""}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    /* ===== PHASE: MICRO RE-RUN ===== */
    if (phase === PHASE.RERUN) {
        const actualLineIdx = flaggedLines[rerunLineIdx];
        const line = lines[actualLineIdx];
        const signal = behaviourSignals.find((s) => s.lineIndex === actualLineIdx);
        const selected = rerunSelections[actualLineIdx] ?? null;
        const progress = Math.round(((rerunLineIdx + 1) / flaggedLines.length) * 100);
        const isLast = rerunLineIdx === flaggedLines.length - 1;
        const allRerunDone = flaggedLines.every((li) => rerunSelections[li] != null);

        return (
            <div className="max-w-4xl mx-auto pb-16 animate-fade-in">
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 bg-[var(--accent-emerald-subtle)] rounded-2xl flex items-center justify-center">
                        <span className="text-2xl">🔁</span>
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-[var(--accent-emerald)] uppercase tracking-[0.08em]">
                            Micro Re-run — With Coaching
                        </p>
                        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[var(--text-primary)]">
                            Re-play Flagged Moments
                        </h1>
                        <p className="text-[var(--text-secondary)] mt-1">
                            This time, empathy cues are visible. See if coaching shifts your response.
                        </p>
                    </div>
                </div>

                {signal && (
                    <div className="glass-card-elevated p-4 mb-6 flex items-center gap-3 border-l-[3px] border-l-[var(--accent-emerald)]">
                        <span className="text-2xl">{signal.icon}</span>
                        <div>
                            <p className="text-sm font-bold text-[var(--text-primary)]">
                                Testing: {signal.label}
                            </p>
                            <p className="text-xs text-[var(--text-tertiary)]">{signal.description}</p>
                        </div>
                        <span className="ml-auto text-xs font-bold font-mono px-3 py-1 rounded-full bg-[var(--accent-rose-subtle)] text-[var(--accent-rose)]">
                            Run 1 score:{" "}
                            {runSelections[actualLineIdx] != null
                                ? signal.optionScores[runSelections[actualLineIdx]]
                                : 0}
                            /2
                        </span>
                    </div>
                )}

                <div className="flex items-center gap-4 mb-6">
                    <div className="flex-1 h-2 bg-[var(--surface-500)] rounded-full overflow-hidden">
                        <div
                            className="h-full bg-[var(--accent-emerald)] rounded-full"
                            style={{ width: `${progress}%`, boxShadow: "0 0 8px rgba(52, 211, 153, 0.3)" }}
                        />
                    </div>
                    <span className="text-sm font-mono font-semibold text-[var(--text-tertiary)]">
                        {rerunLineIdx + 1}/{flaggedLines.length}
                    </span>
                </div>

                <div className="glass-card-elevated p-6 mb-6">
                    <div className="flex items-center gap-2 mb-4">
                        <span
                            className={`text-xs font-semibold px-3 py-1 rounded-full ${
                                line.role === "officer"
                                    ? "bg-[var(--accent-cyan-subtle)] text-[var(--accent-cyan)]"
                                    : "bg-[var(--accent-pink-subtle)] text-[var(--accent-pink)]"
                            }`}
                        >
                            {line.persona} — {line.role}
                        </span>
                        <span className="text-xs font-mono text-[var(--text-tertiary)]">
                            Line {actualLineIdx + 1}
                        </span>
                    </div>

                    <p className="text-xl font-semibold text-[var(--text-primary)] leading-relaxed mb-4">
                        "{line.text}"
                    </p>

                    <div className="rounded-xl bg-[var(--accent-emerald-subtle)] border border-[var(--accent-emerald)]/20 p-4 mb-6">
                        <p className="text-xs font-semibold text-[var(--accent-emerald)] uppercase tracking-[0.08em] mb-1">
                            Coaching cue
                        </p>
                        <p className="text-sm text-[var(--text-secondary)]">{line.cue}</p>
                    </div>

                    <p className="text-xs font-semibold text-[var(--text-tertiary)] mb-3">
                        Choose your response:
                    </p>
                    <div className="space-y-3">
                        {line.options.map((opt, idx) => {
                            const isActive = selected === idx;
                            return (
                                <button
                                    key={idx}
                                    onClick={() => handleRerunSelect(idx)}
                                    className={`w-full text-left px-5 py-4 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-[var(--accent-emerald)] ${
                                        isActive
                                            ? "bg-[var(--accent-emerald-subtle)] border-[var(--accent-emerald)] text-[var(--text-primary)]"
                                            : "bg-[var(--surface-600)] border-[var(--surface-500)] text-[var(--text-secondary)] hover:border-[var(--accent-emerald)]/50"
                                    }`}
                                    aria-pressed={isActive}
                                >
                                    <span className="block text-sm font-semibold">{opt.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="flex flex-wrap gap-3">
                    {!isLast && (
                        <button
                            onClick={handleRerunNext}
                            disabled={selected == null}
                            className={`px-6 py-3 rounded-full text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-[var(--accent-emerald)] ${
                                selected == null
                                    ? "bg-[var(--surface-500)] text-[var(--text-tertiary)] cursor-not-allowed"
                                    : "bg-[var(--accent-emerald)] text-[var(--text-inverse)]"
                            }`}
                            style={selected != null ? { boxShadow: "0 0 20px rgba(52, 211, 153, 0.15)" } : undefined}
                        >
                            Next moment →
                        </button>
                    )}
                    {isLast && allRerunDone && (
                        <button
                            onClick={handleRerunComplete}
                            className="px-6 py-3 rounded-full text-sm font-semibold bg-[var(--accent-cyan)] text-[var(--text-inverse)] glow-cyan"
                        >
                            Complete re-run → Compare results
                        </button>
                    )}
                    <button
                        onClick={() => setPhase(PHASE.DEBRIEF)}
                        className="btn-secondary text-sm px-5 py-3"
                    >
                        ← Back to debrief
                    </button>
                </div>
            </div>
        );
    }

    return null;
}
