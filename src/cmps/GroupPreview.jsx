import { useState, useRef, useEffect } from 'react'
import { TaskListHeader } from './TaskListHeader'
import { TaskList } from './TaskList'
import { useDispatch, useSelector } from 'react-redux'
import { updateBoard } from '../store/actions/board.actions'
import { SET_BOARD } from '../store/reducers/board.reducer'
import { ColorPicker } from './ColorPicker'

export function GroupPreview({ group }) {
	const board = useSelector(storeState => storeState.boardModule.board)
	const [titleToEdit, setTitleToEdit] = useState(group.title)
	const [isColorPickerOpen, setIsColorPickerOpen] = useState(false)
	const [isEditing, setIsEditing] = useState(false)
	const [colWidth] = useState('150px')
	const groupRef = useRef()

	const dispatch = useDispatch()

	useEffect(() => {
		function handleClickOutside(event) {
			if (!groupRef.current?.contains(event.target) && !event.target.closest('.color-picker')) {
				handleSave()
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [isEditing, titleToEdit])

	function handleChange({ target }) {
		setTitleToEdit(target.value)
	}

	async function handleSave() {
		if (!isEditing) return

		try {
			if (!titleToEdit.trim()) {
				onEmptyInput()
				return
			}

			const groupToUpdate = board.groups.map(g => (g.id === group.id ? { ...g, title: titleToEdit } : g))

			const updatedBoard = { ...board, groups: groupToUpdate }
			const newBoard = await updateBoard(updatedBoard)
			dispatch({ type: SET_BOARD, board: newBoard })
			setIsEditing(false)
			setIsColorPickerOpen(false)
		} catch (err) {
			console.error('Failed to update group title:', err)
			onEmptyInput()
		}
	}

	async function setGroupStyle(newStyle) {
		try {
			const groupToUpdate = board.groups.map(g => (g.id === group.id ? { ...g, style: newStyle } : g))

			const updatedBoard = { ...board, groups: groupToUpdate }
			const newBoard = await updateBoard(updatedBoard)
			dispatch({ type: SET_BOARD, board: newBoard })
			setIsColorPickerOpen(false)
			setIsEditing(false)
		} catch (err) {
			console.error('Failed to update group style:', err)
		}
	}

	function handleKeyPressed({ key }) {
		if (key === 'Enter') handleSave()
		if (key === 'Escape') onEmptyInput()
	}

	function onEmptyInput() {
		setTitleToEdit(group.title)
		setIsEditing(false)
		setIsColorPickerOpen(false)
	}

	function openColorPicker(e) {
		e.stopPropagation()
		setIsColorPickerOpen(true)
	}

	function startEditing(e) {
		e.stopPropagation()
		setIsEditing(true)
	}

	return (
		<section className="group-preview" ref={groupRef}>
			<div className="group-sticky-container">
				<div className="header-container">
					<div className="group-header">
						<div className="group-title-container" style={{ color: group.style.color }} onClick={startEditing}>
							{isEditing ? (
								<div className={`renaming-wrapper flex align-center ${isEditing ? 'editing' : ''}`} onClick={e => e.stopPropagation()}>
									<button onClick={openColorPicker} style={{ backgroundColor: group.style.color }} className="group-color-picker" />
									<input className="group-title-input" type="text" onChange={handleChange} onKeyDown={handleKeyPressed} value={titleToEdit} name="title" id="groupTitle" autoFocus />
									{isColorPickerOpen && <ColorPicker setEntityStyle={setGroupStyle} setIsColorPickerOpen={setIsColorPickerOpen} />}
								</div>
							) : (
								<h4 className="group-title">{group.title}</h4>
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
