import { useRef, useState } from 'react'
import { boardService } from '../services/board'
import { showErrorMsg } from '../services/event-bus.service'
import { useDispatch, useSelector } from 'react-redux'
import { updateBoard } from '../store/actions/board.actions'
import { hexToRgba } from '../services/util.service'
import { SET_BOARD } from '../store/reducers/board.reducer'

export function AddTask({ group }) {
	const board = useSelector(storeState => storeState.boardModule.board)
	const [taskToAdd, setTaskToAdd] = useState(boardService.getEmptyTask())
	const elInput = useRef()
	const dispatch = useDispatch()

	async function onAddTask(ev) {
		if (ev) ev.preventDefault()
		try {
			const savedBoard = await boardService.saveTask(board._id, group.id, taskToAdd)
			dispatch({ type: SET_BOARD, board: savedBoard })
			setTaskToAdd(boardService.getEmptyTask())
		} catch (err) {
			console.log(err)
			throw err
		}
	}

	function onBlur() {
		if (taskToAdd.title) onAddTask()
		else return
	}

	function handleChange({ target }) {
		setTaskToAdd(prev => ({ ...prev, title: target.value }))
	}

	return (
		<div
			className="add-task clean-list"
			onClick={() => {
				elInput.current.focus()
			}}
		>
			<div className="sticky-container">
				<div className="colored-border" style={{ backgroundColor: hexToRgba(group.style.color, 0.6) }}></div>

				<div className="checkbox-wrapper flex justify-center align-center">
					<input className="checkbox" type="checkbox" />
				</div>

				<form onSubmit={onAddTask}>
					<input className="add-task-input" ref={elInput} placeholder="+ Add item" value={taskToAdd.title} onBlur={onBlur} onChange={handleChange}></input>
				</form>
			</div>
		</div>
	)
}
