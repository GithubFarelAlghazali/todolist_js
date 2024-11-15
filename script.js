let tasks = JSON.parse(localStorage.getItem("tasks"));
let doneTasks = JSON.parse(localStorage.getItem("doneTasks"));
let taskBox = document.querySelector(".tasks");
let taskLis = "",
     doneLis = "";

// if (!doneTasks) {
//      doneTasks = [];
// } else {
//      doneTasks.forEach((d) => {
//           doneLis += `<div class="task" style="background-color: grey; order: 2;">
//                          <input type="checkbox" id="check" class="checked" checked="checked">
//                          <p>${d}</p>
//                          <span id="close">x</span>
//                          </div>`;
//      });
// }

if (!doneTasks || !tasks) {
     doneTasks = [];
     tasks = [];
} else {
     tasks.forEach((task) => {
          taskLis += `<div class="task">
                         <input type="checkbox" id="check"/>
                         <p>${task}</p>
                         <span id="close">x</span>
                         </div>`;
     });
     doneTasks.forEach((done) => {
          taskLis += `<div class="task" style="background:grey; order: 2">
                         <input type="checkbox" id="check" class="checked" checked="checked"/>
                         <p>${done}</p>
                         <span id="close">x</span>
                         </div>`;
     });
}

taskBox.innerHTML = `${taskLis} ${doneLis}`;

// add new task
const newTask = document.getElementById("new-task"),
     addBtn = document.getElementById("add");
addBtn.addEventListener("click", function () {
     if (newTask.value == "") {
          document.querySelector(".alert").style.display = "block";
          setTimeout(() => {
               document.querySelector(".alert").style.display = "none";
          }, 2000);
          return false;
     }
     let li = `<div class="task">
                         <input type="checkbox" id="check"/>
                         <p>${newTask.value}</p>
                         <span id="close">x</span>
                         </div>`;
     tasks.push(newTask.value);
     localStorage.setItem("tasks", JSON.stringify(tasks));
     localStorage.setItem("doneTasks", JSON.stringify(doneTasks));
     taskBox.innerHTML += li;
     newTask.value = "";
});
// close task
window.addEventListener("click", (e) => {
     if (e.target.id == "close") {
          const close = e.target;
          close.parentElement.style.display = "none";
          doneTasks = doneTasks.filter((item) => item != close.previousElementSibling.innerHTML);
          tasks = tasks.filter((item) => item != close.previousElementSibling.innerHTML);
          localStorage.setItem("tasks", JSON.stringify(tasks));
          localStorage.setItem("doneTasks", JSON.stringify(doneTasks));
     }
});
// mark checked task
window.addEventListener("click", (e) => {
     if (e.target.id == "check") {
          const check = e.target;
          if (check.classList != "checked") {
               check.classList.add("checked");
               check.setAttribute("checked", "checked");
               check.parentElement.style.backgroundColor = "grey";
               check.parentElement.style.order = "2";
               tasks = tasks.filter((item) => item != check.nextElementSibling.innerHTML);
               doneTasks.push(check.nextElementSibling.innerHTML);
               localStorage.setItem("tasks", JSON.stringify(tasks));
               localStorage.setItem("doneTasks", JSON.stringify(doneTasks));
               console.log(check);
          } else {
               check.classList.remove("checked");
               check.parentElement.style.order = "1";
               check.removeAttribute("checked");
               check.parentElement.style.backgroundColor = "#ffde4d";
               doneTasks = doneTasks.filter((item) => item != check.nextElementSibling.innerHTML);
               tasks.push(check.nextElementSibling.innerHTML);
               localStorage.setItem("tasks", JSON.stringify(tasks));
               localStorage.setItem("doneTasks", JSON.stringify(doneTasks));
               console.log(check);
          }
     }
});

// localStorage
