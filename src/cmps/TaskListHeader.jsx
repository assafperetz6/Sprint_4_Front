import { hexToRgba } from '../services/util.service'

import { useSelector } from 'react-redux'
import { Checkbox } from './Checkbox'

export function TaskListHeader({ groupColor }) {
	const board = useSelector(storeState => storeState.boardModule.board)

	return (
		<ul className="task-list-header task-row clean-list full">
			<li className="sticky-container flex">
				<div className="colored-border" style={{ backgroundColor: hexToRgba(groupColor, 1) }}></div>
				<Checkbox />
				<div className="task-title-header">Task</div>
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
							cmpDefaultWidth = '140px'
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
