import { hexToRgba } from '../services/util.service'

export function TaskListHeader({ cmpsOrder, group, tasks, colWidth }) {
	return (
		<ul className="task-list-header task-row clean-list">
			<div className="colored-border" style={{ backgroundColor: hexToRgba(group.style.color, 1) }}></div>
			<li className="check-box">
				<input type="checkbox" />
			</li>

			<li className="sticky-container task-title-header">Item</li>

			{cmpsOrder.map(columnTitle => (
				<li style={{ width: colWidth }} key={columnTitle}>
					{columnTitle}
				</li>
			))}
			<li className="line-end"></li>
		</ul>
	)
}
