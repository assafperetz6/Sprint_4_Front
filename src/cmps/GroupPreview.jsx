import { TaskList } from './TaskList'
import { GroupHeader } from './GroupHeader.jsx'
import { GroupSummary } from './GroupSummary.jsx'
import { Draggable } from '@hello-pangea/dnd'
import { CollapsedGroupPreview } from './CollapsedGroupPreview.jsx'

export function GroupPreview({ group, cmpsOrder, idx, showHeader, isAllCollapsed }) {
  if (isAllCollapsed || group.isCollapsed) return <CollapsedGroupPreview group={group} cmpsOrder={cmpsOrder} idx={idx} />
  return (
    <Draggable key={group.id} draggableId={group.id} index={idx}>
      {(provided) => (
        <section className="group-preview item-col full" {...provided.draggableProps} ref={provided.innerRef} {...provided.dragHandleProps}>
          {showHeader && <GroupHeader group={group} />}
          <TaskList group={group} />
          <GroupSummary group={group} cmpsOrder={cmpsOrder} />
          {provided.placeholder}
        </section>
      )}
    </Draggable>
  )
}
