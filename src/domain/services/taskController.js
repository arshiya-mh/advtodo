import { Task } from "../models/task";
import { TaskList } from "../models/taskList";
import { Priority } from "../models/priority";

export class TaskController {
  constructor() {
    this.lists = [];
  }

  createList(name) {
    const list = new TaskList({
      id: crypto.randomUUID(),
      name,
    });
    this.lists.push(list);
    return list;
  }

  createTask(listId, { title, priority = Priority.MEDIUM, dueDate = null }) {
    const list = this.getListById(listId);
    if (!list) return null;

    const task = new Task({
      id: crypto.randomUUID(),
      title,
      priority,
      dueDate,
    });

    list.addTask(task);
    return task;
  }

  editTask(listId, taskId, data) {
    const task = this.getTask(listId, taskId);
    if (!task) return;

    if (data.title !== undefined) task.title = data.title;
    if (data.priority !== undefined) task.setPriority(data.priority);
  }

  completeTask(listId, taskId) {
    const task = this.getTask(listId, taskId);
    if (!task) return;
    task.markAsDone();
  }

  deleteTask(listId, taskId) {
    const list = this.getListById(listId);
    if (!list) return;
    list.removeTask(taskId);
  }

  getListById(listId) {
    return this.lists.find((l) => l.id === listId);
  }

  getTask(listId, taskId) {
    const list = this.getListById(listId);
    if (!list) return null;
    return list.getTaskById(taskId);
  }

  serialize() {
    return JSON.stringify(this.lists);
  }

  load(serialized) {
    if (!serialized) return;
    const raw = JSON.parse(serialized);

    this.lists = raw.map((l) => {
      const list = new TaskList({ id: l.id, name: l.name });
      l.tasks.forEach((t) => {
        const task = new Task({
          id: t.id,
          title: t.title,
          priority: t.priority,
          dueDate: t.dueDate,
        });
        if (t.completed) task.markAsDone();
        list.addTask(task);
      });
      return list;
    });
  }
}
