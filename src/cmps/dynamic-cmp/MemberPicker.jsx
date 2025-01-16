import { useState } from 'react'
import { usePopper } from 'react-popper'
import { svgs } from '../../services/svg.service'

export function MemberPicker({ cmp, task, groupId, defaultWidth }) {
	const DEFAULT_AVATAR = 'https://cdn.monday.com/icons/dapulse-person-column.svg'
	const [isPickerOpen, setIsPickerOpen] = useState(false)

	const [referenceElement, setReferenceElement] = useState(null)
	const [popperElement, setPopperElement] = useState(null)
	const [arrowElement, setArrowElement] = useState(null)
	const { styles, attributes } = usePopper(referenceElement, popperElement, {
		modifiers: [
			{ name: 'arrow', options: { element: arrowElement } },
			{ name: 'offset', options: { offset: [0, 8] } }
		]
	})

	function renderMemberAvatars() {
		if (!task.members?.length) {
			return <img src={DEFAULT_AVATAR} alt="Default avatar" className="member-avatar" />
		}

		return task.members.map((member, index) => (
			<img
				key={member.id || index}
				src={member.imgUrl}
				alt={member.fullname || 'Member avatar'}
				className="member-avatar"
				style={{
					marginLeft: index > 0 ? '-8px' : '0',
					zIndex: task.members.length - index
				}}
			/>
		))
	}

	function setPickerOpen() {
		setIsPickerOpen(true)
	}

	return (
		<li className="member-picker" ref={setReferenceElement} style={{ width: defaultWidth }} onClick={setPickerOpen}>
			<div className="member-avatars-container flex align-center justify-center">{renderMemberAvatars()}</div>
			{isPickerOpen && <PopUpMemberModal task={task} popperRef={setPopperElement} styles={styles} attributes={attributes} setArrowElement={setArrowElement} />}
		</li>
	)
}

function PopUpMemberModal({ task, popperRef, setArrowElement, styles, attributes }) {
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
					<div key={member.id || idx} className="person-token-item flex align-center">
						<img src={member.imgUrl} style={{ width: '22px', height: '22px', borderRadius: '50%' }} />
						<span className="person-token-name">{member.fullname}</span>
						<div className="clear-btn flex align-center justify-center">{svgs.exit}</div>
					</div>
				))}
			</div>
		))
	}
	return (
		<div className="member-picker-popup" ref={popperRef} style={styles.popper} {...attributes.popper}>
			<div className="modal-up-arrow" ref={setArrowElement} style={styles.arrow}></div>
			<div className="person-tokens-list">{getUserTokens()}</div>
			<div className="new-person-picker">
				<div className="search-input">
					{svgs.search}
					<input type="search" placeholder="" />
				</div>
			</div>
		</div>
	)
}
