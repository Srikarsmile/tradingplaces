import React, { useEffect, useMemo, useState } from "react";
import jsPDF from "jspdf";
import { useAuth } from "../context/AuthContext";
import {
  REPORT_STORAGE_KEY,
  deriveImprovementTips,
  deriveLearningsFromNotes,
  formatReportDate,
} from "../utils/reportUtils";

const placeholderSnapshot = {
  id: "tone-at-till",
  title: "Tone at the Till: Live Dialogue",
  empathyFocus: ["Empathy", "Clarity", "De-escalation"],
  scores: { customer: 4, manager: 4 },
  average: 4,
};

const baseDialogueMetrics = {
  Understanding: 3.8,
  "Empathy signaled": 3.7,
  "Clarity of next steps": 3.9,
};

const initialReportState = {
  updatedAt: new Date().toISOString(),
  user: { name: "Practitioner", email: "" },
  notes: "",
  scenarioSnapshots: [placeholderSnapshot],
  selectedScenarioId: placeholderSnapshot.id,
  dialogue: {
    id: placeholderSnapshot.id,
    title: placeholderSnapshot.title,
    connectionScore: 3.8,
    metrics: baseDialogueMetrics,
    choices: [],
    completion: { completed: 0, total: 0 },
  },
  learnings: deriveLearningsFromNotes(""),
  improvementTips: deriveImprovementTips(baseDialogueMetrics),
};

export default function Report() {
  const { username, email } = useAuth();
  const [reportData, setReportData] = useState(initialReportState);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(REPORT_STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      setReportData((prev) => ({
        ...prev,
        ...parsed,
        user: parsed.user ?? { name: username || prev.user?.name, email: email || "" },
        learnings:
          parsed.learnings?.length > 0
            ? parsed.learnings
            : deriveLearningsFromNotes(parsed.notes ?? ""),
        improvementTips:
          parsed.improvementTips?.length > 0
            ? parsed.improvementTips
            : deriveImprovementTips(parsed.dialogue?.metrics ?? {}, parsed.notes),
      }));
    } catch (error) {
      console.error("Unable to load saved report data", error);
    }
  }, [username, email]);

  const activeScenario =
    reportData.scenarioSnapshots.find(
      (item) => item.id === reportData.selectedScenarioId
    ) ?? reportData.scenarioSnapshots[0];

  const learnings = useMemo(
    () =>
      reportData.learnings?.length
        ? reportData.learnings
        : deriveLearningsFromNotes(reportData.notes),
    [reportData.learnings, reportData.notes]
  );

  const improvementTips = useMemo(
    () =>
      reportData.improvementTips?.length
        ? reportData.improvementTips
        : deriveImprovementTips(reportData.dialogue?.metrics ?? {}, reportData.notes),
    [reportData.improvementTips, reportData.dialogue?.metrics, reportData.notes]
  );

  const handleDownload = () => {
    const doc = new jsPDF();
    const margin = 14;
    const accent = { r: 2, g: 105, b: 120 };
    const dark = { r: 15, g: 23, b: 42 };
    let cursor = 22;
    const userName = reportData.user?.name || username || "Practitioner";
    const reportDate =
      formatReportDate(reportData.updatedAt) || formatReportDate(new Date().toISOString());

    const addSectionTitle = (label) => {
      doc.setFontSize(12);
      doc.setTextColor(dark.r, dark.g, dark.b);
      doc.text(label, margin, cursor);
      cursor += 6;
    };

    const drawMetricBar = (label, value) => {
      const barWidth = 80;
      const normalized = Math.max(0, Math.min(5, Number(value ?? 0)));
      const filled = (normalized / 5) * barWidth;
      doc.setFontSize(10);
      doc.setTextColor(60, 72, 90);
      doc.text(`${label} (${normalized.toFixed(1)}/5)`, margin, cursor);
      cursor += 3;
      doc.setDrawColor(220, 224, 230);
      doc.roundedRect(margin, cursor, barWidth, 5, 2, 2);
      doc.setFillColor(accent.r, accent.g, accent.b);
      doc.roundedRect(margin, cursor, filled, 5, 2, 2, "F");
      cursor += 9;
    };

    const ensureSpace = (needed = 18) => {
      if (cursor + needed < 280) return;
      doc.addPage();
      cursor = 20;
    };

    doc.setFillColor(accent.r, accent.g, accent.b);
    doc.roundedRect(margin, 10, 182, 20, 3, 3, "F");
    doc.setFontSize(16);
    doc.setTextColor(255, 255, 255);
    doc.text("Trading Places — Empathy Report", margin + 6, 22);
    doc.setFontSize(10);
    doc.text(`for ${userName} • ${reportDate}`, margin + 6, 29);

    cursor += 12;
    ensureSpace();

    addSectionTitle("Scenario snapshot");
    doc.setFontSize(11);
    doc.text(activeScenario?.title ?? "No scenario selected", margin, cursor);
    cursor += 6;
    doc.setFontSize(9);
    doc.setTextColor(80, 90, 110);
    doc.text(
      `Average empathy: ${(activeScenario?.average ?? 0).toFixed(1)}/5   Customer: ${
        activeScenario?.scores?.customer ?? "-"
      } • Manager: ${activeScenario?.scores?.manager ?? "-"}`,
      margin,
      cursor
    );
    cursor += 5;
    const focus = activeScenario?.empathyFocus?.join(" • ") || "Model empathy, clarity, trust";
    doc.text(`Focus: ${focus}`, margin, cursor);
    cursor += 10;

    addSectionTitle("Dialogue signals");
    const metrics = reportData.dialogue?.metrics ?? {};
    Object.entries(metrics).forEach(([key, value]) => drawMetricBar(key, value));

    doc.setFontSize(10);
    doc.setTextColor(15, 23, 42);
    doc.text(
      `Connection score: ${(reportData.dialogue?.connectionScore ?? 0).toFixed(1)}/5`,
      margin,
      cursor
    );
    cursor += 10;

    ensureSpace();
    addSectionTitle("What you captured");
    doc.setFontSize(10);
    doc.setTextColor(60, 72, 90);
    learnings.slice(0, 5).forEach((item) => {
      ensureSpace(8);
      doc.circle(margin + 1, cursor - 2, 1.2, "F");
      doc.text(item, margin + 5, cursor);
      cursor += 6;
    });

    ensureSpace();
    addSectionTitle("Tips to level up next run");
    improvementTips.forEach((tip) => {
      ensureSpace(8);
      doc.setDrawColor(accent.r, accent.g, accent.b);
      doc.roundedRect(margin, cursor - 4, 182, 10, 2, 2);
      doc.setFontSize(10);
      doc.setTextColor(30, 41, 59);
      doc.text(tip, margin + 3, cursor + 2);
      cursor += 12;
    });

    ensureSpace();
    addSectionTitle("Reflection notes");
    const noteText =
      reportData.notes?.trim() ||
      "Capture a few lines in the Scenario page to pull them into this report.";
    const wrapped = doc.splitTextToSize(noteText, 182);
    doc.setFontSize(10);
    doc.setTextColor(60, 72, 90);
    doc.text(wrapped, margin, cursor);

    doc.save("trading-places-report.pdf");
  };

  const notePreview =
    reportData.notes?.trim() ||
    "Your reflections from the Scenario page will appear here. Capture what shifted when you swapped roles.";

  const completion = reportData.dialogue?.completion ?? { completed: 0, total: 0 };

  return (
    <div className="max-w-6xl mx-auto pb-16 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="rounded-2xl bg-gradient-to-br from-[var(--surface-700)] via-[#0d2430] to-[var(--surface-700)] p-8 relative overflow-hidden border border-[var(--glass-border)]"
        style={{ boxShadow: "var(--shadow-lg)" }}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[var(--accent-cyan)] rounded-full blur-[80px] opacity-[0.08]" />
          <div className="absolute bottom-0 left-1/4 w-48 h-48 bg-[var(--accent-pink)] rounded-full blur-[80px] opacity-[0.05]" />
        </div>
        <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.1em] text-[var(--accent-cyan)] font-semibold glow-cyan-text">
              Export-ready snapshot
            </p>
            <h1 className="text-3xl font-extrabold tracking-tight text-[var(--text-primary)] mt-2">Empathy report</h1>
            <p className="text-sm text-[var(--text-secondary)] mt-2 max-w-2xl">
              Pulls in your practice data, reflections, and dialogue signals. Download and share
              what worked, what to improve, and what you learned.
            </p>
            <p className="text-xs text-[var(--text-tertiary)] mt-2">
              Last updated {formatReportDate(reportData.updatedAt) || "just now"}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="glass-card p-4">
              <p className="text-xs text-[var(--text-tertiary)]">Connection score</p>
              <p className="text-3xl font-bold font-mono text-[var(--text-primary)]">
                {(reportData.dialogue?.connectionScore ?? 0).toFixed(1)}
                <span className="text-sm text-[var(--text-tertiary)]"> /5</span>
              </p>
              <p className="text-xs text-[var(--text-tertiary)] mt-1">
                {completion.completed} of {completion.total} lines practiced
              </p>
            </div>
            <button
              onClick={handleDownload}
              className="btn-primary text-sm px-5 py-3"
            >
              Download PDF
            </button>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 glass-card-elevated p-6 space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.08em] text-[var(--accent-cyan)] font-semibold">
                Scenario snapshot
              </p>
              <h2 className="text-xl font-bold text-[var(--text-primary)]">
                {activeScenario?.title ?? "Pick a scenario"}
              </h2>
            </div>
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-[var(--accent-cyan-subtle)] text-[var(--accent-cyan)] font-semibold">
              Avg empathy {activeScenario?.average?.toFixed?.(1) ?? "–"}/5
            </span>
          </div>

          <div className="grid sm:grid-cols-3 gap-3">
            <div className="rounded-xl bg-[var(--accent-cyan-subtle)] border border-[var(--accent-cyan)]/20 p-4">
              <p className="text-[10px] font-semibold text-[var(--accent-cyan)] uppercase tracking-[0.08em]">
                Focus
              </p>
              <p className="text-sm text-[var(--text-secondary)] mt-2">
                {activeScenario?.empathyFocus?.join(" • ") || "Empathy • Clarity • Pace"}
              </p>
            </div>
            <div className="rounded-xl bg-[var(--surface-700)] border border-[var(--surface-500)] p-4">
              <p className="text-[10px] font-semibold text-[var(--text-tertiary)] uppercase tracking-[0.08em]">
                Customer perspective
              </p>
              <p className="text-2xl font-bold font-mono text-[var(--text-primary)]">
                {activeScenario?.scores?.customer ?? "–"}/5
              </p>
              <p className="text-xs text-[var(--text-tertiary)] mt-1">How understood the customer felt</p>
            </div>
            <div className="rounded-xl bg-[var(--surface-700)] border border-[var(--surface-500)] p-4">
              <p className="text-[10px] font-semibold text-[var(--text-tertiary)] uppercase tracking-[0.08em]">
                Manager perspective
              </p>
              <p className="text-2xl font-bold font-mono text-[var(--text-primary)]">
                {activeScenario?.scores?.manager ?? "–"}/5
              </p>
              <p className="text-xs text-[var(--text-tertiary)] mt-1">How confident and clear you felt</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-3">
            {Object.entries(reportData.dialogue?.metrics ?? {}).map(([label, value]) => (
              <div
                key={label}
                className="rounded-xl bg-[var(--surface-700)] border border-[var(--surface-500)] p-4"
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[var(--text-tertiary)]">
                  {label}
                </p>
                <p className="text-2xl font-bold font-mono text-[var(--text-primary)] mt-1">
                  {Number(value ?? 0).toFixed(1)}
                  <span className="text-sm text-[var(--text-tertiary)]"> /5</span>
                </p>
                <p className="text-xs text-[var(--text-tertiary)] mt-1">
                  Live dialogue signals from your last run
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card-elevated p-6 space-y-3">
          <p className="text-xs uppercase tracking-[0.08em] text-[var(--accent-cyan)] font-semibold">
            Practice recap
          </p>
          <h3 className="text-lg font-bold text-[var(--text-primary)]">What you captured</h3>
          <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
            {learnings.slice(0, 4).map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span
                  className="mt-1.5 h-2 w-2 rounded-full bg-[var(--accent-pink)] shrink-0"
                  style={{ boxShadow: "0 0 6px rgba(217, 119, 86, 0.35)" }}
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-xs text-[var(--text-tertiary)]">
            Pulled from your Scenario reflections and dialogue choices.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="glass-card-elevated p-6 space-y-3">
          <p className="text-xs uppercase tracking-[0.08em] text-[var(--accent-cyan)] font-semibold">
            Tips to level up
          </p>
          <h3 className="text-lg font-bold text-[var(--text-primary)]">Try next run</h3>
          <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
            {improvementTips.map((tip, idx) => (
              <li
                key={idx}
                className="rounded-xl border border-[var(--accent-cyan)]/20 bg-[var(--accent-cyan-subtle)] p-3"
              >
                {tip}
              </li>
            ))}
          </ul>
        </div>

        <div className="glass-card-elevated p-6 space-y-3">
          <p className="text-xs uppercase tracking-[0.08em] text-[var(--accent-cyan)] font-semibold">
            Reflection notes
          </p>
          <h3 className="text-lg font-bold text-[var(--text-primary)]">What you learned</h3>
          <p className="text-sm text-[var(--text-secondary)] whitespace-pre-wrap bg-[var(--surface-700)] border border-[var(--surface-500)] rounded-xl p-4 min-h-[120px]">
            {notePreview}
          </p>
          <p className="text-xs text-[var(--text-tertiary)]">
            Edit your notes on the Scenario page to refresh this section before exporting.
          </p>
        </div>
      </div>

      <div className="glass-card-elevated p-6 space-y-2 border-l-[3px] border-l-[var(--accent-cyan)]">
        <h3 className="text-lg font-bold text-[var(--text-primary)]">Ready to share?</h3>
        <p className="text-sm text-[var(--text-secondary)]">
          Use the PDF export for coaching sessions or peer reviews. It bundles your scores,
          reflections, and improvement plan into a single page.
        </p>
        <button
          onClick={handleDownload}
          className="mt-2 btn-primary text-sm px-5 py-3"
        >
          Download updated PDF
        </button>
      </div>
    </div>
  );
}
