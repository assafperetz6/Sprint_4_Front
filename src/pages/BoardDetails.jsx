import { Outlet, useParams } from 'react-router'
import { useEffect, useRef, useState } from 'react'
import { getCmdSetBoard, loadBoard, setFilterBy } from '../store/actions/board.actions'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

import { GroupList } from '../cmps/GroupList.jsx'
import { TaskActionMenu } from '../cmps/TaskActionMenu.jsx'
import { BoardHeader } from '../cmps/BoardHeader.jsx'

import { userService } from '../services/user/index.js'
import { SOCKET_EMIT_SET_VIEWED_BOARD, SOCKET_EVENT_BOARD_UPDATE, socketService } from '../services/socket.service.js'
import { loadUsers, signup } from '../store/actions/user.actions.js'
import { useSearchParams } from 'react-router-dom'

export function BoardDetails() {
  const dispatch = useDispatch()
  const board = useSelector((storeState) => storeState.boardModule.board)
  const filterBy = useSelector((storeState) => storeState.boardModule.filterBy)
  const isFirstRender = useRef(true)
  const [searchParams, setSearchParams] = useSearchParams()

  const [isClosing, setIsClosing] = useState(false)
  const { boardId } = useParams()
  const navigate = useNavigate()

  const [isScrolledTop, setIsScrolledTop] = useState(true)
  const boardDetailsRef = useRef(null)

  useEffect(() => {
    const txtParam = searchParams.get('txt')
    const membersParam = searchParams.get('members')
    const sortFieldParam = searchParams.get('sortField')
    const sortDirParam = searchParams.get('dir')

    if (isFirstRender.current) {
      const filter = {
        txt: txtParam || '',
        members: membersParam ? membersParam.split(',') : [],
        sortBy: { sortField: sortFieldParam || '', dir: +sortDirParam || 1 }
      }
      setFilterBy({ ...filterBy, ...filter })
      isFirstRender.current = false

      return
    }

    if (txtParam !== filterBy.txt) {
      searchParams.set('txt', filterBy.txt)
    }

    if (membersParam !== filterBy.members) {
      searchParams.set('members', filterBy.members)
    }

    if (sortFieldParam !== filterBy.sortBy.sortField) {
      searchParams.set('sortField', filterBy.sortBy.sortField)
    }

    if (sortDirParam !== filterBy.sortBy.dir) {
      searchParams.set('dir', filterBy.sortBy.dir)
    }

    setSearchParams(searchParams)
  }, [filterBy])

  const handleScroll = (e) => {
    if (e.target.scrollTop === 0 && !isScrolledTop) setIsScrolledTop(true)
    else if (e.target.scrollTop > 0 && isScrolledTop) setIsScrolledTop(false)
  }

  const selectedTasks = useSelector((storeState) => storeState.boardModule.selectedTasks)

  if (!userService.getLoggedinUser()) {
    signup(userService.getGuest())
  }

  useEffect(() => {
    socketService.on(SOCKET_EVENT_BOARD_UPDATE, (board) => {
      dispatch(getCmdSetBoard(board))
    })

    loadUsers()

    return () => {
      socketService.off(SOCKET_EVENT_BOARD_UPDATE)
    }
  }, [])

  useEffect(() => {
    loadBoard(boardId)
    socketService.emit(SOCKET_EMIT_SET_VIEWED_BOARD, boardId)

    return () => {
      document.title = 'mundane'
    }
  }, [boardId, filterBy])

  function closeTaskDetails() {
    setIsClosing(true)
    setTimeout(() => {
      setIsClosing(false)
      navigate(`/board/${boardId}`)
    }, 75)
  }

  if (!board) return null
  document.title = board.title
  return (
    <section className="board-details" ref={boardDetailsRef} onScroll={handleScroll}>
      <BoardHeader board={board} />

      {!!board.groups.length && <GroupList isScrolledTop={isScrolledTop} scrollContainer={boardDetailsRef.current} />}
      {selectedTasks.length > 0 && <TaskActionMenu tasks={selectedTasks} />}
      <Outlet context={{ isClosing, closeTaskDetails }} />
    </section>
  )
}
