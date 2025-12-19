import { Priority } from "./priority";

export class Task {
  constructor({ id, title, priority = Priority.MEDIUM, dueDate = null }) {
    this.id = id;
    this.title = title;
    this.priority = priority;
    this.dueDate = dueDate;
    this.completed = false;
    this.subTasks = [];
  }

  markAsDone() {
    this.completed = true;
  }

  setPriority(priority) {
    this.priority = priority;
  }

  addSubTask(subTask) {
    this.subTasks.push(subTask);
  }
}
