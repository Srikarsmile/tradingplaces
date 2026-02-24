/**
 * Behaviour Signal Configuration for Checkpoint Echo Assessment
 *
 * Each of the 6 dialogue lines maps to one primary behaviour signal.
 * Scoring: best option = 2, middle = 1, worst = 0.
 *
 * The `optionScores` array maps option index → score for that line.
 * Index order matches the options array in checkpointEchoDialogue.
 */

export const ASSESSMENT_STORAGE_KEY = "trading-places-assessment";

export const behaviourSignals = [
    {
        id: "tone-regulation",
        label: "Tone Regulation",
        description: "Managing micro-reactions under public scrutiny",
        icon: "🎙️",
        lineIndex: 0,
        optionScores: [2, 0, 0], // Soften tone = 2, Repeat louder = 0, Sigh = 0
    },
    {
        id: "self-regulation",
        label: "Self-Regulation",
        description: "Composure when a discrepancy escalates",
        icon: "🧘",
        lineIndex: 1,
        optionScores: [2, 1, 0], // Acknowledge calmly = 2, Flag as violation = 1, "Not my problem" = 0
    },
    {
        id: "cultural-sensitivity",
        label: "Cultural Sensitivity",
        description: "Adapting to different norms without bias",
        icon: "🌍",
        lineIndex: 2,
        optionScores: [2, 1, 0], // Thank & adjust = 2, Note internally = 1, "We expect eye contact" = 0
    },
    {
        id: "team-communication",
        label: "Team Communication",
        description: "Coordinating with a colleague without conflict",
        icon: "🤝",
        lineIndex: 3,
        optionScores: [2, 0, 0], // Thank & confirm together = 2, Dismiss = 0, Argue publicly = 0
    },
    {
        id: "decision-clarity",
        label: "Decision Clarity",
        description: "Balancing compliance with human factors",
        icon: "⚖️",
        lineIndex: 4,
        optionScores: [2, 0, 1], // Clear with note = 2, Refer without explaining = 0, Clear without docs = 1
    },
    {
        id: "inclusive-engagement",
        label: "Inclusive Engagement",
        description: "Creating safety for vulnerable individuals",
        icon: "🛡️",
        lineIndex: 5,
        optionScores: [2, 1, 0], // Lower + liaison = 2, Standard lane = 1, Separate family = 0
    },
];

/** Maximum possible score (6 signals × 2 points each) */
export const MAX_TOTAL_SCORE = behaviourSignals.length * 2;

/**
 * Compute scores from an array of selected option indices.
 * Returns { signals: [{...signal, score}], total, max, flagged: [...indices of lowest] }
 */
export function computeAssessmentScores(selections) {
    const scored = behaviourSignals.map((signal, idx) => {
        const choice = selections[signal.lineIndex];
        const score = choice != null ? signal.optionScores[choice] : 0;
        return { ...signal, score };
    });

    const total = scored.reduce((sum, s) => sum + s.score, 0);

    // Flag the 1–2 lowest-scoring signals (score < 2)
    const lowScoring = scored
        .filter((s) => s.score < 2)
        .sort((a, b) => a.score - b.score);

    const flagged = lowScoring.slice(0, 2).map((s) => s.lineIndex);

    return { signals: scored, total, max: MAX_TOTAL_SCORE, flagged };
}
