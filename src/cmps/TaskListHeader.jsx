import { hexToRgba } from '../services/util.service'

import { useSelector } from 'react-redux'

export function TaskListHeader({ group, tasks, colWidth }) {
	const board = useSelector(storeState => storeState.boardModule.board)

	return (
		<ul className="task-list-header task-row clean-list">
			<div className="colored-border" style={{ backgroundColor: hexToRgba(group.style.color, 1) }}></div>
			<li className="check-box">
				<input type="checkbox" />
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
