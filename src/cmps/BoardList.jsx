import { BoardPreview } from './BoardPreview'

export function BoardList({ boards }) {
	
	return (
		<section>
			<ul className='board-list'>
				{boards.map(board => (
						<BoardPreview key={board._id} board={board} />
				))}
			</ul>
		</section>
	)
}
