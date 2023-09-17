import { format } from "date-fns";

export default class ToDo {
  constructor(id, projectName, title, message, priority, dueDate) {
    this.id = id;
    this.projectName = projectName;
    this.title = title;
    this.message = message;
    this.priority = priority;
    this.dueDate = dueDate;
  }

  getProjectName() {
    return this.projectName;
  }

  getTitle() {
    return this.title;
  }

  setTitle(value) {
    this.title = value;
  }

  getMessage() {
    return this.message;
  }

  setMessage(value) {
    this.message = value;
  }

  getPriority() {
    return this.priority;
  }

  setPriority(value) {
    this.priority = value;
  }

  getDueDate() {
    return this.dueDate;
  }

  setDueDate(value) {
    this.dueDate = value;
  }
}
