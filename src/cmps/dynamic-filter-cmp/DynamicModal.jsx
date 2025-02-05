import { FilteredMembersModal } from "./FilteredMembersModal"
import { SortModal } from "./SortModal"

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
	}

	const ModalCmp = MODAL_CMPS[modalType]

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
			<ModalCmp board={board} filterBy={filterBy} setFilterBy={setFilterBy} />
		</>
	)
}