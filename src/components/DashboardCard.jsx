export default function DashboardCard({ title, children, className = "" }) {
  return (
    <div className={`glass-card-elevated p-6 flex flex-col gap-3 ${className}`}>
      {title && (
        <h3 className="text-sm font-semibold uppercase tracking-[0.06em] text-[var(--text-tertiary)]">
          {title}
        </h3>
      )}
      <div>{children}</div>
    </div>
  );
}
