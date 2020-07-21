// UI & ADD TASK ITEMS

// Define UI Variables
const form = document.getElementById('task-form');
const taskList = document.querySelector('ul.collection');
const clearBtn = document.querySelector('a.clear-tasks');
const filter = document.getElementById('filter');
const taskInput = document.getElementById('task');

// Function To Load All Event Listeners
loadEventListeners();

// Load All Event Listeners
function loadEventListeners() {
    // DOM load event
    document.addEventListener('DOMContentLoaded', getTasks);
    // add task event
    form.addEventListener('submit', addTask);
    // remove task event
    taskList.addEventListener('click', removeTask);
    // clear tasks event
    clearBtn.addEventListener('click', clearTasks);
    // filter tasks event
    filter.addEventListener('keyup', filterTasks);
}

// Get Tasks From Local Storage
function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(task => {
        // create li if input isn't empty
        const li = document.createElement('li');
        // add class name
        li.className = 'collection-item'
        // create new text node and append to li
        li.appendChild(document.createTextNode(task));
        // create new link element
        const link = document.createElement('a');
        // add class
        link.className = 'delete-item secondary-content';
        // add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';
        li.appendChild(link);
        // append li to ul
        taskList.appendChild(li);
    });
}

// Add Task Function
function addTask() {
    if (taskInput.value === '') {
        alert('Please add a task');
    } else {
        // create li if input isn't empty
        const li = document.createElement('li');
        // add class name
        li.className = 'collection-item'
        // create new text node and append to li
        li.appendChild(document.createTextNode(taskInput.value));
        // create new link element
        const link = document.createElement('a');
        // add class
        link.className = 'delete-item secondary-content';
        // add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';
        li.appendChild(link);
        // append li to ul
        taskList.insertBefore(li, taskList.firstChild);
        // persist data (tasks) to local storage
        storeTaskInLocalStorage(taskInput.value);
        // clear input
        taskInput.value = '';
    }
}

// Store Task In Local Storage
function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.unshift(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove Task Function
function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are you sure you want delete?')) {
            e.target.parentElement.parentElement.remove();
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

// Remove From Local Storage
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    tasks = JSON.parse(localStorage.getItem('tasks'));

    for (let i = 0; i < tasks.length; i++) {
        if (taskItem.textContent == tasks[i]) {
            tasks.splice(i, 1);
        }
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear Tasks Function
function clearTasks() {
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
    clearTasksFromLocalStorage();
}

// Clear Tasks From Local Storage Function
function clearTasksFromLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify([]));
    // OR:
    // localStorage.clear();
}

// Filter Tasks Function
function filterTasks(e) {
    const text = e.target.value.toLowerCase();
    console.log(text);
    // returns a node list which we can iterate through
    document.querySelectorAll('.collection-item').forEach(task => {
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}