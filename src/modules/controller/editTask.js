import { projectManager } from "../projectManager";
import { renderTasks } from "./view";
import { setData } from "../storage";

export default function editTask(e) {
  const titleInput = document.querySelector("#title-input");
  const messageInput = document.querySelector("#message-input");
  const priorityInput = document.querySelector('input[type="radio"]:checked').value;
  const dueDateInput = document.querySelector("#task-date");

  projectManager.getListProject().map((project) => {
    if (typeof project.findById(e.target.dataset.id) !== "undefined") {
      console.log(project.findById(e.target.dataset.id));
      project.findById(e.target.dataset.id).setTitle(`${titleInput.value}`);
      project.findById(e.target.dataset.id).setMessage(`${messageInput.value}`);
      project.findById(e.target.dataset.id).setPriority(`${priorityInput}`);
      project.findById(e.target.dataset.id).setDueDate(`${dueDateInput.value}`);
    } else {
      return false;
    }

    renderTasks(project);
  });
  console.log(projectManager);
  setData("projects", projectManager.projects);
}