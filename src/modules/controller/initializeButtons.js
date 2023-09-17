import UI from "../ui";
import setActiveProject from "./activeProject";
import deleteProject from "./deleteProject";
import deleteTask from "./deleteTask";
import editTask from "./editTask";
import { updateRenderTasks } from "./view";
import { filterByThisWeek, filterByToday } from "./filterTasks";

/* function that adds event listeners to all buttons on our ToDo page */

export default function initializeButtons() {
  const toDoButtons = document.querySelectorAll(".default-menu-todo-buttons");
  const headerContainer = document.querySelector(".header-container");
  const navMenu = document.querySelector(".navigation-menu");
  const mainContainer = document.querySelector(".main-container");
  const leftSideContentContainer = document.querySelector("#left-side-content-container");
  const spanToDoButtons = document.querySelectorAll(".material-symbols-outlined");
  const spanAndButtons = [...toDoButtons, ...spanToDoButtons];

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
    if (e.target.classList.contains("hamburger-button")) {
      UI.toggleHamburgerMenu(e);
    }
  });

  leftSideContentContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("clicked") && e.target.classList.contains("default-menu-todo-buttons") && leftSideContentContainer.classList.contains("expanded-nav")) {
      UI.toggleHamburgerMenu();
    }
  });

  headerContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("dark-mode")) {
      toggleDarkMode(e);
      UI.darkMode();
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

      /* event listener that listens if esc key is pressed if it is pressed then delete "modal element from the dom */
      document.querySelector(".modal").addEventListener("keydown", (e) => {
        const keyName = e.key;
        if (keyName === "Escape") {
          document.querySelector(".modal").remove();
          UI.appendAddTaskButton();
        }
      });

      document.querySelector(".modal").showModal();
      UI.hideAddTaskButton();
    }
  });

  mainContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("task-item")) {
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
    if (e.target.classList.contains("project-delete-button")) {
      e.target.parentElement.remove();
      UI.createAddProjectButton();
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
      // document.querySelector(".modal").remove();
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
      editTask(e);
    }
  });

  mainContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("cancel-edit-task-button")) {
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

      document.querySelector(".edit-modal").addEventListener("keydown", (e) => {
        /* event listener that listens if esc key is pressed if it is pressed then delete "modal element from the dom */
        const keyName = e.key;
        if (keyName === "Escape") {
          document.querySelector(".edit-modal").remove();
          UI.appendAddTaskButton();
        }
      });
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

  /* function for our activeProject function that we use to determine which project is active */
  function toggleActiveButton(e) {
    const projectButtons = document.querySelectorAll(".project-button");
    projectButtons.forEach((button) => button.classList.remove("active"));
    e.target.classList.toggle("active");
  }

  /* also, this is our function so that we toggle class of "clicked" on our project and navigation buttons, based on that we add background color to element that is clicked */
  function toggleClickedButton(e) {
    const navButtons = document.querySelectorAll(".default-menu-todo-buttons");
    navButtons.forEach((button) => button.classList.remove("clicked"));
    e.target.classList.toggle("clicked");
  }

  /* toggle class for the dark mode */
  function toggleDarkMode(e) {
    const darkModeButton = document.querySelector(".dark-mode");
    e.target.classList.toggle("dark-mode-active");
  }
}
