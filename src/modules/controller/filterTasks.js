import { projectManager } from "../projectManager";
import UI from "../ui";

/* function that we use to filter tasks based on todays date that we use on "Today" page*/
export function filterByToday() {
  projectManager.projects.map((project) => {
    project.getTasksToday().map((task) => {
      const iconsContainer = document.createElement("div");
      const editIcon = document.createElement("span");
      const deleteIcon = document.createElement("span");
      const taskContainer = document.createElement("div");
      const taskContents = document.createElement("div");
      const projectName = document.createElement("p");
      const titleTask = document.createElement("h3");
      const messageTask = document.createElement("p");
      const rightSideContainer = document.createElement("div");
      const priorityTask = document.createElement("p");
      const dueDateTask = document.createElement("p");

      UI.getContentContainer().appendChild(taskContainer);
      taskContainer.appendChild(iconsContainer);
      iconsContainer.appendChild(deleteIcon);
      iconsContainer.appendChild(editIcon);
      taskContainer.appendChild(projectName);
      taskContainer.appendChild(taskContents);
      taskContents.appendChild(titleTask);
      taskContents.appendChild(messageTask);
      taskContainer.appendChild(rightSideContainer);
      rightSideContainer.appendChild(dueDateTask);
      rightSideContainer.appendChild(priorityTask);

      projectName.textContent = `(${task.getProjectName()})`;
      titleTask.textContent = `${task.getTitle()}`;
      messageTask.textContent = `${task.getMessage()}`;
      priorityTask.textContent = `${task.getPriority()}`;
      dueDateTask.textContent = `${task.getDueDate()}`;

      editIcon.textContent = "edit";
      deleteIcon.textContent = "delete";

      messageTask.style.display = "none";

      UI.setAttributes(iconsContainer, { class: "left-side-container", "data-id": `${task.id}` });
      UI.setAttributes(deleteIcon, { class: "material-symbols-outlined delete-button", "data-id": `${task.id}` });
      UI.setAttributes(editIcon, { class: "material-symbols-outlined edit-button", "data-id": `${task.id}` });
      UI.setAttributes(taskContainer, { class: "task-item", "data-id": `${task.id}` });
      UI.setAttributes(projectName, { class: "project-name", "data-id": `${task.id}` });
      UI.setAttributes(taskContents, { class: "task-content", "data-id": `${task.id}` });
      UI.setAttributes(titleTask, { class: "title-task", "data-id": `${task.id}` });
      UI.setAttributes(messageTask, { class: "task-message", "data-id": `${task.id}` });

      UI.setAttributes(rightSideContainer, { class: "right-side-container", "data-id": `${task.id}` });
      UI.setAttributes(priorityTask, { class: "task-priority", "data-id": `${task.id}` });
      UI.setAttributes(dueDateTask, { class: "task-date", "data-id": `${task.id}` });

      /* dark mode dates */

      if (document.body.classList.contains("dark-mode-active")) {
        taskContainer.classList.add("dark-mode-active");
        titleTask.classList.add("dark-mode-active");
        messageTask.classList.add("dark-mode-active");
        dueDateTask.classList.add("dark-mode-active");
        priorityTask.classList.add("dark-mode-active");
        projectName.classList.add("dark-mode-active");
      }
    });
  });
}

/* function that we use to filter tasks based on this week date that we use on "This Week" page*/
export function filterByThisWeek() {
  projectManager.projects.map((project) => {
    /* method to sort tasks from lower date to higher one */
    project.sortTasksByDate();

    project.getTasksThisWeek().map((task) => {
      const iconsContainer = document.createElement("div");
      const editIcon = document.createElement("span");
      const deleteIcon = document.createElement("span");
      const taskContainer = document.createElement("div");
      const taskContents = document.createElement("div");
      const projectName = document.createElement("p");
      const titleTask = document.createElement("h3");
      const messageTask = document.createElement("p");
      const rightSideContainer = document.createElement("div");
      const priorityTask = document.createElement("p");
      const dueDateTask = document.createElement("p");

      UI.getContentContainer().appendChild(taskContainer);
      taskContainer.appendChild(iconsContainer);
      iconsContainer.appendChild(deleteIcon);
      iconsContainer.appendChild(editIcon);
      taskContainer.appendChild(projectName);
      taskContainer.appendChild(taskContents);
      taskContents.appendChild(titleTask);
      taskContents.appendChild(messageTask);
      taskContainer.appendChild(rightSideContainer);
      rightSideContainer.appendChild(dueDateTask);
      rightSideContainer.appendChild(priorityTask);

      projectName.textContent = `(${task.getProjectName()})`;
      titleTask.textContent = `${task.getTitle()}`;
      messageTask.textContent = `${task.getMessage()}`;
      priorityTask.textContent = `${task.getPriority()}`;
      dueDateTask.textContent = `${task.getDueDate()}`;

      editIcon.textContent = "edit";
      deleteIcon.textContent = "delete";

      messageTask.style.display = "none";

      UI.setAttributes(iconsContainer, { class: "left-side-container", "data-id": `${task.id}` });
      UI.setAttributes(deleteIcon, { class: "material-symbols-outlined delete-button", "data-id": `${task.id}` });
      UI.setAttributes(editIcon, { class: "material-symbols-outlined edit-button", "data-id": `${task.id}` });
      UI.setAttributes(taskContainer, { class: "task-item", "data-id": `${task.id}` });
      UI.setAttributes(projectName, { class: "project-name", "data-id": `${task.id}` });
      UI.setAttributes(taskContents, { class: "task-content", "data-id": `${task.id}` });
      UI.setAttributes(titleTask, { class: "title-task", "data-id": `${task.id}` });
      UI.setAttributes(messageTask, { class: "task-message", "data-id": `${task.id}` });

      UI.setAttributes(rightSideContainer, { class: "right-side-container", "data-id": `${task.id}` });
      UI.setAttributes(priorityTask, { class: "task-priority", "data-id": `${task.id}` });
      UI.setAttributes(dueDateTask, { class: "task-date", "data-id": `${task.id}` });

      /* dark mode dates */
      if (document.body.classList.contains("dark-mode-active")) {
        taskContainer.classList.add("dark-mode-active");
        titleTask.classList.add("dark-mode-active");
        messageTask.classList.add("dark-mode-active");
        dueDateTask.classList.add("dark-mode-active");
        priorityTask.classList.add("dark-mode-active");
        projectName.classList.add("dark-mode-active");
      }
    });
  });
}
