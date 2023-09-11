import UI from "../ui";
import { projectManager } from "../projectManager";

export function renderTasks(project) {
  const title = document.querySelectorAll(".title-task");
  const message = document.querySelectorAll(".task-message");
  const priority = document.querySelectorAll(".task-priority");
  const dueDate = document.querySelectorAll(".task-date");

  title.forEach((title, i) => {
    title.textContent = `${project.todos[i].getTitle()}`;
  });
  message.forEach((message, i) => {
    message.textContent = `${project.todos[i].getMessage()}`;
  });
  priority.forEach((priority, i) => {
    priority.textContent = `${project.todos[i].getPriority()}`;
  });
  dueDate.forEach((dueDate, i) => {
    dueDate.textContent = `${project.todos[i].getDueDate()}`;
  });
}

export function renderProjects() {
  const projectButtons = document.querySelectorAll(".project");
  projectButtons.forEach((button, i) => {
    console.log(projectManager);
    button.textContent = `${projectManager.projects[i + 1].getTitle()}`;
  });
}

export function updateRenderTasks(project) {
  project.todos.forEach((task, i) => {
    const taskContainer = document.createElement("div");
    const titleTask = document.createElement("h3");
    const messageTask = document.createElement("p");
    const priorityTask = document.createElement("p");
    const dueDateTask = document.createElement("p");
    const iconEdit = document.createElement("span");
    const iconDelete = document.createElement("span");

    UI.getContentContainer().appendChild(taskContainer);
    taskContainer.appendChild(titleTask);
    taskContainer.appendChild(messageTask);
    taskContainer.appendChild(priorityTask);
    taskContainer.appendChild(dueDateTask);
    taskContainer.appendChild(iconEdit);
    taskContainer.appendChild(iconDelete);

    iconEdit.textContent = "edit";
    iconDelete.textContent = "delete";

    UI.setAttributes(taskContainer, { class: "task-item", "data-id": `${task.id}` });
    UI.setAttributes(titleTask, { class: "title-task", "data-id": `${task.id}` });
    UI.setAttributes(messageTask, { class: "task-message", "data-id": `${task.id}` });
    UI.setAttributes(priorityTask, { class: "task-priority", "data-id": `${task.id}` });
    UI.setAttributes(dueDateTask, { class: "task-date", "data-id": `${task.id}` });
    UI.setAttributes(iconEdit, { class: "material-symbols-outlined edit-button", "data-id": `${task.id}` });
    UI.setAttributes(iconDelete, { class: "material-symbols-outlined delete-button", "data-id": `${task.id}` });

    renderTasks(project);
    console.log(projectManager);
  });
}

export function updateRenderProjects() {
  for (let i = 1; i < projectManager.projects.length; i++) {
    const projectItemContainer = document.createElement("div");
    const iconDelete = document.createElement("span");
    const projectButton = document.createElement("button");

    UI.getUserProjectListContainer().appendChild(projectItemContainer);
    projectItemContainer.appendChild(iconDelete);
    projectItemContainer.appendChild(projectButton);

    iconDelete.textContent = "delete";

    UI.setAttributes(projectItemContainer, { class: "project-item", "data-id": `${projectManager.projects[i].id}` });
    UI.setAttributes(iconDelete, { class: "material-symbols-outlined delete-button", "data-id": `${projectManager.projects[i].id}` });
    UI.setAttributes(projectButton, { class: "project-button project", "data-id": `${projectManager.projects[i].id}` });

    renderProjects();
  }
}
