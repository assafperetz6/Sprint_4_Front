import { svgs } from "../../services/svg.service";

export function InviteMembers({ board }) {    
	return (
		<section className="invite-members-modal">
			<h4>Invite board members</h4>
			<ul>
				{board.members.map((member) => (
					<li key={member._id}>
						<img src={member.imgUrl} alt={member.fullname} />
						<span>{member.fullname}</span>
						<button>{svgs.X}</button>
					</li>
				))}
			</ul>
		</section>
	)
}
