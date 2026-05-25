interface PageShellProps {
  children: React.ReactNode;
  className?: string;
}

export function PageShell({ children, className = '' }: PageShellProps) {
  return (
    <div className={`max-w-md mx-auto px-4 pt-4 pb-24 min-h-screen ${className}`}>
      {children}
    </div>
  );
}
