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

  setTitle(value) {
    this.title = value;
  }
  findById(id) {
    return this.projects.find((project) => project.id === id);
  }
  getListProject() {
    return this.projects;
  }
}
export let projectManager = new ProjectManager("All Projects");
