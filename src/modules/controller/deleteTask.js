import { projectManager } from "../projectManager";
import setActiveProject from "./activeProject";

export default function deleteTask(e) {
  const taskID = setActiveProject().todos.find((task) => task.id === e.target.dataset.id);
  setActiveProject().remove(taskID.id);
}
