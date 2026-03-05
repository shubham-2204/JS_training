import { generateUniqueId } from "../helpers/idGenerator.js";
import { validateTaskInput } from "../helpers/validationHelper.js";
import { compareByDueDate } from "../helpers/dateHelper.js";
import { FILTER_TYPES } from "../constants/filterTypes.js";
import { storageService } from "./storageService.js";

let tasks = [];

const sortTasks = () => {
    tasks = [...tasks].sort(compareByDueDate);
};

export const taskService = {
    initialize: () => {
        tasks = storageService.loadTasks();
        sortTasks();
    },

    getAllTasks: () => {
        return [...tasks];
    },

    getFilteredTasks: (filterType) => {
        switch (filterType) {
            case FILTER_TYPES.ACTIVE:
                return tasks.filter((task) => !task.completed);

            case FILTER_TYPES.COMPLETED:
                return tasks.filter((task) => task.completed);

            case FILTER_TYPES.ALL:
            default:
                return [...tasks];
        }
    },

    addTask: ({ text, dueDate }) => {
        const validationResult = validateTaskInput({
            text,
            dueDate,
            existingTasks: tasks,
        });

        if (!validationResult.isValid) {
            return validationResult;
        }

        const newTask = {
            id: generateUniqueId(),
            text: text.trim(),
            dueDate: dueDate || "",
            completed: false,
            createdAt: new Date().toISOString(),
        };

        tasks = [...tasks, newTask];
        sortTasks();
        storageService.saveTasks(tasks);

        return { isValid: true, message: null };
    },

    deleteTask: (taskId) => {
        tasks = tasks.filter((task) => task.id !== taskId);
        storageService.saveTasks(tasks);
    },

    toggleTaskCompletion: (taskId) => {
        tasks = tasks.map((task) =>
            task.id === taskId
                ? { ...task, completed: !task.completed }
                : task
        );

        storageService.saveTasks(tasks);
    },

    getStatistics: () => {
        const total = tasks.length;

        const completed = tasks.reduce(
            (count, task) => (task.completed ? count + 1 : count),
            0
        );

        const active = total - completed;

        return {
            total,
            active,
            completed,
        };
    },
};