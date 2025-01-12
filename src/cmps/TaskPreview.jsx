import { svgs } from '../services/svg.service'
import { hexToRgba } from '../services/util.service'
import { LabelPicker } from './LabelPicker'

export function TaskPreview({ group, task, cmpsOrder, colWidth }) {
	console.log(task)
	return (
		<ul className="task-preview task-row flex">
			<div className="main-preview-container">
				<div className="colored-border" style={{ backgroundColor: hexToRgba(group.style.color, 1) }}></div>

				<li className="check-box">
					<input type="checkbox" />
				</li>
				<div className="sticky-container">
					<li className="task-title">
						<div className="title-main-container">
							<span>{task.title}</span>
							<a href="#" className="conversation-icon-container">
								{/* <div>{svgs}</div> */}
							</a>
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
