export default function HorizontalScrollView({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <section>
      <h2 className="text-3xl font-bold ml-4">{title}</h2>
      <div className="w-screen h-40 mb-10 flex gap-4 overflow-x-scroll">
        {children}
      </div>
    </section>
  );
}
