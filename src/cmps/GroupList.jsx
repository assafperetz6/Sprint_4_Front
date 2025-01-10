import { TaskPreview } from './TaskPreview.jsx'
import { GroupPreview } from './GroupPreview.jsx'

export function GroupList({ groups, cmpsOrder }) {
	return (
		<section className="group-list">
			<ul className="clean-list">
				{groups.map(group => (
					<GroupPreview group={group} key={group.id} cmpsOrder={cmpsOrder} />
				))}
			</ul>
		</section>
	)
}

