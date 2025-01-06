import { storageService } from '../async-storage.service'
import { userService } from '../user'

const DISCUSSION_KEY = 'discussion'

export const discussionService = {
	add,
	query,
	remove,
}

function query() {
	return storageService.query(DISCUSSION_KEY)
}

async function remove(discussionId) {
	await storageService.remove(DISCUSSION_KEY, discussionId)
}

async function add({ txt, byUserId }) {
	const byUser = await userService.getById(byUserId)
	const discussionToAdd = {
		txt,
		byUser: userService.getLoggedinUser(),
		aboutUser: {
			_id: aboutUser._id,
			fullname: aboutUser.fullname,
			imgUrl: aboutUser.imgUrl,
		},
	}

	discussionToAdd.byUser.score += 10
	await userService.update(discussionToAdd.byUser)

	const addedDiscussion = await storageService.post(DISCUSSION_KEY, discussionToAdd)
	return addedDiscussion
}