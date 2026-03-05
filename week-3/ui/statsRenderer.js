import { DOM } from "./domSelectors.js";

export const renderStats = ({ total, active, completed }) => {
    DOM.statsContainer.textContent =
        `Total: ${total} | Active: ${active} | Completed: ${completed}`;
};