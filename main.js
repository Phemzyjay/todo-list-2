// Load saved tasks from localStorage on page load
document.addEventListener('DOMContentLoaded', function () {
  const taskList = document.getElementById('tasks');
  const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

  // Render saved tasks
  savedTasks.forEach(task => {
    const taskItem = document.createElement('li');
    taskItem.classList.add('taskItem');
    taskItem.innerHTML = `
      <input type="checkbox" id="${task.id}" ${task.completed ? 'checked' : ''}>
      <label for="${task.id}">${task.text}</label>
      <button class="delete-btn">Delete</button>
    `;
    taskList.appendChild(taskItem);
  });
});

// Save tasks to localStorage
function saveTasks() {
  const taskItems = document.querySelectorAll('.taskItem');
  const tasks = Array.from(taskItems).map(taskItem => {
    const checkbox = taskItem.querySelector('input[type="checkbox"]');
    const label = taskItem.querySelector('label');
    return {
      id: checkbox.id,
      text: label.textContent,
      completed: checkbox.checked,
    };
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Event listener for adding tasks
document.getElementById('task-area').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent form submission

  // Get the input value
  const taskInput = document.getElementById('single-task');
  const taskText = taskInput.value.trim();

  if (taskText) {
    // Create a new list item
    const taskList = document.getElementById('tasks');
    const taskItem = document.createElement('li');
    taskItem.classList.add('taskItem');

    // Add the task text, checkbox, and delete button
    taskItem.innerHTML = `
      <input type="checkbox" id="task-${Date.now()}">
      <label for="task-${Date.now()}">${taskText}</label>
      <button class="delete-btn">Delete</button>
    `;
    taskList.appendChild(taskItem);

    // Clear the input field
    taskInput.value = '';

    // Save tasks to localStorage
    saveTasks();
  }
});

// Event delegation for managing tasks
document.getElementById('tasks').addEventListener('click', function (event) {
  // Handle delete button click
  if (event.target.classList.contains('delete-btn')) {
    event.target.parentElement.remove(); // Remove the parent <li> element
    saveTasks(); // Save tasks to localStorage
  }

  // Handle checkbox state change
  if (event.target.type === 'checkbox') {
    saveTasks(); // Save tasks to localStorage
  }
});
