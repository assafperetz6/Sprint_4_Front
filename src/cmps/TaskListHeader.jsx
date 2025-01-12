import { useSelector } from 'react-redux'

export function TaskListHeader({ group, tasks, colWidth }) {
	const board = useSelector(storeState => storeState.boardModule.board)

	return (
		<ul className="task-list-header task-row clean-list">
			<li className="checkbox">
				<button></button>
			</li>

			<li className="sticky-container task-title-header">Item</li>

			{board.cmpsOrder.map(columnTitle => (
				<li style={{ width: colWidth }} key={columnTitle}>
					{columnTitle}
				</li>
			))}
			<li className="line-end"></li>
		</ul>
	)
}
