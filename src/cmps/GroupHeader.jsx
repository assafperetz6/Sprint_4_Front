import { GroupTitle } from './GroupTitle'
import { TaskListHeader } from './TaskListHeader'

export function GroupHeader({ group, shadow, dragHandleProps }) {
  return (
    <div className="group-header-wrapper full" {...dragHandleProps}>
      <GroupTitle group={group} dragHandleProps={dragHandleProps} />
      <TaskListHeader groupColor={group.style.color} tasks={group.tasks} shadow={shadow} isCollapsed={group.isCollapsed} />
    </div>
  )
}
