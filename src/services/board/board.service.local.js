
import { storageService } from '../async-storage.service'
import { makeId } from '../util.service'
import { userService } from '../user'

const STORAGE_KEY = 'board'

export const boardService = {
    query,
    getById,
    save,
    remove,
    // addBoardUpdate
}


async function query() {
    var boards = await storageService.query(STORAGE_KEY)
    return boards
}

function getById(boardId) {
    return storageService.get(STORAGE_KEY, boardId)
}

async function remove(boardId) {
    await storageService.remove(STORAGE_KEY, boardId)
}

async function save(board) {
    var savedBoard
    if (board._id) {
        const boardToSave = {
            _id: board._id,
            createdBy: board.createdBy,
            title: board.title,
            groups: board.groups,
            members: board.members,
        }
        savedBoard = await storageService.put(STORAGE_KEY, boardToSave)
    } else {
        const boardToSave = {
            _id: board._id,
            createdBy: userService.getLoggedinUser(),
            title: board.title,
            groups: board.groups,
            members: board.members,
        }
        savedBoard = await storageService.post(STORAGE_KEY, boardToSave)
    }
    return savedBoard
}

// async function addtaskUpdate(taskId, txt) {
//     const task = await getById(taskId)

//     const update = {
//         id: makeId(),
//         by: userService.getLoggedinUser(),
//         txt
//     }
//     task.updates.push(update)
//     await storageService.put(STORAGE_KEY, task)

//     return update
// }