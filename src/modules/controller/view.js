import UI from "../ui";
import { projectManager } from "../projectManager";

/* function to render tasks on the screen */
export function renderTasks(project) {
  const title = document.querySelectorAll(".title-task");
  const message = document.querySelectorAll(".task-message");
  const priority = document.querySelectorAll(".task-priority");
  const dueDate = document.querySelectorAll(".task-date");

  for (let i = 0; i < project.todos.length; i++) {
    if (typeof title[i] !== "undefined") {
      title[i].textContent = `${project.todos[i].getTitle()}`;
    } else {
      return;
    }
  }

  for (let i = 0; i < project.todos.length; i++) {
    if (typeof message[i] !== "undefined") {
      message[i].textContent = `${project.todos[i].getMessage()}`;
    } else {
      return;
    }
    for (let i = 0; i < project.todos.length; i++) {
      if (typeof priority[i] !== "undefined") {
        priority[i].textContent = `${project.todos[i].getPriority()}`;
      } else {
        return;
      }
    }
    for (let i = 0; i < project.todos.length; i++) {
      if (typeof dueDate[i] !== "undefined") {
        dueDate[i].textContent = `${project.todos[i].getDueDate()}`;
      } else {
        return;
      }
    }
  }
}

/* function to render projects on the screen */
export function renderProjects() {
  const projectButtons = document.querySelectorAll(".project");
  projectButtons.forEach((button, i) => {
    button.textContent = `${projectManager.projects[i + 1].getTitle()}`;
  });
}

export function updateRenderTasks(project) {
  project.todos.forEach((task, i) => {
    const iconsContainer = document.createElement("div");
    const deleteIcon = document.createElement("span");
    const editIcon = document.createElement("span");
    const taskContainer = document.createElement("div");
    const taskContents = document.createElement("div");
    const titleTask = document.createElement("h3");
    const messageTask = document.createElement("p");
    const rightSideContainer = document.createElement("div");
    const priorityTask = document.createElement("p");
    const dueDateTask = document.createElement("p");

    UI.getContentContainer().appendChild(taskContainer);
    taskContainer.appendChild(iconsContainer);
    iconsContainer.appendChild(deleteIcon);
    iconsContainer.appendChild(editIcon);
    taskContainer.appendChild(taskContents);
    taskContents.appendChild(titleTask);
    taskContents.appendChild(messageTask);
    taskContainer.appendChild(rightSideContainer);
    rightSideContainer.appendChild(dueDateTask);
    rightSideContainer.appendChild(priorityTask);

    editIcon.textContent = "edit";
    deleteIcon.textContent = "delete";

    messageTask.style.display = "none";

    UI.setAttributes(iconsContainer, { class: "left-side-container", "data-id": `${task.id}` });
    UI.setAttributes(deleteIcon, { class: "material-symbols-outlined delete-button", "data-id": `${task.id}` });
    UI.setAttributes(editIcon, { class: "material-symbols-outlined edit-button", "data-id": `${task.id}` });
    UI.setAttributes(taskContainer, { class: "task-item", "data-id": `${task.id}` });
    UI.setAttributes(taskContents, { class: "task-content", "data-id": `${task.id}` });
    UI.setAttributes(titleTask, { class: "title-task", "data-id": `${task.id}` });
    UI.setAttributes(messageTask, { class: "task-message", "data-id": `${task.id}` });

    UI.setAttributes(rightSideContainer, { class: "right-side-container", "data-id": `${task.id}` });
    UI.setAttributes(priorityTask, { class: "task-priority", "data-id": `${task.id}` });
    UI.setAttributes(dueDateTask, { class: "task-date", "data-id": `${task.id}` });

    /* dark mode  */
    if (document.body.classList.contains("dark-mode-active")) {
      taskContainer.classList.add("dark-mode-active");
      titleTask.classList.add("dark-mode-active");
      messageTask.classList.add("dark-mode-active");
      dueDateTask.classList.add("dark-mode-active");
      priorityTask.classList.add("dark-mode-active");
    }

    renderTasks(project);
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
    UI.setAttributes(projectButton, { class: "project-button project default-menu-todo-buttons ", "data-id": `${projectManager.projects[i].id}` });

    renderProjects();
  }
}
