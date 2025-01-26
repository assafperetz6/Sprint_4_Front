import { TaskList } from './TaskList'
import { GroupHeader } from './GroupHeader.jsx'
import { GroupSummary } from './GroupSummary.jsx'
import { Draggable } from '@hello-pangea/dnd'

export function GroupPreview({ group, cmpsOrder, idx, showHeader }) {
	return (
		<Draggable key={group.id} draggableId={group.id} index={idx}>
			{provided => (
				<section className="group-preview item-col full" {...provided.draggableProps} ref={provided.innerRef}>
					{showHeader && <GroupHeader group={group} provided={provided} dragHandleProps={provided.dragHandleProps} />}
					<TaskList group={group} />
					<GroupSummary group={group} cmpsOrder={cmpsOrder} />
					{provided.placeholder}
				</section>
			)}
		</Draggable>
	)
}
