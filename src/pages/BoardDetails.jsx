import { useParams } from "react-router"
import { useEffect } from "react"
import { loadBoard } from "../store/actions/board.actions"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router"

export function BoardDetails(){

    const board = useSelector(storeState => storeState.boardModule.board)
    const { boardId } = useParams()
    const navigate = useNavigate()

    
    useEffect(() => {
        loadBoard(boardId)
    }, [])

    if(!board) return null
    return (
        <section className="board-details">
            <button onClick={() => navigate('/board')}>back</button>
            <pre>{JSON.stringify(board, null, 2)}</pre>
        </section>
    )
}