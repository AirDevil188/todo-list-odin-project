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

  getTitle() {
    return this.title;
  }
  findById(id) {
    return this.todos.find((todo) => todo.id === id);
  }

  findF(findFunction) {
    return this.todos.find(findFunction);
  }

  getID(elem) {
    return elem.id;
  }
}

export const inboxProject = new Project("Inbox");
