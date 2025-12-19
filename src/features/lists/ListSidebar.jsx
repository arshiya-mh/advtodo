import { useState } from "react";

export default function ListSidebar({
  lists,
  activeListId,
  onSelectList,
  onCreateList,
}) {
  const [name, setName] = useState("");

  return (
    <div className="bg-white h-[550px] rounded-2xl shadow-sm border border-slate-200 p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">لیست‌ها</h2>
      </div>

      <div className="mt-3 flex gap-2">
        <input
          className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-200"
          placeholder="نام لیست جدید"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          className="rounded-xl bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          onClick={() => {
            if (!name.trim()) return;
            onCreateList(name.trim());
            setName("");
          }}
        >
          +
        </button>
      </div>

      <div className="mt-4 space-y-2">
        {lists.map((list) => {
          const isActive = list.id === activeListId;
          return (
            <button
              key={list.id}
              className={[
                "w-full text-right rounded-xl px-3 py-2 border text-sm",
                isActive
                  ? "bg-indigo-50 border-indigo-200 text-indigo-700"
                  : "bg-white border-slate-200 hover:bg-slate-50",
              ].join(" ")}
              onClick={() => onSelectList(list.id)}
            >
              {list.name}
              <span className="mr-2 text-xs text-slate-500">
                ({list.tasks?.length ?? 0})
              </span>
            </button>
          );
        })}

        {lists.length === 0 && (
          <div className="text-sm text-slate-500">هیچ لیستی وجود ندارد.</div>
        )}
      </div>
    </div>
  );
}
