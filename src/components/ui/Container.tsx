/**
 * `Container` is the default page-width wrapper used across sections.
 * - Centers content with a max width (`max-w-7xl`)
 * - Applies consistent horizontal padding (`px-6 md:px-12`)
 * - Accepts an optional `className` for section-specific spacing/layout tweaks
 */
export function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto max-w-7xl px-6 md:px-12 ${className}`}>
      {children}
    </div>
  );
}
