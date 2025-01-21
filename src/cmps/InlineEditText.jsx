import { useState } from 'react'

export function InlineEdit({ value: initialValue, onSave }) {
	const [isEditing, setIsEditing] = useState(false)
	const [value, setValue] = useState(initialValue)

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

	return <div className="inline-edit">{isEditing ? <input type="text" value={value} onChange={e => setValue(e.target.value)} onKeyDown={handleKeyPress} autoFocus onBlur={onBlur} /> : <span onClick={() => setIsEditing(true)}>{value}</span>}</div>
}
