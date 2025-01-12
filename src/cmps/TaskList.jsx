import { TaskPreview } from './TaskPreview'

export function TaskList({ group, colWidth }) {
	return (
		<ul className="task-list task-row">
			{group.tasks.map(task => (
				<TaskPreview key={task.id} task={task} colWidth={colWidth} />
			))}
		</ul>
	)
}
