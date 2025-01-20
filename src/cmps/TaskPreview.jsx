import { Link, useParams } from 'react-router-dom'
import { svgs } from '../services/svg.service'
import { hexToRgba } from '../services/util.service'

import { useDispatch, useSelector } from 'react-redux'
import { DynamicCmp } from './DynamicCmp'
import { SET_BOARD } from '../store/reducers/board.reducer'
import { boardService } from '../services/board'
import { showErrorMsg } from '../services/event-bus.service'
import { removeTask, updateTask } from '../store/actions/board.actions'
import { Checkbox } from './Checkbox'
import { useEffect, useState } from 'react'

export function TaskPreview({ group, task }) {
	const board = useSelector(storeState => storeState.boardModule.board)
	const { boardId } = useParams()
	const [isEditing, setIsEditing] = useState(false)
	const [titleToEdit, setTitleToEdit] = useState('')
	const [activeMenuId, setActiveMenuId] = useState(null)


	useEffect(() => {
		setTitleToEdit(task.title)
	}, [])


	function toggleContextMenu(ev, taskId) {
		setActiveMenuId(prev => (prev === taskId ? null : taskId))
	}

	function onRemoveTask(taskId) {
		try {
			removeTask(board._id, taskId)
		} catch (err) {
			console.log('cannot remove task', err)
			showErrorMsg('cannot remove task')
		}
	}

	function handleChnage({ target }) {
		setTitleToEdit(target.value)
	}

	async function onSaveTask() {
		try {
			const taskToSave = { ...task, title: titleToEdit }
			await updateTask(board._id, group.id, taskToSave)
		} catch (err) {
			console.log('cannot update title', err)
			showErrorMsg('cannot update title')
		}
	}

	function onBlur() {
		if (titleToEdit) {
			onSaveTask()
			setIsEditing(false)
		} else return
	}

	return (
		<li className="task-preview task-row flex full">
			<section className="sticky-container">
				<div className="context-btn-container">
					<button
						className={`task-context-menu ${
							activeMenuId === task.id ? 'open' : ''
						}`}
						onClick={(ev) => toggleContextMenu(ev, task.id)}
					>
						{svgs.threeDots}
					</button>
				</div>
				<div className="colored-border" style={{ backgroundColor: hexToRgba(group.style.color, 1) }}></div>

				<Checkbox />

				<section className="task-title">
					<div className="title-main-container">
						<input type="text" onChange={handleChnage} onBlur={onBlur} value={titleToEdit} />

						<Link to={`task/${task.id}`} className="open-task-details">
							&nbsp; {svgs.expand} open
						</Link>
					</div>
					<div className="add-update-btn">{svgs.addUpdate}</div>
				</section>
			</section>

			<section className="task-col flex">
				{board.cmpsOrder.map((cmp, idx) => (
					<DynamicCmp cmp={cmp} key={idx} groupId={group.id} task={task} />
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
