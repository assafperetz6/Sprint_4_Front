const { DEV, VITE_LOCAL } = import.meta.env

import { getRandomColor, makeId } from '../../services/util.service.js'
import { userService } from '../user'

import { boardService as local } from './board.service.local'
import { boardService as remote } from './board.service.remote'

function getEmptyBoard() {
	const userImgURL = '../../assets/images/dapulse_default_photo.png'
	return {
		title: 'New board',
		isStarred: false,
		cmpsOrder: ['StatusPicker', 'MemberPicker', 'DatePicker', 'PriorityPicker'],
		createdBy: {
			_id: 'u101',
			fullname: 'Abi Abambi',
			imgUrl: `https://robohash.org/?set=set4`
		},

		members: [
			{
				_id: 'u101',
				fullname: 'Alon Wohl',
				imgUrl: 'https://robohash.org/alon?set=set4'
			},
			{
				_id: 'u102',
				fullname: 'Dror gaon',
				imgUrl: 'https://robohash.org/dror?set=set4'
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
						status: 'sl102',
						priority: 'pl103',
						dueDate: '2024-05-10',
						description: 'description',
						comments: [],
						members: [
							{
								_id: 'u101',
								fullname: 'Tal Tarablus',
								imgUrl: 'https://robohash.org/?set=set4'
							}
						]
					},
					{
						id: makeId(),
						title: 'item 2',
						status: 'sl101',
						priority: 'pl100',
						dueDate: '2024-09-24',
						description: 'description',
						comments: [],
						members: [
							{
								_id: 'u101',
								fullname: 'Tal Tarablus',
								imgUrl: 'https://robohash.org/?set=set4'
							}
						]
					}
				],
				style: { color: '#00c875' }
			},
			{
				id: makeId(),
				title: 'Group 2',
				tasks: [
					{
						id: makeId(),
						title: 'Item 1',
						status: 'sl102',
						priority: 'pl102',
						dueDate: '2024-05-10',
						description: 'description',
						comments: [],
						members: [
							{
								_id: 'u101',
								fullname: 'Tal Tarablus',
								imgUrl: ''
							}
						]
					},
					{
						id: makeId(),
						title: 'item 2',
						status: 'sl103',
						priority: 'pl101',
						dueDate: '2024-09-24',
						description: 'description',
						comments: [],
						members: [
							{
								_id: 'u101',
								fullname: 'Tal Tarablus',
								imgUrl: ''
							}
						]
					}
				],
				style: { color: '#66ccff' }
			}
		],
		activities: [],
		statusLabels: [
			{ id: 'sl100', title: 'Done', color: '#00C875' },
			{ id: 'sl101', title: 'Working on it', color: '#FDAB3D' },
			{ id: 'sl102', title: 'Stuck', color: '#E2445C' },
			{ id: 'sl103', title: 'Almost done', color: '#0086C0' },
			{ id: 'sl104', title: '', color: '#C4C4C4' }
		],
		priorityLabels: [
			{ id: 'pl100', title: 'Critical ⚠️', color: '#333333' },
			{ id: 'pl101', title: 'High', color: '#401694' },
			{ id: 'pl102', title: 'Medium', color: '#5559DF' },
			{ id: 'pl103', title: 'Low', color: '#579BFC' },
			{ id: 'pl104', title: '', color: '#C4C4C4' }
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
			style: { color: '#00c875' }
		},
		{
			id: makeId(),
			title: 'Group 2',
			tasks: [getDefaultTask()],
			style: { color: '#66ccff' }
		}
	]

	return groups
}
function getNewGroup() {
	return {
		id: makeId(),
		title: 'Group 1',
		tasks: [getDefaultTask()],
		style: { color: getRandomColor() }
	}
}

function getDefaultTask() {
	const task = {
		id: makeId(),
		title: 'Item 1',
		status: '',
		priority: 'pl103',
		dueDate: '2024-09-10',
		description: 'description',
		comments: [],
		members: [
			{
				_id: 'u101',
				fullname: 'Tal Tarablus',
				imgUrl: 'https://robohash.org/?set=set4'
			}
		]
	}

	return task
}
function getEmptyTask() {
	return {
		title: '',
		status: 'sl104',
		priority: 'pl104',
		comments: [],
		memberIds: [],
		dueDate: null,
		timeline: {
			startDate: null,
			endDate: null
		}
	}
}

const service = VITE_LOCAL === 'true' ? local : remote

export const boardService = { getEmptyBoard, getNewGroup, getDefaultFilter, getEmptyTask, ...service }

if (DEV) window.boardService = boardService
