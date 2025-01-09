import { useState } from 'react'
import { TaskPreview } from './TaskPreview'
import { TaskListHeader } from './TaskListHeader'
import { TaskList } from './TaskList'

export function GroupPreview({ group, cmpsOrder }) {
	const [colWidth, setColwidth] = useState('150px')

	return (
		<section className="group-preview">
			<div className="group-sticky-container">
				<div className="header-container">
					<h4 className="group-title">{group.title}</h4>
					<TaskListHeader group={group} cmpsOrder={cmpsOrder} tasks={group.tasks} colWidth={colWidth} />
				</div>
			</div>
			<TaskList group={group} cmpsOrder={cmpsOrder} colWidth={colWidth} />
		</section>
	)
}
