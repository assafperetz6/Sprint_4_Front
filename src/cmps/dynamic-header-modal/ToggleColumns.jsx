import { useState } from 'react'
import { useSelector } from 'react-redux'
import { svgs } from '../../services/svg.service'

export function ToggleColumns({ board, setFilterBy, getColumnName }) {
	const { cmpsOrder } = board
	const [cmpsToToggle, setCmpsToToggle] = useState(cmpsOrder)

	const filterBy = useSelector((storeState) => storeState.boardModule.filterBy)
	const { hiddenColumns } = filterBy

	function getListIcon(column) {
		switch (column) {
			case 'StatusPicker':
			case 'PriorityPicker':
				return svgs.coloredList

			case 'DatePicker':
				return svgs.coloredCalendar

			case 'TimelinePicker':
				return svgs.coloredTimeline

			case 'MemberPicker':
				return svgs.coloredPerson
		}
	}

	if (!filterBy) return
	return (
		<section className="toggle-column-modal">
			<h4>Display columns</h4>
			<label className="search-columns">
				<input
					type="text"
					placeholder="Find columns to show/hide"
					onChange={({ target }) =>
						setCmpsToToggle(
							cmpsOrder.filter((cmp) =>
								cmp.match(new RegExp(target.value, 'i'))
							)
						)
					}
				/>
				<span>{svgs.search}</span>
			</label>

			<section className="column-list-container">
				<div className="select-all">
					<input
						type="checkbox"
						checked={hiddenColumns.length === 0}
						onChange={() =>
							setFilterBy({
								...filterBy,
								hiddenColumns: hiddenColumns.length > 0 ? [] : [...cmpsOrder],
							})
						}
					/>
					<h6>All columns</h6>
                    <span>{cmpsToToggle.length - hiddenColumns.length} selected</span>
				</div>

				<ul>
					{cmpsToToggle.map((column) => {
						return (
							<li key={column} className="col-item">
								<input
									type="checkbox"
									checked={!hiddenColumns.includes(column)}
									onChange={() =>
										setFilterBy({
											...filterBy,
											hiddenColumns: hiddenColumns.includes(column)
												? hiddenColumns.filter((col) => col !== column)
												: [...hiddenColumns, column],
										})
									}
								/>
								<span className="flex align-center">{getListIcon(column)}</span>
								<span className="flex align-center">
									{getColumnName(column)}
								</span>
							</li>
						)
					})}
				</ul>
			</section>
		</section>
	)
}