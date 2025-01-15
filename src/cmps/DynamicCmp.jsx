import { MemberPicker } from './dynamic-cmp/MemberPicker'
import { LabelPicker } from './dynamic-cmp/LabelPicker'

export function DynamicCmp({ cmp, task, groupId }) {
	let cmpDefaultWidth

	switch (cmp) {
		case 'StatusPicker':
		case 'PriorityPicker':
			cmpDefaultWidth = '140px'
			return <LabelPicker cmp={cmp} task={task} groupId={groupId} defaultWidth={cmpDefaultWidth} />
		case 'MemberPicker':
			cmpDefaultWidth = '97px'
			return <MemberPicker task={task} defaultWidth={cmpDefaultWidth} />
		case 'DatePicker':
			cmpDefaultWidth = '140px'
			return (
				<span className="flex align-center justify-center" style={{ width: cmpDefaultWidth }}>
					{task.dueDate}
				</span>
			)
		default:
			return <p style={{ width: '140px' }}> {}</p>
	}
}
