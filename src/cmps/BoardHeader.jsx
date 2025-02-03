import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { boardService } from '../services/board'
import { showErrorMsg } from '../services/event-bus.service'
import { svgs } from '../services/svg.service'
import { addTask } from '../store/actions/board.actions'
import { useParams } from 'react-router'

export function BoardHeader({ board, setFilterBy, filterBy }) {
	const [isTxtFilter, setIsTxtFilter] = useState(false)

	function getMemberIcons() {
		// TODO: should return last two members on the activity log
		const boardMembers = board.members
		return boardMembers
			.slice(0, 2)
			.map((member) => (
				<img
					src={member.imgUrl}
					alt="userImg"
					key={member._id}
					width={20}
					height={20}
					style={{ borderRadius: '50%' }}
				/>
			))
	}

	async function onAddTask() {
		try {
			addTask(
				board._id,
				board.groups[0].id,
				boardService.getEmptyTask(),
				{ txt: 'Added task' },
				'unShift'
			)
		} catch (err) {
			showErrorMsg('cannot add task')
			console.log(err)
			throw err
		}
	}

	function onSetFilterBy(value) {
		setFilterBy(value)
	}

	return (
		<section className="board-header-container">
			<header className="board-header">
				<h2 className="board-title flex justify-center align-center">
					{board.title}&nbsp;{svgs.arrowDown}
				</h2>

				<section className="board-actions">
					<button className="group-chat">{svgs.chat}</button>
					<button className="activity-log flex align-center">
						<Link
							className="flex align-center"
							to={`/board/${board._id}/activity_log`}
						>
							{getMemberIcons()}
						</Link>
					</button>
					<button className="invite-members">
						Invite / {board.members.length}
					</button>
					<button className="copy-link">{svgs.link}</button>
					<button className="options">{svgs.threeDots}</button>
				</section>
			</header>
			<section className="board-tabs">
				<button className="active">
					{svgs.house}&nbsp;Main Table&nbsp;<span>{svgs.threeDots}</span>
				</button>
				<button className="add-view-btn">{svgs.plus}</button>
			</section>
			<section className="task-actions">
				<div className="add-task-header">
					<button onClick={onAddTask}>New task</button>
					<button>{svgs.arrowDown}</button>
				</div>
				<label className="txt-filter-container flex align-center">
					<span>{svgs.search}</span>
					<input
						className="txt-filter"
						value={filterBy}
						type="text"
						onBlur={() => setIsTxtFilter(false)}
						onFocus={(ev) => setIsTxtFilter(true)}
						onChange={(ev) => onSetFilterBy(ev.target.value)}
						placeholder={isTxtFilter ? 'Search this board' : 'Search'}
					/>
				</label>
				<button>{svgs.person} Person</button>
				<button>
					{svgs.filter} Filter {svgs.arrowDown}
				</button>
				<button>{svgs.sortDir} Sort</button>
				<button>{svgs.hideEye} Hide</button>
				<button>{svgs.groupBy} Group by</button>
				<button className="more-task-actions">{svgs.threeDots}</button>
				<button className="toggle-board-tabs">{svgs.arrowUp}</button>
			</section>
		</section>
	)
}
