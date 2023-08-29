import { projectManager } from "../projectManager";

export default function delProject(e) {
  const indexOfObject = projectManager.projects.findIndex((project) => {
    return project.id == e.target.dataset.id;
  });
  console.log(indexOfObject);
  projectManager.remove(indexOfObject);
  console.log(projectManager);
}
