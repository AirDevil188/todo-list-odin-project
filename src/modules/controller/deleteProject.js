import { projectManager } from "../projectManager";
import { setData } from "../storage";

/* function that we use to deleteProjects based on data-attribute id */
export default function deleteProject(e) {
  const projectID = projectManager.projects.find((project) => project.id === e.target.dataset.id);
  projectManager.remove(projectID.id);
  setData("projects", projectManager.projects);
}
