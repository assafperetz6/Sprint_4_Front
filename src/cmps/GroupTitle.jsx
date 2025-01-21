import { useEffect, useRef, useState } from 'react'
import { updateGroup } from '../store/actions/board.actions'
import { usePopper } from 'react-popper'
import { useSelector } from 'react-redux'
import { ColorPicker } from './ColorPicker'
import { svgs } from '../services/svg.service'

export function GroupTitle({ group }) {
	const board = useSelector(storeState => storeState.boardModule.board)

	const [activeMenuId, setActiveMenuId] = useState(null)

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
			{ name: 'offset', options: { offset: [-12, 11] } },
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
			if (!isEditing) return

			if (!event.target.closest('.group-title-container')) {
				handleSave()
				setIsColorPickerOpen(false)
				setIsEditing(false)
			}
		}

		if (isEditing) {
			document.addEventListener('mousedown', handleClickOutside)
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [isEditing])

	function toggleContextMenu(ev, taskId) {
		setActiveMenuId(prev => (prev === taskId ? null : taskId))
	}

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

	return (
		<div className="group-header flex align-center full" style={{ color: group.style.color }}>
			<div className="context-btn-container">
				<button className={`group-context-menu ${activeMenuId === group.id ? 'open' : ''}`} onClick={ev => toggleContextMenu(ev, group.id)}>
					{svgs.threeDots}
				</button>
			</div>

			<div className="toggle-group-preview flex align-center justify-center">{svgs.arrowDown}</div>

			<div className={`group-title-container ${isEditing ? 'edit' : ''}`} onClick={startEditing}>
				{isEditing ? (
					<>
						<span className="group-color-picker" style={{ background: group.style.color }} onClick={openColorPicker} ref={setReferenceElement}></span>
						<input type="text" value={titleToEdit} onChange={handleChange} autoFocus onKeyDown={handleKeyPressed}></input>
					</>
				) : (
					<h4 className="group-title">{group.title}</h4>
				)}

				{isColorPickerOpen && (
					<div ref={setPopperElement} className="popper-container" style={styles.popper} {...attributes.popper}>
						<div ref={setArrowElement} style={styles.arrow} className="popper-arrow" />
						<ColorPicker setEntityStyle={setGroupStyle} setIsColorPickerOpen={setIsColorPickerOpen} />
					</div>
				)}
			</div>
		</div>
	)
}
