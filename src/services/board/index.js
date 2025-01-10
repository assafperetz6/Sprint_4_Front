const { DEV, VITE_LOCAL } = import.meta.env

import { makeId } from '../../services/util.service.js'
import { userService } from '../user'

import { boardService as local } from './board.service.local'
import { boardService as remote } from './board.service.remote'

function getEmptyBoard() {
	return {
		createdBy: userService.getLoggedinUser(),
		title: 'New board',
		groups: getDefaultGroups(),
		members: [],
		createdBy: userService.getLoggedinUser(),
	}
}

function getDefaultFilter() {
	return {
		txt: '',
	}
}

function getDefaultGroups() {
	const groups = [
		{
			id: makeId(),
			title: 'Group 1',
			tasks: [getDefaultTask()],
			style: {},
		},
		{
			id: makeId(),
			title: 'Group 2',
			tasks: [getDefaultTask()],
			style: {},
		},
	]

    return groups
}

function getDefaultTask() {
    const task = {
        id: makeId(),
        title: 'Task 1',
        status: '',
        priority: 'low',
        dueDate: '2024-09-10',
        description: 'description',
        comments: [],
        memberIds: ['u101'],
        labelIds: ['l101', 'l102'],
        byMember: {
            _id: 'u101',
            fullname: 'Tal Tarablus',
            imgUrl: '',
        },
        style: {
            backgroundColor: '#26de81',
        },
    }

    return task
}

const service = VITE_LOCAL === 'true' ? local : remote
export const boardService = { getEmptyBoard, getDefaultFilter, ...service }

if (DEV) window.boardService = boardService
