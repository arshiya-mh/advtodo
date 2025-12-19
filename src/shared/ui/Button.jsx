export default function Button({
  children,
  onClick,
  variant = "primary",
  size = "md",
  disabled = false,
}) {
  const base =
    "inline-flex items-center justify-center rounded-xl font-medium transition focus:outline-none focus:ring-2";

  const variants = {
    primary:
      "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-300",
    success:
      "bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-300",
    ghost:
      "bg-slate-100 text-slate-700 hover:bg-slate-200 focus:ring-slate-300",
    danger:
      "bg-rose-600 text-white hover:bg-rose-700 focus:ring-rose-300",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={[
        base,
        variants[variant],
        sizes[size],
        disabled && "opacity-50 cursor-not-allowed",
      ].join(" ")}
    >
      {children}
    </button>
  );
}
