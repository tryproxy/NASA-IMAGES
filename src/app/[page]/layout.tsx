export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full w-full bg-[var(--color-bg)] font-mono text-[var(--color-fg)]">
      {children}
    </div>
  );
}
