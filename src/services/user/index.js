const { DEV, VITE_LOCAL } = import.meta.env

import { getRandomIntInclusive } from '../util.service'
import { userService as local } from './user.service.local'
import { userService as remote } from './user.service.remote'

function getEmptyUser() {
  return {
    username: '',
    password: '',
    fullname: '',
    isAdmin: false,
  }
}

function getDefaultUser() {
  return {
    username: 'Alonwohl',
    password: 'alon',
    fullname: 'Alon Wohl',
    isAdmin: false,
    imgUrl: 'https://res.cloudinary.com/dqfhbqcwv/image/upload/v1738491906/IMG_4602_bcxkfx.jpg'
  }
}

function getGuest(){
  return {
    username: 'guest' + getRandomIntInclusive(1000, 9999),
    fullname: 'guest',
    password: '123',
    imgUrl: 'https://res.cloudinary.com/dqfhbqcwv/image/upload/v1739010711/dapulse_default_photo_q9x7an.png'
  }
}

const service = VITE_LOCAL === 'true' ? local : remote
export const userService = { getEmptyUser, getDefaultUser, getGuest, ...service }

// Easy access to this service from the dev tools console
// when using script - dev / dev:local

// if (DEV) window.userService = userService
