import { useEffect, useRef, useState } from 'react'
import { usePopper } from 'react-popper'
import { svgs } from '../services/svg.service.jsx'

export function ContextMenu({ type = 'board', entity, onClose, onRemove, onUpdate, onMoveTo, onRename, referenceElement }) {
	const [popperElement, setPopperElement] = useState(null)
	const [arrowElement, setArrowElement] = useState(null)

	const { styles, attributes } = usePopper(referenceElement, popperElement, {
		modifiers: [
			{ name: 'arrow', options: { element: arrowElement } },
			{
				name: 'offset',
				options: {
					offset: [-8, 4]
				}
			},
			{
				name: 'preventOverflow',
				options: {
					padding: 8,
					boundary: 'viewport'
				}
			}
		],
		placement: 'bottom-start'
	})
	useEffect(() => {
		function handleClickOutside(ev) {
			if (popperElement && !popperElement.contains(ev.target) && referenceElement && !referenceElement.contains(ev.target)) {
				onClose()
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [onClose, popperElement, referenceElement])

	const menuItems = {
		board: [
			{ icon: svgs.openInNewTab, text: 'Open board', action: null },
			{ icon: svgs.pencil, text: 'Rename', action: () => onRename(entity) },
			{
				icon: svgs.star,
				text: `${entity.isStarred ? 'Remove from' : 'Add to'} favorites`,
				action: () => onUpdate({ ...entity, isStarred: !entity.isStarred })
			},
			{ icon: svgs.delete, text: 'Delete', action: () => onRemove(entity._id) }
		],
		group: [
			// { icon: svgs.pencil, text: 'Rename group', action: () => onRename(entity) },
			{ icon: svgs.delete, text: 'Delete group', action: () => onRemove(entity.id) }
		],
		task: [
			// { icon: svgs.pencil, text: 'Edit task', action: () => onRename(entity.id) },
			{ icon: svgs.delete, text: 'Delete task', action: () => onRemove(entity.id) },
			{ icon: svgs.archive, text: 'Archive', action: () => onUpdate( Date.now(), 'archivedAt') },
			{ icon: svgs.arrowRightAlt, text: 'Move to', action: () => onMoveTo('g102') },
		]
	}

	const currentMenuItems = menuItems[type] || []

	return (
		<div ref={setPopperElement} className="popper-container" style={styles.popper} {...attributes.popper}>
			<div ref={setArrowElement} style={styles.arrow} className="popper-arrow" />
			<section className="context-menu">
				{currentMenuItems.map((item, index) => (
					<button
						key={index}
						onClick={() => {
							if (item.action) {
								item.action()
								onClose()
							}
						}}
						disabled={!item.action}
					>
						{item.icon} {item.text}
					</button>
				))}
			</section>
		</div>
	)
}
