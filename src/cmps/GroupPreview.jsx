import { TaskListHeader } from './TaskListHeader'
import { TaskList } from './TaskList'
import { useSelector } from 'react-redux'
import { removeGroup } from '../store/actions/board.actions'
import { showErrorMsg } from '../services/event-bus.service'
import { GroupTitle } from './GroupTitle'

export function GroupPreview({ group, cmpsOrder }) {
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
			<GroupTitle group={group} />
			<TaskListHeader group={group} tasks={group.tasks} />
			<TaskList group={group} />
		</section>
	)
}