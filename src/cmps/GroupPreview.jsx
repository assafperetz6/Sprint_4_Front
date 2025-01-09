import { useState } from 'react'
import { TaskPreview } from './TaskPreview'

export function GroupPreview({ group, cmpsOrder }) {
	const [colWidth, setColwidth] = useState('150px')

	return (
		<section className="group-preview">
			<div className="group-sticky-container">
				<div className="header-container">
					<h4 className="group-title">{group.title}</h4>

					<ul className="task-list-header task-row clean-list">
						<li className="checkbox">
							<button></button>
						</li>

						<li className="sticky-container task-title-header">Task</li>

						{cmpsOrder.map(columnTitle => (
							<li style={{ width: colWidth }} key={columnTitle}>
								{columnTitle}
							</li>
						))}
						<li className="line-end"></li>
					</ul>
				</div>
			</div>

			<ul className="task-list task-row">
				{group.tasks.map(task => (
					<TaskPreview key={task.id} task={task} cmpsOrder={cmpsOrder} colWidth={colWidth} />
				))}
			</ul>
		</section>
	)
}
