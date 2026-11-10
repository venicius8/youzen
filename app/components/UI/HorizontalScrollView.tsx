export default function HorizontalScrollView({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    // Wrapper for a horizontally scrollable list of items.
    <section>
      {/* Optional section heading displayed above the scroll area. */}
      <h2 className="text-3xl font-bold ml-4">{title}</h2>
      {/* Flex container with horizontal overflow to enable side-to-side scrolling. */}
      <div className="w-auto h-auto mb-10 flex gap-4 overflow-x-scroll">
        {children}
      </div>
    </section>
  );
}
