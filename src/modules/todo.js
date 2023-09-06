import { compareAsc, format } from "date-fns";
import { v4 as uuidv4 } from "uuid";

export default class ToDo {
  constructor(title, message, priority, dueDate, isCompleted) {
    this.id = uuidv4();
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

  setDueDate(value) {
    this.dueDate = value;
  }

  getIsCompleted() {
    return this.isCompleted;
  }
}
