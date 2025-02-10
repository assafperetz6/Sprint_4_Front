import { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import { NavLink, useLocation } from 'react-router-dom'

import { svgs } from '../services/svg.service'
import { boardService } from '../services/board'
import {
	loadBoards,
	addBoard,
	removeBoard,
	updateBoard,
} from '../store/actions/board.actions'

import { ContextMenu } from '../cmps/ContextMenu.jsx'
import { InlineEdit } from './InlineEdit.jsx'

export function SideBar() {
	const boards = useSelector((storeState) => storeState.boardModule.boards)
	const loggedInUser = useSelector((storeState) => storeState.userModule.user)

	const [activeMenuId, setActiveMenuId] = useState(null)
	const [boardToEdit, setboardToEdit] = useState(null)
	const [toggleFavorites, setToggleFavorites] = useState(false)
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
	const [isNarrowView, setIsNarrowView] = useState(window.innerWidth < 460)

	const [isCollapsed, setIsCollapsed] = useState(window.innerWidth <= 720)
	const [isEditing, setIsEditing] = useState(true)
	const [isHovered, setIsHovered] = useState(false)

	const { pathname } = useLocation()
	const toggleSidebarRef = useRef()
	const buttonRefs = useRef({})

	const boardItemProps = {
		onRemoveBoard,
		onUpdateBoard,
		onRenameBoard,
		isEditing,
		setIsEditing,
		boardToEdit,
		setboardToEdit,
		toggleContextMenu,
		activeMenuId,
		setActiveMenuId,
		buttonRefs,
	}

	useEffect(() => {
		if (!boards?.length) loadBoards()
	}, [])

	useEffect(() => {
		// Close mobile menu when route changes
		setIsMobileMenuOpen(false)
	}, [pathname])

	useEffect(() => {
		const handleResize = () => {
			const width = window.innerWidth
			const newIsNarrowView = width < 460
			setIsNarrowView(newIsNarrowView)
			
			if (!newIsNarrowView) {
				setIsMobileMenuOpen(false)
			}

			// Auto collapse/expand based on width
			if (width <= 720) {
				setIsCollapsed(true)
				setIsHovered(false)
			} else {
				setIsCollapsed(false)
			}
		}

		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	function getUserFirstName() {
		if (!loggedInUser) return 'Guest'

		let fullname = loggedInUser.fullname
		let firstName = fullname.includes(' ')
			? loggedInUser.fullname.split(' ')[0]
			: fullname

		firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1)
		return firstName ? firstName : 'Guest'
	}

	function toggleSidebar() {
		if (!isCollapsed) setIsHovered(false)
		setIsCollapsed((prev) => !prev)
	}

	function toggleMobileMenu() {
		setIsMobileMenuOpen(prev => !prev)
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

	function onRenameBoard(board) {
		setboardToEdit(board._id)
		setIsEditing(true)
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

	if (pathname.startsWith('/login')) return null
	const boardIndexLinkClass = pathname.startsWith('/board/') ? 'active-link' : ''
	
	return (
		<>
			{/* Mobile Menu Button - Only show in narrow view */}
			{isNarrowView && (
				<button 
					className={`mobile-menu-btn ${isMobileMenuOpen ? 'active' : ''}`}
					onClick={toggleMobileMenu}
				>
					{isMobileMenuOpen ? svgs.exit : svgs.threeDots}
				</button>
			)}

			{/* Mobile Overlay - Only show in narrow view */}
			{isNarrowView && (
				<div 
					className={`mobile-overlay ${isMobileMenuOpen ? 'active' : ''}`}
					onClick={() => setIsMobileMenuOpen(false)}
				></div>
			)}

			<button
				ref={toggleSidebarRef}
				className={`collapsed-toggle-sidebar ${
					!isCollapsed || isHovered || isNarrowView ? 'hidden' : ''
				}`}
				onClick={toggleSidebar}
			>
				{svgs.arrowLeft}
			</button>
			<aside
				className={`sidebar ${isCollapsed ? 'collapsed' : ''} ${
					isHovered ? 'hovered' : ''
				} ${isMobileMenuOpen ? 'mobile-open' : ''}`}
				onMouseEnter={() => !isNarrowView && setIsHovered(true)}
				onMouseLeave={() => !isNarrowView && setIsHovered(false)}
			>
				<button
					ref={toggleSidebarRef}
					className={`toggle-sidebar ${!isHovered ? 'hidden' : ''}`}
					onClick={toggleSidebar}
				>
					{svgs.arrowLeft}
				</button>
				<nav>
					<div>
						<NavLink end to="/home">
							{svgs.house} Home
						</NavLink>
					</div>
					<NavLink className={boardIndexLinkClass} to="/board">{svgs.myWork} My work</NavLink>
				</nav>

				<div className="favorite-container">
					<button
						className={`toggle-favorites ${toggleFavorites ? 'open' : ''}`}
						onClick={() => setToggleFavorites((prev) => !prev)}
					>
						<span>{svgs.star} Favorites</span>
						<span>{toggleFavorites ? svgs.arrowUp : svgs.arrowDown}</span>
					</button>

					{toggleFavorites && (
						<ul>
							{boards
								.filter((b) => b.isStarred)
								.map((board) => (
									<li key={board._id}>
										<BoardListItem {...boardItemProps} board={board} />
									</li>
								))}
						</ul>
					)}
				</div>

				{!toggleFavorites && (
				<>
					<section className="workspaces-actions">
						<div className="workspaces-wrapper">
							<div className="workspaces-wrapper">
								<div>{svgs.workspaces} Workspaces</div>
								{/* <button>{svgs.threeDots}</button> */}
							</div>
							{/* <button>{svgs.search}</button> */}
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
							<BoardListItem
								key={board._id}
								{...boardItemProps}
								board={board}
							/>
						))}
						{/* <NavLink to="/dashboard">
							{svgs.dashboard} Dashboard and reporting
						</NavLink> */}
					</section>
				</>
				)}
			</aside>
		</>
	)
}

function BoardListItem({ ...props }) {
	const {
		board,
		onRemoveBoard,
		onUpdateBoard,
		onRenameBoard,
		isEditing,
		setIsEditing,
		boardToEdit,
		setboardToEdit,
		toggleContextMenu,
		activeMenuId,
		setActiveMenuId,
		buttonRefs,
	} = props

	return (
		<div className="link-wrapper">
			<NavLink className="board-link" to={`/board/${board._id}`}>
				{svgs.board}
				{isEditing && boardToEdit === board._id ? (
					<InlineEdit
						value={board.title}
						onSave={(newTitle) => {
							onUpdateBoard({ ...board, title: newTitle })
							setIsEditing(false)
							setboardToEdit(null)
						}}
						isEditing={true}
					/>
				) : (
					<span>{board.title}</span>
				)}
			</NavLink>
			<button
				className={`board-options ${activeMenuId === board._id ? 'open' : ''}`}
				onClick={(ev) => toggleContextMenu(ev, board._id)}
				ref={(el) => (buttonRefs.current[board._id] = el)}
			>
				{svgs.threeDots}
			</button>

			{activeMenuId === board._id && (
				<ContextMenu
					type="board"
					entity={board}
					onClose={() => setActiveMenuId(null)}
					onRemove={onRemoveBoard}
					onUpdate={onUpdateBoard}
					onRename={onRenameBoard}
					referenceElement={buttonRefs.current[board._id]}
				/>
			)}
		</div>
	)
}
