import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addGroup, updateBoard } from '../store/actions/board.actions.js'

import { boardService } from '../services/board/index.js'
import { showErrorMsg } from '../services/event-bus.service.js'

import { svgs } from '../services/svg.service.jsx'
import { GroupPreview } from './GroupPreview.jsx'
import { GroupHeader } from './GroupHeader.jsx'

export function GroupList({ groups }) {
	const board = useSelector(storeState => storeState.boardModule.board)
	const dispatch = useDispatch()

    const [currentGroup, setCurrentGroup] = useState(null)
	const [isScrolling, setIsScrolling] = useState(false)
	const groupRefs = useRef([])

	useEffect(() => {
		const handleScroll = () => {
            setIsScrolling(window.scrollY > 0)
        }
        window.addEventListener('scroll', handleScroll)

        const options = {
            root: null,
            rootMargin: `-20px 0px 0px 0px`,
            threshold: 0
        }

		const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const idx = parseInt(entry.target.dataset.groupIndex)
                const group = groups[idx]

                if (entry.boundingClientRect.top <= 0) {
                    setCurrentGroup(group)
                }
            })
        }, options)

        // Observe all group elements
        groupRefs.current.forEach((element, idx) => {
            if (element) {
                element.dataset.groupIndex = idx
                observer.observe(element)
            }
        })

        return () => {
            groupRefs.current.forEach(element => {
                if (element) observer.unobserve(element)
            })
            window.removeEventListener('scroll', handleScroll)
        }
    }, [groups])

	function onAddGroup() {
		const groupToAdd = boardService.getNewGroup()
		try {
			addGroup(board._id, groupToAdd)
		} catch (err) {
			showErrorMsg('cannot add group')
			console.log('cannot add group', err)
		}
	}

	return (
		<section className="group-list">
			<div className='sticky-header-container' style={ { display: isScrolling ? 'block' : 'none' }}>
				{currentGroup && <GroupHeader group={currentGroup}/>}
			</div>

			{groups.map((group, idx) => (
				<div 
					key={group.id} 
					ref={el => groupRefs.current[idx] = el}
					className='full'
				>
					<GroupPreview group={group} cmpsOrder={board.cmpsOrder} />
				</div>
			))}
			<div className="add-group-btn" onClick={onAddGroup}>
				<span className="icon flex align-center">{svgs.plus}</span>
				<span className="txt">Add new group</span>
			</div>
		</section>
	)
}