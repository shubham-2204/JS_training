export const isPastDate = (dateString) => {
    if (!dateString) return false;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const providedDate = new Date(dateString);
    return providedDate < today;
};

export const compareByDueDate = (taskA, taskB) => {
    if (!taskA.dueDate && !taskB.dueDate) return 0;
    if (!taskA.dueDate) return 1;
    if (!taskB.dueDate) return -1;

    return new Date(taskA.dueDate) - new Date(taskB.dueDate);
};