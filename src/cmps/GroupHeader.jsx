import { GroupTitle } from './GroupTitle'
import { TaskListHeader } from './TaskListHeader'

export function GroupHeader({ group, shadow }) {
	return (
		<div className="group-header-wrapper full">
			<GroupTitle group={group} />
			<TaskListHeader groupColor={group.style.color} tasks={group.tasks} shadow={shadow} isCollapsed={group.isCollapsed} />
		</div>
	)
}
