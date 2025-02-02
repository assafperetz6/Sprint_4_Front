import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { svgs } from '../services/svg.service'
import { ActivityLog } from '../cmps/activity-log-cmp/ActivityLog'

export function BoardActivityLog() {
  const board = useSelector((state) => state.boardModule.board)
  const [isOpen, setIsOpen] = useState(false)
  const [view, setView] = useState('activity')
  const { boardId } = useParams()

  function closeActivityLog() {
    setIsOpen(false)
  }

  return (
    <aside className={`board-activity-log ${isOpen ? 'open' : ''}`}>
      <button className="exit-btn" onClick={closeActivityLog}>
        {svgs.exit}
      </button>

      <section className="details-top-bar">
        <h2>Activity Log</h2>
        <section className="board-activity-log-actions">
          <button className={view === 'activity' ? 'active' : ''} onClick={() => setView('activity')}>
            Activity Log
          </button>
        </section>
      </section>

      <section className="details-bottom-bar">
        <ActivityLog />
      </section>
    </aside>
  )
}
