import UI from "../ui";
import setActiveProject from "./activeProject";
import deleteProject from "./deleteProject";
import deleteTask from "./deleteTask";
import editTask from "./editTask";
import { updateRenderTasks } from "./view";
import { filterByThisWeek, filterByToday } from "./filterTasks";

export default function initializeButtons() {
  const toDoButtons = document.querySelectorAll(".default-menu-todo-buttons");
  const headerContainer = document.querySelector(".header-container");
  const navMenu = document.querySelector(".navigation-menu");
  const mainContainer = document.querySelector(".main-container");
  const spanToDoButtons = document.querySelectorAll(".material-symbols-outlined");
  const spanAndButtons = [...toDoButtons, ...spanToDoButtons];
  const openModal = document.querySelector(".open-button");
  const closeModal = document.querySelector(".close-button");

  spanAndButtons.forEach(function (button) {
    button.addEventListener("click", (e) => {
      switch (e.target.getAttribute("value")) {
        case "Inbox":
          UI.assignInboxIDToTheButtons();
          toggleActiveButton(e);
          UI.clear();
          UI.openInboxPage();
          setActiveProject();
          updateRenderTasks(setActiveProject());
          break;
        case "Today":
          UI.clear();
          UI.openTodayPage();
          filterByToday();
          break;
        case "This Week":
          UI.clear();
          UI.openThisWeekPage();
          filterByThisWeek();
          break;
      }
    });
  });

  headerContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("hamburger")) {
      UI.toggleHamburgerMenu(e);
    }
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
      document.querySelector(".task-form").reset();
      document.querySelector(".modal").showModal();
      UI.hideAddTaskButton();
    }
  });

  mainContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("task-item") || e.target.parentElement.parentElement.classList.contains("task-item") || e.target.parentElement.classList.contains("task-item")) {
      UI.expandedTask(e);
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
      UI.appendAddTaskButton();
      document.querySelector(".modal").remove();
    }
  });

  mainContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("cancel-task-button")) {
      document.querySelector(".modal").close();
      UI.appendAddTaskButton();
      document.querySelector(".modal").remove();
    }
  });

  mainContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("edit-task-button")) {
      console.log(e.target);
      editTask(e);
      document.querySelector(".edit-modal").remove();
    }
  });

  mainContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("-cancel-edit-task-button")) {
      document.querySelector(".edit-modal").close();
      document.querySelector(".edit-modal").remove();
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
      UI.editTaskForm(e);
      document.querySelector(".edit-modal").showModal();
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
      updateRenderTasks(setActiveProject());
    }
  });

  navMenu.addEventListener("click", (e) => {
    if (e.target.tagName == "BUTTON") {
      toggleClickedButton(e);
    }
  });

  function toggleActiveButton(e) {
    const projectButtons = document.querySelectorAll(".project-button");

    projectButtons.forEach((button) => button.classList.remove("active"));
    e.target.classList.toggle("active");
  }
  function toggleClickedButton(e) {
    const navButtons = document.querySelectorAll(".default-menu-todo-buttons");
    navButtons.forEach((button) => button.classList.remove("clicked"));
    e.target.classList.toggle("clicked");
  }
}
