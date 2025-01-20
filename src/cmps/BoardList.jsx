import { BoardPreview } from './BoardPreview'

export function BoardList({ boards }) {
	
	return (
		<section>
			<ul className='board-list' style={{ width: (300 * boards.length) + 'px'}}>
				{boards.map(board => (
						<BoardPreview key={board._id} board={board} />
				))}
			</ul>
		</section>
	)
}
