import { hexToRgba } from '../services/util.service.js'
import { GroupSummary } from './GroupSummary.jsx'
import { GroupTitle } from './GroupTitle.jsx'
import { TaskListHeader } from './TaskListHeader.jsx'

export function CollapsedGroupPreview({ group, cmpsOrder }) {
	return (
		<section className="collapsed-group-preview">
			<div
				className="white-space"
				style={{ height: '60px', width: '40px' }}
			></div>

			<div
				className="colored-border"
				style={{ backgroundColor: hexToRgba(group.style.color, 1) }}
			></div>

			<GroupTitle group={group} collapsedPreview={true} />
			<section className="summary-columns">
				<TaskListHeader groupColor={group.style.color} tasks={group.tasks} collapsedPreview={true} />
				<GroupSummary group={group} cmpsOrder={cmpsOrder} collapsedPreview={true} />

			</section>
		</section>
	)
}