import { TaskList } from './TaskList'
import { GroupHeader } from './GroupHeader.jsx'
import { GroupSummary } from './GroupSummary.jsx'
import { Draggable } from '@hello-pangea/dnd'
import { CollapsedGroupPreview } from './CollapsedGroupPreview.jsx'

export function GroupPreview({ group, cmpsOrder, idx, showHeader, isAllCollapsed, setIsAllCollapsed, isDragging }) {
  if (isAllCollapsed || group.isCollapsed) {
    return (
      <Draggable key={group.id} draggableId={group.id} index={idx}>
        {(provided) => {
          provided.draggableProps.style = {
            ...provided.draggableProps.style,
            // position: 'sticky',
            height: '60px'
          }

          return (
            <section className="collapsed-group-preview full" {...provided.draggableProps} ref={provided.innerRef} {...provided.dragHandleProps}>
              <CollapsedGroupPreview group={group} cmpsOrder={cmpsOrder} idx={idx} dragHandleProps={provided.dragHandleProps} />
            </section>
          )
        }}
      </Draggable>
    )
  }
  return (
    <Draggable key={group.id} draggableId={group.id} index={idx}>
      {(provided) => {
        provided.draggableProps.style = {
          ...provided.draggableProps.style,
          //   position: 'sticky',
          height: 'unset'
        }
        return (
          <section className="group-preview item-col full" {...provided.draggableProps} ref={provided.innerRef} {...provided.dragHandleProps}>
            {showHeader && <GroupHeader group={group} />}
            <TaskList group={group} />
            <GroupSummary group={group} cmpsOrder={cmpsOrder} />
            {provided.placeholder}
          </section>
        )
      }}
    </Draggable>
  )
}
