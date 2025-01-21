import { useEffect, useState } from 'react'
import { useNavigate, useOutletContext, useParams } from 'react-router'
import { boardService } from '../services/board'
import { svgs } from '../services/svg.service'

export function TaskDetails() {
	const { boardId, taskId } = useParams()
	const [task, setTask] = useState(null)
	const [view, setView] = useState('updates')
	const { isClosing, closeTaskDetails } = useOutletContext()

	useEffect(() => {
		getTask(boardId, taskId)
	}, [taskId])

	async function getTask(boardId, taskId) {
		const task = await boardService.getTaskById(boardId, taskId)
		setTask(task)
	}

	const animationClass = isClosing ? 'closing' : task ? 'open' : ''

	return (
		<section className={`task-details ${animationClass}`}>
			{task ? (
				<>
					<button className="exit-btn" onClick={closeTaskDetails}>
						{svgs.exit}
					</button>

					<section className="details-top-bar">
						<h2>{task.title}</h2>
						<section className="task-details-actions">
							<button className={view === 'updates' ? 'active' : ''} onClick={() => setView('updates')}>
								<span>{svgs.home}</span>&nbsp;Updates
							</button>
							<button className={view === 'files' ? 'active' : ''} onClick={() => setView('files')}>
								Files
							</button>
							<button className={view === 'activity' ? 'active' : ''} onClick={() => setView('activity')}>
								Activity Log
							</button>
						</section>
					</section>
					<section className="details-bottom-bar">
						<DynamicCmp view={view} />
					</section>
				</>
			) : null}
		</section>
	)
}

function DynamicCmp({ view }) {
	switch (view) {
		case 'updates':
			return <h1>updates: under construction</h1>
		case 'files':
			return <h1>files: under construction</h1>
		case 'activity':
			return <h1>activity: under construction</h1>
	}
}
