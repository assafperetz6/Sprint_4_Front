import { formatDate } from '../../services/util.service'

export function DatePicker({ task, defaultWidth, groupId }) {
	const formatedDate = formatDate(task.dueDate)

	return (
		<li className="date-pciker flex align-center justify-center" style={{ width: defaultWidth }}>
			{formatedDate}
		</li>
	)
}
