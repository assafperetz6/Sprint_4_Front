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
	removeTask
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
			activities: board.activities
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
			activities: board.activities
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
		const group = groups.find(group => group.id === groupId)
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
		const groupIdx = board.groups.findIndex(group => group.id === groupId)
		if (groupIdx === -1) throw new Error(`No group with id: ${groupId}`)

		board.groups.splice(groupIdx, 1)
		return storageService.put(STORAGE_KEY, board)
	} catch (err) {
		console.log('cannot remove group', err)
		throw err
	}
}

async function saveGroup(boardId, group) {
	const groupToSave = {
		title: group.title,
		style: group.style,
		tasks: group.tasks
	}

	try {
		const board = await getById(boardId)
		if (group.id) {
			groupToSave.id = group.id
			const groupIdx = board.groups.findIndex(group => group.id === groupToSave.id)
			if (groupIdx === -1) throw new Error(`No group with id: ${group.id}`)
			board.groups.splice(groupIdx, 1, groupToSave)
		} else {
			groupToSave.id = makeId()
			board.groups.push(groupToSave)
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

async function getTaskById(boardId, taskId) {
	try {
		const { groups } = await getById(boardId)
		var task
		groups.forEach(group => {
			const taskToFind = group.tasks.find(task => task.id === taskId)
			if (taskToFind) task = taskToFind
			if (!task) throw new Error(`No task with id: ${taskId} in group: ${group.id}`)
		})
		return task
	} catch (err) {
		console.log('cannot get task', err)
		throw err
	}
}

async function removeTask(boardId, taskId) {
	try {
		const board = await getById(boardId)
		let isTaskFound = false
		board.groups.forEach((group, idx) => {
			const taskIdx = group.tasks.findIndex(task => task.id === taskId)
			if (taskIdx !== -1) {
				isTaskFound = true
				board.groups[idx].tasks.splice(taskIdx, 1)
			}
		})
		if (!isTaskFound) throw new Error(`No task with id: ${taskId}`)
		return storageService.put(STORAGE_KEY, board)
	} catch (err) {
		console.log('cannot remove task', err)
		throw err
	}
}

async function saveTask(boardId, groupId, task, activity) {
	try {
		const taskToSave = {
			id: task.id,
			title: task.title,
			members: task.members,
			priority: task.priority,
			dueDate: task.dueDate,
			timeline: task.timeline,
			status: task.status
		}
		const board = await getById(boardId)

		const groupIdx = board.groups.findIndex(group => group.id === groupId)
		if (groupIdx === -1) throw new Error(`No group with id: ${groupId}`)

		const { tasks } = board.groups[groupIdx]

		if (task.id) {
			taskToSave.id = task.id
			const taskIdx = tasks.findIndex(task => task.id === taskToSave.id)
			if (taskIdx === -1) throw new Error(`No task with id: ${task.id} in group: ${groupId}`)
			tasks.splice(taskIdx, 1, taskToSave)
		} else {
			taskToSave.id = makeId()
			tasks.push(taskToSave)
			activity.task.id = taskToSave.id
		}

		board.activities.unshift(activity)

		return save(board)
	} catch (err) {
		console.log('cannot save task', err)
		throw err
	}
}

// async function addActivity(boardId, groupId, task, txt) {
// 	try {
// 		const board = await getById(boardId)
// 		const group = await getGroupById(groupId)

// 		board.activities.unshift()
// 	} catch (err) {}
// }
