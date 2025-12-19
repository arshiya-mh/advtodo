import { useEffect, useMemo, useState } from "react";
import { TaskController } from "../domain/services/taskController";

import ListSidebar from "../features/lists/ListSidebar";
import ListHeader from "../features/lists/ListHeader";
import TaskBoard from "../features/tasks/TaskBoard";
import TaskEditorModal from "../features/tasks/TaskEditorModal";

export default function App() {
  const controller = useMemo(() => new TaskController(), []);

  const [lists, setLists] = useState([]);
  const [activeListId, setActiveListId] = useState(null);

  const [editingTask, setEditingTask] = useState(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("todo-data");
    if (saved) {
      controller.load(saved);
      setLists([...controller.lists]);
      setActiveListId(controller.lists[0]?.id ?? null);
    } else {
      const list = controller.createList("لیست پیش‌فرض");
      setLists([...controller.lists]);
      setActiveListId(list.id);
    }
  }, [controller]);

  const persist = () => {
    localStorage.setItem("todo-data", controller.serialize());
    setLists([...controller.lists]);
  };

  const activeList = lists.find((l) => l.id === activeListId) || null;

  const actions = {
    createList: (name) => {
      controller.createList(name);
      persist();
    },
    setActiveList: (id) => setActiveListId(id),
    createTask: (payload) => {
      if (!activeListId) return;
      controller.createTask(activeListId, payload);
      persist();
    },
    completeTask: (taskId) => {
      if (!activeListId) return;
      controller.completeTask(activeListId, taskId);
      persist();
    },
    deleteTask: (taskId) => {
      if (!activeListId) return;
      controller.deleteTask(activeListId, taskId);
      persist();
    },
    editTask: (taskId, data) => {
      if (!activeListId) return;
      controller.editTask(activeListId, taskId, data);
      persist();
    },
  };

  return (
    <div className="min-h-screen bg-gray-900  text-slate-900 font-[lale]">
      <div className="max-w-6xl mx-auto p-4 ">
        <div className="grid grid-cols-12 mt-20 gap-4">
          <aside className="col-span-12 md:col-span-4 lg:col-span-3">
            <ListSidebar
              lists={lists}
              activeListId={activeListId}
              onSelectList={actions.setActiveList}
              onCreateList={actions.createList}
            />
          </aside>

          <main className="col-span-12 md:col-span-8 lg:col-span-9 space-y-4">
            <ListHeader activeList={activeList} />
            <TaskBoard
              activeList={activeList}
              onCreateTask={actions.createTask}
              onCompleteTask={actions.completeTask}
              onDeleteTask={actions.deleteTask}
              onEditTask={(task) => {
                setEditingTask(task);
                setIsEditorOpen(true);
              }}
            />
          </main>
        </div>
      </div>

      <TaskEditorModal
        open={isEditorOpen}
        task={editingTask}
        onClose={() => setIsEditorOpen(false)}
        onSave={(data) => {
          actions.editTask(editingTask.id, data);
          setIsEditorOpen(false);
        }}
      />
    </div>
  );
}
