import Project from "./project";
import { projectManager } from "./projectManager";
import ToDo from "./todo";
import initializeButtons from "./controller/initializeButtons";
import setActiveProject from "./controller/activeProject";
import { renderProjects, renderTasks } from "./controller/view";
import { getData, setData } from "./storage";
import { v4 as uuidv4 } from "uuid";
import { loadProjectManager } from "./controller/loadProjectManager";
import GithubIcon from "../img/github-icon.png";

export default class UI {
  /* loads home page*/
  static loadHome() {
    UI.openToDoCategoryPage("Inbox", document.querySelector("#button-inbox"));
    UI.footer();
    loadProjectManager();
    initializeButtons();
    UI.assignInboxIDToTheButtons();
  }

  /* assigns id data attribute to Inbox (default project) based on UUID4 */
  static assignInboxIDToTheButtons() {
    const inboxProjectID = Array.from(projectManager.projects)[0].id;
    let inboxButton = document.querySelector("#button-inbox");
    let inboxSpanIcon = document.querySelector(".inbox-icon");
    inboxButton.setAttribute("data-id", `${inboxProjectID}`);
    inboxSpanIcon.setAttribute("data-id", `${inboxProjectID}`);
  }

  /* loads content of pages based on which page we are on */
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

    headingToDo.classList.add("heading-page");
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
      mainContainer.appendChild(addToDoTaskButton);
      addToDoTaskButton.style.display = "none";
    }
    mainContainer.appendChild(contentContainer);

    /* add task button dark mode */
    if (document.body.classList.contains("dark-mode-active")) {
      addToDoTaskButton.classList.add("dark-mode-active");
    }
  }

  /* static function for hamburger nav menu */
  static toggleHamburgerMenu() {
    const leftSideContentContainer = document.querySelector(".left-side-content-container");
    if (leftSideContentContainer.classList.contains("expanded-nav")) {
      leftSideContentContainer.classList.remove("expanded-nav");
    } else {
      leftSideContentContainer.classList.add("expanded-nav");
    }
  }

  // projects

  /* creates input field for new project */
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
    UI.setAttributes(cancelProjectIcon, { class: "material-symbols-outlined project-delete-button" });
    UI.setAttributes(projectTitleInput, { type: "input", class: "input-project-popup" });
  }

  /* static method for adding project to the array and assigning data attributes to it */

  static addProject() {
    const projectInputField = document.querySelector(".input-project-popup").value;
    const project = new Project(uuidv4(), `${projectInputField}`, []);

    /* can't add empty projects */
    if (projectInputField === "") {
      alert("Project title input can't be empty!");
      return;
    }

    /* check if projects array contains the project of the same name from the input */
    if (projectManager.getAllTitles().includes(projectInputField) || projectInputField == "Today" || projectInputField == "This Week") {
      alert("Projects can't have the same name!");
      return;
    }
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

    renderProjects();
  }

  static createAddProjectButton() {
    const addProjectButton = document.createElement("button");
    const addProjectIcon = document.createElement("span");

    addProjectIcon.textContent = "create_new_folder";
    addProjectButton.textContent = "NEW PROJECT";

    UI.getUserProjectListContainer().appendChild(addProjectIcon);
    addProjectIcon.append(addProjectButton);

    UI.setAttributes(addProjectButton, { class: "add-project-input-button" });
    UI.setAttributes(addProjectIcon, { class: "material-symbols-outlined add-project-input-button" });
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
    e.target.parentNode.parentNode.remove();
  }

  //

  // tasks

  /* task modal */
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
    UI.setAttributes(titleInputField, { type: "input", id: "title-input", name: "title-input", placeholder: "Task title", required: "", maxlength: 25 });
    UI.setAttributes(messageInputField, { type: "input", id: "message-input", name: "message-input", placeholder: "Task message details", required: "", maxlength: 30 });
    UI.setAttributes(priorityListElement, { class: "priority-list" });
    UI.setAttributes(optionPriorityLow, { value: "low", selected: "selected" });
    UI.setAttributes(optionPriorityMedium, { value: "medium" });
    UI.setAttributes(optionPriorityHigh, { value: "high" });
    UI.setAttributes(dueDateInput, { type: "date", id: "task-date", name: "task-date", required: "" });
    UI.setAttributes(addTaskIcon, { type: "submit", class: "add-task-button" });
    UI.setAttributes(cancelTaskIcon, { class: "cancel-task-button" });

    /* dark mode dialog module*/

    if (document.body.classList.contains("dark-mode-active")) {
      dialogElement.classList.toggle("dark-mode-active");
    }
  }

  /* edit task modal */
  static editTaskForm(e) {
    const selectedTask = projectManager
      .getListProject()
      .map((project) => {
        if (typeof project.findById(e.target.dataset.id) !== "undefined") {
          return project.findById(e.target.dataset.id);
        }
      })
      .find(Boolean);

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

    UI.setAttributes(dialogElementEdit, { class: "edit-modal", "data-id": `${e.target.dataset.id}`, "data-keyboard": "false" });
    UI.setAttributes(taskFormElementEdit, { class: "task-form", "data-id": `${e.target.dataset.id}`, method: "dialog" });
    UI.setAttributes(titleInputEditField, { type: "text", id: "title-input", name: "title-input", "data-id": `${e.target.dataset.id}`, placeholder: "Task title", required: "", maxlength: 30 });
    UI.setAttributes(messageInputEditField, { type: "text", id: "message-input", name: "message-input", "data-id": `${e.target.dataset.id}`, placeholder: "Task message details", required: "", maxlength: 30 });
    UI.setAttributes(priorityListEditElement, { class: "priority-list", "data-id": `${e.target.dataset.id}` });
    UI.setAttributes(optionPriorityLow, { value: "low", selected: "selected" });
    UI.setAttributes(optionPriorityMedium, { value: "medium" });
    UI.setAttributes(optionPriorityHigh, { value: "high" });
    UI.setAttributes(dueDateEditInput, { type: "date", id: "task-date", name: "task-date", "data-id": `${e.target.dataset.id}`, placeholder: "dd-mm-yyyy", value: "", required: "" });
    UI.setAttributes(addTaskIconEdit, { type: "submit", class: "edit-task-button", "data-id": `${e.target.dataset.id}` });
    UI.setAttributes(cancelTaskIconEdit, { class: "cancel-edit-task-button", "data-id": `${e.target.dataset.id}` });

    /* dark mode dialog edit module*/

    if (document.body.classList.contains("dark-mode-active")) {
      dialogElementEdit.classList.toggle("dark-mode-active");
    }
  }

  static toggleTaskVisibility(e, value) {
    const taskItem = Array.from(document.querySelectorAll(".task-item"));
    const indexOfTarget = setActiveProject().todos.find((task) => task.id === e.target.dataset.id);
    const selectedTaskItem = taskItem.find((task) => task.dataset.id === indexOfTarget.id);
    selectedTaskItem.style.display = `${value}`;
  }

  /* static method for adding task and assigning the attributes to "task-items" */
  static addTask() {
    const titleInput = document.querySelector("#title-input").value;
    const messageInput = document.querySelector("#message-input").value;
    const priorityInput = document.querySelector(".priority-list").value;
    const dueDateInput = document.querySelector("#task-date").value;
    const projectName = setActiveProject().getTitle();

    const task = new ToDo(uuidv4(), projectName, titleInput, messageInput, priorityInput, dueDateInput);

    if (titleInput === "" || messageInput === "" || !dueDateInput || priorityInput == null) {
      return;
    }
    setActiveProject().add(task);
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

    /* dark mode tasks */

    if (document.body.classList.contains("dark-mode-active")) {
      taskContainer.classList.add("dark-mode-active");
      titleTask.classList.add("dark-mode-active");
      messageTask.classList.add("dark-mode-active");
      dueDateTask.classList.add("dark-mode-active");
      priorityTask.classList.add("dark-mode-active");
    }

    document.querySelector(".modal").remove();

    renderTasks(setActiveProject());
  }

  /* on click expand the "task-items" (tasks) so that we can view task message details */
  static expandedTask(e) {
    const taskItems = Array.from(document.querySelectorAll(".task-item"));
    const messageDetails = Array.from(document.querySelectorAll(".task-message"));
    const selectedTaskMessage = messageDetails.find((message) => message.dataset.id === e.target.dataset.id);
    const selectedTaskItem = taskItems.find((task) => task.dataset.id === e.target.dataset.id);

    if (selectedTaskItem.classList.contains("expanded")) {
      selectedTaskMessage.style.display = "none";
      selectedTaskItem.classList.remove("expanded");
    } else {
      selectedTaskItem.classList.add("expanded");
      selectedTaskMessage.style.display = "block";
    }
  }

  static footer() {
    const yearNow = new Date();

    const footerContainer = document.querySelector(".footer-container");
    const gitHubImageIcon = document.createElement("img");
    const gitHubIconLink = document.createElement("a");
    gitHubImageIcon.src = GithubIcon;
    gitHubImageIcon.classList.add("github-logo");
    footerContainer.textContent = "Copyright " + " \u00A9 " + yearNow.getFullYear() + " AirDevil188";
    footerContainer.appendChild(gitHubIconLink);
    gitHubIconLink.appendChild(gitHubImageIcon);

    UI.setAttributes(gitHubIconLink, { href: "https://github.com/AirDevil188" });
  }

  /* dark mode functionality */
  static darkMode() {
    if (!document.body.classList.contains("dark-mode-active")) {
      document.querySelector(".dark-mode").textContent = "light_mode";
    } else {
      document.querySelector(".dark-mode").textContent = "dark_mode";
    }
    const addTaskButton = document.querySelector(".add-task-to-do-form-button");
    document.body.classList.toggle("dark-mode-active");
    document.querySelector(".header-container").classList.toggle("dark-mode-active");
    document.querySelectorAll(".task-item").forEach((task) => task.classList.toggle("dark-mode-active"));
    document.querySelectorAll(".title-task").forEach((title) => title.classList.toggle("dark-mode-active"));
    document.querySelectorAll(".task-message").forEach((message) => message.classList.toggle("dark-mode-active"));
    document.querySelectorAll(".task-date").forEach((date) => date.classList.toggle("dark-mode-active"));
    document.querySelectorAll(".task-priority").forEach((priority) => priority.classList.toggle("dark-mode-active"));
    document.querySelectorAll(".project-name").forEach((projectName) => projectName.classList.toggle("dark-mode-active"));

    if (typeof addTaskButton !== "null") {
      addTaskButton.classList.toggle("dark-mode-active");
    } else {
      return;
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

  /* static method that clears content of the mainContainer */
  static clear() {
    UI.clearMainContainer();
  }

  static clearMainContainer() {
    UI.getMainContainer().textContent = "";
  }

  static clearContentContainer() {
    UI.getContentContainer().textContent = "";
  }

  /* method that we use to assign multiple attributes */
  static setAttributes(el, attrs) {
    Object.keys(attrs).forEach((key) => el.setAttribute(key, attrs[key]));
  }
}
