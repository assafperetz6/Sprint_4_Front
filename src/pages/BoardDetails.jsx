import { Outlet, useParams } from 'react-router'
import { useEffect, useRef, useState } from 'react'
import { loadBoard } from '../store/actions/board.actions'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

import { svgs } from '../services/svg.service.jsx'
import { GroupList } from '../cmps/GroupList.jsx'
import { BoardHeader } from '../cmps/BoardHeader.jsx'
import { useSearchParams } from 'react-router-dom'
import { SET_FILTER } from '../store/reducers/board.reducer.js'

export function BoardDetails() {
	const dispatch = useDispatch()
	const board = useSelector((storeState) => storeState.boardModule.board)

	const [searchParams, setSearchParams] = useSearchParams()
	const [filterBy, setFilterBy] = useState(searchParams.get('txt') || '')

	const [isClosing, setIsClosing] = useState(false)
	const { boardId } = useParams()
	const navigate = useNavigate()

	const [isScrolledTop, setIsScrolledTop] = useState(true)
	const boardDetailsRef = useRef(null)

	useEffect(() => {
		const txtParam = searchParams.get('txt')
		if (txtParam !== filterBy) {
			searchParams.set('txt', filterBy)
			setSearchParams(searchParams)
		}

		dispatch({ type: SET_FILTER, filterBy: { txt: filterBy } })
		
	}, [filterBy])

	const handleScroll = (e) => {
		if (e.target.scrollTop === 0 && !isScrolledTop) setIsScrolledTop(true)
		else if (e.target.scrollTop > 0 && isScrolledTop) setIsScrolledTop(false)
	}

	function handleFilter(txt) {
		setFilterBy(txt)
		// if (txt) searchParams.set('txt', txt)
		// else searchParams.delete('txt')
		// setSearchParams(searchParams)
	}

	useEffect(() => {
		loadBoard(boardId)
	}, [boardId, filterBy])

	function closeTaskDetails() {
		setIsClosing(true)
		setTimeout(() => {
			setIsClosing(false)
			navigate(`/board/${boardId}`)
		}, 75)
	}

	
	
	if (!board) return null
	
	return (
		<section
			className="board-details"
			ref={boardDetailsRef}
			onScroll={handleScroll}
		>
			<BoardHeader
				board={board}
				filterBy={filterBy}
				setFilterBy={handleFilter}
			/>

			{!!board && (
				<GroupList
					groups={board.groups}
					isScrolledTop={isScrolledTop}
					scrollContainer={boardDetailsRef.current}
				/>
			)}
			<Outlet context={{ isClosing, closeTaskDetails }} />
		</section>
	)
}