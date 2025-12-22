// --- Types ---

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

// --- Main Component ---

// Centralizes max-width and padding for consistent alignment.
// Why: A single shared wrapper prevents subtle layout drift across sections.
export function Container({
  children,
  className = "",
}: ContainerProps) {
  return (
    <div className={`mx-auto max-w-7xl px-6 md:px-12 ${className}`}>
      {children}
    </div>
  );
}
