import { useRef, useState } from 'react'
import { boardService } from '../services/board'
import { showErrorMsg } from '../services/event-bus.service'
import { useSelector } from 'react-redux'
import { addTask } from '../store/actions/board.actions'
import { hexToRgba } from '../services/util.service'

import { Checkbox } from './Checkbox'

export function AddTask({ group }) {
  const board = useSelector((storeState) => storeState.boardModule.board)
  const [taskToAdd, setTaskToAdd] = useState(boardService.getEmptyTask())
  const elInput = useRef()

  async function onAddTask(ev) {
    if (ev) ev.preventDefault()

    try {
      const activity = { type: 'Created', newState: taskToAdd.title }
      setTaskToAdd(boardService.getEmptyTask())
      addTask(board._id, group.id, taskToAdd, activity)
    } catch (err) {
      showErrorMsg('cannot add task')
      console.log(err)
      throw err
    }
  }

  function onBlur() {
    if (taskToAdd.title) onAddTask()
    else return
  }

  function handleChange({ target }) {
    setTaskToAdd((prev) => ({ ...prev, title: target.value }))
  }

  return (
    <li
      className="add-task full"
      onClick={() => {
        elInput.current.focus()
      }}>
      <div className="sticky-container">
        <div className="white-space"></div>

        <div className="colored-border" style={{ backgroundColor: hexToRgba(group.style.color, 0.6) }}></div>
        <Checkbox />

        <form onSubmit={onAddTask}>
          <input
            className="add-task-input"
            ref={elInput}
            placeholder="+ Add task"
            value={taskToAdd.title}
            onBlur={onBlur}
            onChange={handleChange}></input>
        </form>
      </div>
    </li>
  )
}
