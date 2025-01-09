import { useSelector } from "react-redux"
import { Link, NavLink } from "react-router-dom"

import { svgs } from "../services/svg.service"

export function SideBar() {
    const boards = useSelector(storeState => storeState.boardModule.boards)

    return (
        <aside className="sidebar">

            <nav>
                <NavLink to=''>{svgs.house} Home</NavLink>
                <NavLink to='my_work'>{svgs.myWork} My work</NavLink>
            </nav>

            <button className="toggle-favorites">{svgs.star} Favorites</button>

            <section className="workspaces-actions">
                <div>{svgs.workspaces} Workspaces</div>
                <button>{svgs.threeDots}</button>
                <button>{svgs.search}</button>

                <button className="workspace-list">main workspace</button>
                <button className="add-workspace-item">{svgs.plus}</button>
            </section>
            <section className="board-links">
                {boards.map(board => <Link to={`/board/${board._id}`}>{board.title}</Link>)}
            </section>
        </aside>
    )
}