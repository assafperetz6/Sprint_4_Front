export function makeId(length = 6) {
	var txt = ''
	var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

	for (var i = 0; i < length; i++) {
		txt += possible.charAt(Math.floor(Math.random() * possible.length))
	}

	return txt
}

export function makeLorem(size = 100) {
	var words = [
		'The sky',
		'above',
		'the port',
		'was',
		'the color of television',
		'tuned',
		'to',
		'a dead channel',
		'.',
		'All',
		'this happened',
		'more or less',
		'.',
		'I',
		'had',
		'the story',
		'bit by bit',
		'from various people',
		'and',
		'as generally',
		'happens',
		'in such cases',
		'each time',
		'it',
		'was',
		'a different story',
		'.',
		'It',
		'was',
		'a pleasure',
		'to',
		'burn'
	]
	var txt = ''
	while (size > 0) {
		size--
		txt += words[Math.floor(Math.random() * words.length)] + ' '
	}
	return txt
}

export function getRandomIntInclusive(min, max) {
	min = Math.ceil(min)
	max = Math.floor(max)
	return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive
}

export function hexToRgba(hex, alpha = 1) {
	// Remove the '#' character from the beginning of the hex code
	hex = hex.replace('#', '')

	// Extract the individual color components from the hex code
	const r = parseInt(hex.substr(0, 2), 16)
	const g = parseInt(hex.substr(2, 2), 16)
	const b = parseInt(hex.substr(4, 2), 16)

	// Return the RGB values as an object
	return `rgba(${r},${g},${b},${alpha})`
}

export function getRandomColor() {
	const colors = [
		'#00c875', // green1
		'#027f4b', // green2
		'#ffcb00', // yellow1
		'#9dd326', // yellow2
		'#9d50dd', // purple1
		'#784bd1', // purple2
		'#007eb5', // turq
		'#66ccff', // blue1
		'#579bfc', // blue2
		'#3c72e6', // blue3
		'#bb3354', // red1
		'#df2e4a', // red2
		'#ff5ac4', // pink1
		'#ff007e', // pink2
		'#fdab3d', // orange1
		'#ff642e', // orange2
		'#7f5347', // brown
		'#c4c4c4', // lightgrey
		'#757575' // darkgrey
	]

	const randomIndex = Math.floor(Math.random() * colors.length)
	return colors[randomIndex]
}

export function randomPastTime() {
	const HOUR = 1000 * 60 * 60
	const DAY = 1000 * 60 * 60 * 24
	const WEEK = 1000 * 60 * 60 * 24 * 7

	const pastTime = getRandomIntInclusive(HOUR, WEEK)
	return Date.now() - pastTime
}

export function getRandomTimestamp(yearsBack = 1, yearsForward = 1) {
	const currentYear = new Date().getFullYear()
	const startDate = new Date(currentYear - yearsBack, 0, 1).getTime()
	const endDate = new Date(currentYear + yearsForward, 11, 31).getTime()

	return startDate + Math.random() * (endDate - startDate)
}

export function formatDate(timestamp) {
	if (!timestamp) return ''

	const date = new Date(timestamp)
	const now = new Date()

	const isCurrentYear = date.getFullYear() === now.getFullYear()

	const day = String(date.getDate()).padStart(2, '0')
	const month = date.toLocaleString('en-US', { month: 'short' })
	const year = date.getFullYear()

	return isCurrentYear ? `${day} ${month}` : `${day} ${month} ${year}`
}

export function debounce(func, timeout = 300) {
	let timer
	return (...args) => {
		clearTimeout(timer)
		timer = setTimeout(() => {
			func.apply(this, args)
		}, timeout)
	}
}

export function saveToStorage(key, value) {
	localStorage.setItem(key, JSON.stringify(value))
}

export function loadFromStorage(key) {
	const data = localStorage.getItem(key)
	return data ? JSON.parse(data) : undefined
}
