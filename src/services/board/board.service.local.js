import { store } from '../../store/store'
import { storageService } from '../async-storage.service'
import { userService } from '../user'
import { makeId } from '../util.service'
import { defaultBoard } from './data'

const STORAGE_KEY = 'board'

export const boardService = {
  query,
  getById,
  save,
  remove,
  getGroups,
  getGroupById,
  saveGroup,
  removeGroup,
  getTasks,
  getTaskById,
  saveTask,
  removeTask,
  removeTasks,
  duplicateTasks,
  archiveTasks,
  moveTasksTo,
  getGroupByTask,
  getTaskActivities
}

// Board //
async function query() {
  var boards = await storageService.query(STORAGE_KEY)
  if (!boards.length) {
    boards = _makeBoard()
  }
  return boards
}

function getById(boardId) {
  return storageService.get(STORAGE_KEY, boardId)
}

async function remove(boardId) {
  await storageService.remove(STORAGE_KEY, boardId)
}

async function save(board) {
  var savedBoard
  if (board._id) {
    const boardToSave = {
      _id: board._id,
      createdBy: board.createdBy,
      title: board.title,
      groups: board.groups,
      members: board.members,
      isStarred: board.isStarred,
      cmpsOrder: board.cmpsOrder,
      statusLabels: board.statusLabels,
      priorityLabels: board.priorityLabels,
      activities: board.activities,
      comments: board.comments
    }
    savedBoard = await storageService.put(STORAGE_KEY, boardToSave)
  } else {
    const boardToSave = {
      _id: board._id,
      createdBy: userService.getLoggedinUser(),
      title: board.title,
      groups: board.groups,
      members: board.members,
      cmpsOrder: board.cmpsOrder,
      statusLabels: board.statusLabels,
      priorityLabels: board.priorityLabels,
      activities: board.activities,
      comments: board.comments
    }
    savedBoard = await storageService.post(STORAGE_KEY, boardToSave)
  }
  return savedBoard
}

async function _makeBoard() {
  const test = await storageService.query()
  if (!test.length) {
    localStorage.setItem('board', JSON.stringify(defaultBoard))
  }
  return defaultBoard
}

// Group //
async function getGroups(boardId) {
  try {
    const { groups } = await getById(boardId)
    return groups
  } catch (err) {
    console.log('cannot get groups', err)
    throw err
  }
}

async function getGroupById(boardId, groupId) {
  try {
    const { groups } = await getById(boardId)
    const group = groups.find((group) => group.id === groupId)
    if (!group) throw new Error(`No group with id: ${groupId}`)
    return group
  } catch (err) {
    console.log('cannot get board', err)
    throw err
  }
}

async function removeGroup(boardId, groupId) {
  try {
    const board = await getById(boardId)
    const groupIdx = board.groups.findIndex((group) => group.id === groupId)
    if (groupIdx === -1) throw new Error(`No group with id: ${groupId}`)

    board.groups.splice(groupIdx, 1)
    return storageService.put(STORAGE_KEY, board)
  } catch (err) {
    console.log('cannot remove group', err)
    throw err
  }
}

function getGroupByTask(board, taskId) {
  const newBoard = structuredClone(board)

  return newBoard.groups.find((g) => g.tasks.some((t) => t.id === taskId))
}

async function saveGroup(boardId, group, unshift = false) {
  const groupToSave = {
    title: group.title,
    style: group.style,
    tasks: group.tasks,
    isCollapsed: group.isCollapsed
  }
  try {
    const board = await getById(boardId)
    if (group.id) {
      groupToSave.id = group.id
      const groupIdx = board.groups.findIndex((group) => group.id === groupToSave.id)
      if (groupIdx === -1) throw new Error(`No group with id: ${group.id}`)
      board.groups.splice(groupIdx, 1, groupToSave)
    } else {
      groupToSave.id = makeId()
      unshift ? board.groups.unshift(groupToSave) : board.groups.push(groupToSave)
    }
    return storageService.put(STORAGE_KEY, board)
  } catch (err) {
    console.log('cannot save group', err)
    throw err
  }
}

// Task //
async function getTasks(boardId, groupId) {
  try {
    const { tasks } = await getGroupById(boardId, groupId)
    return tasks
  } catch (err) {
    console.log('cannot get get tasks', err)
    throw err
  }
}

async function getTaskById(boardId, taskId, groupId = null) {
  let group
  if (groupId) {
    try {
      group = await getGroupById(boardId, groupId)
    } catch (err) {
      throw new Error(`Problem getting task`, err)
    }
  } else {
    try {
      const board = await getById(boardId)
      group = board.groups.find((group) => {
        return group.tasks.find((task) => task.id === taskId)
      })
    } catch (err) {
      throw new Error(`Problem getting task`, err)
    }
  }
  try {
    let task
    const taskToFind = group.tasks.find((task) => task.id === taskId)
    if (taskToFind) task = taskToFind
    if (!task) throw new Error(`No task with id: ${taskId} in group: ${group.id}`)
    return task
  } catch (err) {
    console.log('cannot get task', err)
    throw err
  }
}

/**
 *
 * @param {string} boardId
 * @param {string} taskId
 * @param {string} groupId
 * @returns {object}
 */

async function removeTask(boardId, taskId, groupId) {
  try {
    const board = await getById(boardId)
    const groupToFind = board.groups.find((group) => groupId === group.id)

    let isTaskFound = false

    const taskIdx = groupToFind.tasks.findIndex((task) => task.id === taskId)
    if (taskIdx !== -1) {
      isTaskFound = true
      groupToFind.tasks.splice(taskIdx, 1)
      board.groups.filter((group) => (group.id !== groupId ? group : groupToFind))
    }
    if (!isTaskFound) throw new Error(`No task with id: ${taskId}`)
    return storageService.put(STORAGE_KEY, board)
  } catch (err) {
    console.log('cannot remove task', err)
    throw err
  }
}

/**
 *
 * @param {string} boardId
 * @param {string} groupId
 * @param {object} task
 * @param {object} activity
 * @param {boolean} isDuplicate
 * @param {boolean} isMoved
 * @returns {object}
 */

async function saveTask(boardId, groupId, task, activity, isDuplicate = false, isMoved = false, unShift = false) {
  try {
    const taskToSave = {
      id: task.id,
      title: task.title,
      members: task.members,
      priority: task.priority,
      dueDate: task.dueDate,
      timeline: task.timeline,
      status: task.status,
      archivedAt: task.archivedAt,
      comments: task.comments
    }

    const board = await getById(boardId)

    const groupIdx = board.groups.findIndex((group) => group.id === groupId)
    if (groupIdx === -1) throw new Error(`No group with id: ${groupId}`)

    const { tasks } = board.groups[groupIdx]

    if (task.id) {
      if (isMoved) tasks.push(taskToSave)
      else {
        const taskIdx = tasks.findIndex((task) => task.id === taskToSave.id)
        if (taskIdx === -1) throw new Error(`No task with id: ${task.id} in group: ${groupId}`)

        if (isDuplicate) {
          taskToSave.id = makeId()
          taskToSave.title += ' (copy)'
          tasks.splice(taskIdx + 1, 0, taskToSave)
        } else tasks.splice(taskIdx, 1, taskToSave)
      }
    } else {
      taskToSave.id = makeId()
      if (unShift) {
        taskToSave.title = 'New task'
        tasks.unshift(taskToSave)
      } else {
        tasks.push(taskToSave)
      }
      activity.task.id = taskToSave.id
    }

    if (activity) board.activities.unshift(activity)

    return save(board)
  } catch (err) {
    console.log('cannot save task', err)
    throw err
  }
}

async function getTaskActivities(boardId, taskId) {
  try {
    const board = await getById(boardId)
    if (!board.activities) return
    const taskActivities = board.activities?.filter((activity) => activity.entityId === taskId) || []

    return taskActivities.sort((a, b) => b.createdAt - a.createdAt)
  } catch (err) {
    console.error('Failed to get task activities:', err)
    throw err
  }
}

async function removeTasks(boardId, tasks) {
  for (const task of tasks) {
    try {
      await removeTask(boardId, task.id, task.groupId)
    } catch (err) {
      throw new Error('problem with deleting tasks', err)
    }
  }
  return getById(boardId)
}

async function duplicateTasks(boardId, tasks) {
  for (const task of tasks) {
    try {
      await saveTask(boardId, task.groupId, task, null, true)
    } catch (err) {
      throw new Error('problem with duplicating tasks', err)
    }
  }
  return getById(boardId)
}

async function archiveTasks(boardId, tasks) {
  for (const task of tasks) {
    try {
      task.archivedAt = Date.now()
      await saveTask(boardId, task.groupId, task, null)
    } catch (err) {
      throw new Error('problem updating tasks', err)
    }
  }
  return getById(boardId)
}

async function moveTasksTo(boardId, newGroupId, tasks) {
  for (const task of tasks) {
    try {
      await saveTask(boardId, newGroupId, task, { txt: `Moved task ${task.id} from group ${task.groupId}` }, false, true)

      await removeTask(boardId, task.id, task.groupId)
    } catch (err) {
      throw new Error('problem moving tasks', err)
    }
  }
  return getById(boardId)
}

// async function addActivity(boardId, groupId, task, txt) {
// 	try {
// 		const board = await getById(boardId)
// 		const group = await getGroupById(groupId)

// 		board.activities.unshift()
// 	} catch (err) {}
// }
