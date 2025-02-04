export const SET_BOARDS = 'SET_BOARDS'
export const SET_BOARD = 'SET_BOARD'
export const REMOVE_BOARD = 'REMOVE_BOARD'
export const ADD_BOARD = 'ADD_BOARD'
export const UPDATE_BOARD = 'UPDATE_BOARD'
export const SET_SELECTED_TASKS = 'SET_SELECTED_TASKS'
export const SET_FILTER = 'SET_FILTER'

const initialState = {
	boards: [],
	board: null,
	selectedTasks: [],
	filterBy: { txt: '', members: [] },
}

export function boardReducer(state = initialState, action) {
	var newState = state
	var boards
	switch (action.type) {
		case SET_BOARDS:
			newState = { ...state, boards: action.boards }
			break

		case SET_BOARD:
			let filteredBoardGroups = [...action.board.groups]

			// FILTER BY MEMBERS

			if (state.filterBy.members.length) {
				const filterBy = state.filterBy

				const tests = filterBy.members.map(
					(memberId) => new RegExp(memberId, 'i')
				)

				filteredBoardGroups = filteredBoardGroups
					.map((group) => ({
						...group,
						tasks: group.tasks.filter((task) =>
							task.members.some((member) =>
								tests.some((regex) => regex.test(member._id))
							)
						),
					}))
					.filter((group) => group.tasks.length > 0)
			}
			
			// FILTER BY TEXT

			if (state.filterBy.txt) {
				const filterBy = state.filterBy
				const regex = new RegExp(filterBy.txt, 'i')

				filteredBoardGroups = filteredBoardGroups.map((group) =>
					regex.test(group.title)
						? group
						: {
								...group,
								tasks: group.tasks.filter((task) => regex.test(task.title)),
						  }
				).filter((group) => group.tasks.length > 0)
			}

			newState = {
				...state,
				board: { ...action.board, groups: filteredBoardGroups },
			}

			break

		case REMOVE_BOARD:
			const lastRemovedBoard = state.boards.find(
				(board) => board._id === action.boardId
			)
			boards = state.boards.filter((board) => board._id !== action.boardId)
			newState = { ...state, boards, lastRemovedBoard }
			break
		case ADD_BOARD:
			newState = { ...state, boards: [...state.boards, action.board] }
			break
		case UPDATE_BOARD:
			boards = state.boards.map((board) =>
				board._id === action.board._id ? action.board : board
			)
			newState = { ...state, boards }
			break
		case SET_SELECTED_TASKS:
			newState = { ...state, selectedTasks: action?.tasks || [] }
			break
		case SET_FILTER:
			newState = { ...state, filterBy: { ...action.filterBy } }

			break

		default:
			return state
	}
	return newState
}
