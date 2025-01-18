import { useNavigate } from 'react-router-dom'
import { svgs } from "../services/svg.service";

export function BoardPreview({ board }){

    const navigate = useNavigate()

    return (
        <li onClick={() => navigate(`/board/${board._id}`)} className="board-preview">
            {svgs.boardImg}
            <h2>
                <span>{svgs.board} {board.title}</span>
                <button>{svgs.star}</button>
            </h2>
        </li>
    )
}