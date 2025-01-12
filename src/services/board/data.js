import userImg from '../../assets/images/dapulse_default_photo.png'

export const defaultBoard = [
	{
		_id: 'a12345',
		title: 'Robot dev proj',
		isStarred: false,
		archivedAt: 1589983468418,
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
				imgUrl: userImg
			},
			{
				_id: 'u102',
				fullname: 'Josh Ga',
				imgUrl: userImg
			}
		],
		groups: [
			{
				id: 'g101',
				title: 'Group 1',
				archivedAt: 1589983468418,
				tasks: [
					{
						id: 'c101',
						title: 'Build a web app',
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
						id: 'c102',
						title: 'Validate software behavior against business requirements',
						status: 'Overdue',
						priority: 'Critical',
						dueDate: '2024-09-24',
						description: 'description',
						comments: [
							{
								id: 'ZdPnm',
								title: 'also @yaronb please CR this',
								createdAt: 1590999817436,
								byMember: {
									_id: 'u101',
									fullname: 'Tal Tarablus',
									imgUrl: ''
								}
							}
						],
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
				style: {
					color: '#26de81'
				}
			},
			{
				id: 'g102',
				title: 'Group 2',
				tasks: [
					{
						id: 'c103',
						title: 'Build taskPreview',
						status: 'Done',
						priority: 'low',
						dueDate: '2024-09-10',
						description: 'description',
						comments: [
							{
								id: 'ZdfEm',
								title: 'also @yaronb please CR this',
								createdAt: 1590934517436,
								byMember: {
									_id: 'u102',
									fullname: 'Tal Tarablus',
									imgUrl: ''
								}
							}
						],
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
						id: 'c104',
						title: 'Help me',
						status: 'inProgress',
						priority: 'high',
						dueDate: '2024-09-24',
						description: 'description',
						comments: [
							{
								id: 'ZdPnm',
								title: 'also @yaronb please CR this',
								createdAt: 1590999817436,
								byMember: {
									_id: 'u101',
									fullname: 'Tal Tarablus',
									imgUrl: ''
								}
							}
						],
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
			}
		],
		activities: [
			{
				id: 'a101',
				title: 'Changed Color',
				createdAt: 154514,
				byMember: {
					_id: 'u101',
					fullname: 'Abi Abambi',
					imgUrl: 'http://some-img'
				},
				group: {
					id: 'g101',
					title: 'Urgent Stuff'
				},
				task: {
					id: 'c101',
					title: 'Replace Logo'
				}
			}
		],

		// For Monday draggable columns (optional)
		cmpsOrder: ['person', 'status', 'priority', 'timeline', 'people', 'date']
	}
]
