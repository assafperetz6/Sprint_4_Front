import { hexToRgba } from '../services/util.service'
import { useSelector } from 'react-redux'
import { Checkbox } from './Checkbox'
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd'
import { updateBoardOptimistic } from '../store/actions/board.actions'
import { showErrorMsg } from '../services/event-bus.service'

function getColumnConfig(cmp) {
	switch (cmp) {
		case 'StatusPicker':
			return { title: 'Status', width: '140px' }
		case 'PriorityPicker':
			return { title: 'Priority', width: '140px' }
		case 'MemberPicker':
			return { title: 'People', width: '97px' }
		case 'DatePicker':
			return { title: 'Date', width: '140px' }
		case 'TimelinePicker':
			return { title: 'Timeline', width: '140px' }
		default:
			return null
	}
}

export function TaskListHeader({ groupColor, shadow }) {
	const board = useSelector(storeState => storeState.boardModule.board)

	async function handleDrag(result) {
		if (!result.destination) return
		const newBoard = structuredClone(board)
		const [col] = newBoard.cmpsOrder.splice(result.source.index, 1)
		newBoard.cmpsOrder.splice(result.destination.index, 0, col)

		try {
			await updateBoardOptimistic(newBoard)
		} catch (err) {
			showErrorMsg('Cannot reorder columns')
			console.error(err)
		}
	}

	return (
		<DragDropContext onDragEnd={handleDrag}>
			<ul className="task-list-header task-row clean-list full">
				<li className="sticky-container flex">
					<div className="colored-border" style={{ backgroundColor: hexToRgba(groupColor, 1) }} />
					<Checkbox />
					<div className={`task-title-header ${shadow ? 'shadow' : ''}`}>Task</div>
				</li>

				<Droppable droppableId="task-columns" direction="horizontal" type="column">
					{provided => (
						<ul className="task-columns flex" {...provided.droppableProps} ref={provided.innerRef}>
							{board.cmpsOrder.map((cmp, idx) => (
								<Draggable key={cmp} draggableId={cmp} index={idx}>
									{provided => (
										<li
											className="task-item-col"
											ref={provided.innerRef}
											{...provided.draggableProps}
											{...provided.dragHandleProps}
											style={{
												width: getColumnConfig(cmp).width,
												...provided.draggableProps.style
											}}
										>
											{getColumnConfig(cmp).title}
										</li>
									)}
								</Draggable>
							))}
							{provided.placeholder}
							<li className="line-end task-item-col" />
						</ul>
					)}
				</Droppable>
			</ul>
		</DragDropContext>
	)
}
