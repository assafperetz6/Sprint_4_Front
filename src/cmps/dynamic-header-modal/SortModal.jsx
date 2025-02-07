import { svgs } from "../../services/svg.service"

export function SortModal({ board, filterBy, setFilterBy, getColumnName }) {
	
	return (
		<section className="sort-modal">
			<h4>Sort by</h4>
			<section className='sort-options'>
				<select className='col-select' value={filterBy.sortBy.sortField ? filterBy.sortBy.sortField : ''} placeholder="Choose column" onChange={(ev) => setFilterBy({ ...filterBy, sortBy: { ...filterBy.sortBy, sortField: ev.target.value } })}>
					<option value="title">Title</option>
					{board.cmpsOrder.map(col => {
						const columnName = getColumnName(col)
						return	<option key={columnName} value={columnName.toLowerCase()}>{columnName}</option>

					})}
				</select>

				

				<select className='dir-select' value={filterBy.sortBy.dir} onChange={(ev) => setFilterBy({ ...filterBy, sortBy: { ...filterBy.sortBy, dir: +ev.target.value } })}>
					<option value='1'>Ascending</option>
					<option value='-1'>Descending</option>
				</select>
			</section>

			<button className='clear-sort' onClick={() => setFilterBy({ ...filterBy, sortBy: { sortField: '', dir: 1 } })}>{svgs.X}</button>
		</section>
	)
}