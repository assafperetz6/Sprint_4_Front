import { useEffect, useState } from 'react'
import { svgs } from '../services/svg.service.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { SET_SELECTED_TASKS } from '../store/reducers/board.reducer.js'

export function Checkbox({ task, disable = false }) {
	const selectedTasks = useSelector(storeState => storeState.boardModule.selectedTasks)
	const dispatch = useDispatch()
    const [isChecked, setIsChecked] = useState(false)

	useEffect(() => {
		if (selectedTasks.length < 1) setIsChecked(false)

		if (selectedTasks.find(t => t?.id === task?.id)) setIsChecked(true)
		else setIsChecked(false)

	}, [selectedTasks])

	function handleClick() {
		if (disable) return

		if (isChecked) dispatch({ type: SET_SELECTED_TASKS, tasks: selectedTasks.filter(t => t.id !== task.id)})
		else dispatch({ type: SET_SELECTED_TASKS, tasks: [...selectedTasks, task]})

		setIsChecked(prev => !prev)
	}

	return (
		<div className={`checkbox-wrapper ${disable ? 'disable' : ''}`}>
			<input type="checkbox" className={`checkbox ${isChecked ? 'checked' : ''}`} onClick={handleClick} disabled={disable} />
            {isChecked && <span className="check-icon">{svgs.checkmark}</span>}
		</div>
	)
}
