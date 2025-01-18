import { TaskListHeader } from './TaskListHeader'
import { TaskList } from './TaskList'
import { useSelector } from 'react-redux'
import { removeGroup } from '../store/actions/board.actions'
import { showErrorMsg } from '../services/event-bus.service'
import { GroupTitle } from './GroupTitle'

export function GroupPreview({ group }) {
	const board = useSelector(storeState => storeState.boardModule.board)

	async function onRemoveGroup(groupId) {
		try {
			removeGroup(board._id, groupId)
		} catch (err) {
			console.log('cannot remove group')
			showErrorMsg('cannot remove group')
		}
	}

	return (
		<section className="group-preview item-col full">
			<GroupTitle group={group} />
			<TaskListHeader group={group} tasks={group.tasks} />
			<TaskList group={group} />
		</section>
	)
}

{
	/* <TaskListHeader group={group} colWidth={colWidth} />
<TaskList group={group} colWidth={colWidth} /> */
}

// PREVIOUS GROUP-PREVIEW:

{
	{
		/* <section className="group-preview">
<div className="group-container">
	<div className="header-container">
		<div className="group-header">
			<div className="group-title-container" style={{ color: group.style.color }} onClick={startEditing}>
				{isEditing ? (
					<div className={`renaming-wrapper flex align-center ${isEditing ? 'editing' : ''}`} onClick={e => e.stopPropagation()}>
						<button ref={setReferenceElement} onClick={openColorPicker} style={{ backgroundColor: group.style.color }} className="group-color-picker" />
						<input className="group-title-input" type="text" onChange={handleChange} onKeyDown={handleKeyPressed} value={titleToEdit} name="title" id="groupTitle" autoFocus />
						{isColorPickerOpen && (
							<div ref={setPopperElement} className="popper-container" style={styles.popper} {...attributes.popper}>
								<div ref={setArrowElement} style={styles.arrow} className="popper-arrow" />
								<ColorPicker setEntityStyle={setGroupStyle} setIsColorPickerOpen={setIsColorPickerOpen} />
							</div>
						)}
					</div>
				) : (
					<h4 className="group-title">{group.title}</h4>
				)}
			</div>
		</div>
	</div>
	<button className="delete-btn" onClick={() => onRemoveGroup(group.id)}>
		{svgs.delete}
	</button>
	<TaskListHeader group={group} tasks={group.tasks} colWidth={colWidth} />
</div>
<TaskList group={group} colWidth={colWidth} />
</section>  */
	}
}
