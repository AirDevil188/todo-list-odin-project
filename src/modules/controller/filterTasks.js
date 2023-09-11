import { projectManager } from "../projectManager";
import UI from "../ui";

export function filterByToday() {
  projectManager.projects.map((project) => {
    project.getTasksToday().map((task) => {
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

      titleTask.textContent = `${task.getTitle()}`;
      messageTask.textContent = `${task.getMessage()}`;
      priorityTask.textContent = `${task.getPriority()}`;
      dueDateTask.textContent = `${task.getDueDate()}`;

      iconEdit.textContent = "edit";
      iconDelete.textContent = "delete";

      UI.setAttributes(taskContainer, { class: "task-item", "data-id": `${task.id}` });
      UI.setAttributes(titleTask, { class: "title-task", "data-id": `${task.id}` });
      UI.setAttributes(messageTask, { class: "task-message", "data-id": `${task.id}` });
      UI.setAttributes(priorityTask, { class: "task-priority", "data-id": `${task.id}` });
      UI.setAttributes(dueDateTask, { class: "task-date", "data-id": `${task.id}` });
      UI.setAttributes(iconEdit, { class: "material-symbols-outlined edit-button", "data-id": `${task.id}` });
      UI.setAttributes(iconDelete, { class: "material-symbols-outlined delete-button", "data-id": `${task.id}` });
    });
  });
}

export function filterByThisWeek() {
  projectManager.projects.map((project) => {
    project.sortTasksByDate();

    project.getTasksThisWeek().map((task) => {
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

      titleTask.textContent = `${task.getTitle()}`;
      messageTask.textContent = `${task.getMessage()}`;
      priorityTask.textContent = `${task.getPriority()}`;
      dueDateTask.textContent = `${task.getDueDate()}`;

      iconEdit.textContent = "edit";
      iconDelete.textContent = "delete";

      UI.setAttributes(taskContainer, { class: "task-item", "data-id": `${task.id}` });
      UI.setAttributes(titleTask, { class: "title-task", "data-id": `${task.id}` });
      UI.setAttributes(messageTask, { class: "task-message", "data-id": `${task.id}` });
      UI.setAttributes(priorityTask, { class: "task-priority", "data-id": `${task.id}` });
      UI.setAttributes(dueDateTask, { class: "task-date", "data-id": `${task.id}` });
      UI.setAttributes(iconEdit, { class: "material-symbols-outlined edit-button", "data-id": `${task.id}` });
      UI.setAttributes(iconDelete, { class: "material-symbols-outlined delete-button", "data-id": `${task.id}` });
    });
  });
}
