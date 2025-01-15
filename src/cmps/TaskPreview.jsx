import { Link } from 'react-router-dom'
import { svgs } from '../services/svg.service'
import { hexToRgba } from '../services/util.service'

import { useDispatch, useSelector } from 'react-redux'
import { DynamicCmp } from './DynamicCmp'
import { updateBoard } from '../store/actions/board.actions'
import { SET_BOARD } from '../store/reducers/board.reducer'

export function TaskPreview({ group, task, colWidth }) {
	const dispatch = useDispatch()
	const board = useSelector(storeState => storeState.boardModule.board)

	return (
		<ul className="task-preview task-row flex">
			<div className="main-preview-container">
				<div className="colored-border" style={{ backgroundColor: hexToRgba(group.style.color, 1) }}></div>

				<li className="check-box">
					<input type="checkbox" />
				</li>
				<div className="sticky-container">
					<li className="task-title">
						<div className="title-main-container justify-between">
							<span>{task.title}</span>
							<Link to={`task/${task.id}`} className="open-task-modal">
								&nbsp; {svgs.expand} open
							</Link>
						</div>
					</li>
				</div>

				{board.cmpsOrder.map((cmp, idx) => (
					<DynamicCmp cmp={cmp} key={idx} groupId={group.id} task={task} defaultWidth={colWidth} />
				))}
			</div>
			<li className="line-end"></li>
		</ul>
	)
}
