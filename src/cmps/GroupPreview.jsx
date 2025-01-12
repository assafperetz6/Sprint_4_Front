import { useState } from 'react'
import { TaskListHeader } from './TaskListHeader'
import { TaskList } from './TaskList'

export function GroupPreview({ group }) {
	const [colWidth, setColwidth] = useState('150px')

	return (
		<section className="group-preview">
			<div className="group-sticky-container">
				<div className="header-container">
					<h4 className="group-title">{group.title}</h4>
				</div>
				<TaskListHeader group={group} tasks={group.tasks} colWidth={colWidth} />
			</div>
			<TaskList group={group} colWidth={colWidth} />
		</section>
	)
}
