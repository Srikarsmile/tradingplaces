import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Theater, BarChart3, ClipboardCheck, HeartPulse, FileText, Sparkles, CheckCircle2 } from "lucide-react";
import logo from "../assets/trading-places-simulator-1.png";

const features = [
  {
    icon: Theater,
    title: "Interactive Roleplay",
    description: "Step into real scenarios as both customer and manager. Choose responses and watch empathy metrics shift in real time.",
    accent: "var(--accent-cyan)",
  },
  {
    icon: BarChart3,
    title: "Live Metrics Dashboard",
    description: "Track understanding, empathy, and clarity signals across every practice session with visual analytics.",
    accent: "var(--accent-pink)",
  },
  {
    icon: ClipboardCheck,
    title: "Behaviour Assessment",
    description: "Complete structured assessments, review flagged moments, and re-run with coaching cues to improve.",
    accent: "var(--accent-emerald)",
  },
  {
    icon: HeartPulse,
    title: "Culture Pulse Signals",
    description: "Learn the three behaviours that keep teams safe: curiosity, inclusion, and clarity.",
    accent: "var(--accent-amber)",
  },
  {
    icon: FileText,
    title: "Export-Ready Reports",
    description: "Generate PDF reports with your scores, reflections, and improvement tips for coaching sessions.",
    accent: "var(--accent-cyan)",
  },
  {
    icon: Sparkles,
    title: "Guided Reflection",
    description: "Capture what shifted when you swapped roles. Build reusable scripts for real workplace interactions.",
    accent: "var(--accent-pink)",
  },
];

const stats = [
  { value: "3+", label: "Scenario types" },
  { value: "6", label: "Behaviour signals" },
  { value: "Real-time", label: "Empathy tracking" },
  { value: "PDF", label: "Report export" },
];

const pillars = [
  "Psychological safety",
  "Cross-cultural intelligence",
  "Active listening practice",
  "Measurable empathy metrics",
];

export default function Home() {
  return (
    <div className="bg-[var(--surface-900)] min-h-screen">
      {/* ──────── HERO ──────── */}
      <section className="relative pt-36 pb-28 lg:pt-44 lg:pb-36 overflow-hidden">
        {/* Ambient orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute top-[-5%] right-[5%] w-[640px] h-[640px] rounded-full blur-[180px] opacity-[0.07] animate-float"
            style={{ background: "radial-gradient(circle, #818cf8 0%, #6366f1 60%, transparent 100%)" }}
          />
          <div
            className="absolute bottom-[0%] left-[-5%] w-[500px] h-[500px] rounded-full blur-[150px] opacity-[0.05] animate-float"
            style={{ background: "radial-gradient(circle, #fb7185 0%, #f43f5e 60%, transparent 100%)", animationDelay: "3.5s" }}
          />
          <div
            className="absolute top-[40%] left-[40%] w-[300px] h-[300px] rounded-full blur-[120px] opacity-[0.04] animate-float"
            style={{ background: "radial-gradient(circle, #a78bfa 0%, transparent 100%)", animationDelay: "1.5s" }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left — copy */}
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 animate-fade-in-up"
                style={{
                  background: "linear-gradient(135deg, rgba(129,140,248,0.1) 0%, rgba(251,113,133,0.08) 100%)",
                  border: "1px solid rgba(129,140,248,0.2)",
                }}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-cyan)] animate-pulse-glow" />
                <span className="text-xs font-semibold tracking-wide" style={{ color: "var(--accent-cyan)" }}>
                  Empathy training platform
                </span>
              </div>

              <h1
                className="text-5xl sm:text-6xl lg:text-[4rem] xl:text-[4.5rem] font-extrabold tracking-[-0.04em] leading-[1.05] animate-fade-in-up"
                style={{ animationDelay: "60ms" }}
              >
                <span className="text-[var(--text-primary)]">Build empathy</span>
                <br />
                <span className="text-gradient">that changes</span>
                <br />
                <span className="text-[var(--text-primary)]">how teams </span>
                <span className="text-gradient-warm">connect</span>
              </h1>

              <p
                className="text-lg text-[var(--text-secondary)] mt-7 max-w-xl leading-relaxed animate-fade-in-up"
                style={{ animationDelay: "120ms" }}
              >
                Step into real-world scenarios designed to build cultural intelligence,
                awareness, and empathy. Practice as both sides. Measure what matters.
              </p>

              {/* Pillar list */}
              <ul
                className="flex flex-col gap-2.5 mt-6 animate-fade-in-up"
                style={{ animationDelay: "180ms" }}
              >
                {pillars.map((p) => (
                  <li key={p} className="flex items-center gap-2.5 text-sm text-[var(--text-secondary)]">
                    <CheckCircle2 size={15} style={{ color: "var(--accent-cyan)", flexShrink: 0 }} />
                    {p}
                  </li>
                ))}
              </ul>

              {/* CTAs */}
              <div
                className="flex flex-col sm:flex-row gap-4 mt-10 animate-fade-in-up"
                style={{ animationDelay: "240ms" }}
              >
                <Link to="/workspace/scenario" className="btn-gradient text-[15px]">
                  Start practicing
                  <ArrowRight size={18} />
                </Link>
                <Link to="/workspace/dashboard" className="btn-secondary text-[15px] px-7 py-4">
                  View dashboard
                </Link>
              </div>
            </div>

            {/* Right — visual card */}
            <div
              className="relative animate-fade-in-up hidden lg:block"
              style={{ animationDelay: "200ms" }}
            >
              {/* Outer glow ring */}
              <div
                className="absolute -inset-px rounded-2xl pointer-events-none"
                style={{
                  background: "linear-gradient(135deg, rgba(129,140,248,0.2) 0%, rgba(251,113,133,0.12) 100%)",
                  filter: "blur(1px)",
                }}
              />
              <div className="glass-card-elevated p-8 relative overflow-hidden">
                {/* Inner glow */}
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-[var(--accent-cyan)] rounded-full blur-[90px] opacity-[0.08]" />
                <div className="absolute -bottom-20 -left-20 w-52 h-52 bg-[var(--accent-pink)] rounded-full blur-[70px] opacity-[0.07]" />

                <div className="relative space-y-6">
                  {/* Header */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ background: "linear-gradient(135deg, rgba(129,140,248,0.15), rgba(251,113,133,0.1))", border: "1px solid rgba(129,140,248,0.2)" }}>
                      <img src={logo} alt="Trading Places" className="w-8 h-8 object-contain" style={{ filter: "drop-shadow(0 0 6px rgba(129, 140, 248, 0.4))" }} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[var(--text-primary)]">Trading Places</p>
                      <p className="text-xs text-[var(--text-tertiary)]">Empathy through experience</p>
                    </div>
                    <div className="ml-auto flex items-center gap-1.5 px-2.5 py-1 rounded-full"
                      style={{ background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.2)" }}>
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-emerald)]" />
                      <span className="text-[10px] font-semibold text-[var(--accent-emerald)]">Live session</span>
                    </div>
                  </div>

                  {/* Metric cards */}
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: "Understanding", value: "4.2", color: "var(--accent-cyan)" },
                      { label: "Empathy", value: "3.8", color: "var(--accent-pink)" },
                      { label: "Clarity", value: "4.5", color: "var(--accent-emerald)" },
                    ].map((metric) => (
                      <div key={metric.label}
                        className="rounded-xl p-3"
                        style={{ background: "var(--surface-700)", border: "1px solid var(--surface-500)" }}>
                        <p className="text-[9px] uppercase tracking-[0.1em] text-[var(--text-tertiary)] mb-1.5">{metric.label}</p>
                        <p className="text-2xl font-bold font-mono" style={{ color: metric.color }}>
                          {metric.value}
                        </p>
                        <div className="h-1 w-full bg-[var(--surface-500)] rounded-full mt-2 overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${(parseFloat(metric.value) / 5) * 100}%`,
                              background: `linear-gradient(90deg, ${metric.color}cc, ${metric.color})`,
                              boxShadow: `0 0 8px ${metric.color}50`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Connection score */}
                  <div className="rounded-xl p-4"
                    style={{ background: "var(--surface-700)", border: "1px solid var(--surface-500)" }}>
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-xs font-semibold text-[var(--text-secondary)]">Connection Score</p>
                      <p className="text-lg font-bold font-mono text-[var(--accent-cyan)]">
                        4.2<span className="text-xs text-[var(--text-tertiary)]">/5</span>
                      </p>
                    </div>
                    <div className="h-2 w-full bg-[var(--surface-500)] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: "84%",
                          background: "linear-gradient(90deg, var(--accent-cyan), var(--accent-pink))",
                          boxShadow: "0 0 12px rgba(129, 140, 248, 0.4)",
                          animation: "progress-fill 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
                        }}
                      />
                    </div>
                    <p className="text-[10px] text-[var(--text-tertiary)] mt-2">↑ 12% from last session</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────── STATS BAR ──────── */}
      <section className="relative border-y border-[var(--glass-border)]"
        style={{ background: "linear-gradient(90deg, rgba(13,11,26,0.6), rgba(19,17,40,0.4), rgba(13,11,26,0.6))" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={stat.label} className="text-center">
                <p
                  className="text-3xl md:text-4xl font-extrabold font-mono tracking-tight"
                  style={{
                    background: i % 2 === 0
                      ? "linear-gradient(135deg, var(--accent-cyan), #a78bfa)"
                      : "linear-gradient(135deg, var(--accent-pink), #fbbf24)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {stat.value}
                </p>
                <p className="text-xs uppercase tracking-[0.1em] text-[var(--text-tertiary)] mt-1.5 font-semibold">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────── FEATURES GRID ──────── */}
      <section className="py-28 lg:py-36">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4"
              style={{ background: "rgba(129,140,248,0.08)", border: "1px solid rgba(129,140,248,0.15)" }}>
              <span className="text-[11px] font-semibold tracking-widest uppercase" style={{ color: "var(--accent-cyan)" }}>
                What you can do
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-extrabold tracking-[-0.03em] text-[var(--text-primary)] leading-tight">
              Everything you need to practice{" "}
              <span className="text-gradient">empathy at scale</span>
            </h2>
            <p className="text-[var(--text-secondary)] mt-5 text-lg leading-relaxed">
              From interactive roleplay to structured assessments, Trading Places gives you
              the tools to understand, measure, and improve empathy in every interaction.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="glass-card-premium p-6 group cursor-pointer transition-all duration-300"
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                    style={{
                      background: `linear-gradient(135deg, ${feature.accent}18, ${feature.accent}08)`,
                      border: `1px solid ${feature.accent}20`,
                    }}
                  >
                    <Icon size={22} style={{ color: feature.accent }} />
                  </div>
                  <h3 className="text-[17px] font-bold text-[var(--text-primary)] mb-2.5">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ──────── HOW IT WORKS ──────── */}
      <section className="py-28 lg:py-36 border-t border-[var(--glass-border)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4"
              style={{ background: "rgba(251,113,133,0.08)", border: "1px solid rgba(251,113,133,0.15)" }}>
              <span className="text-[11px] font-semibold tracking-widest uppercase" style={{ color: "var(--accent-pink)" }}>
                How it works
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-extrabold tracking-[-0.03em] text-[var(--text-primary)]">
              Three steps to{" "}
              <span className="text-gradient">stronger empathy</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                step: "01",
                title: "Practice scenarios",
                description: "Enter interactive roleplay as both customer and manager. Choose how to respond at each turn — your choices shape your empathy metrics.",
                accent: "var(--accent-cyan)",
              },
              {
                step: "02",
                title: "Review & reflect",
                description: "See your behaviour signals, connection scores, and flagged moments. Capture reflections and build a library of what works.",
                accent: "var(--accent-pink)",
              },
              {
                step: "03",
                title: "Improve & share",
                description: "Re-run flagged moments with coaching cues. Export your progress as a PDF report for peer reviews or coaching sessions.",
                accent: "var(--accent-emerald)",
              },
            ].map((item) => (
              <div key={item.step} className="relative">
                <span
                  className="text-[100px] font-extrabold leading-none opacity-[0.04] absolute -top-6 -left-3 select-none"
                  style={{
                    background: `linear-gradient(135deg, ${item.accent}, transparent)`,
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {item.step}
                </span>
                <div className="relative pt-14">
                  <div
                    className="h-[3px] w-14 rounded-full mb-6"
                    style={{ background: `linear-gradient(90deg, ${item.accent}, transparent)` }}
                  />
                  <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────── CTA SECTION ──────── */}
      <section className="py-28 lg:py-36 border-t border-[var(--glass-border)] relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[220px] opacity-[0.05]"
            style={{ background: "radial-gradient(circle, #818cf8 0%, #fb7185 60%, transparent 100%)" }}
          />
        </div>

        {/* Card */}
        <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-8">
          <div className="glass-card-premium p-12 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6"
              style={{ background: "rgba(129,140,248,0.08)", border: "1px solid rgba(129,140,248,0.15)" }}>
              <Sparkles size={12} style={{ color: "var(--accent-cyan)" }} />
              <span className="text-[11px] font-semibold tracking-wide" style={{ color: "var(--accent-cyan)" }}>
                Start your journey
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-extrabold tracking-[-0.03em] text-[var(--text-primary)] mb-4">
              Ready to build empathy{" "}
              <span className="text-gradient">that lasts?</span>
            </h2>
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-10 max-w-xl mx-auto">
              Start your first scenario today. Practice, measure, and improve the way your team connects.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/workspace/scenario" className="btn-gradient text-[15px]">
                Get started free
                <ArrowRight size={18} />
              </Link>
              <Link to="/workspace/dashboard" className="btn-secondary text-[15px] px-8 py-4">
                Explore dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ──────── FOOTER ──────── */}
      <footer className="border-t border-[var(--glass-border)] py-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, rgba(129,140,248,0.15), rgba(251,113,133,0.1))", border: "1px solid rgba(129,140,248,0.2)" }}>
              <img src={logo} alt="Trading Places" className="w-5 h-5 object-contain" style={{ filter: "drop-shadow(0 0 4px rgba(129, 140, 248, 0.5))" }} />
            </div>
            <span className="text-sm font-semibold text-[var(--text-secondary)]">Trading Places</span>
          </div>
          <p className="text-xs text-[var(--text-tertiary)]">
            © 2025 LSBU Prototype. Built for empathy.
          </p>
        </div>
      </footer>
    </div>
  );
}
