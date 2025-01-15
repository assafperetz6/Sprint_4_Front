import { useState } from 'react'
import { TaskListHeader } from './TaskListHeader'
import { TaskList } from './TaskList'
import { useDispatch, useSelector } from 'react-redux'
import { updateBoard } from '../store/actions/board.actions'
import { SET_BOARD } from '../store/reducers/board.reducer'

export function GroupPreview({ group, idx }) {
	const board = useSelector(storeState => storeState.boardModule.board)
	const [titleToEdit, setTitleToEdit] = useState(group.title)
	// const [g, setTitleToEdit] = useState(group.title)
	const [isColorPickerOpen, setIsColorPickerOpen] = useState(false)
	const [isEditing, setIsEditing] = useState(false)
	const [colWidth, setColwidth] = useState('150px')

	const dispatch = useDispatch()

	async function handleChange({ target }) {
		setTitleToEdit(target.value)
	}

	async function setGroupTitle() {
		try {
			const groupToUpdate = board.groups.map(g => (g.id === group.id ? { ...g, title: titleToEdit } : g))

			const updatedBoard = { ...board, groups: [...groupToUpdate] }
			const newBoard = await updateBoard(updatedBoard)
			dispatch({ type: SET_BOARD, board: newBoard })

			setIsEditing(false)
		} catch (err) {
			console.error('Failed to update group title:', err)
			onEmptyInput()
		}
	}

	// async function setGroupStyle() {
	// 	try {
	// 		const groupToUpdate = board.groups.map(g => (g.id === group.id ? { ...g, style: styleToEdit } : g))

	// 		const updatedBoard = { ...board, groups: [...groupToUpdate] }
	// 		const newBoard = await updateBoard(updatedBoard)
	// 		dispatch({ type: SET_BOARD, board: newBoard })

	// 		setIsEditing(false)
	// 	} catch (err) {
	// 		console.error('Failed to update group title:', err)
	// 		onEmptyInput()
	// 	}
	// }

	function handleKeyPressed({ key }) {
		if (key === 'Enter') setGroupTitle()
		if (key === 'Escape') onEmptyInput()
	}

	function onEmptyInput() {
		setTitleToEdit(group.title)
		setIsEditing(false)
	}

	function onSetColorPickerClose(ev) {
		if (ev.target.closest('.color-picker , .options-menu')) return
		setIsColorPickerOpen(false)
	}
	function openColorPicker() {
		setIsColorPickerOpen(true)
	}

	return (
		<section className="group-preview">
			{idx !== 0 && <div className="group-container">
				<div className="header-container" role="input" onClick={() => setIsEditing(prev => !prev)}>
					<div className="group-header">
						<div className="group-title-container">
							{isEditing ? (
								<input className="group-title-input" type="text" onChange={handleChange} onBlur={setGroupTitle} onKeyDown={handleKeyPressed} value={titleToEdit} name="title" id="groupTitle" autoFocus />
							) : (
								<h4 style={{ color: group.style.color }} className="group-title">
									{group.title}
								</h4>
							)}
						</div>
					</div>
				</div>
				<TaskListHeader group={group} tasks={group.tasks} colWidth={colWidth} />
			</div>}
			<TaskList group={group} colWidth={colWidth} />
		</section>
	)
}
