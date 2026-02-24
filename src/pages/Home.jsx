import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Theater,
  BarChart3,
  ClipboardCheck,
  HeartPulse,
  FileText,
  Sparkles,
} from "lucide-react";
import logo from "../assets/trading-places-simulator-1.png";
import ThreeBackground from "../components/ThreeBackground";

// ── Data ──────────────────────────────────────────────────────────────────────

// span 2, 1, 1, 2, 1, 2 → fills 3 rows perfectly
const features = [
  {
    icon: Theater,
    title: "Interactive Roleplay",
    description:
      "Step into real scenarios as both customer and manager. Choose responses and watch empathy metrics shift in real time.",
    accent: "#818cf8",
    num: "01",
    span: 2,
  },
  {
    icon: BarChart3,
    title: "Live Metrics Dashboard",
    description:
      "Track understanding, empathy, and clarity signals across every practice session with visual analytics.",
    accent: "#fb7185",
    num: "02",
    span: 1,
  },
  {
    icon: ClipboardCheck,
    title: "Behaviour Assessment",
    description:
      "Complete structured assessments, review flagged moments, and re-run with coaching cues to improve.",
    accent: "#34d399",
    num: "03",
    span: 1,
  },
  {
    icon: HeartPulse,
    title: "Culture Pulse Signals",
    description:
      "Learn the three behaviours that keep teams safe: curiosity, inclusion, and clarity.",
    accent: "#fbbf24",
    num: "04",
    span: 2,
  },
  {
    icon: FileText,
    title: "Export-Ready Reports",
    description:
      "Generate PDF reports with your scores, reflections, and improvement tips for coaching sessions.",
    accent: "#818cf8",
    num: "05",
    span: 1,
  },
  {
    icon: Sparkles,
    title: "Guided Reflection",
    description:
      "Capture what shifted when you swapped roles. Build reusable scripts for real workplace interactions.",
    accent: "#fb7185",
    num: "06",
    span: 2,
  },
];

const steps = [
  {
    num: "01",
    title: "Practice scenarios",
    desc: "Enter interactive roleplay as both customer and manager. Your choices at each turn shape your empathy score in real time.",
    accent: "#818cf8",
  },
  {
    num: "02",
    title: "Review & reflect",
    desc: "See your behaviour signals, connection scores, and flagged moments. Capture reflections and build a library of what works.",
    accent: "#fb7185",
  },
  {
    num: "03",
    title: "Improve & share",
    desc: "Re-run flagged moments with coaching cues. Export your progress as a PDF report for peer reviews or coaching sessions.",
    accent: "#34d399",
  },
];

const stats = [
  { val: "3+",   label: "Scenario types",   accent: "#818cf8", grad: "#a78bfa" },
  { val: "6",    label: "Behaviour signals", accent: "#fb7185", grad: "#fbbf24" },
  { val: "100%", label: "Real-time metrics", accent: "#a78bfa", grad: "#818cf8" },
  { val: "PDF",  label: "Export format",     accent: "#34d399", grad: "#818cf8" },
];

const marqueeItems = [
  "Interactive Roleplay",
  "Live Empathy Metrics",
  "Culture Intelligence",
  "Behaviour Signals",
  "PDF Reports",
  "Real-time Tracking",
  "Coaching Cues",
  "Role Reversal",
  "Guided Reflection",
  "Connection Scores",
];

// ── Sub-components ─────────────────────────────────────────────────────────────

function ProductMockup() {
  return (
    <div style={{ position: "relative" }}>
      {/* Floating badge — top right */}
      <div
        className="hero-badge"
        style={{
          position: "absolute",
          top: "-18px",
          right: "-24px",
          background: "linear-gradient(135deg,rgba(13,11,26,0.92),rgba(19,17,40,0.85))",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(129,140,248,0.22)",
          borderRadius: "12px",
          padding: "10px 14px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          boxShadow: "0 12px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)",
          animation: "float 4.2s ease-in-out infinite",
          zIndex: 20,
          whiteSpace: "nowrap",
        }}
      >
        <span style={{ fontSize: "16px" }}>✨</span>
        <div>
          <div style={{ fontSize: "12px", fontWeight: 800, color: "#818cf8", lineHeight: 1 }}>4.2 / 5</div>
          <div style={{ fontSize: "10px", color: "var(--text-tertiary)", lineHeight: 1.4 }}>Connection Score</div>
        </div>
      </div>

      {/* Floating badge — bottom left */}
      <div
        className="hero-badge"
        style={{
          position: "absolute",
          bottom: "28px",
          left: "-28px",
          background: "linear-gradient(135deg,rgba(13,11,26,0.92),rgba(19,17,40,0.85))",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(52,211,153,0.22)",
          borderRadius: "12px",
          padding: "10px 14px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          boxShadow: "0 12px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)",
          animation: "float 3.6s ease-in-out infinite",
          animationDelay: "1.1s",
          zIndex: 20,
          whiteSpace: "nowrap",
        }}
      >
        <span style={{ fontSize: "16px" }}>🎯</span>
        <div>
          <div style={{ fontSize: "12px", fontWeight: 800, color: "#34d399", lineHeight: 1 }}>Active Listening</div>
          <div style={{ fontSize: "10px", color: "var(--text-tertiary)", lineHeight: 1.4 }}>Signal detected</div>
        </div>
      </div>

      {/* Floating badge — right center */}
      <div
        className="hero-badge"
        style={{
          position: "absolute",
          top: "42%",
          right: "-32px",
          background: "linear-gradient(135deg,rgba(13,11,26,0.92),rgba(19,17,40,0.85))",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(251,113,133,0.22)",
          borderRadius: "12px",
          padding: "10px 14px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          boxShadow: "0 12px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)",
          animation: "float 5s ease-in-out infinite",
          animationDelay: "2.2s",
          zIndex: 20,
          whiteSpace: "nowrap",
        }}
      >
        <span style={{ fontSize: "16px" }}>↑</span>
        <div>
          <div style={{ fontSize: "12px", fontWeight: 800, color: "#fb7185", lineHeight: 1 }}>Empathy +18%</div>
          <div style={{ fontSize: "10px", color: "var(--text-tertiary)", lineHeight: 1.4 }}>This session</div>
        </div>
      </div>

      {/* Main card */}
      <div
        style={{
          background: "linear-gradient(160deg,rgba(13,11,26,0.80),rgba(19,17,40,0.72))",
          backdropFilter: "blur(28px) saturate(180%)",
          WebkitBackdropFilter: "blur(28px) saturate(180%)",
          border: "1px solid rgba(129,140,248,0.18)",
          borderRadius: "24px",
          overflow: "hidden",
          boxShadow: "0 40px 100px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.06)",
        }}
      >
        {/* Header bar */}
        <div
          style={{
            padding: "14px 20px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "rgba(255,255,255,0.015)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {/* Traffic lights */}
            <div style={{ display: "flex", gap: "6px" }}>
              {["#ff5f57","#febc2e","#28c840"].map(c => (
                <div key={c} style={{ width: "10px", height: "10px", borderRadius: "50%", background: c, opacity: 0.85 }} />
              ))}
            </div>
            <div style={{ width: "1px", height: "14px", background: "rgba(255,255,255,0.08)", margin: "0 4px" }} />
            <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.01em" }}>
              Tone at the Till
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.22)", borderRadius: "9999px", padding: "3px 10px" }}>
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#34d399", boxShadow: "0 0 6px #34d399", animation: "pulse-glow 2s infinite" }} />
            <span style={{ fontSize: "10px", fontWeight: 700, color: "#34d399", letterSpacing: "0.06em" }}>LIVE</span>
          </div>
        </div>

        {/* Chat area */}
        <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "14px" }}>
          {/* Customer bubble */}
          <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
            <div
              style={{
                width: "30px", height: "30px", borderRadius: "50%", flexShrink: 0,
                background: "rgba(251,113,133,0.15)", border: "1px solid rgba(251,113,133,0.28)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "11px", fontWeight: 800, color: "#fb7185",
              }}
            >
              C
            </div>
            <div
              style={{
                background: "rgba(251,113,133,0.08)", border: "1px solid rgba(251,113,133,0.14)",
                borderRadius: "4px 14px 14px 14px", padding: "10px 14px", flex: 1,
              }}
            >
              <p style={{ fontSize: "10px", color: "var(--text-tertiary)", marginBottom: "4px", letterSpacing: "0.04em", textTransform: "uppercase" }}>Customer</p>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.55 }}>
                "I've been waiting over 20 minutes. This is completely unacceptable."
              </p>
            </div>
          </div>

          {/* Response options */}
          <div>
            <p style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-tertiary)", marginBottom: "8px" }}>
              Choose your response
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
              {[
                { text: "I sincerely apologise. Let me help you right away.", selected: true },
                { text: "I understand how frustrating that must be for you.", selected: false },
              ].map((opt, i) => (
                <div
                  key={i}
                  style={{
                    padding: "9px 12px",
                    borderRadius: "10px",
                    border: opt.selected ? "1px solid rgba(129,140,248,0.38)" : "1px solid rgba(255,255,255,0.06)",
                    background: opt.selected ? "rgba(129,140,248,0.1)" : "rgba(255,255,255,0.02)",
                    fontSize: "12px",
                    color: opt.selected ? "#a5b4fc" : "var(--text-tertiary)",
                    display: "flex",
                    gap: "9px",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  <div
                    style={{
                      width: "14px", height: "14px", borderRadius: "50%", flexShrink: 0,
                      border: opt.selected ? "2px solid #818cf8" : "2px solid rgba(255,255,255,0.15)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}
                  >
                    {opt.selected && <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#818cf8" }} />}
                  </div>
                  {opt.text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Metrics bar */}
        <div
          style={{
            padding: "14px 20px",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "14px",
            background: "rgba(0,0,0,0.15)",
          }}
        >
          {[
            { label: "Understanding", val: 84, color: "#818cf8" },
            { label: "Empathy",       val: 76, color: "#fb7185" },
            { label: "Clarity",       val: 91, color: "#34d399" },
          ].map(m => (
            <div key={m.label}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                <span style={{ fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-tertiary)" }}>{m.label}</span>
                <span style={{ fontSize: "10px", fontWeight: 800, fontFamily: "var(--font-mono, monospace)", color: m.color }}>{m.val}%</span>
              </div>
              <div style={{ height: "3px", background: "rgba(255,255,255,0.07)", borderRadius: "9999px", overflow: "hidden" }}>
                <div
                  style={{
                    height: "100%",
                    width: `${m.val}%`,
                    background: `linear-gradient(90deg, ${m.color}99, ${m.color})`,
                    borderRadius: "9999px",
                    boxShadow: `0 0 8px ${m.color}60`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MarqueeStrip() {
  const doubled = [...marqueeItems, ...marqueeItems];
  return (
    <div
      style={{
        borderTop: "1px solid var(--glass-border)",
        borderBottom: "1px solid var(--glass-border)",
        background: "linear-gradient(90deg,rgba(7,6,15,0.7),rgba(19,17,40,0.5),rgba(7,6,15,0.7))",
        backdropFilter: "blur(20px)",
        padding: "18px 0",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Fade edges */}
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "120px", background: "linear-gradient(90deg,var(--surface-900),transparent)", zIndex: 1, pointerEvents: "none" }} />
      <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "120px", background: "linear-gradient(-90deg,var(--surface-900),transparent)", zIndex: 1, pointerEvents: "none" }} />

      <div style={{ display: "flex", animation: "marquee 28s linear infinite" }}>
        {doubled.map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
            <span
              style={{
                fontSize: "12px",
                fontWeight: 600,
                color: "var(--text-secondary)",
                paddingLeft: "28px",
                paddingRight: "4px",
                letterSpacing: "0.03em",
                whiteSpace: "nowrap",
              }}
            >
              {item}
            </span>
            <span
              style={{
                width: "4px",
                height: "4px",
                borderRadius: "50%",
                background: i % 3 === 0 ? "#818cf8" : i % 3 === 1 ? "#fb7185" : "#a78bfa",
                flexShrink: 0,
                opacity: 0.55,
                marginLeft: "24px",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Tilt card ─────────────────────────────────────────────────────────────────

function TiltCard({ children, style = {} }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const el = ref.current;
    const r  = el.getBoundingClientRect();
    const rx = ((e.clientY - r.top  - r.height / 2) / r.height) * -10;
    const ry = ((e.clientX - r.left - r.width  / 2) / r.width ) *  10;
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(10px)`;
  };
  const onLeave = () => {
    ref.current.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
  };
  return (
    <div
      ref={ref}
      style={{ ...style, transformStyle: "preserve-3d", transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)" }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </div>
  );
}

// ── Scroll reveal ─────────────────────────────────────────────────────────────

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    const io  = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("revealed");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.07, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

// ── Bento card extras ─────────────────────────────────────────────────────────

function DialogueMini() {
  return (
    <div style={{ marginTop: "22px", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "18px" }}>
      <div style={{ background: "rgba(251,113,133,0.08)", border: "1px solid rgba(251,113,133,0.14)", borderRadius: "8px", padding: "9px 12px", fontSize: "12px", color: "var(--text-secondary)", marginBottom: "8px", lineHeight: 1.5 }}>
        "I need to speak with your manager right now..."
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <div style={{ background: "rgba(129,140,248,0.1)", border: "1px solid rgba(129,140,248,0.26)", borderRadius: "8px", padding: "7px 10px", fontSize: "11px", color: "#a5b4fc", display: "flex", gap: "7px", alignItems: "center" }}>
          <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#818cf8", flexShrink: 0 }} />
          Stay calm and listen actively
        </div>
        <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "8px", padding: "7px 10px", fontSize: "11px", color: "var(--text-tertiary)", display: "flex", gap: "7px", alignItems: "center" }}>
          <div style={{ width: "6px", height: "6px", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.2)", flexShrink: 0 }} />
          Explain store policy immediately
        </div>
      </div>
    </div>
  );
}

function SignalBarsMini() {
  return (
    <div style={{ marginTop: "22px", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "18px", display: "flex", flexDirection: "column", gap: "10px" }}>
      {[
        { label: "Curiosity",  val: 82, color: "#fbbf24" },
        { label: "Inclusion",  val: 71, color: "#818cf8" },
        { label: "Clarity",    val: 90, color: "#34d399" },
      ].map(b => (
        <div key={b.label} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "11px", color: "var(--text-tertiary)", width: "60px", flexShrink: 0 }}>{b.label}</span>
          <div style={{ flex: 1, height: "4px", background: "rgba(255,255,255,0.06)", borderRadius: "9999px", overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${b.val}%`, background: b.color, borderRadius: "9999px", boxShadow: `0 0 8px ${b.color}60` }} />
          </div>
          <span style={{ fontSize: "11px", fontWeight: 700, color: b.color, width: "28px", textAlign: "right", fontFamily: "monospace" }}>{b.val}%</span>
        </div>
      ))}
    </div>
  );
}

function ReflectionMini() {
  return (
    <div style={{ marginTop: "22px", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "18px" }}>
      <div style={{ background: "rgba(251,113,133,0.06)", border: "1px solid rgba(251,113,133,0.12)", borderRadius: "10px", padding: "12px" }}>
        <p style={{ fontSize: "10px", color: "var(--text-tertiary)", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.06em" }}>Reflection note</p>
        <p style={{ fontSize: "12px", color: "var(--text-secondary)", lineHeight: 1.6, fontStyle: "italic" }}>
          "When I swapped roles, I realised how much small dismissals compound over time..."
        </p>
        <div style={{ display: "flex", gap: "6px", marginTop: "10px" }}>
          {["Empathy", "Active Listening"].map(tag => (
            <span key={tag} style={{ padding: "3px 8px", borderRadius: "9999px", background: "rgba(251,113,133,0.1)", border: "1px solid rgba(251,113,133,0.2)", fontSize: "9px", fontWeight: 700, color: "#fb7185", textTransform: "uppercase", letterSpacing: "0.06em" }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Home ──────────────────────────────────────────────────────────────────────

export default function Home() {
  useReveal();

  return (
    <>
      <ThreeBackground />

      <div style={{ position: "relative", zIndex: 10 }}>

        {/* ══ HERO ══════════════════════════════════════════════════════════ */}
        <section style={{ minHeight: "100vh", padding: "0 40px", position: "relative", display: "flex", alignItems: "center" }}>
          {/* Large background glow */}
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 60% at 60% 50%, rgba(129,140,248,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

          <div className="hero-grid" style={{ maxWidth: "1280px", margin: "0 auto", width: "100%", paddingTop: "100px", paddingBottom: "80px" }}>

            {/* ── Left column ── */}
            <div>
              {/* Badge */}
              <div
                className="animate-fade-in-up"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "8px",
                  padding: "6px 16px", borderRadius: "9999px",
                  background: "linear-gradient(135deg,rgba(129,140,248,0.12),rgba(251,113,133,0.08))",
                  border: "1px solid rgba(129,140,248,0.24)",
                  backdropFilter: "blur(12px)",
                  marginBottom: "28px",
                }}
              >
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#818cf8", boxShadow: "0 0 8px #818cf8", display: "inline-block", animation: "pulse-glow 2.4s ease-in-out infinite" }} />
                <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#818cf8" }}>
                  Empathy training platform
                </span>
              </div>

              {/* Headline */}
              <h1
                className="animate-fade-in-up"
                style={{
                  fontSize: "clamp(3rem,5.5vw,5.2rem)",
                  fontWeight: 900,
                  letterSpacing: "-0.045em",
                  lineHeight: 1.02,
                  marginBottom: "24px",
                  animationDelay: "60ms",
                }}
              >
                <span style={{ color: "var(--text-primary)" }}>Build empathy</span>
                <br />
                <span style={{ color: "var(--text-primary)" }}>that changes</span>
                <br />
                <span style={{ background: "linear-gradient(135deg,#a78bfa 0%,#fb7185 55%,#fbbf24 100%)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  how teams connect.
                </span>
              </h1>

              {/* Sub */}
              <p
                className="animate-fade-in-up"
                style={{
                  fontSize: "clamp(1rem,1.6vw,1.15rem)",
                  color: "var(--text-secondary)",
                  lineHeight: 1.75,
                  maxWidth: "480px",
                  marginBottom: "40px",
                  animationDelay: "120ms",
                }}
              >
                Step into real-world scenarios designed to build cultural intelligence and
                measurable empathy. Practice both sides. Track what shifts.
              </p>

              {/* CTAs */}
              <div className="animate-fade-in-up" style={{ display: "flex", gap: "14px", flexWrap: "wrap", marginBottom: "48px", animationDelay: "180ms" }}>
                <Link to="/workspace/scenario" className="btn-gradient" style={{ fontSize: "15px", padding: "14px 32px" }}>
                  Start practicing
                  <ArrowRight size={17} />
                </Link>
                <Link to="/workspace/dashboard" className="btn-secondary" style={{ fontSize: "14px", padding: "14px 28px" }}>
                  View dashboard
                </Link>
              </div>

              {/* Mini stats row */}
              <div
                className="animate-fade-in-up"
                style={{
                  display: "flex",
                  gap: "28px",
                  animationDelay: "240ms",
                  paddingTop: "24px",
                  borderTop: "1px solid var(--glass-border)",
                  flexWrap: "wrap",
                }}
              >
                {[
                  { val: "3+",   label: "Scenario types" },
                  { val: "6",    label: "Behaviour signals" },
                  { val: "100%", label: "Real-time" },
                ].map(s => (
                  <div key={s.label}>
                    <span style={{ fontSize: "22px", fontWeight: 900, color: "#818cf8", fontFamily: "monospace", letterSpacing: "-0.04em" }}>{s.val}</span>
                    <span style={{ fontSize: "12px", color: "var(--text-tertiary)", marginLeft: "6px", fontWeight: 500 }}>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right column — product mockup ── */}
            <div
              className="animate-fade-in-up hero-mockup"
              style={{ animationDelay: "320ms", display: "flex", justifyContent: "center", alignItems: "center" }}
            >
              <div style={{ width: "100%", maxWidth: "460px", padding: "30px 50px 30px 20px", position: "relative" }}>
                <ProductMockup />
              </div>
            </div>

          </div>

          {/* Scroll indicator */}
          <div
            style={{
              position: "absolute", bottom: "32px", left: "50%", transform: "translateX(-50%)",
              display: "flex", flexDirection: "column", alignItems: "center", gap: "8px",
            }}
          >
            <span style={{ fontSize: "9px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--text-tertiary)" }}>Scroll</span>
            <div style={{ width: "1px", height: "40px", background: "linear-gradient(to bottom, rgba(129,140,248,0.5), transparent)", animation: "float 2.2s ease-in-out infinite" }} />
          </div>
        </section>

        {/* ══ MARQUEE ═══════════════════════════════════════════════════════ */}
        <MarqueeStrip />

        {/* ══ FEATURES BENTO ════════════════════════════════════════════════ */}
        <section style={{ padding: "120px 40px", maxWidth: "1280px", margin: "0 auto" }}>
          <div data-reveal style={{ marginBottom: "64px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", padding: "5px 14px", borderRadius: "9999px", background: "rgba(129,140,248,0.08)", border: "1px solid rgba(129,140,248,0.16)", marginBottom: "16px" }}>
              <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#818cf8" }}>
                What you can do
              </span>
            </div>
            <h2 style={{ fontSize: "clamp(2rem,3.8vw,3rem)", fontWeight: 900, letterSpacing: "-0.03em", color: "var(--text-primary)", maxWidth: "520px", lineHeight: 1.15 }}>
              Everything you need to practise{" "}
              <span style={{ background: "linear-gradient(135deg,#818cf8,#fb7185)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                empathy at scale
              </span>
            </h2>
          </div>

          {/* Bento grid */}
          <div className="bento-grid">
            {features.map((f, i) => {
              const Icon = f.icon;
              const isLarge = f.span === 2;
              return (
                <div
                  key={f.title}
                  data-reveal
                  className={isLarge ? "bento-span-2" : ""}
                  style={{ transitionDelay: `${i * 55}ms` }}
                >
                  <TiltCard
                    style={{
                      height: "100%",
                      background: "linear-gradient(135deg,rgba(13,11,26,0.55),rgba(19,17,40,0.45))",
                      backdropFilter: "blur(20px) saturate(180%)",
                      WebkitBackdropFilter: "blur(20px) saturate(180%)",
                      borderRadius: "20px",
                      padding: "28px",
                      border: "1px solid rgba(255,255,255,0.07)",
                      position: "relative",
                      overflow: "hidden",
                      boxShadow: "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
                    }}
                  >
                    {/* Ghost number */}
                    <span style={{ position: "absolute", top: "-14px", right: "18px", fontSize: "88px", fontWeight: 900, fontFamily: "monospace", color: f.accent, opacity: 0.07, lineHeight: 1, letterSpacing: "-0.06em", userSelect: "none", pointerEvents: "none" }}>
                      {f.num}
                    </span>
                    {/* Top accent line */}
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: `linear-gradient(90deg, transparent, ${f.accent}45, transparent)` }} />

                    {/* Icon */}
                    <div style={{ width: "46px", height: "46px", borderRadius: "13px", display: "flex", alignItems: "center", justifyContent: "center", background: `${f.accent}14`, border: `1px solid ${f.accent}28`, marginBottom: "18px", boxShadow: `0 0 20px ${f.accent}15` }}>
                      <Icon size={20} color={f.accent} />
                    </div>

                    <h3 style={{ fontSize: "16px", fontWeight: 800, color: "var(--text-primary)", marginBottom: "9px", letterSpacing: "-0.02em" }}>
                      {f.title}
                    </h3>
                    <p style={{ fontSize: "13.5px", color: "var(--text-secondary)", lineHeight: 1.7 }}>
                      {f.description}
                    </p>

                    {/* Mini visuals for large cards */}
                    {i === 0 && <DialogueMini />}
                    {i === 3 && <SignalBarsMini />}
                    {i === 5 && <ReflectionMini />}
                  </TiltCard>
                </div>
              );
            })}
          </div>
        </section>

        {/* ══ HOW IT WORKS ══════════════════════════════════════════════════ */}
        <section style={{ padding: "120px 40px", borderTop: "1px solid var(--glass-border)" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <div data-reveal style={{ textAlign: "center", marginBottom: "72px" }}>
              <div style={{ display: "inline-flex", alignItems: "center", padding: "5px 14px", borderRadius: "9999px", background: "rgba(251,113,133,0.08)", border: "1px solid rgba(251,113,133,0.2)", marginBottom: "16px" }}>
                <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#fb7185" }}>
                  How it works
                </span>
              </div>
              <h2 style={{ fontSize: "clamp(2rem,3.8vw,3rem)", fontWeight: 900, letterSpacing: "-0.03em", color: "var(--text-primary)" }}>
                Three steps to{" "}
                <span style={{ background: "linear-gradient(135deg,#818cf8,#fb7185)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  stronger empathy
                </span>
              </h2>
            </div>

            <div className="steps-grid">
              {steps.map((s, i) => (
                <div key={s.num} data-reveal style={{ transitionDelay: `${i * 150}ms` }} className="step-item">
                  <div style={{ background: "linear-gradient(135deg,rgba(13,11,26,0.52),rgba(19,17,40,0.42))", backdropFilter: "blur(20px) saturate(180%)", WebkitBackdropFilter: "blur(20px) saturate(180%)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "20px", padding: "32px", height: "100%", position: "relative", overflow: "hidden", boxShadow: "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)" }}>
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: `linear-gradient(90deg,transparent,${s.accent}50,transparent)` }} />
                    <div style={{ width: "60px", height: "60px", borderRadius: "50%", background: `${s.accent}15`, border: `2px solid ${s.accent}40`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "28px", boxShadow: `0 0 28px ${s.accent}20` }}>
                      <span style={{ fontSize: "13px", fontWeight: 800, fontFamily: "monospace", color: s.accent, letterSpacing: "0.05em" }}>{s.num}</span>
                    </div>
                    <div style={{ width: "44px", height: "3px", borderRadius: "9999px", background: `linear-gradient(90deg,${s.accent},transparent)`, marginBottom: "18px" }} />
                    <h3 style={{ fontSize: "20px", fontWeight: 800, color: "var(--text-primary)", marginBottom: "12px", letterSpacing: "-0.02em" }}>{s.title}</h3>
                    <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.78 }}>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ STATS ═════════════════════════════════════════════════════════ */}
        <section style={{ padding: "80px 40px", borderTop: "1px solid var(--glass-border)", borderBottom: "1px solid var(--glass-border)" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "20px" }}>
            {stats.map((s, i) => (
              <div key={s.label} data-reveal style={{ transitionDelay: `${i * 90}ms` }}>
                <div style={{ background: "linear-gradient(135deg,rgba(13,11,26,0.52),rgba(19,17,40,0.42))", backdropFilter: "blur(20px) saturate(180%)", WebkitBackdropFilter: "blur(20px) saturate(180%)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "20px", padding: "32px 24px", textAlign: "center", position: "relative", overflow: "hidden", boxShadow: "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)" }}>
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: `linear-gradient(90deg,transparent,${s.accent}60,transparent)` }} />
                  <p style={{ fontSize: "clamp(2.8rem,6vw,3.8rem)", fontWeight: 900, fontFamily: "monospace", letterSpacing: "-0.04em", background: `linear-gradient(135deg,${s.accent},${s.grad})`, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", lineHeight: 1, marginBottom: "10px" }}>
                    {s.val}
                  </p>
                  <p style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-tertiary)", fontWeight: 600 }}>
                    {s.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══ CTA ═══════════════════════════════════════════════════════════ */}
        <section style={{ padding: "140px 40px", position: "relative", overflow: "hidden" }}>
          {/* Dual radial glows */}
          <div style={{ position: "absolute", top: "0", left: "20%", width: "500px", height: "500px", borderRadius: "50%", background: "#818cf8", opacity: 0.04, filter: "blur(100px)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: "0", right: "20%", width: "400px", height: "400px", borderRadius: "50%", background: "#fb7185", opacity: 0.04, filter: "blur(100px)", pointerEvents: "none" }} />

          <div data-reveal style={{ maxWidth: "700px", margin: "0 auto", position: "relative", zIndex: 1 }}>
            <div style={{ background: "linear-gradient(135deg,rgba(13,11,26,0.6),rgba(19,17,40,0.5))", backdropFilter: "blur(28px) saturate(180%)", WebkitBackdropFilter: "blur(28px) saturate(180%)", borderRadius: "28px", padding: "clamp(48px,8vw,80px)", textAlign: "center", border: "1px solid rgba(129,140,248,0.18)", boxShadow: "0 0 0 1px rgba(251,113,133,0.06), 0 40px 80px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)", position: "relative", overflow: "hidden" }}>
              {/* Corner glows */}
              <div style={{ position: "absolute", top: "-80px", right: "-80px", width: "240px", height: "240px", borderRadius: "50%", background: "#818cf8", opacity: 0.07, filter: "blur(70px)", pointerEvents: "none" }} />
              <div style={{ position: "absolute", bottom: "-80px", left: "-80px", width: "240px", height: "240px", borderRadius: "50%", background: "#fb7185", opacity: 0.06, filter: "blur(70px)", pointerEvents: "none" }} />

              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "5px 14px", borderRadius: "9999px", background: "rgba(129,140,248,0.09)", border: "1px solid rgba(129,140,248,0.2)", marginBottom: "24px" }}>
                <Sparkles size={12} color="#818cf8" />
                <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#818cf8" }}>Start your journey</span>
              </div>

              <h2 style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 900, letterSpacing: "-0.03em", color: "var(--text-primary)", marginBottom: "16px", lineHeight: 1.15 }}>
                Ready to build empathy{" "}
                <span style={{ background: "linear-gradient(135deg,#818cf8,#fb7185)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  that lasts?
                </span>
              </h2>

              <p style={{ fontSize: "16px", color: "var(--text-secondary)", lineHeight: 1.7, maxWidth: "440px", margin: "0 auto 40px" }}>
                Start your first scenario today. Practice, measure, and improve the way your team connects.
              </p>

              <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
                <Link to="/workspace/scenario" className="btn-gradient" style={{ fontSize: "15px", padding: "14px 32px" }}>
                  Get started free
                  <ArrowRight size={18} />
                </Link>
                <Link to="/workspace/dashboard" className="btn-secondary" style={{ fontSize: "15px", padding: "14px 32px" }}>
                  Explore dashboard
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ══ FOOTER ════════════════════════════════════════════════════════ */}
        <footer style={{ borderTop: "1px solid var(--glass-border)", padding: "40px 40px" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg,rgba(129,140,248,0.15),rgba(251,113,133,0.1))", border: "1px solid rgba(129,140,248,0.2)" }}>
                <img src={logo} alt="Trading Places" style={{ width: "22px", height: "22px", objectFit: "contain", filter: "drop-shadow(0 0 4px rgba(129,140,248,0.5))" }} />
              </div>
              <span style={{ fontSize: "14px", fontWeight: 700, color: "var(--text-secondary)" }}>Trading Places</span>
            </div>
            <p style={{ fontSize: "12px", color: "var(--text-tertiary)" }}>© 2025 LSBU Prototype. Built for empathy.</p>
          </div>
        </footer>

      </div>
    </>
  );
}
