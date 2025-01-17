import { hexToRgba } from '../services/util.service'

import { useSelector } from 'react-redux'

export function TaskListHeader({ group, tasks, colWidth }) {
	const board = useSelector(storeState => storeState.boardModule.board)

	return (
		<ul className="task-list-header task-row clean-list flex full">
			<li className="sticky-container flex">
				<div className="colored-border" style={{ backgroundColor: hexToRgba(group.style.color, 1) }}></div>
				<input type="checkbox" className="check-box" />
				<div className="task-title-header">Item</div>
			</li>

			<ul className="task-columns flex">
				{board.cmpsOrder.map((cmp, idx) => {
					let cmpTitle
					let cmpDefaultWidth
					switch (cmp) {
						case 'StatusPicker':
							cmpTitle = 'Status'
							cmpDefaultWidth = '140px'
							break
						case 'PriorityPicker':
							cmpTitle = 'Priority'
							cmpDefaultWidth = '140px'
							break
						case 'MemberPicker':
							cmpTitle = 'People'
							cmpDefaultWidth = '97px'
							break
						case 'DatePicker':
							cmpDefaultWidth = '140px'
							cmpTitle = 'Date'
							break
						case 'TimelinePicker':
							cmpDefaultWidth = '130px'
							cmpTitle = 'Timeline'
							break
						default:
							cmpTitle = null
					}

					return (
						cmpTitle && (
							<li key={cmp} className="task-item-col" style={{ width: cmpDefaultWidth }}>
								{cmpTitle}
							</li>
						)
					)
				})}
				<li className="line-end task-item-col"></li>
			</ul>
		</ul>
	)
}
