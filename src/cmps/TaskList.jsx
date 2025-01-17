import { AddTask } from './AddTask'
import { TaskPreview } from './TaskPreview'

export function TaskList({ group }) {
	return (
		<ul className="task-list task-col full">
			{group.tasks.map(task => (
				<TaskPreview key={task.id} group={group} task={task} />
			))}
			<li className="add-task full">
				<AddTask group={group} />
			</li>
		</ul>
	)
}
