import { useDispatch, useSelector } from "react-redux";
import { svgs } from "../../services/svg.service";
import { updateBoard } from "../../store/actions/board.actions";
import { showSuccessMsg } from "../../services/event-bus.service";

export function InviteMembers({ board }) {    
	
	const users = useSelector(storeState => storeState.userModule.users)
	const dispatch = useDispatch()
	
	const members = [] 
	const nonMembers = []
	users.forEach(user => board.members.some(member => member._id === user._id) ? members.push(user) : nonMembers.push(user))

	async function onAddMember(member){
		try {
			await updateBoard({...board, members: [...board.members, member]})
			showSuccessMsg(`Added ${member.fullname} to ${board.title}`)
		} catch (err) {
			
		}
	}

	return (
		<section style={{maxWidth: 250 + 'px'}} className="invite-members-modal">
			<h4>Invite board members</h4>
			<ul>
				{nonMembers.length
				? <NonMemberList members={nonMembers} onAddMember={onAddMember}/>
				: <h5>No avialble members</h5>
				}
			</ul>
			<h4>Current board members</h4>
			<ul>
			{members.length
				? <MemberList members={members}/>
				: <h5>No members in board</h5>
				}
			</ul>
		</section>
	)
}


function MemberList({members}){
	const emptyImgUrl = 'https://res.cloudinary.com/dqfhbqcwv/image/upload/v1739010711/dapulse_default_photo_q9x7an.png'
	return (
		members.map((member) => (
			<li key={member._id}>
				<img src={member.imgUrl || emptyImgUrl} alt={member.fullname} />
				<span>{member.fullname}</span>
			</li>
		))
	)
}

function NonMemberList({members, onAddMember}){
	const emptyImgUrl = 'https://res.cloudinary.com/dqfhbqcwv/image/upload/v1739010711/dapulse_default_photo_q9x7an.png'
	return (
		members.map((member) => (
			<li onClick={() => onAddMember(member)} key={member._id}>
				<img src={member.imgUrl || emptyImgUrl} alt={member.fullname} />
				<span>{member.fullname}</span>
			</li>
		))
	)
}