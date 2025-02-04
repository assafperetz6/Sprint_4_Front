const { DEV, VITE_LOCAL } = import.meta.env

import { userService as local } from './user.service.local'
import { userService as remote } from './user.service.remote'

function getEmptyUser() {
  return {
    username: '',
    password: '',
    fullname: '',
    isAdmin: false,
    score: 100
  }
}

function getDefaultUser() {
  return {
    username: 'Alonwohl',
    password: 'alon',
    fullname: 'Alon Wohl',
    isAdmin: false,
    score: 100,
    imgUrl: 'https://res.cloudinary.com/dqfhbqcwv/image/upload/v1738491906/IMG_4602_bcxkfx.jpg'
  }
}

const service = VITE_LOCAL === 'true' ? local : remote
export const userService = { ...service, getEmptyUser, getDefaultUser }

// Easy access to this service from the dev tools console
// when using script - dev / dev:local

// if (DEV) window.userService = userService
