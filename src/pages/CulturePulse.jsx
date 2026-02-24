import { Search, Users, Target } from "lucide-react";

export default function CulturePulse() {
  const signals = [
    {
      title: "Curiosity",
      description: "Ask for context before assuming intent.",
      icon: Search,
      accent: "var(--accent-cyan)",
    },
    {
      title: "Inclusion",
      description: "Invite quieter voices to share perspectives.",
      icon: Users,
      accent: "var(--accent-pink)",
    },
    {
      title: "Clarity",
      description: "State next steps and timelines out loud.",
      icon: Target,
      accent: "var(--accent-emerald)",
    },
  ];

  return (
    <div className="max-w-4xl space-y-6 animate-fade-in">
      <div>
        <p className="text-xs font-semibold text-[var(--accent-cyan)] uppercase tracking-[0.08em]">
          Culture pulse
        </p>
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[var(--text-primary)]">
          Understanding Culture Pulse
        </h1>
        <p className="text-[var(--text-secondary)] mt-2">
          Track the behaviors that keep teams psychologically safe. Use these signals
          alongside your scenarios.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4 stagger-children">
        {signals.map((signal) => {
          const Icon = signal.icon;
          return (
            <div
              key={signal.title}
              className="glass-card-elevated p-5"
              style={{ borderTop: `3px solid ${signal.accent}` }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                style={{ backgroundColor: `${signal.accent}15` }}
              >
                <Icon size={20} style={{ color: signal.accent }} />
              </div>
              <h3 className="text-lg font-bold text-[var(--text-primary)]">{signal.title}</h3>
              <p className="text-sm text-[var(--text-secondary)] mt-2">{signal.description}</p>
            </div>
          );
        })}
      </div>

      <div className="glass-card-elevated p-5 space-y-3 border-l-[3px] border-l-[var(--accent-cyan)]">
        <h3 className="text-lg font-semibold text-[var(--text-primary)]">
          How to use this
        </h3>
        <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
          <li className="flex items-start gap-2">
            <span className="text-[var(--accent-cyan)] mt-0.5">→</span>
            <span>Before a scenario, pick one signal to emphasize.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--accent-pink)] mt-0.5">→</span>
            <span>During dialogue, note phrases that raise or lower that signal.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--accent-emerald)] mt-0.5">→</span>
            <span>Afterward, capture a short reflection to build team norms.</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
