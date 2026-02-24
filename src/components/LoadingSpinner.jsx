import React from "react";

export default function LoadingSpinner({ size = "md", text = "Loading..." }) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3 p-6">
      <div
        className={`${sizeClasses[size]} border-2 border-[var(--surface-500)] border-t-[var(--accent-cyan)] rounded-full animate-spin`}
        style={{ filter: "drop-shadow(0 0 6px rgba(110, 231, 183, 0.3))" }}
        role="status"
        aria-label="Loading"
      />
      {text && <p className="text-sm font-medium text-[var(--text-secondary)]">{text}</p>}
    </div>
  );
}
