import { MemberPicker } from './dynamic-cmp/MemberPicker'
import { LabelPicker } from './dynamic-cmp/LabelPicker'

export function DynamicCmp({ cmp, task, onUpdate, defaultWidth }) {
	switch (cmp) {
		case 'StatusPicker':
			return <LabelPicker task={task} onUpdate={onUpdate} defaultWidth={defaultWidth} />
		case 'MemberPicker':
			return <MemberPicker task={task} onUpdate={onUpdate} defaultWidth={defaultWidth} />
		default:
			return <p>UNKNOWN {cmp}</p>
	}
}
