const { DEV, VITE_LOCAL } = import.meta.env

import { userService } from '../user'

import { boardService as local } from './board.service.local'
import { boardService as remote } from './board.service.remote'

function getEmptyBoard() {
	return {
            createdBy: userService.getLoggedinUser(),
            title: '',
            groups: [],
            members: [],
            createdBy: userService.getLoggedinUser()
	}
}

function getDefaultFilter() {
    return {
        txt: '',
    }
}

const service = VITE_LOCAL === 'true' ? local : remote
export const boardService = { getEmptyBoard, getDefaultFilter, ...service }

if (DEV) window.boardService = boardService
