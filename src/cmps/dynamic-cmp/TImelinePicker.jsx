import { useState, useRef, useEffect } from 'react'
import { DayPicker } from 'react-day-picker'
import { formatDate } from '../../services/util.service'
import { createPopper } from '@popperjs/core'
import { updateTask } from '../../store/actions/board.actions'
import { useSelector } from 'react-redux'

export function TimelinePicker({ task, group, defaultWidth }) {
	const board = useSelector(storeState => storeState.boardModule.board)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [selectedRange, setSelectedRange] = useState({
		from: task.timeline?.startDate ? new Date(task.timeline.startDate) : undefined,
		to: task.timeline?.endDate ? new Date(task.timeline.endDate) : undefined
	})

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
		if (!range?.from || !range?.to) return '-'

		const fromDate = new Date(range.from)
		const toDate = new Date(range.to)

		const fromTimestamp = fromDate.getTime()
		const toTimestamp = toDate.getTime()

		if (fromDate.getMonth() === toDate.getMonth() && fromDate.getFullYear() === toDate.getFullYear()) {
			const day1 = String(fromDate.getDate()).padStart(2, '0')
			const day2 = String(toDate.getDate()).padStart(2, '0')
			const monthYear = formatDate(fromTimestamp).split(' ')[1]
			return `${day1} - ${day2} ${monthYear}`
		}

		return `${formatDate(fromTimestamp)} - ${formatDate(toTimestamp)}`
	}

	function getDaysBetween() {
		if (!selectedRange.from || !selectedRange.to) return 'Set Dates'
		const diffTime = Math.abs(selectedRange.to - selectedRange.from)
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
			setSelectedRange(range)
			return
		}

		const timelineToSave = {
			startDate: new Date(range.from).getTime(),
			endDate: new Date(range.to).getTime()
		}
		setSelectedRange({
			from: range.from,
			to: range.to
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
		if (!selectedRange.from || !selectedRange.to) return {}

		const now = new Date().getTime()
		const start = new Date(selectedRange.from).getTime()
		const end = new Date(selectedRange.to).getTime()

		const totalDuration = end - start
		const timeElapsed = now - start
		let percentComplete = (timeElapsed / totalDuration) * 100
		percentComplete = Math.max(0, Math.min(100, percentComplete))

		return {
			background: `linear-gradient(to left, 
                #333333 ${100 - percentComplete}%, 
                ${group.style.color} ${100 - percentComplete}%
            )`
		}
	}
	return (
		<li className="timeline-picker" style={{ width: defaultWidth }}>
			<div ref={buttonRef} className="timeline-bar" style={getProgressStyle()} onClick={handleOpenModal}>
				<span className="timeline-value" data-content={`${task.timeline ? formatRange(selectedRange) : '-'}`} data-hover-content={selectedRange.from && selectedRange.to ? getDaysBetween() : 'Set Dates'}></span>
			</div>

			{isModalOpen && (
				<div
					ref={el => {
						popperRef.current = el
						modalRef.current = el
					}}
					className="popper-container"
				>
					<header className="timeline-header">
						<div className="flex justify-between">
							<span className="header-title">Set dates</span>
							<span className="days-count">{getDaysBetween()}</span>
						</div>
					</header>
					<div className="timeline-inputs flex col gap-2">
						<input type="text" className="date-input" value={formatDateForInput(selectedRange.from)} readOnly placeholder="DD/MM/YYYY" />
						<input type="text" className="date-input" value={formatDateForInput(selectedRange.to)} readOnly placeholder="DD/MM/YYYY" />
					</div>
					<DayPicker
						mode="range"
						selected={selectedRange}
						onSelect={handleRangeSelect}
						showOutsideDays
						fixedWeeks
						defaultMonth={selectedRange?.from}
						month={selectedRange?.from}
						onMonthChange={month => setSelectedRange(prev => ({ ...prev, from: month }))}
					/>
				</div>
			)}
		</li>
	)
}
