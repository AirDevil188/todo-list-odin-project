import { projectManager } from "../projectManager";
import { setData } from "../storage";

export default function deleteProject(e) {
  const projectID = projectManager.projects.find((project) => project.id === e.target.dataset.id);
  projectManager.remove(projectID.id);
  setData("projects", projectManager.projects);

  console.log(projectManager);
}
