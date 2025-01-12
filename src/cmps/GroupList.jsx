import { GroupPreview } from './GroupPreview.jsx'
import { svgs } from '../services/svg.service.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { updateBoard } from '../store/actions/board.actions.js'
import { boardService } from '../services/board/index.js'

export function GroupList({ groups }) {
	const board = useSelector(storeState => storeState.boardModule.board)
	const dispatch = useDispatch()

	async function onAddGroup() {
		try {
			const updatedBoard = { ...board, groups: [...board.groups, boardService.getNewGroup()] }
			await updateBoard(updatedBoard)
			dispatch({ type: 'SET_BOARD', board: updatedBoard })
		} catch (err) {
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
