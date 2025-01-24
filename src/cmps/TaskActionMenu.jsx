import { svgs } from "../services/svg.service";

export function TaskActionMenu({ tasks }) {
    return (
        <section className="task-action-menu">
            <div className="task-count">{tasks.length}</div>
            <h4>Task{tasks.length > 1 ? 's' : ''} selected</h4>

            <section className="actions">
                <button>{svgs.duplicate} Duplicate</button>
                <button>{svgs.archive} Archive</button>
                <button>{svgs.delete} Delete</button>
                <button>{svgs.arrowRight} Move to</button>
            </section>
        </section>
    )
}