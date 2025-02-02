import { Link } from 'react-router-dom'
import { svgs } from '../services/svg.service'
import { hexToRgba } from '../services/util.service'

import { useSelector } from 'react-redux'
import { DynamicCmp } from './DynamicCmp'
import { showErrorMsg } from '../services/event-bus.service'
import { removeTask, updateTask } from '../store/actions/board.actions'
import { Checkbox } from './Checkbox'
import { useEffect, useRef, useState } from 'react'
import { InlineEdit } from './InlineEdit'
import { ContextMenu } from './ContextMenu'
import { Draggable } from '@hello-pangea/dnd'

export function TaskPreview({ group, task, idx }) {
  const board = useSelector((storeState) => storeState.boardModule.board)
  const [isTaskHovered, setIsTaskHovered] = useState(false)
  const [isActive, setIsActive] = useState(false)

  const [titleToEdit, setTitleToEdit] = useState(task.title)
  const [activeMenuId, setActiveMenuId] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const buttonRef = useRef(null)

  const onClick = () => setIsActive(true)
  const onBlur = () => setIsActive(false)

  useEffect(() => {
    setTitleToEdit(task.title)
  }, [task.title])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(`.task-preview-${task.id}`)) {
        setIsActive(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [task.id])

  async function onSaveTask(newTitle) {
    try {
      const activity = { oldState: task.title, newState: newTitle, type: 'Name' }

      await updateTask(board._id, group.id, { ...task, title: newTitle }, activity)
    } catch (err) {
      showErrorMsg('Cannot update title')
      console.error('Cannot update title:', err)
    }
  }

  async function onRemoveTask(boardId, groupId, taskId) {
    try {
      const activity = {
        type: 'Removed',
        description: 'Removed task',
        oldState: task
      }
      await removeTask(boardId, groupId, taskId, activity)
    } catch (err) {
      console.error('Cannot remove task:', err)
      showErrorMsg('Cannot remove task')
    }
  }

  return (
    <Draggable key={task.id} draggableId={task.id} index={idx}>
      {(provided, snapshot) => (
        <li
          className={`task-preview task-row flex full task-preview-${task.id} ${snapshot.isDragging ? 'dragging' : ''} ${isActive ? 'active' : ''} `}
          onClick={onClick}
          {...provided.draggableProps}
          ref={provided.innerRef}>
          <section className="sticky-container">
            <div className="context-btn-container">
              <button
                className={`task-context-menu ${activeMenuId === task.id ? 'open' : ''}`}
                onClick={(ev) => setActiveMenuId((prev) => (prev === task.id ? null : task.id))}
                ref={buttonRef}>
                {svgs.threeDots}
              </button>
            </div>

            <div className="colored-border" style={{ backgroundColor: hexToRgba(group.style.color, 1) }} />

            <Checkbox />

            <section className="task-title">
              <div
                className={`title-main-container`}
                onMouseEnter={() => setIsTaskHovered(true)}
                onMouseLeave={() => setIsTaskHovered(false)}
                {...provided.dragHandleProps}>
                <InlineEdit
                  value={titleToEdit}
                  onSave={onSaveTask}
                  // isEditing={isEditing}
                />

                <Link
                  to={`task/${task.id}`}
                  className="open-task-details"
                  // style={{ display: isTaskHovered && !isEditing ? 'flex' : 'none' }}
                >
                  &nbsp; {svgs.expand} open
                </Link>
              </div>

              {task.comments.length === 0 ? (
                <div className="add-update-btn">{svgs.addUpdate}</div>
              ) : (
                <div className="add-update-btn has-updates">
                  <Link to={`task/${task.id}`}>{svgs.comment}</Link>
                  <span className="update-count">{task.comments.length}</span>
                </div>
              )}
            </section>
          </section>

          <section className="task-col flex">
            {board.cmpsOrder.map((cmp, idx) => (
              <DynamicCmp key={idx} cmp={cmp} group={group} task={task} />
            ))}
            <li className="line-end" />
          </section>

          {activeMenuId === task.id && (
            <ContextMenu
              type="task"
              entity={task}
              onClose={() => setActiveMenuId(null)}
              onRemove={() => onRemoveTask(board._id, group.id, task.id)}
              onUpdate={(updatedTask) => onSaveTask(updatedTask.title)}
              onRename={(task) => setTitleToEdit(task.title)}
              referenceElement={buttonRef.current}
            />
          )}
        </li>
      )}
    </Draggable>
  )
}

// DELETE TASK BTN:

{
  /* <button className="delete-btn" onClick={() => deleteTask(task.id)}>
{svgs.delete}
</button> */
}
