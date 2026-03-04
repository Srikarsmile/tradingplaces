import { useState } from "react";
import { useNavigate } from "react-router-dom";

const DISCLAIMER_ACCEPTED_KEY = "TP_DISCLAIMER_ACCEPTED";

export function hasAcceptedDisclaimer() {
    try {
        return sessionStorage.getItem(DISCLAIMER_ACCEPTED_KEY) === "true";
    } catch {
        return false;
    }
}

export default function Disclaimer() {
    const navigate = useNavigate();
    const [checked, setChecked] = useState(false);

    const handleAccept = () => {
        try {
            sessionStorage.setItem(DISCLAIMER_ACCEPTED_KEY, "true");
        } catch { }
        navigate("/workspace/scenario");
    };

    return (
        <div className="max-w-3xl mx-auto py-12 px-4 animate-fade-in">
            <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-[var(--accent-primary-subtle)] rounded-2xl flex items-center justify-center">
                    <span className="text-2xl">⚠️</span>
                </div>
                <div>
                    <p className="text-xs font-semibold text-[var(--accent-primary)] uppercase tracking-[0.08em]">
                        Before You Begin
                    </p>
                    <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[var(--text-primary)]">
                        Participant Disclaimer
                    </h1>
                </div>
            </div>

            <div className="glass-card-elevated p-6 md:p-8 space-y-6">
                <div className="space-y-4 text-sm text-[var(--text-secondary)] leading-relaxed">
                    <h2 className="text-lg font-bold text-[var(--text-primary)]">About This Simulation</h2>
                    <p>
                        This scenario-based learning experience is designed to develop emotional intelligence,
                        empathy, and effective communication skills in high-pressure professional environments.
                    </p>
                    <p>
                        You will be asked to respond to realistic workplace situations. There are no right or
                        wrong answers — the purpose is to explore different response approaches and reflect on
                        their impact.
                    </p>

                    <h2 className="text-lg font-bold text-[var(--text-primary)] pt-2">Voice Recording</h2>
                    <p>
                        During the scenario, you may optionally record your voice to review your tone and
                        delivery during the debrief. Voice recordings are stored locally in your browser and
                        are not transmitted to any server.
                    </p>

                    <h2 className="text-lg font-bold text-[var(--text-primary)] pt-2">Data & Privacy</h2>
                    <p>
                        All scenario responses and scores are stored locally on your device. No personal data
                        is shared externally. Your results are used solely for your own learning and reflection.
                    </p>

                    <h2 className="text-lg font-bold text-[var(--text-primary)] pt-2">Wellbeing</h2>
                    <p>
                        Some scenarios involve emotionally challenging situations. If at any point you feel
                        uncomfortable, you may pause or exit the simulation without consequence. Support
                        resources are available through your facilitator.
                    </p>
                </div>

                <div className="border-t border-[var(--glass-border)] pt-5">
                    <label className="flex items-start gap-3 cursor-pointer group">
                        <input
                            type="checkbox"
                            checked={checked}
                            onChange={(e) => setChecked(e.target.checked)}
                            className="mt-1 w-5 h-5 rounded border-2 border-[var(--surface-500)] bg-[var(--surface-700)] accent-[var(--accent-primary)] cursor-pointer"
                            aria-label="I have read and understand the disclaimer"
                        />
                        <span className="text-sm text-[var(--text-primary)] font-medium group-hover:text-[var(--text-primary)]">
                            I have read and understood the above information. I consent to participate in this
                            scenario-based learning exercise and understand that voice recordings, if used, are
                            stored locally on my device only.
                        </span>
                    </label>
                </div>

                <div className="flex flex-wrap gap-3">
                    <button
                        onClick={handleAccept}
                        disabled={!checked}
                        className={`px-6 py-3 rounded-full text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] ${checked
                                ? "bg-[var(--accent-primary)] text-[var(--text-inverse)] glow-primary"
                                : "bg-[var(--surface-500)] text-[var(--text-tertiary)] cursor-not-allowed"
                            }`}
                        aria-label="Accept disclaimer and continue to scenario"
                    >
                        Accept & Continue to Scenario
                    </button>
                    <button
                        onClick={() => navigate("/workspace/dashboard")}
                        className="btn-secondary text-sm px-5 py-3"
                        aria-label="Go back to dashboard"
                    >
                        ← Back to Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
}
