import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Theater, BarChart3, ClipboardCheck, HeartPulse, FileText, Sparkles } from "lucide-react";
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

export default function Home() {
  return (
    <div className="bg-[var(--surface-900)] min-h-screen">
      {/* ──────── HERO ──────── */}
      <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden">
        {/* Background orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[10%] right-[10%] w-[500px] h-[500px] bg-[var(--accent-cyan)] rounded-full blur-[150px] opacity-[0.06] animate-float" />
          <div
            className="absolute bottom-[10%] left-[5%] w-[400px] h-[400px] bg-[var(--accent-pink)] rounded-full blur-[130px] opacity-[0.04] animate-float"
            style={{ animationDelay: "3s" }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            {/* Left — copy */}
            <div>
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--accent-cyan-subtle)] border border-[var(--accent-cyan)]/20 mb-6 animate-fade-in-up"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-cyan)] animate-pulse-glow" />
                <span className="text-xs font-semibold text-[var(--accent-cyan)]">
                  Empathy training platform
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-[4rem] font-extrabold tracking-[-0.03em] text-[var(--text-primary)] leading-[1.08] animate-fade-in-up">
                Build empathy that{" "}
                <span className="text-[var(--accent-cyan)] glow-cyan-text">
                  changes
                </span>{" "}
                how teams{" "}
                <span className="text-[var(--accent-pink)] glow-pink-text">
                  connect
                </span>
              </h1>

              <p
                className="text-lg text-[var(--text-secondary)] mt-6 max-w-xl leading-relaxed animate-fade-in-up"
                style={{ animationDelay: "80ms" }}
              >
                Step into real-world scenarios designed to build cultural intelligence,
                awareness, and empathy. Practice as both sides. Measure what matters.
              </p>

              <div
                className="flex flex-col sm:flex-row gap-4 mt-10 animate-fade-in-up"
                style={{ animationDelay: "160ms" }}
              >
                <Link
                  to="/workspace/scenario"
                  className="btn-primary text-[15px] px-7 py-4 gap-2"
                >
                  Start practicing
                  <ArrowRight size={18} />
                </Link>
                <Link
                  to="/workspace/dashboard"
                  className="btn-secondary text-[15px] px-7 py-4"
                >
                  View dashboard
                </Link>
              </div>
            </div>

            {/* Right — visual card */}
            <div
              className="relative animate-fade-in-up hidden lg:block"
              style={{ animationDelay: "200ms" }}
            >
              <div className="glass-card-elevated p-8 relative overflow-hidden">
                {/* Inner glow */}
                <div className="absolute -top-20 -right-20 w-60 h-60 bg-[var(--accent-cyan)] rounded-full blur-[80px] opacity-[0.1]" />
                <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-[var(--accent-pink)] rounded-full blur-[60px] opacity-[0.08]" />

                <div className="relative space-y-6">
                  {/* Mock metric cards */}
                  <div className="flex items-center gap-4">
                    <img src={logo} alt="Trading Places" className="w-12 h-12 object-contain rounded-xl" style={{ filter: "drop-shadow(0 0 8px rgba(0, 229, 255, 0.3))" }} />
                    <div>
                      <p className="text-sm font-bold text-[var(--text-primary)]">Trading Places</p>
                      <p className="text-xs text-[var(--text-tertiary)]">Empathy through experience</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: "Understanding", value: "4.2", color: "var(--accent-cyan)" },
                      { label: "Empathy", value: "3.8", color: "var(--accent-pink)" },
                      { label: "Clarity", value: "4.5", color: "var(--accent-emerald)" },
                    ].map((metric) => (
                      <div key={metric.label} className="bg-[var(--surface-700)] rounded-xl p-3 border border-[var(--surface-500)]">
                        <p className="text-[10px] uppercase tracking-[0.08em] text-[var(--text-tertiary)] mb-1">{metric.label}</p>
                        <p className="text-2xl font-bold font-mono" style={{ color: metric.color }}>
                          {metric.value}
                        </p>
                        <div className="h-1 w-full bg-[var(--surface-500)] rounded-full mt-2 overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${(parseFloat(metric.value) / 5) * 100}%`,
                              backgroundColor: metric.color,
                              boxShadow: `0 0 8px ${metric.color}40`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-[var(--surface-700)] rounded-xl p-4 border border-[var(--surface-500)]">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-semibold text-[var(--text-secondary)]">Connection Score</p>
                      <p className="text-lg font-bold font-mono text-[var(--accent-cyan)]">4.2<span className="text-xs text-[var(--text-tertiary)]">/5</span></p>
                    </div>
                    <div className="h-2 w-full bg-[var(--surface-500)] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[var(--accent-cyan)] rounded-full"
                        style={{
                          width: "84%",
                          boxShadow: "0 0 12px rgba(0, 229, 255, 0.3)",
                          animation: "progress-fill 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────── STATS BAR ──────── */}
      <section className="relative border-y border-[var(--glass-border)] bg-[var(--surface-800)]/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl md:text-3xl font-bold font-mono text-[var(--text-primary)]">
                  {stat.value}
                </p>
                <p className="text-xs uppercase tracking-[0.08em] text-[var(--text-tertiary)] mt-1 font-semibold">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────── FEATURES GRID ──────── */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-16">
            <p className="text-xs font-semibold text-[var(--accent-cyan)] uppercase tracking-[0.08em] mb-3">
              What you can do
            </p>
            <h2 className="text-3xl lg:text-4xl font-extrabold tracking-[-0.02em] text-[var(--text-primary)] leading-tight">
              Everything you need to practice empathy at scale
            </h2>
            <p className="text-[var(--text-secondary)] mt-4 text-lg leading-relaxed">
              From interactive roleplay to structured assessments, Trading Places gives you
              the tools to understand, measure, and improve empathy in every interaction.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="glass-card-interactive p-6 group"
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${feature.accent}12` }}
                  >
                    <Icon size={22} style={{ color: feature.accent }} />
                  </div>
                  <h3 className="text-[17px] font-bold text-[var(--text-primary)] mb-2">
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
      <section className="py-24 lg:py-32 border-t border-[var(--glass-border)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-xs font-semibold text-[var(--accent-pink)] uppercase tracking-[0.08em] mb-3">
              How it works
            </p>
            <h2 className="text-3xl lg:text-4xl font-extrabold tracking-[-0.02em] text-[var(--text-primary)]">
              Three steps to stronger empathy
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
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
                  className="text-[80px] font-extrabold leading-none opacity-[0.06] absolute -top-4 -left-2"
                  style={{ color: item.accent }}
                >
                  {item.step}
                </span>
                <div className="relative pt-12">
                  <div
                    className="h-1 w-12 rounded-full mb-6"
                    style={{ backgroundColor: item.accent }}
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
      <section className="py-24 lg:py-32 border-t border-[var(--glass-border)] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--accent-cyan)] rounded-full blur-[200px] opacity-[0.04]" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-extrabold tracking-[-0.02em] text-[var(--text-primary)]">
            Ready to build empathy that lasts?
          </h2>
          <p className="text-lg text-[var(--text-secondary)] mt-4 leading-relaxed">
            Start your first scenario today. Practice, measure, and improve the way your team connects.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <Link
              to="/workspace/scenario"
              className="btn-primary text-[15px] px-8 py-4 gap-2"
            >
              Get started free
              <ArrowRight size={18} />
            </Link>
            <Link
              to="/workspace/dashboard"
              className="btn-secondary text-[15px] px-8 py-4"
            >
              Explore dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* ──────── FOOTER ──────── */}
      <footer className="border-t border-[var(--glass-border)] py-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Trading Places" className="w-8 h-8 object-contain rounded-lg" />
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
