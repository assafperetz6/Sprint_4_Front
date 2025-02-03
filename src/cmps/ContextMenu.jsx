import { useEffect, useRef, useState } from 'react'
import { usePopper } from 'react-popper'
import { svgs } from '../services/svg.service.jsx'
import { useSelector } from 'react-redux'
import { hexToRgba } from '../services/util.service.js'

export function ContextMenu({ type = 'board', entity, onClose, onRemove, onUpdate, onMoveTo, onRename, referenceElement }) {
  const board = useSelector((storeState) => storeState.boardModule.board)
  const [popperElement, setPopperElement] = useState(null)
  const [arrowElement, setArrowElement] = useState(null)
  const [openGroupList, setOpenGroupList] = useState(false)

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [
      { name: 'arrow', options: { element: arrowElement } },
      {
        name: 'offset',
        options: {
          offset: type === 'board' ? [40, -25] : [0, 4]
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
      {
        icon: svgs.delete,
        text: 'Delete group',
        action: () => onRemove(entity.id)
      }
    ],
    task: [
      // { icon: svgs.pencil, text: 'Edit task', action: () => onRename(entity.id) },
      {
        icon: svgs.delete,
        text: 'Delete task',
        action: () => onRemove()
      },
      {
        icon: svgs.archive,
        text: 'Archive',
        action: () => onUpdate(Date.now(), 'archivedAt')
      },
      {
        icon: svgs.arrowRightAlt,
        text: 'Move to',
        action: () => setOpenGroupList(true)
      }
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
                // onClose()
              }
            }}
            disabled={!item.action}>
            {item.icon} {item.text}
          </button>
        ))}
      </section>
      {openGroupList && (
        <ul className="secondary context-menu">
          {board.groups
            .filter((group) => !group.tasks.find((t) => t.id === entity.id))
            .map((group) => (
              <li key={group.id}>
                <button onClick={() => onMoveTo(group.id)}>
                  <span className="color-indicator" style={{ backgroundColor: hexToRgba(group.style.color, 1) }}></span>
                  {group.title}
                </button>
              </li>
            ))}
        </ul>
      )}
    </div>
  )
}
