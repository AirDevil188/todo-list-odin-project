import UI from "../ui";
import deleteProject from "./deleteProject";
export default function initializeButtons() {
  UI.getUserProjectListContainer().addEventListener("click", (e) => {
    if (e.target.classList.contains("add-project-input-button")) {
      UI.appendProjectForm();
      UI.deleteAddProjectButton();
    }
  });

  UI.getMainContainer().addEventListener("click", (e) => {
    if (e.target.classList.contains("add-task-to-do-form-button")) {
      UI.appendTaskForm();
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
      UI.loadToDoContent(`${e.target.textContent}`);
    }
  });
}
