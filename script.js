document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("task-form");
  const taskList = document.getElementById("task-list");
  const generateBtn = document.getElementById("generate-plan");
  const dayPlan = document.getElementById("day-plan");
  const toggleButton = document.getElementById("toggle-mode");

  let tasks = [];

  form.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("task-name").value;
    const category = document.getElementById("task-category").value;
    const priority = document.getElementById("task-priority").value;
    const duration = parseInt(document.getElementById("task-duration").value);
    const task = { name, category, priority, duration };


    if (!name || !category || !priority) {
      alert("Please fill in all fields.");
      return;
    }

    tasks.push(task);

    const taskItem = document.createElement("li");
    taskItem.classList.add("task-item");
    taskItem.innerText = `${name} [${category.toUpperCase()} - ${priority.toUpperCase()} - ${duration} min]`;

    // Add priority color
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

  // 🌙 DARK MODE TOGGLE
  toggleButton.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
      toggleButton.textContent = "☀️";
    } else {
      toggleButton.textContent = "🌙";
    }
  });

  // GENERATE DAY PLAN
  generateBtn.addEventListener("click", () => {
    const sortedTasks = tasks.slice().sort((a, b) => {
      const priorityOrder = { high: 1, medium: 2, low: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

    const plan = [];
    let currentTime = 8 * 60; // start at 8:00 AM
    const endTime = 22 * 60;  // end at 10:00 PM

    for (const task of sortedTasks) {
      const duration = task.duration;
    
      if (currentTime + duration > endTime) break;
    
      const from = formatTime(currentTime);
      const to = formatTime(currentTime + duration);
    
      plan.push(`${from} - ${to}: ${task.name}`);
      currentTime += duration;
    }    

    dayPlan.innerHTML = `<h3>Your Daily Plan</h3>`;
    if (plan.length === 0) {
      dayPlan.innerHTML += `<p>No tasks fit in your day 😔 maybe too ambitious?</p>`;
    } else {
      plan.forEach(entry => {
        dayPlan.innerHTML += `<p>${entry}</p>`;
      });
    }
  });

  function estimateTime(category) {
    switch (category) {
      case "study": return 90;
      case "work": return 60;
      case "selfcare": return 30;
      default: return 45;
    }
  }

  function formatTime(minutes) {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h}:${m.toString().padStart(2, '0')}`;
  }
});
