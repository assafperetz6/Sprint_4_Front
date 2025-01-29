import { svgs } from '../services/svg.service'
import { hexToRgba } from '../services/util.service'

export function GroupsWhileDnd({ groups }) {
	function getTasksCount(tasksCount) {
		if (!tasksCount) return 'No Items'
		if (tasksCount === 1) return tasksCount + ' Item'
		return tasksCount + ' Items'
	}

    console.log(groups)
    
	return (
		<section>
			{groups.map((group) => {
				<div className="collapsed-group-preview" style={{ width: '200px', height: '400px', background: 'black' }}>
					<div
						className="colored-border"
						style={{ backgroundColor: hexToRgba(group.style.color, 1) }}
					></div>
					<div
						className="toggle-group-preview flex align-center justify-center"
						style={{ color: group.style.color }}
					>
						{svgs.arrowRight}
					</div>

					<h4 className="title">{group.title}</h4>

					<div className="title-count flex align-center justify-center">
						{getTasksCount(group.tasks.length)}
					</div>
				</div>
			})}
		</section>
	)
}
