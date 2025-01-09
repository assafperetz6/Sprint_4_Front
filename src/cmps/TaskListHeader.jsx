export function TaskListHeader({ cmpsOrder, group, tasks, colWidth }) {
	return (
		<ul className="task-list-header task-row clean-list">
			<li className="checkbox">
				<button></button>
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
