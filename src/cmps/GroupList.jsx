import { GroupPreview } from './GroupPreview.jsx'
import { svgs } from '../services/svg.service.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { addGroup, updateBoard } from '../store/actions/board.actions.js'
import { boardService } from '../services/board/index.js'
import { showErrorMsg } from '../services/event-bus.service.js'
import { debounce } from '../services/util.service.js'
import { TaskListHeader } from './TaskListHeader.jsx'
import { useEffect, useRef, useState } from 'react'
import { GroupStickyContainer } from './GroupStickyContainer.jsx'

export function GroupList({ groups }) {
	const board = useSelector(storeState => storeState.boardModule.board)
	const dispatch = useDispatch()

	// const [currentGroup, setCurrentGroup] = useState(groups[0])
	// const observerRef = useRef(null)

	// console.log(currentGroup)

	// 	useEffect(() => {
	//     let lastIntersection = null

	//     const observer = new IntersectionObserver((entries) => {
	//         entries.forEach(entry => {
	//             const groupId = entry.target.dataset.groupId
	//             const groupIndex = groups.findIndex(g => g.id === groupId)
	//             const currentGroupIndex = groups.findIndex(g => g.id === currentGroup.id)

	//             // Store the intersection position for comparison
	//             if (entry.isIntersecting) {
	//                 if (!lastIntersection) {
	//                     lastIntersection = entry.boundingClientRect.top
	//                     return
	//                 }

	//                 // Determine scroll direction by comparing with last intersection
	//                 const scrollingDown = entry.boundingClientRect.top < lastIntersection
	//                 lastIntersection = entry.boundingClientRect.top

	//                 console.log('Intersection:', {
	//                     groupId,
	//                     direction: scrollingDown ? 'down' : 'up',
	//                     position: entry.boundingClientRect.top,
	//                     currentGroup: currentGroup.id,
	//                 })

	//                 // Update group based on scroll direction and adjacent position
	//                 if (scrollingDown && groupIndex === currentGroupIndex + 1) {
	//                     setCurrentGroup(groups[groupIndex])
	//                 } else if (!scrollingDown && groupIndex === currentGroupIndex - 1) {
	//                     setCurrentGroup(groups[groupIndex])
	//                 }
	//             }
	//         })
	//     }, {
	//         threshold: [0],
	//         rootMargin: "-20px 0px 0px 0px"
	//     })

	//     const elements = document.querySelectorAll('[data-group-id]')
	//     elements.forEach(element => observer.observe(element))

	//     return () => observer.disconnect()
	// }, [])

	// Log when current group changes to debug
	// useEffect(() => {
	// 	console.log('Current group changed to:', currentGroup.id)
	// }, [currentGroup])

	// console.log(currentGroup)

	// 	useEffect(() => {
	//     let lastIntersection = null

	//     const observer = new IntersectionObserver((entries) => {
	//         entries.forEach(entry => {
	//             const groupId = entry.target.dataset.groupId
	//             const groupIndex = groups.findIndex(g => g.id === groupId)
	//             const currentGroupIndex = groups.findIndex(g => g.id === currentGroup.id)

	//             // Store the intersection position for comparison
	//             if (entry.isIntersecting) {
	//                 if (!lastIntersection) {
	//                     lastIntersection = entry.boundingClientRect.top
	//                     return
	//                 }

	//                 // Determine scroll direction by comparing with last intersection
	//                 const scrollingDown = entry.boundingClientRect.top < lastIntersection
	//                 lastIntersection = entry.boundingClientRect.top

	//                 console.log('Intersection:', {
	//                     groupId,
	//                     direction: scrollingDown ? 'down' : 'up',
	//                     position: entry.boundingClientRect.top,
	//                     currentGroup: currentGroup.id,
	//                 })

	//                 // Update group based on scroll direction and adjacent position
	//                 if (scrollingDown && groupIndex === currentGroupIndex + 1) {
	//                     setCurrentGroup(groups[groupIndex])
	//                 } else if (!scrollingDown && groupIndex === currentGroupIndex - 1) {
	//                     setCurrentGroup(groups[groupIndex])
	//                 }
	//             }
	//         })
	//     }, {
	//         threshold: [0],
	//         rootMargin: "-20px 0px 0px 0px"
	//     })

	//     const elements = document.querySelectorAll('[data-group-id]')
	//     elements.forEach(element => observer.observe(element))

	//     return () => observer.disconnect()
	// }, [])

	// Log when current group changes to debug
	// useEffect(() => {
	// 	console.log('Current group changed to:', currentGroup.id)
	// }, [currentGroup])

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
			{groups.map((group, idx) => (
				<GroupPreview key={group.id} group={group} cmpsOrder={board.cmpsOrder} />
			))}
			{/* <GroupStickyContainer group={currentGroup} />
			{groups.map((group, idx) => (
				<li key={group.id}>
					<GroupPreview idx={idx} data-group-id={group.id} group={group} key={group.id} />
				</li>
			))} */}
			<div className="add-group-btn" onClick={onAddGroup}>
				<span className="icon flex align-center">{svgs.plus}</span>
				<span className="txt">Add new group</span>
			</div>
		</section>
	)
}
