import { useState } from 'react'
import { updateGroup } from '../store/actions/board.actions'
import { useSelector } from 'react-redux'
import { svgs } from '../services/svg.service'
import { HeaderInlineEdit } from './HeaderInlineEdit'

export function GroupTitle({ group }) {
	const board = useSelector(storeState => storeState.boardModule.board)
	const [activeMenuId, setActiveMenuId] = useState(null)

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

	return (
		<div className="group-header flex align-center full">
			<div className="context-btn-container">
				<button className={`group-context-menu ${activeMenuId === group.id ? 'open' : ''}`} onClick={ev => toggleContextMenu(ev, group.id)}>
					{svgs.threeDots}
				</button>
			</div>

			<div className="toggle-group-preview flex align-center justify-center">{svgs.arrowDown}</div>

			<HeaderInlineEdit value={group.title} onSave={handleSave} onStyleChange={handleStyleChange} style={group.style} className="group-title-container" />
		</div>
	)
}
