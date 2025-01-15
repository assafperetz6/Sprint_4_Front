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
		cmpsOrder: ['StatusPicker', 'MemberPicker', 'DatePicker', 'PriorityPicker'],
		createdBy: {
			_id: 'u101',
			fullname: 'Abi Abambi',
			imgUrl: 'http://some-img'
		},
		style: {
			backgroundImage: ''
		},

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
						status: 'sl102',
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
						}
					},
					{
						id: makeId(),
						title: 'item 2',
						status: 'sl101',
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
						status: 'sl102',
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
						}
					},
					{
						id: makeId(),
						title: 'item 2',
						status: 'sl103',
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
						}
					}
				],
				style: { color: '#dede81' }
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
			style: { color: '#dede81' }
		},
		{
			id: makeId(),
			title: 'Group 2',
			tasks: [getDefaultTask()],
			style: { color: '#26de81' }
		}
	]

	return groups
}
function getNewGroup() {
	return {
		id: makeId(),
		title: 'Group 1',
		tasks: [getDefaultTask()],
		style: { color: '#dede81' }
	}
}

function getDefaultTask() {
	const task = {
		id: makeId(),
		title: 'Item 1',
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
