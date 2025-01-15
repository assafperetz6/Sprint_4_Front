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
						status: 'sl102',
						priority: 'medium',
						dueDate: '2024-05-10',
						description: 'description',
						comments: [],
						memberIds: ['u101'],
						labelIds: ['l101', 'l102'],
						byMember: {
							_id: 'u101',
							fullname: 'Alon Wohl',
							imgUrl: 'https://res.cloudinary.com/dqfhbqcwv/image/upload/v1736340217/niykjaqgf80eloral0yl.heic'
						},
						style: {
							backgroundColor: '#26de81'
						}
					},
					{
						id: 'c102',
						title: 'Validate software behavior against business requirements',
						status: 'sl101',
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
									fullname: 'Alon Wohl',
									imgUrl: 'https://res.cloudinary.com/dqfhbqcwv/image/upload/v1736340217/niykjaqgf80eloral0yl.heic'
								}
							}
						],
						memberIds: ['u101'],
						byMember: {
							_id: 'u101',
							fullname: 'Alon Wohl',
							imgUrl: 'https://res.cloudinary.com/dqfhbqcwv/image/upload/v1736340217/niykjaqgf80eloral0yl.heic'
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
						status: 'sl100',
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
									fullname: 'Alon Wohl',
									imgUrl: 'https://res.cloudinary.com/dqfhbqcwv/image/upload/v1736340217/niykjaqgf80eloral0yl.heic'
								}
							}
						],
						memberIds: ['u101'],
						labelIds: ['l101', 'l102'],
						byMember: {
							_id: 'u101',
							fullname: 'Alon Wohl',
							imgUrl: 'https://res.cloudinary.com/dqfhbqcwv/image/upload/v1736340217/niykjaqgf80eloral0yl.heic'
						},
						style: {
							backgroundColor: '#26de81'
						}
					},
					{
						id: 'c104',
						title: 'Help me',
						status: 'sl104',
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
									fullname: 'Alon Wohl',
									imgUrl: 'https://res.cloudinary.com/dqfhbqcwv/image/upload/v1736340217/niykjaqgf80eloral0yl.heic'
								}
							}
						],
						memberIds: ['u101'],
						labelIds: ['l101', 'l102'],
						byMember: {
							_id: 'u101',
							fullname: 'Alon Wohl',
							imgUrl: 'https://res.cloudinary.com/dqfhbqcwv/image/upload/v1736340217/niykjaqgf80eloral0yl.heic'
						},
						style: {
							backgroundColor: '#26de81'
						}
					}
				],
				style: { color: '#26de81' }
			}
		],
		statusLabels: [
			{ id: 'sl100', title: 'Done', color: '#00C875' },
			{ id: 'sl101', title: 'Working on it', color: '#FDAB3D' },
			{ id: 'sl102', title: 'Stuck', color: '#E2445C' },
			{ id: 'sl103', title: 'Almost done', color: '#0086C0' },
			{ id: 'sl104', title: '', color: '#C4C4C4' }
		],
		priorityLabels: [
			{ id: 'pl100', title: 'Critical', color: '#333333' },
			{ id: 'pl101', title: 'High', color: '#401694' },
			{ id: 'pl102', title: 'Medium', color: '#5559DF' },
			{ id: 'pl103', title: 'Low', color: '#579BFC' },
			{ id: 'pl104', title: '', color: '#C4C4C4' }
		],
		activities: [],
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
		cmpsOrder: ['StatusPicker', 'MemberPicker', 'DatePicker', 'PriorityPicker']
	}
]
