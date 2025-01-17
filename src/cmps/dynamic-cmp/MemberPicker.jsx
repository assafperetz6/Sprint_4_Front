export function MemberPicker({ cmp, task, groupId, defaultWidth }) {
	const DEFAULT_AVATAR = 'https://cdn.monday.com/icons/dapulse-person-column.svg'

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
					marginLeft: index > 0 ? '-8px' : '0'
					// zIndex: task.members.length - index
				}}
			/>
		))
	}

	console.log(task)

	return (
		<li className="member-picker" style={{ width: defaultWidth }} role="button">
			<div className="member-avatars-container flex align-center justify-center">{renderMemberAvatars()}</div>
		</li>
	)
}
