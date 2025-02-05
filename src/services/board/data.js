import { getRandomColor, getRandomTimestamp } from '../util.service'

// export const defaultBoard = [
//   {
//     _id: 'a12345',
//     title: 'Robot dev proj',
//     isStarred: false,
//     archivedAt: 1589983468418,
//     createdBy: {
//       _id: 'u101',
//       fullname: 'Alon Wohl',
//       imgUrl: 'https://res.cloudinary.com/dqfhbqcwv/image/upload/v1738491906/IMG_4602_bcxkfx.jpg'
//     },
//     style: {
//       backgroundImage: ''
//     },

//     members: [
//       {
//         _id: 'u101',
//         fullname: 'Alon Wohl',
//         imgUrl: 'https://res.cloudinary.com/dqfhbqcwv/image/upload/v1738491906/IMG_4602_bcxkfx.jpg'
//       },
//       {
//         _id: 'u102',
//         fullname: 'Dror gaon',
//         imgUrl: 'https://res.cloudinary.com/dqfhbqcwv/image/upload/v1738423038/amup7iyjt0htiedqb91c.jpg'
//       },
//       {
//         _id: 'u103',
//         fullname: 'Assaf Peretz',
//         imgUrl: 'https://res.cloudinary.com/dqfhbqcwv/image/upload/v1738492332/PHOTO-2025-02-02-12-30-47_pbbrwt.jpg'
//       }
//     ],
//     groups: [
//       {
//         id: 'g101',
//         title: 'Group 1',
//         archivedAt: 1589983468418,
//         isCollapsed: false,
//         tasks: [
//           {
//             id: 'c101',
//             title: 'Build a web app',
//             status: 'sl102',
//             priority: 'pl102',
//             dueDate: getRandomTimestamp(),
//             timeline: null,
//             description: 'description',
//             archivedAt: null,
//             comments: [],
//             members: [
//               {
//                 _id: 'u101',
//                 fullname: 'Alon Wohl',
//                 imgUrl: 'https://res.cloudinary.com/dqfhbqcwv/image/upload/v1738491906/IMG_4602_bcxkfx.jpg'
//               }
//             ]
//           },
//           {
//             id: 'c102',
//             title: 'Validate software behavior against business requirements',
//             status: 'sl101',
//             priority: 'pl100',
//             dueDate: getRandomTimestamp(),
//             timeline: null,
//             description: 'description',
//             archivedAt: null,
//             comments: [
//               {
//                 id: 'ZdPnm',
//                 text: 'also @yaronb please CR this',
//                 createdAt: 1590999817436,
//                 by: {
//                   _id: 'u101',
//                   fullname: 'Alon Wohl',
//                   imgUrl: 'https://res.cloudinary.com/dqfhbqcwv/image/upload/v1738491906/IMG_4602_bcxkfx.jpg'
//                 }
//               }
//             ],
//             members: [
//               {
//                 _id: 'u101',
//                 fullname: 'Alon Wohl',
//                 imgUrl: 'https://res.cloudinary.com/dqfhbqcwv/image/upload/v1738491906/IMG_4602_bcxkfx.jpg'
//               }
//             ]
//           }
//         ],
//         style: {
//           color: getRandomColor()
//         }
//       },
//       {
//         id: 'g102',
//         title: 'Group 2',
//         isCollapsed: false,
//         tasks: [
//           {
//             id: 'c103',
//             title: 'Build taskPreview',
//             status: 'sl100',
//             priority: 'pl103',
//             dueDate: getRandomTimestamp(),
//             timeline: null,
//             description: 'description',
//             archivedAt: null,
//             comments: [
//               {
//                 id: 'ZdfEm',
//                 text: 'also @yaronb please CR this',
//                 createdAt: 1590934517436,
//                 by: {
//                   _id: 'u102',
//                   fullname: 'Alon Wohl',
//                   imgUrl: 'https://res.cloudinary.com/dqfhbqcwv/image/upload/v1738491906/IMG_4602_bcxkfx.jpg'
//                 }
//               }
//             ],
//             members: [
//               {
//                 _id: 'u101',
//                 fullname: 'Alon Wohl',
//                 imgUrl: 'https://res.cloudinary.com/dqfhbqcwv/image/upload/v1738491906/IMG_4602_bcxkfx.jpg'
//               }
//             ]
//           },
//           {
//             id: 'c104',
//             title: 'Help me',
//             status: 'sl104',
//             priority: 'pl101',
//             dueDate: getRandomTimestamp(),
//             timeline: null,
//             description: 'description',
//             archivedAt: null,
//             comments: [
//               {
//                 id: 'ZdPnm',
//                 text: 'also @yaronb please CR this',
//                 createdAt: 1590999817436,
//                 by: {
//                   _id: 'u101',
//                   fullname: 'Alon Wohl',
//                   imgUrl: 'https://res.cloudinary.com/dqfhbqcwv/image/upload/v1738491906/IMG_4602_bcxkfx.jpg'
//                 }
//               }
//             ],
//             memberIds: ['u101'],
//             labelIds: ['l101', 'l102'],
//             members: [
//               {
//                 _id: 'u101',
//                 fullname: 'Alon Wohl',
//                 imgUrl: 'https://res.cloudinary.com/dqfhbqcwv/image/upload/v1738491906/IMG_4602_bcxkfx.jpg'
//               }
//             ]
//           }
//         ],
//         style: { color: getRandomColor() }
//       }
//     ],
//     statusLabels: [
//       { id: 'sl100', title: 'Done', color: '#00C875' },
//       { id: 'sl101', title: 'Working on it', color: '#FDAB3D' },
//       { id: 'sl102', title: 'Stuck', color: '#E2445C' },
//       { id: 'sl103', title: 'Almost done', color: '#0086C0' },
//       { id: 'sl104', title: '', color: '#C4C4C4' }
//     ],
//     priorityLabels: [
//       { id: 'pl100', title: 'Critical ⚠️', color: '#333333' },
//       { id: 'pl101', title: 'High', color: '#401694' },
//       { id: 'pl102', title: 'Medium', color: '#5559DF' },
//       { id: 'pl103', title: 'Low', color: '#579BFC' },
//       { id: 'pl104', title: '', color: '#C4C4C4' }
//     ],

//     activities: [],

//     // For Monday draggable columns (optional)
//     cmpsOrder: ['StatusPicker', 'MemberPicker', 'DatePicker', 'PriorityPicker', 'TimelinePicker']
//   }
// ]

export const defaultBoard = [
  {
    _id: 'b12345',
    title: 'Spotibly Development',
    isStarred: true,
    archivedAt: null,
    createdBy: {
      _id: 'u101',
      fullname: 'Alon Wohl',
      imgUrl: 'https://res.cloudinary.com/dqfhbqcwv/image/upload/v1738491906/IMG_4602_bcxkfx.jpg'
    },
    style: {
      backgroundImage: ''
    },
    members: [
      {
        _id: 'u101',
        fullname: 'Alon Wohl',
        imgUrl: 'https://res.cloudinary.com/dqfhbqcwv/image/upload/v1738491906/IMG_4602_bcxkfx.jpg'
      },
      {
        _id: 'u102',
        fullname: 'Dror gaon',
        imgUrl: 'https://res.cloudinary.com/dqfhbqcwv/image/upload/v1738423038/amup7iyjt0htiedqb91c.jpg'
      },
      {
        _id: 'u103',
        fullname: 'Assaf Peretz',
        imgUrl: 'https://res.cloudinary.com/dqfhbqcwv/image/upload/v1738492332/PHOTO-2025-02-02-12-30-47_pbbrwt.jpg'
      }
    ],
    groups: [
      {
        id: 'g101',
        title: 'Frontend Features',
        isCollapsed: false,
        tasks: [
          {
            id: 'c101',
            title: 'Implement user authentication flow',
            status: 'sl101',
            priority: 'pl102',
            dueDate: getRandomTimestamp(),
            timeline: null,
            description: 'Create login/signup forms with OAuth integration for social login',
            archivedAt: null,
            comments: [],
            members: [
              {
                _id: 'u101',
                fullname: 'Alon Wohl',
                imgUrl: 'https://res.cloudinary.com/dqfhbqcwv/image/upload/v1738491906/IMG_4602_bcxkfx.jpg'
              }
            ]
          },
          {
            id: 'c102',
            title: 'Design playlist management interface',
            status: 'sl100',
            priority: 'pl101',
            dueDate: getRandomTimestamp(),
            timeline: null,
            description: 'Build drag-and-drop interface for playlist management',
            archivedAt: null,
            comments: [],
            members: [
              {
                _id: 'u102',
                fullname: 'Dror gaon',
                imgUrl: 'https://res.cloudinary.com/dqfhbqcwv/image/upload/v1738423038/amup7iyjt0htiedqb91c.jpg'
              }
            ]
          }
        ],
        style: { color: getRandomColor() }
      },
      {
        id: 'g102',
        title: 'Backend Infrastructure',
        isCollapsed: false,
        tasks: [
          {
            id: 'c103',
            title: 'Set up streaming service architecture',
            status: 'sl102',
            priority: 'pl100',
            dueDate: getRandomTimestamp(),
            timeline: null,
            description: 'Implement efficient music streaming with proper caching',
            archivedAt: null,
            comments: [],
            members: [
              {
                _id: 'u103',
                fullname: 'Assaf Peretz',
                imgUrl: 'https://res.cloudinary.com/dqfhbqcwv/image/upload/v1738492332/PHOTO-2025-02-02-12-30-47_pbbrwt.jpg'
              }
            ]
          }
        ],
        style: { color: getRandomColor() }
      },
      {
        id: 'g103',
        title: 'Quality Assurance',
        isCollapsed: false,
        tasks: [
          {
            id: 'c104',
            title: 'Performance testing on streaming servers',
            status: 'sl101',
            priority: 'pl102',
            dueDate: getRandomTimestamp(),
            timeline: null,
            description: 'Conduct load testing and optimize streaming performance',
            archivedAt: null,
            comments: [],
            members: [
              {
                _id: 'u101',
                fullname: 'Alon Wohl',
                imgUrl: 'https://res.cloudinary.com/dqfhbqcwv/image/upload/v1738491906/IMG_4602_bcxkfx.jpg'
              },
              {
                _id: 'u103',
                fullname: 'Assaf Peretz',
                imgUrl: 'https://res.cloudinary.com/dqfhbqcwv/image/upload/v1738492332/PHOTO-2025-02-02-12-30-47_pbbrwt.jpg'
              }
            ]
          }
        ],
        style: { color: getRandomColor() }
      },
      {
        id: 'g104',
        title: 'Content & Licensing',
        isCollapsed: false,
        tasks: [
          {
            id: 'c105',
            title: 'Set up artist verification process',
            status: 'sl103',
            priority: 'pl101',
            dueDate: getRandomTimestamp(),
            timeline: null,
            description: 'Create verification workflow for artist accounts',
            archivedAt: null,
            comments: [],
            members: [
              {
                _id: 'u102',
                fullname: 'Dror gaon',
                imgUrl: 'https://res.cloudinary.com/dqfhbqcwv/image/upload/v1738423038/amup7iyjt0htiedqb91c.jpg'
              }
            ]
          }
        ],
        style: { color: getRandomColor() }
      },
      {
        id: 'g105',
        title: 'Marketing & Growth',
        isCollapsed: false,
        tasks: [
          {
            id: 'c106',
            title: 'Design social media campaign',
            status: 'sl101',
            priority: 'pl102',
            dueDate: getRandomTimestamp(),
            timeline: null,
            description: 'Create launch campaign for major social platforms',
            archivedAt: null,
            comments: [],
            members: [
              {
                _id: 'u102',
                fullname: 'Dror gaon',
                imgUrl: 'https://res.cloudinary.com/dqfhbqcwv/image/upload/v1738423038/amup7iyjt0htiedqb91c.jpg'
              }
            ]
          },
          {
            id: 'c107',
            title: 'Implement audio waveform visualization',
            status: 'sl101',
            priority: 'pl102',
            dueDate: getRandomTimestamp(),
            timeline: null,
            description: 'Create real-time waveform display for currently playing track',
            archivedAt: null,
            comments: [
              {
                id: 'ZdPnm1',
                text: 'We should use Web Audio API for this',
                createdAt: 1590999817436,
                by: {
                  _id: 'u103',
                  fullname: 'Assaf Peretz',
                  imgUrl: 'https://res.cloudinary.com/dqfhbqcwv/image/upload/v1738492332/PHOTO-2025-02-02-12-30-47_pbbrwt.jpg'
                }
              },
              {
                id: 'ZdPnm2',
                text: 'Agreed, I\'ll start researching performance implications',
                createdAt: 1590999827436,
                by: {
                  _id: 'u101',
                  fullname: 'Alon Wohl',
                  imgUrl: 'https://res.cloudinary.com/dqfhbqcwv/image/upload/v1738491906/IMG_4602_bcxkfx.jpg'
                }
              }
            ],
            members: [
              {
                _id: 'u101',
                fullname: 'Alon Wohl',
                imgUrl: 'https://res.cloudinary.com/dqfhbqcwv/image/upload/v1738491906/IMG_4602_bcxkfx.jpg'
              },
              {
                _id: 'u103',
                fullname: 'Assaf Peretz',
                imgUrl: 'https://res.cloudinary.com/dqfhbqcwv/image/upload/v1738492332/PHOTO-2025-02-02-12-30-47_pbbrwt.jpg'
              }
            ]
          }
        ],
        style: { color: getRandomColor() }
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
      { id: 'pl100', title: 'Critical ⚠️', color: '#333333' },
      { id: 'pl101', title: 'High', color: '#401694' },
      { id: 'pl102', title: 'Medium', color: '#5559DF' },
      { id: 'pl103', title: 'Low', color: '#579BFC' },
      { id: 'pl104', title: '', color: '#C4C4C4' }
    ],
    activities: [],
    cmpsOrder: ['StatusPicker', 'MemberPicker', 'DatePicker', 'PriorityPicker', 'TimelinePicker']
  }
]