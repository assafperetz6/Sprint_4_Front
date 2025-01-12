const { DEV, VITE_LOCAL } = import.meta.env

import { makeId } from '../../services/util.service.js'
import { userService } from '../user'

import { boardService as local } from './board.service.local'
import { boardService as remote } from './board.service.remote'

function getEmptyBoard() {
	const userImgURL = '../../assets/images/dapulse_default_photo.png'
	return {
		title: 'New board',
		isStarred: false,
		cmpsOrder: ['person', 'status', 'priority', 'timeline', 'people', 'date'],
		createdBy: {
			_id: 'u101',
			fullname: 'Abi Abambi',
			imgUrl: 'http://some-img'
		},
		style: {
			backgroundImage: ''
		},
		labels: [
			{
				id: 'l101',
				title: 'Done',
				color: '#61bd4f'
			},
			{
				id: 'l102',
				title: 'Progress',
				color: '#61bd33'
			}
		],
		members: [
			{
				_id: 'u101',
				fullname: 'Tal Taltal',
				imgUrl: userImgURL
			},
			{
				_id: 'u102',
				fullname: 'Josh Ga',
				imgUrl: userImgURL
			}
		],
		groups: [
			{
				id: makeId(),
				title: 'Group 1',
				tasks: [
					{
						id: makeId(),
						title: 'Item 1',
						status: 'Stuck',
						priority: 'medium',
						dueDate: '2024-05-10',
						description: 'description',
						comments: [],
						memberIds: ['u101'],
						labelIds: ['l101', 'l102'],
						byMember: {
							_id: 'u101',
							fullname: 'Tal Tarablus',
							imgUrl: ''
						},
						style: {
							backgroundColor: '#26de81'
						}
					},
					{
						id: makeId(),
						title: 'item 2',
						status: 'Overdue',
						priority: 'Critical',
						dueDate: '2024-09-24',
						description: 'description',
						comments: [],
						memberIds: ['u101'],
						labelIds: ['l101', 'l102'],
						byMember: {
							_id: 'u101',
							fullname: 'Tal Tarablus',
							imgUrl: ''
						},
						style: {
							backgroundColor: '#26de81'
						}
					}
				],
				style: { color: '#26de81' }
			},
			{
				id: makeId(),
				title: 'Group 2',
				tasks: [
					{
						id: makeId(),
						title: 'Item 1',
						status: 'Stuck',
						priority: 'medium',
						dueDate: '2024-05-10',
						description: 'description',
						comments: [],
						memberIds: ['u101'],
						labelIds: ['l101', 'l102'],
						byMember: {
							_id: 'u101',
							fullname: 'Tal Tarablus',
							imgUrl: ''
						},
						style: {
							backgroundColor: '#26de81'
						}
					},
					{
						id: makeId(),
						title: 'item 2',
						status: 'Overdue',
						priority: 'Critical',
						dueDate: '2024-09-24',
						description: 'description',
						comments: [],
						memberIds: ['u101'],
						labelIds: ['l101', 'l102'],
						byMember: {
							_id: 'u101',
							fullname: 'Tal Tarablus',
							imgUrl: ''
						},
						style: {
							backgroundColor: '#26de81'
						}
					}
				],
				style: { color: '#dede81' }
			}
		],
		activities: []
	}
}

function getDefaultFilter() {
	return {
		txt: ''
	}
}

function getDefaultGroups() {
	const groups = [
		{
			id: makeId(),
			title: 'Group 1',
			tasks: [getDefaultTask()],
			style: {}
		},
		{
			id: makeId(),
			title: 'Group 2',
			tasks: [getDefaultTask()],
			style: {}
		}
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
			imgUrl: ''
		},
		style: {
			backgroundColor: '#26de81'
		}
	}

	return task
}

const service = VITE_LOCAL === 'true' ? local : remote

export const boardService = { getEmptyBoard, getDefaultFilter, ...service }

if (DEV) window.boardService = boardService
