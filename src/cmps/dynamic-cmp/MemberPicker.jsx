export function MemberPicker({ info, onUpdate, defaultWidth }) {
	const DEFAULT_AVATAR = 'https://cdn.monday.com/icons/dapulse-person-column.svg'
	if (!info || !info.membersIds) {
		return (
			<li className="member-picker flex align-center justify-center" style={{ width: defaultWidth }} role="button" onClick={onUpdate}>
				<img src={DEFAULT_AVATAR} />
			</li>
		)
	}

	return <li className="member-picker flex align-center justify-center" style={{ width: defaultWidth }} role="button" onClick={onUpdate}></li>
}
