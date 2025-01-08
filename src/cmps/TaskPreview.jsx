import { LabelPicker } from "../assets/styles/cmps/LabelPicker";

export function TaskPreview({ task, cmpsOrder }) {
    return (
        <ul className="task-preview">
            <li className="checkbox"><button></button></li>
            <li>{task.title}</li>
            {cmpsOrder.map(columnType => <LabelPicker key={columnType + task.id} task={task} columnType={columnType} />)}
        </ul>
    )
}