export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <div className="flex-1">{children}</div>
      {/* <DetailsPanel /> */}
    </div>
  );
}
