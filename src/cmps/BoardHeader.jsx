import { Link } from 'react-router-dom'
import { svgs } from '../services/svg.service'
import { showSuccessMsg } from '../services/event-bus.service'

export function BoardHeader({ board }) {
  function getMemberIcons() {
    // TODO: should return last two members on the activity log
    const boardMembers = board.members
    return boardMembers
      .slice(0, 2)
      .map((member) => <img src={member.imgUrl} alt="userImg" key={member._id} width={20} height={20} style={{ borderRadius: '50%' }} />)
  }

  function copyLink() {
    navigator.clipboard.writeText(`${window.location.origin}/board/${board._id}`)
    showSuccessMsg('Link copied to clipboard')
  }

  return (
    <section className="board-header-container">
      <header className="board-header">
        <h2 className="board-title flex justify-center align-center">
          {board.title}&nbsp;{svgs.arrowDown}
        </h2>

        <section className="board-actions">
          <button className="group-chat">
            <Link to={`/board/${board._id}/activity_log`}>{svgs.chat}</Link>
          </button>
          <button className="activity-log flex align-center">
            <Link className="flex align-center" to={`/board/${board._id}/activity_log`}>
              {getMemberIcons()}
            </Link>
          </button>
          <button className="invite-members">Invite / {board.members.length}</button>
          <button className="copy-link" onClick={() => copyLink()}>
            {svgs.link}
          </button>
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
          <button>New task</button>
          <button>{svgs.arrowDown}</button>
        </div>
        <button>{svgs.search} Search</button>
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
