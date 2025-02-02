import { useEffect, useState } from 'react'
import { useOutletContext, useParams, useLocation } from 'react-router'
import { boardService } from '../services/board'
import { svgs } from '../services/svg.service'
import { useSelector } from 'react-redux'
import { ActivityLog } from './activity-log-cmp/ActivityLog.jsx'
import { Updates } from './activity-log-cmp/Updates.jsx'

export function BoardModal() {
  const board = useSelector((state) => state.boardModule.board)
  const location = useLocation()
  const { boardId, taskId } = useParams()
  const [task, setTask] = useState(null)
  const [view, setView] = useState('updates')
  const { isClosing, closeTaskDetails: closeModal } = useOutletContext()

  const isTaskView = location.pathname.includes('/task/')

  useEffect(() => {
    if (isTaskView && taskId) {
      getTask(boardId, taskId)
    } else setView('activity')
  }, [taskId, isTaskView, task])

  async function getTask(boardId, taskId) {
    try {
      const task = await boardService.getTaskById(boardId, taskId)
      setTask(task)
    } catch (err) {
      console.log(err, 'cannot get task')
    }
  }

  const animationClass = isClosing ? 'closing' : task || !isTaskView ? 'open' : ''

  return (
    <section className={`board-modal ${animationClass}`}>
      {!isTaskView || task ? (
        <>
          <button className="exit-btn" onClick={closeModal}>
            {svgs.exit}
          </button>

          {isTaskView ? (
            // Task Details View
            <>
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
                <DynamicCmp view={view} board={board} task={task} />
              </section>
            </>
          ) : (
            // Board Activity Log View
            <>
              <section className="details-top-bar">
                <h2>{board.title} </h2>
              </section>
              <section className="task-details-actions">
                <button className={view === 'activity' ? 'active' : ''} onClick={() => setView('activity')}>
                  Activity Log
                </button>
                <button className={view === 'updates' ? 'active' : ''} onClick={() => setView('updates')}>
                  Updates
                </button>
              </section>
              <section className="details-bottom-bar">
                <DynamicCmp view={view} />
              </section>
            </>
          )}
        </>
      ) : null}
    </section>
  )
}

function DynamicCmp({ view, task }) {
  switch (view) {
    case 'updates':
      return <Updates task={task} />
    case 'files':
      return <h1>files: under construction</h1>
    case 'activity':
      return <ActivityLog />
  }
}
