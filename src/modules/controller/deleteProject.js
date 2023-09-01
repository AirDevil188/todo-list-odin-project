import { projectManager } from "../projectManager";

export default function deleteProject(e) {
  const projectID = projectManager.projects.find((project) => project.id === e.target.dataset.id);
  projectManager.remove(projectID.id);

  console.log(projectManager);
}
