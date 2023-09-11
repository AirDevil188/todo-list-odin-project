import { projectManager } from "../projectManager";

export default function setActiveProject() {
  const projectActiveButton = document.querySelector(".active");
  const projectID = projectManager.projects.find((project) => project.id === projectActiveButton.dataset.id);
  const projectActive = projectManager.findById(projectID.id);

  return projectActive;
}
