import Project, { inboxProject } from "./project";
import ProjectManager, { projectManager } from "./projectManager";
import ToDo from "./todo";

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

  static getMainContainer() {
    return document.querySelector(".main-container");
  }

  static getButtonContainer() {
    return document.querySelector(".button-container");
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

  static addProject() {
    const projectInputField = document.querySelector(".input-project-popup").value;
    console.log(projectInputField);
    const project = new Project(`${projectInputField}`);
    projectManager.add(project);
  }

  static todoForm() {}

  static initializeButtons() {
    UI.getMainContainer().addEventListener("click", (e) => {
      if (e.target.classList.contains("add-task-to-do-form-button")) {
        console.log("fired!!");
      }
    });

    UI.getButtonContainer().addEventListener("click", (e) => {
      if (e.target.classList.contains("add-project-button-add")) {
        UI.addProject();
        console.log(projectManager);
      }
    });
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

  static setAttributes(el, attrs) {
    Object.keys(attrs).forEach((key) => el.setAttribute(key, attrs[key]));
  }
}
