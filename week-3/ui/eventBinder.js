import { DOM } from "./domSelectors.js";
import { taskService } from "../services/taskService.js";
import { renderTasks } from "./taskRenderer.js";
import { renderStats } from "./statsRenderer.js";
import { FILTER_TYPES } from "../constants/filterTypes.js";

let currentFilter = FILTER_TYPES.ALL;

const updateSubmitButtonState = () => {
    const trimmedValue = DOM.taskInput.value.trim();
    DOM.submitButton.disabled = !trimmedValue.length;
};

const refreshUI = () => {
    const filteredTasks = taskService.getFilteredTasks(currentFilter);
    renderTasks(filteredTasks);
    renderStats(taskService.getStatistics());
};

const updateActiveFilterUI = (activeButton) => {
    DOM.filterButtons.forEach((button) => {
        button.classList.remove("active");
        button.setAttribute("aria-pressed", "false");
    });

    activeButton.classList.add("active");
    activeButton.setAttribute("aria-pressed", "true");
};

export const bindEvents = () => {
    updateSubmitButtonState();

    DOM.taskInput.addEventListener("input", updateSubmitButtonState);

    DOM.form.addEventListener("submit", (event) => {
        event.preventDefault();

        const result = taskService.addTask({
            text: DOM.taskInput.value,
            dueDate: DOM.dueDateInput.value,
        });

        if (!result.isValid) {
            DOM.errorContainer.textContent = result.message;
            return;
        }

        DOM.errorContainer.textContent = "";
        DOM.form.reset();

        updateSubmitButtonState();

        refreshUI();
    });

    DOM.taskList.addEventListener("click", (event) => {
        const listItem = event.target.closest("li");
        if (!listItem) return;

        const taskId = listItem.dataset.id;

        if (event.target.classList.contains("task-delete")) {
            taskService.deleteTask(taskId);
            refreshUI();
        }
    });

    DOM.taskList.addEventListener("change", (event) => {
        if (!event.target.classList.contains("task-checkbox")) return;

        const listItem = event.target.closest("li");
        const taskId = listItem.dataset.id;

        taskService.toggleTaskCompletion(taskId);
        refreshUI();
    });

    DOM.filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            currentFilter = button.dataset.filter;
            updateActiveFilterUI(button);
            refreshUI();
        });
    });
};