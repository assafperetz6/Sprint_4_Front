// import { svgs } from '../services/svg.service'
// import { hexToRgba } from '../services/util.service'
// import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd'
// import {
// 	CollapsedDraggedPreview,
// 	CollapsedGroupPreview,
// } from './CollapsedGroupPreview'
// import { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux'

// export function GroupsWhileDnd({ groups, boardId }) {
//     const board = useSelector((storeState) => storeState.boardModule.board)
// 	const [isDragging, setIsDragging] = useState(false)

// 	function getTasksCount(tasksCount) {
// 		if (!tasksCount) return 'No Items'
// 		if (tasksCount === 1) return tasksCount + ' Item'
// 		return tasksCount + ' Items'
// 	}

// 	function handleStartDragging(result) {
// 		if (result.type === 'group') {
// 			setIsAllCollapsed(true)
// 			setIsDragging(true)
// 		}
// 	}

// 	async function handleDrag(result) {
// 		if (!result.destination) {
// 			setIsAllCollapsed(false)
// 			setIsDragging(false)
// 			return
// 		}

// 		if (result.type === 'group') {
// 			await handleGroupDrag(result)
// 			setIsAllCollapsed(false)
// 		} else {
// 			handleTaskDrag(result)
// 		}
// 		setIsDragging(false)
// 	}

// 	async function handleGroupDrag(result) {
// 		const newBoard = structuredClone(board)
// 		const groupToMove = newBoard.groups.splice(result.source.index, 1)[0]

// 		newBoard.groups.splice(result.destination.index, 0, groupToMove)

// 		try {
// 			updateBoardOptimistic(newBoard)
// 		} catch (err) {
// 			showErrorMsg('cannot save board')
// 		}
// 	}

// 	return (
// 		<DragDropContext
// 			onDragEnd={handleDrag}
// 			onBeforeDragStart={handleStartDragging}
// 		>
// 			<Droppable droppableId={boardId} type="group">
// 				{(provided) => (
// 					<section
// 						className="collapsed group-list"
// 						ref={provided.innerRef}
// 						{...provided.droppableProps}
// 					>
// 						{groups.map((group, idx) => (
// 							<section
// 								key={group.id}
// 								className="collapsed-group-preview full"
// 							>
// 								<CollapsedDraggedPreview group={group} idx={idx} />
// 							</section>
// 						))}
// 				{provided.placeholder}
// 					</section>
// 				)}
// 			</Droppable>
// 		</DragDropContext>
// 	)
// }
