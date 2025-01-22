import { TaskList } from './TaskList'
import { GroupHeader } from './GroupHeader.jsx'

export function GroupPreview({ group }) {
	return (
		<section className="group-preview item-col full">
			<GroupHeader group={group} />
			<TaskList group={group} />
		</section>
	)
}
