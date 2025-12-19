import Badge from "../../shared/ui/Badge";
import Button from "../../shared/ui/Button";
import { CgRemove } from "react-icons/cg";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
function priorityLabel(p) {
  if (p === "HIGH") return "بالا";
  if (p === "LOW") return "پایین";
  return "متوسط";
}

export default function TaskItem({ task, onComplete, onDelete }) {
  return (
    <div className="rounded-xl border border-slate-200 p-3 flex items-center justify-between gap-3 font-[yekan]">
      <div className="min-w-0 space-y-1">
        <div
          className={[
            "text-sm font-medium truncate",
            task.completed ? "line-through text-slate-400" : "text-slate-900",
          ].join(" ")}
        >
          {task.title}
        </div>
        <Badge>اولویت {priorityLabel(task.priority)}</Badge>
      </div>

      <div className="flex font-[lale] items-center gap-2">
        {!task.completed && (
          <Button size="sm" variant="success" onClick={onComplete}>
            انجام شد
            <IoCheckmarkDoneCircleOutline />

          </Button>
        )}
        <Button size="sm" variant="ghost" onClick={onDelete}>
          حذف
          <CgRemove />
        </Button>
      </div>
    </div>
  );
}
