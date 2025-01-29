import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useOutletContext, useParams } from 'react-router'
import { boardService } from '../services/board'
import { svgs } from '../services/svg.service'
import { useSelector } from 'react-redux'

export function TaskDetails() {
  const board = useSelector((state) => state.boardModule.board)

  const { boardId, taskId } = useParams()
  const [task, setTask] = useState(null)
  const [view, setView] = useState('updates')
  const { isClosing, closeTaskDetails } = useOutletContext()

  useEffect(() => {
    getTask(boardId, taskId)
  }, [taskId])

  async function getTask(boardId, taskId) {
    try {
      const task = await boardService.getTaskById(boardId, taskId)
      setTask(task)
    } catch (err) {
      console.log(err, 'cannot get task')
    }
  }

  const animationClass = isClosing ? 'closing' : task ? 'open' : ''

  return (
    <section className={`task-details ${animationClass}`}>
      {task ? (
        <>
          <button className="exit-btn" onClick={closeTaskDetails}>
            {svgs.exit}
          </button>

          <section className="details-top-bar">
            <h2>{task.title}</h2>
            <section className="task-details-actions">
              <button className={view === 'updates' ? 'active' : ''} onClick={() => setView('updates')}>
                <span>{svgs.home}</span>&nbsp;Updates
              </button>
              <button className={view === 'files' ? 'active' : ''} onClick={() => setView('files')}>
                Files
              </button>
              <button className={view === 'activity' ? 'active' : ''} onClick={() => setView('activity')}>
                Activity Log
              </button>
            </section>
          </section>
          <section className="details-bottom-bar">
            <DynamicCmp view={view} board={board} taskId={taskId} />
          </section>
        </>
      ) : null}
    </section>
  )
}

function DynamicCmp({ view, board, taskId }) {
  switch (view) {
    case 'updates':
      return <h1>updates: under construction</h1>
    case 'files':
      return <h1>files: under construction</h1>
    case 'activity':
      return <ActivityLog board={board} taskId={taskId} />
  }
}

function ActivityLog({ board, taskId }) {
  const [activities, setActivities] = useState([])

  useEffect(() => {
    loadActivities()
  }, [board, taskId])

  async function loadActivities() {
    const activities = await boardService.getTaskActivities(board._id, taskId)
    setActivities(activities)
  }

  function formatTime(date) {
    const diff = Date.now() - date
    if (diff < 60000) return 'now'
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 60) return `${minutes}m`
    if (hours < 24) return `${hours}h`
    return `${days}d`
  }

  function getLabelTitle(type, labelId) {
    if (!labelId) return '-'
    const labels = type === 'Status' ? board.statusLabels : board.priorityLabels
    const label = labels.find((l) => l.id === labelId)
    return label?.title || labelId
  }

  function getLabelColor(type, labelId) {
    if (!labelId) return null
    const labels = type === 'Status' ? board.statusLabels : board.priorityLabels
    const label = labels.find((l) => l.id === labelId)
    return label?.color || null
  }

  function formatDate(dateStr) {
    if (!dateStr) return '-'
    const date = new Date(dateStr)

    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short'
    })
  }

  return (
    <section className="activity-log">
      {activities.map((activity) => (
        <div key={activity.id} className="activity-item">
          <div className="activity-header flex align-center">
            <span className="time flex align-center">
              {svgs.clock} {formatTime(activity.createdAt)}
            </span>

            <img src={activity.byMember.imgUrl} className="user-avatar" style={{ width: '30px', height: '30px' }} />

            <span className="activity-task-title">{activity.task.title}</span>
            <span className="activity-field">{activity.field}</span>
          </div>

          <div className="type-indicator flex align-center">{activity.type}</div>

          <div className="activity-content flex align-center">
            {activity.type === 'Created' && (
              <div className="created-change">
                <span>
                  Group: <span style={{ color: activity.group.color }}>{activity.group.title}</span>
                </span>
              </div>
            )}

            {activity.type === 'Name' && (
              <div className="name-change">
                <span className="old-value">{activity.oldState}</span>
                <span className="arrow">{svgs.arrowRight}</span>
                <span className="new-value">{activity.newState}</span>
              </div>
            )}

            {activity.type === 'Status' && (
              <div className="status-change flex align-center">
                <span className="old-value" style={{ backgroundColor: getLabelColor('Status', activity.oldState) }}>
                  {getLabelTitle('Status', activity.oldState)}
                </span>
                <span className="arrow">{svgs.arrowRight}</span>
                <span className="new-value" style={{ backgroundColor: getLabelColor('Status', activity.newState) }}>
                  {getLabelTitle('Status', activity.newState)}
                </span>
              </div>
            )}

            {activity.type === 'Priority' && (
              <div className="priority-change">
                <span className="old-value" style={{ backgroundColor: getLabelColor('Priority', activity.oldState) }}>
                  {getLabelTitle('Priority', activity.oldState)}
                </span>
                <span className="arrow">{svgs.arrowRight}</span>
                <span className="new-value" style={{ backgroundColor: getLabelColor('Priority', activity.newState) }}>
                  {getLabelTitle('Priority', activity.newState)}
                </span>
              </div>
            )}

            {activity.type === 'Date' && (
              <div className="date-change">
                <span className="old-value">{formatDate(activity.oldState)}</span>
                <span className="arrow">{svgs.arrowRight}</span>
                <span className="new-value">{formatDate(activity.newState)}</span>
              </div>
            )}

            {activity.type === 'Timeline' && (
              <div className="timeline-change">
                <span className="old-value">{formatDate(activity.oldState?.startDate) + ' - ' + formatDate(activity.oldState?.endDate)}</span>
                <span className="arrow">{svgs.arrowRight}</span>
                <span className="new-value">{formatDate(activity.newState?.startDate) + ' - ' + formatDate(activity.newState?.endDate)}</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </section>
  )
}
