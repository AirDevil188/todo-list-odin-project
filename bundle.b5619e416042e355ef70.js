(()=>{"use strict";class t{static loadHome(){t.openToDoCategoryPage("Inbox",document.querySelector("#button-inbox"))}static loadToDoContent(e){const o=document.querySelector(".main-container"),n=document.createElement("div"),a=document.createElement("div"),s=document.createElement("h1"),i=document.createElement("button");n.className="content-container",a.className="heading-container",i.className="add-task-to-do-form-button",s.textContent=`${e}`,i.textContent="Add Task",o.appendChild(a),a.appendChild(s),o.appendChild(i),o.appendChild(n),t.setAttributes(s,{class:"page-heading"})}static openToDoCategoryPage(e,o){t.loadToDoContent(e)}static openInboxPage(){t.openToDoCategoryPage("Inbox",this)}static openTodayPage(){t.openToDoCategoryPage("Today",this)}static openThisWeekPage(){t.openToDoCategoryPage("This Week",this)}static setAttributes(t,e){Object.keys(e).forEach((o=>t.setAttribute(o,e[o])))}}document.addEventListener("DOMContentLoaded",t.loadHome);let e=new class{constructor(t,e){this.title=t,this.todos=[]}addTask(t){this.todos.push(t)}}("Inbox"),o=new class{count=-1;constructor(t,e,o,n,a){this.id=++this.constructor.count,this.title=t,this.message=e,this.priority=o,this.dueDate=n,this.isCompleted=a}}("Go shopping","Go shopping for milk","high","null",!1);e.addTask(o),console.log(e)})();
//# sourceMappingURL=bundle.b5619e416042e355ef70.js.map