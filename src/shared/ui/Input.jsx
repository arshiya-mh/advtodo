export default function Input({ value, onChange, placeholder, disabled }) {
  return (
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className="w-full font-[yekan] rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-200 disabled:bg-slate-100"
    />
  );
}
