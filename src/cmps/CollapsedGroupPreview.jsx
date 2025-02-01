import { useEffect } from 'react'
import { hexToRgba } from '../services/util.service.js'
import { GroupSummary } from './GroupSummary.jsx'
import { GroupTitle } from './GroupTitle.jsx'
import { TaskListHeader } from './TaskListHeader.jsx'
import { svgs } from '../services/svg.service.jsx'
import { Draggable } from '@hello-pangea/dnd'

export function CollapsedGroupPreview({ group, cmpsOrder, idx }) {
	return (
		<>
			<section className="sticky-container">
				<div className="white-space"></div>
				<div
					className="colored-border"
					style={{ backgroundColor: hexToRgba(group.style.color, 1) }}
				></div>
				<GroupTitle group={group} />
			</section>
			<section className="summary-columns">
				<TaskListHeader
					groupColor={group.style.color}
					tasks={group.tasks}
					isCollapsed={true}
				/>
				<GroupSummary group={group} cmpsOrder={cmpsOrder} isCollapsed={true} />
			</section>
		</>
	)
}

export function CollapsedDraggedPreview({ group, idx }) {
	const taskCount = group.tasks.length

	return (
		<Draggable draggableId={group.id} index={idx}>
			{(provided) => (
				<section
					className="sticky-container"
					ref={provided.innerRef}
					{...provided.dragHandleProps}
				>
					{/* <div className="white-space"></div> */}
					<div
						className="colored-border"
						style={{ backgroundColor: hexToRgba(group.style.color, 1) }}
					></div>
					<span className="toggle-collapse">{svgs.arrowRight}</span>
					<div className="title-count-wrapper">
						<h4 className="group-title">{group.title}</h4>
						<span className="task-count">
							{taskCount < 1 ? 'No' : taskCount} Item{taskCount > 1 ? 's' : ''}
						</span>
					</div>
				</section>
			)}
		</Draggable>
	)
}
