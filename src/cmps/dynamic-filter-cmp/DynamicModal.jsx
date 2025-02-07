import { useSelector } from 'react-redux'
import { svgs } from '../../services/svg.service'
import { Checkbox } from '../Checkbox'
import { FilteredMembersModal } from './FilteredMembersModal'
import { SortModal } from './SortModal'
import { useState } from 'react'
import { ToggleColumns } from './ToggleColumns'
import { boardService } from '../../services/board'
import { showErrorMsg } from '../../services/event-bus.service'
import { addGroup } from '../../store/actions/board.actions'

export function DynamicFilterModal({
	board,
	modalType,
	setModalType,
	setFilterBy,
	filterBy,
}) {
	const MODAL_CMPS = {
		member: FilteredMembersModal,
		sort: SortModal,
		hide: ToggleColumns,
		addGroup: AddGroup,
	}
	const ModalCmp = MODAL_CMPS[modalType]

	const getColumnName = (colType) =>
		colType.slice(0, 1).toUpperCase() + colType.slice(1, -6)

	if (!modalType || !ModalCmp) return null
	return (
		<>
			<div
				className="modal-overlay"
				style={{ position: 'fixed', inset: '0', overflow: 'auto', zIndex: '1' }}
				onClick={(ev) => {
					ev.stopPropagation()
					setModalType(null)
				}}
			></div>
			<ModalCmp
				board={board}
				filterBy={filterBy}
				setFilterBy={setFilterBy}
				getColumnName={getColumnName}
                setModalType={setModalType}
			/>
		</>
	)
}

function AddGroup({ board, setModalType }) {
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
