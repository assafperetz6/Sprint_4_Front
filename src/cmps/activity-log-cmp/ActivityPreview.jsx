import { Truncate } from '../Truncate.jsx'
import { svgs } from '../../services/svg.service'

export function ActivityPreview({ activity, board }) {
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

    return label?.title || ''
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
    <div key={activity.id} className="activity-item">
      <div className="top-row">
        <time dateTime={new Date(activity.createdAt).toLocaleString()} className="time flex align-center">
          {svgs.clock} {formatTime(activity.createdAt)}
        </time>

        <div className="activity-and-user flex align-center">
          <div className="user flex align-center justify-center" style={{ borderRadius: '50%', height: '30px', minWidth: '30px', overflow: 'hidden' }}>
            <img src={activity.byMember.imgUrl} className="user-avatar" style={{ height: '100%' }} />
          </div>

          <span className="activity-task-title">
            <Truncate>{activity.task.title}</Truncate>
          </span>
        </div>
      </div>

      <div className="additional-values flex align-center">
        <div className="type-indicator flex align-center">
          <span>{activity.type}</span>
        </div>

        <div className="activity-content flex align-center">
          {activity.type === 'Created' && (
            <div className="created-change flex align-center">
              Group: <span style={{ color: activity.group.color }}> {activity.group.title}</span>
            </div>
          )}
          {activity.type === 'Name' && (
            <div className="name-change flex align-center">
              <div className="old-value">
                <Truncate>{activity.oldState || ''}</Truncate>
              </div>
              <span className="arrow">{svgs.arrowRight}</span>
              <div className="new-value">
                <Truncate>{activity.newState || ''}</Truncate>
              </div>
            </div>
          )}
          {activity.type === 'Member' && (
            <div className="member-change flex align-center">
              <span>{activity.description}</span>
              <div className="user-avatar" style={{ borderRadius: '50%', height: '30px', minWidth: '30px', overflow: 'hidden' }}>
                <img src={activity?.newState.imgUrl} style={{ height: '100%' }} />
              </div>
            </div>
          )}

          {activity.type === 'Status' && (
            <div className="status-change flex align-center">
              <div className="old-value" style={{ backgroundColor: getLabelColor('Status', activity.oldState) }}>
                {getLabelTitle('Status', activity.oldState) ? (
                  <Truncate>{getLabelTitle('Status', activity.oldState) || ''}</Truncate>
                ) : (
                  <div className="empty"></div>
                )}
              </div>
              <span className="arrow">{svgs.arrowRight}</span>
              <div className="new-value" style={{ backgroundColor: getLabelColor('Status', activity.newState) }}>
                {getLabelTitle('Status', activity.newState) ? (
                  <Truncate>{getLabelTitle('Status', activity.newState) || ''}</Truncate>
                ) : (
                  <div className="empty"></div>
                )}
              </div>
            </div>
          )}
          {activity.type === 'Priority' && (
            <div className="priority-change flex align-center">
              <div className="old-value" style={{ backgroundColor: getLabelColor('Priority', activity.oldState) }}>
                {getLabelTitle('Priority', activity.oldState) ? (
                  <Truncate>{getLabelTitle('Priority', activity.oldState) || ''}</Truncate>
                ) : (
                  <div className="empty"></div>
                )}
              </div>
              <span className="arrow">{svgs.arrowRight}</span>
              <div className="new-value" style={{ backgroundColor: getLabelColor('Priority', activity.newState) }}>
                {getLabelTitle('Priority', activity.newState) ? (
                  <Truncate>{getLabelTitle('Priority', activity.newState) || ''}</Truncate>
                ) : (
                  <div className="empty"></div>
                )}
              </div>
            </div>
          )}
          {activity.type === 'Date' && (
            <div className="date-change flex align-center">
              <span className="old-value">{formatDate(activity.oldState)}</span>
              <span className="arrow">{svgs.arrowRight}</span>
              <span className="new-value">{formatDate(activity.newState)}</span>
            </div>
          )}
          {activity.type === 'Timeline' && (
            <div className="timeline-change flex align-center">
              <span className="old-value">{formatDate(activity.oldState?.startDate) + ' - ' + formatDate(activity.oldState?.endDate)}</span>
              <span className="arrow">{svgs.arrowRight}</span>
              <span className="new-value">{formatDate(activity.newState?.startDate) + ' - ' + formatDate(activity.newState?.endDate)}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
