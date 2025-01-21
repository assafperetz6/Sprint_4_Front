import { useState, useRef, useEffect } from 'react'
import { DayPicker } from 'react-day-picker'
import { formatDate } from '../../services/util.service'
import { createPopper } from '@popperjs/core'
import { updateTask } from '../../store/actions/board.actions'
import { useSelector } from 'react-redux'
import { svgs } from '../../services/svg.service'

export function TimelinePicker({ task, group, defaultWidth }) {
	const board = useSelector(storeState => storeState.boardModule.board)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [selectedRange, setSelectedRange] = useState({
		startDate: task.timeline?.startDate ? new Date(task.timeline.startDate) : undefined,
		endDate: task.timeline?.endDate ? new Date(task.timeline.endDate) : undefined
	})
	const [currentMonth, setCurrentMonth] = useState(task.timeline?.startDate ? new Date(task.timeline.startDate) : new Date())

	const buttonRef = useRef(null)
	const popperRef = useRef(null)
	const popperInstance = useRef(null)
	const modalRef = useRef(null)

	useEffect(() => {
		if (!isModalOpen || !buttonRef.current || !popperRef.current) return

		popperInstance.current = createPopper(buttonRef.current, popperRef.current, {
			placement: 'bottom-start',
			modifiers: [
				{
					name: 'offset',
					options: {
						offset: [-80, 10]
					}
				}
			]
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

	function formatRange(range) {
		if (!range?.startDate || !range?.endDate) return '-'

		const startDate = new Date(range.startDate)
		const endDate = new Date(range.endDate)

		const startTimestamp = startDate.getTime()
		const endTimestamp = endDate.getTime()

		if (startDate.getMonth() === endDate.getMonth() && startDate.getFullYear() === endDate.getFullYear()) {
			const day1 = String(startDate.getDate()).padStart(2, '0')
			const day2 = String(endDate.getDate()).padStart(2, '0')
			const monthYear = formatDate(startTimestamp).split(' ')[1]
			return `${day1} - ${day2} ${monthYear}`
		}

		return `${formatDate(startTimestamp)} - ${formatDate(endTimestamp)}`
	}

	function getDaysBetween() {
		if (!selectedRange.startDate || !selectedRange.endDate) return 'Set Dates'
		const startDate = new Date(selectedRange.startDate).getTime()
		const endDate = new Date(selectedRange.endDate).getTime()
		const diffTime = Math.abs(endDate - startDate)
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
		return `${diffDays} days`
	}

	function handleOpenModal() {
		const closeEvent = new CustomEvent('closeAllModals')
		window.dispatchEvent(closeEvent)
		setIsModalOpen(true)
	}

	function handleRangeSelect(range) {
		if (!range?.from || !range?.to) {
			setSelectedRange({
				startDate: range?.from,
				endDate: range?.to
			})
			return
		}

		const timelineToSave = {
			startDate: new Date(range.from).getTime(),
			endDate: new Date(range.to).getTime()
		}
		setSelectedRange({
			startDate: range.from,
			endDate: range.to
		})

		try {
			const taskToSave = {
				...task,
				timeline: timelineToSave
			}
			updateTask(board._id, group.id, taskToSave)
		} catch (err) {
			console.log('Cannot update timeline', err)
		}
	}

	function formatDateForInput(date) {
		if (!date) return ''
		const d = new Date(date)
		const day = String(d.getDate()).padStart(2, '0')
		const month = String(d.getMonth() + 1).padStart(2, '0')
		const year = d.getFullYear()
		return `${day}/${month}/${year}`
	}

	function getProgressStyle() {
		if (!selectedRange.startDate || !selectedRange.endDate) return {}

		const now = new Date().getTime()
		const startDate = new Date(selectedRange.startDate).getTime()
		const endDate = new Date(selectedRange.endDate).getTime()

		const totalDuration = endDate - startDate
		const timeElapsed = now - startDate
		let percentComplete = (timeElapsed / totalDuration) * 100
		percentComplete = Math.max(0, Math.min(100, percentComplete))

		return {
			background: `linear-gradient(to left, 
               #333333 ${100 - percentComplete}%, 
               ${group.style.color} ${100 - percentComplete}%
           )`
		}
	}

	function onRemoveTimeline(e) {
		e.stopPropagation()
		try {
			const taskToSave = {
				...task,
				timeline: null
			}
			setSelectedRange({
				startDate: undefined,
				endDate: undefined
			})
			updateTask(board._id, group.id, taskToSave)
		} catch (err) {
			console.log('Cannot remove timeline', err)
		}
	}

	return (
		<li className="timeline-picker" style={{ width: defaultWidth }}>
			<div ref={buttonRef} className="timeline-bar" style={getProgressStyle()} onClick={handleOpenModal}>
				<span className="timeline-value" data-content={`${task.timeline ? formatRange(selectedRange) : '-'}`} data-hover-content={selectedRange.startDate && selectedRange.endDate ? getDaysBetween() : 'Set Dates'}></span>
			</div>

			{(task.timeline || task.timeline !== null) && (
				<button className="clear-btn" onClick={onRemoveTimeline}>
					{svgs.closeBox}
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
					<div className="timeline-picker-modal">
						<header className="timeline-header flex justify-between">
							<span className="header-title">Set dates</span>
							<span className="days-count">{getDaysBetween() + ' selected'}</span>
						</header>
						<div className="timeline-inputs flex col ">
							<input type="text" className="date-input" value={formatDateForInput(selectedRange.startDate)} readOnly placeholder="DD/MM/YYYY" />
							<input type="text" className="date-input" value={formatDateForInput(selectedRange.endDate)} readOnly placeholder="DD/MM/YYYY" />
						</div>
						<DayPicker
							mode="range"
							selected={{
								from: selectedRange.startDate,
								to: selectedRange.endDate
							}}
							onSelect={handleRangeSelect}
							showOutsideDays
							fixedWeeks
							defaultMonth={currentMonth}
							month={currentMonth}
							onMonthChange={setCurrentMonth}
						/>
					</div>
				</div>
			)}
		</li>
	)
}
