import { svgs } from '../../services/svg.service'
import { addGroup } from '../../store/actions/board.actions'

export function AddGroup({ board, setModalType }) {
	function onAddGroup() {
		const groupToAdd = boardService.getNewGroup()
		try {
			addGroup(board._id, groupToAdd, 'unshift')
            setModalType(null)
		} catch (err) {
			showErrorMsg('cannot add group')
			console.log('cannot add group', err)
		}
	}

	return (
        <section className='header-add-group'>
            <button onClick={onAddGroup}><span className='flex align-center'>{svgs.addGroup}</span> New group of tasks</button>
        </section>
    )
}