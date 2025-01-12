import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { svgs } from '../services/svg.service'
import { boardService } from '../services/board'
import { loadBoards, addBoard, removeBoard, updateBoard } from '../store/actions/board.actions'

import { ContextMenu } from '../cmps/ContextMenu.jsx'

export function SideBar() {
	const boards = useSelector((storeState) => storeState.boardModule.boards)
	const [activeMenuId, setActiveMenuId] = useState(null)
	const [boardNameToEdit, setboardNameToEdit] = useState(null)
	const [isCollapsed, setIsCollapsed] = useState(false)
	const [isHovered, setisHovered] = useState(false)
    
	useEffect(() => {
		if (!boards?.length) loadBoards()
	}, [])

	function toggleSidebar() {
		if (!isCollapsed) setisHovered(false)
		setIsCollapsed((prev) => !prev)
	}

	function handleMouseHover(ev) {
		ev._reactName === 'onMouseEnter' ? setisHovered(true) : setisHovered(false)
	}

	function toggleContextMenu(boardId) {
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

	return (
		<aside
			className={`sidebar ${isCollapsed ? 'collapsed' : ''} ${
				isHovered ? 'hovered' : ''
			}`}
			onMouseEnter={handleMouseHover}
			onMouseLeave={handleMouseHover}
		>
			<button
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
				<div>{svgs.workspaces} Workspaces</div>
				<button>{svgs.threeDots}</button>
				<button>{svgs.search}</button>

				<button className="workspace-list-btn">
					<div>S {svgs.workspaceHouse}</div> main workspace
				</button>
				<button
					className="add-workspace-item"
					onClick={() => addBoard(boardService.getEmptyBoard())}
				>
					{svgs.plus}
				</button>
			</section>
			<section className="board-links">
				{boards.map((board) => (
					<div key={board._id} className="link-wrapper">
						<NavLink
							className="board-link"
							to={`/board/${board._id}`}
						>
							{svgs.board}
                            {boardNameToEdit === board.title
                                ? <input>{board.title}</input>
                                : <span>{board.title}</span>
                            }
						</NavLink>
						<button className="board-options" onClick={() => toggleContextMenu(board._id)}>{svgs.threeDots}</button>

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
