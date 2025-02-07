export function FilteredMembersModal({ board, filterBy, setFilterBy }) {
	function toggleFilteredMembers(id) {
		let members = [...filterBy.members]
		members.includes(id)
			? (members = members.filter((memberId) => memberId !== id))
			: members.push(id)

		setFilterBy({ ...filterBy, members })
	}

	return (
		<section className="filter-by-member flex column">
			<div className="title-wrapper">
				<h4>Filter this board by person</h4>
				<span>And find tasks they're working on.</span>
			</div>

			<ul>
				{board.members.map((member) => (
					<li key={member._id}>
						<img src={member.imgUrl} alt={`${member.fullname} img`} />
						<button onClick={(ev) => toggleFilteredMembers(member._id, ev)} />
					</li>
				))}
			</ul>
			{filterBy.members.length > 0 && (
				<button
					onClick={() => setFilterBy({ ...filterBy, members: [] })}
					style={{
						position: 'absolute',
						right: '8px',
						bottom: '8px',
						borderRadius: '4px',
					}}
				>
					Clear all
				</button>
			)}
		</section>
	)
}