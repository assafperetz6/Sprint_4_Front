import { storageService } from '../async-storage.service'
import { userService } from '../user'
import { defaultBoard } from './data'

const STORAGE_KEY = 'board'

export const boardService = {
	query,
	getById,
	save,
	remove
	// addBoardUpdate
}

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
			cmpsOrder: board.cmpsOrder
		}
		savedBoard = await storageService.put(STORAGE_KEY, boardToSave)
	} else {
		const boardToSave = {
			_id: board._id,
			createdBy: userService.getLoggedinUser(),
			title: board.title,
			groups: board.groups,
			members: board.members,
			cmpsOrder: board.cmpsOrder
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

// async function addtaskUpdate(taskId, txt) {
//     const task = await getById(taskId)

//     const update = {
//         id: makeId(),
//         by: userService.getLoggedinUser(),
//         txt
//     }
//     task.updates.push(update)
//     await storageService.put(STORAGE_KEY, task)

//     return update
// }
