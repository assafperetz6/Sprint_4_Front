import { Outlet, useParams } from 'react-router'
import { useEffect, useState } from 'react'
import { loadBoard } from '../store/actions/board.actions'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

import { svgs } from '../services/svg.service.jsx'
import { GroupList } from '../cmps/GroupList.jsx'
import { BoardHeader } from '../cmps/BoardHeader.jsx'

export function BoardDetails() {
	const board = useSelector(storeState => storeState.boardModule.board)
	const [ isClosing, setIsClosing ] = useState(false)
	const { boardId } = useParams()
	const navigate = useNavigate()

	useEffect(() => {
		loadBoard(boardId)
	}, [boardId])



	function closeTaskDetails(){
		setIsClosing(true)
		setTimeout(() => {
			setIsClosing(false)
			navigate(`/board/${boardId}`)
		}, 75)
	}

	if (!board) return null
	return (
		<section className="board-details">
			<BoardHeader board={board} />
			
			{!!board.groups.length && <GroupList groups={board.groups} />}
			<Outlet context={{ isClosing, closeTaskDetails }}/>
		</section>
	)
}

{
	/* <section className="board-details">
<button onClick={() => navigate('/board')}>back</button>
<pre>{JSON.stringify(board, null, 2)}</pre>
</section> */
}
