import Project from "./project";
import { projectManager } from "./projectManager";
import ToDo from "./todo";
import initializeButtons from "./controller/initializeButtons";
import setActiveProject from "./controller/activeProject";
import { renderProjects, renderTasks } from "./controller/view";
import { setData } from "./storage";
import { v4 as uuidv4 } from "uuid";
import { loadProjectManager } from "./controller/loadProjectManager";

export default class UI {
  static loadHome() {
    UI.openToDoCategoryPage("Inbox", document.querySelector("#button-inbox"));
    loadProjectManager();
    initializeButtons();
    UI.assignInboxIDToTheButtons();
  }

  static assignInboxIDToTheButtons() {
    const inboxProjectID = Array.from(projectManager.projects)[0].id;
    let inboxButton = document.querySelector("#button-inbox");
    let inboxSpanIcon = document.querySelector(".inbox-icon");
    inboxButton.setAttribute("data-id", `${inboxProjectID}`);
    inboxSpanIcon.setAttribute("data-id", `${inboxProjectID}`);
  }

  static loadToDoContent(page) {
    const mainContainer = document.querySelector(".main-container");
    const contentContainer = document.createElement("div");
    const headingContainer = document.createElement("div");
    const headingToDo = document.createElement("h1");
    const addToDoTaskButton = document.createElement("button");

    contentContainer.className = "content-container";
    headingContainer.className = "heading-container";
    addToDoTaskButton.className = "add-task-to-do-form-button";

    headingToDo.textContent = `${page}`;
    addToDoTaskButton.textContent = "Add Task";

    mainContainer.appendChild(headingContainer);
    headingContainer.appendChild(headingToDo);
    mainContainer.appendChild(addToDoTaskButton);

    mainContainer.appendChild(contentContainer);
  }

  // projects

  static appendProjectForm() {
    const projectCreationFormContainer = document.createElement("div");
    const projectTitleInput = document.createElement("input");
    const addProjectIcon = document.createElement("span");
    const cancelProjectIcon = document.createElement("span");

    UI.getUserProjectListContainer().appendChild(projectCreationFormContainer);
    projectCreationFormContainer.appendChild(projectTitleInput);
    projectCreationFormContainer.appendChild(addProjectIcon);
    projectCreationFormContainer.appendChild(cancelProjectIcon);

    addProjectIcon.textContent = "add_task";
    cancelProjectIcon.textContent = "cancel";

    UI.setAttributes(projectCreationFormContainer, { class: "project-creation-form-container" });
    UI.setAttributes(addProjectIcon, { class: "material-symbols-outlined  add-project-button-add" });
    UI.setAttributes(cancelProjectIcon, { class: "material-symbols-outlined delete-button" });
    UI.setAttributes(projectTitleInput, { type: "input", class: "input-project-popup" });
  }

  static addProject() {
    const projectInputField = document.querySelector(".input-project-popup").value;
    const project = new Project(uuidv4(), `${projectInputField}`, []);
    projectManager.add(project);
    setData("projects", projectManager.projects);

    const projectContainer = document.createElement("div");
    const projectButton = document.createElement("button");
    const deleteButton = document.createElement("span");

    deleteButton.textContent = "delete";

    UI.getUserProjectListContainer().appendChild(projectContainer);
    projectContainer.appendChild(deleteButton);
    projectContainer.appendChild(projectButton);

    UI.setAttributes(projectContainer, { class: "project-item", "data-id": `${project.id}` });
    UI.setAttributes(projectButton, { class: "project-button project", "data-id": `${project.id}` });
    UI.setAttributes(deleteButton, { class: "material-symbols-outlined delete-button", "data-id": `${project.id}` });

    console.log(projectManager);
    renderProjects();
  }

  static createAddProjectButton() {
    const addProjectButton = document.createElement("button");
    UI.setAttributes(addProjectButton, { class: "add-project-input-button" });

    addProjectButton.textContent = "+ Add Project";

    UI.getUserProjectListContainer().appendChild(addProjectButton);
  }

  static deleteAddProjectButton() {
    document.querySelector(".add-project-input-button").remove();
  }

  static deleteProjectCreationFormContainer() {
    document.querySelector(".project-creation-form-container").remove();
  }

  static deleteProjectFromTheDOM(e) {
    e.target.parentElement.remove();
  }

  static deleteTaskFromTheDOM(e) {
    e.target.parentElement.remove();
  }

  //

  // tasks

  static appendTaskForm() {
    const taskFormContainer = document.createElement("div");
    const taskFormElement = document.createElement("form");

    // todo input properties
    const titleLabel = document.createElement("label");
    const messageLabel = document.createElement("label");

    const titleInputField = document.createElement("input");
    const messageInputField = document.createElement("input");

    const priorityContainer = document.createElement("div");

    const labelPriorityLow = document.createElement("label");
    const labelPriorityMedium = document.createElement("label");
    const labelPriorityHigh = document.createElement("label");

    const inputPriorityLow = document.createElement("input");
    const inputPriorityMedium = document.createElement("input");
    const inputPriorityHigh = document.createElement("input");

    const dueDateInput = document.createElement("input");
    const dueDateLabel = document.createElement("label");

    const addTaskIcon = document.createElement("span");
    const cancelTaskIcon = document.createElement("span");

    //

    titleLabel.textContent = "TITLE: ";
    messageLabel.textContent = "DETAILS: ";

    labelPriorityLow.textContent = "LOW";
    labelPriorityMedium.textContent = "MEDIUM";
    labelPriorityHigh.textContent = "HIGH";

    dueDateLabel.textContent = "DATE: ";

    addTaskIcon.textContent = "add_task";
    cancelTaskIcon.textContent = "cancel";

    UI.getContentContainer().appendChild(taskFormContainer);
    taskFormContainer.appendChild(taskFormElement);
    taskFormElement.appendChild(titleLabel);
    taskFormElement.appendChild(messageLabel);
    titleLabel.appendChild(titleInputField);
    messageLabel.appendChild(messageInputField);

    taskFormElement.appendChild(priorityContainer);
    priorityContainer.appendChild(labelPriorityLow);
    priorityContainer.appendChild(labelPriorityMedium);
    priorityContainer.appendChild(labelPriorityHigh);
    labelPriorityLow.appendChild(inputPriorityLow);
    labelPriorityMedium.appendChild(inputPriorityMedium);
    labelPriorityHigh.appendChild(inputPriorityHigh);
    taskFormElement.appendChild(dueDateLabel);
    dueDateLabel.appendChild(dueDateInput);
    taskFormElement.appendChild(addTaskIcon);
    taskFormElement.appendChild(cancelTaskIcon);

    UI.setAttributes(taskFormContainer, { class: "task-form-container" });
    UI.setAttributes(taskFormElement, { class: "task-form" });
    UI.setAttributes(titleLabel, { for: "title-input" });
    UI.setAttributes(titleInputField, { type: "text", id: "title-input", name: "title-input" });
    UI.setAttributes(messageLabel, { for: "message-input" });
    UI.setAttributes(messageInputField, { type: "text", id: "message-input", name: "message-input" });
    UI.setAttributes(priorityContainer, { class: "priority-container" });
    UI.setAttributes(labelPriorityLow, { for: "low" });
    UI.setAttributes(inputPriorityLow, { type: "radio", id: "low", value: "low", name: "priority" });
    UI.setAttributes(labelPriorityMedium, { for: "medium" });
    UI.setAttributes(inputPriorityMedium, { type: "radio", id: "medium", value: "medium", name: "priority" });
    UI.setAttributes(inputPriorityHigh, { for: "high" });
    UI.setAttributes(inputPriorityHigh, { type: "radio", id: "high", value: "high", name: "priority" });
    UI.setAttributes(dueDateLabel, { for: "task-date" });
    UI.setAttributes(dueDateInput, { type: "date", id: "task-date", name: "task-date" });
    UI.setAttributes(addTaskIcon, { class: "add-task-button material-symbols-outlined" });
    UI.setAttributes(cancelTaskIcon, { class: "cancel-task-button material-symbols-outlined" });
  }

  static editTaskForm(e) {
    const selectedTask = setActiveProject().findById(e.target.dataset.id);
    const selectedTaskItemContainer = e.target.parentElement;
    const taskFormContainerEdit = document.createElement("div");
    const taskFormElementEdit = document.createElement("form");

    // todo input properties
    const titleLabelEdit = document.createElement("label");
    const messageLabelEdit = document.createElement("label");

    const titleInputFieldEdit = document.createElement("input");
    const messageInputFieldEdit = document.createElement("input");

    const priorityContainerEdit = document.createElement("div");

    const labelPriorityLowEdit = document.createElement("label");
    const labelPriorityMediumEdit = document.createElement("label");
    const labelPriorityHighEdit = document.createElement("label");

    const inputPriorityLowEdit = document.createElement("input");
    const inputPriorityMediumEdit = document.createElement("input");
    const inputPriorityHighEdit = document.createElement("input");

    const dueDateInputEdit = document.createElement("input");
    const dueDateLabelEdit = document.createElement("label");

    const addTaskIconEdit = document.createElement("span");
    const cancelTaskIconEdit = document.createElement("span");

    //

    titleLabelEdit.textContent = "TITLE: ";
    messageLabelEdit.textContent = "DETAILS: ";

    labelPriorityLowEdit.textContent = "LOW";
    labelPriorityMediumEdit.textContent = "MEDIUM";
    labelPriorityHighEdit.textContent = "HIGH";

    dueDateLabelEdit.textContent = "DATE: ";

    addTaskIconEdit.textContent = "add_task";
    cancelTaskIconEdit.textContent = "cancel";

    titleInputFieldEdit.value = selectedTask.getTitle();
    messageInputFieldEdit.value = selectedTask.getMessage();

    console.log(e.target.parentElement);

    selectedTaskItemContainer.insertAdjacentElement("afterend", taskFormContainerEdit);
    taskFormContainerEdit.appendChild(taskFormElementEdit);
    taskFormElementEdit.appendChild(titleLabelEdit);
    taskFormElementEdit.appendChild(messageLabelEdit);
    titleLabelEdit.appendChild(titleInputFieldEdit);
    messageLabelEdit.appendChild(messageInputFieldEdit);

    taskFormElementEdit.appendChild(priorityContainerEdit);
    priorityContainerEdit.appendChild(labelPriorityLowEdit);
    priorityContainerEdit.appendChild(labelPriorityMediumEdit);
    priorityContainerEdit.appendChild(labelPriorityHighEdit);
    labelPriorityLowEdit.appendChild(inputPriorityLowEdit);
    labelPriorityMediumEdit.appendChild(inputPriorityMediumEdit);
    labelPriorityHighEdit.appendChild(inputPriorityHighEdit);
    taskFormElementEdit.appendChild(dueDateLabelEdit);
    dueDateLabelEdit.appendChild(dueDateInputEdit);
    taskFormElementEdit.appendChild(addTaskIconEdit);
    taskFormElementEdit.appendChild(cancelTaskIconEdit);

    UI.setAttributes(taskFormContainerEdit, { class: "edit-task-form-container", "data-id": `${e.target.dataset.id}` });
    UI.setAttributes(taskFormElementEdit, { class: "task-form", "data-id": `${e.target.dataset.id}` });
    UI.setAttributes(titleLabelEdit, { for: "title-input", "data-id": `${e.target.dataset.id}` });
    UI.setAttributes(titleInputFieldEdit, { type: "text", id: "title-input", name: "title-input", "data-id": `${e.target.dataset.id}` });
    UI.setAttributes(messageLabelEdit, { for: "message-input" });
    UI.setAttributes(messageInputFieldEdit, { type: "text", id: "message-input", name: "message-input", "data-id": `${e.target.dataset.id}` });
    UI.setAttributes(priorityContainerEdit, { class: "priority-container", "data-id": `${e.target.dataset.id}` });
    UI.setAttributes(labelPriorityLowEdit, { for: "low" });
    UI.setAttributes(inputPriorityLowEdit, { type: "radio", id: "low", value: "low", "data-id": `${e.target.dataset.id}`, name: "priority" });
    UI.setAttributes(labelPriorityMediumEdit, { for: "medium" });
    UI.setAttributes(inputPriorityMediumEdit, { type: "radio", id: "medium", value: "medium", "data-id": `${e.target.dataset.id}`, name: "priority" });
    UI.setAttributes(inputPriorityHighEdit, { for: "high" });
    UI.setAttributes(inputPriorityHighEdit, { type: "radio", id: "high", value: "high", "data-id": `${e.target.dataset.id}`, name: "priority" });
    UI.setAttributes(dueDateLabelEdit, { for: "task-date" });
    UI.setAttributes(dueDateInputEdit, { type: "date", id: "task-date", name: "task-date", "data-id": `${e.target.dataset.id}`, placeholder: "dd-mm-yyyy", value: "" });
    UI.setAttributes(addTaskIconEdit, { class: "edit-task-button material-symbols-outlined", "data-id": `${e.target.dataset.id}` });
    UI.setAttributes(cancelTaskIconEdit, { class: "cancel-task-button material-symbols-outlined", "data-id": `${e.target.dataset.id}` });
  }

  static toggleTaskVisibility(e, value) {
    const taskItem = Array.from(document.querySelectorAll(".task-item"));
    const indexOfTarget = setActiveProject().todos.find((task) => task.id === e.target.dataset.id);
    const selectedTaskItem = taskItem.find((task) => task.dataset.id === indexOfTarget.id);
    selectedTaskItem.style.display = `${value}`;
  }

  static deleteTaskFormFromTheDOM(e) {
    e.target.parentElement.parentElement.remove();
  }

  static addTask() {
    const titleInput = document.querySelector("#title-input").value;
    const messageInput = document.querySelector("#message-input").value;
    const priorityInput = document.querySelector('input[type="radio"]:checked').value;
    const dueDateInput = document.querySelector("#task-date").value;

    const task = new ToDo(uuidv4(), titleInput, messageInput, priorityInput, dueDateInput);

    setActiveProject().add(task);
    setActiveProject().sortTasksByDate();
    setData("projects", projectManager.projects);

    const taskContainer = document.createElement("div");
    const titleTask = document.createElement("h3");
    const messageTask = document.createElement("p");
    const priorityTask = document.createElement("p");
    const dueDateTask = document.createElement("p");
    const deleteIcon = document.createElement("span");
    const editIcon = document.createElement("span");

    UI.setAttributes(taskContainer, { class: "task-item", "data-id": `${task.id}` });
    UI.setAttributes(titleTask, { class: "title-task", "data-id": `${task.id}` });

    UI.setAttributes(messageTask, { class: "task-message", "data-id": `${task.id}` });
    UI.setAttributes(priorityTask, { class: "task-priority", "data-id": `${task.id}` });
    UI.setAttributes(dueDateTask, { class: "task-date", "data-id": `${task.id}` });
    UI.setAttributes(deleteIcon, { class: "material-symbols-outlined delete-button", "data-id": `${task.id}` });
    UI.setAttributes(editIcon, { class: "material-symbols-outlined edit-button", "data-id": `${task.id}` });

    editIcon.textContent = "edit";
    deleteIcon.textContent = "delete";

    UI.getContentContainer().appendChild(taskContainer);
    taskContainer.appendChild(titleTask);
    taskContainer.appendChild(messageTask);
    taskContainer.appendChild(priorityTask);
    taskContainer.appendChild(dueDateTask);
    taskContainer.appendChild(editIcon);
    taskContainer.appendChild(deleteIcon);

    console.log(projectManager);

    renderTasks(setActiveProject());
  }

  static hideAddTaskButton() {
    document.querySelector(".add-task-to-do-form-button").style.display = "none";
  }

  static appendAddTaskButton() {
    const addTaskButton = document.querySelector(".add-task-to-do-form-button");
    addTaskButton.style.display = "block";
    addTaskButton.textContent = "Add Task";
    UI.getMainContainer().appendChild(addTaskButton);
  }

  static getMainContainer() {
    return document.querySelector(".main-container");
  }

  static getContentContainer() {
    return document.querySelector(".content-container");
  }

  static getAddToDoTaskButton() {
    return document.querySelector(".add-task-to-do-form-button");
  }

  static getUserProjectListContainer() {
    return document.querySelector(".user-project-list");
  }

  static openToDoCategoryPage(page, pageButton) {
    UI.loadToDoContent(page);
  }

  static openInboxPage() {
    UI.openToDoCategoryPage("Inbox", this);
  }

  static openTodayPage() {
    UI.openToDoCategoryPage("Today", this);
  }

  static openThisWeekPage() {
    UI.openToDoCategoryPage("This Week", this);
  }

  static clear() {
    UI.clearMainContainer();
  }

  static clearMainContainer() {
    UI.getMainContainer().textContent = "";
  }

  static setAttributes(el, attrs) {
    Object.keys(attrs).forEach((key) => el.setAttribute(key, attrs[key]));
  }
}
