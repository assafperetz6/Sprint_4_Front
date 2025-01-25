import { TaskList } from './TaskList'
import { GroupHeader } from './GroupHeader.jsx'
import { GroupSummary } from './GroupSummary.jsx'

export function GroupPreview({ group, cmpsOrder }) {
	return (
		<>
			<GroupHeader group={group} />
			<TaskList group={group} />
			<GroupSummary group={group} cmpsOrder={cmpsOrder} />
		</>
	)
}
