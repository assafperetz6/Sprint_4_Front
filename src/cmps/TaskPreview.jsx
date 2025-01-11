import { Link } from 'react-router-dom'
import { svgs } from '../services/svg.service'
import { LabelPicker } from './LabelPicker'

export function TaskPreview({ task, cmpsOrder, colWidth }) {
	return (
		<ul className="task-preview task-row flex">
			<div className="main-preview-container">
				<li className="check-box">
					<button></button>
				</li>
				<div className="sticky-container">
					<li className="task-title">
						<div className="title-main-container">
							<span>{task.title}</span>
							{/* <a href="#" className="conversation-icon-container"> */}
							<Link to={`task/${task.id}`} className="conversation-icon-container"> &nbsp; {svgs.expand} open</Link>
								{/* <div>{svgs}</div> */}
							{/* </a> */}
						</div>
					</li>
				</div>

				{cmpsOrder.map(columnType => (
					<LabelPicker key={columnType + task.id} task={task} columnType={columnType} colWidth={colWidth} />
				))}
			</div>
			<li className="line-end"></li>
		</ul>
	)
}
