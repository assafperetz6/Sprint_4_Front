import { Outlet, useParams } from 'react-router'
import { useEffect, useRef, useState } from 'react'
import { loadBoard } from '../store/actions/board.actions'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

import { svgs } from '../services/svg.service.jsx'
import { GroupList } from '../cmps/GroupList.jsx'
import { TaskActionMenu } from '../cmps/TaskActionMenu.jsx'
import { BoardHeader } from '../cmps/BoardHeader.jsx'

export function BoardDetails() {
	const board = useSelector(storeState => storeState.boardModule.board)
	const [isClosing, setIsClosing] = useState(false)
	const { boardId } = useParams()
	const navigate = useNavigate()

	const [isScrolledTop, setIsScrolledTop] = useState(true)
	const boardDetailsRef = useRef(null)

	const selectedTasks = useSelector(storeState => storeState.boardModule.selectedTasks)

	const handleScroll = e => {
		if (e.target.scrollTop === 0 && !isScrolledTop) setIsScrolledTop(true)
		else if (e.target.scrollTop > 0 && isScrolledTop) setIsScrolledTop(false)
	}

	useEffect(() => {
		loadBoard(boardId)
	}, [boardId])

	function closeTaskDetails() {
		setIsClosing(true)
		setTimeout(() => {
			setIsClosing(false)
			navigate(`/board/${boardId}`)
		}, 75)
	}

	// function onSetSelectedTask(task) {
	// 	if (selectedTasks.find(t => t.id === task.id)) {
	// 		setSelectedTasks(prev => prev.filter(t => t.id !== task.id))
	// 	} else {
	// 		setSelectedTasks(prev => [...prev, task])
	// 	}
	// }

	if (!board) return null
	return (
		<section className="board-details" ref={boardDetailsRef} onScroll={handleScroll}>
			<BoardHeader board={board} />

			{!!board.groups.length && <GroupList groups={board.groups} isScrolledTop={isScrolledTop} scrollContainer={boardDetailsRef.current} />}
			{selectedTasks.length > 0 && <TaskActionMenu tasks={selectedTasks} />}
			<Outlet context={{ isClosing, closeTaskDetails }} />
		</section>
	)
}

{
	/* <section className="board-details">
<button onClick={() => navigate('/board')}>back</button>
<pre>{JSON.stringify(board, null, 2)}</pre>
</section> */
}
