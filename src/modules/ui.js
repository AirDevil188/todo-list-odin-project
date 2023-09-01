import Project, { inboxProject } from "./project";
import ProjectManager, { projectManager } from "./projectManager";
import ToDo from "./todo";
import initializeButtons from "./controller/initializeButtons";
import { id } from "date-fns/locale";
import activeProject from "./controller/activeProject";

export default class UI {
  static loadHome() {
    UI.openToDoCategoryPage("Inbox", document.querySelector("#button-inbox"));
    initializeButtons();
    UI.loadProjectManager();
  }

  static loadProjectManager() {
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
  }

  static appendProjectForm() {
    const projectCreationFormContainer = document.createElement("div");
    const projectTitleInput = document.createElement("input");
    const addProjectIcon = document.createElement("span");
    const cancelProjectIcon = document.createElement("span");

    UI.getUserProjectListContainer().appendChild(projectCreationFormContainer);
    projectCreationFormContainer.appendChild(projectTitleInput);
    projectCreationFormContainer.appendChild(addProjectIcon);
    projectCreationFormContainer.appendChild(cancelProjectIcon);

    addProjectIcon.textContent = "add_task";
    cancelProjectIcon.textContent = "cancel";

    UI.setAttributes(projectCreationFormContainer, { class: "project-creation-form-container" });
    UI.setAttributes(addProjectIcon, { class: "material-symbols-outlined  add-project-button-add" });
    UI.setAttributes(cancelProjectIcon, { class: "material-symbols-outlined delete-button" });
    UI.setAttributes(projectTitleInput, { type: "input", class: "input-project-popup" });
  }

  static addProject() {
    const projectInputField = document.querySelector(".input-project-popup").value;
    const project = new Project(`${projectInputField}`);
    projectManager.add(project);
    const projectContainer = document.createElement("div");
    const projectButton = document.createElement("button");
    const deleteButton = document.createElement("span");
    const editButton = document.createElement("span");

    deleteButton.textContent = "delete";

    UI.getUserProjectListContainer().appendChild(projectContainer);
    projectContainer.appendChild(editButton);
    projectContainer.appendChild(deleteButton);
    projectContainer.appendChild(projectButton);

    UI.setAttributes(projectContainer, { class: "project-item", "data-id": `${project.id}` });
    UI.setAttributes(projectButton, { class: "project-button", "data-id": `${project.id}` });
    UI.setAttributes(deleteButton, { class: "material-symbols-outlined delete-button", "data-id": `${project.id}` });

    UI.renderProjects(projectButton);
  }

  static createAddProjectButton() {
    const addProjectButton = document.createElement("button");
    UI.setAttributes(addProjectButton, { class: "add-project-input-button" });

    addProjectButton.textContent = "+ Add Project";

    UI.getUserProjectListContainer().appendChild(addProjectButton);
  }

  static deleteAddProjectButton() {
    document.querySelector(".add-project-input-button").remove();
  }

  static deleteProjectCreationFormContainer() {
    document.querySelector(".project-creation-form-container").remove();
  }

  static deleteProjectFromTheDOM(e) {
    e.target.parentElement.remove();
  }

  static renderProjects(elem) {
    for (let i = 1; i < projectManager.projects.length; i++) {
      elem.textContent = `${projectManager.projects[i].getTitle()}`;
    }
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

    UI.setAttributes(titleInputField, { type: "text", class: "title-input" });
    UI.setAttributes(messageInputField, { type: "text", class: "message-input" });
    UI.setAttributes(priorityContainer, { class: "priority-container" });
    UI.setAttributes(inputPriorityLow, { type: "radio" });
    UI.setAttributes(inputPriorityMedium, { type: "radio" });
    UI.setAttributes(inputPriorityHigh, { type: "radio" });
    UI.setAttributes(dueDateInput, { type: "date" });
    UI.setAttributes(addTaskIcon, { class: "material-symbols-outlined" });
    UI.setAttributes(cancelTaskIcon, { class: "material-symbols-outlined" });
  }

  static addTask() {
    const titleInput = "sasa";
    const messageInput = "sasasas";

    const task = new ToDo(titleInput, messageInput);

    activeProject().add(task);
    console.log(activeProject());
    console.log("after adding todo task ", projectManager);
  }

  static getMainContainer() {
    return document.querySelector(".main-container");
  }

  static getAddProjectContainer() {
    return document.querySelector(".add-project-container");
  }

  static getUserProjectListContainer() {
    return document.querySelector(".user-project-list");
  }

  static getProjectsButtonContainer() {
    return document.querySelector(".button-container");
  }

  static getProjectItemButton() {
    return document.querySelector(".project-item");
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

  static clear() {
    UI.clearMainContainer();
  }

  static clearMainContainer() {
    UI.getMainContainer().textContent = "";
  }

  static setAttributes(el, attrs) {
    Object.keys(attrs).forEach((key) => el.setAttribute(key, attrs[key]));
  }
}
