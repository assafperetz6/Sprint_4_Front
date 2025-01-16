import { svgs } from "../services/svg.service";

export function BoardHeader({ board }) {
    function getMemberIcons() {
		// TODO: should return last two members on the activity log

		return svgs.person
		return <img src={board.createdBy?.imgUrl} alt="userImg" />
	}
    
    return (
        <section className="board-header-container">
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
        </section>
    )
}