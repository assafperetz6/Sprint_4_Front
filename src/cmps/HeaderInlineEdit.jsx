import { useState, useRef, useEffect } from 'react'
import { usePopper } from 'react-popper'
import { ColorPicker } from './ColorPicker'

export function HeaderInlineEdit({ entity, getTasksCount, onSave, onStyleChange, style, className = '' }) {
	const [isEditing, setIsEditing] = useState(false)
	const [value, setValue] = useState(entity.title)
	const [isColorPickerOpen, setIsColorPickerOpen] = useState(false)
	const inputRef = useRef(null)

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
		setValue(entity.title)
	}, [entity])

	useEffect(() => {
		function handleClickOutside(event) {
			if (!isEditing) return

			const isColorPickerClick = event.target.closest('.popper-container')
			const isColorIconClick = event.target.closest('.color-picker-icon')
			const isInputClick = event.target.closest('input')

			if (isColorPickerClick || isColorIconClick || isInputClick) return

			if (!event.target.closest('.header-inline-edit')) {
				if (!value.trim()) {
					handleCancel()
					return
				}
				onSave(value)
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
	}, [isEditing, value])

	function handleChange({ target }) {
		setValue(target.value)
	}

	function handleSave() {
		if (!value.trim()) {
			handleCancel()
			return
		}
		onSave(value)
		// setIsEditing(false)
		setIsColorPickerOpen(false)
	}

	function handleKeyPressed(event) {
		if (event.key === 'Enter') {
			event.preventDefault()
			handleSave()
		}
		if (event.key === 'Escape') {
			event.preventDefault()
			handleCancel()
		}
	}

	function handleCancel() {
		setValue(entity.value)
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

	function handleStyleChange(newStyle) {
		onStyleChange(newStyle)
		setIsColorPickerOpen(false)
		setIsEditing(false)
	}

	return (
		<div className={`header-inline-edit ${isEditing ? 'edit' : ''} ${className}`} onClick={startEditing} style={{ color: style?.color }}>
			{isEditing ? (
				<>
					<span className="color-picker-icon" style={{ background: style?.color }} onClick={openColorPicker} ref={setReferenceElement} />
					<input ref={inputRef} type="text" value={value} onChange={handleChange} onBlur={handleSave} onKeyDown={handleKeyPressed} autoFocus />
					{isColorPickerOpen && (
						<div ref={setPopperElement} className="popper-container" style={styles.popper} {...attributes.popper}>
							<div ref={setArrowElement} style={styles.arrow} className="popper-arrow" />
							<ColorPicker setEntityStyle={handleStyleChange} setIsColorPickerOpen={setIsColorPickerOpen} />
						</div>
					)}
				</>
			) : (
				<h4 className="title">{value}</h4>
			)}

			{!isEditing && <div className="title-count flex align-center justify-center">
				{getTasksCount(entity.tasks.length)}
			</div>}
		</div>
	)
}
