// Display current date top right
function updateDate() {
  const dateEl = document.getElementById('currentDate');
  const now = new Date();
  const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
  dateEl.textContent = now.toLocaleDateString(undefined, options);
}
updateDate();
setInterval(updateDate, 60000); // update every minute

function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();
  if (!text) return;

  const task = createTaskElement(text, "todo");
  document.querySelector("#todo .tasks").appendChild(task);
  input.value = "";
  updateProgressBar();
}

function createTaskElement(text, currentColumn) {
  const task = document.createElement("div");
  task.className = "task";
  task.setAttribute("data-status", currentColumn);

  const span = document.createElement("span");
  span.textContent = text;

  const button = document.createElement("button");
  button.textContent = "→";
  button.onclick = () => {
    moveTask(task);
    updateProgressBar();
  };

  task.appendChild(span);
  task.appendChild(button);
  return task;
}

function moveTask(task) {
  const status = task.getAttribute("data-status");
  if (status === "todo") {
    task.setAttribute("data-status", "progress");
    document.querySelector("#progress .tasks").appendChild(task);
  } else if (status === "progress") {
    task.setAttribute("data-status", "done");
    document.querySelector("#done .tasks").appendChild(task);
  }
}

function updateProgressBar() {
  const todoCount = document.querySelectorAll("#todo .task").length;
  const progressCount = document.querySelectorAll("#progress .task").length;
  const doneCount = document.querySelectorAll("#done .task").length;
  const total = todoCount + progressCount + doneCount;

  let progressPercent = 0;
  if (total > 0) {
    // progress bar reflects done tasks over total tasks
    progressPercent = (doneCount / total) * 100;
  }
  const progressBar = document.getElementById("progressBar");
  progressBar.style.width = progressPercent + "%";
}

// Reset button clears all tasks
document.getElementById('resetBtn').addEventListener('click', () => {
  ["todo", "progress", "done"].forEach(id => {
    const container = document.querySelector(`#${id} .tasks`);
    container.innerHTML = "";
  });
  updateProgressBar();
});
