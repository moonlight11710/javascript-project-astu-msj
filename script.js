let tasks = [];

const addBtn = document.querySelector("#addBtn");
const clearBtn = document.querySelector("#clearBtn");
const taskList = document.querySelector("#taskList");
const remainingTasks = document.querySelector("#remainingCount");
const counter = document.querySelector("#counter");
const allDoneMsg = document.querySelector("#allDoneMsg");

function renderTasks() {

    taskList.innerHTML = "";

    for (let i = 0; i < tasks.length; i++) {

        const listItem = document.createElement("li");
        listItem.classList.add("task-item");

        if (tasks[i].done == true) {
            listItem.classList.add("done");
        }

        const span = document.createElement("span");
        span.classList.add("task-text");
        span.textContent = tasks[i].text;

        const doneBtn = document.createElement("button");
        doneBtn.textContent = "Done";
        doneBtn.classList.add("done-btn");

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete-btn");

        doneBtn.addEventListener("click", function () {

            if (tasks[i].done == true) {
                tasks[i].done = false;
            }
            else {
                tasks[i].done = true;
            }

            renderTasks();

        });

        deleteBtn.addEventListener("click", function () {

            tasks.splice(i, 1);

            renderTasks();

        });

        listItem.appendChild(span);
        listItem.appendChild(doneBtn);
        listItem.appendChild(deleteBtn);

        taskList.appendChild(listItem);

    }

    const remaining = tasks.filter(function(task) {
        return task.done == false;
    }).length;

    remainingTasks.textContent = remaining;

    if (tasks.length > 0 && remaining == 0) {

        counter.textContent = "🎉 All tasks done!";
        counter.style.color = "#388e3c";

        allDoneMsg.classList.add("visible");

    }
    else {

        counter.innerHTML = 'Tasks remaining: <span id="remainingCount">' + remaining + "</span>";
        counter.style.color = "";

        allDoneMsg.classList.remove("visible");

    }

}

addBtn.addEventListener("click", function () {

    const input = document.querySelector("#taskInput");
    const text = input.value.trim();

    if (text == "") {
        alert("Please type a task first");
        return;
    }

    let exists = false;

    for (let i = 0; i < tasks.length; i++) {

        if (tasks[i].text.toLowerCase() == text.toLowerCase()) {
            exists = true;
        }

    }

    if (exists == true) {

        alert("This task already exists!");

    }
    else {

        const newTask = {
            text: text,
            done: false
        };

        tasks.push(newTask);

        input.value = "";

        renderTasks();

    }

});

clearBtn.addEventListener("click", function () {

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