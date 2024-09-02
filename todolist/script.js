const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        const li = document.createElement('li');
        li.textContent = taskText;
        taskList.appendChild(li);
        taskInput.value = '';

        // Handle task completion
        li.addEventListener('click', completeTask);

        // Handle task deletion
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', deleteTask);
        li.appendChild(deleteBtn);
    }
}

// Display Tasks:
// This step is already covered by the code in step 3.

// Handle Task Completion:
function completeTask(event) {
    const task = event.target;
    task.classList.toggle('completed');
}

// Handle Task Deletion:
function deleteTask(event) {
    const task = event.target.parentElement;
    taskList.removeChild(task);
}
function editTask(taskElement) {
    let newTaskText = prompt("Edit the task:", taskElement.textContent);
    
    if (newTaskText !== null && newTaskText.trim() !== "") {
        taskElement.textContent = newTaskText.trim();
        
        // Re-add the event listener for further edits
        taskElement.addEventListener('click', function() {
            editTask(taskElement);
        });
    }
}
