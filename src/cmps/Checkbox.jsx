import { useEffect, useState } from 'react'
import { svgs } from '../services/svg.service.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { SET_SELECTED_TASKS } from '../store/reducers/board.reducer.js'

export function Checkbox({ task, group, disable = false, isGroupHeader = false }) {
	const selectedTasks = useSelector(storeState => storeState.boardModule.selectedTasks)
	const dispatch = useDispatch()
    const [isChecked, setIsChecked] = useState(false)

	const taskToSave = {...task, groupId: group?.id}

	useEffect(() => {
		if (selectedTasks.length < 1) setIsChecked(false)

		if (selectedTasks.find(t => t?.id === task?.id)) setIsChecked(true)
		else if (!isGroupHeader) setIsChecked(false)

	}, [selectedTasks])

	function handleClick() {
		if (disable) return
		if(isGroupHeader) {
			if (isChecked) {
				dispatch({ type: SET_SELECTED_TASKS, tasks: selectedTasks.filter(task => task.groupId !== group.id)})
			}
			else {
				const filteredTasks = group.tasks.filter(task => !task.archivedAt && !selectedTasks.find(t => t.id === task.id) )
				const tasksToSelect = [...selectedTasks, ...filteredTasks.map(task => ({...task, groupId: group.id}))]
				dispatch({ type: SET_SELECTED_TASKS, tasks: tasksToSelect})
			}
			setIsChecked(prev => !prev)
			return
		}

		else if (isChecked) dispatch({ type: SET_SELECTED_TASKS, tasks: selectedTasks.filter(t => t.id !== task.id)})
		else dispatch({ type: SET_SELECTED_TASKS, tasks: [...selectedTasks, taskToSave]})

		setIsChecked(prev => !prev)
	}

	return (
		<div className={`checkbox-wrapper ${disable ? 'disable' : ''}`}>
			<input type="checkbox" className={`checkbox ${isChecked ? 'checked' : ''}`} onClick={handleClick} disabled={disable} />
            {isChecked && <span className="check-icon">{svgs.checkmark}</span>}
		</div>
	)
}
