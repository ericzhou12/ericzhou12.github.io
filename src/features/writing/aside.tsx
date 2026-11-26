export function Aside({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <span className="sidenote">
      <sup className="sidenote-ref">{n}</sup>
      <span className="sidenote-body" role="note">
        <sup>{n}</sup> {children}
      </span>
    </span>
  );
}
