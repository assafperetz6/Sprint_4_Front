import { TaskListHeader } from './TaskListHeader'
import { TaskList } from './TaskList'
import { useSelector } from 'react-redux'
import { removeGroup } from '../store/actions/board.actions'
import { showErrorMsg } from '../services/event-bus.service'
import { GroupHeader } from './GroupHeader.jsx'

export function GroupPreview({ group }) {
	const board = useSelector(storeState => storeState.boardModule.board)

	async function onRemoveGroup(groupId) {
		try {
			removeGroup(board._id, groupId)
		} catch (err) {
			console.log('cannot remove group')
			showErrorMsg('cannot remove group')
		}
	}

	return (
		<section className="group-preview item-col full">
			<GroupHeader group={group} />
			<TaskList group={group} />
		</section>
	)
}
