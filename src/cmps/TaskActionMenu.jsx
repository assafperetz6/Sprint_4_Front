import { useRef, useState } from 'react'
import { useParams } from 'react-router'
import { svgs } from '../services/svg.service'
import { duplicateTasks, removeTasks, archiveTasks, moveTasksTo } from '../store/actions/board.actions'
import { useDispatch, useSelector } from 'react-redux'
import { SET_SELECTED_TASKS } from '../store/reducers/board.reducer'
import { hexToRgba, makeId } from '../services/util.service'
import { showSuccessMsg } from '../services/event-bus.service'

export function TaskActionMenu({ tasks }) {
  const dispatch = useDispatch()
  const board = useSelector((storeState) => storeState.boardModule.board)
  const [openGroupList, setOpenGroupList] = useState(false)

  const params = useParams()

  function onCloseMenu() {
    dispatch({ type: SET_SELECTED_TASKS })
  }

  async function onRemoveTask() {
    try {
      removeTasks(board._id, tasks)
      showSuccessMsg(`We successfully deleted ${tasks.length} items`)
    } catch (err) {
      console.log('Failed to remove tasks', err)
    }

    onCloseMenu()
  }

  async function onDuplicate() {
    try {
      duplicateTasks(board._id, tasks)
    } catch (err) {
      console.log('Failed to duplicate tasks', err)
    }

    onCloseMenu()
  }

  async function onArchive() {
    try {
      archiveTasks(board._id, tasks)
    } catch (err) {
      console.log('Failed to archive tasks', err)
    }

    onCloseMenu()
  }

  async function onMoveTo(newGroupId) {
    // console.log(newGroupId)
    const activity = {
      type: 'Moved',
      oldState: tasks[0].group,
      newState: newGroupId
    }
    try {
      moveTasksTo(board._id, newGroupId, tasks, activity)
    } catch (err) {
      console.log('Failed to move tasks', err)
    }

    onCloseMenu()
  }

  return (
    <section className="task-action-menu">
      <div className="task-count">{tasks.length}</div>
      <h4>Task{tasks.length > 1 ? 's' : ''} selected</h4>

      <section className="actions">
        <button className="duplicate-btn" onClick={onDuplicate}>
          {svgs.duplicate}
          Duplicate
        </button>
        <button onClick={onArchive}>{svgs.archive} Archive</button>
        <button onClick={onRemoveTask}>{svgs.delete} Delete</button>
        <button className="move-to-btn" onClick={() => setOpenGroupList(true)}>
          {svgs.arrowRightAlt} Move to
        </button>
      </section>

      <button onClick={onCloseMenu} className="close-menu">
        {svgs.closeBox}
      </button>

      {openGroupList && <GroupList board={board} onMoveTo={onMoveTo} />}
    </section>
  )
}

function GroupList({ board, onMoveTo }) {
  return (
    <ul className="secondary context-menu">
      {board.groups
        // .filter((group) => !group.tasks.find((t) => t.id === entity.id))
        .map((group) => (
          <li key={group.id}>
            <button onClick={() => onMoveTo(group.id)}>
              <span className="color-indicator" style={{ backgroundColor: hexToRgba(group.style.color, 1) }}></span>
              {group.title}
            </button>
          </li>
        ))}
    </ul>
  )
}
