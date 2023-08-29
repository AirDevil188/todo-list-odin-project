import Project from "./project";

export default class ProjectManager {
  constructor(title, projects) {
    this.title = title;
    this.projects = [];
  }
  add(project) {
    this.projects.push(project);
  }

  remove(projectID) {
    this.projects = this.projects.filter((project) => project.id !== projectID);
  }
}

export const projectManager = new ProjectManager("All Projects");
