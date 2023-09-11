import { projectManager } from "../projectManager";
import { setData } from "../storage";

export default function deleteTask(e) {
  projectManager.getListProject().map((project) => {
    if (typeof project.findById(e.target.dataset.id) !== "undefined") {
      project.remove(e.target.dataset.id);
    } else {
      return false;
    }
  });
  console.log(projectManager);
  setData("projects", projectManager.projects);
}
