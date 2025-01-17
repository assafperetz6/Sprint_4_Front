import { useState, useRef, useEffect } from 'react'
import { TaskListHeader } from './TaskListHeader'
import { TaskList } from './TaskList'
import { useSelector } from 'react-redux'
import { removeGroup, updateGroup } from '../store/actions/board.actions'
import { ColorPicker } from './ColorPicker'
import { usePopper } from 'react-popper'
import { svgs } from '../services/svg.service'
import { showErrorMsg } from '../services/event-bus.service'
import { DynamicCmp } from './DynamicCmp'

export function GroupPreview({ group, cmpsOrder }) {
	const board = useSelector(storeState => storeState.boardModule.board)
	const [titleToEdit, setTitleToEdit] = useState(group.title)
	const [isColorPickerOpen, setIsColorPickerOpen] = useState(false)
	const [isEditing, setIsEditing] = useState(false)

	const groupRef = useRef()

	const [referenceElement, setReferenceElement] = useState(null)
	const [popperElement, setPopperElement] = useState(null)
	const [arrowElement, setArrowElement] = useState(null)

	const { styles, attributes } = usePopper(referenceElement, popperElement, {
		modifiers: [
			{ name: 'arrow', options: { element: arrowElement } },
			{ name: 'offset', options: { offset: [0, 8] } },
			{
				name: 'preventOverflow',
				options: {
					padding: 8
				}
			}
		],
		placement: 'bottom-start'
	})

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
			const groupToSave = { ...group, title: titleToEdit }
			if (!titleToEdit.trim()) {
				onEmptyInput()
				return
			}

			updateGroup(board._id, groupToSave)
			setIsEditing(false)
			setIsColorPickerOpen(false)
		} catch (err) {
			console.error('Failed to update group title:', err)
			onEmptyInput()
		}
	}

	async function setGroupStyle(newStyle) {
		const groupToSave = { ...group, style: newStyle }
		try {
			updateGroup(board._id, groupToSave)
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

	async function onRemoveGroup(groupId) {
		try {
			removeGroup(board._id, groupId)
		} catch (err) {
			console.log('cannot remove group')
			showErrorMsg('cannot remove group')
		}
	}

	return (
		<section className="group-preview item-col full">
			<TaskListHeader group={group} tasks={group.tasks} />
			<TaskList group={group} />
		</section>
	)
}

{
	/* <TaskListHeader group={group} colWidth={colWidth} />
<TaskList group={group} colWidth={colWidth} /> */
}

// PREVIOUS GROUP-PREVIEW:

{
	/* <section className="group-preview">
<div className="group-container">
	<div className="header-container">
		<div className="group-header">
			<div className="group-title-container" style={{ color: group.style.color }} onClick={startEditing}>
				{isEditing ? (
					<div className={`renaming-wrapper flex align-center ${isEditing ? 'editing' : ''}`} onClick={e => e.stopPropagation()}>
						<button ref={setReferenceElement} onClick={openColorPicker} style={{ backgroundColor: group.style.color }} className="group-color-picker" />
						<input className="group-title-input" type="text" onChange={handleChange} onKeyDown={handleKeyPressed} value={titleToEdit} name="title" id="groupTitle" autoFocus />
						{isColorPickerOpen && (
							<div ref={setPopperElement} className="popper-container" style={styles.popper} {...attributes.popper}>
								<div ref={setArrowElement} style={styles.arrow} className="popper-arrow" />
								<ColorPicker setEntityStyle={setGroupStyle} setIsColorPickerOpen={setIsColorPickerOpen} />
							</div>
						)}
					</div>
				) : (
					<h4 className="group-title">{group.title}</h4>
				)}
			</div>
		</div>
	</div>
	<button className="delete-btn" onClick={() => onRemoveGroup(group.id)}>
		{svgs.delete}
	</button>
	<TaskListHeader group={group} tasks={group.tasks} colWidth={colWidth} />
</div>
<TaskList group={group} colWidth={colWidth} />
</section> */
}
