export default class Project {
  static count = -1;
  constructor(title, todos) {
    this.id = ++this.constructor.count;
    this.title = title;
    this.todos = [];
  }

  add(task) {
    this.todos.push(task);
  }
  remove(taskId) {
    this.todos = this.todos.filter((todo) => todo.id !== taskId);
  }

  setTitle(value) {
    this.title = value;
  }

  getTitle(value) {
    this.title = value;
  }
}

export const inboxProject = new Project("Inbox");
