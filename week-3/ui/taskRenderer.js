import { DOM } from "./domSelectors.js";

export const renderTasks = (tasks) => {
    DOM.taskList.innerHTML = "";

    if (!tasks.length) {
        DOM.emptyState.classList.remove("hidden");
        return;
    }

    DOM.emptyState.classList.add("hidden");

    tasks.forEach((task) => {
        const listItem = document.createElement("li");
        listItem.className = "task-item";
        listItem.dataset.id = task.id;

        if (task.completed) {
            listItem.classList.add("completed");
        }

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.className = "task-checkbox";

        const textContainer = document.createElement("div");
        textContainer.className = "task-content";

        const title = document.createElement("span");
        title.className = "task-title";
        title.textContent = task.text;

        textContainer.appendChild(title);

        if (task.dueDate) {
            const dueDate = document.createElement("small");
            dueDate.className = "task-due-date";
            dueDate.textContent = `Due: ${task.dueDate}`;
            textContainer.appendChild(dueDate);
        }

        const deleteButton = document.createElement("button");
        deleteButton.className = "btn btn-danger task-delete";
        deleteButton.textContent = "Delete";

        listItem.appendChild(checkbox);
        listItem.appendChild(textContainer);
        listItem.appendChild(deleteButton);

        DOM.taskList.appendChild(listItem);
    });
};