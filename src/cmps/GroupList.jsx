import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addGroup, updateBoard } from '../store/actions/board.actions.js'

import { boardService } from '../services/board/index.js'
import { showErrorMsg } from '../services/event-bus.service.js'

import { svgs } from '../services/svg.service.jsx'
import { GroupPreview } from './GroupPreview.jsx'
import { GroupHeader } from './GroupHeader.jsx'

export function GroupList({ groups, isScrolling, currentGroup, setCurrentGroup, scrollContainer }) {
	const board = useSelector(storeState => storeState.boardModule.board)
	const dispatch = useDispatch()

	const [titleColWidth, setTitleColWidth] = useState(null)
	const groupRefs = useRef([])

	// useEffect(() => {
	// 	const longestTaskTitle = () => {
	// 		const text = board.groups.map(group => group.tasks.map(task => task.title).toSorted((t1, t2) => t2.length - t1.length)[0]).toSorted((title1, title2) => title2.length - title1.length)[0]

	// 		const canvas = document.createElement('canvas')
	// 		const context = canvas.getContext('2d')
	// 		context.font = '14px Figtree'
	// 		return context.measureText(text).width
	// 	}

	// 	setTitleColWidth(longestTaskTitle())
	// }, [board])

	useEffect(() => {
		if (!scrollContainer) return

		const windowVH = window.innerHeight

		const options = {
			rootMargin: `-236px 0px -${windowVH - 99}px`,
		}

		const observer = new IntersectionObserver(entries => {
			entries.forEach(entry => {
				const idx = parseInt(entry.target.dataset.groupIndex)
				const group = groups[idx]

				if (entry.isIntersecting) setCurrentGroup(group)
			})
		}, options)

		// Observe all group elements
		groupRefs.current.forEach((element, idx) => {
			if (element) {
				element.dataset.groupIndex = idx
				observer.observe(element)
			}
		})

		return () => {
			groupRefs.current.forEach(element => {
				if (element) observer.unobserve(element)
			})
		}
	}, [groups, scrollContainer])

	function onAddGroup() {
		const groupToAdd = boardService.getNewGroup()
		try {
			addGroup(board._id, groupToAdd)
		} catch (err) {
			showErrorMsg('cannot add group')
			console.log('cannot add group', err)
		}
	}

	return (
		<section className="group-list">
			<div className={`sticky-header-container full ${isScrolling ? 'show' : ''}`}>{currentGroup && <GroupHeader group={currentGroup} />}</div>

			{groups.map((group, idx) => (
				<div key={group.id} ref={el => (groupRefs.current[idx] = el)} className="full">
					<GroupPreview group={group} cmpsOrder={board.cmpsOrder} />
				</div>
			))}
			<div className="add-group-btn" onClick={onAddGroup}>
				<span className="icon flex align-center">{svgs.plus}</span>
				<span className="txt">Add new group</span>
			</div>
		</section>
	)
}
