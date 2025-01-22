import { Link } from 'react-router-dom'
import { svgs } from '../services/svg.service'
import { hexToRgba } from '../services/util.service'

import { useSelector } from 'react-redux'
import { DynamicCmp } from './DynamicCmp'
import { showErrorMsg } from '../services/event-bus.service'
import { removeTask, updateTask } from '../store/actions/board.actions'
import { Checkbox } from './Checkbox'
import { useEffect, useState } from 'react'
import { InlineEdit } from './InlineEdit'

export function TaskPreview({ group, task }) {
	// eslint-disable-next-line no-unused-vars
	const board = useSelector(storeState => storeState.boardModule.board)
	const [isTaskHovered, setIsTaskHovered] = useState(false)
	const [titleToEdit, setTitleToEdit] = useState(task.title)
	const [activeMenuId, setActiveMenuId] = useState(null)

	useEffect(() => {
		setTitleToEdit(task.title)
	}, [])

	function toggleContextMenu(ev, taskId) {
		setActiveMenuId(prev => (prev === taskId ? null : taskId))
	}

	// eslint-disable-next-line no-unused-vars
	function onRemoveTask(taskId) {
		try {
			removeTask(board._id, taskId)
		} catch (err) {
			console.log('cannot remove task', err)
			showErrorMsg('cannot remove task')
		}
	}

	async function onSaveTask(newTitle) {
		try {
			const taskToSave = { ...task, title: newTitle }
			await updateTask(board._id, group.id, taskToSave)
		} catch (err) {
			console.log('cannot update title', err)
			showErrorMsg('cannot update title')
		}
	}

	return (
		<li className="task-preview task-row flex full">
			<section className="sticky-container">
				<div className="context-btn-container">
					<button className={`task-context-menu ${activeMenuId === task.id ? 'open' : ''}`} onClick={ev => toggleContextMenu(ev, task.id)}>
						{svgs.threeDots}
					</button>
				</div>
				<div className="colored-border" style={{ backgroundColor: hexToRgba(group.style.color, 1) }}></div>

				<Checkbox />

				<section className="task-title">
					<div className="title-main-container" onMouseEnter={() => setIsTaskHovered(true)} onMouseLeave={() => setIsTaskHovered(false)}>
						<InlineEdit value={titleToEdit} onSave={newTitle => onSaveTask(newTitle)} />
						<Link to={`task/${task.id}`} className="open-task-details" style={{ display: isTaskHovered ? 'flex' : 'none' }}>
							&nbsp; {svgs.expand} open
						</Link>
					</div>
					<div className="add-update-btn">{svgs.addUpdate}</div>
				</section>
			</section>

			<section className="task-col flex">
				{board.cmpsOrder.map((cmp, idx) => (
					<DynamicCmp cmp={cmp} key={idx} group={group} task={task} />
				))}
				<li className="line-end"></li>
			</section>
		</li>
	)
}

// DELETE TASK BTN:

{
	/* <button className="delete-btn" onClick={() => deleteTask(task.id)}>
{svgs.delete}
</button> */
}
