import { format } from "date-fns";

export default class ToDo {
  constructor(id, title, message, priority, dueDate, isCompleted) {
    this.id = id;
    this.title = title;
    this.message = message;
    this.priority = priority;
    this.dueDate = format(new Date(dueDate), "MM/dd/yyyy");
    this.isCompleted = isCompleted;
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
    this.dueDate = format(new Date(value), "MM/dd/yyyy");
  }

  getIsCompleted() {
    return this.isCompleted;
  }
}
