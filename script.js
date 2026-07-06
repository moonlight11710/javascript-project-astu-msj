let tasks = [];

const addBtn = document.querySelector("#addBtn");
const clearBtn = document.querySelector("#clearBtn");
const taskList = document.querySelector("#taskList");
const remainingTasks = document.querySelector("#remainingCount");

function renderTasks() {

    taskList.innerHTML = "";

    let count = 0;

    tasks.forEach(function(task, index) {

        const listItem = document.createElement("li");

        if (task.done == true) {
            listItem.classList.add("done");
        }
        else {
            count++;
        }

        const span = document.createElement("span");
        span.classList.add("task-text");
        span.textContent = task.text;

        const doneBtn = document.createElement("button");
        doneBtn.textContent = "Done";

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";

        doneBtn.addEventListener("click", function() {

            if (tasks[index].done == true) {
                tasks[index].done = false;
            }
            else {
                tasks[index].done = true;
            }

            renderTasks();

        });

        deleteBtn.addEventListener("click", function() {

            tasks.splice(index, 1);

            renderTasks();

        });

        listItem.appendChild(span);
        listItem.appendChild(doneBtn);
        listItem.appendChild(deleteBtn);

        taskList.appendChild(listItem);

    });

    remainingTasks.textContent = count;
}

addBtn.addEventListener("click", function() {

    const input = document.querySelector("#taskInput");
    const text = input.value.trim();

    if (text != "") {

        const newTask = {
            text: text,
            done: false
        };

        tasks.push(newTask);

        input.value = "";

        renderTasks();

    }
    else {
        alert("Please enter a task.");
    }

});

clearBtn.addEventListener("click", function() {

    tasks = [];

    renderTasks();

});

const colorCircles = document.querySelectorAll(".color-circle");

colorCircles.forEach(function(circle) {

    circle.addEventListener("click", function() {

        colorCircles.forEach(function(c) {
            c.classList.remove("active");
        });
        circle.classList.add("active");

        document.body.style.backgroundColor = circle.dataset.color;

    });

});