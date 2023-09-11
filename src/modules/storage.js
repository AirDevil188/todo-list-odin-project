import Project from "./project";
import ToDo from "./todo";

export function setData(value, data) {
  return localStorage.setItem(value, JSON.stringify(data));
}

export function getData(value) {
  return JSON.parse(localStorage.getItem(value));
}

export function transformRawDataProjects() {
  return getData("projects").map((data) => new Project(data.id, data.title, data.todos));
}

export function transformRawDataTasks(project) {
  return project.todos.map((data) => new ToDo(data.id, data.title, data.message, data.priority, data.dueDate));
}
