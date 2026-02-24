import React from "react";

export default function EmptyState({
  icon = "📭",
  title = "No data yet",
  description = "Get started by creating your first item.",
  action
}) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center">
      <div className="text-6xl mb-4 animate-float">{icon}</div>
      <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">{title}</h3>
      <p className="text-[var(--text-secondary)] mb-6 max-w-md">{description}</p>
      {action && <div>{action}</div>}
    </div>
  );
}
