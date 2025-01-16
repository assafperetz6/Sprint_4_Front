import { GroupPreview } from './GroupPreview.jsx'
import { svgs } from '../services/svg.service.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { addGroup, updateBoard } from '../store/actions/board.actions.js'
import { boardService } from '../services/board/index.js'
import { showErrorMsg } from '../services/event-bus.service.js'

export function GroupList({ groups }) {
	const board = useSelector(storeState => storeState.boardModule.board)
	const dispatch = useDispatch()

	function onAddGroup() {
		const groupToAdd = boardService.getNewGroup()
		try {
			addGroup(board._id, groupToAdd)
		} catch (err) {
			showErrorMsg('cannot add group')
			console.log('cannot add group', err)
		}
	}

	return (
		<section className="group-list">
			<ul className="clean-list">
				{groups.map(group => (
					<GroupPreview group={group} key={group.id} />
				))}
			</ul>
			<div className="add-group-btn flex align-center" onClick={onAddGroup}>
				<span className="icon flex align-center">{svgs.plus}</span>
				<span className="txt">Add new group</span>
			</div>
		</section>
	)
}
