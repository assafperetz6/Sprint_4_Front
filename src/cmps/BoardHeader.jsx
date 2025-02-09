import { Link, useSearchParams } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { boardService } from '../services/board'
import { showErrorMsg } from '../services/event-bus.service'
import { svgs } from '../services/svg.service'
import { showSuccessMsg } from '../services/event-bus.service'
import { TooltipContainer } from './TooltipContainer'
import { addTask, setFilterBy } from '../store/actions/board.actions'
import { useParams } from 'react-router'
import { useSelector } from 'react-redux'
import { SortModal } from './dynamic-header-modal/SortModal'
import { FilteredMembersModal } from './dynamic-header-modal/FilteredMembersModal'
import { DynamicHeaderModal } from './dynamic-header-modal/DynamicModal'

export function BoardHeader({ board }) {
	const [isTxtFilter, setIsTxtFilter] = useState(false)
	const [modalType, setModalType] = useState(null)
	const [isNarrowView, setIsNarrowView] = useState(window.outerWidth < 460)
	const [showTaskActions, setShowTaskActions] = useState(false)
	const [showFloatingMenu, setShowFloatingMenu] = useState(false)
	const filterBy = useSelector((storeState) => storeState.boardModule.filterBy)

	const emptyImgUrl =
		'https://res.cloudinary.com/dqfhbqcwv/image/upload/v1739010711/dapulse_default_photo_q9x7an.png'

	useEffect(() => {
		const handleResize = () => {
			const newIsNarrowView = window.outerWidth < 460
			setIsNarrowView(newIsNarrowView)
			if (!newIsNarrowView) {
				setShowTaskActions(false)
			}
		}
		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	function getMemberIcons(selectedMembers = board.members) {
		// TODO: should return last two members on the activity log
		if (selectedMembers.length)
			return selectedMembers
				.slice(0, 2)
				.map((member) => (
					<img
						src={member.imgUrl || emptyImgUrl}
						alt="userImg"
						key={member._id}
						width={20}
						height={20}
						style={{ borderRadius: '50%' }}
					/>
				))
		else
			return (
				<img
					src={emptyImgUrl}
					alt="userImg"
					width={20}
					height={20}
					style={{ borderRadius: '50%' }}
				/>
			)
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

			if (filterBy.members.length > 0 || filterBy.txt)
				showSuccessMsg('Your task was filtered out, clear the filter to see it')
		} catch (err) {
			showErrorMsg('cannot add task')
			console.log(err)
			throw err
		}
	}

	function getSelectedMembers(ids) {
		return board.members.filter((m) => ids.includes(m._id))
	}

	function copyLink() {
		navigator.clipboard.writeText(
			`${window.location.origin}/board/${board._id}`
		)
		showSuccessMsg('Link copied to clipboard')
	}

	return (
		<section className="board-header-container">
			<header className="board-header">
				<h2 className="board-title flex justify-center align-center">
					{board.title}
				</h2>

				<section className="board-actions">
					<button className="group-chat">
						<Link to={`/board/${board._id}/activity_log`}>
							<TooltipContainer txt="Start board discussion" placement="bottom">
								{svgs.chat}
							</TooltipContainer>
						</Link>
					</button>

					<TooltipContainer txt="View activity log" placement="bottom">
						<button className="activity-log flex align-center">
							<Link
								className="flex align-center"
								to={`/board/${board._id}/activity_log`}
							>
								{getMemberIcons()}
							</Link>
						</button>
					</TooltipContainer>

					<div className="invite-container">
						<button
							className="invite-members"
							onClick={() =>
								setModalType((prev) => (prev === 'invite' ? null : 'invite'))
							}
						>
							Invite / {board.members.length}
						</button>

						<TooltipContainer txt="Copy link" placement="bottom">
							<button className="copy-link" onClick={() => copyLink()}>
								{svgs.link}
							</button>
						</TooltipContainer>
					</div>
				</section>
			</header>
			<section className="board-tabs">
				<button className="active">
					{svgs.house}&nbsp;Main Table&nbsp;
					<span>{isNarrowView ? svgs.arrowDown : svgs.threeDots}</span>
				</button>
				{isNarrowView && (
					<button
						className={`toggle-actions-btn ${showTaskActions ? 'active' : ''}`}
						onClick={() => setShowTaskActions((prev) => !prev)}
					>
						{svgs.filter} Actions
					</button>
				)}
			</section>
			<section className={`task-actions ${showTaskActions ? 'show' : ''}`}>
				<div className="add-task-header">
					<button onClick={onAddTask}>New task</button>
					<button
						className={modalType === 'addGroup' ? 'active' : ''}
						onClick={() =>
							setModalType((prev) => (prev === 'addGroup' ? null : 'addGroup'))
						}
					>
						{svgs.arrowDown}
					</button>
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

				<TooltipContainer txt="Filter board by person">
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
				</TooltipContainer>
				<TooltipContainer txt="Sort board by any column">
					<button
						className={modalType === 'sort' ? 'active' : ''}
						onClick={() =>
							setModalType((prev) => (prev === 'sort' ? null : 'sort'))
						}
					>
						{svgs.sortDir} Sort
					</button>
				</TooltipContainer>
				<TooltipContainer txt={'Hidden columns'}>
					<button
						onClick={() =>
							setModalType((prev) => (prev === 'hide' ? null : 'hide'))
						}
					>
						{svgs.hideEye} Hide
					</button>
				</TooltipContainer>

				<DynamicHeaderModal
					board={board}
					modalType={modalType}
					setModalType={setModalType}
					filterBy={filterBy}
					setFilterBy={setFilterBy}
				/>
			</section>

			<button className={`floating-action-btn ${showFloatingMenu ? 'active' : ''}`} onClick={() => setShowFloatingMenu((prev) => !prev)}>
				{svgs.plus}
			</button>
			<div className={`floating-menu ${showFloatingMenu ? 'show' : ''}`}>
				<button onClick={() => { onAddTask(); setShowFloatingMenu(false); }}>{svgs.task} New Task</button>
				<button onClick={() => { setModalType((prev) => (prev === 'addGroup' ? null : 'addGroup')); setShowFloatingMenu(false); }}>{svgs.group} New Group</button>
			</div>
		</section>
	)
}
