import { set } from "date-fns";
import setActiveProject from "./activeProject";
import UI from "../ui";
import { projectManager } from "../projectManager";

export function renderTasks() {
  console.log(setActiveProject());
  const title = document.querySelectorAll(".title-task");
  const message = document.querySelectorAll(".task-message");
  const priority = document.querySelectorAll(".task-priority");
  const dueDate = document.querySelectorAll(".task-date");
  title.forEach((title, i) => {
    title.textContent = `${setActiveProject().todos[i].getTitle()}`;
  });
  message.forEach((message, i) => {
    message.textContent = `${setActiveProject().todos[i].getMessage()}`;
  });
  priority.forEach((priority, i) => {
    priority.textContent = `${setActiveProject().todos[i].getPriority()}`;
  });
  dueDate.forEach((dueDate, i) => {
    dueDate.textContent = `${setActiveProject().todos[i].getDueDate()}`;
  });
}

export function updateRenderTasks() {
  setActiveProject().todos.forEach((task, i) => {
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

    renderTasks();
    console.log(projectManager);
  });
}
