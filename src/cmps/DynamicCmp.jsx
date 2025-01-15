import { MemberPicker } from './dynamic-cmp/MemberPicker'
import { LabelPicker } from './dynamic-cmp/LabelPicker'

export function DynamicCmp({ cmp, task, groupId, defaultWidth }) {
	switch (cmp) {
		case 'StatusPicker':
		case 'PriorityPicker':
			return <LabelPicker cmp={cmp} task={task} groupId={groupId} defaultWidth={defaultWidth} />
		case 'MemberPicker':
			return <MemberPicker task={task} defaultWidth={defaultWidth} />
		default:
			return <p style={{ width: defaultWidth }}> {cmp}</p>
	}
}
