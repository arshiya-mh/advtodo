export default function FiltersBar({ value, onChange }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="text-slate-500 font-[yekan]">مرتب‌سازی:</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-xl border border-slate-300 px-3 py-1.5 outline-none focus:ring-2 focus:ring-indigo-200"
      >
        <option value="NONE">پیش‌فرض</option>
        <option value="HIGH">اولویت بالا</option>
        <option value="LOW">اولویت پایین</option>
      </select>
    </div>
  );
}
