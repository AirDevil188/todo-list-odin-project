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
    const divider = document.createElement("hr");
    const addToDoTaskButton = document.createElement("button");

    contentContainer.className = "content-container";
    headingContainer.className = "heading-container";
    addToDoTaskButton.className = "add-task-to-do-form-button";
    addToDoTaskButton.classList.add("material-symbols-outlined");

    headingToDo.textContent = `${page}`;

    mainContainer.appendChild(headingContainer);
    headingContainer.appendChild(headingToDo);

    if (headingToDo.textContent !== "Today" && headingToDo.textContent !== "This Week") {
      headingContainer.appendChild(divider);
      addToDoTaskButton.textContent = "add";

      mainContainer.appendChild(addToDoTaskButton);
    } else {
      mainContainer.appendChild(headingContainer);
      headingContainer.appendChild(headingToDo);
      headingContainer.appendChild(divider);
    }
    mainContainer.appendChild(contentContainer);
  }

  static toggleHamburgerMenu() {
    const leftSideContentContainer = document.querySelector(".left-side-content-container");
    if (leftSideContentContainer.classList.contains("expanded-nav")) {
      leftSideContentContainer.classList.remove("expanded-nav");
    } else {
      leftSideContentContainer.classList.add("expanded-nav");
    }
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
    UI.setAttributes(projectButton, { class: "project-button project default-menu-todo-buttons", "data-id": `${project.id}` });
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
    const dialogElement = document.createElement("dialog");
    const taskFormElement = document.createElement("form");

    // todo input properties

    const titleInputField = document.createElement("input");
    const messageInputField = document.createElement("input");

    const priorityListElement = document.createElement("select");

    const optionPriorityLow = document.createElement("option");
    const optionPriorityMedium = document.createElement("option");
    const optionPriorityHigh = document.createElement("option");

    const dueDateInput = document.createElement("input");

    const addTaskIcon = document.createElement("button");
    const cancelTaskIcon = document.createElement("span");

    //

    optionPriorityLow.textContent = "Low";
    optionPriorityMedium.textContent = "Medium";
    optionPriorityHigh.textContent = "High";

    addTaskIcon.textContent = "ADD TASK";
    cancelTaskIcon.textContent = "CANCEL";

    UI.getContentContainer().appendChild(dialogElement);
    dialogElement.appendChild(taskFormElement);
    taskFormElement.appendChild(titleInputField);
    taskFormElement.appendChild(messageInputField);

    taskFormElement.appendChild(priorityListElement);
    priorityListElement.appendChild(optionPriorityLow);
    priorityListElement.appendChild(optionPriorityMedium);
    priorityListElement.appendChild(optionPriorityHigh);
    taskFormElement.appendChild(dueDateInput);
    taskFormElement.appendChild(addTaskIcon);
    taskFormElement.appendChild(cancelTaskIcon);

    UI.setAttributes(dialogElement, { class: "modal" });
    UI.setAttributes(taskFormElement, { class: "task-form", method: "dialog" });
    UI.setAttributes(titleInputField, { type: "text", id: "title-input", name: "title-input", placeholder: "Task title", required: "" });
    UI.setAttributes(messageInputField, { type: "text", id: "message-input", name: "message-input", placeholder: "Task message details", required: "" });
    UI.setAttributes(priorityListElement, { class: "priority-list" });
    UI.setAttributes(optionPriorityLow, { value: "low", selected: "selected" });
    UI.setAttributes(optionPriorityMedium, { value: "medium" });
    UI.setAttributes(optionPriorityHigh, { value: "high" });
    UI.setAttributes(dueDateInput, { type: "date", id: "task-date", name: "task-date" });
    UI.setAttributes(addTaskIcon, { type: "submit", class: "add-task-button" });
    UI.setAttributes(cancelTaskIcon, { class: "cancel-task-button" });
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
    const selectedTask = projectManager
      .getListProject()
      .map((project) => {
        if (typeof project.findById(e.target.dataset.id) !== "undefined") {
          return project.findById(e.target.dataset.id);
        }
      })
      .find(Boolean);

    console.log(selectedTask);
    const selectedTaskItemContainer = e.target.parentElement.parentElement;
    const dialogElementEdit = document.createElement("dialog");
    const taskFormElementEdit = document.createElement("form");

    // todo input properties
    const titleInputEditField = document.createElement("input");
    const messageInputEditField = document.createElement("input");

    const priorityListEditElement = document.createElement("select");

    const optionPriorityLow = document.createElement("option");
    const optionPriorityMedium = document.createElement("option");
    const optionPriorityHigh = document.createElement("option");

    const dueDateEditInput = document.createElement("input");

    const addTaskIconEdit = document.createElement("button");
    const cancelTaskIconEdit = document.createElement("button");

    //

    optionPriorityLow.textContent = "Low";
    optionPriorityMedium.textContent = "Medium";
    optionPriorityHigh.textContent = "High";

    addTaskIconEdit.textContent = "EDIT TASK";
    cancelTaskIconEdit.textContent = "CANCEL";

    titleInputEditField.value = selectedTask.getTitle();
    messageInputEditField.value = selectedTask.getMessage();
    dueDateEditInput.value = selectedTask.getDueDate();
    priorityListEditElement.value = selectedTask.getPriority();

    UI.getContentContainer().appendChild(dialogElementEdit);
    dialogElementEdit.appendChild(taskFormElementEdit);
    taskFormElementEdit.appendChild(titleInputEditField);
    taskFormElementEdit.appendChild(messageInputEditField);

    taskFormElementEdit.appendChild(priorityListEditElement);
    priorityListEditElement.appendChild(optionPriorityLow);
    priorityListEditElement.appendChild(optionPriorityMedium);
    priorityListEditElement.appendChild(optionPriorityHigh);
    taskFormElementEdit.appendChild(dueDateEditInput);
    taskFormElementEdit.appendChild(addTaskIconEdit);
    taskFormElementEdit.appendChild(cancelTaskIconEdit);

    UI.setAttributes(dialogElementEdit, { class: "edit-modal", "data-id": `${e.target.dataset.id}` });
    UI.setAttributes(taskFormElementEdit, { class: "task-form", "data-id": `${e.target.dataset.id}`, method: "dialog" });
    UI.setAttributes(titleInputEditField, { type: "text", id: "title-input", name: "title-input", "data-id": `${e.target.dataset.id}`, placeholder: "Task title" });
    UI.setAttributes(messageInputEditField, { type: "text", id: "message-input", name: "message-input", "data-id": `${e.target.dataset.id}`, placeholder: "Task message details" });
    UI.setAttributes(priorityListEditElement, { class: "priority-list", "data-id": `${e.target.dataset.id}` });
    UI.setAttributes(optionPriorityLow, { value: "low", selected: "selected" });
    UI.setAttributes(optionPriorityMedium, { value: "medium" });
    UI.setAttributes(optionPriorityHigh, { value: "high" });
    UI.setAttributes(dueDateEditInput, { type: "date", id: "task-date", name: "task-date", "data-id": `${e.target.dataset.id}`, placeholder: "dd-mm-yyyy", value: "" });
    UI.setAttributes(addTaskIconEdit, { type: "submit", class: "edit-task-button", "data-id": `${e.target.dataset.id}` });
    UI.setAttributes(cancelTaskIconEdit, { class: "cancel-edit-task-button", "data-id": `${e.target.dataset.id}` });
  }

  static toggleTaskVisibility(e, value) {
    const taskItem = Array.from(document.querySelectorAll(".task-item"));
    const indexOfTarget = setActiveProject().todos.find((task) => task.id === e.target.dataset.id);
    const selectedTaskItem = taskItem.find((task) => task.dataset.id === indexOfTarget.id);
    selectedTaskItem.style.display = `${value}`;
  }

  // static deleteTaskFormFromTheDOM(element) {
  //   document.querySelector(element).remove();
  // }

  static addTask() {
    const errorMessage = document.querySelector(".alert");
    const titleInput = document.querySelector("#title-input").value;
    const messageInput = document.querySelector("#message-input").value;
    const priorityInput = document.querySelector(".priority-list").value;
    const dueDateInput = document.querySelector("#task-date").value;
    const projectName = setActiveProject().getTitle();

    const task = new ToDo(uuidv4(), projectName, titleInput, messageInput, priorityInput, dueDateInput);

    if (titleInput === "" || messageInput === "" || !dueDateInput || priorityInput == null) {
      UI.alertMessage();
      UI.hideAddTaskButton();
      return;
    } else if (UI.getContentContainer().contains(errorMessage)) {
      // UI.deleteTaskFormFromTheDOM(".task-form-container");
      UI.appendAddTaskButton();
      errorMessage.remove();
    } else {
      // UI.deleteTaskFormFromTheDOM(".task-form-container");
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
    const taskContents = document.createElement("div");
    const titleTask = document.createElement("h3");
    const messageTask = document.createElement("p");
    const rightSideContainer = document.createElement("div");
    const priorityTask = document.createElement("p");
    const dueDateTask = document.createElement("p");

    UI.setAttributes(iconsContainer, { class: "left-side-container", "data-id": `${task.id}` });
    UI.setAttributes(deleteIcon, { class: "material-symbols-outlined delete-button", "data-id": `${task.id}` });
    UI.setAttributes(editIcon, { class: "material-symbols-outlined edit-button", "data-id": `${task.id}` });
    UI.setAttributes(taskContainer, { class: "task-item", "data-id": `${task.id}` });
    UI.setAttributes(taskContents, { class: "task-content", "data-id": `${task.id}` });
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
    taskContainer.appendChild(taskContents);
    taskContents.appendChild(titleTask);
    taskContents.appendChild(messageTask);
    taskContainer.appendChild(rightSideContainer);
    rightSideContainer.appendChild(dueDateTask);
    rightSideContainer.appendChild(priorityTask);

    console.log(projectManager);

    renderTasks(setActiveProject());
  }

  static expandedTask(e) {
    const taskItems = Array.from(document.querySelectorAll(".task-item"));
    const messageDetails = Array.from(document.querySelectorAll(".task-message"));
    const selectedTaskMessage = messageDetails.find((message) => message.dataset.id === e.target.dataset.id);
    const selectedTaskItem = taskItems.find((task) => task.dataset.id === e.target.dataset.id);
    console.log("selected task", selectedTaskItem);
    console.log("selected message", selectedTaskMessage);

    if (selectedTaskItem.classList.contains("expanded")) {
      selectedTaskMessage.style.display = "none";
      selectedTaskItem.classList.remove("expanded");
    } else {
      selectedTaskItem.classList.add("expanded");
      selectedTaskMessage.style.display = "block";
    }
  }

  static hideAddTaskButton() {
    document.querySelector(".add-task-to-do-form-button").style.display = "none";
  }

  static appendAddTaskButton() {
    const addTaskButton = document.querySelector(".add-task-to-do-form-button");
    addTaskButton.style.display = "block";
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
