import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	addGroup,
	updateBoard,
	updateBoardOptimistic,
} from '../store/actions/board.actions.js'

import { boardService } from '../services/board/index.js'
import { showErrorMsg } from '../services/event-bus.service.js'

import { svgs } from '../services/svg.service.jsx'

import { GroupHeader } from './GroupHeader.jsx'
import { GroupPreview } from './GroupPreview.jsx'

import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd'
import { CollapsedGroupPreview } from './CollapsedGroupPreview.jsx'

export function GroupList({ isScrolledTop, scrollContainer }) {
	const board = useSelector((storeState) => storeState.boardModule.board)
	const groups = board.groups
	const [isDragging, setIsDragging] = useState(false)
	const dispatch = useDispatch()

	const [currentGroup, setCurrentGroup] = useState(groups[0])
	const [isAllCollapsed, setIsAllCollapsed] = useState(false)
	const [titleColWidth, setTitleColWidth] = useState(null)
	const groupRefs = useRef([])

	useEffect(() => {
		setCurrentGroup(groups[0])
	}, [groups])

	useEffect(() => {
		if (!scrollContainer) return
		const windowVH = window.innerHeight

		const options = {
			rootMargin: `-200px 0px -${windowVH - 130}px`,
		}

		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				const idx = parseInt(entry.target.dataset.groupIndex)
				const group = board.groups[idx]

				if (
					currentGroup.id === group.id &&
					currentGroup.isCollapsed !== group.isCollapsed
				)
					setCurrentGroup(group)

				if (entry.isIntersecting) setCurrentGroup(group)
			})
		}, options)

		// Observe all group elements
		groupRefs.current.forEach((element, idx) => {
			if (element) {
				element.dataset.groupIndex = idx
				observer.observe(element)
			}
		})

		return () => {
			groupRefs.current.forEach((element) => {
				if (element) observer.unobserve(element)
			})
		}
	}, [board.groups, scrollContainer, currentGroup?.isCollapsed])

	function onAddGroup() {
		const groupToAdd = boardService.getNewGroup()
		try {
			addGroup(board._id, groupToAdd)
		} catch (err) {
			showErrorMsg('cannot add group')
			console.log('cannot add group', err)
		}
	}

	function handleStartDragging(result) {
		if (result.type === 'group') {
			setIsAllCollapsed(true)
			setIsDragging(true)
		}
	}

	async function handleDrag(result) {
		if (!result.destination) {
			setIsAllCollapsed(false)
			setIsDragging(false)
			return
		}

		if (result.type === 'group') {
			await handleGroupDrag(result)
			setIsAllCollapsed(false)
		} else {
			handleTaskDrag(result)
		}
		setIsDragging(false)
	}

	async function handleGroupDrag(result) {
		const newBoard = structuredClone(board)
		const groupToMove = newBoard.groups.splice(result.source.index, 1)[0]

		newBoard.groups.splice(result.destination.index, 0, groupToMove)

		try {
			updateBoardOptimistic(newBoard)
		} catch (err) {
			showErrorMsg('cannot save board')
		}
	}

	async function handleTaskDrag(result) {
		const { destination, source } = result
		if (
			!destination ||
			(source.droppableId === destination.droppableId &&
				source.index === destination.index)
		)
			return

		try {
			const boardToSave = structuredClone(board)
			const sourceGroupIdx = boardToSave.groups.findIndex(
				(g) => g.id === source.droppableId
			)
			const destGroupIdx = boardToSave.groups.findIndex(
				(g) => g.id === destination.droppableId
			)

			const [task] = boardToSave.groups[sourceGroupIdx].tasks.splice(
				source.index,
				1
			)
			boardToSave.groups[destGroupIdx].tasks.splice(destination.index, 0, task)

			await updateBoardOptimistic(boardToSave)
		} catch (err) {
			showErrorMsg('Failed to move task')
			console.error('Task drag error:', err)
		}
	}

	// console.log(isDragging)
	return (
		<DragDropContext
			onDragEnd={handleDrag}
			onBeforeDragStart={handleStartDragging}
		>
			<Droppable droppableId={board._id} type="group">
				{(provided) => (
					<section
						className="group-list"
						{...provided.droppableProps}
						ref={provided.innerRef}
					>
						<Draggable draggableId={currentGroup.id} index={0}>
							{(provided) => (
								<div
									className={`sticky-header-container full`}
									style={{
										visibility:
											currentGroup && !currentGroup.isCollapsed
												? 'visible'
												: 'hidden',
									}}
									ref={provided.innerRef}
									{...provided.dragHandleProps}
								>
									{!isAllCollapsed && (
										<GroupHeader group={currentGroup} shadow={!isScrolledTop} />
									)}
								</div>
							)}
						</Draggable>

						{groups.map((group, idx) => (
							<div
								key={group.id}
								ref={(el) => (groupRefs.current[idx] = el)}
								className="full"
								style={{
									marginBlockStart:
										idx === 0 && group.isCollapsed ? '-72px' : 'unset',
								}}
							>
								<GroupPreview
									group={group}
									cmpsOrder={board.cmpsOrder}
									idx={idx}
									showHeader={idx >= 1}
									isAllCollapsed={isAllCollapsed}
								/>
							</div>
						))}

						{provided.placeholder}
						<div className="add-group-btn" onClick={onAddGroup}>
							<span className="icon flex align-center">{svgs.plus}</span>
							<span className="txt">Add new group</span>
						</div>
					</section>
				)}
			</Droppable>
		</DragDropContext>
	)
}

// useEffect(() => {
// 	const longestTaskTitle = () => {
// 		const text = board.groups.map(group => group.tasks.map(task => task.title).toSorted((t1, t2) => t2.length - t1.length)[0]).toSorted((title1, title2) => title2.length - title1.length)[0]

// 		const canvas = document.createElement('canvas')
// 		const context = canvas.getContext('2d')
// 		context.font = '14px Figtree'
// 		return context.measureText(text).width
// 	}

// 	setTitleColWidth(longestTaskTitle())
// }, [board])
