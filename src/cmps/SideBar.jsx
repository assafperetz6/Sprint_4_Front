import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Link, NavLink } from "react-router-dom"

import { svgs } from "../services/svg.service"
import { boardService } from "../services/board"
import { loadBoards, addBoard } from "../store/actions/board.actions"

export function SideBar() {
    const boards = useSelector(storeState => storeState.boardModule.boards)

    useEffect(() => {
        if (!boards) loadBoards()
    }, [boards])

    return (
        <aside className="sidebar">
            <button className="toggle-sidebar">{svgs.arrowLeft}</button>
            <nav>
                <NavLink to='/board'>{svgs.house} Home</NavLink>
                <NavLink to='my_work'>{svgs.myWork} My work</NavLink>
            </nav>

            <div className="favorite-container">
                <button className="toggle-favorites">{svgs.star} Favorites</button>
            </div>

            <section className="workspaces-actions">
                <div>{svgs.workspaces} Workspaces</div>
                <button>{svgs.threeDots}</button>
                <button>{svgs.search}</button>

                <button className="workspace-list-btn"><div>S {svgs.workspaceHouse}</div> main workspace</button>
                <button className="add-workspace-item" onClick={() => addBoard(boardService.getEmptyBoard())}>{svgs.plus}</button>
            </section>
            <section className="board-links">
                {boards.map(board => <Link key={board._id} className="board-link" to={`/board/${board._id}`}>{svgs.board}{board.title}</Link>)}
                <Link to='/dashboard'>{svgs.dashboard} Dashboard and reporting</Link>
            </section>
        </aside>
    )
}