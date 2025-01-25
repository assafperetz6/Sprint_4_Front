import { useEffect, useRef, useState } from 'react'
import { removeGroup, updateGroup } from '../store/actions/board.actions'
import { useSelector } from 'react-redux'
import { svgs } from '../services/svg.service'
import { HeaderInlineEdit } from './HeaderInlineEdit'
import { ContextMenu } from './ContextMenu'
import { showErrorMsg } from '../services/event-bus.service'

export function GroupTitle({ group }) {
	const board = useSelector(storeState => storeState.boardModule.board)

	const [activeMenuId, setActiveMenuId] = useState(null)
	const buttonRef = useRef()

	function toggleContextMenu(ev, taskId) {
		setActiveMenuId(prev => (prev === taskId ? null : taskId))
	}

	async function handleSave(newTitle) {
		try {
			const groupToSave = { ...group, title: newTitle }
			await updateGroup(board._id, groupToSave)
		} catch (err) {
			console.error('Failed to update group title:', err)
		}
	}

	async function handleStyleChange(newStyle) {
		try {
			const groupToSave = { ...group, style: newStyle }
			await updateGroup(board._id, groupToSave)
		} catch (err) {
			console.error('Failed to update group style:', err)
		}
	}

	async function onRemoveGroup(groupId) {
		try {
			removeGroup(board._id, groupId)
		} catch (err) {
			console.log('cannot remove group')
			showErrorMsg('cannot remove group')
		}
	}
	function getTasksCount(tasksCount) {
		if (!tasksCount) return 'No Items'
		if (tasksCount === 1) return tasksCount + ' Item'
		return tasksCount + ' Items'
	}

	return (
		<div className="group-header flex align-center full">
			<div className="context-btn-container">
				<button className={`group-context-menu ${activeMenuId === group.id ? 'open' : ''}`} onClick={ev => toggleContextMenu(ev, group.id)} ref={buttonRef}>
					{svgs.threeDots}
				</button>

				{activeMenuId === group.id && <ContextMenu type="group" entity={group} onClose={() => setActiveMenuId(null)} onRemove={onRemoveGroup} onUpdate={handleStyleChange} onRename={() => null} referenceElement={buttonRef.current} />}
			</div>

			<div className="toggle-group-preview flex align-center justify-center" style={{ color: group.style.color }}>
				{svgs.arrowDown}
			</div>
			<HeaderInlineEdit entity={group} onSave={handleSave} onStyleChange={handleStyleChange} style={group.style} className="group-title-container" />

			<div className="title-count flex align-center justify-center">{getTasksCount(group.tasks.length)}</div>
		</div>
	)
}
