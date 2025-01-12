import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router"


export function TaskDetails(){

    const { boardId, taskId } = useParams()
    const navigate = useNavigate()

    // temp until service functions are fixed //
    const board = useSelector(storeState => storeState.boardModule.board)
    const [ task, setTask ] = useState(getTask(taskId))
    // temp until service functions are fixed //

    useEffect(() => {
        setTask(() => getTask(taskId))
    }, [taskId])

    // temp until service functions are fixed //
    function getTask(taskId){
            var taskToFind
            board.groups.forEach( group => {
                const task = group.tasks.find( task => task.id === taskId)
                if (task) taskToFind = task
            })
            return taskToFind
    }
    // temp until service functions are fixed //

    const isOpenClass = task ? 'open' : ''

    if (!isOpenClass) return null
    return (
        <section className={`task-details ${isOpenClass}`}>
            <h1>{task.id}</h1>
            <h1>{task.title}</h1>
            <h1>{task.priority}</h1>
            <h1>{task.status}</h1>

            <button onClick={() => navigate(`/board/${boardId}`)}>X</button>
        </section>
    )
}