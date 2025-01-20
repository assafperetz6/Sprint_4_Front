import { MemberPicker } from './dynamic-cmp/MemberPicker'
import { LabelPicker } from './dynamic-cmp/LabelPicker'
import { DatePicker } from './dynamic-cmp/DatePicker'
import { TimelinePicker } from './dynamic-cmp/TImelinePicker'

export function DynamicCmp({ cmp, task, group }) {
	let cmpDefaultWidth

	switch (cmp) {
		case 'StatusPicker':
		case 'PriorityPicker':
			cmpDefaultWidth = '140px'
			return <LabelPicker cmp={cmp} task={task} groupId={group.id} defaultWidth={cmpDefaultWidth} />
		case 'MemberPicker':
			cmpDefaultWidth = '97px'
			return <MemberPicker task={task} cmp={cmp} groupId={group.id} defaultWidth={cmpDefaultWidth} />
		case 'DatePicker':
			cmpDefaultWidth = '140px'
			return <DatePicker cmp={cmp} task={task} groupId={group.id} defaultWidth={cmpDefaultWidth} />
		case 'TimelinePicker':
			cmpDefaultWidth = '140px'
			return <TimelinePicker cmp={cmp} task={task} group={group} defaultWidth={cmpDefaultWidth} />

		default:
			return <p style={{ width: '140px' }}> {}</p>
	}
}
