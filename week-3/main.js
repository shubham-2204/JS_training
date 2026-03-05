import { taskService } from "./services/taskService.js";
import { renderTasks } from "./ui/taskRenderer.js";
import { DOM } from "./ui/domSelectors.js";
import { renderStats } from "./ui/statsRenderer.js";
import { bindEvents } from "./ui/eventBinder.js";
import { FILTER_TYPES } from "./constants/filterTypes.js";

(() => {
    taskService.initialize();

    const initialTasks = taskService.getFilteredTasks(FILTER_TYPES.ALL);
    renderTasks(initialTasks);
    renderStats(taskService.getStatistics());

    bindEvents();

    const defaultFilterButton = [...DOM.filterButtons]
        .find((btn) => btn.dataset.filter === FILTER_TYPES.ALL);

    if (defaultFilterButton) {
        defaultFilterButton.classList.add("active");
        defaultFilterButton.setAttribute("aria-pressed", "true");
    }
})();
