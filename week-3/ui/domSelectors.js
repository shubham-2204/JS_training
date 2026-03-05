export const DOM = {
    form: document.getElementById("task-form"),
    taskInput: document.getElementById("task-input"),
    dueDateInput: document.getElementById("task-due-date"),
    taskList: document.getElementById("task-list"),
    filterButtons: document.querySelectorAll("[data-filter]"),
    statsContainer: document.getElementById("task-stats"),
    errorContainer: document.getElementById("form-error"),
    emptyState: document.getElementById("empty-state"),
    submitButton: document.querySelector("#task-form button[type='submit']"),
};