import { Outlet, useParams } from 'react-router'
import { useEffect } from 'react'
import { loadBoard } from '../store/actions/board.actions'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

import { svgs } from '../services/svg.service.jsx'
import { GroupList } from '../cmps/GroupList.jsx'

export function BoardDetails() {
	const board = useSelector(storeState => storeState.boardModule.board)
	const { boardId } = useParams()
	const navigate = useNavigate()

	console.log(board)

	useEffect(() => {
		loadBoard(boardId)
	}, [boardId])

	function getMemberIcons() {
		// TODO: should return last two members on the activity log

		return <img src={board.createdBy?.imgUrl} alt="userImg" />
	}

	if (!board) return null
	return (
		<section className="board-details">
			<header className="board-header">
				<h2 className="board-title">{board.title}</h2>

				<section className="board-actions">
					<button className="group-chat">{svgs.chat}</button>
					<button className="activity-log">{getMemberIcons()}</button>
					<button className="invite-members">Invite / 1</button>
					<button className="copy-link">{svgs.link}</button>
					<button className="options">{svgs.threeDots}</button>
				</section>
			</header>
			<section className="board-tabs">
				<button>{svgs.house} Main Table</button>
				<button className="tab-options">{svgs.threeDots}</button>
				<button>{svgs.plus}</button>
			</section>
			<section className="task-actions">
				<button>New item</button>
				<button>{svgs.arrowDown}</button>
				<button>{svgs.search} Search</button>
				<button>{svgs.person} Person</button>
				<button>{svgs.filter} Filter</button>
				<button className="toggle-advance-filter">{svgs.arrowDown}</button>
				<button>{svgs.sortDir} Sort</button>
				<button>{svgs.hideEye} Hide</button>
				<button>{svgs.groupBy} Group by</button>
				<button className="more-task-actions">{svgs.threeDots}</button>
				<button className="toggle-board-tabs">{svgs.arrowUp}</button>
			</section>
			{!!board.groups.length && <GroupList groups={board.groups} />}
			<Outlet />
		</section>
	)
}

{
	/* <section className="board-details">
<button onClick={() => navigate('/board')}>back</button>
<pre>{JSON.stringify(board, null, 2)}</pre>
</section> */
}
