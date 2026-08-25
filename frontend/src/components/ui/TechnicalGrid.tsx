interface TechnicalGridProps {
  className?: string;
  children?: React.ReactNode;
}

export default function TechnicalGrid({
  className = "",
  children,
}: TechnicalGridProps) {
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(149,204,221,0.055) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(149,204,221,0.055) 1px, transparent 1px)
        `,
        backgroundSize: "72px 72px",
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(11,18,32,0.38)_78%)]" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
