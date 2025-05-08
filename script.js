const form = document.getElementById("task-form");
const taskList = document.getElementById("task-list");

form.addEventListener("submit", function(event) {
  event.preventDefault();

  const name = document.getElementById("task-name").value;
  const category = document.getElementById("task-category").value;
  const priority = document.getElementById("task-priority").value;

  if (!name || !category || !priority) {
    alert("Please fill in all fields.");
    return;
  }

  const taskItem = document.createElement("li");
  taskItem.classList.add("task-item");
  taskItem.innerText = `${name} [${category.toUpperCase()} - ${priority.toUpperCase()}]`;

  if (priority === "high") {
    taskItem.style.borderLeft = "5px solid #ff6b6b";
  } else if (priority === "medium") {
    taskItem.style.borderLeft = "5px solid #ffa502";
  } else {
    taskItem.style.borderLeft = "5px solid #7bed9f";
  }

  taskList.appendChild(taskItem);
  form.reset();
});
