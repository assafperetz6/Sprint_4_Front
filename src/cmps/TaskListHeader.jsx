import { useSelector } from 'react-redux'

export function TaskListHeader({ group, task ,cmpsOrder }) {

	return (
	
			cmpsOrder.map((cmp, idx) => {
				let cmpTitle
				switch (cmp.cmpName) {
					case 'statusPicker':
						cmpTitle = 'Status'
						break
					case 'priorityPicker':
						cmpTitle = 'Priority'
						break
					case 'ownerPicker':
						cmpTitle = 'Owner'
						break
					case 'collaboratorPicker':
						cmpTitle = 'Collaborators'
						break
					case 'datePicker':
						cmpTitle = 'Date'
						break
					case 'timelinePicker':
						cmpTitle = 'Timeline'
						break
					default:
						cmpTitle = null
				}

				return (
					cmpTitle &&
					cmp.isShown && (
						<li key={cmp.id} style={{ width: cmp.defaultWidth }}>
							{cmpTitle}
							<div onMouseDown={ev => onMouseDown(ev, idx)} className={`resizing-container ${activeResizerIdx === idx ? 'is-dragging' : ''}`}></div>
						</li>
					)
				)
			})}
			<li className="line-end"></li>
		</ul>
	)
}
