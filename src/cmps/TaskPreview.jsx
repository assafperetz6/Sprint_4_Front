import { Link, useParams } from 'react-router-dom'
import { svgs } from '../services/svg.service'
import { hexToRgba } from '../services/util.service'

import { useDispatch, useSelector } from 'react-redux'
import { DynamicCmp } from './DynamicCmp'
import { SET_BOARD } from '../store/reducers/board.reducer'
import { boardService } from '../services/board'
import { showErrorMsg } from '../services/event-bus.service'
import { removeTask, updateTask } from '../store/actions/board.actions'
import { useEffect, useState } from 'react'

export function TaskPreview({ group, task }) {
	const [isEditing, setIsEditing] = useState(false)
	const [titleToEdit, setTitleToEdit] = useState('')

	const board = useSelector(storeState => storeState.boardModule.board)
	const { boardId } = useParams()

	useEffect(() => {
		setTitleToEdit(task.title)
	}, [])

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
			<section className="sticky-container flex">
				<div className="colored-border" style={{ backgroundColor: hexToRgba(group.style.color, 1) }}></div>

				<input type="checkbox" className="check-box" />

				<section className="task-title">
					<button className="delete-btn" onClick={() => onRemoveTask(task.id)}>
						{svgs.delete}
					</button>

					<div className="title-main-container justify-between">
						<input type="text" value={titleToEdit} onChange={handleChnage} onBlur={onBlur} />
						<Link to={`task/${task.id}`} className="open-task-details">
							&nbsp; {svgs.expand} open
						</Link>
						<div>{svgs.addUpdate}</div>
					</div>
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

// <ul className="task-preview task-row flex">
// <div className="main-preview-container">
// 	<div className="colored-border" style={{ backgroundColor: hexToRgba(group.style.color, 1) }}></div>

// 	<li className="check-box">
// 		<input type="checkbox" />
// 	</li>
// 	<div className="sticky-container">
// 		<li className="task-title">
// 			<button className="delete-btn" onClick={() => deleteTask(task.id)}>
// 				{svgs.delete}
// 			</button>
// 			<div className="title-main-container justify-between">
// 				<span>{task.title}</span>
// 				<Link to={`task/${task.id}`} className="open-task-details">
// 					&nbsp; {svgs.expand} open
// 				</Link>
// 			</div>
// 		</li>
// 	</div>

// 	{board.cmpsOrder.map((cmp, idx) => (
// 		<DynamicCmp cmp={cmp} key={idx} groupId={group.id} task={task} defaultWidth={colWidth} />
// 	))}
// </div>
// <li className="line-end"></li>
// </ul>
