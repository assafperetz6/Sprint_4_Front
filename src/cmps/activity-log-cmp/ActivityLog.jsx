import { useState, useEffect } from 'react'

import { ActivityPreview } from './ActivityPreview'
import { useParams } from 'react-router'
import { boardService } from '../../services/board'
import { useSelector } from 'react-redux'

export function ActivityLog() {
  const [activities, setActivities] = useState([])
  const { boardId, taskId } = useParams()
  const board = useSelector((state) => state.boardModule.board)
  console.log('board', board)
  console.log('taskId', taskId)

  useEffect(() => {
    loadActivities()
  }, [boardId, taskId, board])

  async function loadActivities() {
    if (taskId) {
      const taskActivities = await boardService.getTaskActivities(boardId, taskId)
      setActivities(taskActivities)
    } else {
      const board = await boardService.getById(boardId)
      setActivities(board.activities)
    }
  }

  return (
    <section className="activity-log">
      {activities.map((activity) => (
        <ActivityPreview key={activity.id} activity={activity} board={board} />
      ))}
    </section>
  )
}
