/**
 * Phase 1 — 6-Signal Behavioural Scoring System
 *
 * Each signal is scored 0 (absent), 1 (emerging), 2 (demonstrated) per beat.
 * Final score per signal = average across all beats (0.0–2.0).
 */

export const SIGNALS = [
    "Active Listening",
    "Emotional Regulation",
    "Perspective Taking",
    "Cultural Sensitivity",
    "Clarity of Communication",
    "Collaborative Problem-Solving",
];

export const SIGNAL_LABELS = {
    "Active Listening": "AL",
    "Emotional Regulation": "ER",
    "Perspective Taking": "PT",
    "Cultural Sensitivity": "CS",
    "Clarity of Communication": "CC",
    "Collaborative Problem-Solving": "CP",
};

export const SCORE_LEVELS = {
    0: "Absent",
    1: "Emerging",
    2: "Demonstrated",
};

/**
 * Calculate average signal scores across all beats.
 * @param {Array<Object|null>} selections - Array of chosen option indices per beat (null = unanswered)
 * @param {Array<Object>} lines - Dialogue lines from the scenario
 * @returns {Object} Signal name → average score (0.0–2.0)
 */
export function calcSignalAverages(selections, lines) {
    const totals = {};
    const counts = {};

    SIGNALS.forEach((s) => {
        totals[s] = 0;
        counts[s] = 0;
    });

    selections.forEach((choiceIdx, beatIdx) => {
        if (choiceIdx == null || !lines[beatIdx]) return;
        const option = lines[beatIdx].options[choiceIdx];
        if (!option?.signals) return;

        Object.entries(option.signals).forEach(([signal, score]) => {
            if (totals[signal] !== undefined) {
                totals[signal] += score;
                counts[signal] += 1;
            }
        });
    });

    const averages = {};
    SIGNALS.forEach((s) => {
        averages[s] = counts[s] > 0 ? Math.round((totals[s] / counts[s]) * 10) / 10 : 0;
    });
    return averages;
}

/**
 * Find the 1–2 weakest beats (lowest total signal score).
 * Returns beat indices sorted by weakness.
 */
export function identifyWeakBeats(selections, lines, count = 2) {
    const beatScores = selections.map((choiceIdx, beatIdx) => {
        if (choiceIdx == null || !lines[beatIdx]) return { beatIdx, total: Infinity };
        const option = lines[beatIdx].options[choiceIdx];
        if (!option?.signals) return { beatIdx, total: Infinity };
        const total = Object.values(option.signals).reduce((a, b) => a + b, 0);
        return { beatIdx, total };
    });

    return beatScores
        .filter((b) => b.total !== Infinity)
        .sort((a, b) => a.total - b.total)
        .slice(0, count)
        .map((b) => b.beatIdx);
}

/**
 * Calculate delta between two signal score objects.
 * Positive = improvement, negative = regression.
 */
export function calcDelta(original, rerun) {
    const delta = {};
    SIGNALS.forEach((s) => {
        delta[s] = Math.round(((rerun[s] || 0) - (original[s] || 0)) * 10) / 10;
    });
    return delta;
}

/**
 * Check if a scenario uses the new 6-signal system.
 */
export function is6Signal(scenario) {
    if (!scenario?.lines?.[0]?.options?.[0]) return false;
    return !!scenario.lines[0].options[0].signals;
}

/**
 * Overall composite score (0–2 scale, average of all signal averages).
 */
export function compositeScore(signalAverages) {
    const vals = Object.values(signalAverages);
    if (vals.length === 0) return 0;
    return Math.round((vals.reduce((a, b) => a + b, 0) / vals.length) * 10) / 10;
}
