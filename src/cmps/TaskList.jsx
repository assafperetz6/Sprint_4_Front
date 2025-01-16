import { AddTask } from './AddTask'
import { TaskPreview } from './TaskPreview'

export function TaskList({ group }) {
	return (
		<ul className="task-list task-row">
			{group.tasks.map(task => (
				<TaskPreview key={task.id} group={group} task={task} />
			))}
			<li>
				<AddTask group={group} />
			</li>
		</ul>
	)
}
