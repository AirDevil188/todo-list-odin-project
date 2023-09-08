import { v4 as uuidv4 } from "uuid";
import ToDo from "./todo";

export default class Project {
  constructor(title, todos) {
    this.id = uuidv4();
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
inboxProject.id = "0";
// Object.freeze(inboxProject);
