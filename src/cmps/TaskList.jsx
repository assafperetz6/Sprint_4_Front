import { Draggable, Droppable } from '@hello-pangea/dnd'
import { AddTask } from './AddTask'
import { TaskPreview } from './TaskPreview'

export function TaskList({ group }) {
	return (
		<Droppable droppableId={group.id}>
			{provided => (
				<ul className="task-list task-col full" {...provided.droppableProps} ref={provided.innerRef}>
					{group.tasks.map((task, idx) => (
						<Draggable key={task.id} draggableId={task.id} index={idx}>
							{provided => (
								<li className="task-preview task-row flex full" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
									<TaskPreview key={task.id} group={group} task={task} />
								</li>
							)}
						</Draggable>
					))}
					{provided.placeholder}
					<li className="add-task full">
						<AddTask group={group} />
					</li>
				</ul>
			)}
		</Droppable>
	)
}
