let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");

// An empty array to store tasks
let arrayOfTasks = [];

// Check if there is data in local storage
if (localStorage.getItem("tasks")) {
    arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}

getDataFromLocalStorage();

// Add task
submit.onclick = function () {
    if (input.value !== "") {
        addTaskToArray(input.value); //Add task to array of tasks
        input.value = ""; //Empty input field
    }
}

// Click on task Element
tasksDiv.addEventListener("click", (e) => {
    // Delete Button
    if (e.target.classList.contains("del")) {
        // Remover task from local storage
        deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
        // Remove task from page
        e.target.parentElement.remove();
    }
    // Task Element
    if (e.target.classList.contains("task")) {
        // Toggle Completed for the task
        toggleTaskStatusWith(e.target.getAttribute("data-id"));
        // Toggle done class
        e.target.classList.toggle("done");
    }
})

function addTaskToArray(taskText) {
    // Task Content
    const task = {
        id: Date.now(),
        title: taskText,
        completed: false,
    }; 
    // Push task into array
    arrayOfTasks.push(task);
    // Add elements to page 
    addElementsToPageFrom(arrayOfTasks);
    // Add tasks to local storage
    addDatetoLocalStorageFrom(arrayOfTasks);
}

function addElementsToPageFrom(arrayOfTasks) {
    // Empty tasks div
    tasksDiv.innerHTML= "";
    // looping on array of tasks
    arrayOfTasks.forEach((task) => {
        // Create Main Div
        let div = document.createElement("div");
        div.className = "task";
        // Check if task is done
        if (task.completed) {
            div.className = "task done";
        }
        div.setAttribute("data-id", task.id);
        div.appendChild(document.createTextNode(task.title));
        // Create Delete Button
        let span = document.createElement("span");
        span.className = "del";
        span.appendChild(document.createTextNode("Delete"));
        // Append Button to Main Div
        div.appendChild(span);
        // Add div to page
        tasksDiv.appendChild(div);
    });
}

function addDatetoLocalStorageFrom(arrayOfTasks) {
    window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

function getDataFromLocalStorage() {
    let data = window.localStorage.getItem("tasks");
    if (data) {
        let tasks = JSON.parse(data);
        addElementsToPageFrom(tasks);
    }
}

function deleteTaskWith(taskId) {
    arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
    addDatetoLocalStorageFrom(arrayOfTasks);
}

function toggleTaskStatusWith(taskId) {
    for (let i = 0; i < arrayOfTasks.length; i++) {
        if (arrayOfTasks[i].id == taskId) {
            arrayOfTasks[i].completed == false ? (arrayOfTasks[i].completed = true) : (arrayOfTasks[i].completed = false);
        }
    }
    addDatetoLocalStorageFrom(arrayOfTasks);
}