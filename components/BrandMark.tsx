export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      role="img"
      aria-label="DEMO Beauty Salon monogram"
    >
      <circle cx="24" cy="24" r="23.5" fill="none" stroke="currentColor" strokeWidth="1" />
      <text
        x="24"
        y="31"
        textAnchor="middle"
        fontFamily="var(--font-display)"
        fontStyle="italic"
        fontWeight="600"
        fontSize="22"
        fill="currentColor"
      >
        D
      </text>
    </svg>
  );
}
