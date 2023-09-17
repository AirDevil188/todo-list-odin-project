import { projectManager } from "../projectManager";
import { renderTasks } from "./view";
import { setData } from "../storage";
import { filterByThisWeek, filterByToday } from "./filterTasks";
import UI from "../ui";

/* edit task module, that we use to edit tasks */
export default function editTask(e) {
  const titleInput = document.querySelector("#title-input");
  const messageInput = document.querySelector("#message-input");
  const priorityInput = document.querySelector(".priority-list").value;
  const headingPage = document.querySelector(".heading-page").textContent;
  const dueDateInput = document.querySelector("#task-date");

  projectManager.getListProject().map((project) => {
    if (typeof project.findById(e.target.dataset.id) !== "undefined") {
      project.findById(e.target.dataset.id).setTitle(`${titleInput.value}`);
      project.findById(e.target.dataset.id).setMessage(`${messageInput.value}`);
      project.findById(e.target.dataset.id).setPriority(`${priorityInput}`);
      project.findById(e.target.dataset.id).setDueDate(`${dueDateInput.value}`);
    } else {
      return false;
    }

    if (titleInput.value === "" || messageInput.value === "" || dueDateInput.value === "") {
      return;
    }

    document.querySelector(".edit-modal").remove();

    /* because we also have "Today" and "This Week" pages in our ToDo project, I had a problem with edit-task module when we try to edit tasks from projects other than Inbox (default project), this is because of my renderTask() function in my 
    view module. To avoid this problem I've added if, else if conditional statements that check our h1 element of our page and based on that we call functions  */
    if (headingPage === "Today") {
      UI.clearContentContainer();
      filterByToday();
    } else if (headingPage === "This Week") {
      UI.clearContentContainer();
      filterByThisWeek();
    } else if (headingPage !== "This Week" || headingPage !== "Today") {
      renderTasks(project);
    }
  });
  setData("projects", projectManager.projects);
}
