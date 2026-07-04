type ScallopDividerProps = {
  /** Color of the scallop shapes - should match the section ABOVE this divider */
  color?: string;
  /** Which side the scallops curve into */
  flip?: boolean;
  className?: string;
};

/**
 * Signature element: a soft scalloped edge, like the trim of a baby blanket.
 * Use sparingly (2-3 times per page) between alternating cream/white sections.
 */
export function ScallopDivider({
  color = "var(--color-cream)",
  flip = false,
  className = "",
}: ScallopDividerProps) {
  return (
    <div
      aria-hidden="true"
      className={`w-full overflow-hidden leading-none ${flip ? "rotate-180" : ""} ${className}`}
      style={{ height: "28px" }}
    >
      <svg
        viewBox="0 0 240 28"
        preserveAspectRatio="none"
        className="h-full w-full"
      >
        <path
          d="M0,0 C10,28 30,28 40,0 C50,28 70,28 80,0 C90,28 110,28 120,0 C130,28 150,28 160,0 C170,28 190,28 200,0 C210,28 230,28 240,0 L240,0 L0,0 Z"
          fill={color}
        />
      </svg>
    </div>
  );
}