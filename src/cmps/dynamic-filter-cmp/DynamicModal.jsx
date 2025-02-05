import { svgs } from '../../services/svg.service'
import { Checkbox } from '../Checkbox'
import { FilteredMembersModal } from './FilteredMembersModal'
import { SortModal } from './SortModal'

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
	}
	const ModalCmp = MODAL_CMPS[modalType]

    const getColumnName = (colType) => colType.slice(0, 1).toUpperCase() + colType.slice(1, -6)

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
			<ModalCmp board={board} filterBy={filterBy} setFilterBy={setFilterBy} getColumnName={getColumnName} />
		</>
	)
}

function ToggleColumns({ board, filterBy, setFilterBy, getColumnName }) {


    function getListIcon(column) {
        switch (column) {
            case 'StatusPicker':
            case 'PriorityPicker':
                return svgs.coloredList
            
            case 'DatePicker':
                return svgs.coloredCalendar

            case 'TimelinePicker':
                return svgs.coloredTimeline

            case 'MemberPicker':
                return svgs.coloredPerson
        }
    }

	return (
		<section className="toggle-column-modal">
			<h4>Display columns</h4>
			<label className="search-columns">
				<input type="text" placeholder="Find columns to show/hide" />
				<span>{svgs.search}</span>
			</label>

            <section className='column-list-container'>
                <div className="select-all">
                    <input type="checkbox" />
                    <h6>All columns</h6>
                </div>

                <ul>{board.cmpsOrder.map(column => (
                    <li>
                        <input type="checkbox" />
                        <span>{getListIcon(column)}</span>
                        <span>{getColumnName(column)}</span>
                    </li>
                ))}</ul>
            </section>
		</section>
	)
}
