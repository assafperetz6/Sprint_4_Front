import { useNavigate } from 'react-router-dom'
import { svgs } from "../services/svg.service";
import { updateBoard } from '../store/actions/board.actions';
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service';

export function BoardPreview({ board }){

    const navigate = useNavigate()

    async function toggleFavorite(ev) {
        ev.stopPropagation()
        try {
            await updateBoard({ ...board, isStarred: board.isStarred = !board.isStarred})
            showSuccessMsg(board.isStarred ? 'Added board to favorites!' : 'Removed board to favorites!')
        } catch (err) {
            showErrorMsg('Failed to add/remove board to favorites')
            console.log('Failed to add/remove board to favorites')
        }
    }

    return (
        <li onClick={() => navigate(`/board/${board._id}`)} className="board-preview">
            {svgs.boardImg}
            <h2>
                <span>{svgs.board} {board.title}</span>
                <button onClick={ev => toggleFavorite(ev)}>{board.isStarred ? svgs.goldenStar : svgs.star}</button>
            </h2>
        </li>
    )
}