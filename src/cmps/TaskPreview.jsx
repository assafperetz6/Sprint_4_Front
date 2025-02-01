import { Link } from 'react-router-dom'
import { svgs } from '../services/svg.service'
import { hexToRgba } from '../services/util.service'

import { useSelector } from 'react-redux'
import { DynamicCmp } from './DynamicCmp'
import { showErrorMsg } from '../services/event-bus.service'
import { addTask, removeTask, updateTask } from '../store/actions/board.actions'
import { Checkbox } from './Checkbox'
import { useEffect, useRef, useState } from 'react'
import { InlineEdit } from './InlineEdit'
import { ContextMenu } from './ContextMenu'
import { Draggable } from '@hello-pangea/dnd'

export function TaskPreview({ group, task, idx }) {
	const board = useSelector((storeState) => storeState.boardModule.board)
	const [isTaskHovered, setIsTaskHovered] = useState(false)
	const [titleToEdit, setTitleToEdit] = useState(task.title)
	const [activeMenuId, setActiveMenuId] = useState(null)
	const buttonRef = useRef(null)

	useEffect(() => {
		setTitleToEdit(task.title)
	}, [task.title])

	// async function onSaveTask(newTitle) {
	// 	try {
	// 		await updateTask(
	// 			board._id,
	// 			group.id,
	// 			{ ...task, title: newTitle },
	// 			{ txt: 'Changed Title' }
	// 		)
	// 	} catch (err) {
	// 		showErrorMsg('Cannot update title')
	// 		console.error('Cannot update title:', err)
	// 	}
	// }

	// REFACTOR FN TO BE GENERIC

	async function onSaveTask(value, key = 'title') {
		console.log({ [key]: value })
			
		try {
		  await updateTask(
			board._id,
			group.id,
			{ ...task, [key]: value },
			{ txt: key === 'archivedAt' ? `Archived task ${task.id}` : `Changed ${key}` }
		  )
		} catch (err) {
		  showErrorMsg(`Cannot update ${key}`)
		  console.error(`Cannot update ${key}:`, err)
		}
	}

	async function onMoveTo(newGroupId) {
		try {
			await addTask(board._id, newGroupId, task, { txt: `Moved task ${task.id} from ${group.title}` }, true)
			await removeTask(
				board._id,
				task.id,
				group.id
			)
		} catch (err) {
			showErrorMsg(`Cannot move ${task.id}`)
			console.error(`Cannot move ${task.id}:`, err)
		}	
	}
	

	return (
		<Draggable key={task.id} draggableId={task.id} index={idx}>
			{(provided, snapshot) => (
				<li
					className={`task-preview task-row flex full ${
						snapshot.isDragging ? 'dragging' : ''
					}`}
					{...provided.draggableProps}
					ref={provided.innerRef}
				>
					<section className="sticky-container">
						<div className="context-btn-container">
							<button
								className={`task-context-menu ${
									activeMenuId === task.id ? 'open' : ''
								}`}
								onClick={(ev) =>
									setActiveMenuId((prev) => (prev === task.id ? null : task.id))
								}
								ref={buttonRef}
							>
								{svgs.threeDots}
							</button>
						</div>

						<div
							className="colored-border"
							style={{ backgroundColor: hexToRgba(group.style.color, 1) }}
						/>

						<Checkbox task={task} group={group} />

						<section className="task-title">
							<div
								className="title-main-container"
								onMouseEnter={() => setIsTaskHovered(true)}
								onMouseLeave={() => setIsTaskHovered(false)}
								{...provided.dragHandleProps}
							>
								<InlineEdit value={titleToEdit} onSave={onSaveTask} />
								<Link
									to={`task/${task.id}`}
									className="open-task-details"
									style={{ display: isTaskHovered ? 'flex' : 'none' }}
								>
									&nbsp; {svgs.expand} open
								</Link>
							</div>
							<div className="add-update-btn">{svgs.addUpdate}</div>
						</section>
					</section>

					<section className="task-col flex">
						{board.cmpsOrder.map((cmp, idx) => (
							<DynamicCmp key={idx} cmp={cmp} group={group} task={task} />
						))}
						<li className="line-end" />
					</section>

					{activeMenuId === task.id && (
						<ContextMenu
							type="task"
							entity={task}
							onClose={() => setActiveMenuId(null)}
							onRemove={() => removeTask(board._id, task.id, group.id)}
							onUpdate={onSaveTask}
							onMoveTo={onMoveTo}
							onRename={(task) => setTitleToEdit(task.title)}
							referenceElement={buttonRef.current}
						/>
					)}
				</li>
			)}
		</Draggable>
	)
}

// DELETE TASK BTN:

{
	/* <button className="delete-btn" onClick={() => deleteTask(task.id)}>
{svgs.delete}
</button> */
}
