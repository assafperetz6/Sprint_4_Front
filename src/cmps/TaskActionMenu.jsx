import { useRef, useState } from 'react'
import { useParams } from 'react-router'
import { svgs } from '../services/svg.service'
import {
	addTask,
	removeTask,
	removeTasks,
	updateTask,
} from '../store/actions/board.actions'
import { useDispatch, useSelector } from 'react-redux'
import { SET_SELECTED_TASKS } from '../store/reducers/board.reducer'
import { makeId } from '../services/util.service'
// import '../assets/animted icons/Duplicate.json'
// import { DotLottieReact } from '@lottiefiles/dotlottie-react'

export function TaskActionMenu({ tasks }) {
	const dispatch = useDispatch()
	const board = useSelector((storeState) => storeState.boardModule.board)

	const params = useParams()

	function onCloseMenu() {
		dispatch({ type: SET_SELECTED_TASKS })
	}

	async function onRemoveTask() {
		try {
			removeTasks(board._id, tasks)
		} catch (err) {
			console.log('Failed to remove task', err)
		}

		onCloseMenu()
	}

	async function onDuplicate() {

		for (const task of tasks) {
			const groupId = board.groups.find((group) => {
				return group.tasks.find((t) => t.id === task.id)
			}).id

            const copiedTask = { ...task, id: null, title: task.title + ' (copy)'}

			await addTask(board._id, groupId, copiedTask, task.id)
		}
		onCloseMenu()
	}

	return (
		<section className="task-action-menu">
			<div className="task-count">{tasks.length}</div>
			<h4>Task{tasks.length > 1 ? 's' : ''} selected</h4>

			<section className="actions">
				<button className="duplicate-btn" onClick={onDuplicate}>
					{svgs.duplicate}
					Duplicate
				</button>
				<button>{svgs.archive} Archive</button>
				<button onClick={onRemoveTask}>{svgs.delete} Delete</button>
				<button className="move-to-btn">{svgs.arrowRightAlt} Move to</button>
			</section>

			<button onClick={onCloseMenu} className="close-menu">
				{svgs.closeBox}
			</button>
		</section>
	)
}
