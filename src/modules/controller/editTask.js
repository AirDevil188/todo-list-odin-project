import setActiveProject from "./activeProject";
import { projectManager } from "../projectManager";
import { renderTasks } from "./view";

export default function editTask(e) {
  const taskID = setActiveProject().todos.find((task) => task.id === e.target.dataset.id);
  console.log(taskID);

  const titleInput = document.querySelector("#title-input");
  const messageInput = document.querySelector("#message-input");
  const priorityInput = document.querySelector('input[type="radio"]:checked').value;
  const dueDateInput = document.querySelector("#task-date");
  console.log(titleInput.value);

  taskID.setTitle(`${titleInput.value}`);
  taskID.setMessage(`${messageInput.value}`);
  taskID.setPriority(`${priorityInput}`);
  taskID.setDueDate(`${dueDateInput.value}`);

  console.log(projectManager);
  renderTasks();
}
