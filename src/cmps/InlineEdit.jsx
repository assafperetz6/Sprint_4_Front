// InlineEdit.jsx
import { useState, useRef, useEffect } from 'react'

export function InlineEdit({ value: initialValue, onSave, isEditing: externalIsEditing }) {
	const [isEditing, setIsEditing] = useState(externalIsEditing)
	const [value, setValue] = useState(initialValue)
	const inputRef = useRef(null)

	useEffect(() => {
		setIsEditing(externalIsEditing)
	}, [externalIsEditing])

	useEffect(() => {
		if (isEditing && inputRef.current) {
			inputRef.current.focus()
		}
	}, [isEditing])

	function handleSave() {
		onSave(value)
		setIsEditing(false)
	}

	function handleCancel() {
		setValue(initialValue)
		setIsEditing(false)
	}

	function handleKeyPress(e) {
		if (e.key === 'Enter') {
			handleSave()
		} else if (e.key === 'Escape') {
			handleCancel()
		}
	}

	function onBlur() {
		if (value) {
			onSave(value)
			setIsEditing(false)
		} else return
	}

	return <div className="inline-edit">{isEditing ? <input ref={inputRef} type="text" value={value} onChange={e => setValue(e.target.value)} onKeyDown={handleKeyPress} onBlur={onBlur} /> : <span onClick={() => setIsEditing(true)}>{value}</span>}</div>
}
