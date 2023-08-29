import Project, { inboxProject } from "./project";
import ProjectManager, { createProject, projectManager } from "./projectManager";
import ToDo from "./todo";
import delProject from "./controller/deleteProject";

export default class UI {
  static loadHome() {
    UI.openToDoCategoryPage("Inbox", document.querySelector("#button-inbox"));
    UI.initializeButtons();
    UI.loadProjectManager();
  }

  static loadProjectManager() {
    let activeProject = `${document.querySelector(".page-heading").textContent}`;
    console.log(activeProject);
    console.log();
    if (projectManager.projects.length === 0) {
      projectManager.add(inboxProject);

      console.log(projectManager);
    } else {
      return false;
    }
  }

  static loadToDoContent(page) {
    const mainContainer = document.querySelector(".main-container");
    const contentContainer = document.createElement("div");
    const headingContainer = document.createElement("div");
    const headingToDo = document.createElement("h1");
    const addToDoTaskButton = document.createElement("button");

    contentContainer.className = "content-container";
    headingContainer.className = "heading-container";
    addToDoTaskButton.className = "add-task-to-do-form-button";

    headingToDo.textContent = `${page}`;
    addToDoTaskButton.textContent = "Add Task";

    mainContainer.appendChild(headingContainer);
    headingContainer.appendChild(headingToDo);
    mainContainer.appendChild(addToDoTaskButton);

    mainContainer.appendChild(contentContainer);

    UI.setAttributes(headingToDo, { class: "page-heading" });
  }

  static initializeButtons() {
    UI.getMainContainer().addEventListener("click", (e) => {
      if (e.target.classList.contains("add-task-to-do-form-button")) {
        UI.appendTaskForm();
      }
    });

    UI.getProjectsButtonContainer().addEventListener("click", (e) => {
      if (e.target.classList.contains("add-project-button-add")) {
        UI.addProject();
      }
    });

    UI.getProjectsContainer().addEventListener("click", (e) => {
      if (e.target.classList.contains("delete-button")) {
        delProject(e);
      }
    });
    UI.getProjectsContainer().addEventListener("click", (e) => {
      if (e.target.classList.contains("project-button")) {
        UI.clear();
        UI.loadToDoContent(`${e.target.textContent}`);
      }
    });
  }

  static removeProject() {}

  static addProject() {
    const projectInputField = document.querySelector(".input-project-popup").value;
    const project = new Project(`${projectInputField}`);
    projectManager.add(project);

    const projectContainer = document.createElement("div");
    const projectButton = document.createElement("button");
    const deleteButton = document.createElement("span");

    deleteButton.classList.add("material-symbols-outlined", "delete-button");

    deleteButton.textContent = "delete";
    UI.getProjectsContainer().appendChild(projectContainer);
    projectContainer.appendChild(deleteButton);
    projectContainer.appendChild(projectButton);
    UI.setAttributes(deleteButton, { "data-id": `${project.id}` });

    UI.setAttributes(projectButton, { class: "project-button", "data-id": `${project.id}` });
    UI.setAttributes(projectContainer, { class: "project-item", "data-id": `${project.id}` });
    UI.renderProjects(projectButton);
  }

  static renderProjects(elem) {
    for (let i = 1; i < projectManager.projects.length; i++) {
      elem.textContent = `${projectManager.projects[i].getTitle()}`;
    }
  }

  static openToDoCategoryPage(page, pageButton) {
    UI.loadToDoContent(page);
  }

  static openInboxPage() {
    UI.openToDoCategoryPage("Inbox", this);
  }

  static openTodayPage() {
    UI.openToDoCategoryPage("Today", this);
  }

  static openThisWeekPage() {
    UI.openToDoCategoryPage("This Week", this);
  }

  static appendTaskForm() {
    const taskFormContainer = document.createElement("div");
    const taskFormElement = document.createElement("form");

    // todo input properties
    const titleLabel = document.createElement("label");
    const messageLabel = document.createElement("label");

    const titleInputField = document.createElement("input");
    const messageInputField = document.createElement("input");

    const priorityContainer = document.createElement("div");

    const labelPriorityLow = document.createElement("label");
    const labelPriorityMedium = document.createElement("label");
    const labelPriorityHigh = document.createElement("label");

    const inputPriorityLow = document.createElement("input");
    const inputPriorityMedium = document.createElement("input");
    const inputPriorityHigh = document.createElement("input");

    const dueDateInput = document.createElement("input");

    const addTaskIcon = document.createElement("span");
    const cancelTaskIcon = document.createElement("span");

    //

    titleLabel.textContent = "TITLE: ";
    messageLabel.textContent = "DETAILS: ";

    labelPriorityLow.textContent = "LOW";
    labelPriorityMedium.textContent = "MEDIUM";
    labelPriorityHigh.textContent = "HIGH";

    addTaskIcon.textContent = "add_task";
    cancelTaskIcon.textContent = "cancel";

    UI.getMainContainer().appendChild(taskFormContainer);
    taskFormContainer.appendChild(taskFormElement);
    taskFormElement.appendChild(titleLabel);
    taskFormElement.appendChild(messageLabel);
    titleLabel.appendChild(titleInputField);
    messageLabel.appendChild(messageInputField);

    taskFormElement.appendChild(priorityContainer);
    priorityContainer.appendChild(labelPriorityLow);
    priorityContainer.appendChild(labelPriorityMedium);
    priorityContainer.appendChild(labelPriorityHigh);
    labelPriorityLow.appendChild(inputPriorityLow);
    labelPriorityMedium.appendChild(inputPriorityMedium);
    labelPriorityHigh.appendChild(inputPriorityHigh);
    taskFormElement.appendChild(dueDateInput);
    taskFormElement.appendChild(addTaskIcon);
    taskFormElement.appendChild(cancelTaskIcon);

    UI.setAttributes(priorityContainer, { class: "priority-container" });
    UI.setAttributes(inputPriorityLow, { type: "radio" });
    UI.setAttributes(inputPriorityMedium, { type: "radio" });
    UI.setAttributes(inputPriorityHigh, { type: "radio" });
    UI.setAttributes(dueDateInput, { type: "date" });
    UI.setAttributes(addTaskIcon, { class: "material-symbols-outlined" });
    UI.setAttributes(cancelTaskIcon, { class: "material-symbols-outlined" });
  }

  static clear() {
    UI.clearMainContainer();
  }

  static clearMainContainer() {
    UI.getMainContainer().textContent = "";
  }

  static setAttributes(el, attrs) {
    Object.keys(attrs).forEach((key) => el.setAttribute(key, attrs[key]));
  }

  static getMainContainer() {
    return document.querySelector(".main-container");
  }

  static getProjectsButtonContainer() {
    return document.querySelector(".button-container");
  }

  static getProjectsContainer() {
    return document.querySelector(".add-project-container");
  }

  static getProjectItemButton() {
    return document.querySelector(".project-item");
  }
}
