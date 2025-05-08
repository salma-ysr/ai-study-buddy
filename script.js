const form = document.getElementById("task-form");
const taskList = document.getElementById("task-list");

form.addEventListener("submit", function(event) {
  event.preventDefault();

  const name = document.getElementById("task-name").value;
  const category = document.getElementById("task-category").value;
  const priority = document.getElementById("task-priority").value;

  const taskItem = document.createElement("li");
  taskItem.classList.add("task-item");
  taskItem.innerText = `${name} [${category.toUpperCase()} - ${priority.toUpperCase()}]`;

  taskList.appendChild(taskItem);

  form.reset();
});
