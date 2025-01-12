import { useRef, useState } from 'react'
import { boardService } from '../services/board'
import { showErrorMsg } from '../services/event-bus.service'
import { useSelector } from 'react-redux'
import { updateBoard } from '../store/actions/board.actions'
import { hexToRgba } from '../services/util.service'

export function AddTask({ group }) {
	const board = useSelector(storeState => storeState.boardModule.board)
	const [taskToAdd, setTaskToAdd] = useState(boardService.getEmptyTask())
	const elInput = useRef()

	function onAddTask() {
		console.log('task added')
		setTaskToAdd(prev => ({ ...prev, title: '' }))
	}

	function hnadleKeyPressed({ key }) {
		if (key === 'Enter') onAddTask()
		if (key === 'Escape') onEmptyInput()
	}

	function onEmptyInput() {
		setTaskToAdd(prev => ({ ...prev, title: '' }))
		elInput.current.blur()
	}
	function handleChange({ target }) {
		setTaskToAdd(prev => ({ ...prev, title: target.value }))
	}

	return (
		<ul
			className="add-task clean-list"
			onClick={() => {
				elInput.current.focus()
			}}
		>
			<div className="sticky-container">
				<div className="colored-border" style={{ backgroundColor: hexToRgba(group.style.color, 0.6) }}></div>
				<li className="check-box flex align-center justify-center">
					<input type="checkbox" />
				</li>

				<li>
					<input className="add-task-input" ref={elInput} onKeyDown={hnadleKeyPressed} placeholder="+ Add item" value={taskToAdd.title} onBlur={onAddTask} onChange={handleChange}></input>
				</li>
			</div>
		</ul>
	)
}
