import { Outlet, useParams } from 'react-router'
import { useEffect, useState } from 'react'
import { loadBoard } from '../store/actions/board.actions'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

import { svgs } from '../services/svg.service.jsx'
import { GroupList } from '../cmps/GroupList.jsx'

export function BoardDetails() {
	const board = useSelector(storeState => storeState.boardModule.board)
	const [ isClosing, setIsClosing ] = useState(false)
	const { boardId } = useParams()
	const navigate = useNavigate()

	// console.log(board)

	useEffect(() => {
		loadBoard(boardId)
	}, [boardId])

	function getMemberIcons() {
		// TODO: should return last two members on the activity log

		return svgs.person
		return <img src={board.createdBy?.imgUrl} alt="userImg" />
	}

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
			<header className="board-header">
				<h2 className="board-title flex justify-center align-center">{board.title}&nbsp;{svgs.arrowDown}</h2>

				<section className="board-actions">
					<button className="group-chat">{svgs.chat}</button>
					<button className="activity-log">{getMemberIcons()}</button>
					<button className="invite-members">Invite / 1</button>
					<button className="copy-link">{svgs.link}</button>
					<button className="options">{svgs.threeDots}</button>
				</section>
			</header>
			<section className="board-tabs">
				<button className='active'>{svgs.house}&nbsp;Main Table&nbsp;<span>{svgs.threeDots}</span></button>
				<button>{svgs.plus}</button>
			</section>
			<section className="task-actions">
				<div className='add-task-header'>
					<button >New item</button>
					<button>{svgs.arrowDown}</button>
				</div>
				<button>{svgs.search} Search</button>
				<button>{svgs.person} Person</button>
				<button>{svgs.filter} Filter {svgs.arrowDown}</button>
				<button>{svgs.sortDir} Sort</button>
				<button>{svgs.hideEye} Hide</button>
				<button>{svgs.groupBy} Group by</button>
				<button className="more-task-actions">{svgs.threeDots}</button>
				<button className="toggle-board-tabs">{svgs.arrowUp}</button>
			</section>
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
