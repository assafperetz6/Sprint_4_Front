import { Link, useParams } from 'react-router-dom'
import { svgs } from '../services/svg.service'
import { hexToRgba } from '../services/util.service'

import { useDispatch, useSelector } from 'react-redux'
import { DynamicCmp } from './DynamicCmp'
import { updateBoard } from '../store/actions/board.actions'
import { SET_BOARD } from '../store/reducers/board.reducer'
import { boardService } from '../services/board'

export function TaskPreview({ group, task, colWidth }) {

	const dispatch = useDispatch()
	const board = useSelector(storeState => storeState.boardModule.board)
	const { boardId } = useParams()

	async function handleUpdate(cmp, data) {
		try {
			const updatedBoard = { ...board }

			updatedBoard.groups = board.groups.map(g => {
				if (g.id !== group.id) return g
				return {
					...g,
					tasks: g.tasks.map(t => {
						if (t.id !== task.id) return t

						const updatedTask = { ...t }
						switch (cmp) {
							case 'StatusPicker':
								updatedTask.status = data
								break
							case 'MemberPicker':
								updatedTask.memberIds = Array.isArray(data) ? data : [data]
								break
							case 'DatePicker':
								updatedTask.dueDate = data
								break
							case 'PriorityPicker':
								updatedTask.priority = data
								break
						}
						return updatedTask
					})
				}
			})

			const activity = {
				id: 'a' + Date.now(),
				type: 'Updated Task',
				taskId: task.id,
				groupId: group.id,
				component: cmp,
				timestamp: Date.now()
			}

			updatedBoard.activities = [activity, ...(updatedBoard.activities || [])]

			const newBoard = await updateBoard(updatedBoard)
			dispatch({ type: SET_BOARD, board: newBoard })
		} catch (err) {
			console.error('Failed to update board:', err)
		}
	}

	async function deleteTask(taskId){
		try {
			const savedBoard = await boardService.removeTask(boardId, taskId)
			dispatch({ type: SET_BOARD, board: savedBoard})
		} catch (err) {
			throw err
		}
	}

	return (
		<ul className="task-preview task-row flex">
			<div className="main-preview-container">
				<div className="colored-border" style={{ backgroundColor: hexToRgba(group.style.color, 1) }}></div>

				<li className="check-box">
					<input type="checkbox" />
				</li>
				<div className="sticky-container">
					<li className="task-title">
						<button className="delete-btn" onClick={() => deleteTask(task.id)}>{svgs.delete}</button>
						<div className="title-main-container justify-between">
							<span>{task.title}</span>
							<Link to={`task/${task.id}`} className="open-task-details">
								&nbsp; {svgs.expand} open
							</Link>
						</div>
					</li>
				</div>

				{board.cmpsOrder.map((cmp, idx) => (
					<DynamicCmp cmp={cmp} key={idx} onUpdate={data => handleUpdate(cmp, data)} task={task} defaultWidth={colWidth} />
				))}
			</div>
			<li className="line-end"></li>
		</ul>
	)
}
