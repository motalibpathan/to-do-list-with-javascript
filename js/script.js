let form = document.querySelector("#task_form");
let taskList = document.querySelector("#tasks");
let taskClearBtn = document.querySelector("#task_clear_btn");
let taskInput = document.querySelector("#task_input");
let filter = document.querySelector("#filter_task");
// add event listener
form.addEventListener("submit", addTask);
taskList.addEventListener("click", removeTask);
taskClearBtn.addEventListener("click", removeAllTask);
filter.addEventListener("keyup", filterTask);
document.addEventListener("DOMContentLoaded", getTasks);

// Function
function addTask(e) {
  if (taskInput.value === "") {
    showAlert("Add a task!", "alert-danger");
  } else {
    let div = document.createElement("div");
    div.className = "task-list-remove";
    div.innerHTML = `
    <div class="row tasks-item d-flex align-items-center">
          <div class="col-md-10 col-10">
            <h4>${taskInput.value}</h4>
          </div>
          <div class="col-md-2 col-2">
            <img class="img-fluid" src="images/icon-remove.jpg" alt=""
            />
          </div>
    </div>
    `;
    taskList.appendChild(div);
    storeTaskInLocalStorage(taskInput.value);
    taskInput.value = "";
    showAlert("Task added successful!", "alert-success");
  }
  e.preventDefault();
}

function removeTask(e) {
  if (e.target.hasAttribute("src")) {
    if (confirm("Are you sure")) {
      let ele = e.target.parentElement.parentElement;
      ele.remove();
      showAlert("Task removed successful!", "alert-danger");
      removeFromLS(ele);
    }
  }

  //   document.getElementsByClassName("task-list-remove").remove();
  //   e.preventDefault();
}
function removeAllTask(e) {
  if (confirm("Do you want remove all task?")) {
    taskList.innerHTML = "";
    showAlert("Successfully removed all task!", "alert-success");
    localStorage.clear();
  }
}
function filterTask(e) {
  let text = e.target.value.toLowerCase();
  document.querySelectorAll("h4").forEach((task) => {
    let item = task.firstChild.textContent;
    let hide = task.parentElement.parentElement.parentElement;
    console.log(`hide`, hide);
    if (item.toLocaleLowerCase().indexOf(text) != -1) {
      hide.style.display = "block";
    } else {
      hide.style.display = "none";
    }
  });
  // console.log(`text`, text);
}
function showAlert(message, className) {
  // Show alert
  // let div = document.createElement("div");
  // div.className = `alert ${className}`;
  // div.appendChild(document.createTextNode(message));
  // document.querySelector("#alert_area").appendChild(div);

  // Show alert another way
  document.querySelector("#alert_area").innerHTML = `
  <div class="alert ${className}">${message}</div>
  `;

  setTimeout(function () {
    document.querySelector(".alert").remove();
  }, 2000);
}
// Store in local storage
function storeTaskInLocalStorage(t) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(t);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach((t) => {
    let div = document.createElement("div");
    div.className = "task-list-remove";
    div.innerHTML = `
    <div class="row tasks-item d-flex align-items-center">
          <div class="col-md-10 col-10">
            <h4>${t}</h4>
          </div>
          <div class="col-md-2 col-2">
            <img class="img-fluid" src="images/icon-remove.jpg" alt=""
            />
          </div>
    </div>
    `;
    taskList.appendChild(div);
  });
}
function removeFromLS(element) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  let list = element.firstElementChild.firstElementChild.textContent;
  tasks.forEach(function (t, i) {
    if (list == t) {
      tasks.splice(i, 1);
    }
  });
  // console.log(`element`, element);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
