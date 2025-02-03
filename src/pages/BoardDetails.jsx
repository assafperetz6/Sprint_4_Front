import { Outlet, useParams } from 'react-router'
import { useEffect, useRef, useState } from 'react'
import { loadBoard, setFilterBy } from '../store/actions/board.actions'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

import { svgs } from '../services/svg.service.jsx'
import { GroupList } from '../cmps/GroupList.jsx'
import { TaskActionMenu } from '../cmps/TaskActionMenu.jsx'
import { BoardHeader } from '../cmps/BoardHeader.jsx'
import { CollapsedGroupPreview } from '../cmps/CollapsedGroupPreview.jsx'
import { BoardActivityLog } from './BoardActivityLog.jsx'
import { useSearchParams } from 'react-router-dom'
import { SET_FILTER } from '../store/reducers/board.reducer.js'

export function BoardDetails() {
	const dispatch = useDispatch()
	const board = useSelector((storeState) => storeState.boardModule.board)
	const filterBy = useSelector((storeState) => storeState.boardModule.filterBy)

	const [searchParams, setSearchParams] = useSearchParams()

	const [isClosing, setIsClosing] = useState(false)
	const { boardId } = useParams()
	const navigate = useNavigate()

	const [isScrolledTop, setIsScrolledTop] = useState(true)
	const boardDetailsRef = useRef(null)

	useEffect(() => {
		const txtParam = searchParams.get('txt')
		if (txtParam !== filterBy.txt) {
			searchParams.set('txt', filterBy.txt)
			setSearchParams(searchParams)
		}
	}, [filterBy])

	const handleScroll = (e) => {
		if (e.target.scrollTop === 0 && !isScrolledTop) setIsScrolledTop(true)
		else if (e.target.scrollTop > 0 && isScrolledTop) setIsScrolledTop(false)
	}

	// function handleFilter(value, filterType = 'txt') {
	// 	setFilterBy(prev => ({ ...prev, [filterType]: value}))
	// }
	const selectedTasks = useSelector(
		(storeState) => storeState.boardModule.selectedTasks
	)

	useEffect(() => {
		loadBoard(boardId)
	}, [boardId, filterBy])

	function closeTaskDetails() {
		setIsClosing(true)
		setTimeout(() => {
			setIsClosing(false)
			navigate(`/board/${boardId}`)
		}, 75)
	}

	if (!board) return null

	return (
		<section
			className="board-details"
			ref={boardDetailsRef}
			onScroll={handleScroll}
		>
			<BoardHeader
				board={board}
				// filterBy={filterBy}
				// setFilterBy={handleFilter}
			/>

			{!!board.groups.length && (
				<GroupList
					// groups={board.groups}
					isScrolledTop={isScrolledTop}
					scrollContainer={boardDetailsRef.current}
				/>
			)}
			{selectedTasks.length > 0 && <TaskActionMenu tasks={selectedTasks} />}
			<Outlet context={{ isClosing, closeTaskDetails }} />
		</section>
	)
}
