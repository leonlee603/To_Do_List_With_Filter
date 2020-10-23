const form = document.getElementById('task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filterInput = document.querySelector('#filter');
const taskInput = document.querySelector('#task');
const errorMsg = document.querySelector("small");

loadEventListeners();

function loadEventListeners() {
    document.addEventListener('DOMContentLoaded', getTasks)
    form.addEventListener('submit', addTask);
    taskList.addEventListener('click', removeTask);
    clearBtn.addEventListener('click', clearTasks);
    filterInput.addEventListener('keyup', filterTasks);
}
// Add task to task list and save to localStorage
function addTask(e) {
    e.preventDefault(); // Prevent refresh the page
    taskInput.value = taskInput.value.trim();
    if (taskInput.value === "") {
        errorMsg.className = "error"; // Display the error msg
        return taskInput.focus();
    }
    const li = document.createElement('li'); // Create li element
    li.className = "collection-item"; // Add style class
    li.innerHTML = taskInput.value; // Create li's content
    const cross = document.createElement('a'); // Create delete link
    cross.className = 'delete-item secondary-content'; // Add style class
    cross.innerHTML = '<i class="fa fa-remove"></i>'; // Add delete icon
    li.appendChild(cross); // Append icon to li item
    taskList.appendChild(li); // Append li item to task list (ul)
    storeTaskInLocalStorage(taskInput.value); // Store task into localStorage
    taskInput.value = ''; // Reset the input field
    errorMsg.className = ""; // Remove error message
}
// Remove task from task list and also from localStorage
function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are you sure you want to delete this task?')) { //Confirm message
            e.target.parentElement.parentElement.remove(); // Remove the li element
            removeTaskFromLocalStorage(e.target.parentElement.parentElement); // Remove value from tasks array
        }
    }
}
// Remove all the tasks and update localStorage
function clearTasks() {
    while (taskList.firstChild) { // Creat a loop and remove all li elements
        taskList.firstChild.remove(); // Or can simply set innerHTML to empty string
    }
    clearTaskFromLocalStorage();
}
// Filter tasks based on user input on filter field
function filterTasks(e) {
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(liEle => {
        const filteredValue = liEle.textContent; // filteredValue is the text inside the li element
        if (filteredValue.toLocaleLowerCase().indexOf(text) !== -1) { // Compare the li element's text with the filter's value
            liEle.style.display = 'block';
        } else { 
            liEle.style.display = 'none';
        }
    })
}
// Save tasks array to localStorage
function storeTaskInLocalStorage(task) {
    let tasksArr; // Declare the variable for storing the tasks
    if (localStorage.getItem('tasksArr') === null) {
        tasksArr = [];
    } else {
        tasksArr = JSON.parse(localStorage.getItem('tasksArr'));
    }
    tasksArr.push(task); // Add task to the array
    localStorage.setItem('tasksArr', JSON.stringify(tasksArr)); // Store all tasks into localStorage
}
// Render the tasks list from the beginning
function getTasks() {
    let tasksArr;
    if (localStorage.getItem('tasksArr') !== null) {
        tasksArr = JSON.parse(localStorage.getItem('tasksArr'));
        tasksArr.forEach(task => {
            const li = document.createElement('li'); // Create li element
            li.className = "collection-item"; // Add style class
            li.textContent = task; // Create li's content
            const cross = document.createElement('a'); // Create delete link
            cross.className = 'delete-item secondary-content'; // Add style class
            cross.innerHTML = '<i class="fa fa-remove"></i>'; // Add delete icon
            li.appendChild(cross); // Append icon to li item
            taskList.appendChild(li); // Append li item to task list (ul)
        });
    }
}
// Remove task from localStorage
function removeTaskFromLocalStorage(liEle) {
    let tasksArr = JSON.parse(localStorage.getItem('tasksArr'));
    tasksArr.forEach((task, index) => {
        if (liEle.textContent === task) {
            tasksArr.splice(index, 1);
        }
    });
    localStorage.setItem('tasksArr', JSON.stringify(tasksArr));
}
// Remove all tasks from localStorage
function clearTaskFromLocalStorage() {
    localStorage.clear();
}