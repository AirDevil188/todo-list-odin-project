import Project from "./project";
import ToDo from "./todo";

/* function that sets or saves our data to the localStorage */
export function setData(value, data) {
  return localStorage.setItem(value, JSON.stringify(data));
}

/* function that gets our data from the localStorage */
export function getData(value) {
  return JSON.parse(localStorage.getItem(value));
}

/* function that takes  the "raw" data from the localStorage and transforms it back as Project object*/
export function transformRawDataProjects() {
  return getData("projects").map((data) => new Project(data.id, data.title, data.todos));
}

/* function that takes  the "raw" data from the localStorage and transforms it back as ToDo object*/
export function transformRawDataTasks(project) {
  return project.todos.map((data) => new ToDo(data.id, data.projectName, data.title, data.message, data.priority, data.dueDate));
}
