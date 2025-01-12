import { useEffect, useRef } from 'react'
import { svgs } from '../services/svg.service.jsx'

export function ContextMenu({ board, onClose, onRemoveBoard, onUpdateBoard }) {
	const menuRef = useRef()
    
    console.log(board)
    
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

    function toggleStarredBoard() {
        const currIsStarred = board.isStarred
        const boardToSave = { ...board, isStarred: !currIsStarred }
        onUpdateBoard(boardToSave)
        
        onClose()
    }

	return (
		<section ref={menuRef} className="context-menu">
			<button>{svgs.openInNewTab} Open board</button>
			<button>{svgs.pencil} Rename</button>
			<button onClick={toggleStarredBoard}>{svgs.star} Add to favorites</button>
			<button onClick={() => onRemoveBoard(board._id)}>{svgs.delete} Delete</button>
		</section>
	)
}
