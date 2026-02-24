import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { REPORT_STORAGE_KEY, formatReportDate } from "../utils/reportUtils";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Theater, FileText, HeartPulse } from "lucide-react";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";

const quickLinks = [
  { to: "/workspace/scenario", label: "Run a scenario", icon: Theater, tone: "cyan" },
  { to: "/workspace/report", label: "Download report", icon: FileText, tone: "pink" },
  { to: "/workspace/pulse", label: "Culture pulse", icon: HeartPulse, tone: "default" },
];

const COLORS = {
  understanding: "#00e5ff",
  empathy: "#ff4ebe",
  clarity: "#34d399",
};

export default function Dashboard() {
  const { username } = useAuth();
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(REPORT_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setReportData(parsed);
      }
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const metrics = useMemo(() => {
    if (!reportData?.dialogue?.metrics) {
      return { Understanding: 0, "Empathy signaled": 0, "Clarity of next steps": 0 };
    }
    return reportData.dialogue.metrics;
  }, [reportData]);

  const signals = useMemo(() => {
    const understanding = metrics.Understanding || 0;
    const empathy = metrics["Empathy signaled"] || 0;
    const clarity = metrics["Clarity of next steps"] || 0;

    return [
      {
        title: "Understanding",
        value: understanding.toFixed(1),
        rawValue: understanding,
        desc: understanding >= 4 ? "You're mirroring needs effectively." : "Focus on reflecting back what you hear.",
        trend: understanding >= 4 ? "up" : "neutral",
      },
      {
        title: "Empathy signaled",
        value: empathy.toFixed(1),
        rawValue: empathy,
        desc: empathy >= 4 ? "Your tone choices build connection." : "Try naming emotions before offering solutions.",
        trend: empathy >= 4 ? "up" : "neutral",
      },
      {
        title: "Clarity",
        value: clarity.toFixed(1),
        rawValue: clarity,
        desc: clarity >= 4 ? "You're narrating next steps clearly." : "State timelines and next steps out loud.",
        trend: clarity >= 4 ? "up" : "neutral",
      },
    ];
  }, [metrics]);

  const chartData = useMemo(() => {
    return signals.map((sig) => ({
      name: sig.title.split(" ")[0],
      value: sig.rawValue,
      fullName: sig.title,
    }));
  }, [signals]);

  const connectionScore = reportData?.dialogue?.connectionScore || 0;
  const completion = reportData?.dialogue?.completion || { completed: 0, total: 0 };
  const completionPercent = completion.total > 0 ? Math.round((completion.completed / completion.total) * 100) : 0;

  const stats = useMemo(() => {
    const scenarioCount = reportData?.scenarioSnapshots?.length || 0;
    const dialogueCount = reportData?.dialogue ? 1 : 0;
    const notesLength = reportData?.notes?.length || 0;

    return [
      { label: "Scenarios practiced", value: scenarioCount, icon: "🎯", accent: "cyan" },
      { label: "Dialogues completed", value: dialogueCount, icon: "💬", accent: "pink" },
      { label: "Reflection notes", value: notesLength > 0 ? `${Math.ceil(notesLength / 100)}` : "0", icon: "📝", accent: "emerald" },
      {
        label: "Last updated",
        value: reportData?.updatedAt ? formatReportDate(reportData.updatedAt).split(",")[0] || "Never" : "Never",
        icon: "🕒",
        accent: "default",
      },
    ];
  }, [reportData]);

  const recentActivity = useMemo(() => {
    const activities = [];
    if (reportData?.dialogue?.completion?.completed > 0) {
      activities.push({ label: "Today", item: `Completed ${reportData.dialogue.completion.completed} dialogue lines`, type: "dialogue", time: reportData.updatedAt });
    }
    if (reportData?.scenarioSnapshots?.length > 0) {
      activities.push({ label: "Recent", item: `Practiced ${reportData.scenarioSnapshots.length} scenario${reportData.scenarioSnapshots.length > 1 ? "s" : ""}`, type: "scenario", time: reportData.updatedAt });
    }
    if (reportData?.notes?.length > 0) {
      activities.push({ label: "Notes", item: "Added reflection notes", type: "notes", time: reportData.updatedAt });
    }
    if (activities.length === 0) {
      activities.push({ label: "Get started", item: "Complete your first scenario to see activity here", type: "placeholder" });
    }
    return activities.slice(0, 5);
  }, [reportData]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading dashboard..." />
      </div>
    );
  }

  return (
    <div className="pb-16 animate-fade-in">
      {/* Header */}
      <div className="rounded-2xl bg-gradient-to-br from-[var(--surface-700)] via-[var(--surface-800)] to-[var(--surface-700)] p-8 mb-8 relative overflow-hidden border border-[var(--glass-border)]"
        style={{ boxShadow: "var(--shadow-lg)" }}
      >
        {/* Mesh background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--accent-cyan)] rounded-full blur-[80px] opacity-[0.08]" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[var(--accent-pink)] rounded-full blur-[80px] opacity-[0.05]" />
        </div>

        <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.08em] text-[var(--accent-cyan)] font-semibold glow-cyan-text">
              Empathy Studio
            </p>
            <h1 className="text-3xl md:text-4xl font-extrabold mt-1 tracking-tight text-[var(--text-primary)]">
              Welcome back{username ? `, ${username}` : ""}!
            </h1>
            <p className="text-sm text-[var(--text-secondary)] mt-2 max-w-2xl">
              Track your practice, monitor your progress, and continue building empathy skills.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              to="/workspace/scenario"
              className="btn-secondary text-sm px-5 py-3"
            >
              Start Practice
            </Link>
            <Link
              to="/workspace/report"
              className="btn-primary text-sm px-5 py-3"
            >
              Export PDF
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 stagger-children">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="glass-card-elevated p-4 hover:border-[rgba(255,255,255,0.1)]"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">{stat.icon}</span>
              <span className="text-[10px] uppercase tracking-[0.06em] font-semibold text-[var(--text-tertiary)]">
                {stat.label}
              </span>
            </div>
            <p className="text-3xl font-bold font-mono text-[var(--text-primary)]">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Practice Signals with Chart */}
          <div className="glass-card-elevated p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-[var(--text-primary)]">Practice Signals</h2>
                <p className="text-sm text-[var(--text-tertiary)] mt-1">Your empathy metrics at a glance</p>
              </div>
              <Link
                to="/workspace/scenario"
                className="text-sm font-semibold text-[var(--accent-cyan)] hover:underline flex items-center gap-1"
              >
                Practice more →
              </Link>
            </div>

            {reportData ? (
              <>
                {/* Metrics Cards */}
                <div className="grid sm:grid-cols-3 gap-4 mb-6">
                  {signals.map((sig) => {
                    const percentage = (sig.rawValue / 5) * 100;
                    const isGood = sig.rawValue >= 4;
                    return (
                      <div
                        key={sig.title}
                        className="rounded-xl bg-[var(--surface-700)] border border-[var(--surface-500)] p-5 hover:border-[rgba(255,255,255,0.1)]"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <p className="text-[11px] uppercase tracking-[0.08em] text-[var(--text-tertiary)] font-semibold">
                            {sig.title}
                          </p>
                          <span
                            className={`text-[11px] px-2 py-0.5 rounded-full font-semibold ${
                              isGood
                                ? "bg-[var(--accent-emerald-subtle)] text-[var(--accent-emerald)]"
                                : "bg-[var(--accent-amber-subtle)] text-[var(--accent-amber)]"
                            }`}
                          >
                            {isGood ? "Good" : "Improve"}
                          </span>
                        </div>
                        <p className="text-3xl font-bold font-mono text-[var(--text-primary)] mb-2">
                          {sig.value}<span className="text-lg text-[var(--text-tertiary)]">/5</span>
                        </p>
                        <div className="h-1.5 w-full bg-[var(--surface-500)] rounded-full overflow-hidden mb-2">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${percentage}%`,
                              background: isGood
                                ? "linear-gradient(90deg, #34d399, #10b981)"
                                : "linear-gradient(90deg, #fbbf24, #f59e0b)",
                              boxShadow: isGood
                                ? "0 0 10px rgba(52, 211, 153, 0.3)"
                                : "0 0 10px rgba(251, 191, 36, 0.3)",
                              animation: "progress-fill 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
                            }}
                          />
                        </div>
                        <p className="text-xs text-[var(--text-tertiary)]">{sig.desc}</p>
                      </div>
                    );
                  })}
                </div>

                {/* Chart */}
                <div className="mt-6">
                  <h3 className="text-sm font-semibold text-[var(--text-secondary)] mb-4">
                    Metrics Overview
                  </h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--surface-500)" />
                      <XAxis
                        dataKey="name"
                        stroke="var(--text-tertiary)"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        stroke="var(--text-tertiary)"
                        fontSize={12}
                        domain={[0, 5]}
                        tickLine={false}
                        axisLine={false}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "var(--surface-700)",
                          border: "1px solid var(--surface-500)",
                          borderRadius: "12px",
                          color: "var(--text-primary)",
                          boxShadow: "var(--shadow-lg)",
                        }}
                        labelStyle={{ color: "var(--text-secondary)" }}
                        formatter={(value, name, props) => [
                          `${value.toFixed(1)}/5`,
                          props.payload.fullName,
                        ]}
                      />
                      <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                        {chartData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={
                              entry.name === "Understanding"
                                ? COLORS.understanding
                                : entry.name === "Empathy"
                                ? COLORS.empathy
                                : COLORS.clarity
                            }
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </>
            ) : (
              <EmptyState
                icon="📈"
                title="No practice data yet"
                description="Complete a scenario to see your empathy metrics and progress here."
                action={
                  <Link to="/workspace/scenario" className="btn-primary text-sm px-6 py-3">
                    Start Your First Scenario
                  </Link>
                }
              />
            )}
          </div>

          {/* Connection Score & Progress */}
          {reportData && (
            <div className="glass-card-elevated p-6 border-l-[3px] border-l-[var(--accent-cyan)]">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-[var(--text-primary)]">Connection Score</h3>
                  <p className="text-sm text-[var(--text-tertiary)]">Overall empathy performance</p>
                </div>
                <div className="text-right">
                  <p className="text-4xl font-bold font-mono text-[var(--text-primary)]">
                    {connectionScore.toFixed(1)}
                    <span className="text-xl text-[var(--text-tertiary)]">/5</span>
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[var(--text-tertiary)]">Dialogue completion</span>
                  <span className="font-mono font-semibold text-[var(--text-primary)]">
                    {completion.completed} / {completion.total} lines
                  </span>
                </div>
                <div className="h-2.5 w-full bg-[var(--surface-500)] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[var(--accent-cyan)] rounded-full"
                    style={{
                      width: `${completionPercent}%`,
                      boxShadow: "0 0 10px rgba(0, 229, 255, 0.3)",
                      animation: "progress-fill 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Recent Activity */}
          <div className="glass-card-elevated p-6">
            <h2 className="text-lg font-bold text-[var(--text-primary)] mb-4">Recent Activity</h2>
            {recentActivity.length > 0 ? (
              <div className="space-y-3">
                {recentActivity.map((entry, idx) => (
                  <div
                    key={idx}
                    className="flex gap-3 items-start bg-[var(--surface-700)] border border-[var(--surface-500)] rounded-xl p-4 hover:border-[rgba(255,255,255,0.1)]"
                  >
                    <span className="text-[11px] font-semibold px-3 py-1 rounded-full bg-[var(--surface-600)] text-[var(--text-secondary)] border border-[var(--surface-500)] whitespace-nowrap">
                      {entry.label}
                    </span>
                    <div className="flex-1">
                      <p className="text-sm text-[var(--text-secondary)]">{entry.item}</p>
                      {entry.time && (
                        <p className="text-xs text-[var(--text-tertiary)] mt-1">
                          {formatReportDate(entry.time)}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                icon="📅"
                title="No activity yet"
                description="Your practice sessions will appear here."
                action={
                  <Link to="/workspace/scenario" className="btn-primary text-sm px-6 py-3">
                    Start Practicing
                  </Link>
                }
              />
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="glass-card-elevated p-5">
            <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-1">Quick Actions</h3>
            <p className="text-xs text-[var(--text-tertiary)] mb-4">Jump to key features</p>
            <div className="flex flex-col gap-2">
              {quickLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="px-4 py-3 rounded-xl font-medium text-sm bg-[var(--surface-700)] border border-[var(--surface-500)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent-cyan)]/30 flex items-center gap-3"
                  >
                    <Icon size={18} className="text-[var(--accent-cyan)]" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Culture Pulse Tips */}
          <div className="glass-card-elevated p-5 border-t-[3px] border-t-[var(--accent-cyan)]">
            <p className="text-[10px] uppercase tracking-[0.08em] font-semibold text-[var(--accent-cyan)]">
              Culture pulse
            </p>
            <h4 className="text-sm font-bold text-[var(--text-primary)] mt-1">
              Focus areas for your next practice
            </h4>
            <ul className="mt-3 space-y-2 text-sm text-[var(--text-secondary)]">
              <li className="flex items-start gap-2">
                <span className="text-[var(--accent-cyan)] mt-0.5">→</span>
                <span>Lead with curiosity → ask one clarifying question.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--accent-pink)] mt-0.5">→</span>
                <span>Signal empathy → mirror an emotion before offering options.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--accent-emerald)] mt-0.5">→</span>
                <span>State clarity → narrate the next two steps out loud.</span>
              </li>
            </ul>
            <Link
              to="/workspace/pulse"
              className="inline-block mt-4 text-sm font-semibold text-[var(--accent-cyan)] hover:underline"
            >
              See pulse guide →
            </Link>
          </div>

          {/* Improvement Tips */}
          {reportData?.improvementTips && reportData.improvementTips.length > 0 && (
            <div className="glass-card-elevated p-5">
              <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3">Improvement Tips</h3>
              <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                {reportData.improvementTips.slice(0, 3).map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[var(--accent-pink)] mt-0.5">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
