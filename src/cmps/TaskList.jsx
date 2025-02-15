import { Droppable } from '@hello-pangea/dnd'
import { AddTask } from './AddTask'
import { TaskPreview } from './TaskPreview'

export function TaskList({ group }) {
	const activeTasks = group.tasks.filter(task => !task.archivedAt)

	return (
		<Droppable droppableId={group.id}>
			{provided => (
				<ul className="task-list task-col full" {...provided.droppableProps} ref={provided.innerRef}>
					{activeTasks.map((task, idx) => (
						<TaskPreview key={task.id} group={group} task={task} idx={idx} />
					))}
					{provided.placeholder}
					<AddTask group={group} />
				</ul>
			)}
		</Droppable>
	)
}
