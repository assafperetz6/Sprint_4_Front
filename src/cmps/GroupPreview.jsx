import { useState } from 'react'
import { TaskListHeader } from './TaskListHeader'
import { TaskList } from './TaskList'
import { useDispatch, useSelector } from 'react-redux'
import { updateBoard } from '../store/actions/board.actions'
import { SET_BOARD } from '../store/reducers/board.reducer'

export function GroupPreview({ group }) {
	const board = useSelector(storeState => storeState.boardModule.board)
	const [titleToEdit, setTitleToEdit] = useState(group.title)
	const [isEditor, setIsEditor] = useState(false)
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

			setIsEditor(false)
		} catch (err) {
			console.error('Failed to update group title:', err)
			onEmptyInput()
		}
	}

	function handleKeyPressed({ key }) {
		if (key === 'Enter') setGroupTitle()
		if (key === 'Escape') onEmptyInput()
	}

	function onEmptyInput() {
		setTitleToEdit(group.title)
		setIsEditor(false)
	}

	return (
		<section className="group-preview">
			<div className="group-sticky-container">
				<div className="header-container" role="input" onClick={() => setIsEditor(prev => !prev)}>
					<div className="group-header">
						<div className="group-title-container">
							{isEditor ? (
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
			</div>
			<TaskList group={group} colWidth={colWidth} />
		</section>
	)
}
