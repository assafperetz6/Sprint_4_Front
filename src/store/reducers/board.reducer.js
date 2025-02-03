export const SET_BOARDS = 'SET_BOARDS'
export const SET_BOARD = 'SET_BOARD'
export const REMOVE_BOARD = 'REMOVE_BOARD'
export const ADD_BOARD = 'ADD_BOARD'
export const UPDATE_BOARD = 'UPDATE_BOARD'
export const SET_FILTER = 'SET_FILTER'

const initialState = {
	boards: [],
	board: null,
	filterBy: {}
}

export function boardReducer(state = initialState, action) {
	var newState = state
	var boards
	switch (action.type) {
		case SET_BOARDS:
			newState = { ...state, boards: action.boards }
			break
		case SET_BOARD:
			
			if (state.filterBy.txt.length) {
				
				const filterBy = state.filterBy
				const filteredGroups = action.board.groups.filter((group) =>
					group.title.toLowerCase().includes(filterBy.txt.toLowerCase())
				)

				const groupsFilteredTasks = action.board.groups
					.map((group) => ({
						...group,
						tasks: group.tasks.filter((task) =>
							task.title.toLowerCase().includes(filterBy.txt.toLowerCase())
						),
					}))
					.filter((group) => group.tasks.length > 0)

				const filteredBoard = { ...action.board, groups: [...filteredGroups, ...groupsFilteredTasks] }

				newState = { ...state, board: filteredBoard }
			} else newState = { ...state, board: action.board }

			break
		case REMOVE_BOARD:
			const lastRemovedBoard = state.boards.find(board => board._id === action.boardId)
			boards = state.boards.filter(board => board._id !== action.boardId)
			newState = { ...state, boards, lastRemovedBoard }
			break
		case ADD_BOARD:
			newState = { ...state, boards: [...state.boards, action.board] }
			break
		case UPDATE_BOARD:
			boards = state.boards.map(board => (board._id === action.board._id ? action.board : board))
			newState = { ...state, boards }
			break
		case SET_FILTER:
			newState = { ...state, filterBy: { ...action.filterBy } }

			
			break

		default:
			return state
	}
	return newState
}
