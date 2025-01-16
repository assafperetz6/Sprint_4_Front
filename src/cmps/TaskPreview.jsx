import { Link, useParams } from 'react-router-dom'
import { svgs } from '../services/svg.service'
import { hexToRgba } from '../services/util.service'

import { useDispatch, useSelector } from 'react-redux'
import { DynamicCmp } from './DynamicCmp'
import { SET_BOARD } from '../store/reducers/board.reducer'
import { boardService } from '../services/board'
import { showErrorMsg } from '../services/event-bus.service'
import { removeTask } from '../store/actions/board.actions'

export function TaskPreview({ group, task }) {
	const board = useSelector(storeState => storeState.boardModule.board)
	const { boardId } = useParams()

	function onRemoveTask(taskId) {
		try {
			removeTask(board._id, taskId)
		} catch (err) {
			console.log('cannot remove task', err)
			showErrorMsg('cannot remove task')
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
						<button className="delete-btn" onClick={() => onRemoveTask(task.id)}>
							{svgs.delete}
						</button>
						<div className="title-main-container justify-between">
							<span>{task.title}</span>
							<Link to={`task/${task.id}`} className="open-task-details">
								&nbsp; {svgs.expand} open
							</Link>
						</div>
					</li>
				</div>

				{board.cmpsOrder.map((cmp, idx) => (
					<DynamicCmp cmp={cmp} key={idx} groupId={group.id} task={task} />
				))}
			</div>
			<li className="line-end"></li>
		</ul>
	)
}
