import { useState, useRef, useEffect } from 'react'
import { createPopper } from '@popperjs/core'
import { svgs } from '../../services/svg.service'
import { formatDate } from '../../services/util.service'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css' // Base styles
import { updateTask } from '../../store/actions/board.actions'
import { useSelector } from 'react-redux'

export function DatePicker({ task, defaultWidth, groupId }) {
	const board = useSelector(storeState => storeState.boardModule.board)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [selectedDate, setSelectedDate] = useState(task.dueDate)
	const formattedDate = formatDate(task.dueDate)

	const buttonRef = useRef(null)
	const popperRef = useRef(null)
	const popperInstance = useRef(null)

	useEffect(() => {
		if (!isModalOpen || !buttonRef.current || !popperRef.current) return

		popperInstance.current = createPopper(buttonRef.current, popperRef.current, {
			placement: 'bottom-start',
			modifiers: [
				{
					name: 'offset',
					options: {
						offset: [10, 0]
					}
				}
			]
		})

		return () => {
			if (popperInstance.current) {
				popperInstance.current.destroy()
				popperInstance.current = null
			}
		}
	}, [isModalOpen])

	const dateContent = task.dueDate ? (
		<span>{formattedDate}</span>
	) : (
		<div className="empty-state">
			<div className="plus"></div>
			{svgs.calendarSmall}
		</div>
	)

	async function onSelectDate(date) {
		if (!date) {
			setSelectedDate(null)
			setIsModalOpen(false)
			try {
				const taskToSave = { ...task, dueDate: null }
				updateTask(board._id, groupId, taskToSave)
			} catch (err) {
				console.log('cannot update task date', err)
			}
			return
		}

		setSelectedDate(date)
		const timestamp = new Date(date).setHours(0, 0, 0, 0)
		console.log(timestamp)
		setIsModalOpen(false)
		try {
			const taskToSave = { ...task, dueDate: timestamp }
			updateTask(board._id, groupId, taskToSave)
		} catch (err) {
			console.log('cannot update task date', err)
		}
	}

	const handleTodayClick = () => {
		const today = new Date()
		today.setHours(0, 0, 0, 0)
		onSelectDate(today)
	}

	const onClearDate = () => {
		onSelectDate(null)
	}

	return (
		<li className="date-picker flex align-center justify-center" style={{ width: defaultWidth }}>
			<div ref={buttonRef} onClick={() => setIsModalOpen(true)}>
				{dateContent}
			</div>
			{task.dueDate && (
				<button className="clear-btn" onClick={onClearDate}>
					{svgs.exit}
				</button>
			)}

			{isModalOpen && (
				<div ref={popperRef} className="popper-container">
					<header className="date-picker-header flex align-center justify-between">
						<button className="today-button" onClick={handleTodayClick}>
							Today
						</button>
						<button className="clock-btn">{svgs.clock}</button>
					</header>
					<input type="text" className="date-input" value={formattedDate || ''} readOnly />
					<DayPicker mode="single" selected={selectedDate} onSelect={onSelectDate} showOutsideDays fixedWeeks />
				</div>
			)}
		</li>
	)
}
