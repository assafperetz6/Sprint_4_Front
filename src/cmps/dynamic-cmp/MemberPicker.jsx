import { useEffect, useState } from 'react'
import { usePopper } from 'react-popper'
import { useSelector } from 'react-redux'
import { svgs } from '../../services/svg.service'
import { showErrorMsg } from '../../services/event-bus.service'
import { updateTask } from '../../store/actions/board.actions'
import { boardService } from '../../services/board'

export function MemberPicker({ task, groupId, defaultWidth }) {
	const DEFAULT_AVATAR = 'https://cdn.monday.com/icons/dapulse-person-column.svg'
	const DEFAULT_IMG = 'https://cdn1.monday.com/dapulse_default_photo.png'

	const board = useSelector(storeState => storeState.boardModule.board)
	const [isPickerOpen, setIsPickerOpen] = useState(false)
	const [searchTerm, setSearchTerm] = useState('')

	const [referenceElement, setReferenceElement] = useState(null)
	const [popperElement, setPopperElement] = useState(null)
	const [arrowElement, setArrowElement] = useState(null)

	const { styles, attributes } = usePopper(referenceElement, popperElement, {
		modifiers: [
			{ name: 'arrow', options: { element: arrowElement } },
			{ name: 'offset', options: { offset: [0, 8] } }
		]
	})

	useEffect(() => {
		function handleClickOutside(event) {
			if (popperElement && !popperElement.contains(event.target) && !referenceElement.contains(event.target)) {
				setIsPickerOpen(false)
			}
		}

		if (isPickerOpen) {
			document.addEventListener('mousedown', handleClickOutside)
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [isPickerOpen, popperElement, referenceElement])

	function renderMemberAvatars() {
		if (!task.members?.length) {
			return <img src={DEFAULT_AVATAR} alt="Default avatar" className="member-avatar" />
		}

		return task.members.map((member, index) => (
			<img
				key={member._id || index}
				src={member.imgUrl}
				alt={member.fullname || 'Member avatar'}
				className="member-avatar"
				style={{
					marginLeft: index > 0 ? '-8px' : '0'
				}}
			/>
		))
	}

	function setPickerOpen(e) {
		e.stopPropagation()
		setIsPickerOpen(true)
	}

	async function onSetMember(member) {
		try {
			const isAlreadyAssigned = task.members.some(taskMember => taskMember._id === member._id)

			if (isAlreadyAssigned) {
				showErrorMsg('Member is already assigned to this task')
				return
			}

			const taskToSave = { ...task, members: [...task.members, member] }
			await updateTask(board._id, groupId, taskToSave)
			setIsPickerOpen(false)
		} catch (err) {
			console.error('Cannot add member:', err)
			showErrorMsg('Cannot add member')
		}
	}

	async function onRemoveMember(memberId) {
		try {
			const updatedMembers = task.members.filter(member => member._id !== memberId)
			const taskToSave = {
				...task,
				members: updatedMembers
			}
			await updateTask(board._id, groupId, taskToSave)
		} catch (err) {
			console.error('Cannot remove member:', err)
			showErrorMsg('Cannot remove member')
		}
	}

	function getUserTokens() {
		if (!task.members?.length) return null

		const rows = []
		for (let i = 0; i < task.members.length; i += 2) {
			const row = task.members.slice(i, i + 2)
			rows.push(row)
		}

		return rows.map((row, rowIdx) => (
			<div key={rowIdx} className="item-tokens-line flex">
				{row.map((member, idx) => (
					<div key={member._id || idx} className="person-token-item flex align-center">
						<img src={member.imgUrl} style={{ width: '22px', height: '22px', borderRadius: '50%' }} />
						<span className="person-token-name">{member.fullname}</span>
						<div
							className="clear-btn flex align-center justify-center"
							onClick={e => {
								e.stopPropagation()
								onRemoveMember(member._id)
							}}
						>
							{svgs.exit}
						</div>
					</div>
				))}
			</div>
		))
	}

	function getSuggestedPeople() {
		const filteredMembers = boardService.getBoardMembers(board, searchTerm).filter(member => {
			const isAlreadyAssigned = task.members.some(taskMember => taskMember._id === member._id)
			return !isAlreadyAssigned
		})

		if (filteredMembers.length === 0) {
			return (
				<li className="suggested-item flex align-center justify-center">
					<span className="name empty-state">{searchTerm ? 'No matching members found' : 'No members available'}</span>
				</li>
			)
		}

		return filteredMembers.map(member => (
			<li className="suggested-item flex align-center" key={member._id} onClick={() => onSetMember(member)}>
				<div className="avatar">
					<img src={member.imgUrl || DEFAULT_IMG} alt={member.fullname} />
				</div>
				<span className="name">{member.fullname}</span>
			</li>
		))
	}

	return (
		<li className="member-picker" ref={setReferenceElement} style={{ width: defaultWidth }} onClick={setPickerOpen}>
			<div className="member-avatars-container flex align-center justify-center">{renderMemberAvatars()}</div>
			{isPickerOpen && (
				<PopUpMemberModal
					popperRef={setPopperElement}
					styles={styles}
					attributes={attributes}
					setArrowElement={setArrowElement}
					searchTerm={searchTerm}
					setSearchTerm={setSearchTerm}
					getUserTokens={getUserTokens}
					getSuggestedPeople={getSuggestedPeople}
				/>
			)}
		</li>
	)
}

function PopUpMemberModal({ popperRef, setArrowElement, styles, attributes, searchTerm, setSearchTerm, getUserTokens, getSuggestedPeople }) {
	return (
		<div className="member-picker-popup" ref={popperRef} style={styles.popper} {...attributes.popper}>
			<div className="modal-up-arrow" ref={setArrowElement} style={styles.arrow} />
			<div className="person-tokens-list">{getUserTokens()}</div>
			<div className="new-person-picker">
				<ul className="suggested-list">
					<div className="search-input flex align-center">
						{svgs.search}
						<input type="search" placeholder="Search names, roles or teams" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
					</div>
					<div className="suggested-people">
						{searchTerm ? 'Search Results' : 'Suggested people'}
						{getSuggestedPeople()}
					</div>
				</ul>
			</div>
		</div>
	)
}
