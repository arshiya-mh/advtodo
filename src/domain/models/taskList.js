export class TaskList {
  constructor({ id, name }) {
    this.id = id;
    this.name = name;
    this.tasks = [];
  }

  addTask(task) {
    this.tasks.push(task);
  }

  removeTask(taskId) {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
  }

  getTaskById(taskId) {
    return this.tasks.find((task) => task.id === taskId);
  }
}
