import { boardService } from '../../services/board/'
import { store } from '../store'
import { ADD_BOARD, REMOVE_BOARD, SET_BOARDS, SET_BOARD, UPDATE_BOARD } from '../reducers/board.reducer'

// Board Actions //

export async function loadBoards(filterBy) {
	try {
		const boards = await boardService.query(filterBy)
		store.dispatch(getCmdSetBoards(boards))
	} catch (err) {
		console.log('Cannot load boards', err)
		throw err
	}
}

export async function loadBoard(boardId) {
	try {
		const board = await boardService.getById(boardId)
		store.dispatch(getCmdSetBoard(board))
	} catch (err) {
		console.log('Cannot load board', err)
		throw err
	}
}

export async function removeBoard(boardId) {
	try {
		await boardService.remove(boardId)
		store.dispatch(getCmdRemoveBoard(boardId))
	} catch (err) {
		console.log('Cannot remove board', err)
		throw err
	}
}

export async function addBoard(board) {
	try {
		const savedBoard = await boardService.save(board)
		store.dispatch(getCmdAddBoard(savedBoard))
		return savedBoard
	} catch (err) {
		console.log('Cannot add board', err)
		throw err
	}
}

export async function updateBoard(board) {
	try {
		const savedBoard = await boardService.save(board)
		store.dispatch(getCmdUpdateBoard(savedBoard))
		return savedBoard
	} catch (err) {
		console.log('Cannot save board', err)
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
