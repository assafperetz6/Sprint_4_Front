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
    username: 'Guest',
    password: 'Guest',
    fullname: 'Guest',
    isAdmin: false,
    score: 100,
    imgUrl: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
  }
}

const service = VITE_LOCAL === 'true' ? local : remote
export const userService = { ...service, getEmptyUser, getDefaultUser }

// Easy access to this service from the dev tools console
// when using script - dev / dev:local

if (DEV) window.userService = userService
