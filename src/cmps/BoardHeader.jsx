import { Link, useSearchParams } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { boardService } from '../services/board'
import { showErrorMsg } from '../services/event-bus.service'
import { svgs } from '../services/svg.service'
import { addTask, setFilterBy } from '../store/actions/board.actions'
import { useParams } from 'react-router'
import { useSelector } from 'react-redux'
import { SortModal } from './dynamic-filter-cmp/SortModal'
import { FilteredMembersModal } from './dynamic-filter-cmp/FilteredMembersModal'
import { DynamicFilterModal } from './dynamic-filter-cmp/DynamicModal'

export function BoardHeader({ board }) {
	const [isTxtFilter, setIsTxtFilter] = useState(false)
	const [modalType, setModalType] = useState(null)
	const filterBy = useSelector((storeState) => storeState.boardModule.filterBy)

	function getMemberIcons(selectedMembers = board.members) {
		// TODO: should return last two members on the activity log
		return selectedMembers
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
				false, // !isMoved
				false, // !isDuplicate
				'unshift'
			)
		} catch (err) {
			showErrorMsg('cannot add task')
			console.log(err)
			throw err
		}
	}

	function getSelectedMembers(ids) {
		return board.members.filter((m) => ids.includes(m._id))
	}

	// console.log(filterBy.sortBy)

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
						value={filterBy.txt || ''}
						type="text"
						onBlur={() => setIsTxtFilter(false)}
						onFocus={(ev) => setIsTxtFilter(true)}
						onChange={(ev) =>
							setFilterBy({ ...filterBy, txt: ev.target.value })
						}
						placeholder={isTxtFilter ? 'Search this board' : 'Search'}
					/>
				</label>

				<button
					className={modalType === 'member' ? 'active' : ''}
					onClick={() =>
						setModalType((prev) => (prev === 'member' ? null : 'member'))
					}
				>
					{filterBy.members.length > 0
						? getMemberIcons(getSelectedMembers(filterBy.members))
						: svgs.person}{' '}
					Person
				</button>

				<button>
					{svgs.filter} Filter {svgs.arrowDown}
				</button>
				<button
					className={modalType === 'sort' ? 'active' : ''}
					onClick={() =>
						setModalType((prev) => (prev === 'sort' ? null : 'sort'))
					}
				>
					{svgs.sortDir} Sort
				</button>

				<button
					onClick={() =>
						setModalType((prev) => (prev === 'hide' ? null : 'hide'))
					}
				>
					{svgs.hideEye} Hide
				</button>

				<button>{svgs.groupBy} Group by</button>
				<button className="more-task-actions">{svgs.threeDots}</button>
				<button className="toggle-board-tabs">{svgs.arrowUp}</button>

				<DynamicFilterModal
					board={board}
					modalType={modalType}
					setModalType={setModalType}
					filterBy={filterBy}
					setFilterBy={setFilterBy}
				/>
			</section>
		</section>
	)
}