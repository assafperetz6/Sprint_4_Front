import { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { svgs } from '../../services/svg.service'

export function LabelPicker({ task, onUpdate, defaultWidth }) {
	const [isPopupOpen, setIsPopupOpen] = useState(false)
	const [isEditing, setIsEditing] = useState(false)
	const [labelTitle, setLabelTitle] = useState('')
	const popupRef = useRef(null)
	const dispatch = useDispatch()

	const board = useSelector(storeState => storeState.boardModule.board)
	const labels = board.statusLabels || []

	const currentLabel = labels.find(l => l.id === task.status) || null

	useEffect(() => {
		function handleClickOutside(event) {
			if (popupRef.current && !popupRef.current.contains(event.target)) {
				setIsPopupOpen(false)
				setIsEditing(false)
			}
		}

		if (isPopupOpen) {
			document.addEventListener('mousedown', handleClickOutside)
		}

		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [isPopupOpen])

	function handleLabelClick(ev) {
		ev.preventDefault()
		ev.stopPropagation()
		setIsPopupOpen(!isPopupOpen)
	}

	function handleNewLabel() {
		setIsEditing(true)
		setLabelTitle('')
	}

	async function handleSelectLabel(label) {
		try {
			await onUpdate(label.id)
			setIsPopupOpen(false)
		} catch (error) {
			console.error('Failed to update label:', error)
		}
	}

	return (
		<div className="label-picker">
			<div
				onClick={handleLabelClick}
				style={{
					backgroundColor: currentLabel?.color || '#c4c4c4',
					width: defaultWidth
				}}
			>
				<span>{currentLabel?.title || 'No Status'}</span>
				<div className="corner-fold"></div>
			</div>

			{isPopupOpen && (
				<div className="label-picker-popup" ref={popupRef}>
					{!isEditing ? (
						<>
							<button className="new-label-btn" onClick={handleNewLabel}>
								+ Add Label
							</button>

							<ul className="clean-list">
								{labels.map(label => (
									<li key={label.id} style={{ backgroundColor: label.color }} onClick={() => handleSelectLabel(label)} className={label.id === task.status ? 'selected' : ''}>
										{label.title}
									</li>
								))}
							</ul>

							<div className="separator"></div>

							<button className="edit-labels" onClick={() => setIsEditing(true)}>
								<span className="icon">{svgs.edit}</span>
								<span className="title">Edit Labels</span>
							</button>
						</>
					) : (
						<div className="input-container">
							<div className="icon-color-bucket" style={{ backgroundColor: '#c4c4c4' }}>
								{svgs.colorBucket}
							</div>
							<form
								onSubmit={ev => {
									ev.preventDefault()
								}}
							>
								<input type="text" value={labelTitle} onChange={e => setLabelTitle(e.target.value)} placeholder="Create new label" autoFocus />
							</form>
						</div>
					)}
				</div>
			)}
		</div>
	)
}
