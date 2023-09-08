import UI from "../ui";
import setActiveProject from "./activeProject";
import deleteProject from "./deleteProject";
import deleteTask from "./deleteTask";
import editTask from "./editTask";
import { updateRenderTasks } from "./view";

export default function initializeButtons() {
  const toDoButtons = document.querySelectorAll(".default-menu-todo-buttons");
  const mainContainer = document.querySelector(".main-container");
  const spanToDoButtons = document.querySelectorAll(".material-symbols-outlined");
  const spanAndButtons = [...toDoButtons, ...spanToDoButtons];

  spanAndButtons.forEach(function (button) {
    button.addEventListener("click", (e) => {
      switch (e.target.getAttribute("value")) {
        case "Inbox":
          toggleActiveButton(e);
          UI.clear();
          UI.openInboxPage();
          setActiveProject();
          updateRenderTasks();
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

  mainContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("add-task-to-do-form-button")) {
      UI.appendTaskForm();
      UI.hideAddTaskButton();
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
  mainContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("add-task-button")) {
      UI.addTask();
      UI.deleteTaskFormFromTheDOM(e);
      UI.appendAddTaskButton();
    }
  });

  mainContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("edit-task-button")) {
      editTask(e);
      UI.deleteTaskFormFromTheDOM(e);
      UI.toggleTaskVisibility(e, "block");
    }
  });

  mainContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-button")) {
      deleteTask(e);
      UI.deleteTaskFromTheDOM(e);
    }
  });

  mainContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("edit-button")) {
      UI.toggleTaskVisibility(e, "none");
      UI.editTaskForm(e);
    }
  });

  UI.getUserProjectListContainer().addEventListener("click", (e) => {
    if (e.target.classList.contains("project-button")) {
      UI.clear();
      toggleActiveButton(e);
      UI.loadToDoContent(`${e.target.textContent}`);
      UI.hideAddTaskButton();
      setActiveProject(e);
      UI.appendAddTaskButton();
      updateRenderTasks();
    }
  });

  function toggleActiveButton(e) {
    const projectButtons = document.querySelectorAll(".project-button");

    projectButtons.forEach((button) => button.classList.remove("active"));
    e.target.classList.toggle("active");
  }
}
