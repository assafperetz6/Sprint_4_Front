import { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { svgs } from '../services/svg.service'
import { boardService } from '../services/board'
import {
	loadBoards,
	addBoard,
	removeBoard,
	updateBoard,
} from '../store/actions/board.actions'

import { ContextMenu } from '../cmps/ContextMenu.jsx'

export function SideBar() {
	const boards = useSelector((storeState) => storeState.boardModule.boards)
	const loggedInUser = useSelector((storeState) => storeState.userModule.user)

	const [activeMenuId, setActiveMenuId] = useState(null)
	const [boardNameToEdit, setboardNameToEdit] = useState(null)
	const [isCollapsed, setIsCollapsed] = useState(false)
	const [isHovered, setisHovered] = useState(false)

	const toggleSidebarRef = useRef()

	useEffect(() => {
		if (!boards?.length) loadBoards()
	}, [])

	function getUserFirstName() {
		if (!loggedInUser) return 'Guest'

		let firstName = loggedInUser.fullname.split(' ')[0]

		firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1)
		return firstName ? firstName : 'Guest'
	}

	function toggleSidebar() {
		if (!isCollapsed) setisHovered(false)
		setIsCollapsed((prev) => !prev)
	}

	function handleMouseHover(ev) {
		ev._reactName === 'onMouseEnter' && ev.target !== toggleSidebarRef.current
			? setisHovered(true)
			: setisHovered(false)
	}

	function toggleContextMenu(ev, boardId) {
		setActiveMenuId((prev) => (prev === boardId ? null : boardId))
	}

	function onRemoveBoard(boardId) {
		removeBoard(boardId)
	}

	function onUpdateBoard(board) {
		updateBoard(board)
		setActiveMenuId(null)
	}

	function onRenameBoard(boardTitle) {
		setboardNameToEdit(boardTitle)
		setActiveMenuId(null)
	}

	function onAddBoard() {
		try {
			addBoard(boardService.getEmptyBoard())
		} catch (err) {
			console.log('cannot add board', err)
			throw err
		}
	}

	return (
		<aside
			className={`sidebar ${isCollapsed ? 'collapsed' : ''} ${
				isHovered ? 'hovered' : ''
			}`}
			onMouseEnter={handleMouseHover}
			onMouseLeave={handleMouseHover}
		>
			<button
				ref={toggleSidebarRef}
				onMouseLeave={handleMouseHover}
				className={`toggle-sidebar ${!isHovered ? 'hidden' : ''}`}
				onClick={toggleSidebar}
			>
				{isCollapsed ? svgs.arrowRight : svgs.arrowLeft}
			</button>
			<nav>
				<div>
					<NavLink end to="/board">
						{svgs.house} Home
					</NavLink>
				</div>
				<NavLink to="my_work">{svgs.myWork} My work</NavLink>
			</nav>

			<div className="favorite-container">
				<button className="toggle-favorites">{svgs.star} Favorites</button>
			</div>

			<section className="workspaces-actions">
				<div className="workspaces-wrapper">
					<div className="workspaces-wrapper">
						<div>{svgs.workspaces} Workspaces</div>
						<button>{svgs.threeDots}</button>
					</div>
					<button>{svgs.search}</button>
				</div>

				<div className="workspaces-wrapper">
					<button className="workspace-list-btn">
						<div>S {svgs.workspaceHouse}</div>
						<span>{getUserFirstName()}'s main workspace</span>
					</button>
					<button className="add-workspace-item" onClick={onAddBoard}>
						{svgs.plus}
					</button>
				</div>
			</section>
			<section className="board-links">
				{boards.map((board) => (
					<div key={board._id} className="link-wrapper">
						<NavLink className="board-link" to={`/board/${board._id}`}>
							{svgs.board}
							{boardNameToEdit === board.title ? (
								<input>{board.title}</input>
							) : (
								<span>{board.title}</span>
							)}
						</NavLink>
						<button
							className={`board-options ${
								activeMenuId === board._id ? 'open' : ''
							}`}
							onClick={(ev) => toggleContextMenu(ev, board._id)}
						>
							{svgs.threeDots}
						</button>

						{activeMenuId === board._id && (
							<ContextMenu
								board={board}
								onClose={() => setActiveMenuId(null)}
								onRemoveBoard={onRemoveBoard}
								onUpdateBoard={onUpdateBoard}
								onRenameBoard={onRenameBoard}
							/>
						)}
					</div>
				))}
				<NavLink to="/dashboard">
					{svgs.dashboard} Dashboard and reporting
				</NavLink>
			</section>
		</aside>
	)
}
