import { projectManager } from "../projectManager";
import { inboxProject } from "../project";
import { transformRawDataProjects, transformRawDataTasks } from "../storage";
import UI from "../ui";
import { updateRenderProjects, updateRenderTasks } from "./view";
import setActiveProject from "./activeProject";

/* based  on this function we control loading of the localStorage */

export function loadProjectManager() {
  if (localStorage.length !== 0) {
    transformRawDataProjects().map((project) => {
      projectManager.add(project);
      const toDoObjects = transformRawDataTasks(project);
      Object.assign(project.todos, toDoObjects);
      UI.assignInboxIDToTheButtons();
    });
    updateRenderProjects();
    updateRenderTasks(setActiveProject());
  } else {
    projectManager.add(inboxProject);
  }
}
