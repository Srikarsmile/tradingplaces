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

const features = [
  {
    icon: Theater,
    title: "Interactive Roleplay",
    description:
      "Step into real scenarios as both customer and manager. Choose responses and watch empathy metrics shift in real time.",
    accent: "#818cf8",
    num: "01",
  },
  {
    icon: BarChart3,
    title: "Live Metrics Dashboard",
    description:
      "Track understanding, empathy, and clarity signals across every practice session with visual analytics.",
    accent: "#fb7185",
    num: "02",
  },
  {
    icon: ClipboardCheck,
    title: "Behaviour Assessment",
    description:
      "Complete structured assessments, review flagged moments, and re-run with coaching cues to improve.",
    accent: "#34d399",
    num: "03",
  },
  {
    icon: HeartPulse,
    title: "Culture Pulse Signals",
    description:
      "Learn the three behaviours that keep teams safe: curiosity, inclusion, and clarity.",
    accent: "#fbbf24",
    num: "04",
  },
  {
    icon: FileText,
    title: "Export-Ready Reports",
    description:
      "Generate PDF reports with your scores, reflections, and improvement tips for coaching sessions.",
    accent: "#818cf8",
    num: "05",
  },
  {
    icon: Sparkles,
    title: "Guided Reflection",
    description:
      "Capture what shifted when you swapped roles. Build reusable scripts for real workplace interactions.",
    accent: "#fb7185",
    num: "06",
  },
];

const pillars = [
  { label: "Psychological safety",       color: "#818cf8" },
  { label: "Cross-cultural intelligence", color: "#fb7185" },
  { label: "Active listening practice",  color: "#a78bfa" },
  { label: "Measurable empathy metrics", color: "#34d399" },
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
  { val: "3+",       label: "Scenario types",    accent: "#818cf8", grad: "#a78bfa" },
  { val: "6",        label: "Behaviour signals",  accent: "#fb7185", grad: "#fbbf24" },
  { val: "100%",     label: "Real-time metrics",  accent: "#a78bfa", grad: "#818cf8" },
  { val: "PDF",      label: "Export format",      accent: "#34d399", grad: "#818cf8" },
];

// ── 3-D Tilt Card ─────────────────────────────────────────────────────────────

function TiltCard({ children, style = {} }) {
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    const r  = el.getBoundingClientRect();
    const rx = ((e.clientY - r.top  - r.height / 2) / r.height) * -12;
    const ry = ((e.clientX - r.left - r.width  / 2) / r.width ) *  12;
    el.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(12px)`;
  };

  const onLeave = () => {
    ref.current.style.transform =
      "perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
  };

  return (
    <div
      ref={ref}
      style={{
        ...style,
        transformStyle: "preserve-3d",
        transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)",
      }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </div>
  );
}

// ── Scroll-reveal hook ────────────────────────────────────────────────────────

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
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

// ── Home ──────────────────────────────────────────────────────────────────────

export default function Home() {
  useReveal();

  return (
    <>
      <ThreeBackground />

      {/* Content layer sits above Three.js canvas (z-0) and below Navbar (z-50) */}
      <div style={{ position: "relative", zIndex: 10 }}>

        {/* ══ HERO ══════════════════════════════════════════════════════════ */}
        <section
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "100px 24px 80px",
            position: "relative",
          }}
        >
          {/* Badge */}
          <div
            className="animate-fade-in-up"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 18px",
              borderRadius: "9999px",
              background: "linear-gradient(135deg,rgba(129,140,248,0.13),rgba(251,113,133,0.09))",
              border: "1px solid rgba(129,140,248,0.25)",
              marginBottom: "36px",
              backdropFilter: "blur(12px)",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#818cf8",
                boxShadow: "0 0 8px #818cf8",
                display: "inline-block",
                animation: "pulse-glow 2.4s ease-in-out infinite",
              }}
            />
            <span
              style={{
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#818cf8",
              }}
            >
              Empathy training platform
            </span>
          </div>

          {/* Headline */}
          <h1
            className="animate-fade-in-up"
            style={{
              fontSize: "clamp(3.2rem, 9vw, 7rem)",
              fontWeight: 900,
              letterSpacing: "-0.045em",
              lineHeight: 1.0,
              marginBottom: "28px",
              animationDelay: "60ms",
              maxWidth: "960px",
            }}
          >
            <span style={{ color: "var(--text-primary)" }}>Build&nbsp;</span>
            <span
              style={{
                background: "linear-gradient(135deg,#818cf8 0%,#fb7185 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              empathy
            </span>
            <br />
            <span style={{ color: "var(--text-primary)" }}>that changes</span>
            <br />
            <span
              style={{
                background: "linear-gradient(135deg,#a78bfa 0%,#fb7185 55%,#fbbf24 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              how teams connect
            </span>
          </h1>

          {/* Subheading */}
          <p
            className="animate-fade-in-up"
            style={{
              fontSize: "clamp(1rem,2.5vw,1.2rem)",
              color: "var(--text-secondary)",
              maxWidth: "540px",
              lineHeight: 1.75,
              marginBottom: "44px",
              animationDelay: "120ms",
            }}
          >
            Step into real-world scenarios designed to build cultural intelligence,
            awareness, and empathy. Practice as both sides. Measure what matters.
          </p>

          {/* Pillar pills */}
          <div
            className="animate-fade-in-up"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              justifyContent: "center",
              marginBottom: "52px",
              animationDelay: "180ms",
            }}
          >
            {pillars.map((p) => (
              <span
                key={p.label}
                style={{
                  padding: "7px 16px",
                  borderRadius: "9999px",
                  background: `${p.color}12`,
                  border: `1px solid ${p.color}30`,
                  color: p.color,
                  fontSize: "12px",
                  fontWeight: 600,
                  letterSpacing: "0.02em",
                  backdropFilter: "blur(10px)",
                }}
              >
                {p.label}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div
            className="animate-fade-in-up"
            style={{
              display: "flex",
              gap: "16px",
              flexWrap: "wrap",
              justifyContent: "center",
              animationDelay: "240ms",
            }}
          >
            <Link
              to="/workspace/scenario"
              className="btn-gradient"
              style={{ fontSize: "15px", padding: "14px 32px" }}
            >
              Start practicing
              <ArrowRight size={18} />
            </Link>
            <Link
              to="/workspace/dashboard"
              className="btn-secondary"
              style={{ fontSize: "15px", padding: "14px 32px" }}
            >
              View dashboard
            </Link>
          </div>

          {/* Scroll indicator */}
          <div
            className="animate-fade-in-up"
            style={{
              position: "absolute",
              bottom: "36px",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
              animationDelay: "700ms",
            }}
          >
            <span
              style={{
                fontSize: "9px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--text-tertiary)",
              }}
            >
              Scroll
            </span>
            <div
              style={{
                width: "1px",
                height: "44px",
                background: "linear-gradient(to bottom, rgba(129,140,248,0.6), transparent)",
                animation: "float 2.2s ease-in-out infinite",
              }}
            />
          </div>
        </section>

        {/* ══ MANIFESTO STRIP ═══════════════════════════════════════════════ */}
        <div
          style={{
            borderTop: "1px solid var(--glass-border)",
            borderBottom: "1px solid var(--glass-border)",
            background: "linear-gradient(90deg,rgba(7,6,15,0.7),rgba(19,17,40,0.5),rgba(7,6,15,0.7))",
            backdropFilter: "blur(20px)",
            padding: "48px 24px",
            textAlign: "center",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              width: "500px",
              height: "200px",
              background: "radial-gradient(ellipse,rgba(129,140,248,0.08) 0%,transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <p
            data-reveal
            style={{
              fontSize: "clamp(1.1rem,3vw,1.6rem)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: "var(--text-secondary)",
              maxWidth: "700px",
              margin: "0 auto",
              lineHeight: 1.5,
            }}
          >
            Every interaction is a chance to{" "}
            <span
              style={{
                background: "linear-gradient(135deg,#818cf8,#fb7185)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: 900,
              }}
            >
              truly connect
            </span>
            . Trading Places gives you the space to practice that.
          </p>
        </div>

        {/* ══ FEATURES ══════════════════════════════════════════════════════ */}
        <section style={{ padding: "128px 32px", maxWidth: "1280px", margin: "0 auto" }}>
          {/* Label + heading */}
          <div data-reveal style={{ marginBottom: "72px" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "5px 14px",
                borderRadius: "9999px",
                background: "rgba(129,140,248,0.08)",
                border: "1px solid rgba(129,140,248,0.16)",
                marginBottom: "16px",
              }}
            >
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#818cf8",
                }}
              >
                What you can do
              </span>
            </div>
            <h2
              style={{
                fontSize: "clamp(2rem,4vw,3rem)",
                fontWeight: 900,
                letterSpacing: "-0.03em",
                color: "var(--text-primary)",
                maxWidth: "560px",
                lineHeight: 1.15,
              }}
            >
              Everything you need to practise{" "}
              <span
                style={{
                  background: "linear-gradient(135deg,#818cf8,#fb7185)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                empathy at scale
              </span>
            </h2>
          </div>

          {/* Card grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))",
              gap: "20px",
            }}
          >
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  data-reveal
                  style={{ transitionDelay: `${i * 70}ms` }}
                >
                  <TiltCard
                    style={{
                      height: "100%",
                      background:
                        "linear-gradient(135deg,rgba(13,11,26,0.52),rgba(19,17,40,0.42))",
                      backdropFilter: "blur(20px) saturate(180%)",
                      WebkitBackdropFilter: "blur(20px) saturate(180%)",
                      borderRadius: "20px",
                      padding: "32px",
                      border: "1px solid rgba(255,255,255,0.08)",
                      position: "relative",
                      overflow: "hidden",
                      boxShadow: "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
                    }}
                  >
                    {/* Ghost number */}
                    <span
                      style={{
                        position: "absolute",
                        top: "-14px",
                        right: "18px",
                        fontSize: "96px",
                        fontWeight: 900,
                        fontFamily: "monospace",
                        color: f.accent,
                        opacity: 0.07,
                        lineHeight: 1,
                        letterSpacing: "-0.06em",
                        userSelect: "none",
                        pointerEvents: "none",
                      }}
                    >
                      {f.num}
                    </span>

                    {/* Subtle inner glow */}
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "1px",
                        background: `linear-gradient(90deg, transparent, ${f.accent}40, transparent)`,
                      }}
                    />

                    {/* Icon */}
                    <div
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "14px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: `${f.accent}14`,
                        border: `1px solid ${f.accent}28`,
                        marginBottom: "20px",
                        boxShadow: `0 0 24px ${f.accent}18`,
                      }}
                    >
                      <Icon size={22} color={f.accent} />
                    </div>

                    <h3
                      style={{
                        fontSize: "17px",
                        fontWeight: 800,
                        color: "var(--text-primary)",
                        marginBottom: "10px",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {f.title}
                    </h3>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "var(--text-secondary)",
                        lineHeight: 1.72,
                      }}
                    >
                      {f.description}
                    </p>
                  </TiltCard>
                </div>
              );
            })}
          </div>
        </section>

        {/* ══ HOW IT WORKS ══════════════════════════════════════════════════ */}
        <section
          style={{
            padding: "120px 32px",
            borderTop: "1px solid var(--glass-border)",
          }}
        >
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            {/* Header */}
            <div
              data-reveal
              style={{ textAlign: "center", marginBottom: "80px" }}
            >
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "5px 14px",
                  borderRadius: "9999px",
                  background: "rgba(251,113,133,0.08)",
                  border: "1px solid rgba(251,113,133,0.2)",
                  marginBottom: "16px",
                }}
              >
                <span
                  style={{
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "#fb7185",
                  }}
                >
                  How it works
                </span>
              </div>
              <h2
                style={{
                  fontSize: "clamp(2rem,4vw,3rem)",
                  fontWeight: 900,
                  letterSpacing: "-0.03em",
                  color: "var(--text-primary)",
                }}
              >
                Three steps to{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg,#818cf8,#fb7185)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  stronger empathy
                </span>
              </h2>
            </div>

            {/* Steps */}
            <div className="steps-grid">
              {steps.map((s, i) => (
                <div
                  key={s.num}
                  data-reveal
                  style={{ transitionDelay: `${i * 150}ms` }}
                  className="step-item"
                >
                  {/* Glass card wrapper */}
                  <div
                    style={{
                      background: "linear-gradient(135deg,rgba(13,11,26,0.52),rgba(19,17,40,0.42))",
                      backdropFilter: "blur(20px) saturate(180%)",
                      WebkitBackdropFilter: "blur(20px) saturate(180%)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "20px",
                      padding: "32px",
                      height: "100%",
                      position: "relative",
                      overflow: "hidden",
                      boxShadow: "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
                    }}
                  >
                  {/* Top accent glow line */}
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: `linear-gradient(90deg,transparent,${s.accent}50,transparent)` }} />
                  {/* Circle */}
                  <div
                    style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "50%",
                      background: `${s.accent}15`,
                      border: `2px solid ${s.accent}40`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "28px",
                      boxShadow: `0 0 28px ${s.accent}20`,
                    }}
                  >
                    <span
                      style={{
                        fontSize: "13px",
                        fontWeight: 800,
                        fontFamily: "monospace",
                        color: s.accent,
                        letterSpacing: "0.05em",
                      }}
                    >
                      {s.num}
                    </span>
                  </div>

                  {/* Accent bar */}
                  <div
                    style={{
                      width: "44px",
                      height: "3px",
                      borderRadius: "9999px",
                      background: `linear-gradient(90deg,${s.accent},transparent)`,
                      marginBottom: "18px",
                    }}
                  />

                  <h3
                    style={{
                      fontSize: "20px",
                      fontWeight: 800,
                      color: "var(--text-primary)",
                      marginBottom: "12px",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {s.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "var(--text-secondary)",
                      lineHeight: 1.78,
                    }}
                  >
                    {s.desc}
                  </p>
                  </div>{/* end glass wrapper */}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ STATS ═════════════════════════════════════════════════════════ */}
        <section
          style={{
            padding: "80px 32px",
            borderTop: "1px solid var(--glass-border)",
            borderBottom: "1px solid var(--glass-border)",
          }}
        >
          <div
            style={{
              maxWidth: "1280px",
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
              gap: "20px",
            }}
          >
            {stats.map((s, i) => (
              <div
                key={s.label}
                data-reveal
                style={{ transitionDelay: `${i * 90}ms` }}
              >
                {/* Glass stat card */}
                <div
                  style={{
                    background: "linear-gradient(135deg,rgba(13,11,26,0.52),rgba(19,17,40,0.42))",
                    backdropFilter: "blur(20px) saturate(180%)",
                    WebkitBackdropFilter: "blur(20px) saturate(180%)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "20px",
                    padding: "32px 24px",
                    textAlign: "center",
                    position: "relative",
                    overflow: "hidden",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
                  }}
                >
                  {/* Top accent line */}
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: `linear-gradient(90deg,transparent,${s.accent}60,transparent)` }} />
                  <p
                    style={{
                      fontSize: "clamp(2.8rem,6vw,3.8rem)",
                      fontWeight: 900,
                      fontFamily: "monospace",
                      letterSpacing: "-0.04em",
                      background: `linear-gradient(135deg,${s.accent},${s.grad})`,
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      lineHeight: 1,
                      marginBottom: "10px",
                    }}
                  >
                    {s.val}
                  </p>
                  <p
                    style={{
                      fontSize: "11px",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      color: "var(--text-tertiary)",
                      fontWeight: 600,
                    }}
                  >
                    {s.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══ CTA ═══════════════════════════════════════════════════════════ */}
        <section
          style={{
            padding: "140px 32px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Background radial glow */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse at 50% 50%,rgba(129,140,248,0.07) 0%,rgba(251,113,133,0.04) 40%,transparent 70%)",
              pointerEvents: "none",
            }}
          />

          <div
            data-reveal
            style={{ maxWidth: "700px", margin: "0 auto", position: "relative", zIndex: 1 }}
          >
            <div
              style={{
                background:
                  "linear-gradient(135deg,rgba(13,11,26,0.55),rgba(19,17,40,0.45))",
                backdropFilter: "blur(28px) saturate(180%)",
                WebkitBackdropFilter: "blur(28px) saturate(180%)",
                borderRadius: "28px",
                padding: "clamp(48px,8vw,80px)",
                textAlign: "center",
                border: "1px solid rgba(129,140,248,0.18)",
                boxShadow:
                  "0 0 0 1px rgba(251,113,133,0.06), 0 40px 80px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Card inner glows */}
              <div
                style={{
                  position: "absolute",
                  top: "-80px",
                  right: "-80px",
                  width: "240px",
                  height: "240px",
                  borderRadius: "50%",
                  background: "#818cf8",
                  opacity: 0.07,
                  filter: "blur(70px)",
                  pointerEvents: "none",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "-80px",
                  left: "-80px",
                  width: "240px",
                  height: "240px",
                  borderRadius: "50%",
                  background: "#fb7185",
                  opacity: 0.06,
                  filter: "blur(70px)",
                  pointerEvents: "none",
                }}
              />

              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "5px 14px",
                  borderRadius: "9999px",
                  background: "rgba(129,140,248,0.09)",
                  border: "1px solid rgba(129,140,248,0.2)",
                  marginBottom: "24px",
                }}
              >
                <Sparkles size={12} color="#818cf8" />
                <span
                  style={{
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#818cf8",
                  }}
                >
                  Start your journey
                </span>
              </div>

              <h2
                style={{
                  fontSize: "clamp(1.8rem,4vw,2.8rem)",
                  fontWeight: 900,
                  letterSpacing: "-0.03em",
                  color: "var(--text-primary)",
                  marginBottom: "16px",
                  lineHeight: 1.15,
                }}
              >
                Ready to build empathy{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg,#818cf8,#fb7185)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  that lasts?
                </span>
              </h2>

              <p
                style={{
                  fontSize: "16px",
                  color: "var(--text-secondary)",
                  lineHeight: 1.7,
                  maxWidth: "440px",
                  margin: "0 auto 40px",
                }}
              >
                Start your first scenario today. Practice, measure, and improve
                the way your team connects.
              </p>

              <div
                style={{
                  display: "flex",
                  gap: "16px",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <Link
                  to="/workspace/scenario"
                  className="btn-gradient"
                  style={{ fontSize: "15px", padding: "14px 32px" }}
                >
                  Get started free
                  <ArrowRight size={18} />
                </Link>
                <Link
                  to="/workspace/dashboard"
                  className="btn-secondary"
                  style={{ fontSize: "15px", padding: "14px 32px" }}
                >
                  Explore dashboard
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ══ FOOTER ════════════════════════════════════════════════════════ */}
        <footer
          style={{
            borderTop: "1px solid var(--glass-border)",
            padding: "40px 32px",
          }}
        >
          <div
            style={{
              maxWidth: "1280px",
              margin: "0 auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background:
                    "linear-gradient(135deg,rgba(129,140,248,0.15),rgba(251,113,133,0.1))",
                  border: "1px solid rgba(129,140,248,0.2)",
                }}
              >
                <img
                  src={logo}
                  alt="Trading Places"
                  style={{
                    width: "22px",
                    height: "22px",
                    objectFit: "contain",
                    filter: "drop-shadow(0 0 4px rgba(129,140,248,0.5))",
                  }}
                />
              </div>
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "var(--text-secondary)",
                }}
              >
                Trading Places
              </span>
            </div>
            <p style={{ fontSize: "12px", color: "var(--text-tertiary)" }}>
              © 2025 LSBU Prototype. Built for empathy.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
