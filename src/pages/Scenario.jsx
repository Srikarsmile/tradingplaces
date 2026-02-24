import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  REPORT_STORAGE_KEY,
  deriveImprovementTips,
  deriveLearningsFromNotes,
} from "../utils/reportUtils";
import { dialogueScenarios, scenarioLibrary } from "../constants/scenarios";
import EmpathyGauge from "../components/EmpathyGauge";
import Beats from "../components/Beats";
import MetricBar from "../components/MetricBar";

export default function Scenario() {
  const { username, email } = useAuth();
  const [activeId, setActiveId] = useState(scenarioLibrary[0].id);
  const [notes, setNotes] = useState("");
  const [scores, setScores] = useState(() =>
    Object.fromEntries(
      scenarioLibrary.map((s) => [s.id, { customer: 3, manager: 3 }])
    )
  );
  const [activeDialogueId, setActiveDialogueId] = useState(dialogueScenarios[0].id);
  const [activeDialogueRole, setActiveDialogueRole] = useState(
    dialogueScenarios[0].lines[0]?.role ?? "manager"
  );
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [dialogueSelections, setDialogueSelections] = useState(
    Array(dialogueScenarios[0].lines.length).fill(null)
  );
  const [dialogueScores, setDialogueScores] = useState({
    Understanding: 3,
    "Empathy signaled": 3,
    "Clarity of next steps": 3,
  });

  const scenario = useMemo(
    () => scenarioLibrary.find((item) => item.id === activeId) ?? scenarioLibrary[0],
    [activeId]
  );

  const activeDialogue = useMemo(
    () =>
      dialogueScenarios.find((item) => item.id === activeDialogueId) ??
      dialogueScenarios[0],
    [activeDialogueId]
  );

  const dialogueRoles = useMemo(
    () => Array.from(new Set(activeDialogue.lines.map((line) => line.role))),
    [activeDialogue.lines]
  );

  const dialogueLine = activeDialogue.lines[dialogueIndex];
  const dialogueProgress = Math.round(
    ((dialogueIndex + 1) / activeDialogue.lines.length) * 100
  );
  const connectionScore =
    Math.round(
      (Object.values(dialogueScores).reduce((a, b) => a + b, 0) /
        activeDialogue.metrics.length) *
        10
    ) / 10;

  useEffect(() => {
    setDialogueIndex(0);
    setDialogueSelections(Array(activeDialogue.lines.length).fill(null));
    setDialogueScores({
      Understanding: 3,
      "Empathy signaled": 3,
      "Clarity of next steps": 3,
    });
    setActiveDialogueRole(activeDialogue.lines[0]?.role ?? "manager");
  }, [activeDialogue]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const scenarioSnapshots = scenarioLibrary.map((item) => {
      const current = scores[item.id] ?? { customer: 3, manager: 3 };
      const average =
        Math.round(((current.customer + current.manager) / 2) * 10) / 10;
      return {
        id: item.id,
        title: item.title,
        empathyFocus: item.empathyFocus,
        scores: current,
        average,
      };
    });

    const selections =
      dialogueSelections
        .map((choice, idx) => {
          if (choice == null) return null;
          const line = activeDialogue.lines[idx];
          const option = line.options[choice];
          return {
            lineNumber: idx + 1,
            speaker: `${line.persona} (${line.role})`,
            prompt: line.cue,
            selected: option.label,
            effect: option.effect,
          };
        })
        .filter(Boolean) ?? [];

    const payload = {
      updatedAt: new Date().toISOString(),
      user: { name: username, email },
      notes,
      scenarioSnapshots,
      selectedScenarioId: activeId,
      dialogue: {
        id: activeDialogue.id,
        title: activeDialogue.title,
        connectionScore,
        metrics: dialogueScores,
        choices: selections,
        completion: {
          completed: selections.length,
          total: activeDialogue.lines.length,
        },
      },
      learnings: deriveLearningsFromNotes(notes),
      improvementTips: deriveImprovementTips(dialogueScores, notes),
    };

    try {
      window.localStorage.setItem(REPORT_STORAGE_KEY, JSON.stringify(payload));
    } catch (error) {
      console.error("Unable to persist report snapshot", error);
    }
  }, [
    username,
    email,
    notes,
    scores,
    activeId,
    activeDialogue,
    dialogueSelections,
    dialogueScores,
    connectionScore,
  ]);

  const updateScore = (role, value) => {
    setScores((prev) => ({
      ...prev,
      [scenario.id]: { ...prev[scenario.id], [role]: value },
    }));
  };

  const recalcDialogueScores = (selections) => {
    const base = { Understanding: 3, "Empathy signaled": 3, "Clarity of next steps": 3 };
    selections.forEach((choice, idx) => {
      if (choice == null) return;
      const effect = activeDialogue.lines[idx].options[choice].effect;
      Object.entries(effect).forEach(([metric, delta]) => {
        base[metric] = Math.min(5, Math.max(1, base[metric] + delta));
      });
    });
    setDialogueScores(base);
  };

  const handleSelectOption = (optionIdx) => {
    setDialogueSelections((prev) => {
      const next = [...prev];
      next[dialogueIndex] = optionIdx;
      recalcDialogueScores(next);
      return next;
    });
  };

  return (
    <div className="max-w-6xl mx-auto pb-16 animate-fade-in">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-[var(--accent-cyan-subtle)] rounded-2xl flex items-center justify-center">
          <span className="text-2xl">🎭</span>
        </div>
        <div>
          <p className="text-xs font-semibold text-[var(--accent-cyan)] uppercase tracking-[0.08em]">
            Roleplay Scenarios
          </p>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[var(--text-primary)]">
            Practice empathy as a customer and a manager
          </h1>
          <p className="text-[var(--text-secondary)] mt-1 text-sm">
            Swap perspectives, set empathy targets, and script the beats for each
            role so both people feel heard.
          </p>
        </div>
      </div>

      <div className="glass-card-elevated p-6 mb-8 space-y-5">
        <div className="flex flex-wrap gap-2">
          {dialogueScenarios.map((item) => {
            const isActive = item.id === activeDialogue.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveDialogueId(item.id)}
                className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all focus:outline-none focus:ring-2 focus:ring-[var(--accent-cyan)] ${
                  isActive
                    ? "bg-[var(--accent-cyan)] text-[var(--text-inverse)] border-transparent glow-cyan"
                    : "bg-[var(--surface-700)] text-[var(--text-secondary)] border-[var(--surface-500)] hover:border-[var(--accent-cyan)]/50 hover:text-[var(--text-primary)]"
                }`}
                aria-pressed={isActive}
                aria-label={`Select ${item.title} scenario`}
              >
                {item.title}
              </button>
            );
          })}
        </div>
        <div className="flex flex-wrap items-center gap-3 justify-between">
          <div>
            <p className="text-xs font-semibold text-[var(--accent-pink)] uppercase tracking-[0.08em]">
              Dialogue practice
            </p>
            <h2 className="text-xl font-bold text-[var(--text-primary)]">
              {activeDialogue.title}
            </h2>
            <p className="text-[var(--text-secondary)] text-sm mt-1 max-w-3xl">
              {activeDialogue.setup}
            </p>
          </div>
          <div className="flex gap-2">
            {dialogueRoles.map((role) => (
              <button
                key={role}
                onClick={() => setActiveDialogueRole(role)}
                className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all focus:outline-none focus:ring-2 focus:ring-[var(--accent-cyan)] ${
                  activeDialogueRole === role
                    ? "bg-[var(--accent-cyan)] text-[var(--text-inverse)] border-transparent glow-cyan"
                    : "bg-[var(--surface-700)] text-[var(--text-secondary)] border-[var(--surface-500)] hover:border-[var(--accent-cyan)]/50"
                }`}
                aria-pressed={activeDialogueRole === role}
                aria-label={`Play as ${role}`}
              >
                Play as {role}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 rounded-xl border border-[var(--surface-500)] p-5 bg-[var(--accent-cyan-subtle)]">
            <div className="flex items-center justify-between gap-3">
              <div className="text-xs font-mono font-medium text-[var(--text-tertiary)]">
                Line {dialogueIndex + 1} of {activeDialogue.lines.length}
              </div>
              <div className="w-40 h-1.5 bg-[var(--surface-500)] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[var(--accent-cyan)] rounded-full"
                  style={{
                    width: `${dialogueProgress}%`,
                    boxShadow: "0 0 8px rgba(0, 229, 255, 0.3)",
                  }}
                />
              </div>
            </div>

            <div className="mt-4 space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[var(--surface-700)] border border-[var(--surface-500)] text-[var(--text-secondary)]">
                  You're speaking as: {dialogueLine.persona} ({dialogueLine.role})
                </span>
                <span className="text-xs text-[var(--text-tertiary)]">
                  Match tone to empathy cues as you deliver the next line.
                </span>
              </div>

              <div className="rounded-xl bg-[var(--surface-700)] border border-[var(--surface-500)] p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      dialogueLine.role === "manager"
                        ? "bg-[var(--accent-cyan-subtle)] text-[var(--accent-cyan)]"
                        : "bg-[var(--accent-pink-subtle)] text-[var(--accent-pink)]"
                    }`}
                  >
                    {dialogueLine.persona} — {dialogueLine.role}
                  </span>
                  {dialogueIndex === activeDialogue.lines.length - 1 && (
                    <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[var(--accent-pink)]">
                      Closing the loop
                    </span>
                  )}
                </div>
                <p className="text-lg font-semibold text-[var(--text-primary)] leading-relaxed">
                  "{dialogueLine.text}"
                </p>
                <p className="mt-3 text-sm text-[var(--text-secondary)]">
                  Empathy cue: {dialogueLine.cue}
                </p>
                <div className="mt-4 space-y-2">
                  <p className="text-xs font-semibold text-[var(--text-tertiary)]">
                    Choose your response approach:
                  </p>
                  <div className="space-y-2">
                    {dialogueLine.options.map((opt, idx) => {
                      const isSelected = dialogueSelections[dialogueIndex] === idx;
                      return (
                        <button
                          key={opt.label}
                          onClick={() => handleSelectOption(idx)}
                          className={`w-full text-left px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-[var(--accent-cyan)] ${
                            isSelected
                              ? "bg-[var(--accent-cyan-subtle)] border-[var(--accent-cyan)] text-[var(--text-primary)] glow-cyan"
                              : "bg-[var(--surface-600)] border-[var(--surface-500)] text-[var(--text-secondary)] hover:border-[var(--accent-cyan)]/50 hover:text-[var(--text-primary)]"
                          }`}
                          aria-pressed={isSelected}
                          aria-label={`Select response: ${opt.label}`}
                        >
                          <span className="block text-sm font-semibold">{opt.label}</span>
                          <span className="block text-xs font-mono text-[var(--text-tertiary)] mt-0.5">
                            Impact → U:{opt.effect.Understanding > 0 ? "+" : ""}
                            {opt.effect.Understanding} | E:
                            {opt.effect["Empathy signaled"] > 0 ? "+" : ""}
                            {opt.effect["Empathy signaled"]} | C:
                            {opt.effect["Clarity of next steps"] > 0 ? "+" : ""}
                            {opt.effect["Clarity of next steps"]}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() =>
                    setDialogueIndex((prev) =>
                      prev + 1 < activeDialogue.lines.length ? prev + 1 : prev
                    )
                  }
                  disabled={
                    dialogueIndex === activeDialogue.lines.length - 1 ||
                    dialogueSelections[dialogueIndex] == null
                  }
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-[var(--accent-cyan)] ${
                    dialogueIndex === activeDialogue.lines.length - 1 ||
                    dialogueSelections[dialogueIndex] == null
                      ? "bg-[var(--surface-500)] text-[var(--text-tertiary)] cursor-not-allowed"
                      : "bg-[var(--accent-cyan)] text-[var(--text-inverse)] glow-cyan"
                  }`}
                  aria-label="Continue to next dialogue line"
                >
                  Next line
                </button>
                <button
                  onClick={() => {
                    setDialogueIndex(0);
                    const reset = Array(activeDialogue.lines.length).fill(null);
                    setDialogueSelections(reset);
                    setDialogueScores({
                      Understanding: 3,
                      "Empathy signaled": 3,
                      "Clarity of next steps": 3,
                    });
                  }}
                  className="btn-secondary text-sm px-5 py-2.5"
                  aria-label="Restart dialogue from beginning"
                >
                  Restart dialogue
                </button>
                {dialogueIndex === activeDialogue.lines.length - 1 && (
                  <span className="text-xs font-semibold text-[var(--accent-emerald)] flex items-center gap-1">
                    ✓ Conversation complete — rate your delivery below.
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="glass-card-elevated p-5 space-y-4">
            <h3 className="text-lg font-bold text-[var(--text-primary)]">
              How did you sound?
            </h3>
            <p className="text-sm text-[var(--text-secondary)]">
              After finishing the script, your choices update the signals you sent.
              Replay and pick different options to see empathy move.
            </p>
            <div className="space-y-4">
              {activeDialogue.metrics.map((metric) => (
                <MetricBar key={metric} label={metric} value={dialogueScores[metric]} />
              ))}
            </div>
            <div className="rounded-xl border border-dashed border-[var(--accent-cyan)]/30 p-4 bg-[var(--accent-cyan-subtle)] space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-[var(--text-primary)]">
                  Your portrayal score
                </span>
                <span className="text-xs font-mono font-semibold px-2 py-1 rounded-full bg-[var(--surface-700)] text-[var(--accent-cyan)] border border-[var(--surface-500)]">
                  {connectionScore}/5 connection
                </span>
              </div>
              <div className="space-y-2">
                {activeDialogue.metrics.map((metric) => (
                  <MetricBar key={metric} label={metric} value={dialogueScores[metric]} />
                ))}
              </div>
              <p className="text-xs text-[var(--text-tertiary)]">
                If a bar is low, replay that line focusing on the empathy cue to raise
                the score.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {scenarioLibrary.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveId(item.id)}
            className={`px-4 py-2.5 rounded-full border text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-[var(--accent-cyan)] ${
              item.id === scenario.id
                ? "bg-[var(--accent-cyan)] text-[var(--text-inverse)] border-transparent glow-cyan"
                : "bg-[var(--surface-700)] text-[var(--text-secondary)] border-[var(--surface-500)] hover:border-[var(--accent-cyan)]/50"
            }`}
            aria-pressed={item.id === scenario.id}
            aria-label={`Select ${item.title} scenario`}
          >
            {item.title}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="glass-card-elevated p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold text-[var(--accent-cyan)] uppercase tracking-[0.08em]">
                  Context
                </p>
                <h2 className="text-2xl font-bold text-[var(--text-primary)]">
                  {scenario.title}
                </h2>
                <p className="text-[var(--text-secondary)] mt-2 leading-relaxed">
                  {scenario.context}
                </p>
              </div>
              <div className="hidden md:flex gap-2">
                {scenario.empathyFocus.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-[var(--accent-cyan-subtle)] text-[var(--accent-cyan)] text-xs font-semibold"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mt-6">
              <Beats title={scenario.customer.name} beats={scenario.customer.beats} />
              <Beats title={scenario.manager.name} beats={scenario.manager.beats} />
            </div>
          </div>

          <div className="glass-card-elevated p-6 space-y-5">
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="text-lg font-bold text-[var(--text-primary)]">
                Empathy check-ins
              </h3>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[var(--accent-pink-subtle)] text-[var(--accent-pink)]">
                Measure how understood each role feels
              </span>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <EmpathyGauge
                label="Customer perspective"
                score={scores[scenario.id].customer}
                onChange={(value) => updateScore("customer", value)}
              />
              <EmpathyGauge
                label="Manager perspective"
                score={scores[scenario.id].manager}
                onChange={(value) => updateScore("manager", value)}
              />
            </div>
            <div className="rounded-xl border border-dashed border-[var(--accent-cyan)]/30 p-4 bg-[var(--accent-cyan-subtle)]">
              <p className="text-sm font-semibold text-[var(--text-primary)] mb-2">
                Shared agreements to model aloud
              </p>
              <ul className="grid sm:grid-cols-3 gap-2 text-sm text-[var(--text-secondary)]">
                {scenario.agreement.map((line, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 bg-[var(--surface-700)] rounded-xl border border-[var(--surface-500)] p-3"
                  >
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-[var(--accent-pink)] shrink-0" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="glass-card-elevated p-5">
            <h3 className="text-lg font-bold text-[var(--text-primary)]">
              Roleplay prompts
            </h3>
            <p className="text-sm text-[var(--text-secondary)] mt-1">
              Read these aloud in pairs. Swap roles after the first pass and
              adjust the empathy sliders.
            </p>
            <div className="mt-4 space-y-3">
              <div className="p-4 rounded-xl bg-[var(--accent-cyan-subtle)] border border-[var(--accent-cyan)]/20">
                <p className="text-xs font-semibold text-[var(--accent-cyan)] uppercase tracking-[0.08em]">
                  As the customer
                </p>
                <ul className="mt-2 text-sm text-[var(--text-secondary)] space-y-1">
                  <li>State your need in one sentence.</li>
                  <li>Share an emotion using "I feel…"</li>
                  <li>Ask for one concrete action right now.</li>
                </ul>
              </div>
              <div className="p-4 rounded-xl bg-[var(--accent-pink-subtle)] border border-[var(--accent-pink)]/20">
                <p className="text-xs font-semibold text-[var(--accent-pink)] uppercase tracking-[0.08em]">
                  As the manager
                </p>
                <ul className="mt-2 text-sm text-[var(--text-secondary)] space-y-1">
                  <li>Mirror back what you heard before offering solutions.</li>
                  <li>Offer two options; check which feels better.</li>
                  <li>Close with a time-bound next step.</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="glass-card-elevated p-5 space-y-3">
            <h3 className="text-lg font-bold text-[var(--text-primary)]">
              Reflection notes
            </h3>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={6}
              placeholder="What shifted when you swapped roles? Where did empathy rise or drop?"
              className="w-full rounded-xl bg-[var(--surface-700)] border border-[var(--surface-500)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] p-3 outline-none focus:border-[var(--accent-cyan)] focus:ring-2 focus:ring-[var(--accent-cyan-subtle)]"
              aria-label="Reflection notes"
            />
            <p className="text-xs text-[var(--text-tertiary)]">
              Capture phrases that made the other role feel seen. These become
              reusable scripts for real interactions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
