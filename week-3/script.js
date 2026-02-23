const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const dueDateInput = document.getElementById("dueDate");
const taskList = document.getElementById("taskList");
const stats = document.getElementById("stats");
const filterButtons = document.querySelectorAll(".filters button");

let tasks = [];

async function loadTasks() {
  const data = await new Promise((resolve) => {
    setTimeout(() => {
      resolve(localStorage.getItem("tasks"));
    }, 0);
  });

  tasks = data ? JSON.parse(data) : defaultTasks();
  renderTasks("all");
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function defaultTasks() {
  return [
    {
      id: Date.now(),
      text: "Learn JavaScript",
      dueDate: "",
      completed: false
    }
  ];
}

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const text = taskInput.value.trim();
  if (!text) return;

  // const newTask = {
  //   id: Date.now(),
  //   text,
  //   completed: false
  // };
  const newTask = {
  id: Date.now(),
  text,
  dueDate: dueDateInput.value,
  completed: false
};

  tasks.push(newTask);
  saveTasks();
  renderTasks("all");
  taskInput.value = "";
  dueDateInput.value = "";
});

function renderTasks(filterType) {
  taskList.innerHTML = "";

  let filteredTasks = tasks;

  tasks.sort((a, b) => {
    if (!a.dueDate) return 1;
    if (!b.dueDate) return -1;
    return new Date(a.dueDate) - new Date(b.dueDate);
  });

  if (filterType === "active") {
    filteredTasks = tasks.filter(task => !task.completed);
  }

  if (filterType === "completed") {
    filteredTasks = tasks.filter(task => task.completed);
  }

  filteredTasks.map(task => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;

    checkbox.addEventListener("change", () => {
      task.completed = checkbox.checked;
      saveTasks();
      renderTasks(filterType);
    });

    const span = document.createElement("span");
    span.textContent = task.text;

    if (task.dueDate) {
  const dateSpan = document.createElement("small");
  dateSpan.textContent = " (Due: " + task.dueDate + ")";
  span.appendChild(dateSpan);
}

    const del = document.createElement("span");
    del.textContent = "✖";
    del.className = "delete";

    del.addEventListener("click", () => {
      tasks = tasks.filter(t => t.id !== task.id);
      saveTasks();
      renderTasks(filterType);
    });

    li.append(checkbox, span, del);
    taskList.appendChild(li);
  });

  updateStats();
}

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    renderTasks(btn.dataset.filter);
  });
});

function updateStats() {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;

  const active = tasks.reduce((count, task) => {
    return task.completed ? count : count + 1;
  }, 0);

  stats.textContent = `Total: ${total} | Active: ${active} | Completed: ${completed}`;
}

loadTasks();