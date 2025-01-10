import { TaskPreview } from './TaskPreview.jsx'

export function GroupList({ groups, cmpsOrder }) {
	return groups.map((group) => (
		<section key={group.id} className="group">
			<h4 className="group-title">{group.title}</h4>

			<ul className="column-titles">
				<li className="checkbox">
					<button></button>
				</li>
				{cmpsOrder.map((columnTitle) => (
					<li key={columnTitle}>{columnTitle}</li>
				))}
			</ul>

			{group.tasks.map((task) => (
				<TaskPreview key={task.id} task={task} cmpsOrder={cmpsOrder} />
			))}
		</section>
	))
}
