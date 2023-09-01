import UI from "../ui";
import { activeProject } from "./activeProject";
import deleteProject from "./deleteProject";
import test from "./activeProject";

export default function initializeButtons() {
  const toDoButtons = document.querySelectorAll(".default-menu-todo-buttons");
  const spanToDoButtons = document.querySelectorAll(".material-symbols-outlined");
  const spanAndButtons = [...toDoButtons, ...spanToDoButtons];

  spanAndButtons.forEach(function (button) {
    button.addEventListener("click", (e) => {
      switch (e.target.getAttribute("value")) {
        case "Inbox":
          toggleActiveButton(e);
          UI.clear();
          UI.openInboxPage();
          test();
          break;
        case "Today":
          UI.clear();
          UI.openTodayPage();
          break;
        case "This Week":
          UI.clear();
          UI.openThisWeekPage();
          break;
      }
    });
  });

  UI.getUserProjectListContainer().addEventListener("click", (e) => {
    if (e.target.classList.contains("add-project-input-button")) {
      UI.appendProjectForm();
      UI.deleteAddProjectButton();
    }
  });

  UI.getMainContainer().addEventListener("click", (e) => {
    if (e.target.classList.contains("add-task-to-do-form-button")) {
      UI.appendTaskForm();
      UI.addTask();
    }
  });

  UI.getUserProjectListContainer().addEventListener("click", (e) => {
    if (e.target.classList.contains("add-project-button-add")) {
      UI.addProject();
      UI.createAddProjectButton();
      UI.deleteProjectCreationFormContainer();
    }
  });

  UI.getUserProjectListContainer().addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-button")) {
      deleteProject(e);
      UI.deleteProjectFromTheDOM(e);
    }
  });
  UI.getUserProjectListContainer().addEventListener("click", (e) => {
    if (e.target.classList.contains("project-button")) {
      UI.clear();
      toggleActiveButton(e);
      UI.loadToDoContent(`${e.target.textContent}`);
      test(e);
    }
  });

  function toggleActiveButton(e) {
    const projectButtons = document.querySelectorAll(".project-button");

    projectButtons.forEach((button) => button.classList.remove("active"));
    e.target.classList.toggle("active");
  }
}
