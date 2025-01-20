import { useEffect } from 'react'

export function ColorPicker({ onSetColorPickerClose, setEntityStyle, setIsColorPickerOpen }) {
	useEffect(() => {
		document.addEventListener('mousedown', onSetColorPickerClose)
		return () => {
			document.removeEventListener('mousedown', onSetColorPickerClose)
		}
	}, [])

	const colors = ['#027f4b', '#00c875', '#9dd326', '#cab641', '#ffcb00', '#784bd1', '#a25ddc', '#0086c0', '#66ccff', '#bb3354', '#e2445c', '#ff158a', '#ff5ac4', '#ff642e', '#fdab3d', '#7f5347', '#c4c4c4', '#808080']

	function onChooseColor(color, e) {
		e.stopPropagation()
		const newStyle = { color }
		setEntityStyle(newStyle)
		setIsColorPickerOpen(false)
	}

	return (
		<ul className="color-picker">
			{colors.map(color => (
				<li className="color" key={color} style={{ backgroundColor: color }} onClick={e => onChooseColor(color, e)}></li>
			))}
		</ul>
	)
}
