import { projectManager } from "../projectManager";

export default function setActiveProject() {
  const projectActiveButton = document.querySelector(".active");

  const projectID = projectManager.projects.find((project) => project.id === projectActiveButton.dataset.id);
  // console.log(projectActiveButton);
  // console.log(projectID.id);
  const projectActive = projectManager.findById(projectID.id);

  console.log(projectActive);
  return projectActive;
}
