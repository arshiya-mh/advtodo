export default function Badge({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-slate-300 px-2 py-0.5 text-xs text-slate-600">
      {children}
    </span>
  );
}
