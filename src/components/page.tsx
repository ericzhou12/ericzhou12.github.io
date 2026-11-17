export function Page({
  title,
  wide,
  children,
}: {
  title: string;
  wide?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section className={`mx-auto w-full px-6 py-16 ${wide ? "max-w-[56rem]" : "max-w-[40rem]"}`}>
      <h1 className="title mb-6 text-xl">{title}</h1>
      {children}
    </section>
  );
}
