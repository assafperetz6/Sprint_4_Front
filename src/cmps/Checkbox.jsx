import { useState } from 'react'
import { svgs } from '../services/svg.service.jsx'

export function Checkbox() {

    const [isChecked, setIsChecked] = useState(false)
	return (
		<div className="checkbox-wrapper">
			<input type="checkbox" className="checkbox" onClick={() => setIsChecked(prev => !prev) } />
            {isChecked && <span className="check-icon">{svgs.checkmark}</span>}
		</div>
	)
}
