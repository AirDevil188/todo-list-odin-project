import { projectManager } from "../projectManager";
import { setData } from "../storage";

/* function that we use to deleteTasks based on data-id attribute */
export default function deleteTask(e) {
  projectManager.getListProject().map((project) => {
    if (typeof project.findById(e.target.dataset.id) !== "undefined") {
      project.remove(e.target.dataset.id);
    } else {
      return false;
    }
  });
  setData("projects", projectManager.projects);
}
