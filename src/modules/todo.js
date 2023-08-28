import { compareAsc, format } from "date-fns";
import Project from "./project";

export default class ToDo {
  static count = -1;
  constructor(title, message, priority, dueDate, isCompleted) {
    this.id = ++this.constructor.count;
    this.title = title;
    this.message = message;
    this.priority = priority;
    this.dueDate = dueDate;
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

  setDueDate(dd, mm, yyyy) {
    this.dueDate = format(new Date(dd, mm, yyyy), "dd-LL-yyyy");
  }

  getIsCompleted() {
    return this.isCompleted;
  }
}
