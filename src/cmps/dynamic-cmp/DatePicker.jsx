import { useState, useRef, useEffect } from 'react'
import { createPopper, offset } from '@popperjs/core'
import { svgs } from '../../services/svg.service'
import { formatDate, formatDateForInput } from '../../services/util.service'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import { updateTask } from '../../store/actions/board.actions'
import { useSelector } from 'react-redux'

export function DatePicker({ task, defaultWidth, groupId }) {
	const board = useSelector(storeState => storeState.boardModule.board)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [selectedDate, setSelectedDate] = useState(task.dueDate)
	const formattedDate = formatDate(task.dueDate)
	const [inputValue, setInputValue] = useState(formatDateForInput(task.dueDate))

	const buttonRef = useRef(null)
	const popperRef = useRef(null)
	const modalRef = useRef(null)
	const popperInstance = useRef(null)

	useEffect(() => {
		if (!isModalOpen || !buttonRef.current || !popperRef.current) return

		popperInstance.current = createPopper(buttonRef.current, popperRef.current, {
			placement: 'bottom-start',
			modifiers: [{ name: 'offset', options: { offset: [50, 0] } }]
		})

		const handleClickOutside = event => {
			if (modalRef.current && !modalRef.current.contains(event.target) && !buttonRef.current.contains(event.target)) {
				setIsModalOpen(false)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)

		return () => {
			if (popperInstance.current) {
				popperInstance.current.destroy()
				popperInstance.current = null
			}
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [isModalOpen])

	useEffect(() => {
		const handleCloseModals = () => {
			setIsModalOpen(false)
		}

		window.addEventListener('closeAllModals', handleCloseModals)
		return () => {
			window.removeEventListener('closeAllModals', handleCloseModals)
		}
	}, [])

	const dateContent = task.dueDate ? (
		<span>{formattedDate}</span>
	) : (
		<div className="empty-state">
			<div className="plus"></div>
			{svgs.calendarSmall}
		</div>
	)

	const handleOpenModal = () => {
		const closeEvent = new CustomEvent('closeAllModals')
		window.dispatchEvent(closeEvent)
		setIsModalOpen(true)
	}

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
		setIsModalOpen(false)
		try {
			const taskToSave = { ...task, dueDate: timestamp }
			updateTask(board._id, groupId, taskToSave)
		} catch (err) {
			console.log('cannot update task date', err)
		}
	}

	function handleInputChange(e) {
		let value = e.target.value.replace(/\D/g, '')

		if (value.length > 4) {
			value = value.slice(0, 8)
			const day = value.slice(0, 2)
			const month = value.slice(2, 4)
			const year = value.slice(4)
			value = `${day}/${month}/${year}`
		} else if (value.length > 2) {
			const day = value.slice(0, 2)
			const month = value.slice(2)
			value = `${day}/${month}`
		}

		setInputValue(value)

		if (value.length === 10) {
			const [day, month, year] = value.split('/')
			const date = new Date(year, month - 1, day)
			if (!isNaN(date)) {
				setSelectedDate(date)
			}
		}
	}

	function handleTodayClick() {
		const today = new Date()
		today.setHours(0, 0, 0, 0)
		onSelectDate(today)
	}

	function onClearDate() {
		onSelectDate(null)
		setInputValue(null)
	}

	function handleKeyPressed({ key }) {
		if (key === 'Enter') {
			if (inputValue.length === 10) {
				const [day, month, year] = inputValue.split('/')
				const date = new Date(year, month - 1, day)
				if (!isNaN(date)) {
					onSelectDate(date)
				}
			}
		}
		if (key === 'Escape') {
			setIsModalOpen(false)
			setInputValue(formattedDate)
		}
	}

	return (
		<li className="date-picker flex align-center justify-center" style={{ width: defaultWidth }}>
			<div ref={buttonRef} onClick={handleOpenModal}>
				{dateContent}
			</div>
			{task.dueDate && (
				<button className="clear-btn" onClick={onClearDate}>
					{svgs.exit}
				</button>
			)}

			{isModalOpen && (
				<div
					ref={el => {
						popperRef.current = el
						modalRef.current = el
					}}
					className="popper-container"
				>
					<div className="date-picker-modal">
						<header className="date-picker-header flex align-center justify-between">
							<button className="today-button" onClick={handleTodayClick}>
								Today
							</button>
							<button className="clock-btn">{svgs.clock}</button>
						</header>
						<input type="text" className="date-input" value={inputValue} onChange={handleInputChange} placeholder="DD/MM/YYYY" maxLength={10} onKeyDown={handleKeyPressed} />
						<DayPicker mode="single" selected={selectedDate} onSelect={onSelectDate} showOutsideDays fixedWeeks defaultMonth={selectedDate} month={selectedDate} onMonthChange={setSelectedDate} />
					</div>
				</div>
			)}
		</li>
	)
}
