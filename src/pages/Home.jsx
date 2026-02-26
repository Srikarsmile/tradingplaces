import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Theater, BarChart3, ClipboardCheck, HeartPulse, FileText, Sparkles } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import MagneticButton from "../components/MagneticButton";
import ParticleStarfield from "../components/ParticleStarfield";
import logo from "../assets/trading-places-simulator-1.png";

const features = [
  {
    icon: Theater,
    title: "Experiential Roleplay",
    description: "Immerse yourself in deeply simulated scenarios. Choose responses and observe psychological metrics shift in real time.",
    accent: "var(--accent-primary)",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Map your cognitive evolution with detailed charts tracking understanding, empathy, and clarity across sessions.",
    accent: "var(--accent-secondary)",
  },
  {
    icon: ClipboardCheck,
    title: "Behavioural Calibration",
    description: "Undergo rigorous diagnostic assessments. Review flagged interactions and run micro-simulations to correct biases.",
    accent: "var(--accent-tertiary)",
  },
  {
    icon: HeartPulse,
    title: "Culture Pulse Vectors",
    description: "Master the trinity of psychological safety: unbridled curiosity, radical inclusion, and absolute clarity.",
    accent: "var(--accent-primary-dim)",
  },
  {
    icon: FileText,
    title: "Executive Reports",
    description: "Export beautifully formatted PDF dossiers containing your scores, reflections, and actionable communication strategies.",
    accent: "var(--accent-primary)",
  },
  {
    icon: Sparkles,
    title: "Guided Synthesis",
    description: "Document the paradigm shifts when you switch perspectives. Architect reusable dialogue frameworks for the real world.",
    accent: "var(--accent-secondary)",
  },
];

const stats = [
  { value: "3+", label: "Scenarios", desc: "Immersive roleplay modules", icon: Theater, color: "from-[var(--accent-primary)] to-orange-300" },
  { value: "6", label: "Signals", desc: "Behavioural diagnostics", icon: BarChart3, color: "from-[var(--accent-secondary)] to-purple-300" },
  { value: "Live", label: "Telemetry", desc: "Real-time empathy feed", icon: HeartPulse, color: "from-[var(--accent-tertiary)] to-cyan-300" },
  { value: "PDF", label: "Export", desc: "Executive-ready reports", icon: FileText, color: "from-[var(--accent-primary)] to-[var(--accent-secondary)]" },
];

// Staggered word-by-word reveal animation
const wordReveal = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.4,
    },
  },
};

const wordChild = {
  hidden: { opacity: 0, y: 60, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

export default function Home() {
  const { scrollY } = useScroll();
  const statsY = useTransform(scrollY, [200, 800], [60, 0]);
  const statsOpacity = useTransform(scrollY, [200, 600], [0.3, 1]);
  const featuresY = useTransform(scrollY, [600, 1400], [80, 0]);

  return (
    <div className="bg-[var(--surface-900)] min-h-screen relative overflow-hidden font-sans text-[var(--text-primary)]">
      {/* ──────── ANIMATED GRADIENT BACKGROUND ──────── */}
      <div className="hero-gradient-bg" />

      {/* ──────── PARTICLE STARFIELD ──────── */}
      <ParticleStarfield />

      {/* ──────── FOREGROUND CONTENT ──────── */}
      <div className="relative z-10">

        {/* ──────── HERO ──────── */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32">
          {/* Background glow orbs */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-[25%] left-[20%] w-[320px] h-[320px] bg-[var(--accent-primary)] rounded-full blur-[120px] opacity-[0.08]" />
            <div className="absolute bottom-[15%] right-[20%] w-[280px] h-[280px] bg-[var(--accent-secondary)] rounded-full blur-[120px] opacity-[0.07]" />
          </div>

          <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--surface-800)]/50 border border-[var(--glass-border)] mb-10 backdrop-blur-xl"
            >
              <span className="h-2 w-2 rounded-full bg-[var(--accent-primary)] shadow-[0_0_12px_var(--accent-primary-glow)] animate-pulse" />
              <span className="text-xs font-bold text-[var(--text-secondary)] tracking-[0.15em] uppercase">
                Empathy Intelligence Platform
              </span>
            </motion.div>

            {/* Main headline — cinematic word-by-word reveal */}
            <motion.h1
              variants={wordReveal}
              initial="hidden"
              animate="visible"
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[6.5rem] font-black tracking-tight leading-[1.05] uppercase"
            >
              <motion.span variants={wordChild} className="inline-block text-[var(--text-primary)] mr-4">Where</motion.span>
              <motion.span variants={wordChild} className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-primary)] via-[var(--accent-secondary)] to-[var(--accent-tertiary)]">
                perspective
              </motion.span>
              <br />
              <motion.span variants={wordChild} className="inline-block text-[var(--text-primary)] mr-4">becomes</motion.span>
              <motion.span variants={wordChild} className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-secondary)] to-[var(--accent-primary)]">
                power.
              </motion.span>
            </motion.h1>

            {/* Glowing shimmer accent line */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.8, ease: "easeOut" }}
              className="mx-auto mt-6 h-[2px] w-48 origin-center animate-shimmer"
              style={{
                background: 'linear-gradient(90deg, transparent, var(--accent-primary), var(--accent-secondary), transparent)',
              }}
            />

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.8 }}
              className="text-lg md:text-xl text-[var(--text-secondary)] mt-8 max-w-2xl mx-auto leading-relaxed font-medium"
            >
              Step into immersive simulations that build cognitive flexibility,
              cultural intelligence, and the kind of empathy that changes everything.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 mt-12 justify-center relative z-20"
            >
              <MagneticButton>
                <Link
                  to="/workspace/scenario"
                  className="inline-flex items-center justify-center gap-3 px-10 py-4 rounded-full bg-[var(--accent-primary)] text-[var(--text-inverse)] font-bold text-[15px] shadow-[var(--shadow-glow-primary)] hover:shadow-[0_0_60px_var(--accent-primary-glow)] transition-shadow duration-500 uppercase"
                >
                  Start Simulation
                  <ArrowRight size={18} />
                </Link>
              </MagneticButton>
              <MagneticButton>
                <Link
                  to="/workspace/dashboard"
                  className="inline-flex items-center justify-center px-10 py-4 rounded-full bg-[var(--surface-800)]/50 backdrop-blur-md border border-[var(--glass-border)] text-[var(--text-primary)] font-bold text-[15px] hover:bg-[var(--surface-700)]/80 transition-colors duration-300 uppercase"
                >
                  View Dashboard
                </Link>
              </MagneticButton>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.0, duration: 1 }}
              className="mt-14 flex flex-col items-center gap-2"
            >
              <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--text-tertiary)] font-bold">Scroll</span>
              <div className="w-5 h-8 rounded-full border border-[var(--surface-600)] flex items-start justify-center p-1.5">
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="w-1 h-1 rounded-full bg-[var(--accent-primary)]"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* ──────── STATS BAR ──────── */}
        <motion.section style={{ y: statsY, opacity: statsOpacity }} className="relative py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              {stats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, type: "spring", stiffness: 100 }}
                    className="relative group bg-[var(--surface-800)] border border-[var(--glass-border)] rounded-2xl p-6 hover:border-[var(--surface-500)] transition-colors duration-500 overflow-hidden"
                  >
                    {/* Gradient top accent line */}
                    <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${stat.color} opacity-60 group-hover:opacity-100 transition-opacity duration-500`} />
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-[var(--surface-700)]/50 border border-[var(--glass-border)] flex items-center justify-center">
                        <Icon size={18} className="text-[var(--text-tertiary)] group-hover:text-[var(--text-primary)] transition-colors" />
                      </div>
                      <p className="text-3xl md:text-4xl font-black font-mono text-[var(--text-primary)] tracking-tighter">
                        {stat.value}
                      </p>
                    </div>
                    <p className="text-xs uppercase tracking-[0.15em] text-[var(--text-primary)] font-bold">{stat.label}</p>
                    <p className="text-[11px] text-[var(--text-tertiary)] mt-1 font-medium">{stat.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.section>

        {/* ──────── FEATURES GRID ──────── */}
        <section className="py-24 lg:py-40 relative">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ y: featuresY }}
              className="max-w-3xl mb-20"
            >
              <p className="text-xs font-bold text-[var(--accent-primary)] uppercase tracking-[0.15em] mb-4">
                System Capabilities
              </p>
              <h2 className="text-4xl lg:text-6xl font-black tracking-tight text-[var(--text-primary)] leading-[1.1] uppercase">
                Architect empathy at pristine, global scale.
              </h2>
              <p className="text-[var(--text-secondary)] mt-6 text-xl leading-relaxed font-medium">
                Our suite provides the analytical rigor and immersive environments necessary
                to quantify, measure, and profoundly elevate emotional intelligence across teams.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    key={feature.title}
                    className="p-10 group bg-[var(--surface-800)] border border-[var(--surface-700)] hover:border-[var(--accent-primary)] shadow-sm hover:shadow-[0_0_15px_rgba(193,255,18,0.15)] transition-[border-color,box-shadow] duration-500 rounded-3xl"
                  >
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3 bg-[var(--surface-800)] border border-[var(--surface-600)]"
                    >
                      <Icon size={26} className="text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors" />
                    </div>
                    <h3 className="text-xl font-bold text-[var(--text-primary)] mb-4 tracking-tight uppercase">
                      {feature.title}
                    </h3>
                    <p className="text-[15px] text-[var(--text-secondary)] leading-relaxed font-medium">
                      {feature.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ──────── CTA SECTION ──────── */}
        <section className="py-20 lg:py-28 border-t border-[var(--surface-700)] relative">
          <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl lg:text-6xl font-black tracking-tight text-[var(--text-primary)] uppercase"
            >
              Ready to <span className="text-[var(--accent-primary)]">begin?</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-[var(--text-secondary)] mt-6 leading-relaxed font-medium"
            >
              Start your first simulation and see how perspective shifts everything.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex justify-center mt-10"
            >
              <Link
                to="/workspace/scenario"
                className="inline-flex items-center justify-center gap-3 px-10 py-4 rounded-full bg-[var(--accent-primary)] text-[var(--surface-900)] font-bold text-[15px] shadow-[var(--shadow-glow-primary)] hover:shadow-[0_0_60px_var(--accent-primary-glow)] transition-shadow duration-500 uppercase"
              >
                Launch Platform
                <ArrowRight size={20} />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ──────── FOOTER ──────── */}
        <footer className="border-t border-[var(--surface-700)] py-12 relative z-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-[var(--surface-800)] border border-[var(--surface-600)] rounded-xl shadow-sm">
                <img src={logo} alt="Trading Places" className="w-6 h-6 object-contain grayscale opacity-80" />
              </div>
              <span className="text-[13px] font-bold tracking-[0.15em] uppercase text-[var(--text-tertiary)]">Trading Places</span>
            </div>
            <p className="text-[11px] tracking-[0.15em] uppercase text-[var(--text-tertiary)] font-bold">
              © {new Date().getFullYear()} Advanced Empathy Systems
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
