import { projectManager } from "../projectManager";

/* activeProject module that we use to determine which project is active, and base on that information we now where to push task objects to which project. */
export default function setActiveProject() {
  const projectActiveButton = document.querySelector(".active");
  const projectID = projectManager.projects.find((project) => project.id === projectActiveButton.dataset.id);
  const projectActive = projectManager.findById(projectID.id);

  return projectActive;
}
