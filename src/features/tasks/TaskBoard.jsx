import { useMemo, useState } from "react";
import TaskItem from "./TaskItem";
import FiltersBar from "./FiltersBar";
import Button from "../../shared/ui/Button";
import Input from "../../shared/ui/Input";

export default function TaskBoard({
  activeList,
  onCreateTask,
  onCompleteTask,
  onDeleteTask,
  onEditTask,
}) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("MEDIUM");
  const [filter, setFilter] = useState("NONE");

  const tasks = useMemo(() => {
    if (!activeList) return [];
    if (filter === "NONE") return activeList.tasks;
    return [...activeList.tasks].sort((a, b) =>
      filter === "HIGH"
        ? a.priority === "HIGH"
          ? -1
          : 1
        : a.priority === "LOW"
        ? -1
        : 1
    );
  }, [activeList, filter]);
  const total = activeList?.tasks.length ?? 0;
  const done = activeList?.tasks.filter((t) => t.completed).length ?? 0;
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">وظایف</h2>
        <FiltersBar value={filter} onChange={setFilter} />
      </div>

      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-12 md:col-span-8">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="عنوان وظیفه جدید"
            disabled={!activeList}
          />
        </div>

        <div className="col-span-6 md:col-span-2">
          <select
            className="w-full rounded-xl  border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-200"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            disabled={!activeList}
          >
            <option value="LOW"> پایین </option>
            <option value="MEDIUM">متوسط</option>
            <option value="HIGH">بالا</option>
          </select>
        </div>

        <div className="col-span-6 md:col-span-2">
          <Button
            onClick={() => {
              if (!title.trim()) return;
              onCreateTask({ title: title.trim(), priority });
              setTitle("");
              setPriority("MEDIUM");
            }}
            disabled={!activeList}
          >
            افزودن
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onComplete={() => onCompleteTask(task.id)}
            onDelete={() => onDeleteTask(task.id)}
            onEdit={() => onEditTask(task)}
          />
        ))}

        {activeList && tasks.length === 0 && (
          <div className="text-sm text-slate-500">وظیفه‌ای وجود ندارد.</div>
        )}

        {!activeList && (
          <div className="text-sm text-slate-500">
            برای نمایش وظایف، یک لیست انتخاب کنید.
          </div>
        )}
      </div>
      {activeList && (
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-slate-500">
            <span>
              {done} انجام‌شده از {total}
            </span>
            <span>{percent}%</span>
          </div>

          <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-600 rounded-full transition-all"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
