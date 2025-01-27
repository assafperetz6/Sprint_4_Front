import { hexToRgba } from '../services/util.service.js'
import { GroupSummary } from './GroupSummary.jsx'
import { GroupTitle } from './GroupTitle.jsx'
import { TaskListHeader } from './TaskListHeader.jsx'

export function CollapsedGroupPreview({ group, cmpsOrder }) {
	return (
		<section className="collapsed-group-preview full">
			<section className="sticky-container">
				<div className="white-space"></div>
				<div
					className="colored-border"
					style={{ backgroundColor: hexToRgba(group.style.color, 1) }}
				></div>
				<GroupTitle group={group} isCollapsed={true} />
			</section>
			<section className="summary-columns">
				<TaskListHeader groupColor={group.style.color} tasks={group.tasks} isCollapsed={true} />
				<GroupSummary group={group} cmpsOrder={cmpsOrder} isCollapsed={true} />

			</section>
		</section>
	)
}