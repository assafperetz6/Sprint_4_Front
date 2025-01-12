import { useEffect, useRef } from 'react'
import { svgs } from '../services/svg.service.jsx'

export function ContextMenu({ board, onClose, onRemoveBoard, onUpdateBoard, onRenameBoard }) {
	const menuRef = useRef()
        
	useEffect(() => {
		function handleClickOutside(ev) {            
			if (menuRef.current && !menuRef.current.contains(ev.target)) {
				onClose()            
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [onClose])

    // function toggleStarredBoard() {
    //     const currIsStarred = board.isStarred
    //     const boardToSave = { ...board, isStarred: !isStarred }
    //     onUpdateBoard(boardToSave)
        
    //     onClose()
    // }

	return (
		<section ref={menuRef} className="context-menu">
			<button>{svgs.openInNewTab} Open board</button>
			<button onClick={onRenameBoard}>{svgs.pencil} Rename</button>
			<button onClick={() => onUpdateBoard({ ...board, isStarred: !board.isStarred })}>{svgs.star} {`${board.isStarred ? 'Remove from' : 'Add to' } favorites`}</button>
			<button onClick={() => onRemoveBoard(board._id)}>{svgs.delete} Delete</button>
		</section>
	)
}
