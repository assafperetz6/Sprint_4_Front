import { httpService } from '../http.service'

export const boardService = {
  query,
  getById,
  save,
  remove,
  getGroups,
  getGroupById,
  removeGroup,
  saveGroup,
  getTasks,
  getTaskById,
  saveTask,
  removeTask,
  removeTasks,
  duplicateTasks,
  archiveTasks,
  getTaskActivities,
  getGroupByTask
}

async function query(filterBy = { txt: '', price: 0 }) {
  return httpService.get(`board`, filterBy)
}

function getById(boardId) {
  return httpService.get(`board/${boardId}`)
}

async function remove(boardId) {
  return httpService.delete(`board/${boardId}`)
}

async function save(board) {
  var savedBoard
  if (board._id) {
    savedBoard = await httpService.put(`board/${board._id}`, board)
  } else {
    savedBoard = await httpService.post('board', board)
  }
  return savedBoard
}

async function getGroups(boardId) {
  return httpService.get(`board/${boardId}/group`)
}

async function getGroupById(boardId, groupId) {
  return httpService.get(`board/${boardId}/group/${groupId}`)
}

async function removeGroup(boardId, groupId) {
  return httpService.delete(`board/${boardId}/group/${groupId}`)
}

async function saveGroup(boardId, group) {
  var savedGroup
  if (group.id) {
    savedGroup = await httpService.put(`board/${boardId}/group/${group.id}`, group)
  } else {
    savedGroup = await httpService.post(`board/${boardId}/group`, group)
  }
  return savedGroup
}

async function getTasks(boardId, groupId) {
  return httpService.get(`board/${boardId}/group/${groupId}/task`)
}

async function getTaskById(boardId, taskId, groupId = null) {
  return httpService.get(`board/${boardId}/group/${groupId}/task/${taskId}`)
}

async function removeTask(boardId, taskId, groupId) {
  return httpService.delete(`board/${boardId}/group/${groupId}/task/${taskId}`)
}

async function saveTask(boardId, groupId, task, activity) {
  var savedTask
  if (task.id) {
    savedTask = await httpService.put(`board/${boardId}/group/${groupId}/task/${task.id}`, { task, activity })
  } else {
    savedTask = await httpService.post(`board/${boardId}/group/${groupId}/task`, { task, activity })
  }
  return savedTask
}

async function removeTasks(boardId, tasks) {
  const taskAndGroupIds = tasks.map((task) => ({ taskId: task.id, groupId: task.groupId }))
  return httpService.delete(`board/${boardId}/tasks`, taskAndGroupIds)
}

async function duplicateTasks(boardId, tasks) {
  return httpService.post(`board/${boardId}/tasks`, tasks)
}

async function archiveTasks(boardId, tasks) {
  return httpService.put(`board/${boardId}/tasks`, tasks)
}

async function moveTasksTo(boardId, tasks) {}

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

function getGroupByTask(board, taskId) {
  const newBoard = structuredClone(board)

  return newBoard.groups.find((g) => g.tasks.some((t) => t.id === taskId))
}
