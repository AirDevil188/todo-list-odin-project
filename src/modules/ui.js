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

    mainContainer.appendChild(headingContainer);
    headingContainer.appendChild(headingToDo);

    if (headingToDo.textContent !== "Today" && headingToDo.textContent !== "This Week") {
      addToDoTaskButton.textContent = "Add Task";

      mainContainer.appendChild(addToDoTaskButton);
    } else {
      mainContainer.appendChild(headingContainer);
      headingContainer.appendChild(headingToDo);
    }
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
    console.log(e.target.parentNode.parentNode);
    e.target.parentNode.parentNode.remove();
  }

  //

  // tasks

  static appendTaskForm() {
    const taskFormContainer = document.createElement("div");
    const taskFormElement = document.createElement("form");

    // todo input properties

    const titleInputField = document.createElement("input");
    const messageInputField = document.createElement("input");

    const priorityListElement = document.createElement("select");

    const optionPriorityLow = document.createElement("option");
    const optionPriorityMedium = document.createElement("option");
    const optionPriorityHigh = document.createElement("option");

    const dueDateInput = document.createElement("input");

    const addTaskIcon = document.createElement("span");
    const cancelTaskIcon = document.createElement("span");

    //

    optionPriorityLow.textContent = "Low";
    optionPriorityMedium.textContent = "Medium";
    optionPriorityHigh.textContent = "High";

    addTaskIcon.textContent = "add_task";
    cancelTaskIcon.textContent = "cancel";

    UI.getContentContainer().appendChild(taskFormContainer);
    taskFormContainer.appendChild(taskFormElement);
    taskFormElement.appendChild(titleInputField);
    taskFormElement.appendChild(messageInputField);

    taskFormElement.appendChild(priorityListElement);
    priorityListElement.appendChild(optionPriorityLow);
    priorityListElement.appendChild(optionPriorityMedium);
    priorityListElement.appendChild(optionPriorityHigh);
    taskFormElement.appendChild(dueDateInput);
    taskFormElement.appendChild(addTaskIcon);
    taskFormElement.appendChild(cancelTaskIcon);

    UI.setAttributes(taskFormContainer, { class: "task-form-container" });
    UI.setAttributes(taskFormElement, { class: "task-form" });
    UI.setAttributes(titleInputField, { type: "text", id: "title-input", name: "title-input", placeholder: "Task title" });
    UI.setAttributes(messageInputField, { type: "text", id: "message-input", name: "message-input", placeholder: "Task message details" });
    UI.setAttributes(priorityListElement, { class: "priority-list" });
    UI.setAttributes(optionPriorityLow, { value: "low", selected: "selected" });
    UI.setAttributes(optionPriorityMedium, { value: "medium" });
    UI.setAttributes(optionPriorityHigh, { value: "high" });
    UI.setAttributes(dueDateInput, { type: "date", id: "task-date", name: "task-date" });
    UI.setAttributes(addTaskIcon, { type: "submit", class: "add-task-button material-symbols-outlined" });
    UI.setAttributes(cancelTaskIcon, { class: "cancel-task-button material-symbols-outlined" });
  }

  static alertMessage() {
    // const selectedTaskItemContainer = e.target.parentElement;
    const alertContainer = document.createElement("div");
    alertContainer.classList.add("alert");

    const strongTextElement = document.createElement("strong");
    this.getContentContainer().appendChild(alertContainer);
    alertContainer.appendChild(strongTextElement);
    strongTextElement.textContent = "Error! ";
    alertContainer.textContent = "Please fill out all input fields!";
  }

  static editTaskForm(e) {
    const selectedTask = setActiveProject().findById(e.target.dataset.id);
    const selectedTaskItemContainer = e.target.parentElement.parentElement;
    const taskFormContainerEdit = document.createElement("div");
    const taskFormElementEdit = document.createElement("form");

    // todo input properties
    const titleInputEditField = document.createElement("input");
    const messageInputEditField = document.createElement("input");

    const priorityListEditElement = document.createElement("select");

    const optionPriorityLow = document.createElement("option");
    const optionPriorityMedium = document.createElement("option");
    const optionPriorityHigh = document.createElement("option");

    const dueDateEditInput = document.createElement("input");

    const addTaskIconEdit = document.createElement("span");
    const cancelTaskIconEdit = document.createElement("span");

    //

    optionPriorityLow.textContent = "Low";
    optionPriorityMedium.textContent = "Medium";
    optionPriorityHigh.textContent = "High";

    addTaskIconEdit.textContent = "add_task";
    cancelTaskIconEdit.textContent = "cancel";

    titleInputEditField.value = selectedTask.getTitle();
    messageInputEditField.value = selectedTask.getMessage();

    selectedTaskItemContainer.insertAdjacentElement("afterend", taskFormContainerEdit);
    taskFormContainerEdit.appendChild(taskFormElementEdit);
    taskFormElementEdit.appendChild(titleInputEditField);
    taskFormElementEdit.appendChild(messageInputEditField);

    taskFormElementEdit.appendChild(priorityListEditElement);
    priorityListEditElement.appendChild(optionPriorityLow);
    priorityListEditElement.appendChild(optionPriorityMedium);
    priorityListEditElement.appendChild(optionPriorityHigh);
    taskFormElementEdit.appendChild(dueDateEditInput);
    taskFormElementEdit.appendChild(addTaskIconEdit);
    taskFormElementEdit.appendChild(cancelTaskIconEdit);

    UI.setAttributes(taskFormContainerEdit, { class: "edit-task-form-container", "data-id": `${e.target.dataset.id}` });
    UI.setAttributes(taskFormElementEdit, { class: "task-form", "data-id": `${e.target.dataset.id}` });
    UI.setAttributes(titleInputEditField, { type: "text", id: "title-input", name: "title-input", "data-id": `${e.target.dataset.id}`, placeholder: "Task title" });
    UI.setAttributes(messageInputEditField, { type: "text", id: "message-input", name: "message-input", "data-id": `${e.target.dataset.id}`, placeholder: "Task message details" });
    UI.setAttributes(priorityListEditElement, { class: "priority-list", "data-id": `${e.target.dataset.id}` });
    UI.setAttributes(optionPriorityLow, { value: "low", selected: "selected" });
    UI.setAttributes(optionPriorityMedium, { value: "medium" });
    UI.setAttributes(optionPriorityHigh, { value: "high" });
    UI.setAttributes(dueDateEditInput, { type: "date", id: "task-date", name: "task-date", "data-id": `${e.target.dataset.id}`, placeholder: "dd-mm-yyyy", value: "" });
    UI.setAttributes(addTaskIconEdit, { class: "edit-task-button material-symbols-outlined", "data-id": `${e.target.dataset.id}` });
    UI.setAttributes(cancelTaskIconEdit, { class: "cancel-task-button material-symbols-outlined", "data-id": `${e.target.dataset.id}` });
  }

  static toggleTaskVisibility(e, value) {
    const taskItem = Array.from(document.querySelectorAll(".task-item"));
    const indexOfTarget = setActiveProject().todos.find((task) => task.id === e.target.dataset.id);
    const selectedTaskItem = taskItem.find((task) => task.dataset.id === indexOfTarget.id);
    selectedTaskItem.style.display = `${value}`;
  }

  static deleteTaskFormFromTheDOM(element) {
    document.querySelector(element).remove();
  }

  static addTask() {
    const errorMessage = document.querySelector(".alert");
    const titleInput = document.querySelector("#title-input").value;
    const messageInput = document.querySelector("#message-input").value;
    const priorityInput = document.querySelector(".priority-list").value;
    const dueDateInput = document.querySelector("#task-date").value;

    const task = new ToDo(uuidv4(), titleInput, messageInput, priorityInput, dueDateInput);

    if (titleInput === "" || messageInput === "" || !dueDateInput || priorityInput == null) {
      UI.alertMessage();
      UI.hideAddTaskButton();
      return;
    } else if (UI.getContentContainer().contains(errorMessage)) {
      UI.deleteTaskFormFromTheDOM(".task-form-container");
      UI.appendAddTaskButton();
      errorMessage.remove();
    } else {
      UI.deleteTaskFormFromTheDOM(".task-form-container");
      UI.appendAddTaskButton();
    }

    setActiveProject().add(task);
    console.log(projectManager);
    setActiveProject().sortTasksByDate();
    setData("projects", projectManager.projects);

    const iconsContainer = document.createElement("div");
    const deleteIcon = document.createElement("span");
    const editIcon = document.createElement("span");
    const taskContainer = document.createElement("div");
    const titleTask = document.createElement("h3");
    const messageTask = document.createElement("p");
    const rightSideContainer = document.createElement("div");
    const priorityTask = document.createElement("p");
    const dueDateTask = document.createElement("p");

    UI.setAttributes(iconsContainer, { class: "left-side-container", "data-id": `${task.id}` });
    UI.setAttributes(deleteIcon, { class: "material-symbols-outlined delete-button", "data-id": `${task.id}` });
    UI.setAttributes(editIcon, { class: "material-symbols-outlined edit-button", "data-id": `${task.id}` });
    UI.setAttributes(taskContainer, { class: "task-item", "data-id": `${task.id}` });
    UI.setAttributes(titleTask, { class: "title-task", "data-id": `${task.id}` });
    UI.setAttributes(messageTask, { class: "task-message", "data-id": `${task.id}` });

    UI.setAttributes(rightSideContainer, { class: "right-side-container", "data-id": `${task.id}` });
    UI.setAttributes(priorityTask, { class: "task-priority", "data-id": `${task.id}` });
    UI.setAttributes(dueDateTask, { class: "task-date", "data-id": `${task.id}` });

    editIcon.textContent = "edit";
    deleteIcon.textContent = "delete";

    messageTask.style.display = "none";

    UI.getContentContainer().appendChild(taskContainer);
    taskContainer.appendChild(iconsContainer);
    iconsContainer.appendChild(deleteIcon);
    iconsContainer.appendChild(editIcon);
    iconsContainer.appendChild(titleTask);
    taskContainer.appendChild(messageTask);
    taskContainer.appendChild(rightSideContainer);
    rightSideContainer.appendChild(dueDateTask);
    rightSideContainer.appendChild(priorityTask);

    console.log(projectManager);

    renderTasks(setActiveProject());
  }

  static expandedTask() {}

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
