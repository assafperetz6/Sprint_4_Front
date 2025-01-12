import { TaskPreview } from './TaskPreview.jsx'
import { GroupPreview } from './GroupPreview.jsx'

export function GroupList({ groups }) {
	return (
		<section className="group-list">
			<ul className="clean-list">
				{groups.map(group => (
					<GroupPreview group={group} key={group.id} />
				))}
			</ul>
		</section>
	)
}
