import { AddTask } from './AddTask'
import { TaskPreview } from './TaskPreview'

export function TaskList({ group, cmpsOrder, colWidth }) {
	return (
		<ul className="task-list task-row">
			{group.tasks.map(task => (
				<TaskPreview group={group} key={task.id} task={task} cmpsOrder={cmpsOrder} colWidth={colWidth} />
			))}
			<li>
				<AddTask group={group} />
			</li>
		</ul>
	)
}
