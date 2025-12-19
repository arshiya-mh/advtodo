import { useEffect, useState } from "react";
import Modal from "../../shared/ui/Modal";
import Button from "../../shared/ui/Button";
import Input from "../../shared/ui/Input";

export default function TaskEditorModal({
  open,
  task,
  onClose,
  onSave,
}) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("MEDIUM");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setPriority(task.priority);
    }
  }, [task]);

  if (!task) return null;

  return (
    <Modal open={open} onClose={onClose} title="ویرایش وظیفه">
      <div className="space-y-4">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="عنوان وظیفه"
        />

        <select
          className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-200"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="LOW">اولویت پایین</option>
          <option value="MEDIUM">اولویت متوسط</option>
          <option value="HIGH">اولویت بالا</option>
        </select>

        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={onClose}>
            لغو
          </Button>
          <Button
            onClick={() => {
              if (!title.trim()) return;
              onSave({ title: title.trim(), priority });
            }}
          >
            ذخیره
          </Button>
        </div>
      </div>
    </Modal>
  );
}
