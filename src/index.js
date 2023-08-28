import css from "./styles/main.css";
import UI from "./modules/ui.js";
import Project from "./modules/project";
import ToDo from "./modules/todo";
import { compareAsc, format } from "date-fns";
import ProjectManager from "./modules/projectManager";

document.addEventListener("DOMContentLoaded", UI.loadHome);

// let myProject = new Project("Inbox");
// let myTask = new ToDo("Go shopping", "Go shopping for milk", "high", `${format(new Date(2024, 2, 11), "dd-LL-yyyy")}`, false);
// let myTask2 = new ToDo("Go to the gym", "Go to the GYM on monday.", "medium", "datePlaceHolder", false);

// myProject.add(myTask);
// myProject.add(myTask2);

// console.table({ myTask, myTask2 });

// myProject.remove(0);

// console.log("after splice method was used:");
// console.table(myProject);

// let myProject2 = new Project("Reading");
// let myTask3 = new ToDo("Read a book by George Orwell", "I must finally read a book by George Orwell: 1984", "low", "datePlaceHolder", false);
// let myTask4 = new ToDo("Read a book by Philip K. Dick", "Read, A Scanner Darkly", "low", "dueDatePlaceholder", false);

// myProject2.add(myTask3);
// myProject2.add(myTask4);

// console.log(myProject2);

// console.table({ myTask3, myTask4 });

// myProject2.remove(myProject2.todos);

// console.log("after splice method was used:");

// console.table(myProject2);
// console.log(myTask);
// const testPriority = myTask.getIsCompleted();
// console.log(testPriority);
// console.log(myTask);
// const testGetTitle = myTask.getTitle();
// console.log(myTask);
// const testSetTitle = myTask.setTitle("Go to the Cinema");
// myTask.setDueDate(2024, 0, 11);
// console.log(myTask);

// const myProjectManager = new Project("All the Projects");

// const myProjectManager = new ProjectManager("All the Projects");

// myProjectManager.add(myProject2);
// console.log(myProjectManager);

// myProjectManager.remove(1);
// console.log(myProjectManager);
// // but it doesn't care what we add!
// myProjectManager.add(new Project("Home"));
// myProjectManager.add(new Project("Office"));
// console.log(myProjectManager);

// for (let i = 0; i < myProjectManager.length; i++) {
//   console.log("title");
//   myProjectManager.todos[i];
// }

// const myProjectManager = new ProjectManager("All Projects");
// const myProject1 = new Project("Shopping");
// myProjectManager.add(myProject1);
// const myTask1 = new ToDo("Go to the IDEA shopping center", "Shopping center is open till 10.00pm", "high", `${format(new Date(1, 12, 2023), "dd-LL-yyyy")}`, false);
// myProject1.add(myTask1);
// console.log("after adding myTask1");
// console.log(myProject1);
// console.log(myTask1.getTitle());
// myProject1.setTitle("Life tasks");
// myTask1.setTitle("Life Hacks");
// console.log(myTask1.getTitle());
// console.log(myProject1);
// myProject1.remove(0);
// console.log(myProject1);
// myProjectManager.remove(0);
// console.log(myProjectManager);
// myProject1.add(myTask3);
// myProject1.add(myTask4);
// myProject1.render();
