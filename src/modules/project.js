import { v4 as uuidv4 } from "uuid";
import { isToday, isThisWeek } from "date-fns";
export default class Project {
  constructor(id, title, todos) {
    this.id = id;
    this.title = title;
    this.todos = todos;
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

  getTasksToday() {
    return this.todos.filter((task) => {
      const taskDate = new Date(task.getDueDate());
      if (isToday(taskDate) === true) {
        return task;
      } else {
        return;
      }
    });
  }

  getTasksThisWeek() {
    return this.todos.filter((task) => {
      const taskDate = new Date(task.getDueDate());
      if (isThisWeek(taskDate, { weekStartsOn: 1 }) === true) {
        return task;
      } else {
        return;
      }
    });
  }

  sortTasksByDate() {
    this.todos.sort((a, b) => {
      let dateA = new Date(a.dueDate);
      let dateB = new Date(b.dueDate);

      return dateA - dateB;
    });
  }
}

export const inboxProject = new Project(uuidv4(), "Inbox", []);
