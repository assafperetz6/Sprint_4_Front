import { useState } from "react"
import { TaskListHeader } from "./TaskListHeader"

export function GroupStickyContainer({ group }) {
	const [isEditing, setIsEditing] = useState(false)
	const [colWidth, setColwidth] = useState('150px')

	return (
		<li className="group-sticky-container">
			<div className="header-container" role="input" onClick={() => setIsEditing(prev => !prev)}>
				<div className="group-header">
					<div className="group-title-container">
						{isEditing ? (
							<input className="group-title-input" type="text" onChange={handleChange} onBlur={setGroupTitle} onKeyDown={handleKeyPressed} value={titleToEdit} name="title" id="groupTitle" autoFocus />
						) : (
							<h4 style={{ color: group.style.color }} className="group-title">
								{group.title}
							</h4>
						)}
					</div>
				</div>
			</div>
			<TaskListHeader group={group} tasks={group.tasks} colWidth={colWidth} />
		</li>
	)
}