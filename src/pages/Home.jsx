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

const metrics = [
  { label: "Understanding", value: "4.2", color: "var(--accent-cyan)", pct: 84 },
  { label: "Empathy", value: "3.8", color: "var(--accent-pink)", pct: 76 },
  { label: "Clarity", value: "4.5", color: "var(--accent-emerald)", pct: 90 },
];

export default function Home() {
  return (
    <div className="bg-[var(--surface-900)] min-h-screen">

      {/* ──────── HERO ──────── */}
      <section className="relative pt-36 pb-0 overflow-hidden">

        {/* Large ambient glow orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute -top-[20%] left-[5%] w-[900px] h-[900px] rounded-full blur-[320px] opacity-[0.07]"
            style={{ background: "radial-gradient(circle, #d4a574 0%, transparent 65%)" }}
          />
          <div
            className="absolute top-[5%] right-[-10%] w-[700px] h-[700px] rounded-full blur-[260px] opacity-[0.05]"
            style={{ background: "radial-gradient(circle, #c49690 0%, transparent 65%)" }}
          />
        </div>

        {/* Small floating dot accents */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
          <div className="absolute top-[22%] left-[9%]  w-3   h-3   rounded-full animate-float opacity-70" style={{ background: "#c49690" }} />
          <div className="absolute top-[38%] right-[8%]  w-2.5 h-2.5 rounded-full animate-float opacity-60" style={{ background: "#d4a574", animationDelay: "1.2s" }} />
          <div className="absolute top-[13%] right-[26%] w-2   h-2   rounded-full animate-float opacity-40" style={{ background: "#6dbb8a", animationDelay: "2.1s" }} />
          <div className="absolute top-[48%] left-[5%]  w-2   h-2   rounded-full animate-float opacity-50" style={{ background: "#d4a030", animationDelay: "3.3s" }} />
          <div className="absolute top-[18%] left-[48%] w-1.5 h-1.5 rounded-full animate-float opacity-30" style={{ background: "#d4a574", animationDelay: "0.8s" }} />
          <div className="absolute top-[30%] left-[20%] w-1   h-1   rounded-full animate-float opacity-25" style={{ background: "#c49690", animationDelay: "4s" }} />
          <div className="absolute top-[28%] right-[20%] w-1   h-1   rounded-full animate-float opacity-20" style={{ background: "#d4a574", animationDelay: "2.8s" }} />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 text-center">

          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-10 animate-fade-in-up"
            style={{ background: "rgba(212,165,116,0.1)", border: "1px solid rgba(212,165,116,0.22)" }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-cyan)] animate-pulse-glow" />
            <span className="text-xs font-semibold tracking-wide" style={{ color: "var(--accent-cyan)" }}>
              Empathy training platform
            </span>
          </div>

          {/* Headline */}
          <h1
            className="font-display text-6xl sm:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] font-bold tracking-[-0.03em] leading-[1.04] animate-fade-in-up mb-8"
            style={{ animationDelay: "60ms" }}
          >
            <span className="text-gradient">Build empathy.</span>
            <br />
            <span className="text-[var(--text-primary)]">Change teams.</span>
          </h1>

          <p
            className="text-xl text-[var(--text-secondary)] max-w-xl mx-auto leading-relaxed animate-fade-in-up mb-12"
            style={{ animationDelay: "120ms" }}
          >
            Step into real-world scenarios designed to build cultural intelligence,
            awareness, and empathy. Practice as both sides. Measure what matters.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up mb-20"
            style={{ animationDelay: "180ms" }}
          >
            <Link to="/workspace/scenario" className="btn-gradient text-[15px]">
              Start practicing
              <ArrowRight size={18} />
            </Link>
            <Link to="/workspace/dashboard" className="btn-secondary text-[15px] px-7 py-4">
              View dashboard
            </Link>
          </div>

          {/* ── App preview ── */}
          <div
            className="relative animate-fade-in-up"
            style={{ animationDelay: "300ms" }}
          >
            {/* Glow halo */}
            <div
              className="absolute -inset-6 rounded-3xl blur-[70px] opacity-20 pointer-events-none"
              style={{ background: "linear-gradient(135deg, rgba(212,165,116,0.6) 0%, rgba(196,150,144,0.4) 100%)" }}
            />

            {/* Perspective wrapper */}
            <div
              className="relative overflow-hidden rounded-t-2xl"
              style={{
                transform: "perspective(1400px) rotateX(5deg) scale(0.97)",
                transformOrigin: "center bottom",
                border: "1px solid rgba(255,255,255,0.08)",
                borderBottom: "none",
              }}
            >
              {/* Browser chrome */}
              <div
                className="flex items-center gap-2 px-5 py-3.5 border-b"
                style={{ background: "var(--surface-700)", borderColor: "rgba(255,255,255,0.06)" }}
              >
                <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <span className="w-3 h-3 rounded-full bg-[#28c840]" />
                <div
                  className="ml-4 rounded-full px-4 py-1.5 text-[11px] text-[var(--text-tertiary)]"
                  style={{ background: "var(--surface-600)", width: "220px" }}
                >
                  tradingplaces.app/workspace
                </div>
              </div>

              {/* App content */}
              <div className="p-8 lg:p-10" style={{ background: "var(--surface-800)" }}>
                {/* Session header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: "linear-gradient(135deg, rgba(212,165,116,0.14), rgba(196,150,144,0.08))", border: "1px solid rgba(212,165,116,0.22)" }}
                    >
                      <img src={logo} alt="" className="w-5 h-5 object-contain" style={{ filter: "drop-shadow(0 0 6px rgba(212,165,116,0.4))" }} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[var(--text-primary)]">Session Overview</p>
                      <p className="text-xs text-[var(--text-tertiary)] mt-0.5">Workplace conflict — Manager scenario</p>
                    </div>
                  </div>
                  <div
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                    style={{ background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.2)" }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-emerald)]" />
                    <span className="text-[10px] font-semibold text-[var(--accent-emerald)]">Live session</span>
                  </div>
                </div>

                {/* Metric cards */}
                <div className="grid grid-cols-3 gap-4 mb-5">
                  {metrics.map((m) => (
                    <div
                      key={m.label}
                      className="rounded-xl p-4"
                      style={{ background: "var(--surface-700)", border: "1px solid var(--surface-500)" }}
                    >
                      <p className="text-[9px] uppercase tracking-[0.1em] text-[var(--text-tertiary)] mb-1.5">{m.label}</p>
                      <p className="text-3xl font-bold font-mono" style={{ color: m.color }}>{m.value}</p>
                      <div className="h-1 w-full bg-[var(--surface-500)] rounded-full mt-3 overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${m.pct}%`, background: `linear-gradient(90deg, ${m.color}99, ${m.color})` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Connection score */}
                <div
                  className="rounded-xl p-5"
                  style={{ background: "var(--surface-700)", border: "1px solid var(--surface-500)" }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-semibold text-[var(--text-secondary)]">Connection Score</p>
                    <p className="text-xl font-bold font-mono text-[var(--accent-cyan)]">
                      4.2 <span className="text-sm text-[var(--text-tertiary)]">/ 5</span>
                    </p>
                  </div>
                  <div className="h-2.5 w-full bg-[var(--surface-500)] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: "84%",
                        background: "linear-gradient(90deg, var(--accent-cyan), var(--accent-pink))",
                        boxShadow: "0 0 14px rgba(212,165,116,0.3)",
                      }}
                    />
                  </div>
                  <p className="text-xs text-[var(--text-tertiary)] mt-2">↑ 12% from last session</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────── STATS BAR ──────── */}
      <section
        className="relative border-y border-[var(--glass-border)]"
        style={{ background: "linear-gradient(90deg, rgba(22,26,28,0.9), rgba(30,34,37,0.7), rgba(22,26,28,0.9))" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={stat.label} className="text-center">
                <p
                  className="font-display text-3xl md:text-4xl font-bold tracking-tight"
                  style={{ color: i % 2 === 0 ? "#d4a574" : "#c49690" }}
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
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4"
              style={{ background: "rgba(212,165,116,0.1)", border: "1px solid rgba(212,165,116,0.22)" }}
            >
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
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4"
              style={{ background: "rgba(196,144,106,0.1)", border: "1px solid rgba(196,144,106,0.22)" }}
            >
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
                  <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3">{item.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────── CTA SECTION ──────── */}
      <section className="py-28 lg:py-36 border-t border-[var(--glass-border)] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[220px] opacity-[0.05]"
            style={{ background: "radial-gradient(circle, #d4a574 0%, #be8d5a 60%, transparent 100%)" }}
          />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-8">
          <div className="glass-card-premium p-12 text-center">
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6"
              style={{ background: "rgba(212,165,116,0.1)", border: "1px solid rgba(212,165,116,0.22)" }}
            >
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
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, rgba(212,165,116,0.12), rgba(196,150,144,0.06))", border: "1px solid rgba(212,165,116,0.2)" }}
            >
              <img src={logo} alt="Trading Places" className="w-5 h-5 object-contain" style={{ filter: "drop-shadow(0 2px 4px rgba(212,165,116,0.25))" }} />
            </div>
            <span className="text-sm font-semibold text-[var(--text-secondary)]">Trading Places</span>
          </div>
          <p className="text-xs text-[var(--text-tertiary)]">© 2025 LSBU Prototype. Built for empathy.</p>
        </div>
      </footer>

    </div>
  );
}
