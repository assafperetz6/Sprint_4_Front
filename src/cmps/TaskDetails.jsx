import { useEffect, useState } from "react"
import { useNavigate, useOutletContext, useParams } from "react-router"
import { boardService } from "../services/board"

export function TaskDetails() {
    
    const { boardId, taskId } = useParams()
    const [task, setTask] = useState(null)
    const { isClosing, closeTaskDetails } = useOutletContext()

    useEffect(() => {
        getTask(boardId, taskId)
    }, [taskId])

    async function getTask(boardId, taskId) {
        const task = await boardService.getTaskById(boardId, taskId)
        setTask(task)
    }

    const animationClass = isClosing ? 'closing' : task ? 'open' : ''

    return (
        <section className={`task-details ${animationClass}`}>
            {task ? (
                <>
                    <h1>{task.id}</h1>
                    <h1>{task.title}</h1>
                    <h1>{task.priority}</h1>
                    <h1>{task.status}</h1>
                </>
            ) : null}

            <button onClick={closeTaskDetails}>X</button>
        </section>
    )
}
