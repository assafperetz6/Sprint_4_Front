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
	const board = useSelector((storeState) => storeState.boardModule.board)
	const [isClosing, setIsClosing] = useState(false)
	const { boardId } = useParams()
	const navigate = useNavigate()

	const [isScrolling, setIsScrolling] = useState(false)
	const [currentGroup, setCurrentGroup] = useState(null)
	const boardDetailsRef = useRef(null)

	const [selectedTasks, setSelectedTasks] = useState([board.groups[0].tasks[0], board.groups[0].tasks[1]])
	
	const handleScroll = (e) => {
		if(!isScrolling && e.target.scrollTop > 0) setIsScrolling(true)
		else if(isScrolling && e.target.scrollTop <= 76) setIsScrolling(false)
		
	}
	
	useEffect(() => {
		loadBoard(boardId)
	}, [boardId])

	useEffect(() => {
		if (board?.groups?.length) {
            setCurrentGroup(board.groups[0])
        }
	}, [board])

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
			<BoardHeader board={board} />

			{!!board.groups.length && (
				<GroupList
					groups={board.groups}
					isScrolling={isScrolling}
					currentGroup={currentGroup}
					setCurrentGroup={setCurrentGroup}
					scrollContainer={boardDetailsRef.current}
				/>
			)}
			<TaskActionMenu tasks={selectedTasks} />
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
