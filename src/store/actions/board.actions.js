import { boardService } from '../../services/board/'
import { store } from '../store'
import { ADD_BOARD, REMOVE_BOARD, SET_BOARDS, SET_BOARD, UPDATE_BOARD } from '../reducers/board.reducer'
import { makeId } from '../../services/util.service'
import { userService } from '../../services/user'

// Board Actions //

export async function loadBoards(filterBy) {
	try {
		const boards = await boardService.query(filterBy)
		store.dispatch(getCmdSetBoards(boards))
	} catch (err) {
		console.log('error from actions--> Cannot load boards', err)
		throw err
	}
}

export async function loadBoard(boardId) {
	try {
		const board = await boardService.getById(boardId)
		store.dispatch(getCmdSetBoard(board))
	} catch (err) {
		console.log('error from actions--> Cannot load board', err)
		throw err
	}
}

export async function removeBoard(boardId) {
	try {
		await boardService.remove(boardId)
		store.dispatch(getCmdRemoveBoard(boardId))
	} catch (err) {
		console.log('error from actions--> Cannot remove board', err)
		throw err
	}
}

export async function addBoard(board) {
	try {
		const savedBoard = await boardService.save(board)
		store.dispatch(getCmdAddBoard(savedBoard))
		store.dispatch({ type: SET_BOARD, board: savedBoard })
		return savedBoard
	} catch (err) {
		console.log('error from actions--> Cannot add board', err)
		throw err
	}
}

export async function updateBoard(board) {
	try {
		const savedBoard = await boardService.save(board)
		store.dispatch(getCmdUpdateBoard(savedBoard))
		return savedBoard
	} catch (err) {
		console.log('error from actions--> Cannot save board', err)
		throw err
	}
}

export async function updateBoardOptimistic(board) {
	try {
		store.dispatch(getCmdUpdateBoard(board))
		store.dispatch(getCmdSetBoard(board))
		const savedBoard = await boardService.save(board)
		return savedBoard
	} catch (err) {
		console.log('error from actions--> Cannot save board', err)
		throw err
	}
}

// Board Command Creators: //
function getCmdSetBoards(boards) {
	return { type: SET_BOARDS, boards }
}
function getCmdSetBoard(board) {
	return { type: SET_BOARD, board }
}
function getCmdRemoveBoard(boardId) {
	return { type: REMOVE_BOARD, boardId }
}
function getCmdAddBoard(board) {
	return { type: ADD_BOARD, board }
}
function getCmdUpdateBoard(board) {
	return { type: UPDATE_BOARD, board }
}

// group actions: //

export async function addGroup(boardId, group) {
	try {
		const savedBoard = await boardService.saveGroup(boardId, group)
		store.dispatch(getCmdSetBoard(savedBoard))
	} catch (err) {
		console.log('error from actions--> cannot add group', err)
		throw err
	}
}
export async function updateGroup(boardId, group) {
	try {
		const savedBoard = await boardService.saveGroup(boardId, group)
		store.dispatch(getCmdSetBoard(savedBoard))
	} catch (err) {
		console.log('error from actions--> cannot save group', err)
		throw err
	}
}
export async function removeGroup(boardId, groupId) {
	try {
		const savedBoard = await boardService.removeGroup(boardId, groupId)
		store.dispatch(getCmdSetBoard(savedBoard))
	} catch (err) {
		console.log('error from actions--> cannot remove group', err)
		throw err
	}
}

// tasks actions: //

export async function removeTask(boardId, taskId, groupId) {
	try {
		const savedBoard = await boardService.removeTask(boardId, taskId, groupId)
		store.dispatch(getCmdSetBoard(savedBoard))
	} catch (err) {
		console.log('error from actions--> cannot remove task', err)
		throw err
	}
}
export async function addTask(boardId, groupId, task, activity, unShift = false) {
	try {
		const activityToSave = await _addActivity(boardId, groupId, task, activity)
		const savedBoard = await boardService.saveTask(boardId, groupId, task, activityToSave, unShift)

		store.dispatch(getCmdSetBoard(savedBoard))
	} catch (err) {
		console.log('error from actions--> cannot add task', err)
		throw err
	}
}
export async function updateTask(boardId, groupId, task, activity) {
	try {
		const activityToSave = await _addActivity(boardId, groupId, task, activity)
		const savedBoard = await boardService.saveTask(boardId, groupId, task, activityToSave)
		store.dispatch(getCmdSetBoard(savedBoard))
		return savedBoard
	} catch (err) {
		console.log('error from actions--> cannot update task', err)
		throw err
	}
}

async function _addActivity(boardId, groupId, task, activity) {
	if (!activity) return

	const group = await boardService.getGroupById(boardId, groupId)
	const activtyToSave = {
		id: makeId(),
		title: activity.txt,
		createdAt: Date.now(),
		byMember: await userService.getLoggedinUser(),
		group: { id: group.id, title: group.title },
		task: { id: task.id, title: task.title }
	}

	return activtyToSave
}
