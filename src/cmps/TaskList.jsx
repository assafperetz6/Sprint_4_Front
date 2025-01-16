import { AddTask } from './AddTask'
import { TaskPreview } from './TaskPreview'
import { hexToRgba } from '../services/util.service'
import { TaskListHeader } from './TaskListHeader'

export function TaskList({ group, colWidth }) {
	return (
		<ul className="task-list task-col full">
			{group.tasks.map((task) => (
				<TaskPreview
					key={task.id}
					group={group}
					task={task}
					colWidth={colWidth}
				/>
			))}
			<li className='add-task full'>
				<AddTask group={group} />
			</li>
		</ul>
	)
}
