import { httpService } from '../http.service'

export const discussionService = {
	add,
	query,
	remove,
}

function query() {
	return httpService.get(`discussion`)
}

async function remove() {
	await httpService.delete(`discussion/`)
}

async function add({ txt, byUserId }) {
	return await httpService.post(`discussion`, { txt, byUserId })
}